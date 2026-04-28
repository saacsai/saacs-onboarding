'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { ArrowRight, ArrowLeft, PlayCircle } from 'lucide-react'
import { TrilhaConfig, TrilhaStep } from '@/config/trilha.config'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

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
  const playerRef = useRef<any>(null)
  const containerId = `yt-player-${stepAtual}`

  const isPlaceholder = step.youtube_id.startsWith('PLACEHOLDER')
  const maxWatchedRef = useRef<number>(0)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    if (isPlaceholder) return

    const loadYT = () => {
      if (window.YT && window.YT.Player) {
        initPlayer()
      } else {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
        window.onYouTubeIframeAPIReady = initPlayer
      }
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(containerId, {
        videoId: step.youtube_id,
        playerVars: { rel: 0, modestbranding: 1, controls: 1 },
        events: {
          onStateChange: (event: any) => {
            // ENDED = 0
            if (event.data === 0) {
              setAssistido(true)
              if (intervalRef.current) clearInterval(intervalRef.current)
            }

            // PLAYING = 1 — inicia monitoramento anti-skip
            if (event.data === 1) {
              intervalRef.current = setInterval(() => {
                const player = playerRef.current
                if (!player?.getCurrentTime) return
                const current = player.getCurrentTime()
                // Se avançou mais de 2s além do máximo assistido: volta
                if (current > maxWatchedRef.current + 2) {
                  player.seekTo(maxWatchedRef.current, true)
                } else {
                  maxWatchedRef.current = Math.max(maxWatchedRef.current, current)
                }
              }, 1000)
            }

            // PAUSED = 2 — para monitoramento
            if (event.data === 2) {
              if (intervalRef.current) clearInterval(intervalRef.current)
            }
          }
        }
      })
    }

    loadYT()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (playerRef.current?.destroy) playerRef.current.destroy()
    }
  }, [step.youtube_id, isPlaceholder])

  return (
    <div className="py-8">
      <ProgressBar current={stepAtual} total={config.totalSteps + 1} />

      <QuestionCard title={step.titulo} description={step.descricao}>
        <div className="space-y-6">

          {/* Vídeo */}
          <div className="rounded-lg overflow-hidden bg-gray-900 aspect-video relative">
            {isPlaceholder ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                <PlayCircle size={56} className="opacity-50" />
                <p className="text-sm opacity-50">Vídeo em produção</p>
              </div>
            ) : (
              <div id={containerId} className="absolute inset-0 w-full h-full" />
            )}
          </div>

          {/* Aviso enquanto não terminou */}
          {!assistido && !isPlaceholder && (
            <p className="text-xs text-gray-400 text-center">
              Assista ao vídeo até o final para continuar
            </p>
          )}

          {/* Texto de apoio */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 leading-relaxed">{step.texto_apoio}</p>
          </div>

          {/* Navegação — só aparece após vídeo terminar (ou placeholder) */}
          <div className="flex gap-4">
            <Link
              href={stepAnteriorUrl.replace('[lead_id]', leadId)}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} /> Voltar
            </Link>
            <button
              onClick={() => router.push(proximoStepUrl.replace('[lead_id]', leadId))}
              disabled={!assistido && !isPlaceholder}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                assistido || isPlaceholder
                  ? 'bg-tilapia-dark text-white hover:opacity-90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Próximo <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </QuestionCard>
    </div>
  )
}
