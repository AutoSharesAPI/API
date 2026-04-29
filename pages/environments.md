# Base URL & Environments

## Environments

AutoShares provides two environments for API integration:

| Environment | Base URL | Purpose |
|-------------|----------|---------|
| **Sandbox** | `https://{your-sandbox}.etnasoft.us/api/` | Testing and development. Paper trading only — no real orders executed. |
| **Production** | `https://{your-production}.etnasoft.us/api/` | Live trading with real money. Full market access. |

Your specific base URLs are provided by AutoShares during onboarding. Do not use demo URLs from code samples in production.

## Getting Your Credentials

To access the API, you need three things:

1. **Base URL** — Your environment-specific API endpoint
2. **Et-App-Key** — Your application's unique identifier, retrievable from the Back Office Companies widget
3. **User credentials** — Username and password for the trading account

Contact your AutoShares representative or email **support@autoshares.com** to provision API access.

## Authentication Flow

All API requests (except the initial token request) require a Bearer token in the `Authorization` header.

```
POST {baseURL}/token
```

**Headers:**

| Header | Required | Description |
|--------|----------|-------------|
| `Et-App-Key` | Yes | Your application key |
| `Username` | Yes | Trading account username |
| `Password` | Yes | Trading account password |
| `Accept` | Yes | `application/json` |

**Response:**

```json
{
  "State": "Succeeded",
  "Token": "VGhpcyBpcyBleGFtcGxlIHRva2Vu..."
}
```

Use the returned token in all subsequent requests:

```
Authorization: Bearer VGhpcyBpcyBleGFtcGxlIHRva2Vu...
```

## Token Lifecycle

- Tokens expire after **60 minutes** of inactivity
- There is no refresh token — request a new token when the current one expires
- A `401 Unauthorized` response indicates the token has expired
- Tokens are scoped to the user whose credentials were used

## Two-Factor Authentication

If 2FA is enabled on the account, the initial token request returns a `202` status with an interim token. You must make a second request with the verification code:

```
POST {baseURL}/token
```

**Additional headers for 2FA:**

| Header | Description |
|--------|-------------|
| `Authorization` | `Bearer {interim-token}` from the first request |
| `VerificationCode` | Code received via email or SMS |

## Sandbox vs Production

| Feature | Sandbox | Production |
|---------|---------|------------|
| Real orders | No (paper trading) | Yes |
| Market data | 15-min delayed | Real-time (with entitlements) |
| Account balances | Simulated | Real |
| Rate limits | Same as production | Enforced |
| WebSocket streaming | Available | Available |

We recommend building and testing your integration entirely in sandbox before switching to production. The API interface is identical — only the base URL changes.
