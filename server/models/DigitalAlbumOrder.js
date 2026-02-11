const mongoose = require('mongoose');

const digitalAlbumOrderSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Please provide booking ID'],
    index: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Please provide customer email'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  customerName: {
    type: String,
    required: [true, 'Please provide customer name'],
    trim: true
  },
  packageType: {
    type: String,
    required: [true, 'Please select package type'],
    enum: ['basic', 'premium', 'full']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate orders (same booking and email)
digitalAlbumOrderSchema.index({ bookingId: 1, customerEmail: 1 }, { unique: true });

// Update the updatedAt timestamp before saving
digitalAlbumOrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('DigitalAlbumOrder', digitalAlbumOrderSchema);
