# SUPABASE_INTEGRATION.md - Auditoria da Integração Supabase

## 🗃️ **Cliente Supabase Utilizado**

### **Frontend (Client-side)**
```typescript
// ❌ NÃO UTILIZADO NO FRONTEND
// Frontend faz calls diretas para /api routes
```

**✅ Abordagem Correta:** Frontend → Vercel Functions → Supabase

### **APIs Vercel (Server-side)**
```javascript
// api/leads.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 
                   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                   process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
```

**⚠️ PROBLEMA:** Configuração confusa com múltiplos fallbacks

## 🔑 **Estratégia de Chaves**

### **Environment Variables Detectadas:**

| Variável | Onde Usar | Tipo | Status |
|----------|-----------|------|---------|
| `VITE_SUPABASE_URL` | Frontend/API | Public URL | ✅ Configurado |
| `VITE_SUPABASE_ANON_KEY` | Frontend/API | Public Key | ✅ Configurado |
| `NEXT_PUBLIC_SUPABASE_URL` | Next.js projects | Public URL | ⚠️ Fallback desnecessário |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Next.js projects | Public Key | ⚠️ Fallback desnecessário |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Service Role | ❓ Não confirmado |

### **❌ Problemas de Configuração:**

1. **Múltiplos Fallbacks Confusos**
   - Mistura nomenclatura Vite (`VITE_`) com Next.js (`NEXT_PUBLIC_`)
   - Pode usar chave errada em produção

2. **Service Role em Último Fallback**
   - Service role tem permissões completas
   - Não deveria ser fallback de anon key

3. **Prefixos Inconsistentes**
   - `VITE_` para variáveis de build
   - Mas está sendo usado em server-side

## 🛡️ **RLS (Row Level Security) Analysis**

### **Tabela: `leads_nivela`**

**Schema Esperado:**
```sql
CREATE TABLE leads_nivela (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT NOT NULL,
  tipo_estabelecimento TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT, 
  utm_campaign TEXT,
  user_agent TEXT,
  ip_address INET,
  status TEXT NOT NULL DEFAULT 'pendente',
  origem TEXT DEFAULT 'landing_page',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**RLS Necessário para INSERT com Anon Key:**
```sql
-- Permitir INSERT para usuários anônimos
CREATE POLICY "Allow anonymous inserts" ON leads_nivela
  FOR INSERT 
  TO anon
  WITH CHECK (true);
```

**❓ Status:** Não confirmado se existe

### **Tabela: `distribuidores`**

**Schema Esperado:**
```sql
CREATE TABLE distribuidores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  empresa TEXT,
  cargo TEXT,
  mensagem TEXT,
  cidade TEXT,
  estado TEXT,
  experiencia_distribuicao TEXT,
  volume_vendas_mensal TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**RLS Necessário:**
```sql
-- Permitir INSERT para usuários anônimos
CREATE POLICY "Allow anonymous inserts" ON distribuidores
  FOR INSERT 
  TO anon
  WITH CHECK (true);
```

**❓ Status:** Não confirmado se existe

### **Tabelas Auxiliares**

**performance_metrics** e **analytics_events** definidas no schema mas:
- ❓ Não confirmado se existem no Supabase
- ❓ Não há RLS configurado
- ❓ Não são utilizadas no código atual

## 🌐 **Diferenças entre Ambientes**

### **Development (Replit)**
```bash
VITE_SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Vercel Preview**
**❓ Status:** Environment variables não confirmadas

### **Vercel Production**
**❓ Status:** Environment variables não confirmadas

**⚠️ RISCO:** Se as chaves forem diferentes entre ambientes:
- Preview pode usar database dev
- Production pode falhar por chaves incorretas
- Dados podem ir para ambiente errado

## 🔍 **Validação de Conexão**

### **Teste de Conectividade**
```javascript
// Em api/leads.js
console.log('Supabase URL:', supabaseUrl ? 'CONFIGURED' : 'MISSING');
console.log('Supabase Key:', supabaseKey ? 'CONFIGURED' : 'MISSING');
```

**✅ Logs de Debug Implementados**

### **Teste de Insert**
```javascript
const { data, error } = await supabase
  .from('leads_nivela')
  .insert([leadData])
  .select();

if (error) {
  console.error('Supabase error:', error);
  return res.status(500).json({ error: 'Erro ao salvar lead', details: error.message });
}
```

**✅ Error Handling Implementado**

## 📊 **Índices Recomendados**

### **leads_nivela**
```sql
-- Performance para consultas por email (unique já cria índice)
-- Performance para consultas por status
CREATE INDEX idx_leads_status ON leads_nivela(status);

-- Performance para consultas por data
CREATE INDEX idx_leads_created_at ON leads_nivela(created_at);

-- Performance para analytics por UTM
CREATE INDEX idx_leads_utm_source ON leads_nivela(utm_source);
```

### **distribuidores**
```sql
-- Performance para consultas por email
CREATE INDEX idx_distribuidores_email ON distribuidores(email);

-- Performance para consultas por localização
CREATE INDEX idx_distribuidores_cidade ON distribuidores(cidade);
CREATE INDEX idx_distribuidores_estado ON distribuidores(estado);

-- Performance para consultas por experiência
CREATE INDEX idx_distribuidores_experiencia ON distribuidores(experiencia_distribuicao);
```

## 🔧 **Configuração Recomendada**

### **Environment Variables Limpas**

```bash
# ✅ PRODUÇÃO - Apenas essenciais
SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ❌ REMOVER - Confusos
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY  
# NEXT_PUBLIC_SUPABASE_*
```

### **Cliente Unificado**

```javascript
// api/supabase.js - Configuração centralizada
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Para operações admin (se necessário)
export const supabaseAdmin = createClient(
  supabaseUrl, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
```

### **Uso nas APIs**

```javascript
// api/leads.js
import { supabase } from './supabase.js';

export default async function handler(req, res) {
  // ... resto da função
  const { data, error } = await supabase
    .from('leads_nivela')
    .insert([leadData])
    .select();
}
```

## 🚨 **Problemas Críticos para Deploy**

### **1. RLS Policies Faltando**
```sql
-- ❌ Se não existir, INSERT vai falhar com anon key
-- ✅ DEVE CRIAR antes do deploy:

ALTER TABLE leads_nivela ENABLE ROW LEVEL SECURITY;
ALTER TABLE distribuidores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON leads_nivela 
  FOR INSERT TO anon WITH CHECK (true);
  
CREATE POLICY "Allow public inserts" ON distribuidores 
  FOR INSERT TO anon WITH CHECK (true);
```

### **2. Tabelas Não Existem**
```bash
# ❌ Se tabelas não existirem no Supabase
# ✅ DEVE EXECUTAR: npm run db:push
# ✅ OU criar manualmente no Supabase Dashboard
```

### **3. Environment Variables Incorretas**
```bash
# ❌ Se chaves estiverem erradas na Vercel
# ✅ DEVE CONFIGURAR no Vercel Dashboard:
#     Settings → Environment Variables
```

## ✅ **Checklist de Validação**

### **Database:**
- [ ] Confirmar tabelas `leads_nivela` e `distribuidores` existem
- [ ] Verificar schema match com `shared/schema.ts`
- [ ] Criar RLS policies para INSERT anônimo
- [ ] Adicionar índices recomendados

### **Environment Variables:**
- [ ] Configurar `SUPABASE_URL` na Vercel
- [ ] Configurar `SUPABASE_ANON_KEY` na Vercel  
- [ ] Configurar `SUPABASE_SERVICE_ROLE_KEY` na Vercel
- [ ] Remover variables com prefixos confusos

### **APIs:**
- [ ] Unificar configuração Supabase
- [ ] Remover fallbacks desnecessários
- [ ] Testar conectividade em produção
- [ ] Validar INSERT funcionando

### **Security:**
- [ ] Confirmar anon key tem apenas INSERT
- [ ] Service role key protegido (server-only)
- [ ] RLS ativo em todas as tabelas
- [ ] Não vazar chaves no frontend

## 🎯 **Próximos Passos**

1. **Verificar se tabelas existem no Supabase**
2. **Criar RLS policies para INSERT anônimo**
3. **Configurar environment variables na Vercel**
4. **Unificar configuração de cliente Supabase**
5. **Testar INSERT em produção**
6. **Adicionar índices para performance**