# Bookings API Documentation

## Overview
The Bookings API provides endpoints for managing photography session bookings. It allows clients to create bookings, retrieve booking information, and check available dates.

## Base URL
```
http://localhost:5000/api/bookings
```

## Endpoints

### 1. Create New Booking
Create a new photography session booking.

**Endpoint:** `POST /api/bookings`

**Request Body:**
```json
{
  "clientName": "string (required)",
  "phone": "string (required)",
  "email": "string (required, valid email format)",
  "sessionType": "string (required, one of: 'newborn', 'toddler', 'kids', 'family')",
  "preferredDate": "date (required, ISO 8601 format)",
  "notes": "string (optional)"
}
```

**Example Request:**
```json
{
  "clientName": "John Doe",
  "phone": "+972-50-123-4567",
  "email": "john.doe@example.com",
  "sessionType": "kids",
  "preferredDate": "2026-03-15",
  "notes": "Prefer morning session"
}
```

**Success Response:**
- **Code:** 201 Created
- **Content:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "clientName": "John Doe",
    "phone": "+972-50-123-4567",
    "email": "john.doe@example.com",
    "sessionType": "kids",
    "preferredDate": "2026-03-15T00:00:00.000Z",
    "notes": "Prefer morning session",
    "status": "pending",
    "createdAt": "2026-02-08T17:00:00.000Z"
  }
}
```

**Error Responses:**
- **Code:** 400 Bad Request
  - When booking date is in the past:
    ```json
    {
      "success": false,
      "message": "Cannot book a date in the past"
    }
    ```
  - When duplicate booking exists:
    ```json
    {
      "success": false,
      "message": "A booking already exists for this email on this date"
    }
    ```
  - When validation fails:
    ```json
    {
      "success": false,
      "message": "Validation error message"
    }
    ```

---

### 2. Get All Bookings
Retrieve all bookings sorted by creation date (newest first).

**Endpoint:** `GET /api/bookings`

**Success Response:**
- **Code:** 200 OK
- **Content:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "clientName": "John Doe",
      "phone": "+972-50-123-4567",
      "email": "john.doe@example.com",
      "sessionType": "kids",
      "preferredDate": "2026-03-15T00:00:00.000Z",
      "notes": "Prefer morning session",
      "status": "pending",
      "createdAt": "2026-02-08T17:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "clientName": "Jane Smith",
      "phone": "+972-50-987-6543",
      "email": "jane.smith@example.com",
      "sessionType": "newborn",
      "preferredDate": "2026-03-20T00:00:00.000Z",
      "notes": "",
      "status": "confirmed",
      "createdAt": "2026-02-07T14:30:00.000Z"
    }
  ]
}
```

**Error Response:**
- **Code:** 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message"
}
```

---

### 3. Get Single Booking
Retrieve a specific booking by ID.

**Endpoint:** `GET /api/bookings/:id`

**URL Parameters:**
- `id` - MongoDB ObjectId of the booking

**Success Response:**
- **Code:** 200 OK
- **Content:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "clientName": "John Doe",
    "phone": "+972-50-123-4567",
    "email": "john.doe@example.com",
    "sessionType": "kids",
    "preferredDate": "2026-03-15T00:00:00.000Z",
    "notes": "Prefer morning session",
    "status": "pending",
    "createdAt": "2026-02-08T17:00:00.000Z"
  }
}
```

**Error Responses:**
- **Code:** 404 Not Found
```json
{
  "success": false,
  "message": "Booking not found"
}
```
- **Code:** 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message"
}
```

---

### 4. Get Available Dates
Retrieve dates that already have bookings (to display as unavailable).

**Endpoint:** `GET /api/bookings/available-dates`

**Success Response:**
- **Code:** 200 OK
- **Content:**
```json
{
  "success": true,
  "data": [
    "2026-03-15",
    "2026-03-20",
    "2026-03-25"
  ]
}
```

**Notes:**
- Returns dates in YYYY-MM-DD format
- Only includes dates with non-cancelled bookings
- Use this endpoint to disable booked dates in the calendar UI

**Error Response:**
- **Code:** 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Session Types
The API supports the following session types:
- `newborn` - Newborn photography sessions
- `toddler` - Toddler photography sessions
- `kids` - Kids photography sessions
- `family` - Family photography sessions

## Booking Status
Bookings can have the following statuses:
- `pending` - Default status for new bookings
- `confirmed` - Booking has been confirmed by the photographer
- `cancelled` - Booking has been cancelled

## Validation Rules
1. **Client Name:** Required, trimmed string
2. **Phone:** Required, string format
3. **Email:** Required, must be valid email format (lowercase)
4. **Session Type:** Required, must be one of the allowed types
5. **Preferred Date:** Required, cannot be in the past
6. **Duplicate Prevention:** Same email cannot book the same date twice

## Error Handling
All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP status codes used:
- `200` - Success
- `201` - Resource created successfully
- `400` - Bad request / Validation error
- `404` - Resource not found
- `500` - Internal server error

## CORS Configuration
The API is configured to accept cross-origin requests from the frontend client.

## Future Enhancements (Phase 2)
- Authentication and authorization for admin endpoints
- Update and delete booking endpoints
- Booking confirmation emails
- Payment integration
