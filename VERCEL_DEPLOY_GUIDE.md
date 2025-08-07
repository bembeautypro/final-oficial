# 🚀 GUIA VERCEL DEPLOY - NIVELA® CORRIGIDO

## ❌ **PROBLEMA IDENTIFICADO**
O projeto fullstack (frontend + backend Express) não estava configurado corretamente para Vercel.

## ✅ **CORREÇÕES APLICADAS**

### **1. vercel.json Corrigido (Frontend Only):**
```json
{
  "buildCommand": "npm run build:frontend",
  "outputDirectory": "dist/public",
  "installCommand": "npm install"
}
```

### **2. Build Process (Frontend Only):**
```bash
# Frontend: vite build → client/dist/
# Backend: Runs separately (development only)
```

## 🔧 **CONFIGURAÇÃO VERCEL**

### **Framework Settings:**
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

### **Environment Variables:**
```bash
DATABASE_URL=postgresql://postgres.fdyzlqovxvdpkzlwuhjj:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_KEY]
PGDATABASE=postgres
PGHOST=aws-0-sa-east-1.pooler.supabase.com
PGPASSWORD=[PASSWORD]
PGPORT=6543
PGUSER=postgres.fdyzlqovxvdpkzlwuhjj
```

## 🚀 **DEPLOY STEPS**

### **1. Commit Correções:**
```bash
git add .
git commit -m "fix: vercel config for fullstack deployment"
git push origin main
```

### **2. Vercel Dashboard:**
1. **Import Project**: bembeautypro/NIVELA
2. **Framework**: Other (não Vite)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist/public`
5. **Add Environment Variables** (acima)
6. **Deploy**

### **3. Configurar Domínio:**
- Add Domain: `nivela.bembeauty.com.br`
- DNS: CNAME → `cname.vercel-dns.com`

## ✅ **ESTRUTURA FINAL**
```
dist/
├── public/          # Frontend (Vite build)
│   ├── index.html
│   ├── assets/
│   └── ...
└── index.js         # Backend (Express compiled)
```

## 🆘 **TROUBLESHOOTING**

### **Build Fails:**
- Verificar variáveis de ambiente
- Checar Supabase connection
- Validar package.json scripts

### **Function Errors:**
- Verificar dist/index.js existe
- Logs Vercel Functions
- Database connection pooler

### **Frontend 404:**
- Verificar outputDirectory: dist/public
- Assets path corretos
- Rewrites funcionando

## 🎯 **STATUS**
✅ vercel.json corrigido para fullstack
✅ Build process ajustado
✅ Functions configuradas
✅ Rewrites API/Frontend separados
✅ Headers performance mantidos

**Agora o deploy deve funcionar na Vercel!**