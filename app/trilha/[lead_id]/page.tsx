'use client'

// Página de entrada da trilha — redireciona para o step onde o usuário parou
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function TrilhaIndex() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string

  useEffect(() => {
    async function redirect() {
      const { data } = await supabase
        .from('tlp_projetos')
        .select('trilha_step_atual, trilha_concluida')
        .eq('id', leadId)
        .single() as { data: any }

      const step = data?.trilha_step_atual || 1
      const totalSteps = 5

      if (data?.trilha_concluida || step > totalSteps) {
        router.replace(`/trilha/${leadId}/conclusao`)
      } else {
        router.replace(`/trilha/${leadId}/step-${step}`)
      }
    }

    if (leadId) redirect()
  }, [leadId])

  return (
    <div className="py-8 text-center">
      <div className="animate-spin inline-block">
        <div className="w-8 h-8 border-4 border-tilapia-dark border-t-transparent rounded-full" />
      </div>
    </div>
  )
}
