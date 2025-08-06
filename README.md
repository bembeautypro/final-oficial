# NIVELA® - Landing Page Oficial

> A evolução da escova progressiva profissional com tecnologia ASTRO QUAT V3®

## 🌟 Visão Geral

Landing page premium para **NIVELA®** da Bem Beauty Professional - produto revolucionário com tecnologia patenteada, ingredientes da Amazônia e textura gel inovadora.

### 🎯 Características Principais
- **Tecnologia Premium**: ASTRO QUAT V3® sem formol
- **Ingredientes da Amazônia**: Sustentabilidade e eficácia
- **Textura Gel Inteligente**: 30% mais rendimento
- **Design Responsivo**: Mobile-first, otimizado para conversão

## 🗄️ Configuração do Banco de Dados

Este projeto usa **Supabase** como banco de dados PostgreSQL.

### Setup Inicial:
1. Crie projeto no [supabase.com](https://supabase.com)
2. Copie connection string (Transaction pooler)
3. Execute SQL de criação das tabelas (ver `SUPABASE_SETUP.md`)
4. Configure variável `DATABASE_URL`

## 🚀 Deploy em Produção

### Vercel (Recomendado)
```bash
# 1. Repositório: https://github.com/bembeautypro/NIVELA.git
# 2. Configurar Supabase (ver SUPABASE_SETUP.md)
# 3. Deploy na Vercel com variáveis de ambiente
```

**Arquivos de Configuração:**
- `SUPABASE_SETUP.md` - Setup completo do banco
- `VERCEL_DEPLOY_GUIDE.md` - Deploy passo a passo

### Manual Build
```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Preview local
npm run preview
```

## 🛠 Tecnologias

### Frontend
- **React 18** + TypeScript + Vite
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** para animações
- **Radix UI** para acessibilidade

### Performance
- **Bundle Size**: ~643KB total optimizado
- **Web Vitals**: LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Lazy Loading**: Componentes e imagens otimizadas
- **Code Splitting**: Chunks inteligentes por seção

### SEO & Analytics
- **GTM**: GTM-KZW3RTWD
- **GA4**: G-SC9C7W6Q4F
- **Schema.org**: Product + Organization markup
- **Open Graph**: Social media optimization

## 📱 Responsividade

### Breakpoints Otimizados
- **Mobile**: 320px - 640px (touch-first)
- **Tablet**: 640px - 1024px (balanced)
- **Desktop**: 1024px+ (immersive)

### Touch Targets
- **Mínimo**: 44px x 44px (iOS HIG)
- **CTAs principais**: 48px+ height
- **Navegação**: Thumb-friendly spacing

## 🎨 Design System

### Paleta de Cores
```css
--brand-black: #0D181C    /* Fundo principal */
--brand-deep: #1A3F47     /* Elementos secundários */
--brand-cloud: #8FA3B0    /* Texto secundário */
--brand-latte: #C5B499    /* Destaques premium */
--brand-caramel: #9D4916  /* CTAs e acentos */
```

### Tipografia
- **Principal**: Montserrat (300-800)
- **Hierarquia**: 2xl → 5xl responsiva
- **Line Height**: 1.1 (títulos), 1.5 (corpo)

## 🔧 Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes UI
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utilitários
│   │   └── pages/          # Páginas principais
│   ├── public/             # Assets estáticos
│   └── dist/               # Build de produção
├── server/                 # Backend Express (dev only)
├── shared/                 # Schemas compartilhados
├── vercel.json            # Config Vercel
└── README.md              # Este arquivo
```

## 📊 Performance Metrics

### Bundle Analysis
```
Main bundle: ~548KB (gzip: 173KB)
CSS bundle: ~95KB (gzip: 15KB)
Chunks bem distribuídos por componente
Total carregamento: ~643KB
```

### Web Vitals Targets
- **LCP**: < 2.5s ✅
- **FID**: < 100ms ✅
- **CLS**: < 0.1 ✅
- **TTFB**: < 800ms ✅

## 🔐 Variáveis de Ambiente

Para desenvolvimento local, configure:

```env
# Analytics
VITE_GTM_ID=GTM-KZW3RTWD
VITE_GA_ID=G-SC9C7W6Q4F

# URLs
VITE_API_URL=http://localhost:5000
VITE_SITE_URL=https://nivela.bembeauty.com.br
```

## 🧪 Qualidade e Testes

### Code Quality
- **TypeScript**: Strict mode ativado
- **ESLint**: Configuração React + a11y
- **LSP Diagnostics**: Zero errors
- **Performance**: Monitored em produção

### Accessibility
- **WCAG AA**: Compliant
- **Screen Readers**: ARIA + semantic HTML
- **Keyboard Navigation**: Full support
- **Color Contrast**: 4.5:1+ ratio

## 🚀 Deploy Instructions

### 1. Preparação
```bash
# Verificar build local
npm run build
npm run preview
```

### 2. Vercel Deploy
```bash
# Conectar repositório GitHub à Vercel
# Ou fazer deploy direto:
vercel --prod
```

### 3. Configuração Domínio
- **Produção**: nivela.bembeauty.com.br
- **SSL**: Automático via Vercel
- **CDN**: Global edge network

### 4. Verificação Final
- [ ] Analytics funcionando (GTM + GA4)
- [ ] Performance Web Vitals OK
- [ ] Mobile experience smooth
- [ ] Forms de lead capture ativos
- [ ] SEO meta tags corretos

## 📞 Suporte

### Contato Técnico
- **GitHub Issues**: Para bugs e melhorias
- **Email**: suporte@bembeauty.com.br
- **WhatsApp**: +55 (11) 9.9999-9999

### Links Importantes
- **Site**: https://nivela.bembeauty.com.br
- **Instagram**: @bembeautyprofessional
- **YouTube**: @BemBeautyProfessional

---

**Desenvolvido com ❤️ pela equipe Bem Beauty Professional**  
*Todos os direitos reservados © 2025*