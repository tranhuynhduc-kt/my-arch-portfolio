// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = { title: 'Tran Huynh Duc — Architecture Portfolio' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="p-6 border-b bg-white shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold">Tran Huynh Duc</h1>
            <nav>
              <a href="/projects" className="px-3">Projects</a>
              <a href="/case-studies" className="px-3">Case Studies</a>
              <a href="/about" className="px-3">About</a>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>

        <footer className="mt-16 p-6 text-sm text-center text-gray-600">
          © {new Date().getFullYear()} Tran Huynh Duc — Lead Software Engineer. Built w/ Next.js.
        </footer>
      </body>
    </html>
  )
}
