'use client'

import TrilhaVideoStep from '@/components/TrilhaVideoStep'
import { trilhaConfig } from '@/config/trilha.config'

export default function TrilhaStep2() {
  return (
    <TrilhaVideoStep
      config={trilhaConfig}
      stepAtual={2}
      step={trilhaConfig.steps[1]}
      stepAnteriorUrl="/trilha/[lead_id]/step-1"
      proximoStepUrl="/trilha/[lead_id]/step-3"
    />
  )
}
