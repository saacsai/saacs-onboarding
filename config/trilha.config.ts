// Configuração das Trilhas de Acesso — 5 módulos
// Ativada pelo Gate 2: EXPLORADOR + literacia_baixa
// Ao concluir: webhook libera credenciais OAuth

export interface TrilhaStep {
  titulo: string
  descricao: string
  youtube_id: string
  texto_apoio: string
}

export interface TrilhaConfig {
  titulo_pagina: string
  subtitulo: string
  totalSteps: number
  webhookUrl: string
  steps: TrilhaStep[]
  perguntas_conclusao: string[]
}

export const trilhaConfig: TrilhaConfig = {
  titulo_pagina: 'Trilha de Acesso TILAPIA',
  subtitulo: '20 minutos que mudam como você trabalha com projetos',
  totalSteps: 5,
  webhookUrl: 'https://webhook.saacs.com.br/webhook/trilha-concluida',

  steps: [
    {
      titulo: 'Módulo 1 — Projeto não é processo',
      descricao: 'Entenda a distinção que é o fundamento de tudo que vem depois.',
      youtube_id: 'cTqTjkLXEQs',
      texto_apoio: 'A maioria das iniciativas falha não por falta de ideia — mas por falta de regras. O que transforma uma ideia em projeto é simples: data de início, data de fim, resultado em números, e alguém a quem você deve esse resultado. Sem esses quatro elementos, o que você tem é um processo — roda indefinidamente, sem entrega clara, sem cobrança possível.'
    },
    {
      titulo: 'Módulo 2 — Os 5 Passos em 5 minutos',
      descricao: 'Uma visão panorâmica da metodologia TILAPIA — o que cada passo entrega.',
      youtube_id: 'dvWMmPMWI4A',
      texto_apoio: 'O TILAPIA tem 5 passos: (1) Regras do Jogo — o que o financiador ou você mesmo exige; (2) Contexto — o "por que agora" com dados reais; (3) O Proponente — quem executa, forças e fraquezas; (4) Escopo — objetivo, metas, resultados, etapas; (5) O Plano — Plano de Trabalho em Word e cronograma com equipe. Cada passo alimenta o próximo. Nenhum pode ser pulado.'
    },
    {
      titulo: 'Módulo 3 — Mise en place: chegue preparado',
      descricao: 'O Claude é o fogão, o TILAPIA é a receita — mas os ingredientes são seus.',
      youtube_id: '6pkmUI82guI',
      texto_apoio: 'O TILAPIA não inventa informação — organiza o que você traz. Para projeto com edital: o documento completo com todos os anexos. Para projeto genérico: clareza sobre a quem você deve o resultado, qual é esse resultado em números, qual o prazo e quanto tem para investir. Para projeto pronto: o documento existente em Word ou PDF. Chegue com os ingredientes separados.'
    },
    {
      titulo: 'Módulo 4 — O que é o Claude e o que é o MCP',
      descricao: 'Entenda as ferramentas sem jargão técnico — o suficiente para a conexão fazer sentido.',
      youtube_id: '4ges5xlEsgg',
      texto_apoio: 'Claude é um assistente de IA com quem você conversa em linguagem natural. O MCP é a conexão que faz o Claude "saber" que está conduzindo um projeto com metodologia. Sem o TILAPIA conectado, o Claude é genérico — responde qualquer coisa, sem método. Com o TILAPIA conectado, ele conduz os passos, valida suas respostas e entrega estrutura. A diferença é a apresentação formal que coloca os dois no mesmo contexto.'
    },
    {
      titulo: 'Módulo 5 — O que o TILAPIA não é',
      descricao: 'Calibre suas expectativas antes de começar — para não se surpreender depois.',
      youtube_id: 'I6BE5jLfEww',
      texto_apoio: 'O TILAPIA não escreve o projeto por você. Não substitui o conhecimento do território. Não aprova editais. Não garante financiamento. O que ele faz: organiza o que você já sabe em uma estrutura que funciona, e faz as perguntas certas na ordem certa para que nada importante fique de fora. Você ainda vai precisar pensar — mas vai pensar com método, não no escuro.'
    }
  ],

  perguntas_conclusao: [
    'Quais as diferenças entre processos e projetos?',
    'Cite uma diferença entre usar o Claude sem e com o TILAPIA.',
    'O que o TILAPIA não faz por você?'
  ]
}
