# VERCEL_API_AUDIT.md - Auditoria Completa das APIs Vercel

## 🗺️ **Mapeamento de Rotas API**

### **Rotas Ativas na Pasta `/api`**

| Arquivo | Método | Endpoint | Status | Runtime | Problemas |
|---------|--------|----------|---------|---------|-----------|
| `leads.js` | POST | `/api/leads` | ✅ FUNCIONANDO | nodejs20.x | Nenhum |
| `distribuidores.js` | POST | `/api/distribuidores` | ⚠️ INCOMPLETO | nodejs20.x | Campos faltando |
| `ping.ts` | GET | `/api/ping` | ❌ NÃO FUNCIONA | - | TypeScript ignorado |

### **Rotas Duplicadas/Conflitantes**

| Local | Arquivo | Status | Uso |
|-------|---------|---------|-----|
| `/api/leads.js` | JavaScript | ✅ VERCEL FUNCTION | Produção |
| `/api/leads.ts` | TypeScript | ❌ IGNORADO | Não usado |
| `/api/distribuidores.js` | JavaScript | ✅ VERCEL FUNCTION | Produção |
| `/api/distribuidores.ts` | TypeScript | ❌ IGNORADO | Não usado |
| `/server/routes.ts` | Express Routes | ⚠️ DEV ONLY | Desenvolvimento |

## 📋 **Análise Detalhada por Rota**

### **1. `/api/leads` (POST) ✅**

**Handler:** `api/leads.js`
```javascript
export default async function handler(req, res)
```

**✅ Configurações Corretas:**
- Export default válido
- CORS headers configurados
- Método POST suportado
- OPTIONS para preflight
- Node.js runtime (necessário para Supabase)

**Métodos Aceitos:** `POST`, `OPTIONS`

**Schema do Body:**
```json
{
  "nome": "string (obrigatório)",
  "email": "string (obrigatório)", 
  "telefone": "string (obrigatório)",
  "tipoEstabelecimento": "string (opcional)"
}
```

**Validação:** ✅ Campos obrigatórios verificados

**Respostas:**
- `200` - Options preflight
- `201` - Lead criado com sucesso
- `400` - Campos obrigatórios faltando
- `405` - Método não permitido
- `500` - Erro servidor/Supabase

**Dependências:**
- `@supabase/supabase-js` ✅
- Environment vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` ✅

**Tabela Supabase:** `leads_nivela` ✅

**❌ Problemas Identificados:**
- Fallback para `SUPABASE_SERVICE_ROLE_KEY` pode causar confusion
- Logs de produção ainda ativos (console.log)

### **2. `/api/distribuidores` (POST) ⚠️**

**Handler:** `api/distribuidores.js`
```javascript
export default async function handler(req, res)
```

**❌ Configurações Problemáticas:**
- Sem CORS headers
- Sem tratamento OPTIONS
- Validação básica insuficiente
- Campos do payload não batem com schema

**Métodos Aceitos:** `POST` apenas

**Schema Esperado (atual):**
```json
{
  "nome": "string",
  "email": "string", 
  "telefone": "string",
  "cidade": "string",
  "estado": "string",
  "empresa": "string"
}
```

**❌ PROBLEMA CRÍTICO:** 
Frontend envia campos diferentes:
```json
{
  "nome": "string",
  "email": "string",
  "telefone": "string", 
  "empresa": "string",
  "cidade": "string",
  "estado": "string",
  "experiencia_distribuicao": "string",  // ❌ FALTANDO NA API
  "mensagem": "string"                   // ❌ FALTANDO NA API
}
```

**Tabela Supabase:** `distribuidores` ✅

**Campos Faltando na API:**
- `experiencia_distribuicao`
- `mensagem` 
- `cargo`
- `volume_vendas_mensal`

### **3. `/api/ping` (GET) ❌**

**Handler:** `api/ping.ts`

**❌ PROBLEMA:** Arquivo TypeScript não é executado pela Vercel
- Vercel Functions requerem `.js` ou `.mjs`
- `.ts` é compilado no build, mas não executado diretamente
- **Solução:** Converter para `.js` ou remover

## 🔍 **Problemas Típicos Identificados**

### **1. Case Sensitivity**
- ✅ Arquivos em lowercase
- ✅ Rotas consistentes
- ✅ Headers corretos

### **2. Import Paths**
- ✅ ES modules imports funcionando
- ✅ `@supabase/supabase-js` importado corretamente
- ❌ Possível problema com paths relativos em builds

### **3. CORS**
- ✅ `leads.js` - Headers CORS completos
- ❌ `distribuidores.js` - CORS faltando
- ❌ Pode causar erros de preflight em browsers

### **4. JSON Parsing**
- ✅ `leads.js` - Body parsing automático
- ✅ `distribuidores.js` - Body parsing automático
- ⚠️ Sem validação de Content-Type

### **5. Error Handling**
- ✅ `leads.js` - Try/catch implementado
- ❌ `distribuidores.js` - Sem try/catch
- ⚠️ Possível crash em erros inesperados

## 🔗 **Mapeamento Frontend → API**

### **AccessForm/AccessFormModal → `/api/leads`**

**Frontend envia:**
```typescript
const leadData = {
  nome: formData.nome,
  email: formData.email,
  telefone: formData.telefone,
  tipoEstabelecimento: formData.tipo_estabelecimento  // ❌ MISMATCH
}
```

**API espera:**
```javascript
const { nome, email, telefone, tipoEstabelecimento } = req.body;  // ✅ MATCH
```

**✅ COMPATÍVEL** - Campos coincidem

### **DistributorSection → `/api/distribuidores`**

**Frontend envia:**
```typescript
const dadosEnvio = {
  nome: formData.nome,
  email: formData.email,
  telefone: formData.telefone,
  empresa: formData.empresa,
  cidade: formData.cidade,
  estado: formData.estado,
  experiencia_distribuicao: formData.ja_distribui,     // ❌ API NÃO PROCESSA
  mensagem: formData.apresentacao                      // ❌ API NÃO PROCESSA
};
```

**API processa:**
```javascript
const { nome, email, telefone, cidade, estado, empresa } = req.body;  // ❌ CAMPOS FALTANDO
```

**❌ INCOMPATÍVEL** - API não processa todos os campos

## 🛠️ **Correções Necessárias**

### **1. Corrigir `/api/distribuidores.js`**

```javascript
// ❌ ATUAL
const { nome, email, telefone, cidade, estado, empresa } = req.body;

// ✅ CORRIGIDO
const { 
  nome, 
  email, 
  telefone, 
  empresa, 
  cidade, 
  estado, 
  experiencia_distribuicao, 
  mensagem 
} = req.body;
```

### **2. Adicionar CORS em distribuidores**

```javascript
// Adicionar no início do handler
res.setHeader('Access-Control-Allow-Credentials', true);
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

if (req.method === 'OPTIONS') {
  res.status(200).end();
  return;
}
```

### **3. Adicionar Validação**

```javascript
// Validação básica
if (!nome || !email || !telefone || !cidade || !estado) {
  return res.status(400).json({ 
    error: 'Campos obrigatórios: nome, email, telefone, cidade, estado' 
  });
}
```

### **4. Adicionar Try/Catch**

```javascript
try {
  // ... lógica da API
} catch (error) {
  console.error('API Error:', error);
  return res.status(500).json({ 
    error: 'Erro interno do servidor',
    details: error.message 
  });
}
```

### **5. Remover APIs TypeScript**

```bash
rm api/leads.ts
rm api/distribuidores.ts  
rm api/ping.ts
```

## ✅ **Validação de Runtime**

### **Node.js vs Edge Runtime**

**✅ Uso Correto do Node.js Runtime:**
- Supabase client funcionando
- Environment variables acessíveis  
- File system disponível (se necessário)
- NPM packages completos

**❌ NÃO usar Edge Runtime porque:**
- `@supabase/supabase-js` requer Node.js APIs
- Service role operations precisam de runtime completo
- Environment variables podem ser limitadas

## 🎯 **Checklist de Correções**

### APIs:
- [ ] Corrigir payload de distribuidores
- [ ] Adicionar CORS em distribuidores  
- [ ] Adicionar try/catch em distribuidores
- [ ] Remover APIs TypeScript não utilizadas
- [ ] Converter ping.ts para ping.js (se necessário)

### Supabase Integration:
- [ ] Verificar environment variables na Vercel
- [ ] Confirmar tabelas existem no Supabase
- [ ] Testar service role permissions
- [ ] Validar schema compatibility

### Testing:
- [ ] Testar cada endpoint com curl
- [ ] Verificar CORS funcionando
- [ ] Confirmar dados salvando no Supabase
- [ ] Validar error handling

## 🚀 **Próximos Passos**

1. **Corrigir API de distribuidores imediatamente**
2. **Remover arquivos .ts não utilizados**
3. **Configurar environment variables na Vercel**
4. **Testar endpoints individualmente**
5. **Validar integração frontend → API → Supabase**