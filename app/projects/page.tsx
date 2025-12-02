import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Project {
  title: string
  summary: string
  slug: string
}

export default async function Projects() {
  const dir = path.join(process.cwd(), 'mdx', 'projects')
  const files = fs.readdirSync(dir)
  const projects = files.map(filename => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data } = matter(raw)
    const slug = filename.replace(/\.mdx?$/, '')
    return { ...data, slug } as Project
  })
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Highlighted Projects</h2>
      <div className="grid gap-4">
        {projects.map(p => (
          <article key={p.slug} className="p-4 border rounded bg-white">
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="text-sm">{p.summary}</p>
            <Link href={`/projects/${p.slug}`} className="mt-2 inline-block text-sm text-blue-600">Read more →</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
