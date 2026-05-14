# Blink Wallet Setup Guide

## Prerequisites

1. A Blink wallet (download from [blink.sv](https://blink.sv))
2. Bitcoin in your wallet (for fee reserves if applicable)
3. API credentials from your Blink dashboard

## Step 1: Create a Blink Developer Account

1. Go to [blink.sv](https://blink.sv) and create a wallet
2. Navigate to **Settings → API**
3. Generate a new **GraphQL API Key**
4. Note the **GraphQL endpoint URL**

## Step 2: Configure Environment Variables

Add to your `.env.local`:

```env
# Blink GraphQL endpoint
NEXT_PUBLIC_BLINK_GRAPHQL_URL=https://your-wallet.blink.sv/graphql

# API authentication key
BLINK_API_KEY=your-api-key-here

# Webhook secret (set after creating webhook)
BLINK_WEBHOOK_SECRET=your-webhook-secret-here
```

## Step 3: Configure Webhooks

1. In Blink dashboard, go to **Settings → Webhooks**
2. Add a new webhook with URL: `https://your-domain.com/api/tipjar/webhook`
3. Select events to listen for:
   - `invoice.paid`
   - `invoice.expired`
   - `invoice.created`
4. Copy the **Webhook Secret** and add to `.env.local`

## Step 4: Test the Connection

Run a test invoice creation:

```bash
curl -X POST https://your-wallet.blink.sv/graphql \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createInvoice(amount: 100, memo: \"test\") { paymentRequest } }"}'
```

## Step 5: Verify Webhook Reception

Use a tool like [ngrok](https://ngrok.com) to expose your local server:

```bash
ngrok http 3000
# Then set the webhook URL to: https://your-ngrok-url.ngrok.io/api/tipjar/webhook
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check API key in `BLINK_API_KEY` |
| Webhook not firing | Verify webhook URL is publicly accessible |
| Invalid signature | Ensure `BLINK_WEBHOOK_SECRET` matches |
| Invoice not created | Check wallet balance and API rate limits |

## Security Notes

- Never expose `BLINK_API_KEY` in client-side code
- Always verify webhook signatures before processing
- Use HTTPS in production for webhook endpoints
- Rotate API keys periodically