'use client'

import OnboardingQuestionStep from '@/components/OnboardingQuestionStep'
import { standardConfig } from '@/config/standard.config'

export default function Step3() {
  return (
    <OnboardingQuestionStep
      config={standardConfig}
      stepAtual={3}
      campoResposta="resposta_2"
      campoQuestao="questao_2"
      campoPlaceholder="placeholder_2"
      stepAnteriorUrl="/standard/[lead_id]/step-2"
      proximoStepUrl="/standard/[lead_id]/step-4"
    />
  )
}
