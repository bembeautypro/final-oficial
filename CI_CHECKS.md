# CI_CHECKS.md - Sistema de Verificações Automáticas

## 🎯 **Scripts NPM Propostos**

### **package.json - Novos Scripts**
```json
{
  "scripts": {
    "check:repo": "node tools/check-repo.js",
    "check:api": "node tools/check-api.js", 
    "check:env": "node tools/check-env.js",
    "test:forms": "node tools/test-forms.js",
    "validate:all": "npm run check && npm run check:repo && npm run check:api && npm run check:env"
  }
}
```

## 🛠️ **Tool: check-repo.js**
**Finalidade:** Detectar duplicatas, estrutura incorreta e arquivos desnecessários

```javascript
// tools/check-repo.js
const fs = require('fs');
const path = require('path');

class RepoChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  checkDuplicateDirectories() {
    const srcExists = fs.existsSync('src');
    const clientSrcExists = fs.existsSync('client/src');
    
    if (srcExists && clientSrcExists) {
      this.errors.push('❌ Duplicate src directories: both src/ and client/src/ exist');
    }
    
    if (!clientSrcExists) {
      this.errors.push('❌ Missing client/src/ directory');
    }
  }

  checkDuplicateFiles() {
    const duplicates = [
      { files: ['index.html', 'client/index.html'], message: 'Duplicate HTML entry points' },
      { files: ['src/index.css', 'client/src/index.css'], message: 'Duplicate CSS files' },
      { files: ['api/leads.js', 'api/leads.ts'], message: 'Duplicate API files' },
      { files: ['api/distribuidores.js', 'api/distribuidores.ts'], message: 'Duplicate API files' }
    ];

    duplicates.forEach(({ files, message }) => {
      const existing = files.filter(file => fs.existsSync(file));
      if (existing.length > 1) {
        this.warnings.push(`⚠️ ${message}: ${existing.join(', ')}`);
      }
    });
  }

  checkUnnecessaryFiles() {
    const unnecessary = [
      'node_modules/',
      'attached_assets/',
      '.vercel/',
      'dist/',
      'api/ping.ts'
    ];

    unnecessary.forEach(file => {
      if (fs.existsSync(file)) {
        this.warnings.push(`⚠️ Unnecessary file/directory: ${file}`);
      }
    });
  }

  checkRequiredDirectories() {
    const required = [
      'api/',
      'client/',
      'client/src/',
      'client/src/components/',
      'shared/'
    ];

    required.forEach(dir => {
      if (!fs.existsSync(dir)) {
        this.errors.push(`❌ Missing required directory: ${dir}`);
      }
    });
  }

  checkGitignore() {
    if (!fs.existsSync('.gitignore')) {
      this.errors.push('❌ Missing .gitignore file');
      return;
    }

    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    const required = ['node_modules/', 'dist/', '.vercel/', '.env'];
    
    required.forEach(item => {
      if (!gitignore.includes(item)) {
        this.warnings.push(`⚠️ .gitignore missing: ${item}`);
      }
    });
  }

  run() {
    console.log('🔍 Checking repository structure...\n');
    
    this.checkDuplicateDirectories();
    this.checkDuplicateFiles();
    this.checkUnnecessaryFiles();
    this.checkRequiredDirectories();
    this.checkGitignore();

    if (this.errors.length > 0) {
      console.log('🚨 ERRORS:');
      this.errors.forEach(error => console.log(error));
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️ WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
      console.log('');
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ Repository structure is clean!');
    }

    return this.errors.length === 0;
  }
}

const checker = new RepoChecker();
const success = checker.run();
process.exit(success ? 0 : 1);
```

## 🛠️ **Tool: check-api.js**
**Finalidade:** Validar handlers, métodos e export default

```javascript
// tools/check-api.js
const fs = require('fs');
const path = require('path');

class APIChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  checkAPIDirectory() {
    if (!fs.existsSync('api')) {
      this.errors.push('❌ Missing api/ directory');
      return false;
    }
    return true;
  }

  checkAPIFiles() {
    const apiFiles = fs.readdirSync('api').filter(file => 
      file.endsWith('.js') || file.endsWith('.ts')
    );

    if (apiFiles.length === 0) {
      this.errors.push('❌ No API files found in api/ directory');
      return;
    }

    // Check for .ts files (should be .js for Vercel)
    const tsFiles = apiFiles.filter(file => file.endsWith('.ts'));
    if (tsFiles.length > 0) {
      this.warnings.push(`⚠️ TypeScript files in api/: ${tsFiles.join(', ')} (Vercel prefers .js)`);
    }

    // Check each .js file
    const jsFiles = apiFiles.filter(file => file.endsWith('.js'));
    jsFiles.forEach(file => this.validateAPIFile(file));
  }

  validateAPIFile(filename) {
    const filepath = path.join('api', filename);
    const content = fs.readFileSync(filepath, 'utf8');

    // Check for export default
    if (!content.includes('export default')) {
      this.errors.push(`❌ ${filename}: Missing 'export default' function`);
    }

    // Check for handler function
    if (!content.includes('function handler') && !content.includes('=> {')) {
      this.warnings.push(`⚠️ ${filename}: No handler function pattern found`);
    }

    // Check for POST method support
    if (content.includes('POST') || content.includes('req.method')) {
      if (!content.includes('POST')) {
        this.warnings.push(`⚠️ ${filename}: May not handle POST method`);
      }
    }

    // Check for CORS headers
    if (!content.includes('Access-Control-Allow-Origin')) {
      this.warnings.push(`⚠️ ${filename}: Missing CORS headers`);
    }

    // Check for try/catch
    if (!content.includes('try') && !content.includes('catch')) {
      this.warnings.push(`⚠️ ${filename}: No error handling (try/catch)`);
    }

    // Check for Supabase import
    if (content.includes('supabase') && !content.includes('@supabase/supabase-js')) {
      this.warnings.push(`⚠️ ${filename}: Uses Supabase but missing import`);
    }
  }

  checkRequiredAPIs() {
    const required = ['leads.js', 'distribuidores.js'];
    
    required.forEach(api => {
      if (!fs.existsSync(`api/${api}`)) {
        this.errors.push(`❌ Missing required API: api/${api}`);
      }
    });
  }

  run() {
    console.log('🔍 Checking API structure...\n');
    
    if (!this.checkAPIDirectory()) {
      console.log('🚨 ERRORS:');
      this.errors.forEach(error => console.log(error));
      return false;
    }

    this.checkAPIFiles();
    this.checkRequiredAPIs();

    if (this.errors.length > 0) {
      console.log('🚨 ERRORS:');
      this.errors.forEach(error => console.log(error));
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️ WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
      console.log('');
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All API files are valid!');
    }

    return this.errors.length === 0;
  }
}

const checker = new APIChecker();
const success = checker.run();
process.exit(success ? 0 : 1);
```

## 🛠️ **Tool: check-env.js**
**Finalidade:** Verificar environment variables necessárias

```javascript
// tools/check-env.js
const fs = require('fs');

class EnvChecker {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  checkEnvExample() {
    if (!fs.existsSync('.env.example')) {
      this.warnings.push('⚠️ Missing .env.example file');
      return;
    }

    const envExample = fs.readFileSync('.env.example', 'utf8');
    const required = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY'
    ];

    required.forEach(var_name => {
      if (!envExample.includes(var_name)) {
        this.warnings.push(`⚠️ .env.example missing: ${var_name}`);
      }
    });
  }

  checkAPIEnvironmentUsage() {
    const apiFiles = fs.existsSync('api') ? fs.readdirSync('api').filter(f => f.endsWith('.js')) : [];
    
    apiFiles.forEach(file => {
      const content = fs.readFileSync(`api/${file}`, 'utf8');
      
      // Check for old VITE_ prefix usage
      if (content.includes('VITE_SUPABASE_')) {
        this.warnings.push(`⚠️ ${file}: Uses VITE_ prefix (should be server-only)`);
      }

      // Check for Next.js prefix usage
      if (content.includes('NEXT_PUBLIC_')) {
        this.warnings.push(`⚠️ ${file}: Uses NEXT_PUBLIC_ prefix (wrong framework)`);
      }

      // Check for missing env validation
      if (content.includes('process.env') && !content.includes('throw new Error')) {
        this.warnings.push(`⚠️ ${file}: No environment validation (missing error handling)`);
      }
    });
  }

  checkConfigFiles() {
    // Check for conflicting configs
    const configs = [
      'vite.config.ts',
      'vite.config.deploy.ts',
      'vite.config.dev.ts'
    ].filter(config => fs.existsSync(config));

    if (configs.length > 2) {
      this.warnings.push(`⚠️ Multiple Vite configs: ${configs.join(', ')}`);
    }

    // Check vercel.json
    if (fs.existsSync('vercel.json')) {
      const vercelConfig = fs.readFileSync('vercel.json', 'utf8');
      try {
        const config = JSON.parse(vercelConfig);
        
        if (!config.buildCommand) {
          this.warnings.push('⚠️ vercel.json: Missing buildCommand');
        }
        
        if (!config.outputDirectory) {
          this.warnings.push('⚠️ vercel.json: Missing outputDirectory');
        }
      } catch (e) {
        this.errors.push('❌ vercel.json: Invalid JSON');
      }
    }
  }

  run() {
    console.log('🔍 Checking environment configuration...\n');
    
    this.checkEnvExample();
    this.checkAPIEnvironmentUsage();
    this.checkConfigFiles();

    if (this.errors.length > 0) {
      console.log('🚨 ERRORS:');
      this.errors.forEach(error => console.log(error));
      console.log('');
    }

    if (this.warnings.length > 0) {
      console.log('⚠️ WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
      console.log('');
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ Environment configuration looks good!');
    }

    return this.errors.length === 0;
  }
}

const checker = new EnvChecker();
const success = checker.run();
process.exit(success ? 0 : 1);
```

## 🛠️ **Tool: test-forms.js**
**Finalidade:** Testar endpoints com dados fake

```javascript
// tools/test-forms.js
const https = require('https');

class FormTester {
  constructor(baseUrl = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  async testAPI(endpoint, payload) {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${endpoint}`;
      const data = JSON.stringify(payload);
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      const req = require(this.baseUrl.startsWith('https') ? 'https' : 'http').request(url, options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        });
      });

      req.on('error', (error) => {
        resolve({
          statusCode: 0,
          data: error.message,
          success: false
        });
      });

      req.write(data);
      req.end();
    });
  }

  async testLeadsAPI() {
    console.log('🧪 Testing /api/leads...');
    
    const testData = {
      nome: 'Maria Silva',
      email: 'maria.test@email.com',
      telefone: '11999887766',
      tipoEstabelecimento: 'salao-proprio'
    };

    const result = await this.testAPI('/api/leads', testData);
    
    if (result.success) {
      console.log('✅ /api/leads: SUCCESS');
      this.results.push({ endpoint: 'leads', success: true });
    } else {
      console.log(`❌ /api/leads: FAILED (${result.statusCode})`);
      console.log(`   Response: ${result.data}`);
      this.results.push({ endpoint: 'leads', success: false, error: result.data });
    }
  }

  async testDistribuidoresAPI() {
    console.log('🧪 Testing /api/distribuidores...');
    
    const testData = {
      nome: 'João Santos',
      email: 'joao.test@empresa.com',
      telefone: '11888776655',
      empresa: 'Salão Teste',
      cidade: 'São Paulo',
      estado: 'SP',
      experiencia_distribuicao: 'sim',
      mensagem: 'Interesse em distribuir produtos'
    };

    const result = await this.testAPI('/api/distribuidores', testData);
    
    if (result.success) {
      console.log('✅ /api/distribuidores: SUCCESS');
      this.results.push({ endpoint: 'distribuidores', success: true });
    } else {
      console.log(`❌ /api/distribuidores: FAILED (${result.statusCode})`);
      console.log(`   Response: ${result.data}`);
      this.results.push({ endpoint: 'distribuidores', success: false, error: result.data });
    }
  }

  async run() {
    console.log('🔍 Testing API endpoints with fake data...\n');
    
    await this.testLeadsAPI();
    await this.testDistribuidoresAPI();

    console.log('\n📊 SUMMARY:');
    const successCount = this.results.filter(r => r.success).length;
    const totalCount = this.results.length;
    
    console.log(`✅ Successful: ${successCount}/${totalCount}`);
    
    if (successCount < totalCount) {
      console.log('❌ Some endpoints failed. Check configuration and environment variables.');
      return false;
    } else {
      console.log('🎉 All endpoints working correctly!');
      return true;
    }
  }
}

// Check if running locally or with custom URL
const baseUrl = process.argv[2] || 'http://localhost:5000';
const tester = new FormTester(baseUrl);

tester.run().then(success => {
  process.exit(success ? 0 : 1);
});
```

## 🔧 **Setup dos Tools**

### **1. Criar Diretório**
```bash
mkdir tools
```

### **2. Instalar Dependências (se necessário)**
```bash
# Para HTTP requests nos testes
npm install --save-dev axios
```

### **3. Adicionar ao .gitignore**
```bash
# tools/ já incluído - arquivos de verificação são parte do projeto
```

## 🚀 **GitHub Actions Workflow (Opcional)**

### **.github/workflows/ci.yml**
```yaml
name: Repository Quality Checks

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Check repository structure
      run: npm run check:repo
    
    - name: Check API files
      run: npm run check:api
    
    - name: Check environment configuration
      run: npm run check:env
    
    - name: TypeScript check
      run: npm run check
    
    - name: Build test
      run: npm run build
      
    - name: Test forms (if local server available)
      run: npm run test:forms || echo "Skipping form tests (no local server)"
      continue-on-error: true

  deployment-test:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for production
      run: npm run build
    
    - name: Check build artifacts
      run: |
        ls -la dist/
        test -f dist/index.html || exit 1
        test -d dist/assets || exit 1
        echo "✅ Build artifacts look good"
```

## ✅ **Uso dos Scripts**

### **Verificação Completa**
```bash
npm run validate:all
```

### **Verificação Individual**
```bash
npm run check:repo        # Estrutura e duplicatas
npm run check:api         # APIs e handlers  
npm run check:env         # Environment variables
npm run test:forms        # Teste dos endpoints
```

### **Pre-commit Hook**
```bash
# .husky/pre-commit (se usando Husky)
#!/bin/sh
npm run check:repo && npm run check:api
```

## 🎯 **Benefícios do Sistema de Checks**

### **Desenvolvimento:**
- Detecta problemas antes do commit
- Valida configurações automaticamente
- Evita deploys quebrados

### **CI/CD:**
- Build falha se estrutura incorreta
- Valida APIs antes do deploy
- Documenta problemas claramente

### **Manutenção:**
- Facilita onboarding de novos devs
- Detecta regressões rapidamente
- Mantém qualidade do código

## 🔍 **Próximos Passos**

1. **Criar diretório tools/ e implementar scripts**
2. **Testar scripts localmente**
3. **Adicionar ao package.json**
4. **Configurar GitHub Actions (opcional)**
5. **Documentar uso para equipe**