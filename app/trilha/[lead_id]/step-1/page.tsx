'use client'

import TrilhaVideoStep from '@/components/TrilhaVideoStep'
import { trilhaConfig } from '@/config/trilha.config'

export default function TrilhaStep1() {
  return (
    <TrilhaVideoStep
      config={trilhaConfig}
      stepAtual={1}
      step={trilhaConfig.steps[0]}
      stepAnteriorUrl="/trilha/[lead_id]/step-1"
      proximoStepUrl="/trilha/[lead_id]/step-2"
    />
  )
}
