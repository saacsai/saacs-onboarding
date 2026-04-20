'use client'

import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export default function StandardInfo() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-tilapia-dark hover:underline mb-8">
        <ArrowLeft size={20} />
        Voltar
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <Mail className="w-16 h-16 text-tilapia-dark mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-tilapia-dark mb-4">
            TILAPIA Standard
          </h1>
          <p className="text-xl text-gray-700">
            Acesso Exclusivo via Email
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="font-semibold text-tilapia-dark mb-4">
            Como acessar?
          </h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-tilapia-dark">1.</span>
              <span>Preencha o formulário no site SAACS (saacs.com.br/metodologia-tilapia/tilapia-standard/)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-tilapia-dark">2.</span>
              <span>Você receberá um email com um link exclusivo</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-tilapia-dark">3.</span>
              <span>Clique no link e comece seu onboarding TILAPIA</span>
            </li>
          </ol>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">
            ✅ Tudo pronto!
          </h3>
          <p className="text-sm text-green-800">
            Este ambiente está conectado e aguardando seus leads. O fluxo é automático: Mailchimp → Email → Onboarding → Claude.ai
          </p>
        </div>
      </div>
    </div>
  )
}
