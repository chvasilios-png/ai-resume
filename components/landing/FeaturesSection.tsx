export function FeaturesSection() {
  const features = [
    { title: 'AI-Powered Generation', description: 'Leverage OpenAI to create resumes tailored to job descriptions.' },
    { title: 'Professional Templates', description: 'Choose from expertly designed ATS-friendly templates.' },
    { title: 'Cover Letter Wizard', description: 'Generate compelling cover letters in seconds.' },
    { title: 'One-Click Download', description: 'Export your documents as PDF or Word instantly.' },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}