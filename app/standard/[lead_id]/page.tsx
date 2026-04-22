'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase, LeadStandard } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

export default function Step1() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string
  const [lead, setLead] = useState<LeadStandard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLead() {
      try {
        setLoading(true)
        const { data: projeto, error: projectError } = await supabase
          .from('tlp_projetos')
          .select('*')
          .eq('id', leadId)
          .single()

        if (projectError || !projeto) {
          setError('Projeto não encontrado')
          setLoading(false)
          return
        }

        // Verificar status em pre_anamnese_tilapia_standard
        const { data: anamneseList } = await supabase
          .from('pre_anamnese_tilapia_standard')
          .select('status')
          .eq('projeto_id', leadId)

        const anamnese = Array.isArray(anamneseList) ? anamneseList[0] : null

        // Se já completado, redireciona para tela de resumo
        if (anamnese?.status === 'completo') {
          router.push(`/standard/${leadId}/step-5?completed=true`)
          return
        }

        const { data: cliente, error: clienteError } = await supabase
          .from('clients')
          .select('nome, email')
          .eq('id', projeto.client_id)
          .single()

        if (clienteError) {
          console.warn('Cliente não encontrado:', clienteError)
        }

        setLead({
          id: projeto.id,
          nome: cliente?.nome || 'Usuário',
          email: cliente?.email || '',
          status: projeto.status
        } as LeadStandard)
        setLoading(false)
      } catch (err) {
        setError('Erro ao carregar dados')
        console.error(err)
        setLoading(false)
      }
    }

    if (leadId) {
      fetchLead()
    }
  }, [leadId, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-tilapia-dark border-t-transparent rounded-full" />
        </div>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-red-700">
        <p>{error || 'Erro ao carregar'}</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <ProgressBar current={1} total={6} />

      <QuestionCard
        title={`Bem vindo(a) ${lead.nome}!`}
        description="Antes de degustar a TILAPIA precisamos limpá-la, tirar as escamas, tirar a pele, tirar os espinhos e deixar só o filé."
      >
        <div className="space-y-6">
          {/* Quadro azul - 3 opções */}
          <div className="bg-tilapia-dark text-white p-8 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Você tem 3 opções para fazer isso:</h3>
            <ol className="space-y-3 list-decimal list-inside">
              <li>Achar que é besteira e fazer isso de forma displicente</li>
              <li>Pedir para alguém fazer por você (nunca vai ser igual, mesmo pela IA)</li>
              <li>Agir como um verdadeiro chefe e fazer como deve ser feito</li>
            </ol>
          </div>

          {/* Quadro de dica - Confúcio */}
          <div className="bg-blue-50 border-l-4 border-tilapia-dark p-6 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-tilapia-dark">💡 Lembre-se:</strong>
              <br />
              <em>&quot;Em todas as coisas o sucesso depende de uma preparação prévia, e sem tal preparação a falha é certa&quot;</em>
              <br />
              <span className="text-gray-600">— Confúcio</span>
            </p>
          </div>

          {/* Botão Começar */}
          <div className="flex gap-4">
            <Link
              href={`/standard/${leadId}/step-2`}
              className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Começar Agora <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </QuestionCard>
    </div>
  )
}
