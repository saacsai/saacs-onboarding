import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SAACS Onboarding',
  description: 'Estruture seu projeto com TILAPIA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-saacs-50 to-blue-50 min-h-screen">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold text-saacs-900">SAACS</h1>
              <p className="text-sm text-gray-600">Metodologia TILAPIA</p>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 mt-8">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600">
              © 2026 SAACS. Todos os direitos reservados.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
