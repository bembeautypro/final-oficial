# Guia de Contribuição - NIVELA®

Obrigado por seu interesse em contribuir para o projeto NIVELA®! Este guia fornece informações sobre como contribuir de forma efetiva.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Submissão de Pull Requests](#submissão-de-pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## Código de Conduta

Este projeto adere aos mais altos padrões de conduta profissional. Esperamos que todos os contribuidores:

- Sejam respeitosos e construtivos em todas as interações
- Mantenham o foco na qualidade técnica e experiência do usuário
- Sigam as melhores práticas de desenvolvimento web
- Preservem a confidencialidade e propriedade intelectual do projeto

## Como Contribuir

### Tipos de Contribuições Aceitas

#### 🐛 Correções de Bugs
- Correções de problemas identificados
- Melhorias de performance
- Ajustes de compatibilidade
- Correções de acessibilidade

#### ✨ Novas Funcionalidades
- Melhorias na experiência do usuário
- Otimizações de conversão
- Novas integrações de analytics
- Aprimoramentos de SEO

#### 📖 Documentação
- Melhorias na documentação técnica
- Adição de exemplos de código
- Guias de implementação
- Comentários no código

#### 🎨 Design e UX
- Melhorias na interface do usuário
- Otimizações mobile
- Ajustes de acessibilidade
- Refinamentos visuais

## Processo de Desenvolvimento

### 1. Configuração do Ambiente

#### Pré-requisitos
```bash
# Node.js 18+
node --version

# npm ou yarn
npm --version

# Git
git --version
```

#### Setup Inicial
```bash
# Clone o repositório
git clone https://github.com/[username]/nivela-landing-page.git
cd nivela-landing-page

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Configure o banco de dados
npm run db:push

# Inicie o servidor de desenvolvimento
npm run dev
```

### 2. Workflow de Desenvolvimento

#### Branch Strategy
```bash
# Crie uma branch para sua feature
git checkout -b feature/nome-da-feature

# Ou para correção de bug
git checkout -b fix/nome-do-bug

# Ou para documentação
git checkout -b docs/nome-da-documentacao
```

#### Commits
Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato
tipo(escopo): descrição

# Exemplos
feat(forms): adicionar validação de telefone brasileiro
fix(api): corrigir erro de validação em leads
docs(readme): atualizar instruções de instalação
style(components): ajustar spacing do botão principal
refactor(database): otimizar query de leads
test(api): adicionar testes para endpoint de distribuidores
```

#### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, sem mudança de código
- `refactor`: Refatoração de código
- `test`: Adição ou modificação de testes
- `chore`: Tarefas de manutenção

### 3. Testes

#### Executar Testes
```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

#### Escrever Testes
```typescript
// Exemplo de teste de componente
import { render, screen } from '@testing-library/react';
import { AccessFormModal } from './AccessFormModal';

describe('AccessFormModal', () => {
  test('deve renderizar campos obrigatórios', () => {
    render(<AccessFormModal isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email profissional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
  });
});
```

## Padrões de Código

### TypeScript

#### Tipagem Rigorosa
```typescript
// ✅ Bom - tipos explícitos
interface LeadFormData {
  nome: string;
  email: string;
  telefone: string;
  tipoEstabelecimento?: string;
}

// ✅ Bom - função tipada
const submitLead = async (data: LeadFormData): Promise<ApiResponse> => {
  // implementação
};

// ❌ Evitar - any
const submitLead = async (data: any) => {
  // implementação
};
```

#### Imports e Exports
```typescript
// ✅ Bom - imports organizados
import React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { submitLead } from '@/lib/submit';
import type { LeadFormData } from '@/types';

// ✅ Bom - export nomeado
export const AccessFormModal: React.FC<Props> = ({ ... }) => {
  // implementação
};

// ✅ Bom - export default quando apropriado
export default AccessFormModal;
```

### React

#### Componentes Funcionais
```typescript
// ✅ Bom - componente funcional com TypeScript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  );
};
```

#### Hooks
```typescript
// ✅ Bom - custom hook
export const useFormSubmission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = useCallback(async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await apiCall(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { submitForm, isLoading, error };
};
```

### CSS/Styling

#### Tailwind CSS
```typescript
// ✅ Bom - classes organizadas
const buttonClasses = [
  'inline-flex items-center justify-center',
  'px-6 py-3 rounded-lg font-medium',
  'transition-all duration-300',
  'focus:outline-none focus:ring-2 focus:ring-brand-accent',
  'disabled:opacity-50 disabled:cursor-not-allowed'
].join(' ');

// ✅ Bom - responsive design
<div className="
  grid grid-cols-1 gap-6
  md:grid-cols-2 md:gap-8
  lg:grid-cols-3 lg:gap-10
">
```

#### Custom CSS
```css
/* ✅ Bom - CSS customizado quando necessário */
.custom-gradient {
  background: linear-gradient(
    135deg,
    var(--brand-deep) 0%,
    var(--brand-caramel) 100%
  );
}

/* ✅ Bom - BEM methodology */
.form-field {
  @apply mb-4;
}

.form-field__label {
  @apply block text-sm font-medium text-brand-deep mb-1;
}

.form-field__input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md;
}
```

### Performance

#### Otimizações React
```typescript
// ✅ Bom - React.memo para componentes pesados
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // componente pesado
});

// ✅ Bom - useCallback para funções
const handleSubmit = useCallback((data: FormData) => {
  // lógica de submit
}, [dependency]);

// ✅ Bom - useMemo para cálculos pesados
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

#### Lazy Loading
```typescript
// ✅ Bom - lazy loading de componentes
const LazyComponent = lazy(() => import('./HeavyComponent'));

// ✅ Bom - lazy loading de imagens
<img
  src={imageSrc}
  alt={imageAlt}
  loading="lazy"
  decoding="async"
/>
```

## Submissão de Pull Requests

### 1. Preparação

#### Checklist Pré-Submissão
- [ ] Código segue os padrões estabelecidos
- [ ] Testes foram escritos e estão passando
- [ ] Documentação foi atualizada se necessário
- [ ] Performance foi verificada
- [ ] Acessibilidade foi testada
- [ ] Responsividade foi verificada

#### Testes Locais
```bash
# Execute todos os testes
npm run test
npm run test:integration
npm run build

# Verifique linting
npm run lint
npm run type-check

# Teste em diferentes dispositivos
npm run dev
# Teste em Chrome, Firefox, Safari
# Teste em dispositivos móveis
```

### 2. Pull Request

#### Título
Use o formato: `tipo(escopo): descrição`

**Exemplos:**
- `feat(forms): adicionar validação de CPF/CNPJ`
- `fix(api): corrigir timeout em requisições longas`
- `docs(readme): atualizar guia de instalação`

#### Descrição
```markdown
## Resumo
Breve descrição das mudanças implementadas.

## Motivação
Por que essas mudanças foram necessárias?

## Mudanças
- Lista detalhada das mudanças
- Funcionalidades adicionadas/removidas
- Arquivos modificados importantes

## Testes
- Como testar as mudanças
- Cenários de teste específicos
- Screenshots/GIFs se relevante

## Checklist
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Performance verificada
- [ ] Acessibilidade testada
```

### 3. Review Process

#### O que Esperamos
- **Code Review:** Revisão técnica detalhada
- **Testing:** Validação funcional e performance
- **Design Review:** Verificação de UX/UI
- **Security Review:** Análise de segurança

#### Feedback
- Responda aos comentários de forma construtiva
- Faça as modificações solicitadas
- Mantenha discussões técnicas focadas
- Peça esclarecimentos quando necessário

## Reportar Bugs

### Template de Bug Report
```markdown
## Descrição do Bug
Descrição clara e concisa do que está acontecendo.

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role para baixo até '...'
4. Veja o erro

## Comportamento Esperado
Descrição clara do que deveria acontecer.

## Comportamento Atual
Descrição do que está acontecendo.

## Screenshots/Videos
Se aplicável, adicione capturas de tela.

## Ambiente
- OS: [ex: iOS 14.2]
- Browser: [ex: Chrome 96.0]
- Device: [ex: iPhone 12]
- Version: [ex: 1.2.0]

## Contexto Adicional
Qualquer outro contexto sobre o problema.
```

## Sugerir Melhorias

### Template de Feature Request
```markdown
## Resumo da Funcionalidade
Descrição clara e concisa da funcionalidade desejada.

## Motivação
Por que essa funcionalidade seria útil?

## Solução Proposta
Descrição detalhada de como você gostaria que funcionasse.

## Alternativas Consideradas
Outras soluções que você considerou.

## Impacto
- Usuários afetados
- Complexidade técnica
- Benefícios esperados

## Mockups/Wireframes
Se aplicável, adicione designs ou esboços.
```

## Recursos Adicionais

### Documentação
- [README.md](./README.md) - Visão geral do projeto
- [Technical Architecture](./docs/TECHNICAL_ARCHITECTURE.md) - Arquitetura técnica
- [API Documentation](./docs/API_DOCUMENTATION.md) - Documentação da API
- [Design System](./docs/DESIGN_SYSTEM.md) - Sistema de design
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md) - Guia de deployment

### Ferramentas
- [TypeScript](https://www.typescriptlang.org/) - Linguagem principal
- [React](https://reactjs.org/) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para banco de dados
- [Vite](https://vitejs.dev/) - Build tool

### Contato
Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento através dos issues do GitHub ou email oficial.

---

Obrigado por contribuir para o projeto NIVELA®! Sua colaboração é fundamental para o sucesso do produto.