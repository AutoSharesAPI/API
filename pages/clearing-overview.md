# Back Office API (Private)

## Overview

The AutoShares Back Office API provides direct access to clearing-level operations through our back office host. This API is available only to authorized integrators and partners.

**Access is restricted.** Contact your AutoShares representative to request Back Office API credentials.

## Capabilities

| Category | Endpoints | Description |
|----------|-----------|-------------|
| **Accounts** | 12 | Create, update, close accounts. Get CIP, beneficiaries, P&L. |
| **Balances** | 3 | Real-time balances, money line, account values |
| **Positions** | 1 | Clearing-level settled positions |
| **Trading** | 8 | Submit and cancel orders (stocks, options, mutual funds) |
| **Cashiering** | 16 | ACH/Wire profiles and transfer requests |
| **Transfers** | 2 | ACATS account transfers (full and partial) |
| **Transactions** | 3 | Transaction ledger, journal entries |
| **Reports** | 2 | Statements, confirms, tax documents |
| **Risk/Margin** | 3 | House margin, Reg-T margin, margin calls |
| **Instrument Data** | 3 | Security master, mutual fund master, easy-to-borrow |
| **Corporate Actions** | 2 | Dividends, reorganizations |
| **System** | 1 | Platform status check |

**Total: 60 endpoints**

## Authentication

The Back Office API uses an API Management subscription key:

```
Ocp-Apim-Subscription-Key: {your-clearing-api-key}
```

All requests also require correspondent and office identifiers as query parameters:

```
?Corr={correspondent}&Office={office}
```

These credentials are provided during onboarding. The API uses source-IP allowlisting in addition to the API key.

## Base URL

Your Back Office API base URL is provided during onboarding:

```
https://{clearing-host}/
```

## Request Access

To obtain Back Office API credentials:

1. Contact your AutoShares account representative
2. Provide the public IP addresses that will access the API
3. Specify which account numbers need access
4. Sign the Back Office API addendum

Once approved, you will receive:
- API subscription key
- Correspondent and office codes
- Account number assignments
- IP allowlist confirmation

**Email:** support@autoshares.com
