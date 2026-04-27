'use client'

// Componente genérico para steps de vídeo da Trilha de Acesso
// Embeda YouTube dentro do Vercel — sem sair da aplicação

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { ArrowRight, ArrowLeft, PlayCircle } from 'lucide-react'
import { TrilhaConfig, TrilhaStep } from '@/config/trilha.config'

interface Props {
  config: TrilhaConfig
  stepAtual: number
  step: TrilhaStep
  stepAnteriorUrl: string
  proximoStepUrl: string
}

export default function TrilhaVideoStep({
  config,
  stepAtual,
  step,
  stepAnteriorUrl,
  proximoStepUrl
}: Props) {
  const params = useParams()
  const router = useRouter()
  const leadId = params.lead_id as string
  const [assistido, setAssistido] = useState(false)

  const isPlaceholder = step.youtube_id.startsWith('PLACEHOLDER')

  return (
    <div className="py-8">
      <ProgressBar current={stepAtual} total={config.totalSteps + 1} />

      <QuestionCard
        title={step.titulo}
        description={step.descricao}
      >
        <div className="space-y-6">

          {/* Vídeo YouTube embedado */}
          <div className="rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
            {isPlaceholder ? (
              // Placeholder visual enquanto vídeo não está pronto
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                <PlayCircle size={56} className="opacity-50" />
                <p className="text-sm opacity-50">Vídeo em produção</p>
                <p className="text-xs opacity-40">{step.youtube_id}</p>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${step.youtube_id}?rel=0&modestbranding=1`}
                title={step.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                onLoad={() => setAssistido(true)}
              />
            )}
          </div>

          {/* Texto de apoio */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 leading-relaxed">{step.texto_apoio}</p>
          </div>

          {/* Confirmação de visualização (placeholder libera direto) */}
          {!assistido && !isPlaceholder && (
            <p className="text-xs text-gray-400 text-center">Assista ao vídeo para continuar</p>
          )}

          {/* Botão de confirmação */}
          {(isPlaceholder || assistido) && (
            <button
              onClick={() => setAssistido(true)}
              className="w-full bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              Entendi, próximo <ArrowRight size={20} />
            </button>
          )}

          {/* Botão ativo após confirmar */}
          {assistido && (
            <div className="flex gap-4">
              <Link
                href={stepAnteriorUrl.replace('[lead_id]', leadId)}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} /> Voltar
              </Link>
              <button
                onClick={() => router.push(proximoStepUrl.replace('[lead_id]', leadId))}
                className="flex-1 bg-tilapia-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                Próximo <ArrowRight size={20} />
              </button>
            </div>
          )}

        </div>
      </QuestionCard>
    </div>
  )
}
