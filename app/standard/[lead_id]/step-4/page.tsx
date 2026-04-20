'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase, LeadStandard, PreAnamnese } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Step4() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string
  const [lead, setLead] = useState<LeadStandard | null>(null)
  const [respostas, setRespostas] = useState<PreAnamnese[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: leadData } = await supabase
          .from('leads_standard')
          .select('*')
          .eq('id', leadId)
          .single()

        const { data: respostasData } = await supabase
          .from('pre_anamnese_standard')
          .select('*')
          .eq('lead_id', leadId)
          .order('passo', { ascending: true })

        setLead(leadData)
        setRespostas(respostasData || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [leadId])

  const handleConfirm = async () => {
    try {
      setLoading(true)

      await supabase
        .from('leads_standard')
        .update({ status: 'onboarding_completo' })
        .eq('id', leadId)

      router.push(`/standard/${leadId}/step-5`)
    } catch (err) {
      console.error(err)
      alert('Erro ao confirmar')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-saacs-600 border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <ProgressBar current={4} total={5} />

      <QuestionCard
        title="Revise seus dados"
        description="Confirme que todas as informações estão corretas"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Nome</label>
              <p className="text-gray-900">{lead?.nome}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <p className="text-gray-900">{lead?.email}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Tipo de Projeto</label>
              <p className="text-gray-900">{lead?.tipo_projeto}</p>
            </div>

            {respostas.map((r) => (
              <div key={r.id}>
                <label className="text-sm font-semibold text-gray-700">{r.pergunta}</label>
                <p className="text-gray-900 text-sm mt-1">{r.resposta}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              href={`/standard/${leadId}/step-3`}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar
            </Link>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-saacs-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-saacs-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Confirmar <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
