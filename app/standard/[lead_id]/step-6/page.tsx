'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { Copy, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function Step6() {
  const params = useParams()
  const leadId = params.lead_id as string
  const [projeto, setProjeto] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: p } = await supabase
          .from('tlp_projetos')
          .select('*')
          .eq('id', leadId)
          .single()

        setProjeto(p)
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSendWebhook = async () => {
    try {
      setSending(true)
      await fetch('https://webhook.saacs.com.br/webhook/onboarding-completo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: leadId,
          client_id: projeto?.client_id,
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

  if (loading) {
    return <div className="py-8 text-center"><div className="animate-spin inline-block"><div className="w-8 h-8 border-4 border-tilapia-dark border-t-transparent rounded-full" /></div></div>
  }

  return (
    <div className="py-8">
      <ProgressBar current={6} total={6} />

      <QuestionCard
        title="Parabéns! Onboarding completo"
        description="Aqui estão suas credenciais para integrar com Claude.ai"
      >
        <div className="space-y-6">
          {/* Credenciais */}
          <div className="bg-gradient-tilapia p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-bold text-white">Servidor MCP</h3>
            <div>
              <label className="text-white text-sm font-semibold block mb-2">URL do Servidor</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://mcp.saacs.com.br"
                  readOnly
                  className="flex-1 bg-white/20 text-white px-3 py-2 rounded text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard('https://mcp.saacs.com.br', 'server_url')}
                  className="bg-white/30 hover:bg-white/40 text-white px-3 py-2 rounded transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied === 'server_url' && <p className="text-white text-xs mt-1">✓ Copiado!</p>}
            </div>

            <hr className="border-white/20" />

            <h3 className="text-lg font-bold text-white">Suas Credenciais OAuth</h3>

            <div>
              <label className="text-white text-sm font-semibold block mb-2">Client ID</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={projeto?.oauth_client_id || ''}
                  readOnly
                  className="flex-1 bg-white/20 text-white px-3 py-2 rounded text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(projeto?.oauth_client_id || '', 'client_id')}
                  className="bg-white/30 hover:bg-white/40 text-white px-3 py-2 rounded transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied === 'client_id' && <p className="text-white text-xs mt-1">✓ Copiado!</p>}
            </div>

            <div>
              <label className="text-white text-sm font-semibold block mb-2">Client Secret</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={projeto?.oauth_client_secret || ''}
                  readOnly
                  className="flex-1 bg-white/20 text-white px-3 py-2 rounded text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(projeto?.oauth_client_secret || '', 'client_secret')}
                  className="bg-white/30 hover:bg-white/40 text-white px-3 py-2 rounded transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
              {copied === 'client_secret' && <p className="text-white text-xs mt-1">✓ Copiado!</p>}
            </div>

            <p className="text-white text-xs mt-4 opacity-90">💡 Guarde estas credenciais em local seguro. Você as usará para conectar Claude.ai</p>
          </div>

          {/* Próximos passos */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-3">
            <h3 className="font-bold text-tilapia-dark">Próximos Passos</h3>
            <ol className="text-sm text-gray-700 space-y-3 list-decimal list-inside">
              <li>
                <a
                  href="https://www.notion.so/Como-Instalar-MCP-SAACS-no-Claude-ai-3496987afdf78060930af8c29e8dffe0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tilapia-dark font-semibold hover:underline"
                >
                  Siga as instruções neste link
                </a>
              </li>
              <li>Conecte nosso servidor MCP em sua conta do Claude.ai</li>
              <li>Comece sua jornada de estruturação de projetos com IA</li>
            </ol>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-gray-700">
              <strong className="text-tilapia-dark">📧 NOTA:</strong> Clique em <strong>Pronto</strong> e você receberá essas mesmas informações no seu email. Guarde essas informações!
            </div>
          </div>

          {/* Mensagem de sucesso */}
          {success && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-green-700 font-semibold">✓ Email de confirmação enviado com sucesso!</p>
              <p className="text-green-600 text-sm mt-1">Verifique sua caixa de entrada para as credenciais e instruções.</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4">
            {!success ? (
              <>
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
                  {sending ? 'Enviando...' : <><CheckCircle2 size={20} /> Pronto!</>}
                </button>
              </>
            ) : (
              <div className="w-full bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 size={20} /> Onboarding Finalizado!
              </div>
            )}
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
