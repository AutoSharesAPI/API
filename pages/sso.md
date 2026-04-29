# Single Sign-On (SSO)

AutoShares supports Single Sign-On integration using the OpenID Connect (OIDC) protocol. SSO allows traders to authenticate through your application's login system and seamlessly access the trading platform without entering credentials again.

## How It Works

1. Trader logs into **your application**
2. Your app redirects to the AutoShares authentication service
3. Trader is authenticated using OIDC
4. AutoShares redirects back to your app with an ID token
5. Trader accesses the trading platform with a single click

## Prerequisites

- Your web application must support redirect-based authentication (OIDC)
- Your application must be registered as an Identity Provider with AutoShares
- You need to provide your OIDC endpoints to the AutoShares integration team

## API Endpoints

All SSO-related API calls route through the AutoShares API proxy:

| Endpoint | URL |
|----------|-----|
| **Authentication (token)** | `https://api.autoshares.dev/token` |
| **Keycloak OIDC Discovery** | Provided during onboarding |
| **Logout** | Provided during onboarding |

## Setup Process

### Step 1: Provide Your Details

Send the following to **support@autoshares.com**:

| Item | Description |
|------|-------------|
| **Login URL** | Your OIDC authorization endpoint |
| **Logout URL** | Your OIDC logout endpoint |
| **Redirect URI** | Where AutoShares redirects after authentication |
| **User Attributes** | Required claims: `sub`, `email`, `firstName`, `lastName`, `roles` |

### Step 2: Receive Configuration

AutoShares will provide:

| Item | Description |
|------|-------------|
| **Client ID** | Your OIDC client identifier |
| **Redirect URI** | The callback URL configured on our side |
| **Keycloak Realm URL** | The OIDC discovery endpoint |
| **SSO Token Endpoint** | `https://api.autoshares.dev/token` |

### Step 3: Configure Your Application

```javascript
const oidcConfig = {
  authority: "https://{keycloak-url}/realms/{realm}",  // Provided by AutoShares
  client_id: "YOUR_CLIENT_ID",                         // Provided by AutoShares
  redirect_uri: "https://yourapp.com/callback",
  response_type: "code",
  scope: "openid profile email",
};
```

### Step 4: Authenticate via API Proxy

After OIDC callback, exchange credentials for a trading token:

```bash
curl -X POST "https://api.autoshares.dev/token" \
  -H "Accept: application/json" \
  -H "Et-App-Key: YOUR_APP_KEY" \
  -H "Username: USER_FROM_OIDC" \
  -H "Password: USER_PASSWORD"
```

```javascript
// After OIDC callback
const idToken = await oidcClient.processSigninResponse();

// Get trading API token through the proxy
const authRes = await fetch("https://api.autoshares.dev/token", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Et-App-Key": "YOUR_APP_KEY",
    "Username": idToken.profile.email,
    "Password": userPassword,
  },
});
const { Token } = await authRes.json();

// Now use Token for all trading API calls
const positions = await fetch("https://api.autoshares.dev/v1.0/accounts/ID/positions", {
  headers: {
    "Authorization": `Bearer ${Token}`,
    "Et-App-Key": "YOUR_APP_KEY",
  },
});
```

## Authentication Flow

```
Your App                    AutoShares SSO               API Proxy
   |                              |                         |
   |-- 1. User logs in ---------->|                         |
   |<- 2. OIDC redirect ---------|                         |
   |-- 3. Auth + credentials ---->|                         |
   |<- 4. ID token --------------|                         |
   |                              |                         |
   |-- 5. POST /token ---------------------------------->  |
   |<- 6. Bearer token ---------------------------------  |
   |                              |                         |
   |-- 7. GET /positions --------------------------------> |
   |<- 8. Data -------------------------------------------  |
```

## Required Claims

| Claim | Type | Description |
|-------|------|-------------|
| `sub` | string | Unique user identifier |
| `email` | string | User's email address |
| `given_name` | string | First name |
| `family_name` | string | Last name |
| `roles` | array | User roles (e.g. `["trader"]`) |

## Logout

```javascript
// Sign out of AutoShares
await fetch("https://api.autoshares.dev/logout", { method: "POST",
  headers: { "Authorization": `Bearer ${token}`, "Et-App-Key": appKey }
});

// Redirect to OIDC logout
window.location.href = `https://{keycloak-url}/realms/{realm}/protocol/openid-connect/logout?redirect_uri=${yourLogoutUrl}`;
```

## Security

- All flows must use HTTPS
- Use PKCE (Proof Key for Code Exchange) for browser-based apps
- All API calls go through `api.autoshares.dev` — never call backend servers directly
- Validate ID tokens server-side before granting access
- Token lifetime: 60 minutes (re-authenticate when expired)

## Need Help?

Contact **support@autoshares.com** with your OIDC configuration details to begin the SSO integration.
