# FIX_PR_PLAN.md - Plano de Correções para Deploy Estável

## 🎯 **Lista de Mudanças Mínimas (Ordem de Impacto)**

### **1. CRÍTICO - Corrigir API Distribuidores** 🔴
**Impacto:** QUEBRA total do form distribuidor
**Tempo:** 5 minutos

**Problema:** API não processa todos os campos enviados pelo frontend

**Patch Proposto:**
```diff
// api/distribuidores.js
export default async function handler(req, res) {
+  // CORS headers
+  res.setHeader('Access-Control-Allow-Credentials', true);
+  res.setHeader('Access-Control-Allow-Origin', '*');
+  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
+  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
+
+  if (req.method === 'OPTIONS') {
+    res.status(200).end();
+    return;
+  }

   if (req.method !== 'POST') {
     return res.status(405).json({ error: 'Method Not Allowed' })
   }

-  const { nome, email, telefone, cidade, estado, empresa } = req.body
+  const { 
+    nome, 
+    email, 
+    telefone, 
+    empresa, 
+    cidade, 
+    estado, 
+    experiencia_distribuicao, 
+    mensagem 
+  } = req.body;

+  // Validação básica
+  if (!nome || !email || !telefone || !cidade || !estado) {
+    return res.status(400).json({ 
+      error: 'Campos obrigatórios: nome, email, telefone, cidade, estado' 
+    });
+  }

+  try {
     const { data, error } = await supabase
       .from('distribuidores')
-      .insert([{ nome, email, telefone, cidade, estado, empresa }])
+      .insert([{ 
+        nome, 
+        email, 
+        telefone, 
+        empresa, 
+        cidade, 
+        estado, 
+        experiencia_distribuicao, 
+        mensagem 
+      }])
+      .select();

     if (error) {
+      console.error('Supabase error:', error);
       return res.status(500).json({ error: error.message })
     }

-    return res.status(200).json({ success: true, data })
+    return res.status(201).json({ success: true, data: data[0] })
+  } catch (error) {
+    console.error('API Error:', error);
+    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
+  }
}
```

### **2. CRÍTICO - Configurar Environment Variables Vercel** 🔴
**Impacto:** QUEBRA total das APIs
**Tempo:** 10 minutos

**Problema:** Variáveis não configuradas na Vercel

**Configuração Necessária na Vercel:**
```bash
# Vercel Dashboard → Settings → Environment Variables
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeXpscW92eHZkcGt6bHd1aGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MjQwNzIsImV4cCI6MjA3MDEwMDA3Mn0.0itJku2mVxd8MIvk7lo7Y8gamram_QYCluzHbNUT88Y
SUPABASE_SERVICE_ROLE_KEY=[chave_service_role]
NODE_ENV=production
```

### **3. ALTO - Simplificar Configuração Supabase** 🟡
**Impacto:** Evita confusão e bugs futuros
**Tempo:** 10 minutos

**Problema:** Múltiplos fallbacks confusos

**Patch Proposto:**
```diff
// api/leads.js
- const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
- const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
+ const supabaseUrl = process.env.SUPABASE_URL;
+ const supabaseKey = process.env.SUPABASE_ANON_KEY;

+ if (!supabaseUrl || !supabaseKey) {
+   throw new Error('Missing required Supabase configuration');
+ }

- console.log('Supabase URL:', supabaseUrl ? 'CONFIGURED' : 'MISSING');
- console.log('Supabase Key:', supabaseKey ? 'CONFIGURED' : 'MISSING');
```

### **4. ALTO - Corrigir Build Config Paths** 🟡
**Impacto:** Build pode quebrar após limpeza
**Tempo:** 5 minutos

**Problema:** vite.config.deploy.ts aponta para pasta `src/` que será removida

**Patch Proposto:**
```diff
// vite.config.deploy.ts (ou vite.config.ts após rename)
resolve: {
  alias: {
-   "@": path.resolve(__dirname, "src"),
+   "@": path.resolve(__dirname, "client/src"),
    "@shared": path.resolve(__dirname, "shared"),
    "@assets": path.resolve(__dirname, "attached_assets"),
  },
},
build: {
  rollupOptions: {
    input: {
-     main: path.resolve(__dirname, "index.html")
+     main: path.resolve(__dirname, "client/index.html")
    },
  },
},
```

### **5. MÉDIO - Corrigir TypeScript Config** 🟡
**Impacto:** TypeScript pode quebrar após limpeza
**Tempo:** 3 minutos

**Patch Proposto:**
```diff
// tsconfig.json
{
- "include": ["src/**/*", "shared/**/*", "server/**/*"],
+ "include": ["client/src/**/*", "shared/**/*", "server/**/*", "api/**/*"],
  "compilerOptions": {
    "paths": {
-     "@/*": ["./src/*"],
+     "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

### **6. MÉDIO - Criar Policies RLS Supabase** 🟡
**Impacto:** APIs podem falhar com 403 Forbidden
**Tempo:** 15 minutos

**SQL para executar no Supabase:**
```sql
-- Habilitar RLS
ALTER TABLE leads_nivela ENABLE ROW LEVEL SECURITY;
ALTER TABLE distribuidores ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT anônimo para leads
CREATE POLICY "Allow anonymous inserts on leads_nivela" 
ON leads_nivela 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Permitir INSERT anônimo para distribuidores
CREATE POLICY "Allow anonymous inserts on distribuidores" 
ON distribuidores 
FOR INSERT 
TO anon 
WITH CHECK (true);
```

### **7. BAIXO - Melhorar Error Handling Frontend** 🟢
**Impacto:** UX melhor em caso de erro
**Tempo:** 10 minutos

**Patch Proposto:**
```diff
// client/src/components/landing/AccessForm.tsx
+ import { toast } from 'sonner';

} catch (error) {
  console.error('Erro ao enviar lead:', error);
+ toast.error('Erro ao enviar formulário. Tente novamente.');
  setIsLoading(false);
}

// client/src/components/landing/DistributorSection.tsx
} catch (error) {
  console.error('Erro detalhado:', error);
- alert(error.message || 'Erro ao enviar formulário. Tente novamente.');
+ toast.error(error.message || 'Erro ao enviar formulário. Tente novamente.');
  setIsLoading(false);
}
```

### **8. BAIXO - Remover Arquivos Desnecessários** 🟢
**Impacto:** Repo mais limpo
**Tempo:** 5 minutos

**Comandos:**
```bash
rm -rf src/                    # Pasta duplicada
rm index.html                  # Entry point duplicado
rm api/leads.ts                # API TypeScript não usada
rm api/distribuidores.ts       # API TypeScript não usada
rm api/ping.ts                 # API de teste
rm -rf attached_assets/        # Assets temporários
```

## 📋 **Diffs Detalhados por Arquivo**

### **api/distribuidores.js** (CRÍTICO)
```diff
@@ -1,20 +1,71 @@
 import { createClient } from '@supabase/supabase-js'
 
+const supabaseUrl = process.env.SUPABASE_URL;
+const supabaseKey = process.env.SUPABASE_ANON_KEY;
+
+if (!supabaseUrl || !supabaseKey) {
+  throw new Error('Missing required Supabase configuration');
+}
+
+const supabase = createClient(supabaseUrl, supabaseKey);
+
 export default async function handler(req, res) {
+  // CORS headers
+  res.setHeader('Access-Control-Allow-Credentials', true);
+  res.setHeader('Access-Control-Allow-Origin', '*');
+  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
+  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
+
+  if (req.method === 'OPTIONS') {
+    res.status(200).end();
+    return;
+  }
+
   if (req.method !== 'POST') {
-    return res.status(405).json({ error: 'Method Not Allowed' })
+    return res.status(405).json({ error: 'Method not allowed' });
   }
 
-  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)
-  const { nome, email, telefone, cidade, estado, empresa } = req.body
+  try {
+    const { 
+      nome, 
+      email, 
+      telefone, 
+      empresa, 
+      cidade, 
+      estado, 
+      experiencia_distribuicao, 
+      mensagem 
+    } = req.body;
+
+    if (!nome || !email || !telefone || !cidade || !estado) {
+      return res.status(400).json({ 
+        error: 'Campos obrigatórios: nome, email, telefone, cidade, estado' 
+      });
+    }
 
-  const { data, error } = await supabase
-    .from('distribuidores')
-    .insert([{ nome, email, telefone, cidade, estado, empresa }])
+    const { data, error } = await supabase
+      .from('distribuidores')
+      .insert([{ 
+        nome, 
+        email, 
+        telefone, 
+        empresa, 
+        cidade, 
+        estado, 
+        experiencia_distribuicao, 
+        mensagem 
+      }])
+      .select();
 
-  if (error) {
-    return res.status(500).json({ error: error.message })
-  }
+    if (error) {
+      console.error('Supabase error:', error);
+      return res.status(500).json({ error: 'Erro ao salvar distribuidor', details: error.message });
+    }
 
-  return res.status(200).json({ success: true, data })
+    return res.status(201).json({ success: true, data: data[0] });
+  } catch (error) {
+    console.error('API Error:', error);
+    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
+  }
 }
```

### **api/leads.js** (ALTO)
```diff
@@ -1,10 +1,13 @@
 import { createClient } from '@supabase/supabase-js';
 
-const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
-const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
+const supabaseUrl = process.env.SUPABASE_URL;
+const supabaseKey = process.env.SUPABASE_ANON_KEY;
+
+if (!supabaseUrl || !supabaseKey) {
+  throw new Error('Missing required Supabase configuration');
+}
 
-console.log('Supabase URL:', supabaseUrl ? 'CONFIGURED' : 'MISSING');
-console.log('Supabase Key:', supabaseKey ? 'CONFIGURED' : 'MISSING');
+// Debug logs removed for production
 
 const supabase = createClient(supabaseUrl, supabaseKey);
```

### **vite.config.deploy.ts** (ALTO)
```diff
@@ -9,7 +9,7 @@ export default defineConfig({
   base: "/",
   resolve: {
     alias: {
-      "@": path.resolve(__dirname, "src"),
+      "@": path.resolve(__dirname, "client/src"),
       "@shared": path.resolve(__dirname, "shared"),
       "@assets": path.resolve(__dirname, "attached_assets"),
     },
@@ -21,7 +21,7 @@ export default defineConfig({
     minify: true,
     rollupOptions: {
       input: {
-        main: path.resolve(__dirname, "index.html")
+        main: path.resolve(__dirname, "client/index.html")
       },
       output: {
         manualChunks: {
```

## ⏱️ **Timeline de Implementação**

### **Sprint 1 (Imediato - 30 minutos):**
1. Corrigir API distribuidores (5 min)
2. Configurar env vars Vercel (10 min)
3. Simplificar config Supabase (10 min)
4. Corrigir paths build config (5 min)

### **Sprint 2 (1 hora):**
1. Criar RLS policies Supabase (15 min)
2. Corrigir TypeScript config (3 min)
3. Melhorar error handling (10 min)
4. Remover arquivos desnecessários (5 min)
5. Testar deploy completo (25 min)

## ✅ **Validação de Cada Correção**

### **1. API Distribuidores:**
```bash
curl -X POST https://[deploy].vercel.app/api/distribuidores \
  -H "Content-Type: application/json" \
  -d '{"nome":"Test","email":"test@test.com","telefone":"11999999999","cidade":"São Paulo","estado":"SP","experiencia_distribuicao":"sim","mensagem":"teste"}'

# Esperado: 201 Created com todos os campos salvos
```

### **2. Environment Variables:**
```bash
# No Vercel Dashboard, verificar se estão todas configuradas
# Logs da function devem mostrar "CONFIGURED" para URL e Key
```

### **3. Build Config:**
```bash
npm run build
# Deve gerar dist/ sem erros
# dist/index.html deve existir com paths corretos
```

### **4. RLS Policies:**
```sql
-- No Supabase → Authentication → Policies
-- Verificar se policies existem para ambas as tabelas
SELECT * FROM pg_policies WHERE tablename IN ('leads_nivela', 'distribuidores');
```

## 🎯 **Resultado Esperado Após Todas as Correções**

### **✅ Funcionando:**
- Form de acesso salvando leads
- Form distribuidor salvando com todos os campos
- Build produzindo arquivos corretos
- Deploy Vercel estável
- APIs respondendo sem CORS errors

### **📊 Métricas de Sucesso:**
- APIs respondem 201 Created
- Dados salvos corretamente no Supabase
- Build produz bundle ~670KB
- Site carrega em < 3s
- Forms funcionam sem erros JavaScript

## 🚀 **Próximos Passos Após PR**

1. **Deploy Preview** - Testar todas as funcionalidades
2. **Configurar Domínio** - nivela.bembeauty.com.br
3. **Monitoramento** - Configurar alertas de erro
4. **Analytics** - Verificar Google Analytics funcionando
5. **SEO** - Confirmar meta tags e sitemap