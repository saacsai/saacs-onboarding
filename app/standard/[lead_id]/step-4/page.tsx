'use client'

import OnboardingQuestionStep from '@/components/OnboardingQuestionStep'
import { standardConfig } from '@/config/standard.config'

export default function Step4() {
  return (
    <OnboardingQuestionStep
      config={standardConfig}
      stepAtual={4}
      campoResposta="resposta_3"
      campoQuestao="questao_3"
      campoPlaceholder="placeholder_3"
      stepAnteriorUrl="/standard/[lead_id]/step-3"
      proximoStepUrl="/standard/[lead_id]/step-4b"
    />
  )
}
