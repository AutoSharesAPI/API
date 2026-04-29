# Get API Access

## Step 1: Create Your Trading Account

Before using the AutoShares API, you need a trading account on our demo platform. This gives you a username, password, and access to the sandbox environment for testing.

**[Create Your Account on demo.autoshares.com →](https://demo.autoshares.com)**

During registration you will:

- Choose a **username** and **password** (these are your API credentials)
- Get access to the web trading terminal
- Receive a sandbox trading account with simulated funds

## Step 2: Get Your Application Key

After creating your account, you need an **Et-App-Key** to authenticate API requests. This key identifies your application.

Contact AutoShares to receive your application key:

- **Email:** support@autoshares.com
- **Subject:** API Application Key Request
- **Include:** Your username and intended use case

## Step 3: Authenticate

Use your credentials to get a Bearer token:

```bash
curl -X POST \
  --header 'Accept: application/json' \
  --header 'Et-App-Key: YOUR_APP_KEY' \
  --header 'Username: YOUR_USERNAME' \
  --header 'Password: YOUR_PASSWORD' \
  'https://{your-environment}.etnasoft.us/api/token'
```

**Response:**

```json
{
  "State": "Succeeded",
  "Token": "VGhpcyBpcyBleGFtcGxlIHRva2Vu..."
}
```

Use this token in all subsequent API requests:

```
Authorization: Bearer VGhpcyBpcyBleGFtcGxlIHRva2Vu...
```

## Step 4: Make Your First API Call

Try fetching your account positions:

```bash
curl -X GET \
  --header 'Accept: application/json' \
  --header 'Et-App-Key: YOUR_APP_KEY' \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  'https://{your-environment}.etnasoft.us/api/v1.0/accounts/YOUR_ACCOUNT_ID/positions'
```

## What You Get

| Feature | Demo / Sandbox | Production |
|---------|---------------|------------|
| Trade Stocks, Options, ETFs, Mutual Funds | Simulated | Live |
| Real-time streaming quotes | 15-min delayed | Real-time |
| Order placement and management | Paper trading | Real orders |
| Full API access (103 endpoints) | Yes | Yes |
| WebSocket streaming | Yes | Yes |

## Ready for Production?

When your integration is tested and ready for live trading:

1. Contact your AutoShares representative
2. Complete the production onboarding process
3. Receive your production base URL and credentials
4. Switch your base URL — the API interface is identical

**Email:** support@autoshares.com

---

© 2026 AutoShares Fintech Solutions, LLC. All rights reserved.

AutoShares APIs are provided through AutoShares Fintech Solutions, LLC. Securities offered through Tradepro Securities, Inc., a FINRA/SIPC member broker-dealer. Trading involves risk including the possible loss of principal. Options trading involves substantial risk and is not suitable for all investors. Past performance is not indicative of future results. This site is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any security.
