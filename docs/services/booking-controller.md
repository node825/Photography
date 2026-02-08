# Booking Controller Service Documentation

## Overview
The Booking Controller is the service layer that handles all business logic for booking operations. It acts as an intermediary between the API routes and the database models.

**Location:** `server/controllers/bookingController.js`

## Functions

### createBooking
Creates a new booking in the database with validation.

**Signature:**
```javascript
const createBooking = async (req, res) => { ... }
```

**Parameters:**
- `req` (Request) - Express request object containing booking data in body
- `res` (Response) - Express response object

**Request Body Fields:**
- `clientName` (string, required) - Client's full name
- `phone` (string, required) - Client's phone number
- `email` (string, required) - Client's email address
- `sessionType` (string, required) - Type of photography session
- `preferredDate` (date, required) - Preferred session date
- `notes` (string, optional) - Additional notes from client

**Business Logic:**
1. Extracts booking data from request body
2. Validates that the preferred date is not in the past
3. Creates booking in database
4. Handles duplicate booking errors (same email + date combination)

**Response:**
- **Success (201):**
  ```javascript
  {
    success: true,
    data: bookingObject
  }
  ```
- **Validation Error (400):**
  ```javascript
  {
    success: false,
    message: 'Cannot book a date in the past'
  }
  ```
- **Duplicate Error (400):**
  ```javascript
  {
    success: false,
    message: 'A booking already exists for this email on this date'
  }
  ```

**Error Handling:**
- Validates date is not in the past by comparing with today's date (time reset to 00:00:00)
- Catches MongoDB duplicate key error (code 11000) for duplicate bookings
- Returns appropriate error messages for all failure cases

---

### getAllBookings
Retrieves all bookings from the database.

**Signature:**
```javascript
const getAllBookings = async (req, res) => { ... }
```

**Parameters:**
- `req` (Request) - Express request object
- `res` (Response) - Express response object

**Business Logic:**
1. Queries database for all bookings
2. Sorts results by creation date (newest first)
3. Returns count and data array

**Response:**
- **Success (200):**
  ```javascript
  {
    success: true,
    count: numberOfBookings,
    data: [bookingObjects]
  }
  ```
- **Error (500):**
  ```javascript
  {
    success: false,
    message: errorMessage
  }
  ```

**Notes:**
- Currently public access (will be protected in Phase 2)
- Returns all bookings without pagination (consider adding pagination for large datasets)

---

### getBooking
Retrieves a single booking by its MongoDB ObjectId.

**Signature:**
```javascript
const getBooking = async (req, res) => { ... }
```

**Parameters:**
- `req` (Request) - Express request object with `id` parameter
- `res` (Response) - Express response object

**URL Parameters:**
- `id` - MongoDB ObjectId string

**Business Logic:**
1. Extracts booking ID from URL parameters
2. Queries database using `findById`
3. Returns 404 if booking not found
4. Returns booking data if found

**Response:**
- **Success (200):**
  ```javascript
  {
    success: true,
    data: bookingObject
  }
  ```
- **Not Found (404):**
  ```javascript
  {
    success: false,
    message: 'Booking not found'
  }
  ```
- **Error (500):**
  ```javascript
  {
    success: false,
    message: errorMessage
  }
  ```

---

### getAvailableDates
Returns dates that have existing (non-cancelled) bookings.

**Signature:**
```javascript
const getAvailableDates = async (req, res) => { ... }
```

**Parameters:**
- `req` (Request) - Express request object
- `res` (Response) - Express response object

**Business Logic:**
1. Queries bookings with status not equal to 'cancelled'
2. Extracts only the `preferredDate` field
3. Maps dates to ISO string format (YYYY-MM-DD)
4. Returns array of booked dates

**Response:**
- **Success (200):**
  ```javascript
  {
    success: true,
    data: ['2026-03-15', '2026-03-20', ...]
  }
  ```
- **Error (500):**
  ```javascript
  {
    success: false,
    message: errorMessage
  }
  ```

**Implementation Details:**
- Uses MongoDB query: `{ status: { $ne: 'cancelled' } }`
- Uses `.select('preferredDate')` for optimal query performance
- Formats dates using `toISOString().split('T')[0]` to get YYYY-MM-DD format

**Use Case:**
This endpoint is used by the frontend calendar to disable already-booked dates, preventing double bookings.

---

## Exports
```javascript
module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  getAvailableDates
};
```

## Dependencies
- `Booking` model from `../models/Booking`
- Mongoose for database operations

## Error Handling Strategy
All controller functions follow a consistent error handling pattern:
1. Wrap operations in try-catch blocks
2. Return standardized error responses with `success: false`
3. Use appropriate HTTP status codes
4. Provide meaningful error messages to clients

## Future Enhancements
- Add authentication middleware for protected routes
- Implement booking update functionality
- Add booking cancellation endpoint
- Implement pagination for `getAllBookings`
- Add filtering and search capabilities
- Send email notifications on booking creation/confirmation
