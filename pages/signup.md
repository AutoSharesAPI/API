# Get API Access

<div id="signup-form-container"></div>

<script>
(function(){
var c=document.getElementById('signup-form-container');
if(!c)return;
c.innerHTML=`
<div style="max-width:520px">
<p style="font-size:15px;color:var(--t2);margin-bottom:24px">Complete this form to create your API sandbox account. You'll receive credentials to start integrating with the AutoShares Trading API immediately.</p>

<form id="api-signup-form" onsubmit="return handleSignup(event)" style="display:flex;flex-direction:column;gap:16px">

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
  <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">First Name *</label>
    <input id="su-first" required style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit" placeholder="Jane">
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Last Name *</label>
    <input id="su-last" required style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit" placeholder="Smith">
  </div>
</div>

<div style="display:flex;flex-direction:column;gap:4px">
  <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Company / Organization</label>
  <input id="su-company" style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit" placeholder="Acme Trading Inc.">
</div>

<div style="display:flex;flex-direction:column;gap:4px">
  <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Email Address * <span style="font-size:10px;color:var(--t5);text-transform:none">(this will be your API username)</span></label>
  <input id="su-email" type="email" required style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit" placeholder="jane@acmetrading.com">
</div>

<div style="display:flex;flex-direction:column;gap:4px">
  <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Password * <span style="font-size:10px;color:var(--t5);text-transform:none">(min 8 chars, 1 uppercase, 1 number)</span></label>
  <input id="su-pass" type="password" required minlength="8" pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}" style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit" placeholder="Min 8 characters">
</div>

<div style="display:flex;flex-direction:column;gap:4px">
  <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Use Case *</label>
  <select id="su-usecase" required style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit;cursor:pointer">
    <option value="">Select your use case...</option>
    <option value="trading-app">Building a trading application</option>
    <option value="algo-trading">Algorithmic / automated trading</option>
    <option value="portfolio-mgmt">Portfolio management tool</option>
    <option value="market-data">Market data integration</option>
    <option value="fintech-platform">Fintech platform / B2B2C</option>
    <option value="ria">RIA / wealth management</option>
    <option value="research">Research / analytics</option>
    <option value="personal">Personal trading project</option>
    <option value="evaluation">Evaluating AutoShares platform</option>
    <option value="other">Other</option>
  </select>
</div>

<div style="display:flex;flex-direction:column;gap:4px">
  <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Which APIs are you interested in?</label>
  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px">
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);cursor:pointer"><input type="checkbox" id="su-api-trading" checked> Trading (Orders, Positions)</label>
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);cursor:pointer"><input type="checkbox" id="su-api-market"> Market Data (Streaming)</label>
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);cursor:pointer"><input type="checkbox" id="su-api-options"> Options</label>
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);cursor:pointer"><input type="checkbox" id="su-api-ach"> ACH / Transfers</label>
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);cursor:pointer"><input type="checkbox" id="su-api-backoffice"> Back Office / Clearing</label>
  </div>
</div>

<div style="display:flex;flex-direction:column;gap:4px">
  <label style="font-size:12px;font-weight:600;color:var(--t4);text-transform:uppercase;letter-spacing:.05em">Expected Monthly API Volume</label>
  <select id="su-volume" style="padding:10px 14px;border:1px solid var(--b1);border-radius:8px;background:var(--bg);color:var(--t1);font-size:14px;font-family:inherit;cursor:pointer">
    <option value="low">Under 10,000 requests</option>
    <option value="medium">10,000 - 100,000 requests</option>
    <option value="high">100,000 - 1,000,000 requests</option>
    <option value="enterprise">1,000,000+ requests</option>
  </select>
</div>

<div style="padding:12px 16px;background:var(--bg2);border-radius:8px;border:1px solid var(--b1)">
  <label style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--t3);cursor:pointer;line-height:1.5">
    <input type="checkbox" id="su-terms" required style="margin-top:3px">
    I agree to the AutoShares <a href="https://autoshares.com/terms" target="_blank" style="color:var(--ac)">Terms of Service</a> and <a href="https://autoshares.com/privacy" target="_blank" style="color:var(--ac)">Privacy Policy</a>. I understand this creates a sandbox account for API testing purposes.
  </label>
</div>

<button type="submit" id="su-submit" style="padding:12px 24px;background:var(--ac);color:#fff;border:0;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .12s">Create API Account</button>

<div id="su-status" style="display:none;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6"></div>

</form>
</div>
`;

// Run form script after DOM insert
var style=document.createElement('style');
style.textContent='#api-signup-form input:focus,#api-signup-form select:focus{border-color:var(--ac);outline:none;box-shadow:0 0 0 3px var(--ac-dim)} #su-submit:hover{filter:brightness(1.08)} #su-submit:disabled{opacity:.5;cursor:not-allowed}';
document.head.appendChild(style);
})();
</script>

## What Happens Next

After submitting the form:

1. **Your sandbox account is created** on demo.autoshares.com with the email and password you provided
2. **You'll receive your Et-App-Key** via email within minutes
3. **Start making API calls** immediately using your credentials

## Your First API Call

Once you have your credentials, authenticate and get a token:

```bash
curl -X POST \
  -H "Accept: application/json" \
  -H "Et-App-Key: YOUR_APP_KEY" \
  -H "Username: YOUR_EMAIL" \
  -H "Password: YOUR_PASSWORD" \
  "https://{your-environment}.etnasoft.us/api/token"
```

Then use the token to get your positions:

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Et-App-Key: YOUR_APP_KEY" \
  "https://{your-environment}.etnasoft.us/api/v1.0/accounts/YOUR_ACCOUNT_ID/positions"
```

## Sandbox Features

| Feature | Included |
|---------|----------|
| Trade Stocks, Options, ETFs, Mutual Funds | Simulated |
| All 103 API endpoints | Full access |
| WebSocket streaming | 15-min delayed |
| Order placement and management | Paper trading |
| Historical chart data | Full access |
| SDK support (Python, JS, C#, Go) | Full access |

## Need Production Access?

When you're ready to go live with real trading, contact **support@autoshares.com** to upgrade to production credentials.

---

&copy; 2026 AutoShares Fintech Solutions, LLC. All rights reserved. AutoShares APIs are provided through AutoShares Fintech Solutions, LLC. Securities offered through Tradepro Securities, Inc., a FINRA/SIPC member broker-dealer. Trading involves risk including the possible loss of principal. Options trading involves substantial risk and is not suitable for all investors. Past performance is not indicative of future results. This site is for informational purposes only and does not constitute an offer to sell or a solicitation to buy any security.
