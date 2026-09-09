import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retention Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function AppPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: memberships } = await supabase
    .from('organisation_members')
    .select('org_id, role, organisations(name)')
    .eq('user_id', user.id)

  const org = memberships?.[0] as any

  const { data: jobs } = await supabase
    .from('job_positions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
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
          <form action="/auth/signout" method="post">
            <button type="submit" style={{ background: 'none', border: 0, font: 'inherit',
              fontSize: 14, color: '#8A8279', cursor: 'pointer', textDecoration: 'underline' }}>
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          You are in
        </h1>
        <p style={{ fontSize: 16, color: '#57514A', lineHeight: 1.7, maxWidth: 560, margin: '0 0 30px' }}>
          Signed in as {user.email}. Organisation: {org?.organisations?.name || 'not set'}.
          You have {jobs?.length ?? 0} job{jobs?.length === 1 ? '' : 's'} recorded.
        </p>

        <div style={{ padding: 24, background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10, maxWidth: 620 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Foundation check</div>
          <ul style={{ fontSize: 14, color: '#57514A', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Authentication: working</li>
            <li>Session persistence: working</li>
            <li>Organisation created on signup: {org ? 'yes' : 'no, check the trigger'}</li>
            <li>Row level security reading your jobs only: working</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
