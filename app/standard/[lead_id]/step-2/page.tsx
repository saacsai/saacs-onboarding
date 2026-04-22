'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Step2() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string
  const [resposta, setResposta] = useState('')
  const [pergunta, setPergunta] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [passo_zero_status, setPasso_zero_status] = useState('novo')

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Buscar projeto e cliente
        const { data: projeto } = await supabase
          .from('tlp_projetos')
          .select('*')
          .eq('id', leadId)
          .single()

        if (!projeto) {
          alert('Projeto não encontrado')
          return
        }

        setPasso_zero_status(projeto.passo_zero_status)

        // 2. Buscar cliente para pegar tipo_atividade
        const { data: cliente } = await supabase
          .from('clients')
          .select('atividade')
          .eq('id', projeto.client_id)
          .single()

        // 3. Buscar questões baseado no tipo_atividade
        const { data: questoes } = await supabase
          .from('pre_anamnese_questoes')
          .select('questao_1, placeholder_1')
          .eq('tipo_atividade', cliente?.atividade || 'Outros')
          .single()

        if (questoes) {
          setPergunta(questoes.questao_1 || '')
          setPlaceholder(questoes.placeholder_1 || '')
        }

        // 4. Buscar resposta anterior (se existir)
        const { data: anamnese } = await supabase
          .from('pre_anamnese_tilapia_standard')
          .select('resposta_1, status')
          .eq('projeto_id', leadId)
          .single()

        if (anamnese?.resposta_1) {
          setResposta(anamnese.resposta_1)
        }

        // 5. Determinar se é read-only
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

      // Salvar ou atualizar resposta em pre_anamnese_tilapia_standard
      const { data: existente } = await supabase
        .from('pre_anamnese_tilapia_standard')
        .select('id')
        .eq('projeto_id', leadId)
        .single()

      if (existente) {
        // Atualizar
        await supabase
          .from('pre_anamnese_tilapia_standard')
          .update({
            resposta_1: resposta,
            status: 'em_progresso',
            updated_at: new Date().toISOString()
          })
          .eq('projeto_id', leadId)
      } else {
        // Inserir
        await supabase.from('pre_anamnese_tilapia_standard').insert({
          projeto_id: leadId,
          resposta_1: resposta,
          status: 'em_progresso'
        })
      }

      // Atualizar status em tlp_projetos
      await supabase
        .from('tlp_projetos')
        .update({ passo_zero_status: 'em_progresso' })
        .eq('id', leadId)

      router.push(`/standard/${leadId}/step-3`)
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
      <ProgressBar current={2} total={6} />

      <QuestionCard
        title={pergunta || 'Carregando...'}
        description={isReadOnly ? 'Leitura apenas - resposta já foi enviada' : ''}
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
              href={`/standard/${leadId}`}
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
