'use client'

// Step final da Trilha — 3 perguntas abertas + webhook de conclusão
// Webhook dispara: N8N → trilha_concluida = TRUE → libera credenciais OAuth

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { CheckCircle2, ArrowLeft, Send } from 'lucide-react'
import { TrilhaConfig } from '@/config/trilha.config'
import { supabase } from '@/lib/supabase'

interface Props {
  config: TrilhaConfig
  stepAnteriorUrl: string
}

export default function TrilhaConclusaoStep({ config, stepAnteriorUrl }: Props) {
  const params = useParams()
  const leadId = params.lead_id as string

  const [respostas, setRespostas] = useState<string[]>(
    config.perguntas_conclusao.map(() => '')
  )
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const todasRespondidas = respostas.every(r => r.trim().length > 10)

  const handleChange = (index: number, valor: string) => {
    setRespostas(prev => prev.map((r, i) => i === index ? valor : r))
  }

  const handleConcluir = async () => {
    if (!todasRespondidas) {
      alert('Por favor, responda todas as perguntas antes de concluir.')
      return
    }

    try {
      setSending(true)

      const respostas_trilha = config.perguntas_conclusao.map((pergunta, i) => ({
        pergunta,
        resposta: respostas[i]
      }))

      // Salvar respostas no Supabase — trigger atualiza compromisso para EXPLORADOR
      await supabase
        .from('tlp_projetos')
        .update({
          respostas_trilha,
          trilha_concluida: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId)

      // Disparar webhook N8N para enviar email de credenciais
      await fetch(config.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: leadId,
          respostas_trilha,
          timestamp: new Date().toISOString()
        })
      })

      setSuccess(true)
    } catch (err) {
      console.error('Erro ao enviar:', err)
      alert('Erro ao finalizar. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  if (success) {
    return (
      <div className="py-8">
        <ProgressBar current={config.totalSteps + 1} total={config.totalSteps + 1} />
        <QuestionCard title="Trilha concluída!" description="">
          <div className="text-center space-y-4">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 space-y-3">
              <CheckCircle2 size={48} className="text-green-600 mx-auto" />
              <p className="text-green-700 font-bold text-lg">Parabéns!</p>
              <p className="text-green-600 text-sm">
                Suas credenciais de acesso ao TILAPIA serão enviadas para seu email em instantes.
              </p>
            </div>
            <p className="text-gray-500 text-xs">
              Não recebeu em 5 minutos? Verifique o spam ou entre em contato.
            </p>
          </div>
        </QuestionCard>
      </div>
    )
  }

  return (
    <div className="py-8">
      <ProgressBar current={config.totalSteps + 1} total={config.totalSteps + 1} />

      <QuestionCard
        title="Confirme seu entendimento"
        description="Três perguntas rápidas para liberar seu acesso ao TILAPIA"
      >
        <div className="space-y-6">

          {config.perguntas_conclusao.map((pergunta, i) => (
            <div key={i}>
              <label className="block font-semibold text-gray-800 mb-2 text-sm">
                {i + 1}. {pergunta} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={respostas[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Sua resposta..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tilapia-dark min-h-20 text-sm resize-none"
              />
            </div>
          ))}

          <div className="flex gap-4">
            <Link
              href={stepAnteriorUrl.replace('[lead_id]', leadId)}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar
            </Link>
            <button
              onClick={handleConcluir}
              disabled={sending || !todasRespondidas}
              className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? 'Enviando...' : <><Send size={18} /> Concluir e liberar acesso</>}
            </button>
          </div>

          {!todasRespondidas && (
            <p className="text-xs text-gray-400 text-center">
              Responda as 3 perguntas para habilitar o botão de conclusão
            </p>
          )}

        </div>
      </QuestionCard>
    </div>
  )
}
