const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  getAvailableDates,
  verifyBooking
} = require('../controllers/bookingController');

router.route('/')
  .get(getAllBookings)
  .post(createBooking);

router.route('/available-dates')
  .get(getAvailableDates);

router.route('/verify')
  .post(verifyBooking);

router.route('/:id')
  .get(getBooking);

module.exports = router;
