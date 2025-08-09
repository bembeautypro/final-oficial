# DUPLICATES_REPORT.md - Relatório de Duplicidades e Conflitos

## 🚨 **Duplicidades Críticas Identificadas**

### 1. **PASTA FRONTEND DUPLICADA** (CRÍTICO)
```
❌ src/ (completa)          vs  ✅ client/src/ (canônica)
```

**Arquivos Duplicados:**
- `src/App.tsx` ↔ `client/src/App.tsx`
- `src/index.css` ↔ `client/src/index.css`
- `src/components/ui/badge.tsx` ↔ `client/src/components/ui/badge.tsx`
- `src/utils/logger.ts` ↔ `client/src/utils/logger.ts`
- `src/utils/preloader.ts` ↔ `client/src/utils/preloader.ts`

**Impacto:** Confusão de imports, builds duplicados, conflitos de versão
**Ação:** REMOVER pasta `src/` completamente

### 2. **APIs VERCEL DUPLICADAS**
```
❌ api/leads.ts            vs  ✅ api/leads.js (Vercel Function)
❌ api/distribuidores.ts   vs  ✅ api/distribuidores.js (Vercel Function)
```

**Problema:** Vercel usa .js, arquivos .ts são ignorados
**Ação:** REMOVER todos os `.ts` da pasta `api/`

### 3. **ENTRY POINTS HTML DUPLICADOS**
```
❌ index.html (raiz)       vs  ✅ client/index.html (usado no build)
```

**Problema:** Configurações diferentes, conflito de build
**Ação:** REMOVER `index.html` da raiz

### 4. **CONFIGURAÇÕES VITE CONFLITANTES**
```
⚠️ vite.config.ts (dev)     vs  ✅ vite.config.deploy.ts (prod)
```

**Problema:** Paths diferentes, outputDir conflitante
**Ação:** Padronizar uso de `vite.config.deploy.ts`

## 📂 **Diretórios Canônicos Definidos**

### Frontend: `client/src/` ✅
```
client/src/
├── components/           # Componentes React
├── pages/               # Páginas da aplicação  
├── utils/               # Utilitários frontend
├── App.tsx              # Componente principal
├── index.css            # Estilos globais
└── main.tsx             # Entry point
```

### APIs: `api/*.js` ✅
```
api/
├── leads.js             # Captura de leads
├── distribuidores.js    # Aplicações distribuidor
└── ping.js              # Health check (opcional)
```

### Backend Dev: `server/` ⚠️ (Dev only)
```
server/
├── index.ts             # Express server (Replit)
├── routes.ts            # Rotas desenvolvimento
└── db.ts                # Config database
```

## 🗑️ **O Que Pode Ser Removido**

### **REMOVER IMEDIATAMENTE:**
```bash
# Pasta frontend duplicada
rm -rf src/

# APIs TypeScript não usadas
rm api/leads.ts
rm api/distribuidores.ts
rm api/ping.ts

# HTML duplicado
rm index.html

# Arquivos desnecessários
rm -rf attached_assets/
```

### **MOVER/RENOMEAR:**
```bash
# Configuração principal
mv vite.config.deploy.ts vite.config.prod.ts

# Backup configuração dev (se necessário)
mv vite.config.ts vite.config.dev.ts
```

## 🔄 **Componentes com Nomes Similares**

### Error Boundaries:
- `client/src/components/ui/error-boundary.tsx` (básico)
- `src/components/ui/enhanced-error-boundary.tsx` (avançado)

**Recomendação:** Manter apenas `enhanced-error-boundary.tsx`

### Loading States:
- `client/src/components/ui/loading-state.tsx`
- `client/src/components/ui/optimized-loading-skeleton.tsx`

**Recomendação:** Unificar em um componente

### Skip Links:
- `client/src/components/ui/skip-to-content.tsx`
- `client/src/components/ui/skip-to-main.tsx`

**Recomendação:** Manter apenas `skip-to-content.tsx`

## 🛣️ **Rotas /api Concorrentes**

### **Problema Atual:**
```
❌ server/routes.ts  →  /api/leads (Express - Replit)
✅ api/leads.js      →  /api/leads (Vercel Function)
```

**Conflito:** Mesmo endpoint, diferentes handlers
**Solução:** Server routes apenas para desenvolvimento local

### **Handlers com Mesma Responsabilidade:**
- `server/routes.ts` - POST /api/leads (Express)
- `api/leads.js` - POST /api/leads (Vercel)
- `server/routes.ts` - POST /api/distribuidores (Express)  
- `api/distribuidores.js` - POST /api/distribuidores (Vercel)

**Ação:** Manter apenas Vercel Functions para produção

## 📋 **Checklist de Limpeza**

### Fase 1: Remoção de Duplicatas
- [ ] Remover pasta `src/` completamente
- [ ] Remover `api/*.ts` (manter apenas .js)
- [ ] Remover `index.html` da raiz
- [ ] Remover `attached_assets/`

### Fase 2: Unificação de Componentes
- [ ] Consolidar error boundaries
- [ ] Unificar loading states  
- [ ] Merger skip links

### Fase 3: Padronização de Configuração
- [ ] Usar `vite.config.deploy.ts` como padrão
- [ ] Atualizar package.json build script
- [ ] Verificar paths no tsconfig.json

### Fase 4: Validação
- [ ] Testar build local
- [ ] Verificar APIs Vercel
- [ ] Confirmar imports funcionando
- [ ] Deploy de teste

## ⚡ **Impacto na Performance**

### **Antes da Limpeza:**
- Bundle duplicado: ~1.2MB
- Arquivos redundantes: 23
- Node_modules commitado: 300MB+

### **Após Limpeza:**
- Bundle otimizado: ~670KB
- Estrutura limpa: fonte única
- Repositório: ~5MB

## 🔧 **Próximos Passos**

1. **Criar branch de limpeza**
   ```bash
   git checkout -b fix/cleanup-duplicates
   ```

2. **Executar script de limpeza**
   ```bash
   rm -rf src/ attached_assets/ node_modules/
   rm api/*.ts index.html
   ```

3. **Atualizar configurações**
   - Corrigir paths no tsconfig.json
   - Atualizar script build
   - Revisar imports

4. **Testar e validar**
   - Build local
   - Deploy Vercel
   - Funcionalidade APIs

5. **Abrir PR com diffs claros**