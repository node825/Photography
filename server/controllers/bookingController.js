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
