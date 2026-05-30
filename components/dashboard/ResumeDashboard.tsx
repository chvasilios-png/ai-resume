'use client'

import { useState } from 'react'
import { ResumeGenerator } from './ResumeGenerator'
import { CoverLetterGenerator } from './CoverLetterGenerator'
import { ResumeList } from './ResumeList'

export function ResumeDashboard({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState('resume')
  const [refreshList, setRefreshList] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.email}</h1>
        <p className="text-gray-600">Create professional resumes and cover letters using AI</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b flex">
          <button onClick={() => setActiveTab('resume')} className={`flex-1 py-4 text-center font-semibold transition ${activeTab === 'resume' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Generate Resume</button>
          <button onClick={() => setActiveTab('letter')} className={`flex-1 py-4 text-center font-semibold transition ${activeTab === 'letter' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>Generate Cover Letter</button>
          <button onClick={() => setActiveTab('list')} className={`flex-1 py-4 text-center font-semibold transition ${activeTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>My Documents</button>
        </div>
        <div className="p-8">
          {activeTab === 'resume' && <ResumeGenerator userId={user.id} onGenerated={() => setRefreshList(!refreshList)} />}
          {activeTab === 'letter' && <CoverLetterGenerator userId={user.id} onGenerated={() => setRefreshList(!refreshList)} />}
          {activeTab === 'list' && <ResumeList userId={user.id} refresh={refreshList} />}
        </div>
      </div>
    </div>
  )
}