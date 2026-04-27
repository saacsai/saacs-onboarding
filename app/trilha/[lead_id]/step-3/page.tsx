'use client'

import TrilhaVideoStep from '@/components/TrilhaVideoStep'
import { trilhaConfig } from '@/config/trilha.config'

export default function TrilhaStep3() {
  return (
    <TrilhaVideoStep
      config={trilhaConfig}
      stepAtual={3}
      step={trilhaConfig.steps[2]}
      stepAnteriorUrl="/trilha/[lead_id]/step-2"
      proximoStepUrl="/trilha/[lead_id]/conclusao"
    />
  )
}
