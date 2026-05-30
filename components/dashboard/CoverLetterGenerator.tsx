'use client'

import { useState } from 'react'
import axios from 'axios'

export function CoverLetterGenerator({ userId, onGenerated }: { userId: string; onGenerated: () => void }) {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [experience, setExperience] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.post('/api/generate-cover-letter', { userId, jobTitle, companyName, experience })
      setGenerated(true)
      onGenerated()
      setJobTitle('')
      setCompanyName('')
      setExperience('')
    } catch (err) {
      setError('Failed to generate cover letter')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {generated && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">Cover letter generated successfully!</div>}
      {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input type="text" className="input-field" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., Senior Product Manager" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input type="text" className="input-field" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g., Google" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Relevant Experience</label>
          <textarea className="input-field h-32" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Describe your experience..." required />
        </div>
        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Generating...' : 'Generate Cover Letter'}</button>
      </form>
    </div>
  )
}