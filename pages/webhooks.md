# Webhooks

## Overview

AutoShares supports webhooks for receiving real-time notifications when events occur in your trading accounts. Instead of polling the API for changes, webhooks push data to your server as events happen.

## Event Types

| Event | Trigger | Payload |
|-------|---------|---------|
| `order.created` | New order placed | Order details, symbol, side, quantity, type |
| `order.filled` | Order fully executed | Fill price, quantity, execution time |
| `order.partial_fill` | Order partially filled | Filled quantity, remaining quantity, average price |
| `order.cancelled` | Order cancelled | Cancellation reason, original order details |
| `order.rejected` | Order rejected by exchange | Rejection reason, order details |
| `order.replaced` | Order modified | Old and new order parameters |
| `position.opened` | New position established | Symbol, quantity, cost basis |
| `position.closed` | Position fully closed | Realized P&L, close price |
| `transfer.completed` | ACH/wire transfer completed | Amount, direction, account |
| `transfer.failed` | Transfer failed | Failure reason, amount |
| `alert.triggered` | Price alert fired | Symbol, alert condition, current price |
| `account.updated` | Account settings changed | Changed fields |

## Webhook Payload Format

All webhook payloads follow this structure:

```json
{
  "id": "evt_abc123def456",
  "type": "order.filled",
  "timestamp": "2026-04-28T14:30:00.000Z",
  "accountId": 6303,
  "data": {
    "orderId": 80328,
    "symbol": "AAPL",
    "side": "Buy",
    "type": "Limit",
    "quantity": 100,
    "filledQuantity": 100,
    "averagePrice": 182.50,
    "status": "Filled",
    "executionTime": "2026-04-28T14:30:00.000Z"
  }
}
```

## Setting Up Webhooks

Contact your AutoShares representative to configure webhooks for your integration. You will need to provide:

1. **Endpoint URL** — HTTPS URL on your server that will receive POST requests
2. **Events** — Which event types you want to subscribe to
3. **Secret** — A shared secret for verifying webhook signatures

## Verifying Webhook Signatures

Every webhook request includes a signature in the `X-AutoShares-Signature` header. Verify it to ensure the request came from AutoShares:

```python
import hmac
import hashlib

def verify_webhook(payload_body, signature, secret):
    expected = hmac.new(
        secret.encode('utf-8'),
        payload_body,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)
```

```javascript
const crypto = require('crypto');

function verifyWebhook(payloadBody, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payloadBody)
    .digest('hex');
  return signature === `sha256=${expected}`;
}
```

## Retry Policy

If your endpoint returns a non-2xx status code, AutoShares will retry delivery:

| Attempt | Delay |
|---------|-------|
| 1st retry | 1 minute |
| 2nd retry | 5 minutes |
| 3rd retry | 30 minutes |
| 4th retry | 2 hours |
| 5th retry | 12 hours |

After 5 failed attempts, the webhook is marked as failed. You can view failed deliveries and manually retry them through the AutoShares dashboard.

## Best Practices

- **Respond quickly** — return a `200` status within 5 seconds. Process the event asynchronously if needed.
- **Handle duplicates** — use the `id` field to deduplicate. The same event may be delivered more than once.
- **Use HTTPS** — webhook endpoints must use HTTPS with a valid SSL certificate.
- **Verify signatures** — always verify the `X-AutoShares-Signature` header before processing.
