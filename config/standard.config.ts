import { OnboardingConfig } from '@/lib/onboarding-types'

// Configuração do fluxo TILAPIA Standard
// Perguntas subjetivas (Q1-Q3) vêm do banco (pre_anamnese_questoes por atividade)
// Perguntas de IA (Q4-Q6) são fixas para todos

export const standardConfig: OnboardingConfig = {
  nome: 'TILAPIA Standard',
  totalSteps: 7,

  tabelaRespostas: 'pre_anamnese_tilapia_standard',
  tabelaQuestoes: 'pre_anamnese_questoes',
  campoStatusProjeto: 'passo_zero_status',

  webhookUrl: 'https://webhook.saacs.com.br/webhook/onboarding-completo',

  rotaBase: '/standard',

  // Q1-Q3 vêm do banco (variam por atividade) — não definir perguntasFixas aqui
  // Q4-Q6 são fixas para todos (Bloco C — Experiência com IA)
  perguntasIA: {
    questao_ia1: 'Você já usa alguma IA no dia a dia?',
    placeholder_ia1: 'Ex: Uso ChatGPT para redigir emails, Gemini para pesquisas...',
    questao_ia2: 'Você tem algum plano pago de IA?',
    placeholder_ia2: 'Ex: Tenho ChatGPT Plus, uso o plano gratuito do Claude...',
    questao_ia3: 'Já usou Claude Cowork ou Claude Code?',
    placeholder_ia3: 'Ex: Nunca ouvi falar, já testei algumas vezes...',
  },

  telaFinal: {
    titulo: 'Onboarding concluído!',
    subtitulo: 'Suas respostas foram recebidas com sucesso.',
    mensagemEspera: 'Após clicar em Pronto, analisamos seu perfil e enviamos as credenciais de acesso diretamente para o seu email em poucos minutos.',
    mensagemSucesso: 'Suas respostas foram processadas. Verifique seu email — as instruções de acesso chegarão em instantes.',
  },
}
