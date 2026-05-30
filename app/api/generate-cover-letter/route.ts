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
    const { userId, jobTitle, companyName, experience } = await req.json()

    const prompt = `Generate a compelling cover letter for a ${jobTitle} position at ${companyName}. Applicant experience: ${experience}

Make it personalized, enthusiastic, and compelling.`

    const message = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const letterContent = message.content[0].type === 'text' ? message.content[0].text : ''

    const { data, error } = await supabase
      .from('cover_letters')
      .insert([{ user_id: userId, job_title: jobTitle, company_name: companyName, content: letterContent, created_at: new Date().toISOString() }])
      .select()

    if (error) throw error

    return NextResponse.json({ coverLetter: data?.[0] }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 })
  }
}