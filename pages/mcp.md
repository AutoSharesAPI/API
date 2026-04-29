# MCP Server (AI Integration)

AutoShares provides a hosted MCP (Model Context Protocol) server that gives AI assistants direct access to the Trading API. Works with Claude Code, Claude Desktop, ChatGPT, and any MCP-compatible client.

## Hosted MCP Server

Connect to our hosted MCP server — no installation required:

```
https://ai-docs.globalmarketholdings.workers.dev/mcp
```

### 12 Tools Available

| Tool | Description |
|------|-------------|
| `authenticate` | Get a Bearer token for API access |
| `lookup_symbol` | Search for stocks, ETFs, options by ticker or name |
| `get_positions` | Get all current positions for an account |
| `get_orders` | Get all orders (working, filled, cancelled) |
| `place_order` | Place Market, Limit, Stop, OTOCO bracket orders |
| `cancel_order` | Cancel a working order by ID |
| `get_account_info` | Account balances, buying power, margin details |
| `get_option_chain` | Full option chain for a symbol |
| `get_chart` | OHLCV chart data with configurable period/range |
| `get_watchlists` | Get all watchlists for a user |
| `get_news` | News articles for a security |
| `ask_api_docs` | Ask questions about the API (AI-powered) |

## Connect with Claude Code

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "autoshares": {
      "type": "url",
      "url": "https://ai-docs.globalmarketholdings.workers.dev/mcp"
    }
  }
}
```

Then in Claude Code you can say:

- *"Authenticate with my AutoShares account and show my positions"*
- *"Place a limit order to buy 100 AAPL at $180"*
- *"Get the option chain for TSLA"*
- *"What's in my watchlist?"*

## Connect with Claude Desktop

In Claude Desktop settings, add a custom MCP server:

```json
{
  "mcpServers": {
    "autoshares": {
      "type": "url",
      "url": "https://ai-docs.globalmarketholdings.workers.dev/mcp"
    }
  }
}
```

## Self-Hosted Option

For full control, run the MCP server locally:

```bash
git clone https://github.com/AutoSharesAPI/mcp-server
cd mcp-server
npm install && npm run build
cp .env.example .env
# Edit .env with your credentials
node dist/index.js
```

The self-hosted version has 30+ tools (including RQD clearing endpoints) compared to 12 on the hosted version.

## Example: AI-Powered Trading Workflow

```
You: "Authenticate, then look up AAPL and place a bracket order —
      buy 100 shares at $180, take profit at $195, stop loss at $170"

AI: 1. Calls authenticate → gets Bearer token
    2. Calls lookup_symbol("AAPL") → confirms security
    3. Calls place_order with OTOCO bracket:
       - Leg 1: Limit Buy 100 AAPL @ $180
       - Leg 2: Limit Sell 100 AAPL @ $195 (take profit)
       - Leg 3: Stop Sell 100 AAPL @ $170 (stop loss)
    4. Returns order confirmation with ID and status
```

## Security

- All credentials are passed per-request — the MCP server does not store them
- Use environment variables, never hardcode credentials
- The hosted server runs on Cloudflare's edge network (encrypted in transit)
- For production trading, use the self-hosted version with your own infrastructure
