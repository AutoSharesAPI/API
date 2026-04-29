# Error Codes & Troubleshooting

## HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| `200` | Success | Request completed. Note: order placement returns 200 even if the order is later rejected — monitor `Status` field. |
| `202` | Accepted / Pending | Used during 2FA authentication. Provide the verification code to complete. |
| `400` | Bad Request | Invalid parameters. Check the request body and query parameters. |
| `401` | Unauthorized | Token expired or invalid. Request a new token via `POST /token`. |
| `403` | Forbidden | Insufficient permissions. The user may not have access to this account or endpoint. |
| `404` | Not Found | The resource (order, position, account) does not exist. |
| `409` | Conflict | The operation conflicts with current state (e.g., cancelling an already-filled order). |
| `422` | Unprocessable | The request is well-formed but contains invalid data (e.g., invalid symbol, bad price). |
| `429` | Rate Limited | Too many requests. Back off and retry after the `Retry-After` header interval. |
| `500` | Server Error | Internal error. Retry with exponential backoff. If persistent, contact support. |

## Order Error Descriptions

When placing or validating an order, the response includes an `ErrorDescription` field if something is wrong:

| ErrorDescription | Cause | Fix |
|-----------------|-------|-----|
| `DayTradingBuyingPowerExceeded` | Order value exceeds available buying power | Reduce quantity or deposit funds |
| `QuotePriceIsInvalid` | Missing or invalid limit/stop price | Specify `Price` for limit orders, `StopPrice` for stop orders |
| `InsufficientShares` | Selling more shares than held | Check position quantity before selling |
| `SymbolNotFound` | Ticker symbol doesn't exist | Verify symbol using the Securities lookup endpoint |
| `MarketClosed` | Placing a Day order outside market hours | Use `ExtendedHours` parameter or switch to GTC |
| `AccountRestricted` | Account has a trading restriction | Contact support to resolve account status |
| `InvalidOrderType` | Order type not supported for this security | Check allowed order types for the security |

## Authentication Errors

| Scenario | Status | Response |
|----------|--------|----------|
| Wrong Et-App-Key | 401 | `{"error": "Application key is not defined or does not exist"}` |
| Wrong credentials | 401 | `{"State": "Failed", "Reason": "Invalid credentials"}` |
| Expired token | 401 | `{"Message": "Authorization has been denied for this request."}` |
| Wrong account ID | 500 | `{"message": "An error occurred while processing your request"}` |
| Other user's account | 401 | `{"Message": "Authorization has been denied for this request."}` |

## Common Mistakes

**Using user ID instead of account ID:** The order placement endpoint requires a trading account ID (numeric), not the user ID. These are different values. Use `GET /v1.0/users/{userId}/accounts` to get the account ID.

**Missing Et-App-Key:** Every request must include the `Et-App-Key` header. This is your application identifier, not the user's credentials.

**Limit orders without price:** Limit and StopLimit orders require the `Price` field. Stop and StopLimit orders require the `StopPrice` field. Omitting these returns `QuotePriceIsInvalid`.

**Market orders with GTC:** Market orders cannot use `GoodTillCancel` or `GoodTillDate` time-in-force. Use `Day` for market orders.

## Retry Strategy

For transient errors (429, 500, 502, 503, 504):

```python
import time
import requests

def api_request(url, headers, max_retries=3):
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers)
        
        if response.status_code == 429:
            wait = int(response.headers.get('Retry-After', 2 ** attempt))
            time.sleep(wait)
            continue
        
        if response.status_code >= 500:
            time.sleep(2 ** attempt)  # Exponential backoff
            continue
        
        return response
    
    raise Exception(f"Failed after {max_retries} retries")
```

For authentication errors (401), do not retry — request a new token instead.
