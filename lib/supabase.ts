import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export type LeadStandard = {
  id: string
  nome: string
  sobrenome?: string
  ocupacao?: string
  cpf: string
  email: string
  telefone: string
  tipo_projeto: string
  lgpd_aceito: boolean
  status: 'novo' | 'onboarding_iniciado' | 'onboarding_completo' | 'projeto_criado' | 'error'
  projeto_id?: string
  created_at: string
  updated_at: string
}

export type PreAnamnese = {
  id: string
  lead_id: string
  passo: number
  pergunta: string
  resposta: string
  created_at: string
  updated_at: string
}

export type LeadCorporate = {
  id: string
  nome: string
  sobrenome?: string
  email: string
  telefone: string
  empresa: string
  cnpj: string
  status: 'novo' | 'form2_enviado' | 'diagnostico_respondido' | 'proposta_enviada' | 'tratando'
  created_at: string
  updated_at: string
}
