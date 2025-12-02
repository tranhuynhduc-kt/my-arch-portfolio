# GitHub Copilot Instructions

## Project Overview
This is an **architecture portfolio** built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. The portfolio showcases architectural projects with MDX content and includes AI-powered features using OpenAI embeddings.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Content**: MDX with gray-matter for frontmatter
- **AI Integration**: OpenAI API (embeddings)
- **UI Components**: Lucide React icons, CVA for variants
- **Dev Tools**: ESLint, Husky, lint-staged

## Code Style & Conventions

### TypeScript
- Always use explicit types (avoid `any`)
- Use interfaces for object shapes
- Prefer `const` over `let`
- Example:
  ```typescript
  interface Project {
    title: string
    summary: string
    slug: string
  }
  ```

### React/Next.js
- Use Server Components by default (Next.js 16 App Router)
- Add `'use client'` only when needed (state, effects, browser APIs)
- Use async Server Components for data fetching
- File naming: `kebab-case.tsx` for files, `PascalCase` for components

### Styling
- Use Tailwind CSS utility classes
- Use `cn()` from `lib/utils.ts` for conditional classes
- Prefer Tailwind over custom CSS
- Example: `className={cn("base-class", condition && "conditional-class")}`

### Project Structure
```
app/
  ├── api/          # API routes (Next.js Route Handlers)
  ├── projects/     # Project listing and detail pages
  ├── layout.tsx    # Root layout
  └── page.tsx      # Home page
mdx/
  └── projects/     # MDX content files for projects
lib/
  └── utils.ts      # Utility functions (cn, etc.)
```

### MDX Content
- Project MDX files live in `mdx/projects/`
- Use gray-matter for frontmatter parsing
- Required frontmatter fields:
  ```yaml
  title: "Project Title"
  summary: "Brief description"
  ```

### API Routes
- Located in `app/api/`
- Use Next.js Route Handlers (not Pages Router API routes)
- Return `NextResponse.json()` for JSON responses
- Example: `app/api/ai/embeddings/route.ts`

## Development Workflow

### Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn prepare` - Set up Husky hooks

### Git Hooks (Husky)
- Pre-commit: Runs `lint-staged` (ESLint with auto-fix on staged files)
- ESLint uses caching for performance
- Package-lock.json sync check is enforced

### Linting
- ESLint is configured with Next.js recommended config
- Auto-fixes on commit via lint-staged
- Cache location: `.eslintcache` (gitignored)

## AI Features
- OpenAI integration for embeddings
- API key stored in `.env.local` as `OPENAI_API_KEY`
- Embeddings endpoint: `POST /api/ai/embeddings`

## Best Practices
1. **Type Safety**: Always define interfaces/types for props and data structures
2. **Server-First**: Use Server Components unless client interactivity is needed
3. **Performance**: Use caching (ESLint cache, Next.js caching)
4. **Code Quality**: Let lint-staged auto-fix issues before commit
5. **Accessibility**: Use semantic HTML and proper ARIA labels
6. **Responsive**: Mobile-first approach with Tailwind responsive utilities

## Common Patterns

### Reading MDX Files
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const dir = path.join(process.cwd(), 'mdx', 'projects')
const files = fs.readdirSync(dir)
const data = files.map(filename => {
  const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
  const { data } = matter(raw)
  return { ...data, slug: filename.replace(/\.mdx?$/, '') }
})
```

### Utility Classes Helper
```typescript
import { cn } from '@/lib/utils'

<div className={cn("base-class", variant === "primary" && "primary-class")} />
```

## Notes
- This is a learning project focused on AI integration with architecture portfolio
- Windows development environment (PowerShell, CRLF handled via .gitattributes)
- GitHub Actions CI runs on push/PR: build + lint checks
