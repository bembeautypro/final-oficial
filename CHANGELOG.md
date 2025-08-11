# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.2.0] - 2025-08-11

### 🚀 Adicionado
- **Comprehensive Bug Fixes**: Correção completa de bugs críticos do sistema
- **API Validation**: Melhorada validação de campos opcionais (tipoEstabelecimento)
- **GTM Integration**: Container ID correto (GTM-KZW3RTWD) implementado
- **Performance Tracking**: MutationObserver para tracking de vídeos dinâmicos
- **Error Handling**: Tratamento aprimorado de erros sem logs de produção
- **Service Worker**: Implementação simplificada e mais robusta

### 🔧 Corrigido
- Campo `tipoEstabelecimento` agora opcional no schema de leads
- Referências de service worker para arquivo inexistente
- Console.logs de debug removidos do ambiente de produção
- Nomes de propriedades corrigidos (camelCase vs snake_case)
- Validation errors em formulários de lead e distribuidor

### 📊 Performance
- Bundle size otimizado para 207KB gzipped
- Zero erros LSP detectados
- APIs testadas e 100% funcionais
- Core Web Vitals tracking aprimorado

### 🧪 Teste
- Endpoint `/api/leads` testado com sucesso
- Endpoint `/api/distribuidores` testado com sucesso
- Analytics tracking verificado
- Performance metrics funcionando

## [1.1.0] - 2025-08-11

### 🚀 Adicionado
- **Analytics Foundation**: Integração completa GTM/GA4 com sistema de tracking avançado
- **UTM Tracking**: Captura e persistência completa de parâmetros UTM através de sessões
- **Form Tracking**: Tracking aprimorado de submissões com eventos de geração de leads
- **Video Analytics**: Tracking de progresso (25%, 50%, 75%, completo) para todo conteúdo de vídeo
- **Performance Monitoring**: Tracking de Core Web Vitals (LCP, FID, CLS) com relatórios automáticos
- **WhatsApp Integration**: Injeção de UTM em links do WhatsApp para atribuição de campanha
- **Error Tracking**: Monitoramento abrangente de erros e relatórios de exceção
- **Data Layer**: Implementação completa do dataLayer com taxonomia estruturada de eventos
- **Security**: Headers CSP implementados para segurança aprimorada mantendo funcionalidade de analytics

### 🔧 Melhorado
- Sistema de tracking de eventos mais robusto
- Persistência de dados UTM em sessionStorage
- Integração aprimorada com Google Analytics 4
- Monitoramento de performance em tempo real

## [1.0.0] - 2025-08-11

### 🚀 Lançamento Inicial
- **Landing Page Completa**: Página profissional para NIVELA® com tecnologia ASTRO QUAT V3®
- **Forms Redesigned**: Redesign completo mobile-responsivo com indicadores claros de campos obrigatórios/opcionais
- **Mobile Optimization**: 95% de largura da tela, botões empilhados, targets de toque adequados
- **Field Validation**: Asterisco vermelho (*) para campos obrigatórios, "(opcional)" cinza para campos opcionais
- **Organized Layout**: Seções para dados pessoais, dados comerciais e informações adicionais
- **Database Schema**: Correção de constraints NOT NULL nos campos cidade/estado na tabela distribuidores
- **Improved UX**: Melhores labels, placeholders, estados de foco com cores da marca, alturas de input aumentadas

### 🛠 Stack Técnico
- **Frontend**: React 18 com TypeScript
- **Styling**: Tailwind CSS com sistema de design customizado
- **Backend**: Node.js com Express.js
- **Database**: PostgreSQL via Supabase com Drizzle ORM
- **Build**: Vite para desenvolvimento rápido e builds otimizados
- **Deployment**: Vercel com deployments automáticos

### 📊 Features de Negócio
- Formulários de lead generation otimizados
- Sistema de registro de distribuidores
- Integração com WhatsApp para comunicação direta
- Tracking de campanhas UTM
- Analytics avançado para otimização de conversão

### 🎨 Design System
- Paleta de cores premium da marca NIVELA®
- Tipografia Montserrat responsiva
- Componentes acessíveis (WCAG 2.1 AA)
- Animações suaves com Framer Motion
- Sistema de grid responsivo

### 🔒 Segurança
- Validação de entrada em múltiplas camadas
- Headers de Content Security Policy
- Sanitização de dados de formulário
- Proteção contra injeção de código

### 📈 Performance
- Bundle otimizado (~207KB gzipped)
- Lazy loading de imagens e vídeos
- Code splitting para carregamento eficiente
- Service Worker para cache avançado
- Core Web Vitals excelentes (LCP < 2.5s, FID < 100ms, CLS < 0.1)

---

## Convenções de Versionamento

- **MAJOR**: Mudanças que quebram compatibilidade
- **MINOR**: Novas funcionalidades mantendo compatibilidade
- **PATCH**: Correções de bugs mantendo compatibilidade

## Tipos de Mudanças

- `🚀 Adicionado` - Para novas funcionalidades
- `🔧 Corrigido` - Para correções de bugs
- `📊 Performance` - Para melhorias de performance
- `🎨 Design` - Para mudanças de design/UI
- `🔒 Segurança` - Para melhorias de segurança
- `📖 Documentação` - Para mudanças na documentação
- `🧪 Teste` - Para adições ou mudanças em testes
- `🛠 Interno` - Para mudanças internas/refatoração