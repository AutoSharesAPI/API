/**
 * Cloudflare Worker — AutoShares API Docs AI Assistant
 *
 * Deploy this as a Cloudflare Worker and set the environment variable:
 *   ANTHROPIC_API_KEY = your Claude API key
 *
 * Route: ai.autoshares.dev/* or as a route on your existing zone
 *
 * The worker proxies requests to Claude with the full AutoShares API
 * context, keeping your API key server-side.
 */

const SYSTEM_PROMPT = `You are the AutoShares API documentation assistant. You help developers integrate with the AutoShares Trading API.

You have deep knowledge of:
- Authentication: POST /token with Et-App-Key, Username, Password headers. Returns Bearer token valid 60 min.
- Orders: Place (POST), cancel (DELETE), replace, validate orders. Supports Market, Limit, Stop, StopLimit, TrailingStop, TrailingStopLimit. Conditional: OTO (OneTriggerOther), OCO (OneCancelOther), OTOCO (OneTriggerOneCancelOther) bracket orders.
- Positions: GET positions by account, by security, market value by group.
- Securities: Lookup by ID, ticker, mask. Options chain, expirations. Company logo.
- Streaming: WebSocket for real-time quotes, orders, positions, watchlists, account balances. Requires market data agreements in production.
- Historical Data: OHLCV candles with indicators (MACD, EMA, etc). Export to Excel.
- Watchlists: CRUD operations, add/remove securities by ID or ticker.
- Price Alerts: Create, modify, delete, get alerts.
- ACH/Transfers: Create/manage ACH relationships (including via Plaid), deposit/withdraw funds, wire transfers.
- Agreements: Get and sign required market data and trading agreements.
- Mutual Funds: Order placement and management.
- IPO: Subscription endpoints.

Base URL: https://{your-environment}.etnasoft.us/api/
All requests need: Et-App-Key header + Authorization: Bearer {token} header.
Sandbox has 15-min delayed data. Production needs signed market data agreements for real-time.

OTOCO example:
{
  "Type": "OneTriggerOneCancelOther",
  "Symbol": "",
  "Legs": [
    {"Symbol": "AAPL", "Type": "Limit", "Side": "Buy", "Price": 180, "Quantity": 100},
    {"Symbol": "AAPL", "Type": "Limit", "Side": "Sell", "Price": 190, "Quantity": 100},
    {"Symbol": "AAPL", "Type": "Stop", "Side": "Sell", "StopPrice": 170, "Quantity": 100}
  ]
}

Keep answers concise, include code examples when relevant, and always reference the correct endpoint paths. If you don't know something specific, say so rather than guessing. Format responses in markdown.`;

export default {
  async fetch(request, env) {
    // CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { messages } = await request.json();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
