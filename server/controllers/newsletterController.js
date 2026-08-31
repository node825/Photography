// Storage decision: newsletter subscribers are kept in a minimal in-memory
// list. This intentionally avoids a new database model or collection and any
// new dependency. Actual email delivery and persistence are out of scope.
const subscribers = [];

const emailRegex = /^\S+@\S+\.\S+$/;

// @desc    Subscribe an email to the newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!subscribers.includes(normalizedEmail)) {
      subscribers.push(normalizedEmail);
    }

    res.status(201).json({
      success: true,
      data: { email: normalizedEmail }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  subscribe
};
