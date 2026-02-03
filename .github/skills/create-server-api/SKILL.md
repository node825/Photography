---
name: create-server-api
description: 'Complete guide for creating new REST API endpoints in the Express server. Use when asked to "create an API", "add an endpoint", "build a route", "add server functionality", or when implementing new backend features. Covers model creation, controller logic, route setup, and server.js integration following project conventions.'
---

# Create Server API

A comprehensive skill for creating new REST API endpoints in the Express 5 + MongoDB server. This skill guides you through creating models, controllers, routes, and registering them in the main server file.

## When to Use This Skill

- User asks to "create an API", "add an endpoint", or "build a route"
- User wants to add new server-side functionality
- User needs to create CRUD operations for a new resource
- User asks to "add a model" or "create a new collection"
- User wants to implement backend features for the photography portfolio

## Prerequisites

- Understanding of what resource/data the API will manage
- Field definitions for the MongoDB model
- Knowledge of which HTTP methods are needed (GET, POST, PUT, DELETE)

## Project Structure

```
server/
├── server.js           # Main entry point - register routes here
├── config/
│   └── db.js           # MongoDB connection
├── controllers/
│   └── <name>Controller.js  # Business logic
├── middleware/
│   └── errorHandler.js      # Global error handling
├── models/
│   └── <Name>.js            # Mongoose schema
└── routes/
    └── <name>.js            # Route definitions
```

## Step-by-Step: Creating a New API

### Step 1: Create the Mongoose Model

Create a new file in `server/models/<Name>.js` (PascalCase):

```javascript
const mongoose = require('mongoose');

const <name>Schema = new mongoose.Schema({
  // Required field example
  fieldName: {
    type: String,
    required: [true, 'Please provide field name'],
    trim: true
  },
  // Optional field with default
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  // Reference to another model
  relatedModel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OtherModel'
  },
  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes if needed
// <name>Schema.index({ field1: 1, field2: 1 }, { unique: true });

module.exports = mongoose.model('<Name>', <name>Schema);
```

#### Common Field Types

| Type | Usage |
|------|-------|
| `String` | Text data, use `trim: true` for cleanup |
| `Number` | Numeric values |
| `Boolean` | True/false flags |
| `Date` | Timestamps, use `default: Date.now` |
| `Array` | Lists, e.g., `[String]` or `[{ type: ObjectId }]` |
| `ObjectId` | References to other documents |

### Step 2: Create the Controller

Create a new file in `server/controllers/<name>Controller.js` (camelCase + Controller):

```javascript
const <Name> = require('../models/<Name>');

// @desc    Create new <name>
// @route   POST /api/<names>
// @access  Public
const create<Name> = async (req, res) => {
  try {
    const { field1, field2 } = req.body;

    const <name> = await <Name>.create({
      field1,
      field2
    });

    res.status(201).json({
      success: true,
      data: <name>
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all <names>
// @route   GET /api/<names>
// @access  Public
const getAll<Names> = async (req, res) => {
  try {
    const <names> = await <Name>.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: <names>.length,
      data: <names>
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single <name>
// @route   GET /api/<names>/:id
// @access  Public
const get<Name> = async (req, res) => {
  try {
    const <name> = await <Name>.findById(req.params.id);

    if (!<name>) {
      return res.status(404).json({
        success: false,
        message: '<Name> not found'
      });
    }

    res.status(200).json({
      success: true,
      data: <name>
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update <name>
// @route   PUT /api/<names>/:id
// @access  Public
const update<Name> = async (req, res) => {
  try {
    const <name> = await <Name>.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!<name>) {
      return res.status(404).json({
        success: false,
        message: '<Name> not found'
      });
    }

    res.status(200).json({
      success: true,
      data: <name>
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete <name>
// @route   DELETE /api/<names>/:id
// @access  Public
const delete<Name> = async (req, res) => {
  try {
    const <name> = await <Name>.findByIdAndDelete(req.params.id);

    if (!<name>) {
      return res.status(404).json({
        success: false,
        message: '<Name> not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  create<Name>,
  getAll<Names>,
  get<Name>,
  update<Name>,
  delete<Name>
};
```

#### API Response Format

All responses MUST follow this format:

```javascript
// Success response
{
  success: true,
  data: <result>,       // Single object or array
  count: <number>       // Optional, for list endpoints
}

// Error response
{
  success: false,
  message: '<error description>'
}
```

### Step 3: Create the Routes

Create a new file in `server/routes/<names>.js` (plural, camelCase):

```javascript
const express = require('express');
const router = express.Router();
const {
  create<Name>,
  getAll<Names>,
  get<Name>,
  update<Name>,
  delete<Name>
} = require('../controllers/<name>Controller');

// Base routes: /api/<names>
router.route('/')
  .get(getAll<Names>)
  .post(create<Name>);

// ID routes: /api/<names>/:id
router.route('/:id')
  .get(get<Name>)
  .put(update<Name>)
  .delete(delete<Name>);

module.exports = router;
```

### Step 4: Register Routes in server.js

Add the route registration in `server/server.js`:

```javascript
// Routes (add with other route registrations)
app.use('/api/<names>', require('./routes/<names>'));
```

## Naming Conventions

| Component | Convention | Example |
|-----------|------------|---------|
| Model file | PascalCase | `Gallery.js` |
| Model name | PascalCase | `Gallery` |
| Controller file | camelCase + Controller | `galleryController.js` |
| Controller functions | camelCase | `createGallery`, `getAllGalleries` |
| Route file | camelCase, plural | `galleries.js` |
| API path | lowercase, plural | `/api/galleries` |

## Common Patterns

### Adding Validation

```javascript
// In the model
fieldName: {
  type: String,
  required: [true, 'Custom error message'],
  minlength: [3, 'Must be at least 3 characters'],
  maxlength: [100, 'Cannot exceed 100 characters'],
  match: [/regex/, 'Invalid format']
}
```

### Adding Query Filters

```javascript
// In the controller
const getAll<Names> = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const <names> = await <Name>
      .find(query)
      .sort(sortBy || { createdAt: -1 });

    res.status(200).json({
      success: true,
      count: <names>.length,
      data: <names>
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Adding Pagination

```javascript
const getAll<Names> = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const <names> = await <Name>
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await <Name>.countDocuments();

    res.status(200).json({
      success: true,
      count: <names>.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: <names>
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### Adding Population (Related Data)

```javascript
const get<Name> = async (req, res) => {
  try {
    const <name> = await <Name>
      .findById(req.params.id)
      .populate('relatedField', 'field1 field2');

    // ...rest of function
  } catch (error) {
    // ...error handling
  }
};
```

## Checklist

Before completing, verify:

- [ ] Model file created in `server/models/` with correct schema
- [ ] Controller file created in `server/controllers/` with all CRUD functions
- [ ] Routes file created in `server/routes/` with proper route definitions
- [ ] Routes registered in `server.js`
- [ ] All responses follow `{ success: boolean, data?: any, message?: string }` format
- [ ] Error handling implemented in all controller functions
- [ ] Comments added with `@desc`, `@route`, `@access` for each function

## Testing the API

After creating the API, test it using:

```powershell
# Test GET all
curl http://localhost:5000/api/<names>

# Test POST (create)
curl -X POST http://localhost:5000/api/<names> -H "Content-Type: application/json" -d '{"field1": "value1"}'

# Test GET by ID
curl http://localhost:5000/api/<names>/<id>

# Test PUT (update)
curl -X PUT http://localhost:5000/api/<names>/<id> -H "Content-Type: application/json" -d '{"field1": "newValue"}'

# Test DELETE
curl -X DELETE http://localhost:5000/api/<names>/<id>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Route not found (404) | Check route registration in server.js |
| Validation errors | Verify required fields in request body |
| Cast to ObjectId failed | Ensure valid MongoDB ObjectId format |
| Duplicate key error | Check unique indexes in model |
| Connection refused | Verify server is running on port 5000 |

## References

- Existing API example: `server/controllers/bookingController.js`
- Route example: `server/routes/bookings.js`
- Model example: `server/models/Booking.js`
