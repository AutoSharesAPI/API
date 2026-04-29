# Streaming Data (WebSocket)

## Overview

AutoShares provides real-time streaming data via WebSocket connections. Use streaming for live quotes, order updates, position changes, watchlist updates, and account balance changes instead of polling REST endpoints.

## Market Data Agreements (Required for Production)

Before accessing real-time streaming quotes in the production environment, users must sign the required market data agreements. These are exchange-mandated subscriber agreements that authorize receipt of real-time market data.

**Required agreements may include:**

- **NYSE Market Data Agreement** — required for NYSE-listed securities
- **NASDAQ Market Data Agreement** — required for NASDAQ-listed securities  
- **OPRA Subscriber Agreement** — required for real-time options data
- **UTP Plan Agreement** — required for consolidated tape data

**How to check and sign agreements:**

Use the Agreements API to retrieve outstanding agreements for a user:

```
GET /v1.0/users/@me/agreements
```

This returns a list of agreements that must be signed. Each agreement must be accepted before the user can receive the corresponding market data feed.

**Sandbox vs Production:**

| Environment | Market Data | Agreement Required |
|-------------|------------|-------------------|
| Sandbox | 15-minute delayed | No |
| Production (unsigned) | 15-minute delayed | — |
| Production (signed) | Real-time | Yes |

Users who have not signed the required agreements will receive delayed data (typically 15 minutes) even in the production environment. Contact your AutoShares representative if you need assistance with market data entitlements.

## Connection Setup

### Step 1: Get Streamer Info

Retrieve the WebSocket connection details:

```
GET /v1.0/streamers
```

Response:

```json
{
  "Result": {
    "QuoteAddresses": {
      "HostName": "wss://quote-streamer-host:443",
      "SessionID": "abc123"
    },
    "DataAddresses": {
      "HostName": "wss://trade-streamer-host:443",
      "SessionID": "def456"
    }
  }
}
```

Two streamers are available:

- **Quote streamer** - real-time market data (quotes, last price, bid/ask, volume)
- **Trade streamer** - order updates, position changes, account balances

### Step 2: Connect via WebSocket

Connect using the host and session ID from the streamer info response.

### Step 3: Subscribe to Data

After connecting, send subscription messages in JSON format.

## Data Types

### Quotes (Real-Time Market Data)

Subscribe to receive live quotes for securities:

```json
{
  "Subscribe": {
    "EntityType": "Quote",
    "Keys": ["130170"]
  }
}
```

The Keys array contains security IDs (not ticker symbols). Use the Securities lookup endpoint to get the security ID for a symbol.

**Quote fields received:**

| Field | Description |
|-------|-------------|
| Bid | Current bid price |
| BidSize | Bid size |
| Ask | Current ask price |
| AskSize | Ask size |
| Last | Last trade price |
| LastSize | Last trade size |
| Volume | Total daily volume |
| Price | Current display price (use this as primary) |
| Open | Opening price |
| High | Day high |
| Low | Day low |
| Close | Previous close |
| Change | Price change from close |
| ChangePc | Percent change from close |
| OpenInterest | Open interest (options only) |
| Timestamp | Quote timestamp |

**Important:** During extended hours (pre-market, post-market), the `Price` field updates continuously while `Last` freezes at the regular session close. Always use `Price` as your display price, falling back to `Last` only when `Price` is 0.

### Orders

```json
{
  "Subscribe": {
    "EntityType": "Order",
    "Keys": ["6303"]
  }
}
```

Keys contain trading account IDs. Receive updates when orders are placed, filled, cancelled, or rejected.

### Positions

```json
{
  "Subscribe": {
    "EntityType": "Position",
    "Keys": ["6303"]
  }
}
```

Receive updates when positions change (new position, quantity change, closed position).

### Account Balances

```json
{
  "Subscribe": {
    "EntityType": "AccountBalance",
    "Keys": ["6303"]
  }
}
```

Receive updates when account balances change (after fills, deposits, withdrawals).

### Watchlists

```json
{
  "Subscribe": {
    "EntityType": "Watchlist",
    "Keys": ["7125"]
  }
}
```

Receive updates when watchlist contents change. Keys contain user IDs.

## Connection Example (Python)

```python
import websocket
import json

def on_message(ws, message):
    data = json.loads(message)
    print(f"Received: {data}")

def on_open(ws):
    ws.send(json.dumps({
        "Subscribe": {
            "EntityType": "Quote",
            "Keys": ["130170"]
        }
    }))

ws = websocket.WebSocketApp(
    "wss://quote-streamer-host:443/CreateSession",
    on_message=on_message,
    on_open=on_open
)
ws.run_forever()
```

## Connection Example (JavaScript)

```javascript
const ws = new WebSocket("wss://quote-streamer-host:443/CreateSession");

ws.onopen = () => {
  ws.send(JSON.stringify({
    Subscribe: {
      EntityType: "Quote",
      Keys: ["130170"]
    }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Quote update:", data);
};
```

## Best Practices

- **Use streaming instead of polling.** WebSocket connections provide instant updates with no rate limit overhead.
- **Subscribe only to what you need.** Each subscription adds load. Do not subscribe to all securities if you only need a few.
- **Handle reconnection.** Implement automatic reconnection with exponential backoff for dropped connections.
- **Use the Price field for display.** During extended hours, Last freezes at regular close while Price continues updating.
- **Recover sessions.** Use the streamer recovery endpoint to resume a disconnected session without losing subscription state.
