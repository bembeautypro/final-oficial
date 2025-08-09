# DIAGNÓSTICO DO PROBLEMA VERCEL API

## 🚨 PROBLEMA IDENTIFICADO
O teste curl para `https://nivela-2322.vercel.app/api/leads` retorna:
- **Status:** 405 Method Not Allowed
- **Response:** Página HTML (index.html) ao invés da API

## 🔍 CAUSA RAIZ
As Vercel Functions não estão sendo detectadas/deployadas corretamente.

## ✅ SOLUÇÕES APLICADAS

### 1. API Corrigida
- `api/leads.js` - Função completa com CORS e logging
- `api/distribuidores.js` - Função para distribuidor  
- Conexão Supabase com fallbacks para diferentes env vars

### 2. Vercel.json Simplificado
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist", 
  "functions": {
    "api/**/*": {
      "runtime": "nodejs20.x"
    }
  }
}
```

### 3. Package.json Dependencies
- @supabase/supabase-js adicionado

## 🎯 PRÓXIMOS PASSOS

### Na Vercel - Environment Variables:
```
VITE_SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
VITE_SUPABASE_ANON_KEY=[sua_chave_anon]
SUPABASE_SERVICE_ROLE_KEY=[chave_service_role]
DATABASE_URL=[url_completa]
NODE_ENV=production
```

### Teste Manual:
```bash
curl -X POST https://[seu-deploy].vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{"nome":"Test","email":"test@test.com","telefone":"123456789","tipoEstabelecimento":"salao-proprio"}'
```

## 🔧 SE AINDA NÃO FUNCIONAR:
1. Verificar se pasta `/api` está no repositório
2. Confirmar environment variables na Vercel
3. Verificar logs da Function na Vercel Dashboard
4. Testar API localmente primeiro