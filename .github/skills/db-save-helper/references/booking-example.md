# Booking Example - Complete Implementation

This is a real working example from this project showing how to implement database operations for a booking system.

## Model: server/models/Booking.js

```javascript
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please provide client name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  sessionType: {
    type: String,
    required: [true, 'Please select session type'],
    enum: ['newborn', 'toddler', 'kids', 'family']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please select preferred date']
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate bookings (same email on same date)
bookingSchema.index({ email: 1, preferredDate: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
```

## Controller: server/controllers/bookingController.js

```javascript
const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { clientName, phone, email, sessionType, preferredDate, notes } = req.body;

    // Validate that the date is not in the past
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book a date in the past'
      });
    }

    const booking = await Booking.create({
      clientName,
      phone,
      email,
      sessionType,
      preferredDate,
      notes
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    // Handle duplicate booking error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A booking already exists for this email on this date'
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public (will be protected in Phase 2)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get available dates (dates without bookings)
// @route   GET /api/bookings/available-dates
// @access  Public
const getAvailableDates = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: { $ne: 'cancelled' } })
      .select('preferredDate');

    const bookedDates = bookings.map(booking => 
      booking.preferredDate.toISOString().split('T')[0]
    );

    res.status(200).json({
      success: true,
      data: bookedDates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  getAvailableDates
};
```

## Routes: server/routes/bookingRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  getAvailableDates
} = require('../controllers/bookingController');

// Special route must come before /:id
router.get('/available-dates', getAvailableDates);

router.route('/')
  .get(getAllBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBooking);

module.exports = router;
```

## Server Registration: server/server.js (excerpt)

```javascript
const bookingRoutes = require('./routes/bookingRoutes');

// Mount routes
app.use('/api/bookings', bookingRoutes);
```

## Key Learnings from This Example

1. **Composite Unique Index**: Prevents duplicate bookings for same email on same date
2. **Custom Validation**: Date validation happens in controller, not model
3. **Error Code Handling**: Specific handling for MongoDB error code 11000 (duplicate key)
4. **Response Consistency**: All responses use `{ success, data/message }` format
5. **Default Values**: Status defaults to 'pending', createdAt to Date.now
6. **Enum Validation**: sessionType is restricted to specific values
7. **Email Validation**: Uses regex pattern matching in schema
8. **Query Filtering**: `$ne` operator used to exclude cancelled bookings
9. **Projection**: `.select()` limits fields returned in queries
10. **Route Ordering**: Specific routes (/available-dates) before dynamic routes (/:id)

## Testing the Implementation

```bash
# Create a booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Sarah Cohen",
    "phone": "053-123-4567",
    "email": "sarah@example.com",
    "sessionType": "kids",
    "preferredDate": "2026-03-15",
    "notes": "Prefer morning session"
  }'

# Get all bookings
curl http://localhost:5000/api/bookings

# Get single booking
curl http://localhost:5000/api/bookings/507f1f77bcf86cd799439011

# Get available dates
curl http://localhost:5000/api/bookings/available-dates

# Try duplicate booking (should fail)
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Sarah Cohen",
    "phone": "053-123-4567",
    "email": "sarah@example.com",
    "sessionType": "kids",
    "preferredDate": "2026-03-15",
    "notes": "Different notes"
  }'
```

## Expected Responses

### Success (Create)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "clientName": "Sarah Cohen",
    "phone": "053-123-4567",
    "email": "sarah@example.com",
    "sessionType": "kids",
    "preferredDate": "2026-03-15T00:00:00.000Z",
    "notes": "Prefer morning session",
    "status": "pending",
    "createdAt": "2026-02-08T20:00:00.000Z"
  }
}
```

### Error (Duplicate)
```json
{
  "success": false,
  "message": "A booking already exists for this email on this date"
}
```

### Error (Past Date)
```json
{
  "success": false,
  "message": "Cannot book a date in the past"
}
```

### Error (Validation)
```json
{
  "success": false,
  "message": "Booking validation failed: email: Please provide a valid email"
}
```
