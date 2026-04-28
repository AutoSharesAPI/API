# Get Token

`POST /token`

Authentication method that provides a token to access the API.

## Parameters

| Type | Name | Description | Schema | Default |
|------|------|-------------|--------|---------|
| **Header** | **Authorization** *(optional)* | Authorization token, required on every step except first | string | `""` |
| **Header** | **Et-App-Key** *(required)* | Application key | string | |
| **Header** | **Password** *(optional)* | User password, required | string | `"testpassword"` |
| **Header** | **PinCode** *(optional)* | User pin code, on demand | string | `""` |
| **Header** | **Username** *(optional)* | User login, required | string | `"testusername"` |
| **Header** | **VerificationCode** *(optional)* | User verification code, on demand | string | `""` |

## Responses

| HTTP Code | Description | Schema |
|-----------|-------------|--------|
| **200** | Authentication complete and token is ready to use. | No Content |
| **202** | Several authentication steps are passed, but server is expecting additional parameters. Use the token from response and provide correct additional data to complete authentication. | No Content |
| **401** | Authentication parameters determined as incorrect. | No Content |

## Response Fields

- `State` — Authentication state (`Succeeded`, `Expecting`, `Failed`)
- `Step` — Current authentication step (e.g. `SecurityPin`)
- `Reason` — Failure/pending reason description
- `Token` — Bearer token for subsequent API calls

## Example Responses

### Response 200 — Success

```json
{
  "State": "Succeeded",
  "Token": "VGhpcyBpcyBleGFtcGxlIHRva2Vu..."
}
```

### Response 202 — Additional Auth Required

```json
{
  "Step": "SecurityPin",
  "Reason": "Invalid pin",
  "State": "Expecting",
  "Token": "VGhpcyBpcyBleGFtcGxlIHRva2Vu...."
}
```

### Response 401 — Authentication Failed

```json
{
  "State": "Failed",
  "Step": "SecurityPin",
  "Reason": "Invalid pin"
}
```
