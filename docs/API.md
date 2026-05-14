# API Documentation

## Base URL

```
https://your-domain.com/api
```

## Endpoints

### Create Lightning Invoice

```
POST /api/tipjar
```

**Request Body:**
```json
{
  "amount": 200,
  "currency": "MXN",
  "mesaId": "mesa-01",
  "meseroId": "mesero-01"
}
```

**Response (200):**
```json
{
  "success": true,
  "invoice": "lnbc200n1...",
  "lightningUrl": "lightning:lnbc200n1..."
}
```

**Errors:**
- `400`: Invalid amount
- `500`: Server error

---

### Webhook Receiver

```
POST /api/tipjar/webhook
```

**Headers:**
- `X-Signature`: HMAC-SHA256 signature

**Body:**
```json
{
  "event": "invoice.paid",
  "data": {
    "id": "inv_001",
    "payment_hash": "abc123",
    "payment_request": "lnbc...",
    "amount_msat": 200000,
    "status": "PAID"
  },
  "timestamp": "2026-05-13T19:20:00Z",
  "signature": "hmac-sha256-signature"
}
```

**Response (200):**
```json
{ "received": true }
```

---

### Generate QR Code

```
GET /api/qr?mesaId=mesa-01
GET /api/qr?meseroId=mesero-01
```

**Query Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| mesaId | string | No* | Table ID |
| meseroId | string | No* | Waiter ID |

_*At least one required_

**Response (200):**
```json
{
  "success": true,
  "data": "https://la-bianca.com/tipjar?data=...",
  "qrUrl": "https://la-bianca.com/tipjar?data=..."
}
```

---

### Health Check

```
GET /api/health
```

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-13T19:20:00Z",
  "version": "0.1.0",
  "uptime": 3600,
  "environment": "production",
  "checks": {
    "database": "ok",
    "blink": "ok",
    "redis": "ok"
  }
}
```

## OpenAPI Spec

```yaml
openapi: 3.0.0
info:
  title: La Bianca Bitcoin API
  version: 0.1.0
  description: Lightning tip jar API
paths:
  /api/tipjar:
    post:
      summary: Create Lightning invoice
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                amount:
                  type: number
                currency:
                  type: string
                mesaId:
                  type: string
                meseroId:
                  type: string
      responses:
        200:
          description: Invoice created
  /api/tipjar/webhook:
    post:
      summary: Receive Blink webhook
      responses:
        200:
          description: Webhook received
  /api/qr:
    get:
      summary: Generate QR code URL
      responses:
        200:
          description: QR data
  /api/health:
    get:
      summary: Health check
      responses:
        200:
          description: Healthy
```