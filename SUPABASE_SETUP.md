# 🗄️ CONFIGURAÇÃO SUPABASE - NIVELA® Landing Page

## PASSO A PASSO COMPLETO

### 1. **Criar Projeto Supabase**
1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie conta
3. Clique em **"New Project"**
4. Configure:
   - **Name**: `NIVELA Landing Page`
   - **Database Password**: (anote bem este password)
   - **Region**: `South America (São Paulo)`
5. Clique em **"Create new project"**
6. Aguarde ~2 minutos para inicialização

### 2. **Obter Connection String**
1. No dashboard do projeto, clique em **"Connect"** (botão no topo)
2. Vá em **"Connection string"** → **"Transaction pooler"**  
3. Copie a URI:
   ```
   postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```
4. **Substitua `[YOUR-PASSWORD]`** pelo password do banco que você criou

### 3. **Criar Tabelas**
Execute este SQL no **SQL Editor** do Supabase:

```sql
-- Tabela de leads NIVELA
CREATE TABLE leads_nivela (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cidade VARCHAR(255),
  estado VARCHAR(100),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de distribuidores
CREATE TABLE distribuidores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  empresa VARCHAR(255),
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(100) NOT NULL,
  experiencia TEXT,
  mensagem TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de métricas de performance
CREATE TABLE performance_metrics (
  id SERIAL PRIMARY KEY,
  page_load_time INTEGER,
  first_contentful_paint REAL,
  largest_contentful_paint REAL,
  cumulative_layout_shift REAL,
  first_input_delay REAL,
  connection VARCHAR(50),
  device_memory VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de eventos de analytics
CREATE TABLE analytics_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_properties JSONB,
  session_id VARCHAR(255),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização
CREATE INDEX idx_leads_created_at ON leads_nivela(created_at);
CREATE INDEX idx_leads_utm_source ON leads_nivela(utm_source);
CREATE INDEX idx_distribuidores_created_at ON distribuidores(created_at);
CREATE INDEX idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_session_id ON analytics_events(session_id);
```

### 4. **Configurar no Projeto**

#### A. **Variável de Ambiente Local (.env)**
Crie arquivo `.env` na raiz do projeto:
```
DATABASE_URL=postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

#### B. **Testar Conexão**
Execute no terminal:
```bash
npm run db:push
```

Se der erro, verifique:
- Password correto na connection string
- Projeto Supabase ativo
- Região correta

### 5. **Deploy com Supabase**

#### No Vercel:
1. Adicione a variável **DATABASE_URL** com sua connection string
2. Faça redeploy
3. Verifique logs para confirmar conexão

#### Variáveis Completas para Vercel:
```
DATABASE_URL=postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_ID=G-SC9C7W6Q4F
VITE_SITE_URL=https://nivela.bembeauty.com.br
```

## ✅ VANTAGENS DO SUPABASE

- **Gratuito**: Até 50k rows/mês
- **Backup automático**: 7 dias de retenção
- **Dashboard visual**: Gerenciar dados facilmente
- **API automática**: RESTful + GraphQL
- **Real-time**: Subscriptions automáticas
- **Escalável**: Upgrade conforme necessário

## 🚨 TROUBLESHOOTING

### Connection Error?
- Verifique password na connection string
- Confirme que projeto está "Active"
- Teste conexão no dashboard Supabase

### Tables não existem?
- Execute o SQL de criação das tabelas
- Verifique permissões no painel RLS (pode desabilitar para desenvolvimento)

### Deploy falha?
- Confirme DATABASE_URL nas variáveis do Vercel
- Verifique logs de build para errors específicos

**Tempo estimado: 15-20 minutos**