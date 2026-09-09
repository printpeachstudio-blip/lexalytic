import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export const metadata: Metadata = {
  title: 'Sign in | Lexalytic Retention Manager',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
          <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: 20,
            letterSpacing: '-0.02em', color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: '#C17D2E' }}>alytic</span>
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '70px 20px' }}>
        <Suspense fallback={null}>
          <AuthForm mode="signin" />
        </Suspense>
      </div>
    </div>
  )
}
