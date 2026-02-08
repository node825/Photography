# API Documentation

This directory contains documentation for all server API endpoints.

## API Endpoints

### Bookings API

| Endpoint | Method | Description |
|----------|--------|-------------|
| [POST /api/bookings](./bookings-create.md) | POST | Create a new booking |
| [GET /api/bookings](./bookings-list.md) | GET | List all bookings |
| [GET /api/bookings/:id](./bookings-get.md) | GET | Get a specific booking by ID |
| [PUT /api/bookings/:id](./bookings-update.md) | PUT | Update a booking |
| [DELETE /api/bookings/:id](./bookings-delete.md) | DELETE | Delete a booking |

### Health Check

| Endpoint | Method | Description |
|----------|--------|-------------|
| GET /api/health | GET | Server health check |

## Creating New API Documentation

When adding a new API endpoint:

1. Create a new `.md` file with a descriptive name (e.g., `endpoint-name.md`)
2. Use the [API Endpoint Template](../../.github/skills/documentation-writer/references/api-endpoint-template.md)
3. Fill in all required sections:
   - Endpoint Definition
   - Request (headers, parameters, body)
   - Response (success and error cases)
   - Implementation Details
   - Code Examples (both client and server)
   - Dependencies
4. Add a link to the endpoint in this README.md file in the appropriate section

## API Structure

All APIs follow a consistent response structure:

### Success Response

```json
{
  "data": { /* response data */ },
  "message": "Optional success message",
  "success": true
}
```

### Error Response

```json
{
  "error": "Error description",
  "details": "Optional detailed message",
  "success": false
}
```

## Common Response Codes

- **200 OK** - Request succeeded
- **201 Created** - Resource created successfully
- **400 Bad Request** - Validation failed or invalid input
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server error

## Authentication

[Add authentication details if applicable]

## Rate Limiting

[Add rate limiting info if applicable]

## Environment

**Development**: `http://localhost:5000/api`
**Production**: [Add production URL]

---

For more information, see the [documentation-writer skill](.github/skills/documentation-writer/SKILL.md).
