# SAACS Onboarding — Next.js + Supabase

Plataforma de onboarding interativo para TILAPIA Standard & Corporate, desenvolvida com Next.js e Supabase.

## 🚀 Features

- ✅ Onboarding tipo Typeform (passo-a-passo)
- ✅ Pré-anamnese integrada (coleta contexto para Claude.ai)
- ✅ Supabase real-time
- ✅ OAuth credentials geração automática
- ✅ TypeScript + Tailwind CSS
- ✅ Responsive design
- ✅ Deploy automático Vercel

## 📦 Instalação

```bash
# Clone o repo
git clone https://github.com/saacsai/saacs-onboarding.git
cd saacs-onboarding

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Execute localmente
npm run dev
# Acesse http://localhost:3000
```

## 🔧 Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_MCP_ENDPOINT=https://mcp.saacs.com.br
```

## 📁 Estrutura

```
app/
├── standard/[lead_id]/
│   ├── page.tsx (Passo 1: Bem-vindo)
│   ├── step-2/page.tsx (Objetivo)
│   ├── step-3/page.tsx (Resultado esperado)
│   ├── step-4/page.tsx (Revisar)
│   └── step-5/page.tsx (Credenciais)
├── corporate/[lead_id]/
│   ├── page.tsx (Form 2 Diagnóstico)
│   └── [questions]/page.tsx
└── api/
    └── save-response/route.ts
```

## 🎯 Fluxo Standard (TILAPIA Standard)

```
Mailchimp Form
  ↓
N8N validação + formatação
  ↓
Email com link: onboarding.saacs.com.br/standard/[lead_id]
  ↓
Passo 1: Bem-vindo (informações)
  ↓
Passo 2: Qual é seu objetivo?
  ↓
Passo 3: Resultado esperado em números?
  ↓
Passo 4: Revisar dados
  ↓
Passo 5: Credenciais OAuth + Claude.ai
```

## 🏢 Fluxo Corporate (TILAPIA Corporate)

```
Mailchimp Form
  ↓
Email com link: diagnostico.saacs.com.br/corporate/[lead_id]
  ↓
Form 2: Perguntas diagnósticas
  ↓
IA gera: diagnóstico + proposta
  ↓
Email para Marcelo com proposta completa
```

## 📊 Supabase Tables

### leads_standard
```sql
id UUID, nome TEXT, email TEXT, tipo_projeto TEXT, status TEXT, projeto_id UUID
```

### pre_anamnese_standard
```sql
id UUID, lead_id UUID, passo INT, pergunta TEXT, resposta TEXT
```

### leads_corporate
```sql
id UUID, nome TEXT, email TEXT, empresa TEXT, cnpj TEXT, status TEXT
```

## 🚀 Deploy Vercel

```bash
# 1. Push para GitHub
git push origin main

# 2. Abra https://vercel.com
# 3. New Project → Import saacs-onboarding
# 4. Configure variáveis de ambiente
# 5. Deploy

# URL será: onboarding.saacs.com.br (via DNS)
```

## 🔗 Integração MCP SAACS

Quando o onboarding completa (Passo 5), a API chama:

```bash
POST https://mcp.saacs.com.br/api/projetos/novo
{
  "nome": "Projeto de [nome]",
  "email": "[email]",
  "tipo_projeto": "[tipo selecionado]"
}
```

Resposta contém `oauth_client_id` e `oauth_client_secret`.

## 🧪 Testes

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

## 📝 Documentação

Ver `MAILCHIMP_INTEGRATION.md` e `PLANO_IMPLEMENTACAO.md` no repo principal (MCP_SAACS)

## 📞 Support

- Luciano Maeda: luciano.maeda@gmail.com
- GitHub Issues: https://github.com/saacsai/saacs-onboarding/issues

---

**Versão**: 1.0  
**Data**: 2026-04-20  
**Mantido por**: Luciano Maeda + Claude
