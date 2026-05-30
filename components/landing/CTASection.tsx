'use client'

import Link from 'next/link'

export function CTASection() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
        <p className="text-xl mb-8">Join thousands using AI Resume to get hired faster.</p>
        <Link href="/auth/signup" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Start Free Today</Link>
      </div>
    </section>
  )
}