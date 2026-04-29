# Pagination

## Overview

Endpoints that return lists of items (orders, positions, transactions, securities) support pagination to manage large result sets efficiently.

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pageNumber` | integer | `0` | Zero-based page index |
| `pageSize` | integer | `10` | Number of items per page (max 100) |
| `sortField` | string | varies | Field to sort by (e.g., `Id`, `Date`, `Symbol`) |
| `desc` | boolean | `true` | Sort descending when `true` |

## Example Request

```
GET /v1.0/accounts/{accountId}/orders?pageNumber=0&pageSize=25&sortField=Date&desc=true
```

## Response Structure

Paginated responses include the items array and metadata:

```json
{
  "Result": [
    { "Id": 80328, "Symbol": "AAPL", "Side": "Buy", ... },
    { "Id": 80327, "Symbol": "TSLA", "Side": "Sell", ... }
  ],
  "NextPageLink": "/v1.0/accounts/6303/orders?pageNumber=1&pageSize=25",
  "PreviousPageLink": null,
  "TotalCount": 142
}
```

| Field | Description |
|-------|-------------|
| `Result` | Array of items for the current page |
| `NextPageLink` | URL for the next page (`null` if last page) |
| `PreviousPageLink` | URL for the previous page (`null` if first page) |
| `TotalCount` | Total number of items across all pages |

## Iterating Through All Pages

```python
def get_all_orders(base_url, account_id, headers):
    all_orders = []
    page = 0
    page_size = 100
    
    while True:
        response = requests.get(
            f"{base_url}/v1.0/accounts/{account_id}/orders",
            headers=headers,
            params={"pageNumber": page, "pageSize": page_size, "sortField": "Date", "desc": True}
        )
        data = response.json()
        
        items = data if isinstance(data, list) else data.get("Result", [])
        all_orders.extend(items)
        
        # Check if there are more pages
        if len(items) < page_size:
            break
        page += 1
    
    return all_orders
```

```javascript
async function getAllOrders(baseUrl, accountId, headers) {
  const allOrders = [];
  let page = 0;
  const pageSize = 100;

  while (true) {
    const params = new URLSearchParams({
      pageNumber: page, pageSize, sortField: 'Date', desc: true
    });
    const res = await fetch(
      `${baseUrl}/v1.0/accounts/${accountId}/orders?${params}`,
      { headers }
    );
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.Result || []);
    allOrders.push(...items);

    if (items.length < pageSize) break;
    page++;
  }

  return allOrders;
}
```

## Endpoints Supporting Pagination

- `GET /v1.0/accounts/{accountId}/orders` — Order history
- `GET /v1.0/accounts/{accountId}/positions` — Positions
- `GET /v1.0/accounts/{accountId}/transactions` — Transaction ledger
- `GET /v1.0/equities` — Filtered equities search
- `GET /v1.0/options` — Filtered options search
- `GET /v1.0/users/{userId}/watchlists` — Watchlists
- `GET /v1.0/users/{userId}/pricealerts` — Price alerts

## Best Practices

- **Use reasonable page sizes.** Default is 10, max is 100. Use 50-100 for bulk data retrieval, 10-25 for UI pagination.
- **Sort consistently.** Always specify `sortField` and `desc` to get predictable ordering.
- **Don't fetch all pages at once.** For UI pagination, fetch one page at a time as the user navigates.
- **Cache total count.** `TotalCount` doesn't change between pages in the same session — read it from the first response.
