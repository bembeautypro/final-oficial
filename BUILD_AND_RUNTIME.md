# BUILD_AND_RUNTIME.md - Análise de Build e Runtime

## 📦 **Scripts de Build (package.json)**

```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",      ✅ Desenvolvimento
    "build": "vite build --config vite.config.deploy.ts",  ✅ Produção
    "start": "NODE_ENV=production node dist/index.js",     ❌ INVÁLIDO
    "check": "tsc",                                         ✅ Validação TS
    "db:push": "drizzle-kit push"                          ✅ Database
  }
}
```

### **❌ Problemas Identificados:**

1. **Script "start" inválido**
   - Aponta para `dist/index.js` que não existe
   - Build produz arquivos estáticos, não server
   - **Correção:** Remover ou alterar para `serve dist`

2. **Build usa config correto**
   - ✅ Usa `vite.config.deploy.ts` 
   - ✅ Output para `dist/`
   - ✅ Configuração específica para Vercel

## ⚙️ **Configurações de Build**

### **vite.config.deploy.ts** (✅ PRODUÇÃO)
```typescript
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),              ❌ PATH INCORRETO
      "@shared": path.resolve(__dirname, "shared"),     ✅ Correto
      "@assets": path.resolve(__dirname, "attached_assets"), ⚠️ Assets temporários
    },
  },
  build: {
    outDir: "dist",                                     ✅ Correto para Vercel
    emptyOutDir: true,                                  ✅ Limpeza automática
    assetsDir: "assets",                               ✅ Assets organizados
    sourcemap: false,                                  ✅ Produção otimizada
    minify: true,                                      ✅ Minificação ativa
  }
});
```

**❌ PROBLEMA CRÍTICO:** 
- Alias `"@"` aponta para `src/` que deveria ser `client/src/`
- **QUEBRA O BUILD** quando `src/` for removida

### **vite.config.ts** (⚠️ DESENVOLVIMENTO)
```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"), ✅ Correto
      "@shared": path.resolve(import.meta.dirname, "shared"),   ✅ Correto
    },
  },
  root: path.resolve(import.meta.dirname, "client"),           ✅ Root correto
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),  ❌ Path diferente
    emptyOutDir: true,
  },
});
```

**Conflito:** Diferentes outputDir entre dev e prod

## 🏗️ **Pontos de Entrada**

### **Entry Points Identificados:**
1. `client/index.html` → `client/src/main.tsx` ✅ **CORRETO**
2. `index.html` → `src/main.tsx` ❌ **DUPLICADO/INVÁLIDO**

### **HTML Entry Analysis:**

**client/index.html** (✅ VÁLIDO):
```html
<script type="module" src="/src/main.tsx"></script>
```

**index.html** (❌ INVÁLIDO):
```html
<script type="module" src="/src/main.tsx"></script>
```
- Aponta para pasta `src/` que deve ser removida

## 🎯 **Vercel Configuration**

### **vercel.json** (✅ SIMPLIFICADO)
```json
{
  "buildCommand": "npm run build",        ✅ Usa script correto
  "outputDirectory": "dist",              ✅ Pasta correta
  "functions": {
    "api/**/*": {
      "runtime": "nodejs20.x"             ✅ Runtime moderno
    }
  }
}
```

**✅ Configuração correta:**
- Build command aponta para script certo
- Output directory alinha com vite config
- Functions runtime apropriado para Supabase

## 📝 **TypeScript Configuration**

### **tsconfig.json**
```json
{
  "include": ["src/**/*", "shared/**/*", "server/**/*"], ❌ Inclui src/ inválido
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],              ❌ Path incorreto
      "@shared/*": ["./shared/*"]      ✅ Correto
    }
  }
}
```

**❌ PROBLEMAS:**
- Include aponta para `src/` que será removida
- Paths inconsistentes com vite config
- **QUEBRA TypeScript** após limpeza

## 🔍 **Validação de Configs**

### **Conflitos Detectados:**

| Config | Dev Path | Prod Path | Status |
|--------|----------|-----------|---------|
| Vite Dev | `client/src` | - | ✅ Correto |
| Vite Prod | `src` | `dist` | ❌ Path inválido |
| TypeScript | `src` | - | ❌ Path inválido |
| HTML Entry | `client/` vs `root` | - | ⚠️ Duplicado |

### **Edge Runtime vs Node.js**

**APIs Vercel:**
- `api/leads.js` → Node.js Runtime ✅
- `api/distribuidores.js` → Node.js Runtime ✅
- Usa `@supabase/supabase-js` ✅ (Compatible com Node.js)

**❌ Não usar Edge Runtime porque:**
- Supabase client requer Node.js APIs
- Service role key precisa de environment completo
- Edge Runtime não suporta todas as features do Supabase

## 🚨 **Problemas de Build Identificados**

### 1. **Múltiplos Entry Points**
```
❌ Problema: Dois index.html apontando para pastas diferentes
🔧 Solução: Manter apenas client/index.html
```

### 2. **Paths Inconsistentes**
```
❌ Problema: vite.config.deploy.ts usa src/, dev usa client/src/
🔧 Solução: Padronizar todos para client/src/
```

### 3. **TypeScript Paths Inválidos**
```
❌ Problema: tsconfig.json aponta para pasta que será removida
🔧 Solução: Atualizar include e paths
```

### 4. **Script "start" Inválido**
```
❌ Problema: Tenta rodar server inexistente
🔧 Solução: Alterar para "serve dist" ou remover
```

## 🔧 **Correções Necessárias**

### **1. Corrigir vite.config.deploy.ts**
```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "client/src"),  // Corrigido
    "@shared": path.resolve(__dirname, "shared"),
    "@assets": path.resolve(__dirname, "attached_assets"),
  },
}
```

### **2. Corrigir tsconfig.json**
```json
{
  "include": ["client/src/**/*", "shared/**/*", "server/**/*"],
  "paths": {
    "@/*": ["./client/src/*"],
    "@shared/*": ["./shared/*"]
  }
}
```

### **3. Corrigir package.json**
```json
{
  "scripts": {
    "start": "serve dist",  // ou remover
    "build": "vite build --config vite.config.deploy.ts"
  }
}
```

### **4. Remover Entry Point Duplicado**
```bash
rm index.html  # Manter apenas client/index.html
```

## ✅ **Build Validation Checklist**

- [ ] Vite config paths corrigidos
- [ ] TypeScript config atualizado  
- [ ] Entry points unificados
- [ ] Script start corrigido
- [ ] Output directory consistente
- [ ] Build local funcionando
- [ ] Deploy Vercel funcionando

## 🎯 **Próximos Passos**

1. **Corrigir configurações antes da limpeza**
2. **Testar build local com configs corrigidos**
3. **Remover duplicatas após validação**
4. **Deploy de teste na Vercel**
5. **Confirmar APIs funcionando**