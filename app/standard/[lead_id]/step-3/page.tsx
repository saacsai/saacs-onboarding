'use client'

import { useState, useEffect } from 'react'
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

        if (!projeto) return

        const { data: cliente } = await supabase
          .from('clients')
          .select('atividade')
          .eq('id', projeto.client_id)
          .single()

        const { data: questoes } = await supabase
          .from('pre_anamnese_questoes')
          .select('questao_2, placeholder_2')
          .eq('tipo_atividade', cliente?.atividade || 'Outros')
          .single()

        if (questoes) {
          setPergunta(questoes.questao_2 || '')
          setPlaceholder(questoes.placeholder_2 || '')
        }

        const { data: anamnese } = await supabase
          .from('pre_anamnese_tilapia_standard')
          .select('resposta_2, status')
          .eq('projeto_id', leadId)
          .single()

        if (anamnese?.resposta_2) {
          setResposta(anamnese.resposta_2)
        }

        if (anamnese?.status === 'completo') {
          setIsReadOnly(true)
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) {
      loadData()
    }
  }, [leadId])

  const handleNext = async () => {
    if (!resposta.trim()) {
      alert('Por favor, responda a pergunta')
      return
    }

    try {
      setSaving(true)

      const { data: existente } = await supabase
        .from('pre_anamnese_tilapia_standard')
        .select('id')
        .eq('projeto_id', leadId)
        .single()

      if (existente) {
        await supabase
          .from('pre_anamnese_tilapia_standard')
          .update({
            resposta_2: resposta,
            updated_at: new Date().toISOString()
          })
          .eq('projeto_id', leadId)
      } else {
        await supabase.from('pre_anamnese_tilapia_standard').insert({
          projeto_id: leadId,
          resposta_2: resposta,
          status: 'em_progresso'
        })
      }

      router.push(`/standard/${leadId}/step-4`)
    } catch (err) {
      console.error('Erro ao salvar:', err)
      alert('Erro ao salvar resposta')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="py-8 text-center"><div className="animate-spin inline-block"><div className="w-8 h-8 border-4 border-tilapia-dark border-t-transparent rounded-full" /></div></div>
  }

  return (
    <div className="py-8">
      <ProgressBar current={3} total={6} />

      <QuestionCard
        title={pergunta || 'Carregando...'}
        description={isReadOnly ? 'Leitura apenas' : ''}
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
              href={`/standard/${leadId}/step-2`}
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
                Próximo <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
