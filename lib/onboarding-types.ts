// Tipos para o sistema de onboarding genérico
// Para criar novo fluxo: criar arquivo em /config/<nome>.config.ts

export interface OnboardingConfig {
  nome: string
  totalSteps: number

  // Supabase
  tabelaRespostas: string       // ex: 'pre_anamnese_tilapia_standard'
  tabelaQuestoes: string        // ex: 'pre_anamnese_questoes'
  campoStatusProjeto: string    // ex: 'passo_zero_status'

  // N8N
  webhookUrl: string

  // Rota base da aplicação
  rotaBase: string              // ex: '/standard'

  // Perguntas fixas (alternativa ao banco de dados)
  // Se definido, usa estes textos em vez de buscar no Supabase
  perguntasFixas?: {
    questao_1?: string; placeholder_1?: string
    questao_2?: string; placeholder_2?: string
    questao_3?: string; placeholder_3?: string
    questao_4?: string; placeholder_4?: string
    questao_5?: string; placeholder_5?: string
  }

  // Steps de IA (perguntas objetivas — Bloco C do Standard)
  perguntasIA?: {
    questao_ia1: string; placeholder_ia1: string
    questao_ia2: string; placeholder_ia2: string
    questao_ia3: string; placeholder_ia3: string
  }

  // Textos da tela de conclusão (step final)
  telaFinal?: {
    titulo?: string
    subtitulo?: string
    mensagemEspera?: string
    mensagemSucesso?: string
  }
}
