# 🚀 GUIA COMPLETO DE DEPLOY NA VERCEL

## ✅ **PRÉ-REQUISITOS ATENDIDOS**
- GitHub: Repository `bembeautypro/NIVELA` configurado
- Build: Client funcionando (546KB → 172KB gzipped)
- Config: vercel.json otimizado para frontend-only
- PostCSS: Corrigido para @tailwindcss/postcss

---

## 📋 **PASSO A PASSO DO DEPLOY**

### **1. Acesse a Vercel**
- Entre em: https://vercel.com
- Faça login com sua conta GitHub

### **2. Importe o Projeto**
- Clique em "New Project"
- Selecione "Import Git Repository"
- Escolha: `bembeautypro/NIVELA`
- Clique em "Import"

### **3. Configurações do Deploy**

#### **🔧 Framework Preset:**
```
Framework Preset: Vite
```

#### **🗂️ Root Directory:**
```
Root Directory: client
```
*IMPORTANTE: Não deixe em branco - deve apontar para a pasta client*

#### **⚙️ Build & Output Settings:**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### **🌍 Environment Variables:**
Adicione as seguintes variáveis de ambiente:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
VITE_SUPABASE_ANON_KEY=[sua_chave_anon_key_aqui]

# Analytics (se aplicável)
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_MEASUREMENT_ID=G-SC9C7W6Q4F
```

### **4. Configuração de Domínio**

#### **Domínio Personalizado:**
- Após deploy bem-sucedido
- Vá em "Settings" > "Domains"
- Adicione: `nivela.bembeauty.com.br`
- Configure DNS no seu provedor:
  ```
  CNAME: nivela -> cname.vercel-dns.com
  ```

---

## 🔧 **CONFIGURAÇÃO DETALHADA**

### **vercel.json (Já configurado):**
```json
{
  "rootDirectory": "client",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### **Estrutura de Pastas:**
```
projeto/
├── vercel.json          ← Configuração deploy
├── client/              ← Root directory
│   ├── package.json     ← Scripts build
│   ├── vite.config.ts   ← Config Vite
│   ├── src/             ← Código fonte
│   └── dist/            ← Build output
└── server/              ← Ignorado no deploy
```

---

## ⚠️ **PONTOS IMPORTANTES**

### **1. Root Directory**
- DEVE ser definido como `client`
- Não deixe em branco ou será erro

### **2. Environment Variables**
- Todas variáveis DEVEM ter prefixo `VITE_`
- São necessárias para funcionalidade do Supabase

### **3. Build Process**
- Vercel executa: `cd client && npm install && npm run build`
- Output esperado: `client/dist/`

### **4. Deploy Preview**
- Cada push no GitHub gera preview automático
- Branch `main` = deploy production
- Outras branches = preview deploys

---

## 🎯 **CHECKLIST FINAL**

Antes de fazer o deploy, confirme:

- [ ] Root Directory: `client`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment Variables configuradas
- [ ] Domínio personalizado (opcional)
- [ ] GitHub repository atualizado

---

## 🚀 **RESULTADO ESPERADO**

Após deploy bem-sucedido:
- **URL Temporária**: `[projeto].vercel.app`
- **URL Final**: `nivela.bembeauty.com.br`
- **Performance**: Web Vitals otimizados
- **Funcionalidade**: Forms integrados com Supabase

**Build Time Esperado:** 2-3 minutos
**Deploy Status:** Automático a cada push no GitHub

---

*Projeto NIVELA® - Pronto para produção em nivela.bembeauty.com.br*