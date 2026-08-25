const express = require('express');
const router = express.Router();
const {
  createSubscriber
} = require('../controllers/subscriberController');

router.route('/')
  .post(createSubscriber);

module.exports = router;
