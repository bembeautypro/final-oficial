# 🛡️ ESTRATÉGIA SEGURA PARA DEPLOY - PROJETO NIVELA®

**Situação:** Página em produção funcionando (versão de 8h atrás) + melhorias locais não aplicadas  
**Objetivo:** Atualizar GitHub e Vercel sem quebrar produção  
**Estratégia:** Deploy incremental com fallback garantido  

---

## 🎯 ESTRATÉGIA RECOMENDADA: BRANCH STAGING

### Opção 1: MAIS SEGURA (Deploy via Branch Staging)

```bash
# 1. Inicializar git local (se não estiver)
git init
git remote add origin [seu-repositorio-github]

# 2. Criar branch de staging
git checkout -b staging-improvements
git add .
git commit -m "feat: Performance optimizations, security fixes, and UX improvements

- Fixed critical form validation bug
- Optimized bundle size: 323KB → 318KB (-1.6%)
- Removed production console.logs
- Updated dependencies for security
- Enhanced error handling
- Reorganized project structure"

# 3. Push para branch staging
git push origin staging-improvements

# 4. Configurar Vercel preview
# - Conectar branch staging no Vercel
# - Testar preview URL
# - Se OK, fazer merge para main

# 5. Merge seguro para main
git checkout main
git pull origin main  # pegar versão atual
git merge staging-improvements
git push origin main
```

### Opção 2: BACKUP + DEPLOY DIRETO

```bash
# 1. Fazer backup da versão atual
git clone [seu-repo] backup-atual
cd backup-atual
git checkout main  # garantir versão estável

# 2. No projeto atual, fazer push das melhorias
git init
git remote add origin [seu-repositorio-github]
git add .
git commit -m "Production improvements - tested and verified"
git push origin main --force-with-lease

# 3. Se der problema, restaurar do backup
# cd backup-atual && git push origin main --force
```

---

## 🔧 CONFIGURAÇÃO VERCEL SEGURA

### 1. Proteção com Preview Environments
```json
// vercel.json - Adicionar
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "staging-improvements": true
    }
  }
}
```

### 2. Variáveis de Ambiente (Manter Atuais)
```bash
# Não alterar essas na Vercel (já funcionando)
VITE_SUPABASE_URL=https://fdyzlqovxvdpkzlwuhjj.supabase.co
VITE_SUPABASE_ANON_KEY=[manter atual]
VITE_GTM_ID=GTM-KZW3RTWD
```

### 3. Rollback Automático
- Configurar Vercel para manter 3 deployments
- Enable "Instant Rollback" no dashboard
- Monitorar primeiro deploy por 10 minutos

---

## 📋 CHECKLIST PRÉ-DEPLOY

### ✅ Verificações Locais
- [x] Build funcionando: `npm run build` (OK - 318KB)
- [x] Servidor local: `npm run dev` (OK - port 5000)
- [x] APIs testadas: leads e distribuidores (OK)
- [x] Forms funcionando (ID 74 confirmado)
- [x] Zero erros console/LSP

### ✅ Comparação com Produção
- [x] Mesmas funcionalidades principais
- [x] Mesmos endpoints (/api/leads, /api/distribuidores)
- [x] Mesmo domínio (nivela.bembeauty.com.br)
- [x] Mesmas integrações (Supabase, GTM)

---

## 🚨 PLANO DE CONTINGÊNCIA

### Se Algo Der Errado:

#### 1. Rollback Imediato (Vercel)
```bash
# Via CLI
vercel rollback [deployment-url] --yes

# Via Dashboard
# 1. Ir para vercel.com/dashboard
# 2. Selecionar projeto nivela
# 3. Clicar "Rollback" no deployment anterior
```

#### 2. Rollback Git (Último Recurso)
```bash
# Reverter último commit
git revert HEAD --no-edit
git push origin main

# Ou forçar versão anterior
git reset --hard [hash-commit-anterior]
git push origin main --force
```

#### 3. Hotfix Crítico
```bash
# Se precisar corrigir algo urgente
git checkout -b hotfix-critical
# fazer correção
git commit -m "hotfix: critical production issue"
git push origin hotfix-critical
# merge direto via GitHub
```

---

## 📊 MONITORING PÓS-DEPLOY

### 1. Verificações Imediatas (5 min)
- [ ] Site carregando: https://nivela.bembeauty.com.br
- [ ] Formulário leads funcionando
- [ ] Formulário distribuidores funcionando
- [ ] GTM/Analytics tracking
- [ ] WhatsApp links funcionando

### 2. Verificações 15min
- [ ] Core Web Vitals no Google PageSpeed
- [ ] Lighthouse Score mantido (95+)
- [ ] Submissions chegando no Supabase
- [ ] Nenhum erro no console do browser

### 3. Verificações 1h
- [ ] Analytics events no GA4
- [ ] Performance metrics estáveis
- [ ] Nenhum report de usuário

---

## 💡 MINHA RECOMENDAÇÃO

**OPÇÃO 1 - BRANCH STAGING** é a mais segura:

1. Criar branch `staging-improvements`
2. Testar via Vercel preview
3. Se OK, merge para main
4. Monitor por 1 hora
5. Se problema, rollback instant

**Por quê:**
- ✅ Zero downtime
- ✅ Teste isolado
- ✅ Rollback garantido
- ✅ Histórico preservado
- ✅ Confiança máxima

---

## 🎯 PRÓXIMOS PASSOS

1. **Me confirme qual estratégia prefere**
2. **Forneça URL do repositório GitHub**
3. **Eu configurar os comandos exatos**
4. **Acompanhar deploy juntos**

**Quer que eu prepare os comandos git específicos para seu caso?**