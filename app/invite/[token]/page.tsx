import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AcceptInvite from '@/components/app/AcceptInvite'

export const metadata: Metadata = {
  title: 'Join a team | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(`/signup?next=${encodeURIComponent(`/invite/${token}`)}`)

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
          <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: 20,
            letterSpacing: '-0.02em', color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: '#C17D2E' }}>alytic</span>
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '70px 20px' }}>
        <AcceptInvite token={token} email={user.email || ''} />
      </div>
    </div>
  )
}
