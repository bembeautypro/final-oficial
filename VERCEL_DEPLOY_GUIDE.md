# 🚀 DEPLOY VERCEL - NIVELA® Landing Page

## PASSO A PASSO COMPLETO

### 1. **Acesse a Vercel**
1. Vá para [vercel.com](https://vercel.com)
2. Faça login ou crie conta
3. Clique em **"New Project"**

### 2. **Conecte o GitHub**
1. Clique em **"Import Git Repository"**
2. Autorize acesso ao GitHub (se necessário)
3. Busque e selecione: **`bembeautypro/NIVELA`**
4. Clique em **"Import"**

### 3. **Configuração Automática**
A Vercel detectará automaticamente via `vercel.json`:
- ✅ Framework: Vite
- ✅ Build Command: `cd client && npm run build`
- ✅ Output Directory: `client/dist/public`
- ✅ Install Command: `npm install`

**Não altere nada** - clique em **"Deploy"**

### 4. **Aguarde o Build** ⏱️
- Duração: ~2-3 minutos
- Status visível em tempo real
- Build bem-sucedido = ✅ Site funcionando

### 5. **Configurar Domínio Personalizado**

#### Após deploy bem-sucedido:
1. Vá em **"Settings"** (na dashboard do projeto)
2. Clique em **"Domains"** (menu lateral)
3. Clique em **"Add"**
4. Digite: `nivela.bembeauty.com.br`
5. Clique em **"Add"**

#### Configuração DNS (no seu provedor de domínio):
```
Type: CNAME
Name: nivela
Value: cname.vercel-dns.com
TTL: 300 (ou deixar automático)
```

### 6. **Variáveis de Ambiente**
1. Ainda em **"Settings"**, clique em **"Environment Variables"**
2. Adicione estas variáveis:

```
VITE_GTM_ID = GTM-KZW3RTWD
VITE_GA_ID = G-SC9C7W6Q4F
VITE_SITE_URL = https://nivela.bembeauty.com.br
```

3. Clique em **"Add"** para cada uma
4. **"Redeploy"** para aplicar as variáveis

## ✅ RESULTADO FINAL

- **URL Temporária**: `https://nivela-xxx.vercel.app` (imediata)
- **URL Final**: `https://nivela.bembeauty.com.br` (após DNS)
- **SSL**: Automático e gratuito
- **CDN**: Global (velocidade máxima)
- **Analytics**: Funcionais (GTM + GA4)

## 🚨 POSSÍVEIS PROBLEMAS

### Build Error?
- Verifique se selecionou o repositório correto: `bembeautypro/NIVELA`
- Logs de erro ficam visíveis na dashboard

### DNS não funciona?
- Aguarde 24h para propagação
- Verifique configuração CNAME
- Teste com [dnschecker.org](https://dnschecker.org)

### Site não carrega?
- Verifique se build foi bem-sucedido
- Confirme variáveis de ambiente adicionadas
- Faça redeploy se necessário

## 📞 SUPORTE

- Dashboard Vercel: Logs completos disponíveis
- DNS Checker: Verificar propagação
- Performance: Automático via Vercel Analytics

**Tempo estimado total: 10-15 minutos**