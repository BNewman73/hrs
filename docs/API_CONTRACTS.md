# API Contracts

## Base URL

- Development: `http://localhost:8080/api`
- Production: `https://api.tbd.com/api` (TBD)

## Common Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

## Authentication Endpoints

[To be defined]

## Room Management Endpoints

[To be defined]

## Booking/Reservation Endpoints

[To be defined]

## Payment Endpoints

[To be defined]
