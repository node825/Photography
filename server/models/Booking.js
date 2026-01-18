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
