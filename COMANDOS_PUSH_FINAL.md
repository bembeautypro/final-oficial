# 🚀 COMANDOS PARA PUSH - CORREÇÃO DOS FORMULÁRIOS

Execute os seguintes comandos no terminal:

## 1. ADICIONAR ARQUIVOS NOVOS
```bash
git add api/leads.ts
git add api/distribuidores.ts
git add client/src/lib/api.ts
git add VERCEL_FUNCTIONS_FIX.md
git add COMANDOS_PUSH_FINAL.md
```

## 2. COMMIT DAS CORREÇÕES
```bash
git commit -m "fix: Add Vercel serverless functions for form submissions

- Created /api/leads.ts for lead form processing
- Created /api/distribuidores.ts for distributor form processing  
- Enhanced error handling in api.ts to prevent JSON parse errors
- Fixed 405 Method Not Allowed errors on production
- Added CORS support for production deployment
- Requires SUPABASE_SERVICE_ROLE_KEY environment variable"
```

## 3. PUSH PARA GITHUB
```bash
git push origin main
```

---

## ⚠️ APÓS O PUSH - CONFIGURAR VERCEL

### 1. Obter Service Role Key do Supabase:
1. Ir para: https://supabase.com/dashboard/project/fdyzlqovxvdpkzlw
2. Settings → API
3. Copiar **service_role** key

### 2. Adicionar na Vercel:
1. Ir para vercel.com → seu projeto
2. Settings → Environment Variables
3. Adicionar:
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: [cola a chave service role]
   - Environment: Production

### 3. Redeploy (automático após push)

---

## ✅ RESULTADO ESPERADO

Após push + configuração da chave:
- Deploy automático na Vercel
- Formulários funcionando 100%
- APIs /api/leads e /api/distribuidores operacionais
- Error handling robusto implementado

---

**Execute os comandos git acima e me confirme quando concluído!**