# Server Configuration Guide

This file provides guidance for developing and maintaining the Kids Photography Website backend server.

## Quick Start

```bash
cd server
npm install          # Install dependencies
npm run dev          # Start development server with nodemon
npm start            # Start production server
```

## Architecture

### Project Structure

```
server/
├── server.js              # Main application entry point
├── config/
│   └── db.js             # MongoDB connection setup
├── models/
│   └── Booking.js        # Mongoose schema for bookings
├── controllers/
│   └── bookingController.js  # Business logic for booking operations
├── routes/
│   └── bookings.js       # Express route handlers
├── middleware/
│   └── errorHandler.js   # Global error handling
├── .env                  # Environment variables (not in git)
└── package.json          # Dependencies and scripts
```

### Technology Stack

- **Runtime:** Node.js
- **Framework:** Express 5.x
- **Database:** MongoDB with Mongoose ODM
- **Server Port:** 5000 (default)

## Environment Setup

Create a `.env` file in the server directory:

```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
NODE_ENV=development
```

**Note:** MONGODB_URI is optional during development. The server will run without a database connection if not set or invalid.

## API Endpoints

### Bookings
- `GET /api/bookings` - Retrieve all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/available-dates` - Get available dates for booking
- `GET /api/bookings/:id` - Get specific booking details

### Health Check
- `GET /api/health` - Verify server is running

## Database Schema

### Booking Model

```javascript
{
  clientName: String (required),
  phone: String (required),
  email: String (required, email format),
  sessionType: String (enum: 'newborn', 'toddler', 'kids', 'family'),
  preferredDate: Date (required),
  notes: String,
  status: String (enum: 'pending', 'confirmed', 'cancelled'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Constraint:** Unique index on (email, preferredDate) prevents duplicate bookings for the same date.

## Development Workflow

### Running the Server

```bash
# Development (with auto-reload via nodemon)
npm run dev

# Production
npm start

# Check server health
curl http://localhost:5000/api/health
```

### Making Changes

1. **Backend Routes:** Modify `routes/bookings.js`
2. **Business Logic:** Update `controllers/bookingController.js`
3. **Data Model:** Edit `models/Booking.js`
4. **Error Handling:** Add cases to `middleware/errorHandler.js`
5. **Database Config:** Update `config/db.js` for connection changes

### Testing Endpoints

Use curl or Postman to test:

```bash
# Create a booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John Doe",
    "phone": "555-1234",
    "email": "john@example.com",
    "sessionType": "family",
    "preferredDate": "2026-02-15",
    "notes": "Weekend preferred"
  }'

# Get all bookings
curl http://localhost:5000/api/bookings

# Check server health
curl http://localhost:5000/api/health
```

## Frontend Integration

The frontend (React/Vite) communicates with this backend via:

- **Proxy:** Configured in Vite to forward `/api/*` to `http://localhost:5000`
- **Contact Form:** Sends booking requests to `/api/bookings`
- **Available Dates:** Fetches from `/api/bookings/available-dates`

## Code Standards

- All code, comments, and documentation must be in **English only**
- No Hebrew text in code files
- No emojis in commits or code
- Use consistent naming conventions (camelCase for variables/functions)
- Validate data at model level using Mongoose schemas
- Handle errors gracefully with centralized middleware

## Debugging

### Enable Debug Logs

```bash
# Run with debug output
DEBUG=* npm run dev
```

### Common Issues

1. **Port 5000 already in use:** Change PORT in .env or kill the process using that port
2. **MongoDB connection fails:** Verify MONGODB_URI is correct; server will still run without DB
3. **CORS errors from frontend:** Check CORS middleware in server.js
4. **Validation errors on booking creation:** Check Booking.js schema requirements

## Deployment Notes

- Set NODE_ENV=production for production deployments
- Ensure MONGODB_URI is set to valid MongoDB connection string
- Use process manager (PM2, systemd) for production server management
- Never commit .env file to version control
