// Configuração das Trilhas de Acesso
// Ativada pelo Gate 2: EXPLORADOR + literacia_baixa
// Ao concluir: webhook libera credenciais OAuth

export interface TrilhaStep {
  titulo: string
  descricao: string
  youtube_id: string       // ID do vídeo YouTube (substituir quando pronto)
  texto_apoio: string      // Texto abaixo do vídeo
}

export interface TrilhaConfig {
  titulo_pagina: string
  subtitulo: string
  totalSteps: number
  webhookUrl: string
  steps: TrilhaStep[]
  perguntas_conclusao: string[]  // Perguntas de confirmação de entendimento
}

export const trilhaConfig: TrilhaConfig = {
  titulo_pagina: 'Trilha de Acesso TILAPIA',
  subtitulo: '20 minutos que mudam como você trabalha com projetos',
  totalSteps: 3,
  webhookUrl: 'https://webhook.saacs.com.br/webhook/trilha-concluida',

  steps: [
    {
      titulo: 'O que é o Claude e por que o plano Pro vale a pena',
      descricao: 'Entenda a ferramenta que vai conduzir sua jornada de estruturação de projetos.',
      youtube_id: 'PLACEHOLDER_VIDEO_1',  // ← substituir pelo ID real do YouTube
      texto_apoio: 'Claude é um assistente de IA desenvolvido pela Anthropic. No TILAPIA, ele atua como um especialista em projetos ao seu lado — fazendo as perguntas certas, organizando suas respostas e gerando documentos profissionais. O plano Pro garante que você tenha acesso completo sem interrupções.'
    },
    {
      titulo: 'Projeto vs. Processo — a única diferença que importa',
      descricao: 'Entenda por que essa distinção define se seu trabalho gera resultado ou fica girando em círculos.',
      youtube_id: 'PLACEHOLDER_VIDEO_2',  // ← substituir pelo ID real do YouTube
      texto_apoio: 'Todo processo roda indefinidamente. Um projeto tem data de início, data de fim e resultado esperado. Essa data cria compromisso. Sem compromisso, não há cobrança — e sem cobrança, não há resultado. O TILAPIA transforma sua ideia em projeto: com prazo, responsável e entrega clara.'
    },
    {
      titulo: 'O que é o TILAPIA e o que ele entrega',
      descricao: 'Conheça a metodologia que vai estruturar seu projeto do zero até o plano de trabalho.',
      youtube_id: 'PLACEHOLDER_VIDEO_3',  // ← substituir pelo ID real do YouTube
      texto_apoio: 'TILAPIA é uma metodologia de estruturação de projetos desenvolvida por Luciano Maeda com base em anos de experiência com editais públicos e projetos de impacto social. Em 5 passos, você sai de uma ideia vaga para um Plano de Trabalho completo — pronto para apresentar a financiadores, parceiros ou sua própria equipe.'
    }
  ],

  perguntas_conclusao: [
    'Qual a diferença entre projeto e processo?',
    'O que é o Passo Zero e para que serve?',
    'O que você espera entregar ao final do seu primeiro projeto no TILAPIA?'
  ]
}
