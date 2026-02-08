---
name: db-save-helper
description: 'Create MongoDB models and Express controllers for saving data to the database. Use when asked to "save to database", "create a model", "add database storage", "create CRUD operations", or when implementing backend data persistence with MongoDB and Mongoose. Generates properly structured models with validation, controllers with error handling, and follows project conventions.'
---

# Database Save Helper

A specialized skill for creating MongoDB models and Express controllers that handle database operations. This skill ensures consistency with the project's backend architecture and follows best practices for data validation, error handling, and API design.

## When to Use This Skill

- User asks to "save data to database" or "store information in DB"
- Creating a new MongoDB model/schema
- Adding CRUD operations for a new entity
- Implementing data persistence for backend features
- Setting up database validation and constraints
- Creating RESTful API endpoints for data operations

## Prerequisites

- MongoDB installed and running
- Mongoose package installed (`npm install mongoose`)
- Express.js server configured
- Understanding of the data structure to be stored

## Project Conventions

This project follows specific conventions that must be maintained:

### Model Conventions
- **Location**: `server/models/{ModelName}.js`
- **Naming**: PascalCase for model name (e.g., `Booking`, `User`, `Gallery`)
- **Export**: `module.exports = mongoose.model('ModelName', schema)`
- **Validation**: Use Mongoose built-in validators
- **Indexes**: Define indexes for query optimization

### Controller Conventions
- **Location**: `server/controllers/{modelName}Controller.js`
- **Naming**: camelCase with "Controller" suffix
- **Documentation**: Use inline comments with format:
  ```javascript
  // @desc    Description of what endpoint does
  // @route   HTTP_METHOD /api/path
  // @access  Public/Private
  ```
- **Error Handling**: Try-catch blocks with meaningful error messages
- **Response Format**: Consistent JSON structure with `success`, `data`, and `message` fields

### Route Conventions
- **Location**: `server/routes/{modelName}Routes.js`
- **Base Path**: `/api/{resource-name}` (plural, lowercase, hyphenated)
- **HTTP Methods**: GET, POST, PUT, DELETE following RESTful conventions

## Step-by-Step Workflow

### Step 1: Create the MongoDB Model

Create a new file in `server/models/{ModelName}.js`:

**Template Structure:**
```javascript
const mongoose = require('mongoose');

const {modelName}Schema = new mongoose.Schema({
  // Define fields with validation
  fieldName: {
    type: String,
    required: [true, 'Error message'],
    trim: true
  },
  // Add timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for performance
{modelName}Schema.index({ field: 1 });

module.exports = mongoose.model('ModelName', {modelName}Schema);
```

**Common Field Types:**
- `String` - Text data
- `Number` - Numeric values
- `Date` - Date/time values
- `Boolean` - True/false flags
- `mongoose.Schema.Types.ObjectId` - References to other models
- `Array` - Lists of values
- `Object` - Nested data structures

**Common Validators:**
- `required: [true, 'message']` - Field is mandatory
- `unique: true` - No duplicates allowed
- `trim: true` - Remove whitespace
- `lowercase: true` - Convert to lowercase
- `uppercase: true` - Convert to uppercase
- `min: value` - Minimum value/length
- `max: value` - Maximum value/length
- `enum: ['val1', 'val2']` - Allowed values only
- `match: [/regex/, 'message']` - Pattern validation
- `default: value` - Default value if not provided

### Step 2: Create the Controller

Create a new file in `server/controllers/{modelName}Controller.js`:

**Template for Create Operation:**
```javascript
const ModelName = require('../models/ModelName');

// @desc    Create new {resource}
// @route   POST /api/{resources}
// @access  Public
const createResource = async (req, res) => {
  try {
    const { field1, field2, field3 } = req.body;

    // Add custom validation if needed
    if (customValidation) {
      return res.status(400).json({
        success: false,
        message: 'Validation error message'
      });
    }

    const resource = await ModelName.create({
      field1,
      field2,
      field3
    });

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    // Handle specific errors (e.g., duplicate keys)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry error message'
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all {resources}
// @route   GET /api/{resources}
// @access  Public
const getAllResources = async (req, res) => {
  try {
    const resources = await ModelName.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single {resource}
// @route   GET /api/{resources}/:id
// @access  Public
const getResource = async (req, res) => {
  try {
    const resource = await ModelName.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResource
};
```

### Step 3: Create Routes

Create a new file in `server/routes/{modelName}Routes.js`:

```javascript
const express = require('express');
const router = express.Router();
const {
  createResource,
  getAllResources,
  getResource
} = require('../controllers/{modelName}Controller');

router.route('/')
  .get(getAllResources)
  .post(createResource);

router.route('/:id')
  .get(getResource);

module.exports = router;
```

### Step 4: Register Routes in Server

Add to `server/server.js`:

```javascript
const {modelName}Routes = require('./routes/{modelName}Routes');

// Mount routes
app.use('/api/{resources}', {modelName}Routes);
```

### Step 5: Test the Endpoints

Use curl or Postman to test:

```bash
# Create resource
curl -X POST http://localhost:5000/api/{resources} \
  -H "Content-Type: application/json" \
  -d '{
    "field1": "value1",
    "field2": "value2"
  }'

# Get all resources
curl http://localhost:5000/api/{resources}

# Get single resource
curl http://localhost:5000/api/{resources}/{id}
```

## Reference Examples

See the `references/` folder for:
- `booking-example.md` - Complete working example from this project
- `mongoose-patterns.md` - Common Mongoose patterns and best practices
- `validation-examples.md` - Comprehensive validation examples

See the `templates/` folder for:
- `model-template.js` - Blank model template
- `controller-template.js` - Blank controller template
- `routes-template.js` - Blank routes template

## Common Patterns

### Pattern 1: Prevent Duplicate Entries
```javascript
// In model
schema.index({ email: 1, date: 1 }, { unique: true });

// In controller
if (error.code === 11000) {
  return res.status(400).json({
    success: false,
    message: 'Duplicate entry'
  });
}
```

### Pattern 2: Date Validation
```javascript
// In controller
const selectedDate = new Date(dateField);
const today = new Date();
today.setHours(0, 0, 0, 0);

if (selectedDate < today) {
  return res.status(400).json({
    success: false,
    message: 'Date cannot be in the past'
  });
}
```

### Pattern 3: Populate References
```javascript
// In controller
const resource = await ModelName.findById(id).populate('referencedField');
```

### Pattern 4: Pagination
```javascript
// In controller
const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10) || 10;
const startIndex = (page - 1) * limit;

const resources = await ModelName.find()
  .limit(limit)
  .skip(startIndex)
  .sort({ createdAt: -1 });
```

## Error Handling Best Practices

1. **Always use try-catch** in async functions
2. **Return specific error messages** to help users understand issues
3. **Use appropriate HTTP status codes**:
   - `200` - Success (GET)
   - `201` - Created (POST)
   - `400` - Bad Request (validation errors)
   - `404` - Not Found
   - `500` - Server Error
4. **Handle MongoDB-specific errors**:
   - `11000` - Duplicate key
   - `ValidationError` - Schema validation failed
   - `CastError` - Invalid ObjectId format

## Validation Checklist

Before completing:
- [ ] Model created in `server/models/` with proper validation
- [ ] Controller created in `server/controllers/` with CRUD operations
- [ ] Routes created in `server/routes/` and mounted in server.js
- [ ] Error handling implemented with try-catch blocks
- [ ] Consistent response format used (success, data, message)
- [ ] Inline documentation added with @desc, @route, @access
- [ ] Tested endpoints with curl or Postman
- [ ] No Hebrew text in code (only in translation files)
- [ ] Documentation updated in `doc/` folder

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `MongooseError: Model.prototype.save() no longer accepts a callback` | Use async/await instead of callbacks |
| Duplicate key error (11000) | Add unique index handling in controller |
| Validation error not showing | Check `required` field in schema has array format: `[true, 'message']` |
| Cannot read property of undefined | Ensure all required fields are in req.body |
| Routes not working | Check if routes are mounted in server.js |
| CORS errors | Ensure CORS middleware is configured in server.js |

## Security Considerations

1. **Never store sensitive data in plain text** (use bcrypt for passwords)
2. **Sanitize user inputs** to prevent injection attacks
3. **Validate all inputs** on the server side
4. **Use environment variables** for sensitive configuration
5. **Implement rate limiting** for public endpoints
6. **Add authentication/authorization** for protected routes

## References

- Mongoose Documentation: https://mongoosejs.com/docs/guide.html
- MongoDB Validation: https://mongoosejs.com/docs/validation.html
- Express Error Handling: https://expressjs.com/en/guide/error-handling.html
- Project Booking Example: `references/booking-example.md`
