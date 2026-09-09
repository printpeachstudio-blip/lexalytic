import {
  type JobRow, type Profile, type Stage,
  stagesFor, money2, fmtLong, STAT_RATE, BOE_BASE,
} from './retention'

export interface LetterItem { job: JobRow; stage: Stage }

export function buildLetterHtml(
  contractor: string,
  items: LetterItem[],
  profile: Profile,
  previous?: { sent_on: string | null; total_claimed: number } | null
): string {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const r2 = (n: number) => Math.round(n * 100) / 100
  const total = items.reduce((s, i) => s + r2(i.stage.outstanding), 0)
  const interest = items.reduce((s, i) => s + r2(i.stage.interest), 0)

  const rows = items.map(i => `
    <tr>
      <td>${i.job.ref}</td>
      <td>${i.stage.label}</td>
      <td>${fmtLong(i.stage.due)}</td>
      <td>${i.stage.days !== null && i.stage.days < 0 ? Math.abs(i.stage.days) + ' days' : 'now due'}</td>
      <td class="r">${money2(i.stage.outstanding)}</td>
      <td class="r">${money2(i.stage.interest)}</td>
    </tr>`).join('')

  const partPaid = items.filter(i => i.stage.received > 0)
  const partPaidNote = partPaid.length ? `
    <p>We acknowledge receipt of ${money2(partPaid.reduce((s, i) => s + Number(i.stage.received), 0))}
    against the sums below. The figures stated are the balances remaining.</p>` : ''

  const followUp = previous?.sent_on ? `
    <p>Further to our application of ${fmtLong(previous.sent_on)}, in which
    ${money2(previous.total_claimed)} was applied for, the sums below remain outstanding.</p>` : ''

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Application for release of retention</title>
<style>
  @page { margin: 22mm; }
  body { font-family: Georgia,'Times New Roman',serif; color:#111; line-height:1.6; max-width:720px; margin:0 auto; padding:28px; font-size:14px; }
  h1 { font-size:19px; margin:0 0 14px; }
  h2 { font-size:15px; margin:22px 0 8px; }
  .from { text-align:right; color:#444; margin:0 0 26px; }
  .meta { color:#444; margin-bottom:22px; }
  table { width:100%; border-collapse:collapse; margin:16px 0 20px; font-size:13px; }
  th,td { text-align:left; padding:8px 6px; border-bottom:1px solid #ddd; }
  th { border-bottom:2px solid #333; font-weight:600; }
  .r { text-align:right; }
  tfoot td { border-bottom:0; border-top:2px solid #333; }
  .sign { margin-top:34px; }
  .note { font-size:12px; color:#666; border-top:1px solid #ddd; padding-top:14px; margin-top:30px; }
  @media print { .noprint { display:none; } }
</style></head>
<body>
  <div class="noprint" style="background:#1A1815;color:#fff;padding:14px 18px;border-radius:8px;margin-bottom:26px;font-family:-apple-system,sans-serif;font-size:13px;">
    Print or save as PDF from your browser. Check the figures before sending.
  </div>

  <p class="from">${profile.company_name || ''}${profile.address ? '<br/>' + profile.address.replace(/\n/g, '<br/>') : ''}${profile.phone ? '<br/>' + profile.phone : ''}</p>

  <h1>Application for release of retention</h1>
  <p class="meta">To: ${contractor}<br/>Date: ${today}</p>

  ${followUp}
  <p>We write to apply for the release of retention monies held in respect of the works listed below.
  In each case the contractual milestone triggering release has passed.</p>
  ${partPaidNote}

  <table>
    <thead><tr><th>Contract</th><th>Release stage</th><th>Fell due</th><th>Overdue</th><th class="r">Balance</th><th class="r">Interest</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr><td colspan="4"><strong>Total</strong></td><td class="r"><strong>${money2(total)}</strong></td><td class="r"><strong>${money2(interest)}</strong></td></tr></tfoot>
  </table>

  <p><strong>Total now due, including statutory interest: ${money2(total + interest)}</strong></p>

  <h2>Basis of this application</h2>
  <p>Under the Housing Grants, Construction and Regeneration Act 1996 as amended, where the paying party
  does not serve a valid payment notice, and does not serve a pay less notice before the final date for
  payment, the sum stated in the payee's application becomes the notified sum and is payable in full.</p>
  <p>Section 113 renders pay when paid provisions ineffective except on the insolvency of a third party,
  and the release of retention cannot be made conditional on matters arising under a separate contract.</p>
  <p>Interest is calculated under the Late Payment of Commercial Debts (Interest) Act 1998 at
  ${STAT_RATE.toFixed(2)}% per annum, being the Bank of England base rate of ${BOE_BASE}% plus eight
  percentage points, accruing on a simple basis from the date each sum fell due. Fixed compensation may
  also be recoverable in addition.</p>

  <h2>Requested action</h2>
  <p>We request payment of ${money2(total + interest)} within 14 days of the date of this letter. If a
  pay less notice is to be served, please provide it within the period allowed under the contract,
  stating the basis of any deduction.</p>
  <p>In the absence of payment or a valid notice we reserve the right to refer the matter to adjudication
  under section 108 of the Act. An adjudicator is appointed within seven days of a notice of adjudication
  and reaches a decision within twenty eight days, binding on an interim basis. We also reserve the right
  to suspend performance on any live contract following the required notice period.</p>

  <p class="sign">Yours faithfully<br/><br/><br/>_______________________<br/>${profile.contact_name || ''}${profile.contact_name ? '<br/>' : ''}For and on behalf of ${profile.company_name || ''}</p>

  <p class="note">Prepared using the Lexalytic Retention Manager. Figures are taken from the contract
  values, certified sums, receipts and dates recorded. Check your contract particulars, which may vary
  the release mechanism, before sending.</p>
</body></html>`
}
