'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase, LeadStandard } from '@/lib/supabase'
import { Copy, CheckCircle2, ExternalLink } from 'lucide-react'

export default function Step5() {
  const params = useParams()
  const leadId = params.lead_id as string
  const [lead, setLead] = useState<LeadStandard | null>(null)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const { data: leadData } = await supabase
          .from('leads_standard')
          .select('*')
          .eq('id', leadId)
          .single()

        setLead(leadData)

        if (leadData?.projeto_id) {
          const { data: projectData } = await supabase
            .from('tlp_projetos')
            .select('*')
            .eq('id', leadData.projeto_id)
            .single()

          setProject(projectData)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [leadId])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
      <ProgressBar current={5} total={5} />

      <QuestionCard title="Pronto! 🎉" description="Suas credenciais estão prontas">
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Sucesso!</h3>
                <p className="text-green-800 text-sm">
                  Seu projeto foi criado e as credenciais de acesso foram geradas.
                </p>
              </div>
            </div>
          </div>

          {/* Credentials */}
          {project && (
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-saacs-900">Suas Credenciais OAuth:</h3>

              {/* Client ID */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase">
                  Client ID
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <code className="flex-1 bg-white p-3 rounded border border-gray-300 text-sm font-mono">
                    {project.oauth_client_id}
                  </code>
                  <button
                    onClick={() => copyToClipboard(project.oauth_client_id)}
                    className="p-2 hover:bg-white rounded transition-colors"
                    title="Copiar"
                  >
                    <Copy
                      size={20}
                      className={copied ? 'text-green-600' : 'text-gray-600'}
                    />
                  </button>
                </div>
              </div>

              {/* Client Secret */}
              <div>
                <label className="text-xs font-semibold text-gray-700 uppercase">
                  Client Secret
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <code className="flex-1 bg-white p-3 rounded border border-gray-300 text-sm font-mono">
                    {project.oauth_client_secret}
                  </code>
                  <button
                    onClick={() => copyToClipboard(project.oauth_client_secret)}
                    className="p-2 hover:bg-white rounded transition-colors"
                    title="Copiar"
                  >
                    <Copy
                      size={20}
                      className={copied ? 'text-green-600' : 'text-gray-600'}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 p-6 rounded-lg space-y-3">
            <h3 className="font-semibold text-blue-900">Como usar:</h3>
            <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
              <li>Acesse <a href="https://claude.ai" target="_blank" className="font-semibold hover:underline">claude.ai</a></li>
              <li>Procure por "MCP SAACS" ou "Custom MCP Connectors"</li>
              <li>Cole o Client ID e Client Secret acima</li>
              <li>Comece a estruturar seu projeto com Claude!</li>
            </ol>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href="https://claude.ai"
              target="_blank"
              className="bg-saacs-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-saacs-700 transition-colors flex items-center justify-center gap-2"
            >
              Abrir Claude.ai <ExternalLink size={20} />
            </a>
            <a
              href="/"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
            >
              Voltar para Home
            </a>
          </div>

          {/* Email Notification */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-800">
            Você também receberá um email com essas credenciais em breve.
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
