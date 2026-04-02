'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '../utils/supabase/client'

export default function NavBar() {
  const pathname = usePathname()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/generate', label: 'Generate' },
    { href: '/account', label: 'Account' },
  ]

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/dashboard" className="text-xl font-bold tracking-tight">
        CoverLetterAI
      </Link>
      <div className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors ${
              pathname === href
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </Link>
        ))}
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}
