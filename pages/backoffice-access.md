# Request Back Office API Access

Back Office API access is restricted to authorized integrators, broker-dealers, and institutional partners. Complete this form to request access.

<div id="bo-signup-container"></div>

## What You'll Receive

Once approved, our team will provide:

| Item | Description |
|------|-------------|
| **API Subscription Key** | `Ocp-Apim-Subscription-Key` header value |
| **Correspondent Code** | Your `Corr` identifier (e.g. TPRO) |
| **Office Code** | Your `Office` identifier (e.g. 001) |
| **Account Numbers** | Assigned test account numbers (8-digit) |
| **Base URL** | Your clearing host endpoint |
| **IP Allowlist Confirmation** | Your public IPs added to the firewall |

## Requirements

- Your organization must be a registered broker-dealer, RIA, or authorized fintech partner
- A signed API agreement is required before credentials are issued
- Source IP addresses must be provided for allowlisting
- All API traffic must use HTTPS/TLS

## Back Office API Capabilities

| Category | Endpoints | What You Can Do |
|----------|-----------|-----------------|
| **Accounts** | 12 | Open accounts, run CIP/IDV checks, manage beneficiaries |
| **Balances** | 3 | Real-time balances, money line, account values |
| **Trading** | 8 | Submit and cancel orders (stocks, options, mutual funds) |
| **Cashiering** | 16 | ACH/Wire profiles, deposits, withdrawals |
| **Positions** | 1 | Clearing-level settled positions |
| **Transactions** | 3 | Full transaction ledger |
| **Transfers** | 2 | ACATS account transfers (full and partial) |
| **Risk/Margin** | 3 | House margin, Reg-T margin, margin calls |
| **Reports** | 2 | Statements, confirms, tax documents |
| **Instrument Data** | 3 | Security master, mutual fund master, easy-to-borrow |
| **Corporate Actions** | 2 | Dividends, reorganizations |

## Onboarding Timeline

| Step | Timeline |
|------|----------|
| Application review | 1-2 business days |
| API agreement signing | 1-3 business days |
| Credential provisioning | Same day after agreement |
| UAT testing | At your pace |
| Production go-live | Upon completion of UAT certification |

## Questions?

Contact **support@autoshares.com** or use the form above.
