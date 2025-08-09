# FORMS_WIRING.md - Mapeamento Completo dos Formulários

## 📝 **Formulários Identificados no Frontend**

### **1. AccessForm** (`client/src/components/landing/AccessForm.tsx`)

**Campos:**
```typescript
{
  nome: string,           // Nome completo (obrigatório)
  email: string,          // Email válido (obrigatório)  
  telefone: string,       // WhatsApp 10-11 dígitos (obrigatório)
  tipo_estabelecimento: string  // Tipo negócio (obrigatório)
}
```

**Validações Cliente:**
- **Nome:** Mínimo 2 caracteres, apenas letras e espaços `/^[a-zA-ZÀ-ÿ\s]{2,}$/`
- **Email:** Formato válido `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **Telefone:** 10-11 dígitos, celular deve ter 9 após DDD
- **Estabelecimento:** Campo obrigatório preenchido

**Endpoint Chamado:** `POST /api/leads`

**Payload Enviado:**
```javascript
const leadData = {
  nome: formData.nome,
  email: formData.email,
  telefone: formData.telefone,
  tipoEstabelecimento: formData.tipo_estabelecimento,  // ❌ FIELD NAME MISMATCH
  // UTM tracking
  utm_source: utmParams.get('utm_source'),
  utm_medium: utmParams.get('utm_medium'), 
  utm_campaign: utmParams.get('utm_campaign'),
  // Analytics
  user_agent: navigator.userAgent,
  ip_address: '', // Backend will capture
  origem: 'landing_page'
}
```

**Headers:**
```javascript
{
  'Content-Type': 'application/json'
}
```

**✅ Status:** FUNCIONANDO
**❌ Problema:** Campo `tipo_estabelecimento` vs `tipoEstabelecimento`

### **2. AccessFormModal** (`client/src/components/landing/AccessFormModal.tsx`)

**Campos:** Idênticos ao AccessForm
**Validações:** Idênticas ao AccessForm
**Endpoint:** `POST /api/leads`
**Payload:** Idêntico ao AccessForm

**✅ Status:** FUNCIONANDO
**❌ Problema:** Mesmo mismatch de campo

### **3. DistributorSection** (`client/src/components/landing/DistributorSection.tsx`)

**Campos:**
```typescript
{
  nome: string,           // Nome completo (obrigatório)
  telefone: string,       // Telefone (obrigatório)
  email: string,          // Email (obrigatório)
  cidade: string,         // Cidade (obrigatório)
  estado: string,         // Estado (obrigatório)
  ja_distribui: string,   // Experiência distribuição (obrigatório)
  empresa: string,        // Nome empresa (opcional)
  apresentacao: string    // Mensagem apresentação (opcional)
}
```

**Validações Cliente:**
```typescript
if (!formData.nome?.trim() || 
    !formData.telefone?.trim() || 
    !formData.email?.trim() || 
    !formData.cidade?.trim() || 
    !formData.ja_distribui) {
  throw new Error('Preencha todos os campos obrigatórios');
}
```

**Endpoint Chamado:** `POST /api/distribuidores`

**Payload Enviado:**
```javascript
const dadosEnvio = {
  nome: formData.nome.trim(),
  email: formData.email.trim().toLowerCase(),
  telefone: formData.telefone.trim(),
  empresa: formData.empresa?.trim() || null,
  cidade: formData.cidade.trim(),
  estado: formData.estado.trim(),
  experiencia_distribuicao: formData.ja_distribui,    // ❌ API NÃO PROCESSA
  mensagem: formData.apresentacao?.trim() || null     // ❌ API NÃO PROCESSA
};
```

**❌ Status:** QUEBRADO - API não processa todos os campos

### **4. Newsletter Form** (`client/src/components/landing/Footer.tsx`)

**Campos:**
```typescript
{
  email: string  // Email newsletter
}
```

**Validações:** Básica (campo não vazio)

**Endpoint:** NENHUM (simula API call)
```javascript
// Simulate API call
await new Promise(resolve => setTimeout(resolve, 1000));
```

**⚠️ Status:** MOCK - Não implementado

## 🔄 **Fluxo Ponta-a-Ponta Detalhado**

### **AccessForm → API → Supabase**

```
1. User preenche form
   ↓
2. Validação client-side
   ↓  
3. POST /api/leads
   {
     nome: "João Silva",
     email: "joao@email.com", 
     telefone: "11999887766",
     tipoEstabelecimento: "salao-proprio"  // ❌ MISMATCH
   }
   ↓
4. API processa (api/leads.js)
   const { nome, email, telefone, tipoEstabelecimento } = req.body;  // ✅ RECEBE
   ↓
5. Insert Supabase
   INSERT INTO leads_nivela (
     nome, email, telefone, tipo_estabelecimento,  // ❌ COLUMN NAME DIFFERENT
     user_agent, ip_address, created_at
   )
   ↓  
6. Response 201 { success: true, lead: {...} }
```

**❌ PROBLEMA:** Campo `tipoEstabelecimento` (JS) vs `tipo_estabelecimento` (DB)

### **DistributorSection → API → Supabase**

```
1. User preenche form distribuidor
   ↓
2. Validação client-side básica
   ↓
3. POST /api/distribuidores  
   {
     nome: "Maria Santos",
     email: "maria@empresa.com",
     telefone: "11888776655", 
     empresa: "Salão Beleza",
     cidade: "São Paulo",
     estado: "SP",
     experiencia_distribuicao: "sim",  // ❌ API NÃO PROCESSA
     mensagem: "Tenho interesse"       // ❌ API NÃO PROCESSA
   }
   ↓
4. API processa (api/distribuidores.js)
   const { nome, email, telefone, cidade, estado, empresa } = req.body;  // ❌ CAMPOS FALTANDO
   ↓
5. Insert Supabase (INCOMPLETO)
   INSERT INTO distribuidores (nome, email, telefone, cidade, estado, empresa)  // ❌ CAMPOS FALTANDO
   ↓
6. Response 200 { success: true, data: {...} }
```

**❌ PROBLEMA CRÍTICO:** API não processa `experiencia_distribuicao` e `mensagem`

## 📊 **Compatibilidade Frontend ↔ API**

### **AccessForm/Modal ✅**
| Frontend | API | Database | Status |
|----------|-----|----------|--------|
| `nome` | `nome` | `nome` | ✅ Match |
| `email` | `email` | `email` | ✅ Match |  
| `telefone` | `telefone` | `telefone` | ✅ Match |
| `tipo_estabelecimento` | `tipoEstabelecimento` | `tipo_estabelecimento` | ⚠️ API field name |

### **DistributorSection ❌**
| Frontend | API | Database | Status |
|----------|-----|----------|--------|
| `nome` | `nome` | `nome` | ✅ Match |
| `email` | `email` | `email` | ✅ Match |
| `telefone` | `telefone` | `telefone` | ✅ Match |
| `empresa` | `empresa` | `empresa` | ✅ Match |
| `cidade` | `cidade` | `cidade` | ✅ Match |
| `estado` | `estado` | `estado` | ✅ Match |
| `experiencia_distribuicao` | ❌ Ignorado | `experiencia_distribuicao` | ❌ Não processado |
| `mensagem` | ❌ Ignorado | `mensagem` | ❌ Não processado |

## 🚨 **Problemas de Tratamento de Sucesso/Erro**

### **AccessForm/Modal**

**Sucesso:**
```javascript
if (response.ok) {
  setIsSubmitted(true);
  // Reset form
  setFormData({ nome: "", email: "", telefone: "", tipo_estabelecimento: "" });
  
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'lead_conversion', {
      event_category: 'form',
      event_label: 'access_form_modal'
    });
  }
}
```

**Erro:**
```javascript
} catch (error) {
  console.error('Erro ao enviar lead:', error);
  // ❌ SEM FEEDBACK VISUAL PARA O USUÁRIO
  // ❌ SEM TOAST DE ERRO
}
```

**❌ PROBLEMA:** Usuário não vê feedback de erro

### **DistributorSection**

**Sucesso:**
```javascript
if (response.ok) {
  setIsSubmitted(true);
  // ✅ Reset form completo
  setFormData({
    nome: "", telefone: "", email: "", cidade: "", 
    estado: "", ja_distribui: "", empresa: "", apresentacao: ""
  });
}
```

**Erro:**
```javascript
} catch (error) {
  console.error('Erro detalhado:', error);
  alert(error.message || 'Erro ao enviar formulário. Tente novamente.');  // ❌ ALERT BÁSICO
}
```

**❌ PROBLEMA:** Alert básico não é UX adequada

## 🔧 **Correções Necessárias**

### **1. Corrigir API Distribuidores**

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

// Insert completo
const { data, error } = await supabase
  .from('distribuidores')
  .insert([{ 
    nome, 
    email, 
    telefone, 
    empresa, 
    cidade, 
    estado, 
    experiencia_distribuicao, 
    mensagem 
  }]);
```

### **2. Padronizar Nomes de Campos**

**Opção A:** Corrigir Frontend
```javascript
// Em AccessForm/Modal
tipoEstabelecimento: formData.tipo_estabelecimento  // Manter consistência
```

**Opção B:** Corrigir API (Recomendado)
```javascript
// Em api/leads.js
const { nome, email, telefone, tipo_estabelecimento } = req.body;
// E mapear: tipo_estabelecimento: tipoEstabelecimento || tipo_estabelecimento
```

### **3. Melhorar Error Handling**

```javascript
// Substituir alerts por toast notifications
import { toast } from 'sonner';

// No catch
} catch (error) {
  toast.error(error.message || 'Erro ao enviar formulário. Tente novamente.');
}
```

### **4. Implementar Newsletter**

```javascript
// Criar api/newsletter.js para capturar emails
const handleNewsletterSubmit = async (e) => {
  // Implementar POST /api/newsletter
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
};
```

## ✅ **Checklist de Correções**

### APIs:
- [ ] Corrigir campos faltando em `/api/distribuidores`
- [ ] Padronizar nomes de campos entre frontend/API
- [ ] Implementar `/api/newsletter`
- [ ] Adicionar validação server-side

### Frontend:
- [ ] Substituir alerts por toast notifications
- [ ] Adicionar loading states consistentes
- [ ] Implementar retry em caso de erro
- [ ] Melhorar feedback visual

### Database:
- [ ] Confirmar schema Supabase alinhado
- [ ] Verificar constraints e validações
- [ ] Adicionar índices se necessário

## 🎯 **Próximos Passos**

1. **Corrigir API distribuidores IMEDIATAMENTE**
2. **Testar fluxo completo form → API → database**
3. **Implementar melhor error handling**
4. **Adicionar toast notifications**
5. **Criar API newsletter se necessário**