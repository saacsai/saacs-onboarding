'use client'

import OnboardingCompleteStep from '@/components/OnboardingCompleteStep'
import { standardConfig } from '@/config/standard.config'

export default function Step6() {
  return (
    <OnboardingCompleteStep
      config={standardConfig}
      stepAtual={6}
      stepAnteriorUrl="/standard/[lead_id]/step-5"
    />
  )
}
