'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase, LeadStandard } from '@/lib/supabase'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function Step1() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string
  const [lead, setLead] = useState<LeadStandard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLead() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('leads_standard')
          .select('*')
          .eq('id', leadId)
          .single()

        if (error) {
          setError('Lead não encontrado')
          return
        }

        setLead(data as LeadStandard)

        // Atualizar status
        await supabase
          .from('leads_standard')
          .update({ status: 'onboarding_iniciado' })
          .eq('id', leadId)
      } catch (err) {
        setError('Erro ao carregar dados')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) {
      fetchLead()
    }
  }, [leadId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-saacs-600 border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-red-700">
        <p>{error || 'Erro ao carregar'}</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <ProgressBar current={1} total={5} />

      <QuestionCard
        title={`Bem-vindo, ${lead.nome}! 👋`}
        description="Vamos estruturar seu projeto TILAPIA em 5 minutos"
      >
        <div className="space-y-6">
          <div className="bg-gradient-tilapia text-white p-8 rounded-xl">
            <h3 className="font-bold text-lg mb-4">
              O que você vai fazer:
            </h3>
            <ul className="space-y-3">
              {[
                'Responder perguntas estruturadas sobre seu projeto',
                'Alimentar Claude.ai com contexto estratégico',
                'Receber credenciais OAuth personalizadas',
                'Começar a estruturação automática TILAPIA',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>💡 Dica:</strong> Tenha em mãos informações detalhadas sobre seu projeto. Quanto mais preciso, melhor o resultado!
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href={`/standard/${leadId}/step-2`}
              className="flex-1 bg-gradient-tilapia text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Começar Agora <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
