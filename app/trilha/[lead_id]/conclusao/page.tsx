'use client'

import TrilhaConclusaoStep from '@/components/TrilhaConclusaoStep'
import { trilhaConfig } from '@/config/trilha.config'

export default function TrilhaConclusao() {
  return (
    <TrilhaConclusaoStep
      config={trilhaConfig}
      stepAnteriorUrl="/trilha/[lead_id]/step-3"
    />
  )
}
