# ✅ FIX: IMAGENS RESTAURADAS

**Problema:** Logo e hero image sumiram após otimizações  
**Causa:** Assets estavam em `/public/` mas Vite procura em `/client/public/`  
**Solução:** Movidas para local correto  

## 🔧 CORREÇÃO APLICADA

### **Assets Movidos:**
- `/public/img/logo.png` → `/client/public/img/logo.png`
- `/public/img/nivela-hero.webp` → `/client/public/img/nivela-hero.webp`
- `/public/site.webmanifest` → `/client/public/site.webmanifest`
- `/public/robots.txt` → `/client/public/robots.txt`

### **Vite Configuration:**
```typescript
root: path.resolve(import.meta.dirname, "client"),
build: {
  outDir: path.resolve(import.meta.dirname, "dist/public"),
}
```

### **URLs Funcionando:**
- Logo: `/img/logo.png` ✅
- Hero: `/img/nivela-hero.webp` ✅
- Manifest: `/site.webmanifest` ✅
- Robots: `/robots.txt` ✅

## ✅ STATUS

**Imagens restauradas e funcionando:**
- Logo na navegação: Visível
- Hero image principal: Visível  
- Performance otimizada mantida
- Build funcionando normalmente

**Próximo passo:** Commit dos assets no local correto