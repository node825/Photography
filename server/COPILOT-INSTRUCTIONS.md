# Server Development Guide

## Technology Stack
- Node.js with Express
- MongoDB with Mongoose
- RESTful API architecture
- CORS enabled for local development

## Starting the Server
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```
Or use the root PowerShell script: `.\start-dev.ps1`

## Database Configuration

### Environment Setup
1. Copy `.env.example` to `.env`
2. Add valid MongoDB connection string:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
NODE_ENV=development
```

### Graceful Degradation
The server **continues without MongoDB** if `MONGODB_URI` is missing or invalid:
- See `config/db.js` for validation logic
- Skips connection for placeholders or missing values
- Logs warning but doesn't crash the server
- Useful for development without database

```javascript
// config/db.js validates MongoDB URI
if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI not set. Skipping MongoDB connection.');
  return;
}
```

## API Response Format

### Success Response
```javascript
res.status(200).json({
  success: true,
  data: { /* booking object */ },
  count: 10  // Optional: for list endpoints
});
```

### Error Response
```javascript
res.status(400).json({
  success: false,
  message: "Error description"
});
```

## Data Models

### Booking Schema
Location: `models/Booking.js`

```javascript
{
  clientName: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  sessionType: { 
    type: String, 
    required: true,
    enum: ['newborn', 'toddler', 'kids', 'family']  // Must match these values
  },
  preferredDate: { type: Date, required: true },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
}
```

### Compound Index
Prevents duplicate bookings (same email on same date):
```javascript
bookingSchema.index({ email: 1, preferredDate: 1 }, { unique: true });
```

## API Endpoints

### POST /api/bookings
Create new booking

**Validation:**
- No past dates allowed
- Duplicate email+date returns 400 error
- Mongoose schema validation

```javascript
// bookingController.js
if (selectedDate < today) {
  return res.status(400).json({
    success: false,
    message: 'Cannot book a date in the past'
  });
}
```

**Duplicate Error Handling:**
```javascript
if (error.code === 11000) {  // MongoDB duplicate key error
  return res.status(400).json({
    success: false,
    message: 'A booking already exists for this email on this date'
  });
}
```

### GET /api/bookings
Get all bookings (sorted by newest first)

**Response:**
```javascript
{
  success: true,
  count: 5,
  data: [/* array of booking objects */]
}
```

### GET /api/bookings/:id
Get single booking by ID

### GET /api/bookings/available-dates
Get booked dates (for calendar blocking)

**Returns:**
```javascript
{
  success: true,
  data: ['2025-11-20', '2025-11-25', ...]  // ISO date strings
}
```

## Project Structure

```
server/
├── models/
│   └── Booking.js              # Mongoose schema with compound index
├── controllers/
│   └── bookingController.js    # Business logic + validation
├── routes/
│   └── bookings.js             # Express routes
├── config/
│   └── db.js                   # MongoDB connection with validation
├── middleware/
│   └── errorHandler.js         # Global error handler
├── server.js                   # Main entry point
├── .env.example                # Template for environment variables
└── package.json                # "type": "commonjs"
```

## Key Patterns

### Controller Pattern
Separate business logic from routes:
```javascript
// routes/bookings.js
router.post('/', createBooking);

// controllers/bookingController.js
const createBooking = async (req, res) => {
  // Validation logic
  // Database operations
  // Response formatting
};
```

### Error Handling
1. **Validation errors**: Return 400 with message
2. **Not found**: Return 404 with message
3. **Server errors**: Caught by `middleware/errorHandler.js`
4. **MongoDB errors**: Special handling for duplicate keys (code 11000)

### CORS Configuration
```javascript
app.use(cors());  // Allows all origins in development
```

## Development Constraints

- **CommonJS modules**: Use `require()`/`module.exports` (package.json has `"type": "commonjs"`)
- **No authentication**: All endpoints are public (Phase 2 feature)
- **Date handling**: Always validate dates on server (don't trust client)
- **Email validation**: Mongoose regex + lowercase transformation

## Testing Checklist

When modifying the API:
- ✅ Test with missing required fields
- ✅ Test with past dates (should fail)
- ✅ Test duplicate bookings (should fail)
- ✅ Test invalid email format (should fail)
- ✅ Test invalid sessionType enum value (should fail)
- ✅ Verify response format matches `{ success, data/message }` pattern
- ✅ Check server continues if MongoDB is disconnected
