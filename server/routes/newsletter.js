const express = require('express');
const router = express.Router();
const { subscribe } = require('../controllers/newsletterController');

router.route('/')
  .post(subscribe);

module.exports = router;
