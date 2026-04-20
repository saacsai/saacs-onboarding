import type { Metadata } from 'next'
import Image from 'next/image'
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
      <body className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen font-sans">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
            <div className="container mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo_saacs.png"
                  alt="SAACS Logo"
                  width={140}
                  height={50}
                  priority
                  className="h-auto"
                />
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
                <a href="/" className="hover:text-tilapia-dark transition-colors">Home</a>
                <a href="https://saacs.com.br" target="_blank" className="hover:text-tilapia-dark transition-colors">
                  Sobre SAACS
                </a>
              </nav>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 container mx-auto px-4 py-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-tilapia-dark text-white py-8 mt-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-3">SAACS</h3>
                  <p className="text-sm text-gray-300">
                    Software As A Chat Service — IA para resultados.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">TILAPIA</h3>
                  <p className="text-sm text-gray-300">
                    Metodologia para estruturação de projetos.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Contato</h3>
                  <p className="text-sm text-gray-300">
                    contato@saacs.com.br
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                © 2026 SAACS. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
