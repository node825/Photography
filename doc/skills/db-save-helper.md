# Database Save Helper Skill

## Overview

The **db-save-helper** skill is a specialized Agent Skill that helps developers create MongoDB models and Express controllers for database operations. It automates the scaffolding of CRUD operations and ensures consistency with the project's backend architecture.

## Location

`.github/skills/db-save-helper/`

## When to Use

Use this skill when you need to:
- Create a new MongoDB model/schema
- Add CRUD operations for a new entity
- Save data to the database
- Implement data persistence for backend features
- Set up database validation and error handling
- Create RESTful API endpoints

## Trigger Keywords

- "save to database"
- "store data in DB"
- "create a model"
- "add database storage"
- "create CRUD operations"
- "implement data persistence"

## What It Provides

### 1. Main Skill Documentation (`SKILL.md`)

Comprehensive instructions covering:
- MongoDB model creation with Mongoose
- Express controller implementation
- RESTful route setup
- Error handling patterns
- Validation best practices
- Security considerations

### 2. Reference Documentation

Located in `references/` folder:

#### `booking-example.md`
- Real working example from this project
- Complete implementation of Booking model, controller, and routes
- Shows how all pieces work together
- Includes testing examples with curl commands
- Expected responses for success and error cases

#### `mongoose-patterns.md`
- Common Mongoose schema patterns
- Query patterns and operators
- Create/Update/Delete operations
- Population (references)
- Aggregation pipelines
- Middleware (hooks)
- Performance best practices

#### `validation-examples.md`
- Comprehensive validation examples for all field types
- String validation (required, length, regex, enum)
- Number validation (min/max, integer checks)
- Date validation (ranges, custom logic)
- Array validation
- Custom validators
- Async validation
- Error handling patterns

### 3. Template Files

Located in `templates/` folder:

#### `model-template.js`
Blank MongoDB model template with:
- Schema structure
- Field definitions placeholder
- Index examples
- Middleware hooks placeholder
- Virtual properties example

#### `controller-template.js`
Full CRUD operations template with:
- Create (POST)
- Read all (GET)
- Read single (GET by ID)
- Update (PUT)
- Delete (DELETE)
- Error handling for all operations
- Inline documentation format

#### `routes-template.js`
RESTful routes template with:
- Base routes (/ for collection)
- ID-based routes (/:id for single resource)
- Placeholder for custom routes

## Project Conventions Enforced

### Model Conventions
- **Location**: `server/models/{ModelName}.js`
- **Naming**: PascalCase for model name
- **Export**: `module.exports = mongoose.model('ModelName', schema)`
- **Validation**: Mongoose built-in validators
- **Indexes**: Defined for query optimization

### Controller Conventions
- **Location**: `server/controllers/{modelName}Controller.js`
- **Naming**: camelCase with "Controller" suffix
- **Documentation**: Inline comments with `@desc`, `@route`, `@access`
- **Error Handling**: Try-catch blocks with meaningful messages
- **Response Format**: `{ success, data, message }`

### Route Conventions
- **Location**: `server/routes/{modelName}Routes.js`
- **Base Path**: `/api/{resource-name}` (plural, lowercase)
- **HTTP Methods**: RESTful (GET, POST, PUT, DELETE)

## Usage Example

### Creating a New Model

1. **Invoke the skill**: "Create a new model for storing gallery photos in the database"

2. **The skill will guide you through**:
   - Defining the schema with appropriate fields
   - Adding validation rules
   - Creating indexes for performance
   - Setting up the controller with CRUD operations
   - Creating routes
   - Registering routes in server.js
   - Testing the endpoints

3. **Example output**:
   ```javascript
   // server/models/Photo.js
   const mongoose = require('mongoose');
   
   const photoSchema = new mongoose.Schema({
     title: {
       type: String,
       required: [true, 'Please provide photo title'],
       trim: true
     },
     category: {
       type: String,
       required: true,
       enum: ['newborn', 'toddler', 'kids', 'family']
     },
     imageUrl: {
       type: String,
       required: true
     },
     createdAt: {
       type: Date,
       default: Date.now
     }
   });
   
   module.exports = mongoose.model('Photo', photoSchema);
   ```

## Key Features

### Comprehensive Error Handling
- Duplicate key errors (11000)
- Validation errors
- Cast errors (invalid ObjectId)
- Generic error fallback

### Consistent Response Format
All responses follow the pattern:
```javascript
{
  success: true/false,
  data: {...},        // On success
  message: "...",     // On error
  count: 10          // For list operations
}
```

### Security Best Practices
- Input validation
- Sanitization guidance
- Authentication patterns
- Rate limiting recommendations

### Performance Optimization
- Index creation guidance
- Query optimization patterns
- Lean queries for read-only data
- Pagination implementation

## Files Structure

```
.github/skills/db-save-helper/
├── SKILL.md                              # Main skill documentation
├── references/
│   ├── booking-example.md                # Complete working example
│   ├── mongoose-patterns.md              # Common patterns (9.9KB)
│   └── validation-examples.md            # Validation examples (13.2KB)
└── templates/
    ├── model-template.js                 # Blank model scaffold
    ├── controller-template.js            # CRUD operations template
    └── routes-template.js                # RESTful routes template
```

## Related Documentation

- [Booking API Documentation](../api/bookings-api.md) - Example of API created with this pattern
- [MongoDB Official Docs](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)

## Benefits

1. **Consistency**: Ensures all database operations follow the same patterns
2. **Time-Saving**: Reduces boilerplate code creation
3. **Best Practices**: Includes error handling, validation, and security patterns
4. **Learning Tool**: Reference docs help developers understand Mongoose patterns
5. **Project-Specific**: Templates match this project's conventions exactly

## Maintenance

When updating database patterns in the project:
1. Update the reference documentation to reflect new patterns
2. Update templates if the structure changes
3. Add new examples to validation-examples.md as needed
4. Keep the booking-example.md in sync with actual code

## Version History

- **v1.0** (2026-02-08): Initial creation with comprehensive documentation and templates
