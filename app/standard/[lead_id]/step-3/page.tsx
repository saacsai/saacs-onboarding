'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Step3() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string
  const [resposta, setResposta] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    if (!resposta.trim()) {
      alert('Por favor, responda a pergunta')
      return
    }

    try {
      setLoading(true)

      await supabase.from('pre_anamnese_standard').insert([
        {
          lead_id: leadId,
          passo: 3,
          pergunta: 'Qual é o resultado esperado em números?',
          resposta,
          created_at: new Date().toISOString(),
        },
      ])

      router.push(`/standard/${leadId}/step-4`)
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar resposta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8">
      <ProgressBar current={3} total={5} />

      <QuestionCard
        title="Qual é o resultado esperado em números?"
        description="Quantas pessoas serão beneficiadas? Qual % de melhoria? Quanto em R$ será gerado?"
      >
        <div className="space-y-4">
          <textarea
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Ex: 500 agricultores beneficiados, 30% aumento de produtividade, R$ 250.000 em renda adicional..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saacs-600 min-h-32"
          />

          <div className="flex gap-4">
            <Link
              href={`/standard/${leadId}/step-2`}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar
            </Link>
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 bg-saacs-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-saacs-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Próximo <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
