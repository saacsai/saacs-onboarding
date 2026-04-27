'use client'

import OnboardingReviewStep from '@/components/OnboardingReviewStep'
import { standardConfig } from '@/config/standard.config'

export default function Step5() {
  return (
    <OnboardingReviewStep
      config={standardConfig}
      stepAtual={6}
      stepAnteriorUrl="/standard/[lead_id]/step-4b"
      proximoStepUrl="/standard/[lead_id]/step-6"
      camposResposta={['resposta_1', 'resposta_2', 'resposta_3']}
      camposQuestao={['questao_1', 'questao_2', 'questao_3']}
    />
  )
}
