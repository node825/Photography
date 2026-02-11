const DigitalAlbumOrder = require('../models/DigitalAlbumOrder');
const Booking = require('../models/Booking');

// @desc    Create new digital album order
// @route   POST /api/digital-album-orders
// @access  Public
const createDigitalAlbumOrder = async (req, res) => {
  try {
    const { bookingId, customerEmail, customerName, packageType, notes } = req.body;

    // 1. Validate booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found. Please check your booking ID.'
      });
    }

    // 2. Verify booking status is confirmed
    if (booking.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'This booking is not confirmed yet. Please wait for confirmation.'
      });
    }

    // 3. Verify customer email matches booking email
    if (booking.email.toLowerCase() !== customerEmail.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "Email doesn't match booking. Please use the email you booked with."
      });
    }

    // 4. Check for duplicate order
    const existingOrder = await DigitalAlbumOrder.findOne({ bookingId, customerEmail: customerEmail.toLowerCase() });
    if (existingOrder) {
      return res.status(409).json({
        success: false,
        message: "You've already ordered an album for this booking. Check your email for details."
      });
    }

    // 5. Create the order
    const order = await DigitalAlbumOrder.create({
      bookingId,
      customerEmail,
      customerName,
      packageType,
      notes
    });

    // Populate booking details for response
    await order.populate('bookingId');

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @desc    Get all digital album orders
// @route   GET /api/digital-album-orders
// @access  Public (will be protected in Phase 2)
const getAllDigitalAlbumOrders = async (req, res) => {
  try {
    const orders = await DigitalAlbumOrder.find()
      .populate('bookingId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single digital album order
// @route   GET /api/digital-album-orders/:id
// @access  Public
const getDigitalAlbumOrder = async (req, res) => {
  try {
    const order = await DigitalAlbumOrder.findById(req.params.id)
      .populate('bookingId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get orders by booking ID
// @route   GET /api/digital-album-orders/by-booking/:bookingId
// @access  Public
const getOrdersByBooking = async (req, res) => {
  try {
    const orders = await DigitalAlbumOrder.find({ bookingId: req.params.bookingId })
      .populate('bookingId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createDigitalAlbumOrder,
  getAllDigitalAlbumOrders,
  getDigitalAlbumOrder,
  getOrdersByBooking
};
