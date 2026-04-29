# Rate Limiting

## Overview

AutoShares enforces rate limits to ensure platform stability and fair usage. Limits apply per user token, not per IP address.

## Rate Limits by Endpoint Category

| Category | Limit | Window | Notes |
|----------|-------|--------|-------|
| **Authentication** (`/token`) | 10 requests | Per minute | Avoid polling — cache your token |
| **Orders** (place/cancel/replace) | 50 requests | Per minute | Per trading account |
| **Order queries** (get/list) | 120 requests | Per minute | |
| **Positions** | 120 requests | Per minute | |
| **Securities lookup** | 200 requests | Per minute | Cache results for frequently queried symbols |
| **Historical data** | 60 requests | Per minute | Large date ranges count as one request |
| **Watchlists** | 60 requests | Per minute | |
| **Price alerts** | 60 requests | Per minute | |
| **Streaming (WebSocket)** | 1 connection | Per session | Use WebSocket for real-time data instead of polling REST |

## Rate Limit Headers

When you approach or exceed a rate limit, the API returns these headers:

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in the window |
| `X-RateLimit-Remaining` | Requests remaining in the current window |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |
| `Retry-After` | Seconds to wait before retrying (only on 429 responses) |

## Handling Rate Limits

When you receive a `429 Too Many Requests` response:

1. Read the `Retry-After` header
2. Wait the specified number of seconds
3. Retry the request
4. If no `Retry-After` header, use exponential backoff starting at 1 second

```python
import time

def handle_rate_limit(response):
    if response.status_code == 429:
        wait = int(response.headers.get('Retry-After', 5))
        print(f"Rate limited. Waiting {wait} seconds...")
        time.sleep(wait)
        return True  # Signal to retry
    return False
```

## Best Practices

**Use WebSocket for real-time data.** Don't poll REST endpoints for live quotes, order status, or position updates. The streaming API provides push-based updates with no rate limit overhead.

**Cache authentication tokens.** Tokens are valid for 60 minutes. Authenticate once and reuse the token — don't request a new token for every API call.

**Cache security lookups.** Symbol metadata (security ID, exchange, tick size) rarely changes. Cache these results and refresh daily.

**Batch where possible.** Use filtered endpoints (`GET /orders?status=Working`) instead of fetching orders one by one.

**Use pagination.** For endpoints that return lists, use `pageNumber` and `pageSize` parameters to avoid fetching more data than needed.
