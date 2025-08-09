# CLEAN_GIT_HISTORY.md - Plano de Limpeza do Repositório

## 🎯 **Objetivo**
Limpar repositório GitHub sem perder funcionalidades do Replit, organizando estrutura para deploy estável na Vercel.

## 📋 **Estratégia de Limpeza**

### **Fase 1: Preparação**
1. Backup local completo
2. Criar branch de limpeza
3. Documentar estado atual
4. Testar build antes das mudanças

### **Fase 2: Limpeza Estrutural**
1. Remover duplicatas críticas
2. Padronizar estrutura de diretórios  
3. Atualizar configurações
4. Limpar arquivos desnecessários

### **Fase 3: Validação**
1. Testar build local
2. Confirmar funcionalidades
3. Deploy de teste
4. Abrir PR com review

## 🗂️ **Estrutura Alvo (Após Limpeza)**

```
📦 nivela-landing/
├── 📁 api/                          # Vercel Functions (apenas .js)
│   ├── leads.js                     # ✅ Manter
│   └── distribuidores.js            # ✅ Manter (corrigir)
├── 📁 client/                       # Frontend principal
│   ├── index.html                   # ✅ Entry point único
│   └── 📁 src/                      # ✅ Código fonte
│       ├── 📁 components/           # ✅ Componentes React
│       ├── 📁 pages/                # ✅ Páginas
│       ├── 📁 utils/                # ✅ Utilitários
│       ├── App.tsx                  # ✅ App principal
│       ├── index.css                # ✅ Estilos globais
│       └── main.tsx                 # ✅ Entry point
├── 📁 server/                       # Backend desenvolvimento (manter)
├── 📁 shared/                       # Schemas compartilhados
│   └── schema.ts                    # ✅ Drizzle schemas
├── .env.example                     # ✅ Template env vars
├── .gitignore                       # ✅ Atualizado
├── drizzle.config.ts                # ✅ Config database
├── package.json                     # ✅ Dependencies
├── tsconfig.json                    # ✅ TypeScript (corrigido)
├── vercel.json                      # ✅ Config deploy
└── vite.config.deploy.ts            # ✅ Config build produção
```

## 📝 **Comandos Git Passo-a-Passo**

### **1. Preparação e Backup**
```bash
# Backup local completo
git clone https://github.com/seu-usuario/nivela-landing.git nivela-backup
cd nivela-landing

# Verificar estado atual
git status
git log --oneline -10

# Criar branch de limpeza
git checkout -b fix/vercel-structure
```

### **2. Limpeza de Arquivos Grandes/Desnecessários**
```bash
# Remover node_modules do histórico (se commitado)
git filter-branch --tree-filter 'rm -rf node_modules' HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

# Remover attached_assets do histórico
git filter-branch --tree-filter 'rm -rf attached_assets' HEAD

# Limpar referências
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### **3. Remoção de Duplicatas**
```bash
# Remover pasta src/ duplicada
git rm -rf src/

# Remover index.html duplicado na raiz
git rm index.html

# Remover APIs TypeScript não utilizadas
git rm api/leads.ts
git rm api/distribuidores.ts
git rm api/ping.ts

# Remover configurações legado
git rm client/src/App.css  # Desnecessário com Tailwind

# Commit das remoções
git add .
git commit -m "Remove duplicated files and legacy configs

- Remove src/ folder (duplicate of client/src/)
- Remove root index.html (use client/index.html)
- Remove unused TypeScript APIs
- Remove legacy CSS files
- Clean up project structure"
```

### **4. Mover/Renomear Arquivos**
```bash
# Mover configuração principal para nome padrão
git mv vite.config.deploy.ts vite.config.ts

# Backup da configuração dev (se necessário)
git mv vite.config.ts vite.config.dev.ts

# Commit das mudanças
git add .
git commit -m "Standardize build configuration

- Use vite.config.ts as main production config
- Backup dev config as vite.config.dev.ts"
```

### **5. Atualizar .gitignore**
```bash
# Criar/atualizar .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
dist/
.replit-build/
.vercel/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/
*.lcov

# TypeScript cache
*.tsbuildinfo

# Optional caches
.npm
.eslintcache
.parcel-cache

# dotenv environment variables file
.env.test

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# VS Code
.vscode-test

# Temporary folders
tmp/
temp/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Project specific
attached_assets/
*.backup
.replit-backup/
EOF

git add .gitignore
git commit -m "Update .gitignore with comprehensive rules

- Add dist/, node_modules/, .vercel/ to ignore
- Include environment files and logs
- Add OS and editor specific files
- Include project-specific temp files"
```

### **6. Corrigir Configurações**
```bash
# Editar tsconfig.json para corrigir paths
cat > tsconfig.json << 'EOF'
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*", "api/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/typescript/tsbuildinfo",
    "noEmit": true,
    "module": "ESNext",
    "strict": true,
    "lib": ["esnext", "dom", "dom.iterable"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
EOF

# Corrigir vite.config.ts paths
cat > vite.config.ts << 'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client/index.html")
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['clsx', 'tailwind-merge']
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
EOF

git add .
git commit -m "Fix configuration files after cleanup

- Update tsconfig.json paths for new structure
- Fix vite.config.ts aliases and entry points
- Ensure build works with cleaned structure"
```

### **7. Testar Build Local**
```bash
# Instalar dependencies
npm install

# Testar build
npm run build

# Se build falhar, corrigir antes de continuar
# Verificar se dist/ foi criada corretamente
ls -la dist/

# Testar se arquivos estão corretos
npm run dev  # Testar desenvolvimento

git add .
git commit -m "Verify build works after cleanup"
```

### **8. Validar e Finalizar**
```bash
# Verificar status final
git status
git log --oneline -10

# Push da branch
git push origin fix/vercel-structure

# Verificar tamanho do repositório
du -sh .git/
```

## 📊 **Diff Esperado (Resumo)**

### **Arquivos Removidos:**
```diff
- src/                           # Pasta duplicada completa
- index.html                     # Entry point duplicado
- api/leads.ts                   # API TypeScript não usada
- api/distribuidores.ts          # API TypeScript não usada  
- api/ping.ts                    # API de teste não usada
- client/src/App.css             # CSS desnecessário
- attached_assets/               # Arquivos temporários
```

### **Arquivos Modificados:**
```diff
# .gitignore
+ node_modules/
+ dist/
+ .vercel/
+ attached_assets/

# tsconfig.json
- "src/**/*"
+ "client/src/**/*"

# vite.config.ts  
- "@": path.resolve(__dirname, "src")
+ "@": path.resolve(__dirname, "client/src")
```

### **Arquivos Renomeados:**
```diff
- vite.config.deploy.ts
+ vite.config.ts

- vite.config.ts (original)
+ vite.config.dev.ts
```

## 🎯 **Benefícios da Limpeza**

### **Antes:**
- **Tamanho:** ~350MB (com node_modules commitado)
- **Arquivos:** ~850 arquivos
- **Duplicatas:** 23 arquivos duplicados
- **Configurações:** Conflitantes e confusas

### **Depois:**
- **Tamanho:** ~8MB (limpo)
- **Arquivos:** ~650 arquivos (sem duplicatas)
- **Estrutura:** Única fonte da verdade
- **Build:** Consistente e previsível

## ✅ **Checklist de Validação**

### **Estrutura:**
- [ ] Pasta `src/` removida completamente
- [ ] Apenas `client/src/` existe
- [ ] APIs apenas `.js` (sem `.ts`)
- [ ] Configurações apontam para paths corretos

### **Build:**
- [ ] `npm run build` funciona
- [ ] `dist/` é criada corretamente
- [ ] Assets são copiados
- [ ] Bundle tem tamanho esperado (~670KB)

### **Development:**
- [ ] `npm run dev` funciona
- [ ] Hot reload funcionando
- [ ] Imports funcionando
- [ ] Não há erros TypeScript

### **Git:**
- [ ] Histórico limpo (sem arquivos grandes)
- [ ] .gitignore atualizado
- [ ] Commits bem documentados
- [ ] Branch pronta para PR

## 🚀 **Próximos Passos Após Limpeza**

1. **Abrir Pull Request**
   ```bash
   # Título: "Clean repository structure for Vercel deployment"
   # Descrição: Detailed list of changes and benefits
   ```

2. **Deploy de Teste**
   - Testar na Vercel Preview
   - Verificar APIs funcionando
   - Confirmar assets carregando

3. **Merge e Deploy**
   - Review do PR
   - Merge para main
   - Deploy produção final

4. **Configurar Domínio**
   - Configurar nivela.bembeauty.com.br
   - SSL/TLS
   - Redirects se necessário