'use client'

import TrilhaVideoStep from '@/components/TrilhaVideoStep'
import { trilhaConfig } from '@/config/trilha.config'

export default function TrilhaStep4() {
  return (
    <TrilhaVideoStep
      config={trilhaConfig}
      stepAtual={4}
      step={trilhaConfig.steps[3]}
      stepAnteriorUrl="/trilha/[lead_id]/step-3"
      proximoStepUrl="/trilha/[lead_id]/step-5"
    />
  )
}
