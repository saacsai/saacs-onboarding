'use client'

import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { CheckCircle2 } from 'lucide-react'

export default function CorporatePage() {
  return (
    <div className="py-8">
      <ProgressBar current={1} total={1} />

      <QuestionCard
        title="Diagnóstico TILAPIA Corporate"
        description="Vamos análisar sua empresa e gerar uma proposta comercial personalizada"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-saacs-900 mb-4">
              O que acontecerá:
            </h3>
            <ul className="space-y-3">
              {[
                'Você responderá perguntas sobre sua empresa',
                'IA gerará um diagnóstico personalizado',
                'Criaremos uma proposta comercial TILAPIA',
                'Marcelo (sócio) entrará em contato para negociar',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-saacs-600 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Este fluxo será ativado após integração com Mailchimp.
              Por enquanto, é apenas uma página placeholder.
            </p>
          </div>

          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Aguardando ativação...
          </button>
        </div>
      </QuestionCard>
    </div>
  )
}
