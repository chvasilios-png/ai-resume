'use client'

import { useState } from 'react'
import axios from 'axios'

export function ResumeGenerator({ userId, onGenerated }: { userId: string; onGenerated: () => void }) {
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.post('/api/generate-resume', {
        userId,
        jobTitle,
        experience,
        skills: skills.split(',').map((s) => s.trim()),
      })

      setGenerated(true)
      onGenerated()
      setJobTitle('')
      setExperience('')
      setSkills('')
    } catch (err) {
      setError('Failed to generate resume')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {generated && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">Resume generated successfully!</div>}
      {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input type="text" className="input-field" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., Senior Product Manager" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Professional Experience</label>
          <textarea className="input-field h-32" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Describe your work experience..." required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
          <input type="text" className="input-field" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Leadership, Python, Data Analysis" required />
        </div>
        <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">{loading ? 'Generating Resume...' : 'Generate Resume'}</button>
      </form>
    </div>
  )
}