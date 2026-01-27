# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in the server directory.

## Quick Start

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:5000`

## Development Commands

```bash
# Development (auto-reload with nodemon)
npm run dev

# Production mode
npm start

# Test (currently not configured)
npm test
```

## Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection logic
├── controllers/
│   └── bookingController.js   # Business logic for bookings
├── middleware/
│   └── errorHandler.js    # Centralized error handling
├── models/
│   └── Booking.js         # MongoDB schema
├── routes/
│   └── bookings.js        # Express route handlers
├── server.js              # Application entry point
├── .env                   # Local config (not tracked)
├── .env.example           # Config template
└── package.json           # Dependencies & scripts
```

## API Endpoints

All endpoints are prefixed with `/api`:

| Method | Endpoint | Controller | Description |
|--------|----------|-----------|-------------|
| GET | `/health` | Built-in | Server health check |
| GET | `/bookings` | `getAllBookings` | Get all bookings (newest first) |
| POST | `/bookings` | `createBooking` | Create new booking |
| GET | `/bookings/:id` | `getBooking` | Get booking by ID |
| GET | `/bookings/available-dates` | `getAvailableDates` | Get dates with bookings |

## Database Schema (Booking)

```javascript
{
  clientName: String,           // Required, trimmed
  phone: String,                // Required
  email: String,                // Required, lowercase, validated
  sessionType: String,          // Enum: 'newborn', 'toddler', 'kids', 'family'
  preferredDate: Date,          // Required
  notes: String,                // Optional, default: ''
  status: String,               // Enum: 'pending', 'confirmed', 'cancelled'
  createdAt: Date               // Auto-set
}
```

**Unique Index**: `{ email: 1, preferredDate: 1 }` prevents duplicate bookings.

## Environment Configuration

Create a `.env` file in the server directory:

```
MONGODB_URI=mongodb://localhost:27017/photography
PORT=5000
NODE_ENV=development
```

- `MONGODB_URI` - Optional in dev. Server runs without DB if not set.
- `PORT` - Defaults to 5000
- `NODE_ENV` - Set to 'development' or 'production'

## Architecture Patterns

### Error Handling

Errors are caught at multiple levels:

1. **Route handlers** - Validate inputs, return appropriate status codes
2. **Controllers** - Business logic error handling
3. **Middleware** - Centralized error response formatting

Response format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Controller Pattern

Controllers follow this structure:
- Accept request, response, and next
- Validate inputs
- Interact with models
- Handle errors with appropriate status codes
- Return JSON responses with consistent format

Example:
```javascript
const createBooking = async (req, res, next) => {
  try {
    // Validation
    // Model operation
    // Response
  } catch (error) {
    next(error); // Pass to error handler
  }
};
```

## Key Implementation Details

### Booking Creation

- Validates that `preferredDate` is not in the past
- MongoDB unique index prevents duplicate (email + date) entries
- Returns 201 on success, 400 on validation errors
- Duplicate booking attempts return 400 with error message

### Available Dates

- Returns list of dates with non-cancelled bookings
- Filters out cancelled bookings
- Dates formatted as ISO strings (YYYY-MM-DD)

### Database Connection

- Connection attempt is made at startup
- Server continues running even if DB connection fails
- Graceful degradation: endpoints work without database for development

## Adding New Endpoints

1. **Create route** in `routes/bookings.js` (or new file)
   ```javascript
   router.get('/new-endpoint', bookingController.newFunction);
   ```

2. **Implement controller** in `controllers/bookingController.js`
   ```javascript
   const newFunction = async (req, res, next) => {
     try {
       // Logic here
     } catch (error) {
       next(error);
     }
   };
   ```

3. **Add to model** in `models/Booking.js` if schema changes needed

4. **Update client** in `client/src/utils/api.js` with corresponding API call

5. **Register route** in `server.js` if creating new route file
   ```javascript
   app.use('/api/new-routes', require('./routes/new-routes'));
   ```

## Frontend Integration

The frontend (`client/src/utils/api.js`) contains functions for API communication:

- `bookingAPI.create(data)` - Create booking
- `bookingAPI.getAll()` - Fetch all bookings
- `bookingAPI.getOne(id)` - Get single booking
- `bookingAPI.getAvailableDates()` - Get available dates

During development, Vite proxies `/api/*` requests to `http://localhost:5000` (see `client/vite.config.js`).

## Testing

Currently no tests are configured. To add testing:

1. Install testing framework: `npm install --save-dev jest supertest`
2. Create `tests/` directory with test files
3. Update `package.json` test script
4. Write tests for controllers, routes, and models

## Debugging

Use Node.js debugger with VSCode:

1. Add breakpoint in VSCode
2. Run: `node --inspect-brk server.js`
3. Open `chrome://inspect` or use VSCode debugger

For simple debugging, add `console.log()` statements. Check console output when running `npm run dev`.

## Deployment Notes

- Server listens on port from `PORT` env var (default 5000)
- Use `npm start` for production (not `npm run dev`)
- Set `NODE_ENV=production` for production deployments
- Ensure `MONGODB_URI` is set for production database
- Check database connection status with `/api/health` endpoint
