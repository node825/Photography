---
name: create-api
description: Scaffold a new Express API endpoint with model, controller, and route files following this project's conventions. This skill should be used when the user wants to add a new API resource/endpoint to the backend server.
---

# Create API Endpoint

This skill scaffolds a complete Express API endpoint for this photography portfolio project, creating the model, controller, and route files following established project conventions.

## When to Use

Invoke this skill when the user requests:
- Adding a new API endpoint or resource
- Creating a new backend feature with CRUD operations
- Scaffolding a new Express route with its model and controller

## Project API Conventions

This project uses **CommonJS modules** (`require`/`module.exports`) for all server code. Never use ES module syntax (`import`/`export`) in server files.

### Response Format

All API responses follow this structure:

```json
// Success
{ "success": true, "data": <result> }
{ "success": true, "count": <number>, "data": [<results>] }

// Error
{ "success": false, "message": "<error description>" }
```

### Comment Style for Controllers

Each controller function must include a JSDoc-style header:

```js
// @desc    Description of what the endpoint does
// @route   METHOD /api/<resource>
// @access  Public
```

### Error Handling

- Use `try/catch` blocks in every controller function
- Return `400` for validation/client errors
- Return `404` for not-found resources
- Return `500` for server errors
- Handle MongoDB duplicate key errors (`error.code === 11000`) when relevant

## Step-by-Step Process

### Step 1: Gather Requirements

Ask the user for the following (skip what is already provided):

1. **Resource name** (singular, e.g., "review", "gallery", "testimonial")
2. **Schema fields** with types and validation rules
3. **Required endpoints** (default: full CRUD - Create, Read All, Read One, Update, Delete)
4. **Any unique indexes or special constraints**

### Step 2: Create the Mongoose Model

Create `server/models/<ResourceName>.js`:

- Use PascalCase for the model name (e.g., `Review`, `Testimonial`)
- Define the schema with proper types, required fields, enums, and defaults
- Add `createdAt` field with `Date.now` default
- Add any unique compound indexes via `schema.index()`
- Export with `module.exports = mongoose.model('<ResourceName>', schema)`

Follow the pattern in `server/models/Booking.js`:

```js
const mongoose = require('mongoose');

const <resourceName>Schema = new mongoose.Schema({
  // fields here with validation
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('<ResourceName>', <resourceName>Schema);
```

### Step 3: Create the Controller

Create `server/controllers/<resourceName>Controller.js`:

- Import the model at the top
- Create async functions for each endpoint
- Use descriptive JSDoc comment headers (`@desc`, `@route`, `@access`)
- Wrap each function body in `try/catch`
- Use consistent response format (`{ success, data }` or `{ success, message }`)
- Export all functions as named exports via `module.exports = { ... }`

Follow the pattern in `server/controllers/bookingController.js`.

### Step 4: Create the Route File

Create `server/routes/<resourceName>s.js` (pluralized):

- Import express and create a router
- Import controller functions
- Define routes using `router.route()` chaining
- Export with `module.exports = router`

Follow the pattern in `server/routes/bookings.js`:

```js
const express = require('express');
const router = express.Router();
const { /* controller functions */ } = require('../controllers/<resourceName>Controller');

router.route('/')
  .get(getAll<ResourceName>s)
  .post(create<ResourceName>);

router.route('/:id')
  .get(get<ResourceName>)
  .put(update<ResourceName>)
  .delete(delete<ResourceName>);

module.exports = router;
```

### Step 5: Register the Route in server.js

Add the route to `server/server.js` in the Routes section:

```js
app.use('/api/<resourceName>s', require('./routes/<resourceName>s'));
```

Place it after the existing route registrations and before the health check route.

### Step 6: Add Translation Keys (if applicable)

If the new API resource will be displayed in the frontend, add relevant translation keys to both:
- `client/src/i18n/locales/he/translation.json`
- `client/src/i18n/locales/en/translation.json`

### Step 7: Summary

After creating all files, provide the user with:
1. List of created/modified files
2. The available API endpoints with their HTTP methods and paths
3. Example request body for POST/PUT endpoints
4. Any required environment variables or setup steps

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Model | PascalCase singular | `server/models/Review.js` |
| Controller | camelCase + "Controller" | `server/controllers/reviewController.js` |
| Route | camelCase plural | `server/routes/reviews.js` |
| API path | lowercase plural | `/api/reviews` |
