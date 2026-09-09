'use client'

import React, { useState, useCallback, useRef } from 'react'
import Papa from 'papaparse'

// ---------- UK validation rules ----------

const UK_POSTCODE = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
const UK_VAT = /^(GB)?\s?([0-9]{9}|[0-9]{12}|(GD|HA)[0-9]{3})$/i;
const UK_PHONE = /^(\+?44\s?|0)(\d\s?){9,10}$/;
const UK_COMPANY_NO = /^([0-9]{8}|[A-Z]{2}[0-9]{6})$/i;
const UK_SORT_CODE = /^\d{2}[-\s]?\d{2}[-\s]?\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Formspree endpoint. Currently the shared Lexalytic contact form.
// Swap for a dedicated "Data Health Checker" form ID to separate these
// enquiries from general contact submissions.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa';

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', '10minutemail.com',
  'throwaway.email', 'yopmail.com', 'trashmail.com', 'sharklasers.com'
];

// VAT checksum (mod 97) — catches transposed digits a format check misses
function vatChecksumValid(raw: any): boolean | null {
  const digits = String(raw).replace(/[^0-9]/g, '');
  if (digits.length !== 9 && digits.length !== 12) return null;
  const n = digits.slice(0, 9).split('').map(Number);
  const weights = [8, 7, 6, 5, 4, 3, 2];
  let total = 0;
  for (let i = 0; i < 7; i++) total += n[i] * weights[i];
  const check = n[7] * 10 + n[8];
  let r1 = total;
  while (r1 > 0) r1 -= 97;
  const oldStyle = Math.abs(r1) === check;
  let r2 = total + 55;
  while (r2 > 0) r2 -= 97;
  const newStyle = Math.abs(r2) === check;
  return oldStyle || newStyle;
}

// Company number checksum is not a thing, but length/prefix rules are
function companyNoShape(raw: any): 'ok' | 'short' | 'bad' {
  const v = String(raw).trim().toUpperCase();
  if (/^[0-9]{8}$/.test(v)) return 'ok';
  if (/^[A-Z]{2}[0-9]{6}$/.test(v)) return 'ok';
  if (/^[0-9]{1,7}$/.test(v)) return 'short'; // very common: leading zeros stripped by Excel
  return 'bad';
}

// ---------- column type inference ----------

const HEADER_HINTS = [
  { type: 'postcode', words: ['postcode', 'post code', 'postal code', 'post_code', 'zip'] },
  { type: 'vat', words: ['vat', 'vat no', 'vat number', 'vatno'] },
  { type: 'company_no', words: ['company number', 'company no', 'companies house', 'crn', 'reg no', 'registration number', 'company_number'] },
  { type: 'email', words: ['email', 'e-mail', 'mail'] },
  { type: 'phone', words: ['phone', 'telephone', 'tel', 'mobile', 'contact number'] },
  { type: 'sort_code', words: ['sort code', 'sortcode', 'sort_code'] },
  { type: 'date', words: ['date', 'created', 'updated', 'invoice date', 'due', 'dob', 'birth'] },
  { type: 'company_name', words: ['company', 'company name', 'business name', 'organisation', 'organization', 'account name', 'client', 'customer'] },
];

function inferColumnType(header: any, values: any[]): string {
  const h = String(header || '').toLowerCase().trim();
  for (const hint of HEADER_HINTS) {
    if (hint.words.some((w: any) => h.includes(w))) return hint.type;
  }
  // fall back to content sniffing on non-empty sample
  const sample = values.filter((v: any) => v !== '' && v != null).slice(0, 60);
  if (sample.length === 0) return 'unknown';
  const hitRate = (fn: (v: any) => boolean) => sample.filter(fn).length / sample.length;
  if (hitRate(v => UK_POSTCODE.test(String(v).trim())) > 0.7) return 'postcode';
  if (hitRate(v => EMAIL.test(String(v).trim())) > 0.7) return 'email';
  if (hitRate(v => UK_SORT_CODE.test(String(v).trim())) > 0.8) return 'sort_code';
  if (hitRate(v => UK_PHONE.test(String(v).replace(/[()\s-]/g, ''))) > 0.7) return 'phone';
  return 'unknown';
}

// ---------- date format detection ----------

function detectDateAmbiguity(values: any[]): string | null {
  const nonEmpty = values.filter((v: any) => v !== '' && v != null).map((v: any) => String(v).trim());
  if (nonEmpty.length === 0) return null;
  const slashed = nonEmpty.filter((v: any) => /^\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}$/.test(v));
  if (slashed.length / nonEmpty.length < 0.5) return null;
  let firstOver12 = 0, secondOver12 = 0;
  slashed.forEach((v: any) => {
    const parts = v.split(/[/\-.]/).map(Number);
    if (parts[0] > 12) firstOver12++;
    if (parts[1] > 12) secondOver12++;
  });
  if (firstOver12 > 0 && secondOver12 > 0) return 'mixed';
  if (firstOver12 === 0 && secondOver12 === 0) return 'ambiguous';
  return null;
}

// ---------- main analysis ----------

function analyse(rows: any[], headers: string[]): any {
  const findings: any[] = [];
  const rowCount = rows.length;
  const colProfiles: any[] = [];
  let companyNumberCount = 0;

  // Structural: fully empty rows
  const emptyRowIdx: number[] = [];
  rows.forEach((r: any, i: number) => {
    const allEmpty = headers.every((h: any) => r[h] === '' || r[h] == null);
    if (allEmpty) emptyRowIdx.push(i + 2); // +2 = header row + 1-index
  });
  if (emptyRowIdx.length) {
    findings.push({
      severity: 'minor', group: 'Structure', title: 'Blank rows',
      detail: `${emptyRowIdx.length} row${emptyRowIdx.length > 1 ? 's are' : ' is'} completely empty.`,
      rows: emptyRowIdx.slice(0, 12), count: emptyRowIdx.length,
      fix: 'Delete blank rows before importing. They create empty records in most CRMs.'
    });
  }

  // Structural: exact duplicate rows
  const seen = new Map<string, number>();
  const dupIdx: number[] = [];
  rows.forEach((r: any, i: number) => {
    const key = headers.map((h: any) => String(r[h] ?? '').trim().toLowerCase()).join('\u0001');
    if (key.replace(/\u0001/g, '') === '') return;
    if (seen.has(key)) dupIdx.push(i + 2); else seen.set(key, i + 2);
  });
  if (dupIdx.length) {
    findings.push({
      severity: 'major', group: 'Structure', title: 'Duplicate records',
      detail: `${dupIdx.length} row${dupIdx.length > 1 ? 's are' : ' is'} an exact copy of an earlier row.`,
      rows: dupIdx.slice(0, 12), count: dupIdx.length,
      fix: 'Remove duplicates before import or you will contact the same person twice.'
    });
  }

  // Per-column checks
  headers.forEach((header: string) => {
    const values = rows.map((r: any) => r[header]);
    const nonEmpty = values.filter((v: any) => v !== '' && v != null);
    const missing = rowCount - nonEmpty.length;
    const type = inferColumnType(header, values);
    colProfiles.push({ header, type, filled: nonEmpty.length, missing, total: rowCount });

    // Completeness
    if (missing > 0 && rowCount > 0) {
      const pct = Math.round((missing / rowCount) * 100);
      if (pct >= 40) {
        findings.push({
          severity: 'major', group: 'Completeness', title: `“${header}” is mostly empty`,
          detail: `${missing} of ${rowCount} values missing (${pct}%).`, count: missing,
          fix: 'Decide whether this field is needed. If it is, source the missing values before import.'
        });
      } else if (pct >= 5) {
        findings.push({
          severity: 'minor', group: 'Completeness', title: `Gaps in “${header}”`,
          detail: `${missing} of ${rowCount} values missing (${pct}%).`, count: missing,
          fix: 'Fill the gaps or mark the field as optional in your import mapping.'
        });
      }
    }

    // Whitespace / case consistency
    const padded: number[] = [];
    values.forEach((v: any, i: number) => {
      if (typeof v === 'string' && v !== v.trim() && v.trim() !== '') padded.push(i + 2);
    });
    if (padded.length) {
      findings.push({
        severity: 'minor', group: 'Formatting', title: `Stray spaces in “${header}”`,
        detail: `${padded.length} value${padded.length > 1 ? 's have' : ' has'} leading or trailing spaces.`,
        rows: padded.slice(0, 12), count: padded.length,
        fix: 'Trim whitespace. " Ltd" and "Ltd" will be treated as different values by most systems.'
      });
    }

    if (type === 'postcode') {
      const bad: number[] = [], samples: any[] = [];
      nonEmpty.forEach((v: any) => {
        const idx = values.indexOf(v);
        if (!UK_POSTCODE.test(String(v).trim())) { bad.push(idx + 2); if (samples.length < 4) samples.push(v); }
      });
      if (bad.length) {
        findings.push({
          severity: 'major', group: 'UK checks', title: `Invalid postcodes in “${header}”`,
          detail: `${bad.length} value${bad.length > 1 ? 's do' : ' does'} not match a valid UK postcode format.`,
          rows: bad.slice(0, 12), samples, count: bad.length,
          fix: 'Invalid postcodes break address lookups, delivery routing and territory reporting.'
        });
      }
      const noSpace = nonEmpty.filter((v: any) => UK_POSTCODE.test(String(v).trim()) && !/\s/.test(String(v).trim()));
      if (noSpace.length && noSpace.length !== nonEmpty.length) {
        findings.push({
          severity: 'minor', group: 'Formatting', title: `Inconsistent postcode spacing in “${header}”`,
          detail: `${noSpace.length} postcode${noSpace.length > 1 ? 's are' : ' is'} written without the space (e.g. SW1A1AA).`,
          count: noSpace.length,
          fix: 'Standardise to the spaced format. Mixed formats prevent exact matching between systems.'
        });
      }
    }

    if (type === 'vat') {
      const badFormat: number[] = [], badChecksum: number[] = [], fSamples: any[] = [], cSamples: any[] = [];
      values.forEach((v: any, i: number) => {
        if (v === '' || v == null) return;
        const s = String(v).trim();
        if (!UK_VAT.test(s.replace(/\s/g, ''))) {
          badFormat.push(i + 2); if (fSamples.length < 4) fSamples.push(s);
        } else {
          const ok = vatChecksumValid(s);
          if (ok === false) { badChecksum.push(i + 2); if (cSamples.length < 4) cSamples.push(s); }
        }
      });
      if (badFormat.length) {
        findings.push({
          severity: 'major', group: 'UK checks', title: `Invalid VAT number format in “${header}”`,
          detail: `${badFormat.length} value${badFormat.length > 1 ? 's are' : ' is'} not a recognisable UK VAT number.`,
          rows: badFormat.slice(0, 12), samples: fSamples, count: badFormat.length,
          fix: 'A UK VAT number is 9 digits, optionally prefixed GB. Wrong numbers invalidate VAT invoices.'
        });
      }
      if (badChecksum.length) {
        findings.push({
          severity: 'critical', group: 'UK checks', title: `VAT numbers that fail the checksum in “${header}”`,
          detail: `${badChecksum.length} number${badChecksum.length > 1 ? 's look' : ' looks'} correct but fail HMRC's mod-97 check — usually a transposed digit.`,
          rows: badChecksum.slice(0, 12), samples: cSamples, count: badChecksum.length,
          fix: 'These will be rejected by HMRC. Verify each against the customer\u2019s VAT certificate.'
        });
      }
    }

    if (type === 'company_no') {
      companyNumberCount = nonEmpty.length;
      const shortNos: number[] = [], badNos: number[] = [], sSamples: any[] = [], bSamples: any[] = [];
      values.forEach((v: any, i: number) => {
        if (v === '' || v == null) return;
        const shape = companyNoShape(v);
        if (shape === 'short') { shortNos.push(i + 2); if (sSamples.length < 4) sSamples.push(String(v)); }
        else if (shape === 'bad') { badNos.push(i + 2); if (bSamples.length < 4) bSamples.push(String(v)); }
      });
      if (shortNos.length) {
        findings.push({
          severity: 'critical', group: 'UK checks', title: `Company numbers with lost leading zeros in “${header}”`,
          detail: `${shortNos.length} number${shortNos.length > 1 ? 's are' : ' is'} fewer than 8 digits. Excel strips leading zeros from numeric cells.`,
          rows: shortNos.slice(0, 12), samples: sSamples, count: shortNos.length,
          fix: 'Pad to 8 digits (e.g. 1234567 becomes 01234567) and store the column as text, not number.'
        });
      }
      if (badNos.length) {
        findings.push({
          severity: 'major', group: 'UK checks', title: `Invalid company numbers in “${header}”`,
          detail: `${badNos.length} value${badNos.length > 1 ? 's do' : ' does'} not match Companies House format.`,
          rows: badNos.slice(0, 12), samples: bSamples, count: badNos.length,
          fix: 'Valid formats are 8 digits, or 2 letters followed by 6 digits (e.g. SC123456).'
        });
      }
    }

    if (type === 'email') {
      const bad: number[] = [], samples: any[] = [], disposable: number[] = [], dSamples: any[] = [];
      values.forEach((v: any, i: number) => {
        if (v === '' || v == null) return;
        const s = String(v).trim().toLowerCase();
        if (!EMAIL.test(s)) { bad.push(i + 2); if (samples.length < 4) samples.push(s); return; }
        const domain = s.split('@')[1];
        if (DISPOSABLE_DOMAINS.includes(domain)) { disposable.push(i + 2); if (dSamples.length < 4) dSamples.push(s); }
      });
      if (bad.length) {
        findings.push({
          severity: 'major', group: 'Contact data', title: `Invalid email addresses in “${header}”`,
          detail: `${bad.length} address${bad.length > 1 ? 'es are' : ' is'} not a valid email format.`,
          rows: bad.slice(0, 12), samples, count: bad.length,
          fix: 'These will hard-bounce and damage your sender reputation. Remove or correct before any send.'
        });
      }
      if (disposable.length) {
        findings.push({
          severity: 'minor', group: 'Contact data', title: `Disposable email addresses in “${header}”`,
          detail: `${disposable.length} address${disposable.length > 1 ? 'es use' : ' uses'} a throwaway domain.`,
          rows: disposable.slice(0, 12), samples: dSamples, count: disposable.length,
          fix: 'These contacts are almost certainly unreachable. Consider excluding them.'
        });
      }
      // duplicate emails
      const emailSeen = new Map<string, number>(); const dupEmails: number[] = []; const deSamples: any[] = [];
      values.forEach((v: any, i: number) => {
        if (v === '' || v == null) return;
        const s = String(v).trim().toLowerCase();
        if (!EMAIL.test(s)) return;
        if (emailSeen.has(s)) { dupEmails.push(i + 2); if (deSamples.length < 4) deSamples.push(s); }
        else emailSeen.set(s, i + 2);
      });
      if (dupEmails.length) {
        findings.push({
          severity: 'major', group: 'Contact data', title: `Repeated email addresses in “${header}”`,
          detail: `${dupEmails.length} address${dupEmails.length > 1 ? 'es appear' : ' appears'} more than once across different rows.`,
          rows: dupEmails.slice(0, 12), samples: deSamples, count: dupEmails.length,
          fix: 'The same person is in your list multiple times under different records. Merge before import.'
        });
      }
    }

    if (type === 'phone') {
      const bad: number[] = [], samples: any[] = [];
      values.forEach((v: any, i: number) => {
        if (v === '' || v == null) return;
        const cleaned = String(v).replace(/[()\s\-.]/g, '');
        if (!UK_PHONE.test(cleaned)) { bad.push(i + 2); if (samples.length < 4) samples.push(String(v)); }
      });
      if (bad.length) {
        findings.push({
          severity: 'minor', group: 'Contact data', title: `Unrecognised phone numbers in “${header}”`,
          detail: `${bad.length} number${bad.length > 1 ? 's do' : ' does'} not match a UK phone format.`,
          rows: bad.slice(0, 12), samples, count: bad.length,
          fix: 'Check for missing leading zeros or international numbers stored without a country code.'
        });
      }
    }

    if (type === 'sort_code') {
      const bad: number[] = [], samples: any[] = [];
      values.forEach((v: any, i: number) => {
        if (v === '' || v == null) return;
        if (!UK_SORT_CODE.test(String(v).trim())) { bad.push(i + 2); if (samples.length < 4) samples.push(String(v)); }
      });
      if (bad.length) {
        findings.push({
          severity: 'critical', group: 'UK checks', title: `Invalid sort codes in “${header}”`,
          detail: `${bad.length} value${bad.length > 1 ? 's are' : ' is'} not six digits.`,
          rows: bad.slice(0, 12), samples, count: bad.length,
          fix: 'A wrong sort code sends money to the wrong bank. Verify before any payment run.'
        });
      }
    }

    if (type === 'date') {
      const amb = detectDateAmbiguity(values);
      if (amb === 'mixed') {
        findings.push({
          severity: 'critical', group: 'Formatting', title: `Mixed date formats in “${header}”`,
          detail: 'This column contains both day-first and month-first dates. Some values are unrecoverable without the source.',
          count: 1,
          fix: 'Standardise to YYYY-MM-DD. Mixed formats silently corrupt reporting and ageing calculations.'
        });
      } else if (amb === 'ambiguous') {
        findings.push({
          severity: 'minor', group: 'Formatting', title: `Ambiguous date format in “${header}”`,
          detail: 'Every day value is 12 or under, so it is impossible to tell whether these are UK or US dates.',
          count: 1,
          fix: 'Convert to YYYY-MM-DD so the format is unambiguous to any system that reads the file.'
        });
      }
    }

    // Casing inconsistency on name-like columns
    if (type === 'company_name' || type === 'unknown') {
      const strings = nonEmpty.filter((v: any) => typeof v === 'string' && /[a-z]/i.test(v));
      if (strings.length > 8) {
        const allCaps = strings.filter((v: any) => v === v.toUpperCase()).length;
        const ratio = allCaps / strings.length;
        if (ratio > 0.1 && ratio < 0.9) {
          findings.push({
            severity: 'minor', group: 'Formatting', title: `Mixed capitalisation in “${header}”`,
            detail: `${allCaps} of ${strings.length} values are in full capitals while the rest are not.`,
            count: allCaps,
            fix: 'Standardise casing. "ACME LTD" and "Acme Ltd" will not match as the same company.'
          });
        }
      }
    }
  });

  // Score
  const weights: Record<string, number> = { critical: 14, major: 6, minor: 2 };
  const penalty = findings.reduce((sum: number, f: any) => sum + weights[f.severity], 0);
  const score = Math.max(0, Math.min(100, 100 - penalty));

  return { findings, score, colProfiles, rowCount, companyNumberCount };
}

// ---------- presentation ----------

const SEV: Record<string, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: 'Critical', color: '#A13B2A', bg: 'rgba(161,59,42,0.07)', border: 'rgba(161,59,42,0.22)' },
  major:    { label: 'Major',    color: '#B07A1E', bg: 'rgba(176,122,30,0.07)', border: 'rgba(176,122,30,0.22)' },
  minor:    { label: 'Minor',    color: '#5A6B57', bg: 'rgba(90,107,87,0.07)',  border: 'rgba(90,107,87,0.20)' },
};

function grade(score: number) {
  if (score >= 90) return { letter: 'A', words: 'Import-ready' };
  if (score >= 75) return { letter: 'B', words: 'Minor cleanup needed' };
  if (score >= 55) return { letter: 'C', words: 'Cleanup needed before use' };
  if (score >= 35) return { letter: 'D', words: 'Significant problems' };
  return { letter: 'E', words: 'Not fit for import' };
}

const SAMPLE_CSV = `Company Name,Company Number,VAT Number,Contact Email,Phone,Postcode,Invoice Date
Harlow Joinery Ltd,08123456,GB123456789,accounts@harlowjoinery.co.uk,020 7946 0102,SW1A 1AA,12/03/2026
BRIGHTON TILE CO,1234567,GB987654321,info@brightontile.co.uk,01273 555019,BN1 1AA,03/11/2026
Fenwick Plumbing,SC123456,GB123456788,,07700 900123,M1 1AE,07/04/2026
Harlow Joinery Ltd,08123456,GB123456789,accounts@harlowjoinery.co.uk,020 7946 0102,SW1A 1AA,12/03/2026
Oakfield Services, 09876543 ,GB12345678,hello@oakfield,0161 496 0999,M11AE,22/05/2026
Kestrel Design Ltd,07654321,GB456123789,studio@kestreldesign.co.uk,+44 7700 900456,EH1 1YZ,2026-05-22
Pinewood Catering,ABC12345,,orders@pinewood.co.uk,555-0100,XYZ 999,15/13/2026
`;

export default function DataHealthChecker() {
  const [state, setState] = useState('idle'); // idle | working | done | error
  const [result, setResult] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '', notes: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback((text: string, name: string) => {
    setState('working');
    setFileName(name);
    setTimeout(() => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: false,
        complete: (res: any) => {
          const headers = (res.meta.fields || []).filter((h: any) => h !== '' && h != null);
          if (!headers.length) {
            setErrorMsg('No column headers found. The first row of the file needs to contain column names.');
            setState('error');
            return;
          }
          if (!res.data.length) {
            setErrorMsg('The file has headers but no data rows.');
            setState('error');
            return;
          }
          const analysis = analyse(res.data, headers);
          setResult(analysis);
          const groups: Record<string, boolean> = {};
          analysis.findings.forEach((f: any) => { groups[f.group] = true; });
          setOpenGroups(groups);
          setState('done');
        },
        error: () => {
          setErrorMsg('That file could not be read as CSV. Save it as .csv from Excel and try again.');
          setState('error');
        }
      });
    }, 220);
  }, []);

  const handleFile = useCallback((file: any) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('That file is over 8MB. Split it or send it over and we will run it for you.');
      setState('error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => run(String(e.target.result), file.name);
    reader.onerror = () => { setErrorMsg('The file could not be opened.'); setState('error'); };
    reader.readAsText(file);
  }, [run]);

  const reset = () => {
    setState('idle'); setResult(null); setFileName(''); setErrorMsg('');
    setShowForm(false); setSent(false); setSendError('');
    setForm({ name: '', email: '', company: '', notes: '' });
  };

  const buildSummary = () => {
    if (!result) return '';
    const lines = [
      `File: ${fileName}`,
      `Rows: ${result.rowCount}`,
      `Columns: ${result.colProfiles.length}`,
      `Score: ${result.score}/100`,
      '',
      'Findings:',
      ...result.findings.map((f: any) => `  [${f.severity.toUpperCase()}] ${f.title} - ${f.detail}`),
      '',
      'Columns detected:',
      ...result.colProfiles.map((c: any) => `  ${c.header} (${c.type}) - ${c.filled}/${c.total} filled`)
    ];
    return lines.join('\n');
  };

  const submitEnquiry = async () => {
    if (!form.email.trim() || !EMAIL.test(form.email.trim())) {
      setSendError('Enter an email address we can reply to.');
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          notes: form.notes,
          _subject: `Data cleaning enquiry - ${fileName} (score ${result.score}/100)`,
          scan_summary: buildSummary()
        })
      });
      if (!res.ok) throw new Error('bad response');
      setSent(true);
    } catch {
      setSendError('That did not send. Email hello@lexalytic.com directly and we will pick it up.');
    } finally {
      setSending(false);
    }
  };

  const g = result ? grade(result.score) : null;
  const counts = result ? {
    critical: result.findings.filter((f: any) => f.severity === 'critical').length,
    major: result.findings.filter((f: any) => f.severity === 'major').length,
    minor: result.findings.filter((f: any) => f.severity === 'minor').length,
  } : null;

  const grouped: Record<string, any[]> = result ? result.findings.reduce((acc: any, f: any) => {
    (acc[f.group] = acc[f.group] || []).push(f);
    return acc;
  }, {} as Record<string, any[]>) : {};

  const groupOrder = ['UK checks', 'Structure', 'Contact data', 'Completeness', 'Formatting'];
  const orderedGroups = groupOrder.filter((k: any) => grouped[k]);

  return (
    <div style={{
      minHeight: '100%', background: '#FDFCFA', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      padding: '0 0 64px'
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .dhc-wrap { max-width: 880px; margin: 0 auto; padding: 0 20px; }
        .dhc-serif { font-family: Georgia, 'Times New Roman', serif; }
        .dhc-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .dhc-btn {
          font: inherit; font-size: 15px; font-weight: 500; cursor: pointer;
          border-radius: 6px; padding: 12px 22px; border: 1px solid transparent;
          transition: background .15s ease, border-color .15s ease;
        }
        .dhc-btn-primary { background: #C17D2E; color: #fff; }
        .dhc-btn-primary:hover { background: #A96C25; }
        .dhc-btn-quiet { background: transparent; color: #55504A; border-color: #DDD6CC; }
        .dhc-btn-quiet:hover { border-color: #B9AF9F; }
        .dhc-btn:focus-visible, .dhc-drop:focus-visible, .dhc-grouphead:focus-visible {
          outline: 2px solid #C17D2E; outline-offset: 2px;
        }
        .dhc-drop {
          border: 1.5px dashed #CFC6B8; border-radius: 10px; background: #fff;
          padding: 56px 32px; text-align: center; cursor: pointer;
          transition: border-color .15s ease, background .15s ease;
        }
        .dhc-drop:hover { border-color: #C17D2E; background: #FFFDF9; }
        .dhc-drop.is-drag { border-color: #C17D2E; background: #FDF6EC; border-style: solid; }
        .dhc-grouphead {
          width: 100%; text-align: left; background: none; border: 0; cursor: pointer;
          padding: 14px 0; display: flex; align-items: baseline; gap: 12px; font: inherit;
          border-bottom: 1px solid #E8E2D8;
        }
        .dhc-finding { padding: 20px 0; border-bottom: 1px solid #EFEAE1; }
        .dhc-finding:last-child { border-bottom: 0; }
        .dhc-chip {
          display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: .04em;
          padding: 3px 9px; border-radius: 3px; border: 1px solid;
        }
        .dhc-rows { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .dhc-rowchip {
          font-size: 12px; padding: 3px 8px; border-radius: 3px;
          background: #F4F0E8; color: #6B6459; border: 1px solid #E6DFD3;
        }
        .dhc-bar { height: 5px; background: #EDE7DD; border-radius: 3px; overflow: hidden; }
        .dhc-bar > i { display: block; height: 100%; background: #C17D2E; }
        .dhc-input {
          font: inherit; font-size: 15px; padding: 11px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.06); color: #fff;
          border: 1px solid rgba(255,255,255,0.15); width: 100%;
        }
        .dhc-input::placeholder { color: rgba(255,255,255,0.35); }
        .dhc-input:focus { outline: 2px solid #C17D2E; outline-offset: 1px; border-color: transparent; }
        .dhc-btn:disabled { opacity: .55; cursor: default; }
        @media (max-width: 620px) {
          .dhc-scorerow { flex-direction: column; align-items: flex-start !important; gap: 24px !important; }
          .dhc-cols { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="dhc-wrap" style={{ padding: '20px' }}>
          <div className="dhc-serif" style={{ fontSize: 20, letterSpacing: '-0.02em' }}>
            Lex<span style={{ color: '#C17D2E' }}>alytic</span>
          </div>
        </div>
      </div>

      <div className="dhc-wrap" style={{ paddingTop: 48 }}>

        {/* Intro — only on idle/error */}
        {(state === 'idle' || state === 'error') && (
          <>
            <h1 className="dhc-serif" style={{
              fontSize: 'clamp(1.9rem, 4.5vw, 2.9rem)', lineHeight: 1.14,
              letterSpacing: '-0.025em', margin: '0 0 18px', maxWidth: 620, fontWeight: 400
            }}>
              Check a spreadsheet before it becomes a problem.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 600, margin: '0 0 8px' }}>
              Upload a customer, supplier or contact list and this checks it against the things
              that actually break UK business systems: postcodes that do not exist, VAT numbers that
              fail HMRC's checksum, company numbers Excel has stripped the leading zero from,
              and dates nobody can read the same way twice.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 600, margin: '0 0 36px' }}>
              Your file is read in your browser and never uploaded anywhere.
            </p>

            <div
              className={`dhc-drop${dragging ? ' is-drag' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
            >
              <div className="dhc-serif" style={{ fontSize: 19, marginBottom: 8 }}>
                Drop a CSV here
              </div>
              <div style={{ fontSize: 14, color: '#8A8279' }}>
                or click to choose a file — up to 8MB
              </div>
              <input
                ref={inputRef} type="file" accept=".csv,text/csv" style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files?.[0])}
              />
            </div>

            {state === 'error' && (
              <div style={{
                marginTop: 16, padding: '14px 18px', borderRadius: 8,
                background: SEV.critical.bg, border: `1px solid ${SEV.critical.border}`,
                color: SEV.critical.color, fontSize: 14, lineHeight: 1.6
              }}>
                {errorMsg}
              </div>
            )}

            <div style={{ marginTop: 20, fontSize: 14, color: '#8A8279' }}>
              No file to hand?{' '}
              <button
                onClick={() => run(SAMPLE_CSV, 'sample-supplier-list.csv')}
                style={{
                  background: 'none', border: 0, padding: 0, font: 'inherit',
                  color: '#C17D2E', cursor: 'pointer', textDecoration: 'underline'
                }}
              >
                Run a sample supplier list
              </button>
            </div>

            <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid #E8E2D8' }}>
              <h2 className="dhc-serif" style={{ fontSize: 17, fontWeight: 400, margin: '0 0 20px' }}>
                What gets checked
              </h2>
              <div className="dhc-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px' }}>
                {[
                  ['UK postcodes', 'Flags values that are not a real postcode format, and mixed spacing that stops records matching between systems.'],
                  ['VAT numbers', 'Runs HMRC\u2019s mod-97 checksum, not just a length check. Catches transposed digits that look fine but get rejected.'],
                  ['Company numbers', 'Finds numbers where Excel has stripped the leading zero — the single most common cause of failed Companies House lookups.'],
                  ['Dates', 'Detects columns holding both day-first and month-first dates, which silently corrupts every ageing report built on them.'],
                  ['Duplicates', 'Exact duplicate rows, and the same email address appearing across several different records.'],
                  ['Emails and phones', 'Invalid formats, throwaway domains, and numbers that have lost their leading zero.'],
                ].map(([t, d]: any) => (
                  <div key={t}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{t}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: '#6B6459' }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {state === 'working' && (
          <div style={{ padding: '80px 0', textAlign: 'center', color: '#8A8279', fontSize: 15 }}>
            Reading {fileName}…
          </div>
        )}

        {state === 'done' && result && (
          <>
            {/* Report header */}
            <div style={{ marginBottom: 8, fontSize: 13, color: '#8A8279' }}>
              <span className="dhc-mono">{fileName}</span> · {result.rowCount} rows · {result.colProfiles.length} columns
            </div>

            <div className="dhc-scorerow" style={{
              display: 'flex', alignItems: 'flex-end', gap: 40,
              paddingBottom: 28, borderBottom: '2px solid #1A1815', marginBottom: 4
            }}>
              <div>
                <div className="dhc-serif" style={{
                  fontSize: 76, lineHeight: 0.9, letterSpacing: '-0.04em',
                  color: result.score >= 75 ? '#4A7C59' : result.score >= 45 ? '#B07A1E' : '#A13B2A'
                }}>
                  {g!.letter}
                </div>
              </div>
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div className="dhc-serif" style={{ fontSize: 24, marginBottom: 10, letterSpacing: '-0.01em' }}>
                  {g!.words}
                </div>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14, color: '#57514A' }}>
                  {counts!.critical > 0 && <span><strong style={{ color: SEV.critical.color }}>{counts!.critical}</strong> critical</span>}
                  {counts!.major > 0 && <span><strong style={{ color: SEV.major.color }}>{counts!.major}</strong> major</span>}
                  {counts!.minor > 0 && <span><strong style={{ color: SEV.minor.color }}>{counts!.minor}</strong> minor</span>}
                  {result.findings.length === 0 && <span>No issues found.</span>}
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 16,
              flexWrap: 'wrap', marginBottom: 40
            }}>
              <span style={{ fontSize: 12, color: '#8A8279' }}>Score {result.score}/100</span>
              {result.findings.length > 0 && (
                <a
                  href="#dhc-offer"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('dhc-offer')?.scrollIntoView({
                      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                      block: 'start'
                    });
                  }}
                  style={{ fontSize: 12, color: '#C17D2E', textDecoration: 'underline', textUnderlineOffset: 2 }}
                >
                  Or have us fix all of this for you
                </a>
              )}
            </div>

            {result.findings.length === 0 && (
              <div style={{
                padding: 28, borderRadius: 10, background: 'rgba(74,124,89,0.06)',
                border: '1px solid rgba(74,124,89,0.2)', marginBottom: 40
              }}>
                <div className="dhc-serif" style={{ fontSize: 18, marginBottom: 8 }}>Nothing to fix.</div>
                <div style={{ fontSize: 15, lineHeight: 1.7, color: '#57514A' }}>
                  Every check passed. This file is ready to import.
                </div>
              </div>
            )}

            {/* Findings */}
            {orderedGroups.map((groupName: string) => {
              const items = grouped[groupName];
              const open = openGroups[groupName];
              return (
                <div key={groupName} style={{ marginBottom: 12 }}>
                  <button
                    className="dhc-grouphead"
                    onClick={() => setOpenGroups(p => ({ ...p, [groupName]: !p[groupName] }))}
                    aria-expanded={open}
                  >
                    <span className="dhc-serif" style={{ fontSize: 19 }}>{groupName}</span>
                    <span style={{ fontSize: 13, color: '#8A8279' }}>
                      {items.length} finding{items.length > 1 ? 's' : ''}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: 13, color: '#8A8279' }}>
                      {open ? 'Hide' : 'Show'}
                    </span>
                  </button>

                  {open && items.map((f: any, i: number) => {
                    const s = SEV[f.severity];
                    return (
                      <div key={i} className="dhc-finding">
                        <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap' }}>
                          <span className="dhc-chip" style={{ color: s.color, background: s.bg, borderColor: s.border }}>
                            {s.label}
                          </span>
                          <span style={{ fontSize: 16, fontWeight: 600 }}>{f.title}</span>
                        </div>
                        <div style={{ fontSize: 15, lineHeight: 1.7, color: '#4A453F', marginBottom: 10 }}>
                          {f.detail}
                        </div>
                        {f.samples && f.samples.length > 0 && (
                          <div style={{ margin: '0 0 10px' }}>
                            <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 5 }}>Examples found</div>
                            <div className="dhc-rows">
                              {f.samples.map((v: any, j: number) => (
                                <span key={j} className="dhc-rowchip dhc-mono" style={{ background: '#fff' }}>
                                  {String(v).slice(0, 40) || '(blank)'}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {f.rows && f.rows.length > 0 && (
                          <div style={{ margin: '0 0 12px' }}>
                            <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 5 }}>
                              Spreadsheet row{f.rows.length > 1 ? 's' : ''}
                              {f.count > f.rows.length ? ` (first ${f.rows.length} of ${f.count})` : ''}
                            </div>
                            <div className="dhc-rows">
                              {f.rows.map((r: number) => <span key={r} className="dhc-rowchip dhc-mono">{r}</span>)}
                            </div>
                          </div>
                        )}
                        <div style={{
                          fontSize: 14, lineHeight: 1.65, color: '#57514A',
                          paddingLeft: 14, borderLeft: `2px solid ${s.border}`
                        }}>
                          {f.fix}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Column map */}
            <div style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid #E8E2D8' }}>
              <h2 className="dhc-serif" style={{ fontSize: 19, fontWeight: 400, margin: '0 0 4px' }}>
                Columns read
              </h2>
              <p style={{ fontSize: 14, color: '#8A8279', margin: '0 0 20px' }}>
                What each column was recognised as, and how much of it is filled in.
              </p>
              {result.colProfiles.map((c: any) => {
                const pct = c.total ? Math.round((c.filled / c.total) * 100) : 0;
                const typeLabel = ({
                  postcode: 'UK postcode', vat: 'VAT number', company_no: 'Company number',
                  email: 'Email', phone: 'Phone', sort_code: 'Sort code', date: 'Date',
                  company_name: 'Company name', unknown: 'Text'
                } as Record<string, string>)[c.type];
                return (
                  <div key={c.header} style={{
                    display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) 96px 1fr 52px',
                    gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F0EBE2'
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.header}
                    </div>
                    <div style={{ fontSize: 12, color: c.type === 'unknown' ? '#A39C92' : '#C17D2E' }}>
                      {typeLabel}
                    </div>
                    <div className="dhc-bar"><i style={{ width: `${pct}%` }} /></div>
                    <div style={{ fontSize: 12, color: '#8A8279', textAlign: 'right' }}>{pct}%</div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <button className="dhc-btn dhc-btn-quiet" onClick={reset}>Check another file</button>
            </div>

            {/* What this cannot check */}
            <div style={{ marginTop: 44, paddingTop: 28, borderTop: '1px solid #E8E2D8' }}>
              <h2 className="dhc-serif" style={{ fontSize: 19, fontWeight: 400, margin: '0 0 4px' }}>
                What this scan cannot tell you
              </h2>
              <p style={{ fontSize: 14, color: '#8A8279', margin: '0 0 20px', maxWidth: 560 }}>
                Everything above is checked against formatting rules, in your browser. These need checking against live records.
              </p>
              <div style={{ border: '1px solid #E8E2D8', borderRadius: 8, overflow: 'hidden' }}>
                {[
                  [
                    result.companyNumberCount > 0
                      ? `Whether those ${result.companyNumberCount} companies still exist`
                      : 'Whether the companies still exist',
                    'A company number can be perfectly formatted and belong to a business dissolved four years ago. We check every number against Companies House and report the current status.'
                  ],
                  [
                    'Whether the email addresses still work',
                    'Format validation catches typos. It does not catch a valid address at a domain that stopped resolving when the company folded.'
                  ],
                  [
                    'Whether two differently spelled records are the same company',
                    'Exact duplicates are easy. "Harlow Joinery Ltd" and "Harlow Joinery Limited" on separate rows need fuzzy matching to find.'
                  ],
                  [
                    'Whether the addresses are real',
                    'A valid postcode format is not the same as a postcode that exists, or one that matches the street named beside it.'
                  ],
                ].map(([t, d]: any, i: number) => (
                  <div key={i} style={{
                    padding: '18px 22px', background: '#fff',
                    borderBottom: i < 3 ? '1px solid #EFEAE1' : 'none'
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>{t}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.65, color: '#6B6459' }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offer */}
            <div id="dhc-offer" style={{
              marginTop: 32, padding: 32, borderRadius: 10,
              background: '#1A1815', color: '#fff', scrollMarginTop: 24
            }}>
              <div className="dhc-serif" style={{ fontSize: 22, marginBottom: 12, letterSpacing: '-0.01em' }}>
                {result.findings.length > 0
                  ? 'Send it over and get it back clean.'
                  : 'The formatting is fine. The records may not be.'}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 540 }}>
                {result.findings.length > 0
                  ? 'We fix every issue listed above, verify each company against Companies House, check the email domains still resolve, merge the near duplicates, and send the corrected file back within 24 hours.'
                  : 'Nothing here needs fixing. What we would still do is verify each company against Companies House and check the email domains still resolve, which a formatting scan cannot see.'}
              </p>
              <div style={{
                display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24,
                paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.12)'
              }}>
                {([['Up to 1,000 rows', '\u00a399'], ['Up to 10,000 rows', '\u00a3199'], ['Up to 50,000 rows', '\u00a3299']] as [string, string][]).map(([label, price]) => (
                  <div key={label}>
                    <div className="dhc-serif" style={{ fontSize: 22, color: '#C17D2E', lineHeight: 1.2 }}>{price}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{label}</div>
                  </div>
                ))}
              </div>
              {sent ? (
                <div style={{
                  padding: '20px 22px', borderRadius: 8,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)'
                }}>
                  <div className="dhc-serif" style={{ fontSize: 18, marginBottom: 8 }}>
                    Got it. Now send us the file.
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                    Email <strong style={{ color: '#C17D2E' }}>hello@lexalytic.com</strong> with{' '}
                    <span className="dhc-mono" style={{ color: 'rgba(255,255,255,0.8)' }}>{fileName}</span>{' '}
                    attached. We have the scan results already, so we will come back with a fixed price
                    and a turnaround the same working day.
                  </p>
                </div>
              ) : !showForm ? (
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button className="dhc-btn dhc-btn-primary" onClick={() => setShowForm(true)}>
                    Get a fixed price for this file
                  </button>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    Takes a minute. No file upload needed yet.
                  </span>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: '0 0 16px', lineHeight: 1.6 }}>
                    We will send this scan summary with your enquiry so we can price it accurately.
                    Your file stays on your machine until you choose to send it.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
                    <input
                      className="dhc-input" type="text" placeholder="Your name" autoComplete="name"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      className="dhc-input" type="email" placeholder="Email address" autoComplete="email"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      onKeyDown={e => { if (e.key === 'Enter') submitEnquiry(); }}
                    />
                  </div>
                  <input
                    className="dhc-input" type="text" placeholder="Company (optional)" autoComplete="organization"
                    style={{ width: '100%', marginBottom: 12 }}
                    value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                  />
                  <textarea
                    className="dhc-input" rows={3} placeholder="Anything we should know? (optional)"
                    style={{ width: '100%', marginBottom: 14, resize: 'vertical' }}
                    value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  />
                  {sendError && (
                    <div style={{
                      fontSize: 13, color: '#E8A08F', marginBottom: 12,
                      padding: '10px 14px', borderRadius: 6, background: 'rgba(161,59,42,0.2)'
                    }}>
                      {sendError}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button className="dhc-btn dhc-btn-primary" type="button" onClick={submitEnquiry} disabled={sending}>
                      {sending ? 'Sending…' : 'Send enquiry'}
                    </button>
                    <button
                      type="button" onClick={() => setShowForm(false)}
                      style={{
                        background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                        color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
