import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AppNav from '@/components/app/AppNav'
import ArchiveList from '@/components/app/ArchiveList'

export const metadata: Metadata = {
  title: 'Archive | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function ArchivePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data } = await supabase
    .from('archived_jobs').select('*').order('updated_at', { ascending: false })

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <AppNav current="/app/archive" />
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '38px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 8px' }}>Archive</h1>
        <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 600 }}>
          Jobs you have finished with. They are kept rather than deleted, so the record stays intact,
          and anything archived by mistake can be brought back.
        </p>
        <ArchiveList jobs={(data ?? []) as any[]} />
      </div>
    </div>
  )
}
