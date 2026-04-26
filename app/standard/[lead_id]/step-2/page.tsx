'use client'

import OnboardingQuestionStep from '@/components/OnboardingQuestionStep'
import { standardConfig } from '@/config/standard.config'

export default function Step2() {
  return (
    <OnboardingQuestionStep
      config={standardConfig}
      stepAtual={2}
      campoResposta="resposta_1"
      campoQuestao="questao_1"
      campoPlaceholder="placeholder_1"
      stepAnteriorUrl="/standard/[lead_id]"
      proximoStepUrl="/standard/[lead_id]/step-3"
    />
  )
}
