# NIVELA® API Documentation

## Overview

The NIVELA® API provides endpoints for lead generation, distributor registration, analytics tracking, and performance monitoring. All endpoints use RESTful conventions with JSON payloads and comprehensive error handling.

## Base URL

```
Development: http://localhost:5000
Production: https://nivela.bembeauty.com.br
```

## Authentication

Currently, the API uses basic authentication for internal operations. All endpoints are publicly accessible for form submissions but include rate limiting and input validation.

## Content Type

All API requests must include:
```http
Content-Type: application/json
```

## Rate Limiting

- **Limit:** 100 requests per minute per IP
- **Headers:** Rate limit information included in response headers
- **Exceeded:** Returns `429 Too Many Requests`

## Error Handling

### Error Response Format
```json
{
  "error": "Error description",
  "details": [
    {
      "code": "validation_error",
      "message": "Specific field error",
      "path": ["field_name"]
    }
  ],
  "timestamp": "2025-08-11T16:22:00.414Z",
  "request_id": "uuid-string"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `409` - Conflict (duplicate data)
- `429` - Too Many Requests
- `500` - Internal Server Error

## Endpoints

### 1. Lead Generation

#### Create Lead
Creates a new lead from the main landing page form.

```http
POST /api/leads
```

**Request Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@salaobeleza.com",
  "telefone": "11999999999",
  "tipoEstabelecimento": "Salão de Beleza",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "nivela-launch"
}
```

**Request Schema:**
```typescript
interface LeadRequest {
  nome: string;                    // Required: Full name
  email: string;                   // Required: Valid email
  telefone: string;                // Required: Phone number
  tipoEstabelecimento?: string;    // Optional: Business type
  utmSource?: string;              // Optional: UTM source
  utmMedium?: string;              // Optional: UTM medium
  utmCampaign?: string;            // Optional: UTM campaign
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "lead": {
    "id": "uuid-string",
    "nome": "João Silva",
    "email": "joao@salaobeleza.com",
    "telefone": "11999999999",
    "tipoEstabelecimento": "Salão de Beleza",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "nivela-launch",
    "status": "pendente",
    "origem": "landing_page",
    "createdAt": "2025-08-11T16:22:00.414Z",
    "updatedAt": "2025-08-11T16:22:00.414Z"
  }
}
```

**Error Examples:**
```json
// Validation Error (400)
{
  "error": "Invalid data",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["nome"],
      "message": "Required"
    }
  ]
}

// Invalid Email (400)
{
  "error": "Invalid data",
  "details": [
    {
      "code": "invalid_string",
      "validation": "email",
      "path": ["email"],
      "message": "Invalid email"
    }
  ]
}
```

### 2. Distributor Registration

#### Create Distributor
Registers a new distributor through the distributor form.

```http
POST /api/distribuidores
```

**Request Body:**
```json
{
  "nome": "Maria Distribuidora",
  "email": "maria@empresa.com",
  "telefone": "11888888888",
  "empresa": "Distribuidora Beauty Ltda",
  "cargo": "Gerente Comercial",
  "mensagem": "Interesse em distribuir NIVELA® na região Sul",
  "cidade": "São Paulo",
  "estado": "SP",
  "experienciaDistribuicao": "5-10 anos",
  "volumeVendasMensal": "R$ 50.000 - R$ 100.000"
}
```

**Request Schema:**
```typescript
interface DistributorRequest {
  nome: string;                      // Required: Full name
  email: string;                     // Required: Valid email
  telefone?: string;                 // Optional: Phone number
  empresa?: string;                  // Optional: Company name
  cargo?: string;                    // Optional: Job title
  mensagem?: string;                 // Optional: Message/notes
  cidade?: string;                   // Optional: City
  estado?: string;                   // Optional: State
  experienciaDistribuicao?: string;  // Optional: Distribution experience
  volumeVendasMensal?: string;       // Optional: Monthly sales volume
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "distribuidor": {
    "id": "uuid-string",
    "nome": "Maria Distribuidora",
    "email": "maria@empresa.com",
    "telefone": "11888888888",
    "empresa": "Distribuidora Beauty Ltda",
    "cargo": "Gerente Comercial",
    "mensagem": "Interesse em distribuir NIVELA® na região Sul",
    "cidade": "São Paulo",
    "estado": "SP",
    "experienciaDistribuicao": "5-10 anos",
    "volumeVendasMensal": "R$ 50.000 - R$ 100.000",
    "createdAt": "2025-08-11T16:22:00.414Z",
    "updatedAt": "2025-08-11T16:22:00.414Z"
  }
}
```

**Error Examples:**
```json
// Duplicate Email (409)
{
  "error": "Este email já está cadastrado como distribuidor"
}

// Missing Required Field (400)
{
  "error": "Invalid data",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    }
  ]
}
```

### 3. Analytics Tracking

#### Track Event
Records custom analytics events for business intelligence.

```http
POST /api/analytics
```

**Request Body:**
```json
{
  "eventName": "video_play",
  "eventData": {
    "video_id": "video-manifesto",
    "timestamp": "2025-08-11T16:22:00.414Z",
    "user_agent": "Mozilla/5.0...",
    "page_url": "https://nivela.bembeauty.com.br"
  },
  "sessionId": "session-uuid",
  "pageUrl": "https://nivela.bembeauty.com.br",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
}
```

**Request Schema:**
```typescript
interface AnalyticsEventRequest {
  eventName: string;                 // Required: Event identifier
  eventData?: Record<string, any>;   // Optional: Event metadata
  userId?: string;                   // Optional: User identifier
  sessionId?: string;                // Optional: Session identifier
  pageUrl?: string;                  // Optional: Current page URL
  userAgent?: string;                // Optional: User agent string
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "event": {
    "id": "uuid-string",
    "eventName": "video_play",
    "eventData": {
      "video_id": "video-manifesto",
      "timestamp": "2025-08-11T16:22:00.414Z"
    },
    "sessionId": "session-uuid",
    "pageUrl": "https://nivela.bembeauty.com.br",
    "userAgent": "Mozilla/5.0...",
    "createdAt": "2025-08-11T16:22:00.414Z"
  }
}
```

### 4. Performance Metrics

#### Submit Performance Metric
Records performance and monitoring data.

```http
POST /api/metrics
```

**Request Body:**
```json
{
  "metricName": "LCP",
  "metricValue": "1234.56",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "pageUrl": "https://nivela.bembeauty.com.br"
}
```

**Request Schema:**
```typescript
interface PerformanceMetricRequest {
  metricName: string;     // Required: Metric identifier (LCP, FID, CLS, etc.)
  metricValue: string;    // Required: Metric value as string
  userAgent?: string;     // Optional: User agent string
  pageUrl?: string;       // Optional: Page URL where metric was captured
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "metric": {
    "id": "uuid-string",
    "metricName": "LCP",
    "metricValue": "1234.56",
    "userAgent": "Mozilla/5.0...",
    "pageUrl": "https://nivela.bembeauty.com.br",
    "createdAt": "2025-08-11T16:22:00.414Z"
  }
}
```

## Data Validation

### Input Validation Rules

#### Email Validation
- Must be valid email format
- Maximum 255 characters
- Automatically converted to lowercase
- Duplicate checking for distributors

#### Phone Validation
- Accepts Brazilian phone formats
- Automatically strips non-numeric characters
- Minimum 10 digits, maximum 15 digits

#### Text Fields
- HTML tags stripped for security
- Maximum lengths enforced
- Required fields validated

#### UTM Parameters
- Optional but tracked when provided
- Stored for campaign attribution
- Persisted across user session

### Security Measures

#### Input Sanitization
```typescript
// Example sanitization
const sanitizeInput = (input: string) => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .substring(0, 1000); // Prevent extremely long inputs
};
```

#### Rate Limiting
- 100 requests per minute per IP address
- Sliding window algorithm
- Automatic temporary blocking for abuse

#### CORS Configuration
```typescript
// CORS settings
const corsOptions = {
  origin: [
    'https://nivela.bembeauty.com.br',
    'https://*.vercel.app',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

## Testing

### cURL Examples

#### Test Lead Creation
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Test User",
    "email": "test@example.com",
    "telefone": "11999999999",
    "tipoEstabelecimento": "Salão"
  }'
```

#### Test Distributor Registration
```bash
curl -X POST http://localhost:5000/api/distribuidores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Test Distributor",
    "email": "dist@example.com",
    "empresa": "Test Company"
  }'
```

#### Test Analytics Event
```bash
curl -X POST http://localhost:5000/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "page_view",
    "eventData": {"page": "home"},
    "sessionId": "test-session"
  }'
```

### API Testing Tools

#### Postman Collection
A Postman collection is available with all endpoints pre-configured:
- Import the collection from `/docs/postman/NIVELA-API.json`
- Set environment variables for base URL
- Test all endpoints with sample data

#### Automated Testing
```bash
# Run API tests
npm run test:api

# Run integration tests
npm run test:integration

# Run load tests
npm run test:load
```

## Database Schema

### Tables Overview

#### leads_nivela
```sql
CREATE TABLE leads_nivela (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT NOT NULL,
  tipo_estabelecimento TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  ip_address INET,
  status TEXT NOT NULL DEFAULT 'pendente',
  origem TEXT DEFAULT 'landing_page',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### distribuidores
```sql
CREATE TABLE distribuidores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  empresa TEXT,
  cargo TEXT,
  mensagem TEXT,
  cidade TEXT,
  estado TEXT,
  experiencia_distribuicao TEXT,
  volume_vendas_mensal TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### analytics_events
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_data JSONB,
  user_id UUID,
  session_id TEXT,
  page_url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### performance_metrics
```sql
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Performance Considerations

### Query Optimization
- Indexes on frequently queried fields (email, created_at)
- Connection pooling for database efficiency
- Query result caching for read-heavy operations

### Response Times
- Target: < 200ms for form submissions
- Target: < 100ms for analytics tracking
- Target: < 50ms for performance metrics

### Monitoring
- API response time tracking
- Error rate monitoring
- Database performance metrics
- Real-time alerting for issues

---

This API documentation provides comprehensive information for integrating with the NIVELA® platform. For additional support or questions, contact the development team.