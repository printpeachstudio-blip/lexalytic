import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import AppNav from '@/components/app/AppNav'
import TeamPanel from '@/components/app/TeamPanel'

export const metadata: Metadata = {
  title: 'Team | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: m } = await supabase
    .from('organisation_members').select('org_id, role').eq('user_id', user.id).limit(1).single()

  const { data: org } = m
    ? await supabase.from('organisations').select('id, name, owner_id').eq('id', m.org_id).single()
    : { data: null }

  const isOwner = org?.owner_id === user.id

  const { data: members } = m
    ? await supabase.from('organisation_members').select('user_id, role, created_at').eq('org_id', m.org_id)
    : { data: [] }

  const { data: invites } = isOwner
    ? await supabase.from('invitations').select('*').is('accepted_at', null).order('created_at', { ascending: false })
    : { data: [] }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <AppNav current="/app/team" />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '38px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 8px' }}>Team</h1>
        <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 580 }}>
          {isOwner
            ? 'Everyone you invite sees the same jobs, applications and figures. Useful when the person who does the work is not the person who chases the money.'
            : `You are a member of ${org?.name || 'this organisation'}. Only the owner can invite others.`}
        </p>
        <TeamPanel
          isOwner={isOwner}
          memberCount={members?.length ?? 1}
          invites={(invites ?? []) as any[]}
        />
      </div>
    </div>
  )
}
