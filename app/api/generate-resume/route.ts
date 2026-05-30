import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { createClient } from '@supabase/supabase-js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { userId, jobTitle, experience, skills } = await req.json()

    const prompt = `Generate a professional resume for someone applying for a ${jobTitle} position. Experience: ${experience}
Skills: ${skills.join(', ')}

Provide the resume in a clean, ATS-friendly format.`

    const message = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const resumeContent = message.content[0].type === 'text' ? message.content[0].text : ''

    const { data, error } = await supabase
      .from('resumes')
      .insert([{ user_id: userId, job_title: jobTitle, content: resumeContent, created_at: new Date().toISOString() }])
      .select()

    if (error) throw error

    return NextResponse.json({ resume: data?.[0] }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 })
  }
}