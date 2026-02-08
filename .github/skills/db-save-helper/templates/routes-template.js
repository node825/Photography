const express = require('express');
const router = express.Router();
const {
  create{ModelName},
  getAll{ModelName}s,
  get{ModelName},
  update{ModelName},
  delete{ModelName}
} = require('../controllers/{modelName}Controller');

// Base routes: /api/{resources}
router.route('/')
  .get(getAll{ModelName}s)
  .post(create{ModelName});

// ID-based routes: /api/{resources}/:id
router.route('/:id')
  .get(get{ModelName})
  .put(update{ModelName})
  .delete(delete{ModelName});

// Add custom routes here if needed
// Example:
// router.get('/search', search{ModelName}s);
// router.get('/active', getActive{ModelName}s);

module.exports = router;
