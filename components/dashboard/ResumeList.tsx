'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function ResumeList({ userId, refresh }: { userId: string; refresh: boolean }) {
  const [resumes, setResumes] = useState<any[]>([])
  const [letters, setLetters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true)
      try {
        const [resumesRes, lettersRes] = await Promise.all([
          supabase.from('resumes').select('*').eq('user_id', userId),
          supabase.from('cover_letters').select('*').eq('user_id', userId),
        ])
        setResumes(resumesRes.data || [])
        setLetters(lettersRes.data || [])
      } catch (err) {
        console.error('Error fetching documents:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDocuments()
  }, [userId, refresh])

  if (loading) return <div>Loading documents...</div>

  return (
    <div>
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Resumes</h3>
        {resumes.length === 0 ? (
          <p className="text-gray-500">No resumes yet.</p>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="border rounded-lg p-4">
                <h4 className="font-semibold">{resume.job_title}</h4>
                <p className="text-sm text-gray-500">Created {new Date(resume.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-6">Cover Letters</h3>
        {letters.length === 0 ? (
          <p className="text-gray-500">No cover letters yet.</p>
        ) : (
          <div className="space-y-4">
            {letters.map((letter) => (
              <div key={letter.id} className="border rounded-lg p-4">
                <h4 className="font-semibold">{letter.company_name} - {letter.job_title}</h4>
                <p className="text-sm text-gray-500">Created {new Date(letter.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}