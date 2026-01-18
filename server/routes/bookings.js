const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  getAvailableDates
} = require('../controllers/bookingController');

router.route('/')
  .get(getAllBookings)
  .post(createBooking);

router.route('/available-dates')
  .get(getAvailableDates);

router.route('/:id')
  .get(getBooking);

module.exports = router;
