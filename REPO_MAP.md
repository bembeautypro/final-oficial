# REPO_MAP.md - Mapeamento Completo da Estrutura do Repositório

## 📊 **Árvore de Diretórios e Arquivos**

```
├── 📁 api/                           ⚠️  [VERCEL FUNCTIONS]
│   ├── distribuidores.js             ✅ Nova API Vercel (corrigida)
│   ├── distribuidores.ts             ❌ DUPLICATA TypeScript (não usada)
│   ├── leads.js                      ✅ Nova API Vercel (corrigida)
│   ├── leads.ts                      ❌ DUPLICATA TypeScript (não usada)
│   └── ping.ts                       ❌ DESNECESSÁRIO (teste)
├── 📁 attached_assets/               ⚠️  [ARQUIVOS GRANDES - REMOVER DO GIT]
│   ├── *.txt (8 arquivos)            ❌ Logs e prints desnecessários
│   └── y4g24g45_1754691784340.png    ❌ Imagem não otimizada
├── 📁 client/                        ✅ [FRONTEND PRINCIPAL - ATIVO]
│   ├── index.html                    ✅ Entry point do frontend
│   └── 📁 src/                       ✅ Código fonte principal
│       ├── 📁 components/            ✅ Componentes React
│       ├── 📁 pages/                 ✅ Páginas da aplicação
│       ├── 📁 utils/                 ⚠️  DUPLICADO (ver src/utils/)
│       ├── App.css                   ❌ DUPLICATA - remover
│       ├── App.tsx                   ✅ Componente principal
│       ├── index.css                 ⚠️  DUPLICADO (ver src/index.css)
│       └── main.tsx                  ✅ Entry point React
├── 📁 server/                        ⚠️  [BACKEND REPLIT - NÃO USADO EM PROD]
│   ├── db.ts                         ⚠️  Config database local
│   ├── index.ts                      ⚠️  Express server (dev only)
│   ├── routes.ts                     ⚠️  Rotas backend (dev only)
│   ├── storage.ts                    ⚠️  Interface storage (dev only)
│   └── vite.ts                       ⚠️  Config Vite server
├── 📁 shared/                        ✅ [SCHEMAS COMPARTILHADOS]
│   └── schema.ts                     ✅ Schemas Drizzle/Zod
├── 📁 src/                           ❌ [DUPLICATA COMPLETA - REMOVER]
│   ├── 📁 components/                ❌ DUPLICADO (ver client/src/)
│   ├── 📁 utils/                     ❌ DUPLICADO (ver client/src/)
│   ├── index.css                     ❌ DUPLICADO (ver client/src/)
│   └── App.tsx                       ❌ DUPLICADO (ver client/src/)
├── 📁 node_modules/                  ❌ [GIT IGNORE FALTANDO]
├── drizzle.config.ts                 ✅ Config database
├── package.json                      ✅ Dependencies e scripts
├── tsconfig.json                     ✅ Config TypeScript
├── vercel.json                       ✅ Config deploy Vercel
├── vite.config.ts                    ⚠️  Config desenvolvimento
├── vite.config.deploy.ts             ✅ Config produção (usado)
├── index.html                        ⚠️  DUPLICADO (ver client/index.html)
└── .env.example                      ✅ Template variáveis ambiente
```

## 🗂️ **Tabela de Status por Diretório**

| Diretório | Finalidade | Stack/Linguagem | Status | Ação Recomendada |
|-----------|------------|-----------------|--------|-------------------|
| `api/` | Vercel Functions | Node.js/JS | 🟨 CONFLITO | Manter apenas .js, remover .ts |
| `attached_assets/` | Uploads temporários | Mixed | 🔴 REMOVER | Adicionar ao .gitignore |
| `client/` | Frontend principal | React/TS | 🟢 ATIVO | Manter como fonte canônica |
| `server/` | Backend Replit | Express/TS | 🟨 DEV-ONLY | Manter para desenvolvimento |
| `shared/` | Schemas compartilhados | TS/Drizzle | 🟢 ATIVO | Manter |
| `src/` | Frontend duplicado | React/TS | 🔴 LEGADO | **REMOVER COMPLETAMENTE** |
| `node_modules/` | Dependencies NPM | - | 🔴 GIT | Adicionar ao .gitignore |

## ⚠️ **Arquivos Problemáticos Identificados**

### Duplicações Críticas:
- `src/` ↔ `client/src/` (pasta inteira duplicada)
- `index.html` ↔ `client/index.html`
- `src/index.css` ↔ `client/src/index.css`
- `api/*.ts` ↔ `api/*.js` (mesma funcionalidade)

### Arquivos Grandes Desnecessários:
- `attached_assets/` (8 arquivos de log/debug - 2.3MB)
- `node_modules/` sendo commitado (300MB+)

### Configurações Conflitantes:
- `vite.config.ts` vs `vite.config.deploy.ts`
- Múltiplos pontos de entrada HTML
- APIs em TypeScript e JavaScript

## 🎯 **Diretório Canônico Recomendado**

### Frontend: `client/src/`
- ✅ Usar como fonte única da verdade
- ❌ Remover pasta `src/` duplicada
- ✅ Manter estrutura: `client/src/{components,pages,utils}/`

### APIs: `api/*.js`
- ✅ Manter arquivos JavaScript para Vercel
- ❌ Remover arquivos TypeScript duplicados
- ✅ Runtime: Node.js 20.x

### Configuração: Root level
- ✅ `vite.config.deploy.ts` para produção
- ⚠️ `vite.config.ts` apenas para desenvolvimento

## 📈 **Estatísticas do Repositório**

- **Arquivos totais**: ~847 arquivos
- **Duplicações identificadas**: 23 arquivos
- **Espaço desperdiçado**: ~302MB (node_modules + assets)
- **Configurações conflitantes**: 5 arquivos
- **APIs redundantes**: 3 arquivos (.ts não usados)

## 🔧 **Próximos Passos**

1. **Limpeza Imediata**:
   - Remover pasta `src/` completamente
   - Adicionar `node_modules/` e `attached_assets/` ao .gitignore
   - Remover `api/*.ts` e manter apenas `.js`

2. **Padronização**:
   - Definir `client/src/` como diretório canônico frontend
   - Configurar build para usar `vite.config.deploy.ts`
   - Unificar entry points em `client/index.html`

3. **Validação**:
   - Verificar imports após limpeza
   - Testar build de produção
   - Confirmar APIs funcionando na Vercel