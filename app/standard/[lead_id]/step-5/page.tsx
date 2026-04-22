'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Step5() {
  const params = useParams()
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const router = useRouter()
  const leadId = params.lead_id as string
  const completed = searchParams.get('completed') === 'true'
  const [anamnese, setAnamnese] = useState<any>(null)
  const [questoes, setQuestoes] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: projeto } = await supabase
          .from('tlp_projetos')
          .select('*')
          .eq('id', leadId)
          .single()

        if (!projeto) return

        const { data: cliente } = await supabase
          .from('clients')
          .select('atividade')
          .eq('id', projeto.client_id)
          .single()

        const { data: q } = await supabase
          .from('pre_anamnese_questoes')
          .select('questao_1, questao_2, questao_3')
          .eq('tipo_atividade', cliente?.atividade || 'Outros')
          .single()

        setQuestoes(q)

        const { data: a } = await supabase
          .from('pre_anamnese_tilapia_standard')
          .select('resposta_1, resposta_2, resposta_3, status')
          .eq('projeto_id', leadId)
          .single()

        setAnamnese(a)

        if (a?.status === 'completo') {
          setIsReadOnly(true)
        }
      } catch (err) {
        console.error('Erro ao carregar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) {
      loadData()
    }
  }, [leadId])

  const handleConfirm = async () => {
    try {
      setSaving(true)

      await supabase
        .from('pre_anamnese_tilapia_standard')
        .update({ status: 'completo', updated_at: new Date().toISOString() })
        .eq('projeto_id', leadId)

      await supabase
        .from('tlp_projetos')
        .update({ passo_zero_status: 'completo' })
        .eq('id', leadId)

      router.push(`/standard/${leadId}/step-6`)
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro ao confirmar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="py-8 text-center"><div className="animate-spin inline-block"><div className="w-8 h-8 border-4 border-tilapia-dark border-t-transparent rounded-full" /></div></div>
  }

  return (
    <div className="py-8">
      <ProgressBar current={5} total={6} />

      <QuestionCard
        title={completed ? "ONBOARDING completado com sucesso!" : "Revise suas respostas"}
        description={completed ? "Abaixo estão as respostas coletadas" : "Confirme que tudo está correto antes de enviar"}
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            {questoes?.questao_1 && (
              <div>
                <label className="text-sm font-semibold text-tilapia-dark">Pergunta 1</label>
                <p className="text-gray-600 text-sm mb-2">{questoes.questao_1}</p>
                <div className="bg-white p-3 border border-gray-300 rounded text-gray-900 text-sm">
                  {anamnese?.resposta_1 || '(sem resposta)'}
                </div>
              </div>
            )}

            {questoes?.questao_2 && (
              <div>
                <label className="text-sm font-semibold text-tilapia-dark">Pergunta 2</label>
                <p className="text-gray-600 text-sm mb-2">{questoes.questao_2}</p>
                <div className="bg-white p-3 border border-gray-300 rounded text-gray-900 text-sm">
                  {anamnese?.resposta_2 || '(sem resposta)'}
                </div>
              </div>
            )}

            {questoes?.questao_3 && (
              <div>
                <label className="text-sm font-semibold text-tilapia-dark">Pergunta 3</label>
                <p className="text-gray-600 text-sm mb-2">{questoes.questao_3}</p>
                <div className="bg-white p-3 border border-gray-300 rounded text-gray-900 text-sm">
                  {anamnese?.resposta_3 || '(sem resposta)'}
                </div>
              </div>
            )}
          </div>

          {!completed && (
            <div className="flex gap-4">
              <Link
                href={`/standard/${leadId}/step-4`}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} /> Voltar
              </Link>
              {!isReadOnly && (
                <button
                  onClick={handleConfirm}
                  disabled={saving}
                  className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Confirmar <ArrowRight size={20} />
                </button>
              )}
            </div>
          )}
          {completed && (
            <a
              href="https://saacs.com.br"
              className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar ao site SAACS
            </a>
          )}
        </div>
      </QuestionCard>
    </div>
  )
}
