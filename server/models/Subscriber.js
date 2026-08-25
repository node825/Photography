const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate newsletter subscriptions for the same email
subscriberSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
