# ENV_VARS_MATRIX.md - Matriz de Variáveis de Ambiente

## 🌍 **Matriz por Ambiente**

| Variável | Replit Dev | Vercel Preview | Vercel Production | Necessário | Uso |
|----------|------------|----------------|-------------------|------------|-----|
| `SUPABASE_URL` | ❓ Não definido | ❓ Não confirmado | ❓ Não confirmado | ✅ CRÍTICO | Server API |
| `SUPABASE_ANON_KEY` | ❓ Não definido | ❓ Não confirmado | ❓ Não confirmado | ✅ CRÍTICO | Server API |
| `SUPABASE_SERVICE_ROLE_KEY` | ❓ Não definido | ❓ Não confirmado | ❓ Não confirmado | ⚠️ OPCIONAL | Admin ops |
| `VITE_SUPABASE_URL` | ✅ Configurado | ❓ Não confirmado | ❓ Não confirmado | ❌ CONFUSO | Legacy |
| `VITE_SUPABASE_ANON_KEY` | ✅ Configurado | ❓ Não confirmado | ❓ Não confirmado | ❌ CONFUSO | Legacy |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ Não usado | ❓ Não confirmado | ❓ Não confirmado | ❌ IRRELEVANTE | Next.js |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ Não usado | ❓ Não confirmado | ❓ Não confirmado | ❌ IRRELEVANTE | Next.js |
| `DATABASE_URL` | ✅ Configurado | ❓ Não confirmado | ❓ Não confirmado | ❌ NÃO USADO | Postgres direct |
| `NODE_ENV` | `development` | `preview` | `production` | ✅ ESSENCIAL | Runtime |
| `VITE_GTM_ID` | ✅ Configurado | ❓ Não confirmado | ❓ Não confirmado | ⚠️ ANALYTICS | Frontend |
| `VITE_GA_ID` | ✅ Configurado | ❓ Não confirmado | ❓ Não confirmado | ⚠️ ANALYTICS | Frontend |
| `VITE_SITE_URL` | ✅ Configurado | ❓ Não confirmado | ❓ Não confirmado | ⚠️ SEO | Frontend |

## 🚨 **Variáveis Faltando**

### **Vercel Preview/Production - CRÍTICAS:**
```bash
# ❌ AUSENTES - QUEBRAM AS APIs
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ✅ PRESENTE
NODE_ENV=production
```

### **Vercel Preview/Production - OPCIONAIS:**
```bash
# Para analytics (frontend)
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_ID=G-SC9C7W6Q4F
VITE_SITE_URL=https://nivela.bembeauty.com.br
```

## 🔧 **Configuração Atual vs Recomendada**

### **❌ ATUAL - Confuso:**
```javascript
// api/leads.js - Multiple confusing fallbacks
const supabaseUrl = process.env.VITE_SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_SUPABASE_URL;
                   
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 
                   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                   process.env.SUPABASE_SERVICE_ROLE_KEY;
```

**Problemas:**
- Mistura variáveis de diferentes frameworks
- Service role como fallback de anon key
- Prefixos inconsistentes

### **✅ RECOMENDADO - Limpo:**
```javascript
// api/leads.js - Clean configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required Supabase configuration');
}
```

## 🎯 **Variáveis por Finalidade**

### **🔑 Database/API (CRÍTICAS)**
```bash
# Para conexão com Supabase
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Para operações administrativas (opcional)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Runtime environment
NODE_ENV=production
```

### **📊 Analytics (OPCIONAIS)**
```bash
# Google Analytics/Tag Manager
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_ID=G-SC9C7W6Q4F

# Site metadata
VITE_SITE_URL=https://nivela.bembeauty.com.br
```

### **🗑️ Para Remover (LEGACY)**
```bash
# ❌ Prefixos incorretos para server-side
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

# ❌ Framework incorreto (Next.js)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# ❌ Não utilizado
DATABASE_URL
```

## 🔒 **Segurança das Variáveis**

### **✅ PODEM ser públicas (Frontend):**
```bash
VITE_SUPABASE_URL          # URL pública do Supabase
VITE_GTM_ID               # Google Tag Manager ID
VITE_GA_ID                # Google Analytics ID  
VITE_SITE_URL             # URL do site
NODE_ENV                  # Ambiente (dev/prod)
```

### **🔒 DEVEM ser privadas (Server-only):**
```bash
SUPABASE_ANON_KEY              # Chave anônima (limitada)
SUPABASE_SERVICE_ROLE_KEY      # Chave administrativa (completa)
```

### **⚠️ Configurações Perigosas:**

1. **Service Role no Frontend**
   ```javascript
   // ❌ NUNCA FAZER - Expõe chave administrativa
   const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY);
   ```

2. **Fallback Perigoso**
   ```javascript
   // ❌ ATUAL - Service role como fallback
   const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
   ```

3. **Variáveis Expostas**
   ```bash
   # ❌ NÃO usar VITE_ para server-side
   VITE_SUPABASE_ANON_KEY  # Será exposta no bundle frontend
   ```

## 🐛 **Leitura Incorreta de process.env**

### **❌ Problemas Identificados:**

1. **Prefixos Incorretos no Server**
   ```javascript
   // api/leads.js - Server-side mas usa VITE_
   process.env.VITE_SUPABASE_URL  // ❌ Errado para server
   ```

2. **Import.meta.env vs process.env**
   ```javascript
   // ❌ CONFUSO - Mixing different env access patterns
   process.env.VITE_SUPABASE_URL      // Server
   import.meta.env.VITE_SUPABASE_URL  // Frontend
   ```

3. **Fallbacks Complexos**
   ```javascript
   // ❌ CONFUSO - Too many fallbacks
   const key = process.env.VITE_SUPABASE_ANON_KEY || 
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
              process.env.SUPABASE_SERVICE_ROLE_KEY;
   ```

## 📋 **Plano de Configuração por Ambiente**

### **1. Replit (Development)**
```bash
# .env
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=development

# Frontend analytics (opcional)
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_ID=G-SC9C7W6Q4F
VITE_SITE_URL=http://localhost:5000
```

### **2. Vercel Preview**
```bash
# Vercel Dashboard → Settings → Environment Variables
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=preview

# Analytics com URL de preview
VITE_SITE_URL=https://nivela-xxx.vercel.app
```

### **3. Vercel Production**
```bash
# Vercel Dashboard → Settings → Environment Variables
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=production

# Analytics com domínio final
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_ID=G-SC9C7W6Q4F
VITE_SITE_URL=https://nivela.bembeauty.com.br
```

## ✅ **Checklist de Configuração**

### **Replit:**
- [x] Variáveis básicas configuradas (.env.example)
- [ ] Usar nomes padrão (sem VITE_ no server)
- [ ] Confirmar service role key

### **Vercel Preview:**
- [ ] Adicionar SUPABASE_URL
- [ ] Adicionar SUPABASE_ANON_KEY  
- [ ] Adicionar SUPABASE_SERVICE_ROLE_KEY
- [ ] Configurar NODE_ENV=preview
- [ ] Adicionar analytics vars (opcional)

### **Vercel Production:**
- [ ] Adicionar SUPABASE_URL
- [ ] Adicionar SUPABASE_ANON_KEY
- [ ] Adicionar SUPABASE_SERVICE_ROLE_KEY  
- [ ] Configurar NODE_ENV=production
- [ ] Adicionar analytics vars
- [ ] URL final do domínio

### **Código:**
- [ ] Remover fallbacks confusos
- [ ] Padronizar nomes das variáveis
- [ ] Adicionar validação de vars obrigatórias
- [ ] Separar frontend vs server env access

## 🎯 **Próximos Passos**

1. **Configurar variáveis na Vercel IMEDIATAMENTE**
2. **Simplificar leitura de environment no código**
3. **Remover variáveis legacy/confusas**
4. **Testar APIs com novas configurações**
5. **Documentar processo para deploy futuro**