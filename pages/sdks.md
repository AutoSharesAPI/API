# SDKs & Libraries

## Official SDKs

AutoShares provides official client libraries to simplify API integration. SDKs handle authentication, request/response serialization, error handling, and pagination automatically.

### TypeScript / JavaScript

```bash
npm install @autoshares/api
```

```typescript
import { AutoSharesClient } from "@autoshares/api";

const client = new AutoSharesClient({
  baseUrl: "https://{your-environment}.etnasoft.us/api",
  appKey: "your-et-app-key",
});

// Authenticate
const token = await client.login.getToken({
  username: "your-username",
  password: "your-password",
});

// Place an order
const order = await client.orders.placeOrder("6303", {
  symbol: "AAPL",
  type: "Limit",
  side: "Buy",
  quantity: 100,
  price: 180,
});

// Get positions
const positions = await client.positions.getPositions("6303");
```

### Python

```bash
pip install autoshares
```

```python
from autoshares import AutoSharesClient

client = AutoSharesClient(
    base_url="https://{your-environment}.etnasoft.us/api",
    app_key="your-et-app-key",
)

# Authenticate
token = client.login.get_token(
    username="your-username",
    password="your-password",
)

# Place an order
order = client.orders.place_order(
    account_id="6303",
    symbol="AAPL",
    type="Limit",
    side="Buy",
    quantity=100,
    price=180,
)

# Get positions
positions = client.positions.get_positions(account_id="6303")
```

### Go

```bash
go get github.com/autoshares/autoshares-go
```

```go
package main

import (
    "context"
    "fmt"
    autoshares "github.com/autoshares/autoshares-go"
)

func main() {
    client := autoshares.NewClient(
        autoshares.WithBaseURL("https://{your-environment}.etnasoft.us/api"),
        autoshares.WithAppKey("your-et-app-key"),
    )

    // Authenticate
    token, err := client.Login.GetToken(context.Background(), &autoshares.GetTokenRequest{
        Username: "your-username",
        Password: "your-password",
    })

    // Place an order
    order, err := client.Orders.PlaceOrder(context.Background(), "6303", &autoshares.PlaceOrderRequest{
        Symbol:   "AAPL",
        Type:     "Limit",
        Side:     "Buy",
        Quantity: 100,
        Price:    180,
    })

    fmt.Println(order.Id, order.Status)
}
```

## OpenAPI Specification

Download the AutoShares OpenAPI specification to generate your own client or import into tools like Postman:

- **Trading API (OpenAPI 2.0):** Available at `{baseURL}/reference/schema/v1`
- **Format:** JSON (Swagger 2.0)

### Import into Postman

1. Open Postman and click **Import**
2. Select **Link** and enter your base URL + `/reference/schema/v1`
3. Postman will generate a complete collection with all endpoints
4. Set the `Et-App-Key` and `Authorization` variables in your environment

## Community & Support

- **API Documentation:** https://documentation.autoshares.dev
- **Support Email:** support@autoshares.com
- **Status Page:** Contact support for platform status updates
