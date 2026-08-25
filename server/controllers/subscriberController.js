const Subscriber = require('../models/Subscriber');

// @desc    Subscribe to the newsletter
// @route   POST /api/subscribers
// @access  Public
const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      data: subscriber
    });
  } catch (error) {
    // Handle duplicate subscription error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to the newsletter'
      });
    }

    // Handle schema validation errors as bad input
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSubscriber
};
