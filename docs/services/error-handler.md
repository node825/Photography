# Error Handler Middleware Documentation

## Overview
The Error Handler Middleware provides centralized error handling for the Express application. It catches and processes all errors that occur during request processing, ensuring consistent error responses.

**Location:** `server/middleware/errorHandler.js`

## Function

### errorHandler
Express error handling middleware that processes all application errors.

**Signature:**
```javascript
const errorHandler = (err, req, res, next) => { ... }
```

**Parameters:**
- `err` (Error) - Error object thrown or passed to next()
- `req` (Request) - Express request object
- `res` (Response) - Express response object
- `next` (NextFunction) - Express next middleware function (unused)

## Implementation

### Error Logging
```javascript
console.error(err.stack);
```
- Logs full error stack trace to console
- Helps with debugging and troubleshooting
- Should be replaced with proper logging service in production

### Error Response
```javascript
res.status(err.statusCode || 500).json({
  success: false,
  message: err.message || 'Server Error'
});
```

**Response Structure:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

**Status Code Logic:**
- Uses `err.statusCode` if provided by the error object
- Defaults to `500` (Internal Server Error) if not specified
- Allows custom errors to define their own status codes

**Message Logic:**
- Uses `err.message` if available
- Defaults to generic 'Server Error' message
- Prevents exposing sensitive error details

## Usage

### In server.js
```javascript
const errorHandler = require('./middleware/errorHandler');

// ... other middleware and routes ...

// Error handler middleware (must be last)
app.use(errorHandler);
```

**Important:** Error handler must be registered **after** all routes to catch errors from any endpoint.

## Error Flow

### 1. Synchronous Errors
```javascript
app.get('/api/example', (req, res) => {
  throw new Error('Something went wrong');
  // Error caught by Express and passed to errorHandler
});
```

### 2. Asynchronous Errors
```javascript
app.get('/api/example', async (req, res, next) => {
  try {
    await someAsyncOperation();
  } catch (error) {
    next(error); // Pass error to errorHandler
  }
});
```

### 3. Custom Status Code Errors
```javascript
const error = new Error('Resource not found');
error.statusCode = 404;
next(error);

// Results in:
// Status: 404
// Body: { success: false, message: 'Resource not found' }
```

## Error Types Handled

### 1. Validation Errors
```javascript
// Example: Mongoose validation error
{
  statusCode: 400,
  message: 'Validation failed: email is required'
}
```

### 2. Not Found Errors
```javascript
{
  statusCode: 404,
  message: 'Resource not found'
}
```

### 3. Database Errors
```javascript
// Example: MongoDB connection error
{
  statusCode: 500,
  message: 'Database connection failed'
}
```

### 4. Generic Server Errors
```javascript
{
  statusCode: 500,
  message: 'Server Error'
}
```

## Example Error Scenarios

### Scenario 1: Controller Error
```javascript
// In controller
const booking = await Booking.findById(req.params.id);
if (!booking) {
  const error = new Error('Booking not found');
  error.statusCode = 404;
  throw error;
}

// ErrorHandler response:
// Status: 404
// Body: { success: false, message: 'Booking not found' }
```

### Scenario 2: Uncaught Exception
```javascript
// Somewhere in the code
undefined.someMethod(); // TypeError

// ErrorHandler response:
// Status: 500
// Body: { success: false, message: 'Cannot read property of undefined' }
```

### Scenario 3: Database Error
```javascript
// Database connection fails
await mongoose.connect(invalidUri);

// ErrorHandler response:
// Status: 500
// Body: { success: false, message: 'Connection string is invalid' }
```

## Best Practices

### 1. Always Use Try-Catch in Async Routes
```javascript
// Good ✓
router.get('/bookings', async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
});

// Bad ✗ - Unhandled promise rejection
router.get('/bookings', async (req, res) => {
  const bookings = await Booking.find(); // Error not caught
  res.json({ success: true, data: bookings });
});
```

### 2. Create Custom Error Classes
```javascript
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

// Usage
throw new NotFoundError('Booking not found');
```

### 3. Add Context to Errors
```javascript
try {
  await processBooking(id);
} catch (error) {
  error.context = { bookingId: id };
  next(error);
}
```

## Production Considerations

### 1. Error Logging
Replace `console.error` with proper logging:
```javascript
// Use logging service like Winston, Bunyan, or cloud logging
logger.error({
  message: err.message,
  stack: err.stack,
  statusCode: err.statusCode,
  timestamp: new Date(),
  requestId: req.id,
  url: req.url,
  method: req.method
});
```

### 2. Sensitive Information
```javascript
// Don't expose in production
const isDevelopment = process.env.NODE_ENV === 'development';

res.status(err.statusCode || 500).json({
  success: false,
  message: err.message || 'Server Error',
  ...(isDevelopment && { stack: err.stack }) // Only in development
});
```

### 3. Error Monitoring
Integrate error tracking services:
- Sentry
- Rollbar
- New Relic
- CloudWatch (AWS)

```javascript
const Sentry = require('@sentry/node');

const errorHandler = (err, req, res, next) => {
  // Log to console
  console.error(err.stack);
  
  // Send to Sentry
  Sentry.captureException(err);
  
  // Send response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};
```

## Integration Points

### With Controllers
Controllers throw or pass errors:
```javascript
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      const error = new Error('Booking not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    next(error); // Handled by errorHandler
  }
};
```

### With Validation Middleware
```javascript
const validateBooking = (req, res, next) => {
  if (!req.body.clientName) {
    const error = new Error('Client name is required');
    error.statusCode = 400;
    return next(error);
  }
  next();
};
```

## Limitations

### Current Limitations
1. No differentiation between error types
2. Limited error context
3. Console-only logging
4. No error categorization
5. No retry logic

### Future Enhancements
1. Add structured logging with Winston
2. Implement error categorization
3. Add request ID tracking
4. Integrate with monitoring services
5. Add custom error classes
6. Implement error aggregation
7. Add error rate limiting
8. Create error documentation endpoint

## Export
```javascript
module.exports = errorHandler;
```

## Dependencies
- Express framework (built-in error handling mechanism)

## Related Documentation
- [Booking Controller Service](./booking-controller.md)
- [Bookings API](../api/bookings-api.md)
