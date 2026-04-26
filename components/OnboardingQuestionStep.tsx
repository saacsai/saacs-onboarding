'use client'

// Componente genérico para steps de pergunta (steps 2, 3, 4...)
// Usado por qualquer fluxo de onboarding — só muda a config

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { OnboardingConfig } from '@/lib/onboarding-types'

interface Props {
  config: OnboardingConfig
  stepAtual: number        // ex: 2
  campoResposta: string    // ex: 'resposta_1'
  campoQuestao: string     // ex: 'questao_1'
  campoPlaceholder: string // ex: 'placeholder_1'
  stepAnteriorUrl: string  // ex: '/standard/[id]' ou '/standard/[id]/step-3'
  proximoStepUrl: string   // ex: '/standard/[id]/step-3'
}

export default function OnboardingQuestionStep({
  config,
  stepAtual,
  campoResposta,
  campoQuestao,
  campoPlaceholder,
  stepAnteriorUrl,
  proximoStepUrl,
}: Props) {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string

  const [resposta, setResposta] = useState('')
  const [pergunta, setPergunta] = useState('')
  const [placeholder, setPlaceholder] = useState('')
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

        if (!projeto) { alert('Projeto não encontrado'); return }

        // Usar pergunta fixa (config) ou buscar no banco por atividade
        if (config.perguntasFixas?.[campoQuestao as keyof typeof config.perguntasFixas]) {
          setPergunta(config.perguntasFixas[campoQuestao as keyof typeof config.perguntasFixas] as string || '')
          setPlaceholder(config.perguntasFixas[campoPlaceholder as keyof typeof config.perguntasFixas] as string || '')
        } else {
          const { data: cliente } = await supabase
            .from('clients')
            .select('atividade')
            .eq('id', projeto.client_id)
            .single()

          const { data: questoes } = await supabase
            .from(config.tabelaQuestoes)
            .select(`${campoQuestao}, ${campoPlaceholder}`)
            .eq('tipo_atividade', cliente?.atividade || 'Outros')
            .single()

          if (questoes) {
            setPergunta((questoes as any)[campoQuestao] || '')
            setPlaceholder((questoes as any)[campoPlaceholder] || '')
          }
        }

        // Buscar resposta anterior
        const { data: anamnese } = await supabase
          .from(config.tabelaRespostas)
          .select(`${campoResposta}, status`)
          .eq('projeto_id', leadId)
          .single() as { data: any }

        if (anamnese?.[campoResposta]) {
          setResposta(anamnese[campoResposta])
        }

        if (anamnese?.status === 'completo') setIsReadOnly(true)

      } catch (err) {
        console.error('Erro ao carregar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) loadData()
  }, [leadId])

  const handleNext = async () => {
    if (!resposta.trim()) { alert('Por favor, responda a pergunta'); return }

    try {
      setSaving(true)

      const { data: existente } = await supabase
        .from(config.tabelaRespostas)
        .select('id')
        .eq('projeto_id', leadId)
        .single()

      if (existente) {
        await supabase
          .from(config.tabelaRespostas)
          .update({ [campoResposta]: resposta, status: 'em_progresso', updated_at: new Date().toISOString() })
          .eq('projeto_id', leadId)
      } else {
        await supabase
          .from(config.tabelaRespostas)
          .insert({ projeto_id: leadId, [campoResposta]: resposta, status: 'em_progresso' })
      }

      await supabase
        .from('tlp_projetos')
        .update({ [config.campoStatusProjeto]: 'em_progresso' })
        .eq('id', leadId)

      router.push(proximoStepUrl.replace('[lead_id]', leadId))
    } catch (err) {
      console.error('Erro ao salvar:', err)
      alert('Erro ao salvar resposta')
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
        title={pergunta || 'Carregando...'}
        description={isReadOnly ? 'Leitura apenas — resposta já foi enviada' : ''}
      >
        <div className="space-y-6">
          <textarea
            value={resposta}
            onChange={(e) => !isReadOnly && setResposta(e.target.value)}
            placeholder={placeholder}
            disabled={isReadOnly}
            className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tilapia-dark min-h-32 ${
              isReadOnly ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''
            }`}
          />

          <div className="flex gap-4">
            <Link
              href={stepAnteriorUrl.replace('[lead_id]', leadId)}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar
            </Link>
            {!isReadOnly && (
              <button
                onClick={handleNext}
                disabled={saving}
                className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? 'Salvando...' : <> Próximo <ArrowRight size={20} /></>}
              </button>
            )}
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
