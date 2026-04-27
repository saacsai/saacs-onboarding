'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { supabase } from '@/lib/supabase'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Step4b() {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string

  const [ia1, setIa1] = useState<boolean | null>(null)
  const [ia2, setIa2] = useState<boolean | null>(null)
  const [ia2Qual, setIa2Qual] = useState('')
  const [ia3, setIa3] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase
          .from('pre_anamnese_tilapia_standard')
          .select('resposta_ia1, resposta_ia2, resposta_ia2_qual, resposta_ia3')
          .eq('projeto_id', leadId)
          .single() as { data: any }

        if (data) {
          if (data.resposta_ia1 !== null) setIa1(data.resposta_ia1)
          if (data.resposta_ia2 !== null) setIa2(data.resposta_ia2)
          if (data.resposta_ia2_qual) setIa2Qual(data.resposta_ia2_qual)
          if (data.resposta_ia3 !== null) setIa3(data.resposta_ia3)
        }
      } catch (err) {
        console.error('Erro ao carregar:', err)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) loadData()
  }, [leadId])

  const handleNext = async () => {
    if (ia1 === null || ia2 === null || ia3 === null) {
      alert('Por favor, responda todas as perguntas')
      return
    }
    if (ia2 === true && !ia2Qual.trim()) {
      alert('Por favor, informe qual plano você usa')
      return
    }

    try {
      setSaving(true)

      await supabase
        .from('pre_anamnese_tilapia_standard')
        .update({
          resposta_ia1: ia1,
          resposta_ia2: ia2,
          resposta_ia2_qual: ia2 ? ia2Qual : null,
          resposta_ia3: ia3,
          updated_at: new Date().toISOString()
        })
        .eq('projeto_id', leadId)

      router.push(`/standard/${leadId}/step-5`)
    } catch (err) {
      console.error('Erro ao salvar:', err)
      alert('Erro ao salvar respostas')
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
      <ProgressBar current={5} total={7} />

      <QuestionCard
        title="Sua experiência com Inteligência Artificial"
        description="Três perguntas rápidas para personalizarmos sua jornada"
      >
        <div className="space-y-8">

          {/* Q1 */}
          <div>
            <p className="font-semibold text-gray-800 mb-3">
              Você já usa alguma IA no dia a dia? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col gap-2">
              {[{ label: 'Sim', value: true }, { label: 'Não', value: false }].map(({ label, value }) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="ia1"
                    checked={ia1 === value}
                    onChange={() => setIa1(value)}
                    className="w-4 h-4 accent-tilapia-dark"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div>
            <p className="font-semibold text-gray-800 mb-3">
              Você tem algum plano pago de IA? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col gap-2">
              {[{ label: 'Sim', value: true }, { label: 'Não', value: false }].map(({ label, value }) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="ia2"
                    checked={ia2 === value}
                    onChange={() => { setIa2(value); if (!value) setIa2Qual('') }}
                    className="w-4 h-4 accent-tilapia-dark"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            {ia2 === true && (
              <div className="mt-3">
                <input
                  type="text"
                  value={ia2Qual}
                  onChange={(e) => setIa2Qual(e.target.value)}
                  placeholder="Ex: ChatGPT Plus, Claude Pro, Gemini Advanced..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tilapia-dark text-sm"
                />
              </div>
            )}
          </div>

          {/* Q3 */}
          <div>
            <p className="font-semibold text-gray-800 mb-3">
              Já usou Claude Cowork ou Claude Code? <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-col gap-2">
              {[{ label: 'Sim', value: true }, { label: 'Não', value: false }].map(({ label, value }) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="ia3"
                    checked={ia3 === value}
                    onChange={() => setIa3(value)}
                    className="w-4 h-4 accent-tilapia-dark"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div className="flex gap-4">
            <Link
              href={`/standard/${leadId}/step-4`}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar
            </Link>
            <button
              onClick={handleNext}
              disabled={saving}
              className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? 'Salvando...' : <>Próximo <ArrowRight size={20} /></>}
            </button>
          </div>

        </div>
      </QuestionCard>
    </div>
  )
}
