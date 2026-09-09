import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import JobsList from '@/components/app/JobsList'
import type { JobRow } from '@/lib/retention'

export const metadata: Metadata = {
  title: 'Retention Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function AppPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data } = await supabase
    .from('job_positions')
    .select('*')
    .order('created_at', { ascending: false })

  const jobs = (data ?? []) as JobRow[]

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

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '40px 20px' }}>
        <JobsList jobs={jobs} />
      </div>
    </div>
  )
}
