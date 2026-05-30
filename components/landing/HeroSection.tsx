'use client'

import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Get Your Dream Job with AI</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Create professional resumes and cover letters in minutes using AI.</p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Get Started Free</Link>
          <Link href="#features" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">Learn More</Link>
        </div>
      </div>
    </section>
  )
}