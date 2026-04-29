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

### Step 3: Configure Your Application

Add the AutoShares OIDC configuration to your app:

```javascript
const oidcConfig = {
  authority: "https://{autoshares-keycloak-url}/realms/{realm}",
  client_id: "YOUR_CLIENT_ID",
  redirect_uri: "https://yourapp.com/callback",
  response_type: "code",
  scope: "openid profile email",
};
```

### Step 4: Handle the Callback

After successful authentication, extract the token and redirect to the trading platform:

```javascript
// After OIDC callback
const idToken = await oidcClient.processSigninResponse();

// Redirect to AutoShares trading platform
window.location.href = `https://demo.autoshares.com/sso?token=${idToken}`;
```

## Authentication Flow Diagram

```
Your App                    AutoShares Auth              Trading Platform
   |                              |                            |
   |-- 1. User logs in ---------->|                            |
   |                              |                            |
   |<- 2. Redirect to OIDC ------|                            |
   |                              |                            |
   |-- 3. Auth request ---------->|                            |
   |                              |                            |
   |<- 4. ID token + redirect ---|                            |
   |                              |                            |
   |-- 5. Open Trader App --------|------------>|              |
   |                              |             |-- 6. Access  |
   |                              |             |   granted    |
```

## Required Claims

The ID token must include these claims:

| Claim | Type | Description |
|-------|------|-------------|
| `sub` | string | Unique user identifier |
| `email` | string | User's email address |
| `given_name` | string | First name |
| `family_name` | string | Last name |
| `roles` | array | User roles (e.g. `["trader"]`) |

## Logout

To implement single logout, redirect to the AutoShares logout endpoint:

```
GET https://{autoshares-keycloak-url}/realms/{realm}/protocol/openid-connect/logout?redirect_uri={your-logout-url}
```

## Security Considerations

- All OIDC flows must use HTTPS
- Use PKCE (Proof Key for Code Exchange) for public clients
- Validate ID tokens server-side before granting access
- Store tokens securely — never expose in URLs or localStorage for production
- Set appropriate token lifetimes (recommended: 15 minutes for access tokens)

## Need Help?

Contact **support@autoshares.com** with your OIDC configuration details to begin the SSO integration.
