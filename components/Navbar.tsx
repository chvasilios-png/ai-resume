'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user)
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">AI Resume</Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <button onClick={handleLogout} className="btn-secondary text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">Sign In</Link>
                <Link href="/auth/signup" className="btn-primary text-sm">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}