'use client'

import Link from 'next/link'

export function PricingSection() {
  const plans = [
    { name: 'Starter', price: '$9', period: '/month', features: ['5 resumes/month', '5 cover letters/month', 'Email support'] },
    { name: 'Professional', price: '$29', period: '/month', features: ['Unlimited resumes', 'Unlimited cover letters', 'Priority support'], popular: true },
    { name: 'Enterprise', price: 'Custom', period: 'Contact us', features: ['Everything in Pro', 'Team collaboration', 'API access'] },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-lg border-2 p-8 ${plan.popular ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}>
              {plan.popular && <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold inline-block mb-4">Most Popular</div>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6"><span className="text-4xl font-bold">{plan.price}</span><span className="text-gray-600">{plan.period}</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => <li key={j} className="flex items-center"><span className="text-green-500 mr-2">✓</span>{feature}</li>)}
              </ul>
              <Link href="/auth/signup" className={`w-full py-3 rounded-lg font-semibold text-center transition block ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>Get Started</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}