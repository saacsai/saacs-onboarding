'use client'

// Componente genérico para o step de revisão (penúltimo step)
// Mostra todas as respostas coletadas para o lead confirmar antes de enviar

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { OnboardingConfig } from '@/lib/onboarding-types'

interface RespostaItem {
  pergunta: string
  resposta: string
}

interface Props {
  config: OnboardingConfig
  stepAtual: number
  stepAnteriorUrl: string
  proximoStepUrl: string
  // Quais campos buscar — ex: ['resposta_1','resposta_2','resposta_3']
  camposResposta: string[]
  // Quais campos de questão correspondentes — ex: ['questao_1','questao_2','questao_3']
  camposQuestao: string[]
}

export default function OnboardingReviewStep({
  config,
  stepAtual,
  stepAnteriorUrl,
  proximoStepUrl,
  camposResposta,
  camposQuestao,
}: Props) {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string

  const [itens, setItens] = useState<RespostaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: projeto } = await supabase
          .from('tlp_projetos')
          .select('client_id')
          .eq('id', leadId)
          .single()

        if (!projeto) return

        // Buscar perguntas (fixas ou do banco)
        let perguntasMap: Record<string, string> = {}

        if (config.perguntasFixas) {
          camposQuestao.forEach(campo => {
            perguntasMap[campo] = config.perguntasFixas?.[campo as keyof typeof config.perguntasFixas] as string || campo
          })
        } else {
          const { data: cliente } = await supabase
            .from('clients')
            .select('atividade')
            .eq('id', projeto.client_id)
            .single()

          const { data: questoes } = await supabase
            .from(config.tabelaQuestoes)
            .select(camposQuestao.join(', '))
            .eq('tipo_atividade', cliente?.atividade || 'Outros')
            .single()

          if (questoes) {
            camposQuestao.forEach(campo => {
              perguntasMap[campo] = (questoes as any)[campo] || campo
            })
          }
        }

        // Buscar respostas
        const anamneseResult = await supabase
          .from(config.tabelaRespostas)
          .select('*')
          .eq('projeto_id', leadId)
          .single()
        const anamnese = anamneseResult.data as any

        if (anamnese?.status === 'completo') setIsReadOnly(true)

        // Montar lista de pares pergunta/resposta
        const lista: RespostaItem[] = camposResposta.map((campo, i) => ({
          pergunta: perguntasMap[camposQuestao[i]] || `Pergunta ${i + 1}`,
          resposta: (anamnese as any)?.[campo] || '(sem resposta)',
        }))

        setItens(lista)
      } catch (err) {
        console.error('Erro ao carregar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) loadData()
  }, [leadId])

  const handleConfirm = async () => {
    try {
      setSaving(true)

      await supabase
        .from(config.tabelaRespostas)
        .update({ status: 'completo', updated_at: new Date().toISOString() })
        .eq('projeto_id', leadId)

      await supabase
        .from('tlp_projetos')
        .update({ [config.campoStatusProjeto]: 'completo' })
        .eq('id', leadId)

      router.push(proximoStepUrl.replace('[lead_id]', leadId))
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro ao confirmar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin inline-block">
          <div className="w-8 h-8 border-4 border-tilapia-dark border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <ProgressBar current={stepAtual} total={config.totalSteps} />

      <QuestionCard
        title="Revise suas respostas"
        description="Confirme que tudo está correto antes de enviar"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            {itens.map((item, i) => (
              <div key={i}>
                <label className="text-sm font-semibold text-tilapia-dark">Pergunta {i + 1}</label>
                <p className="text-gray-600 text-sm mb-2">{item.pergunta}</p>
                <div className="bg-white p-3 border border-gray-300 rounded text-gray-900 text-sm">
                  {item.resposta}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              href={stepAnteriorUrl.replace('[lead_id]', leadId)}
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
                {saving ? 'Confirmando...' : <>Confirmar <ArrowRight size={20} /></>}
              </button>
            )}
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
