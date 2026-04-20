'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-tilapia-dark mb-4">
          Bem-vindo ao TILAPIA
        </h1>
        <p className="text-xl text-gray-700">
          Metodologia profissional para estruturação de projetos com impacto social
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Standard */}
        <Link href="/standard">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:translate-y-[-8px] overflow-hidden cursor-pointer h-full">
            {/* Image */}
            <div className="relative h-48 bg-tilapia-dark">
              <Image
                src="/images/tilapia_standard.jpg"
                alt="TILAPIA Standard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-tilapia-dark mb-3">
                TILAPIA Standard
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Para empreendedores e gestores de projetos que querem estruturar suas iniciativas com metodologia comprovada.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Pré-anamnese guiada
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Integração com Claude.ai
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Estruturação automática
                </li>
              </ul>

              <div className="flex items-center gap-2 text-tilapia-dark font-semibold">
                Começar agora <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </Link>

        {/* Corporate */}
        <Link href="/corporate">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:translate-y-[-8px] overflow-hidden cursor-pointer h-full">
            {/* Image */}
            <div className="relative h-48 bg-tilapia-dark">
              <Image
                src="/images/tilapia_corporate.jpg"
                alt="TILAPIA Corporate"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-tilapia-dark mb-3">
                TILAPIA Corporate
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Para empresas e instituições que buscam diagnóstico estratégico e proposta comercial personalizada.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Diagnóstico personalizado
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Proposta comercial IA-gerada
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  Acompanhamento especializado
                </li>
              </ul>

              <div className="flex items-center gap-2 text-tilapia-dark font-semibold">
                Solicitar diagnóstico <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-tilapia-dark to-tilapia-darkAlt text-white rounded-xl p-8 text-center">
        <p className="text-lg">
          Se você foi convidado com um link específico, acesse-o diretamente para começar sua jornada.
        </p>
      </div>
    </div>
  )
}
