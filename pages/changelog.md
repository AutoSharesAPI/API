# Changelog

## API Version History

### v1.0 — Current

The AutoShares Trading API v1.0 is the current production version. All endpoints documented on this site are part of v1.0.

**Base path:** `/api/v1.0/`

---

### April 2026

**New Features:**
- OTOCO (One-Triggers-One-Cancels-the-Other) bracket order support
- `OneTriggerOneCancelOther` order type with 3-leg structure
- Congress Trading automation API endpoints
- MCP (Model Context Protocol) server for AI-powered trading

**Improvements:**
- Enhanced order validation with descriptive `ErrorDescription` responses
- Improved WebSocket streaming reliability
- Extended options chain data

---

### March 2026

**New Features:**
- Mutual Fund trading support (`/v1.0/mutualfunds/`)
- IPO subscription endpoints (`/v1.0/ipo/`)
- ACH relationship management via Plaid integration

**Improvements:**
- Price alert webhook notifications
- Historical data export to Excel format
- Enhanced security lookup with company logo endpoint

---

### February 2026

**New Features:**
- Trailing Stop and Trailing Stop Limit order types
- Extended hours trading support (`PRE`, `POST`, `REGPOST`)
- Multi-leg option order support

**Improvements:**
- Streaming data for account balances and user balance
- Position lot-level detail endpoint
- Custom commission instructions per order

---

## Deprecation Policy

- Deprecated endpoints are announced **90 days** before removal
- Deprecated endpoints return a `X-Deprecated` header with the removal date
- Breaking changes are versioned (v1.0 to v2.0) and old versions are maintained for **12 months**

## Migration Support

For questions about API changes or migration assistance, contact:

- **Email:** support@autoshares.com
- **Documentation:** https://documentation.autoshares.dev
