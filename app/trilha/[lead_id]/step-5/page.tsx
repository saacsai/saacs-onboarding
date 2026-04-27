'use client'

import TrilhaVideoStep from '@/components/TrilhaVideoStep'
import { trilhaConfig } from '@/config/trilha.config'

export default function TrilhaStep5() {
  return (
    <TrilhaVideoStep
      config={trilhaConfig}
      stepAtual={5}
      step={trilhaConfig.steps[4]}
      stepAnteriorUrl="/trilha/[lead_id]/step-4"
      proximoStepUrl="/trilha/[lead_id]/conclusao"
    />
  )
}
