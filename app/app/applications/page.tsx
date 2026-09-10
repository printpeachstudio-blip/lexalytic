import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AppNav from '@/components/app/AppNav'
import { money2, fmtDate } from '@/lib/retention'

export const metadata: Metadata = {
  title: 'Applications | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data } = await supabase
    .from('applications').select('*').order('sent_on', { ascending: false })

  const apps = data ?? []
  const total = apps.reduce((s: number, a: any) => s + Number(a.total_claimed) + Number(a.total_interest), 0)

  const byContractor: Record<string, any[]> = {}
  apps.forEach((a: any) => { (byContractor[a.contractor] = byContractor[a.contractor] || []).push(a) })

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <AppNav current="/app/applications" />

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '38px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 8px' }}>Applications sent</h1>
        <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 600 }}>
          Every application for release you have generated. Each follow up letter refers back to the
          last one sent to that contractor, which is considerably harder to ignore than a fresh request.
        </p>

        {apps.length === 0 ? (
          <div style={{ padding: '28px 30px', background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginBottom: 8 }}>Nothing sent yet</div>
            <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: '0 0 18px' }}>
              When retention passes its release date, generate an application from the jobs page and it
              will be recorded here.
            </p>
            <Link href="/app" style={{ fontSize: 15, color: '#C17D2E' }}>Back to jobs</Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 34, flexWrap: 'wrap', alignItems: 'flex-end',
              padding: '22px 26px', background: '#fff', border: '1px solid #E8E2D8',
              borderRadius: 10, marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, lineHeight: 1.1 }}>{money2(total)}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Applied for in total</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>{apps.length}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Applications</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>
                  {Object.keys(byContractor).length}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Contractors chased</div>
              </div>
            </div>

            {Object.entries(byContractor).map(([contractor, list]) => (
              <div key={contractor} style={{ background: '#fff', border: '1px solid #E8E2D8',
                borderRadius: 10, marginBottom: 14, overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0EBE2',
                  display: 'flex', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{contractor}</span>
                  <span style={{ fontSize: 13, color: '#8A8279' }}>
                    {list.length} application{list.length === 1 ? '' : 's'}
                    {list.length > 1 ? `, first on ${fmtDate(list[list.length - 1].sent_on)}` : ''}
                  </span>
                </div>
                {list.map((a: any, i: number) => (
                  <div key={a.id} style={{ padding: '13px 24px',
                    borderBottom: i < list.length - 1 ? '1px solid #F7F4EF' : 'none',
                    display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, minWidth: 120, color: '#57514A' }}>{fmtDate(a.sent_on)}</span>
                    <span style={{ fontSize: 14, fontWeight: 500, minWidth: 100 }}>{money2(a.total_claimed)}</span>
                    <span style={{ fontSize: 13, color: '#8A8279' }}>
                      plus {money2(a.total_interest)} interest · {a.job_ids?.length ?? 0} release{(a.job_ids?.length ?? 0) === 1 ? '' : 's'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
