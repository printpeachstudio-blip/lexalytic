import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import JobsList from '@/components/app/JobsList'
import type { JobRow, Receipt, Profile } from '@/lib/retention'

export const metadata: Metadata = {
  title: 'Retention Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function AppPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const [{ data: jobsData }, { data: profileData }, { data: appsData }] = await Promise.all([
    supabase.from('job_positions').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('company_name, contact_name, address, phone').eq('id', user.id).single(),
    supabase.from('applications').select('contractor, sent_on, total_claimed').order('sent_on', { ascending: false }),
  ])

  const jobs = (jobsData ?? []) as JobRow[]

  const { data: receiptsData } = jobs.length
    ? await supabase.from('receipts').select('*').in('job_id', jobs.map(j => j.id)).order('received_on', { ascending: false })
    : { data: [] as Receipt[] }

  // Most recent application per contractor
  const lastApplications: Record<string, { sent_on: string | null; total_claimed: number }> = {}
  ;(appsData ?? []).forEach((a: any) => {
    if (!lastApplications[a.contractor]) {
      lastApplications[a.contractor] = { sent_on: a.sent_on, total_claimed: Number(a.total_claimed) }
    }
  })

  const profile = (profileData ?? { company_name: null, contact_name: null, address: null, phone: null }) as Profile
  const needsProfile = !profile.company_name || !profile.address

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: 20, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/app" style={{ fontFamily: 'Georgia, serif', fontSize: 20,
            letterSpacing: '-0.02em', color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: '#C17D2E' }}>alytic</span>
            <span style={{ fontFamily: 'inherit', fontSize: 13, color: '#8A8279', marginLeft: 12 }}>
              Retention Manager
            </span>
          </Link>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Link href="/app/settings" style={{ fontSize: 14, color: '#8A8279' }}>Settings</Link>
            <form action="/auth/signout" method="post">
              <button type="submit" style={{ background: 'none', border: 0, font: 'inherit',
                fontSize: 14, color: '#8A8279', cursor: 'pointer' }}>Sign out</button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '36px 20px' }}>
        {needsProfile && jobs.length > 0 && (
          <div style={{ padding: '16px 20px', borderRadius: 8, marginBottom: 22,
            background: 'rgba(176,122,30,0.07)', border: '1px solid rgba(176,122,30,0.22)',
            fontSize: 14, color: '#8F6318', lineHeight: 1.65 }}>
            Add your company name and address in{' '}
            <Link href="/app/settings" style={{ color: '#8F6318', fontWeight: 600 }}>settings</Link>{' '}
            so applications have a sender on them.
          </div>
        )}

        <JobsList
          jobs={jobs}
          receipts={(receiptsData ?? []) as Receipt[]}
          profile={profile}
          lastApplications={lastApplications}
        />
      </div>
    </div>
  )
}
