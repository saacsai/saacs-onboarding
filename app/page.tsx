'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold text-saacs-900 mb-4">
        Bem-vindo ao TILAPIA
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Estruture seus projetos com a metodologia TILAPIA
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Standard */}
        <Link href="/standard">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
            <h2 className="text-2xl font-bold text-saacs-900 mb-4">
              TILAPIA Standard
            </h2>
            <p className="text-gray-700 mb-6">
              Para projetos novos ou estruturação de ideias
            </p>
            <div className="flex items-center justify-center gap-2 text-saacs-600 font-semibold">
              Começar <ArrowRight size={20} />
            </div>
          </div>
        </Link>

        {/* Corporate */}
        <Link href="/corporate">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]">
            <h2 className="text-2xl font-bold text-saacs-900 mb-4">
              TILAPIA Corporate
            </h2>
            <p className="text-gray-700 mb-6">
              Diagnóstico e proposta comercial para empresas
            </p>
            <div className="flex items-center justify-center gap-2 text-saacs-600 font-semibold">
              Começar <ArrowRight size={20} />
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg text-sm text-gray-700">
        <p>
          Se você foi convidado com um link específico, acesse-o diretamente.
        </p>
      </div>
    </div>
  )
}
