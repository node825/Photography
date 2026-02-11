const express = require('express');
const router = express.Router();
const {
  createDigitalAlbumOrder,
  getAllDigitalAlbumOrders,
  getDigitalAlbumOrder,
  getOrdersByBooking
} = require('../controllers/digitalAlbumOrderController');

router.route('/')
  .get(getAllDigitalAlbumOrders)
  .post(createDigitalAlbumOrder);

router.route('/by-booking/:bookingId')
  .get(getOrdersByBooking);

router.route('/:id')
  .get(getDigitalAlbumOrder);

module.exports = router;
