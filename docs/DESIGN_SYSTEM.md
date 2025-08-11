# NIVELA® Design System

## Overview

The NIVELA® design system provides a comprehensive set of design tokens, components, and guidelines that ensure visual consistency and brand alignment across the entire landing page experience.

## Brand Identity

### Brand Philosophy
NIVELA® represents premium quality, professional expertise, and innovative hair care technology. The design system reflects:
- **Sophistication:** Premium, professional aesthetic
- **Warmth:** Approachable and inviting experience
- **Innovation:** Modern, cutting-edge technology
- **Trust:** Reliability and professional credibility

### Visual Language
- **Modern Minimalism:** Clean, uncluttered layouts
- **Premium Typography:** Professional, readable fonts
- **Warm Color Palette:** Earthy, natural tones
- **Rich Imagery:** High-quality, professional photography

## Color System

### Primary Brand Colors

```css
:root {
  /* Primary Colors */
  --brand-deep: #2D1B0E;          /* Deep chocolate brown - Primary brand color */
  --brand-caramel: #8B4513;       /* Rich caramel brown - Secondary brand color */
  --brand-latte: #D2B48C;         /* Warm latte beige - Accent color */
  --brand-light: #F5F5DC;         /* Light cream beige - Background color */
  --brand-accent: #DAA520;        /* Golden accent - Highlight color */
  --brand-black: #1A1A1A;         /* Rich black - Text and contrast */
}
```

### Color Usage Guidelines

#### Primary Colors (Brand Deep & Caramel)
- **Headlines and CTAs:** Use for primary headlines and main call-to-action buttons
- **Navigation:** Primary navigation elements and brand marks
- **Key Sections:** Section headers and important UI elements

```css
.primary-heading {
  color: var(--brand-deep);
}

.cta-button {
  background: linear-gradient(135deg, var(--brand-deep), var(--brand-caramel));
  color: white;
}
```

#### Accent Colors (Latte & Golden)
- **Highlights:** Important information and accents
- **Interactive States:** Hover effects and active states
- **Supporting Elements:** Icons, borders, and decorative elements

```css
.accent-element {
  color: var(--brand-latte);
  border-color: var(--brand-accent);
}

.interactive-hover:hover {
  background-color: var(--brand-accent);
  transform: translateY(-2px);
}
```

#### Background Colors
- **Primary Background:** Light cream for main content areas
- **Section Alternates:** Subtle variations for content separation
- **Card Backgrounds:** Clean white with soft shadows

```css
.main-background {
  background-color: var(--brand-light);
}

.card-background {
  background-color: white;
  box-shadow: 0 4px 20px rgba(45, 27, 14, 0.1);
}
```

### Color Accessibility

#### Contrast Ratios
All color combinations meet WCAG 2.1 AA standards:
- **Normal Text:** Minimum 4.5:1 contrast ratio
- **Large Text:** Minimum 3:1 contrast ratio
- **Interactive Elements:** Minimum 3:1 contrast ratio

#### Color Blind Considerations
- Color is never the only indicator of meaning
- Important information uses multiple visual cues
- Tested with common color blindness simulators

## Typography

### Font Families

#### Primary Font: Montserrat
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

.font-montserrat {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Usage Guidelines:**
- **Headlines (H1-H3):** Montserrat 600-700 weight
- **Subheadings (H4-H6):** Montserrat 500-600 weight
- **Body Text:** Montserrat 400 weight
- **Captions/Small Text:** Montserrat 300-400 weight

### Typography Scale

#### Heading Styles
```css
.text-h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.text-h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
}

.text-h4 {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 500;
  line-height: 1.4;
}
```

#### Body Text Styles
```css
.text-body-large {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
}

.text-body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

.text-body-small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}

.text-caption {
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.4;
}
```

### Responsive Typography

#### Fluid Typography System
```css
/* Responsive font sizes using clamp() */
.responsive-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Responsive line spacing */
.responsive-text {
  line-height: clamp(1.4, 1.5, 1.6);
}
```

## Spacing System

### Spacing Scale
Based on an 8px grid system for consistent rhythm and alignment.

```css
:root {
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --space-5xl: 8rem;      /* 128px */
}
```

### Spacing Usage Guidelines

#### Component Spacing
```css
/* Card internal spacing */
.card-padding {
  padding: var(--space-lg) var(--space-xl);
}

/* Section spacing */
.section-spacing {
  margin-bottom: var(--space-4xl);
}

/* Element spacing */
.element-margin {
  margin-bottom: var(--space-lg);
}
```

#### Responsive Spacing
```css
/* Responsive padding */
.responsive-padding {
  padding: clamp(var(--space-md), 4vw, var(--space-3xl));
}

/* Container spacing */
.container-spacing {
  padding-left: var(--space-md);
  padding-right: var(--space-md);
}

@media (min-width: 768px) {
  .container-spacing {
    padding-left: var(--space-xl);
    padding-right: var(--space-xl);
  }
}
```

## Component Library

### Button System

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, var(--brand-deep), var(--brand-caramel));
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px; /* Touch target */
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 27, 14, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--brand-accent);
  outline-offset: 2px;
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--brand-deep);
  border: 2px solid var(--brand-deep);
  padding: calc(var(--space-md) - 2px) calc(var(--space-xl) - 2px);
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 44px;
}

.btn-secondary:hover {
  background: var(--brand-deep);
  color: white;
  transform: translateY(-1px);
}
```

#### Button Sizes
```css
.btn-small {
  padding: var(--space-sm) var(--space-md);
  font-size: 0.875rem;
  min-height: 36px;
}

.btn-large {
  padding: var(--space-lg) var(--space-2xl);
  font-size: 1.125rem;
  min-height: 52px;
}
```

### Form Components

#### Input Fields
```css
.form-input {
  width: 100%;
  padding: var(--space-md);
  border: 2px solid #E5E7EB;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  min-height: 48px;
}

.form-input:focus {
  outline: none;
  border-color: var(--brand-accent);
  box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
}

.form-input:invalid {
  border-color: #EF4444;
}

.form-input::placeholder {
  color: #9CA3AF;
}
```

#### Form Labels
```css
.form-label {
  display: block;
  font-weight: 500;
  color: var(--brand-deep);
  margin-bottom: var(--space-xs);
  font-size: 0.875rem;
}

.form-label.required::after {
  content: ' *';
  color: #EF4444;
}
```

### Card Components

#### Base Card
```css
.card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(45, 27, 14, 0.1);
  padding: var(--space-xl);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(45, 27, 14, 0.15);
}
```

#### Feature Card
```css
.card-feature {
  background: linear-gradient(135deg, white, var(--brand-light));
  border: 1px solid var(--brand-latte);
  border-radius: 2rem;
  padding: var(--space-2xl);
  text-align: center;
}

.card-feature-icon {
  width: 64px;
  height: 64px;
  background: var(--brand-accent);
  border-radius: 50%;
  margin: 0 auto var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Layout System

### Grid System

#### CSS Grid Layout
```css
.grid-container {
  display: grid;
  gap: var(--space-xl);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-2-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
}

@media (max-width: 768px) {
  .grid-2-col {
    grid-template-columns: 1fr;
  }
}
```

#### Flexbox Utilities
```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
```

### Container System

#### Main Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-xl);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-2xl);
  }
}
```

#### Section Container
```css
.section {
  padding: var(--space-4xl) 0;
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-3xl) 0;
  }
}
```

## Animation System

### Transition Standards

#### Base Transitions
```css
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-bounce {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.transition-fast {
  transition: all 0.15s ease-out;
}
```

#### Hover Effects
```css
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(218, 165, 32, 0.4);
}
```

### Loading Animations
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

## Responsive Design

### Breakpoint System
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Media Query Mixins
```css
/* Mobile First Approach */
@media (min-width: 640px) {
  .sm\:text-lg {
    font-size: 1.125rem;
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:text-xl {
    font-size: 1.25rem;
  }
}
```

### Touch Targets
```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
  touch-action: manipulation;
}

.touch-friendly {
  padding: var(--space-md);
  margin: var(--space-sm);
}
```

## Accessibility Guidelines

### Focus Management
```css
.focus-visible-enhanced:focus-visible {
  outline: 2px solid var(--brand-accent);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--brand-deep);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Implementation Guidelines

### CSS Custom Properties Usage
```css
/* Component-specific properties */
.component {
  --component-bg: var(--brand-light);
  --component-text: var(--brand-deep);
  --component-accent: var(--brand-accent);
  
  background-color: var(--component-bg);
  color: var(--component-text);
}

/* Dark mode support */
[data-theme="dark"] {
  --brand-light: #1A1A1A;
  --brand-deep: #F5F5DC;
}
```

### Performance Considerations
```css
/* Use transform for animations (GPU accelerated) */
.performant-animation {
  will-change: transform;
  transform: translateZ(0); /* Create new layer */
}

/* Efficient transitions */
.efficient-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
```

### Code Organization
```css
/* 1. CSS Custom Properties */
:root { /* variables */ }

/* 2. Base Styles */
*, *::before, *::after { /* reset */ }

/* 3. Typography */
.text-* { /* typography classes */ }

/* 4. Layout */
.container, .grid-* { /* layout classes */ }

/* 5. Components */
.btn-*, .card-* { /* component classes */ }

/* 6. Utilities */
.m-*, .p-* { /* utility classes */ }

/* 7. Media Queries */
@media (min-width: 768px) { /* responsive styles */ }
```

---

This design system ensures consistent, accessible, and performant user interfaces across the entire NIVELA® platform while maintaining brand integrity and professional quality.