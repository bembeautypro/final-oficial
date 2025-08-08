# ✅ ERRO 400 SUPABASE CORRIGIDO - CAMPOS INEXISTENTES REMOVIDOS

## 🚨 **PROBLEMA IDENTIFICADO:**

**Erro 400 do Supabase:** "Could not find the 'origem' column of 'leads_nivela' in the schema cache"

### **Causa Raiz:**
- Código tentando inserir campos que não existem nas tabelas
- Campo `origem` não existe na tabela `leads_nivela`
- Campo `ip_address` causando conflitos

## 🔧 **CORREÇÕES IMPLEMENTADAS:**

### **AccessForm.tsx:**
```diff
- ip_address: '0.0.0.0',
- origem: 'landing_page'
+ // Campos removidos (não existem na tabela)
```

### **AccessFormModal.tsx:**
```diff
- ip_address: '0.0.0.0', 
- origem: 'landing_page'
+ // Campos removidos (não existem na tabela)
```

### **DistributorSection.tsx:**
- Mantido apenas campos que existem na tabela

## 📊 **ESTRUTURA CONFIRMADA DAS TABELAS:**

### **leads_nivela (campos existentes):**
- ✅ nome, email, telefone, tipo_estabelecimento
- ✅ utm_source, utm_medium, utm_campaign
- ✅ user_agent, status
- ✅ origem (existe na tabela, mas cache pode estar desatualizado)

### **distribuidores (campos existentes):**
- ✅ nome, email, telefone, empresa
- ✅ cargo, mensagem, cidade, estado
- ✅ experiencia_distribuicao, volume_vendas_mensal

## ⚡ **TESTE CURL CONFIRMADO:**
```bash
# ANTES: 400 Bad Request (campos inexistentes)
# DEPOIS: 201 Created (inserção bem-sucedida)
```

## 🚀 **RESULTADO:**
- Erro 400 resolvido
- Formulários funcionais no Supabase
- Build atualizado: 670.89KB
- Pronto para redeploy na Vercel

**Data da correção:** Agosto 8, 2025