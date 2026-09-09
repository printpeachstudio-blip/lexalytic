import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { saveProfile } from '../actions'

export const metadata: Metadata = {
  title: 'Settings | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single()

  const { data: m } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()

  const { data: org } = m
    ? await supabase.from('organisations').select('name, reminder_email, reminders_enabled').eq('id', m.org_id).single()
    : { data: null }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .s-in { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .s-in:focus-visible { outline: 2px solid #C17D2E; outline-offset: 1px; }
        .s-label { display: block; font-size: 13px; color: #57514A; margin-bottom: 5px; }
        .s-field { margin-bottom: 16px; }
        .s-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 22px; border: 0; background: #C17D2E; color: #fff; }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 940, margin: '0 auto', padding: 20, display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/app" style={{ fontFamily: 'Georgia, serif', fontSize: 20,
            letterSpacing: '-0.02em', color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: '#C17D2E' }}>alytic</span>
          </Link>
          <Link href="/app" style={{ fontSize: 14, color: '#8A8279' }}>Back to jobs</Link>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 8px' }}>Your details</h1>
        <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 28px' }}>
          These appear at the top of any application for release you generate, so the contractor
          knows who is applying and where to send payment.
        </p>

        {params?.saved && (
          <div style={{ fontSize: 14, color: '#3F6B4C', background: 'rgba(63,107,76,0.07)',
            border: '1px solid rgba(63,107,76,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 20 }}>
            Saved.
          </div>
        )}

        <form action={saveProfile}>
          <div className="s-field">
            <label className="s-label" htmlFor="company_name">Company name</label>
            <input id="company_name" name="company_name" className="s-in" defaultValue={profile?.company_name || ''} />
          </div>
          <div className="s-field">
            <label className="s-label" htmlFor="contact_name">Your name</label>
            <input id="contact_name" name="contact_name" className="s-in" defaultValue={profile?.contact_name || ''} />
          </div>
          <div className="s-field">
            <label className="s-label" htmlFor="address">Address</label>
            <textarea id="address" name="address" rows={3} className="s-in" style={{ resize: 'vertical' }}
              defaultValue={profile?.address || ''} />
          </div>
          <div className="s-field">
            <label className="s-label" htmlFor="phone">Phone</label>
            <input id="phone" name="phone" className="s-in" defaultValue={profile?.phone || ''} />
          </div>
          <div style={{ marginTop: 34, paddingTop: 26, borderTop: '1px solid #E8E2D8' }}>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400,
              letterSpacing: '-0.01em', margin: '0 0 8px' }}>Reminders</h2>
            <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, margin: '0 0 18px' }}>
              We email at 90, 30 and 7 days before each release falls due, then again at 7 and 30 days
              overdue. One email covering everything, not one per job.
            </p>

            <div className="s-field">
              <label className="s-label" htmlFor="reminder_email">Send reminders to</label>
              <input id="reminder_email" name="reminder_email" type="email" className="s-in"
                defaultValue={org?.reminder_email || user.email || ''} />
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
                Often better going to whoever chases payments rather than to you.
              </div>
            </div>

            <label style={{ fontSize: 15, display: 'flex', gap: 10, alignItems: 'center',
              cursor: 'pointer', marginBottom: 24 }}>
              <input type="checkbox" name="reminders_enabled" defaultChecked={org?.reminders_enabled !== false} />
              Send me reminders
            </label>
          </div>

          <button className="s-btn" type="submit">Save details</button>
        </form>

        <p style={{ fontSize: 14, color: '#8A8279', marginTop: 32, paddingTop: 20, borderTop: '1px solid #E8E2D8' }}>
          Signed in as {user.email}
        </p>
      </div>
    </div>
  )
}
