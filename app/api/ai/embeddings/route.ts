// app/api/ai/embeddings/route.ts (Next.js App Router API)
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { texts } = await req.json() // expects ["doc1", "doc2"]
  const embeddings = await Promise.all(
    texts.map((t: string) => openai.embeddings.create({ model: 'text-embedding-3-small', input: t }))
  )
  return NextResponse.json({ embeddings: embeddings.map(e => e.data[0].embedding) })
}
