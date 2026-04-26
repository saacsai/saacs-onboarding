'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { CheckCircle2, ArrowLeft, Mail } from 'lucide-react'

export default function Step6() {
  const params = useParams()
  const leadId = params.lead_id as string
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSendWebhook = async () => {
    try {
      setSending(true)
      await fetch('https://webhook.saacs.com.br/webhook/onboarding-completo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: leadId,
          timestamp: new Date().toISOString()
        })
      })
      setSuccess(true)
    } catch (err) {
      console.error('Erro ao enviar webhook:', err)
      alert('Erro ao finalizar. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="py-8">
      <ProgressBar current={6} total={6} />

      <QuestionCard
        title="Onboarding concluído!"
        description="Suas respostas foram recebidas com sucesso."
      >
        <div className="space-y-6">

          {!success ? (
            <>
              {/* Mensagem de espera */}
              <div className="bg-gradient-tilapia p-6 rounded-lg text-center space-y-3">
                <Mail size={40} className="text-white mx-auto" />
                <h3 className="text-lg font-bold text-white">Suas credenciais serão enviadas por email</h3>
                <p className="text-white/90 text-sm">
                  Após clicar em <strong>Pronto</strong>, analisamos seu perfil e enviamos
                  as credenciais de acesso diretamente para o seu email em poucos minutos.
                </p>
              </div>

              {/* O que acontece depois */}
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 space-y-3">
                <h3 className="font-bold text-tilapia-dark">O que acontece agora?</h3>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Analisamos suas respostas</li>
                  <li>Enviamos suas credenciais OAuth por email</li>
                  <li>Você conecta o MCP SAACS ao Claude.ai e começa</li>
                </ol>
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <Link
                  href={`/standard/${leadId}/step-5`}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} /> Voltar
                </Link>
                <button
                  onClick={handleSendWebhook}
                  disabled={sending}
                  className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? 'Finalizando...' : <><CheckCircle2 size={20} /> Pronto!</>}
                </button>
              </div>
            </>
          ) : (
            /* Tela pós-clique em Pronto */
            <div className="text-center space-y-4">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 space-y-3">
                <CheckCircle2 size={48} className="text-green-600 mx-auto" />
                <p className="text-green-700 font-bold text-lg">Tudo certo!</p>
                <p className="text-green-600 text-sm">
                  Suas respostas foram processadas. Verifique seu email —
                  as instruções de acesso chegarão em instantes.
                </p>
              </div>
              <p className="text-gray-500 text-xs">
                Não recebeu em 5 minutos? Verifique o spam ou entre em contato.
              </p>
            </div>
          )}

        </div>
      </QuestionCard>
    </div>
  )
}
