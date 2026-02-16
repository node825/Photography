---
name: document-api
description: 'Complete guide for documenting REST API endpoints in the Express server. Use when creating new API endpoints, updating existing ones, or when asked to "document an API", "add API documentation", "add endpoint comments", or "improve API documentation". Covers endpoint descriptions, request/response formats, error cases, and JSDoc patterns following project conventions.'
---

# Document API

A comprehensive skill for properly documenting REST API endpoints in the Express 5 + MongoDB server. This ensures all endpoints have clear, consistent documentation that explains functionality, parameters, responses, and error cases.

## When to Use This Skill

- Creating a new API endpoint (document while creating)
- Updating an existing API endpoint (add/update documentation)
- User asks to "document an API" or "add API documentation"
- Improving code clarity and developer experience
- Following project documentation standards
- Adding comments to existing endpoints without documentation

## Prerequisites

- Understanding of the endpoint's purpose and functionality
- Knowledge of request parameters and their types
- Understanding of success and error response formats
- Familiarity with the API response structure: `{ success: boolean, data?: any, message?: string }`

## Documentation Structure

Each API endpoint should have documentation covering:

1. **Description** - What the endpoint does
2. **HTTP Method & Path** - How to access it
3. **Request Parameters** - What data is needed
4. **Request Body** - Schema/format if applicable
5. **Response Format** - Success and error responses
6. **Error Cases** - Possible error scenarios
7. **Access Level** - Public/Protected/Admin
8. **Example Usage** - Real-world example (optional)

## Step 1: Controller Function Documentation

Add comprehensive JSDoc comments to each controller function:

### Basic Template

```javascript
/**
 * @desc    Get all <resources>
 * @route   GET /api/<resources>
 * @access  Public
 * 
 * Retrieves a list of all <resources> from the database.
 * Supports filtering and pagination via query parameters.
 * 
 * @query {String} [status] - Filter by status (optional)
 * @query {String} [sortBy] - Sort field, default: '-createdAt' (optional)
 * @query {Number} [page] - Page number for pagination, default: 1 (optional)
 * @query {Number} [limit] - Items per page, default: 10 (optional)
 * 
 * @returns {Object} Success response
 * @returns {Boolean} success - true
 * @returns {Array} data - Array of <resource> objects
 * @returns {Number} count - Number of items returned
 * @returns {Number} total - Total number of items (if paginated)
 * @returns {Number} page - Current page number (if paginated)
 * 
 * @error {400} BadRequest - Invalid query parameters
 * @error {500} ServerError - Database or server error
 * 
 * @example
 * // Get all resources
 * GET /api/<resources>
 * 
 * // Response
 * {
 *   "success": true,
 *   "count": 2,
 *   "data": [
 *     { "_id": "123", "name": "Resource 1", "status": "active" },
 *     { "_id": "456", "name": "Resource 2", "status": "inactive" }
 *   ]
 * }
 */
const getAll<Resources> = async (req, res) => {
  // Implementation...
};
```

### Create Endpoint Template

```javascript
/**
 * @desc    Create a new <resource>
 * @route   POST /api/<resources>
 * @access  Public
 * 
 * Creates a new <resource> in the database.
 * 
 * @body {String} name - Resource name (required)
 * @body {String} description - Resource description (required)
 * @body {String} [status] - Resource status, default: 'active' (optional)
 * @body {String} [category] - Resource category (optional)
 * 
 * @returns {Object} Success response (201 Created)
 * @returns {Boolean} success - true
 * @returns {Object} data - The created <resource> object with _id
 * 
 * @error {400} ValidationError - Missing required fields or invalid data
 * @error {400} DuplicateError - Resource with this name already exists
 * @error {500} ServerError - Database error
 * 
 * @example
 * // Create a new resource
 * POST /api/<resources>
 * Content-Type: application/json
 * 
 * {
 *   "name": "My Resource",
 *   "description": "A sample resource",
 *   "status": "active"
 * }
 * 
 * // Response (201)
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "My Resource",
 *     "description": "A sample resource",
 *     "status": "active",
 *     "createdAt": "2025-02-16T10:30:00Z"
 *   }
 * }
 */
const create<Resource> = async (req, res) => {
  // Implementation...
};
```

### Get By ID Template

```javascript
/**
 * @desc    Get a <resource> by ID
 * @route   GET /api/<resources>/:id
 * @access  Public
 * 
 * Retrieves a single <resource> by its MongoDB ObjectId.
 * 
 * @param {String} id - MongoDB ObjectId of the <resource> (required)
 * 
 * @returns {Object} Success response
 * @returns {Boolean} success - true
 * @returns {Object} data - The <resource> object
 * 
 * @error {400} InvalidID - Invalid MongoDB ObjectId format
 * @error {404} NotFound - <Resource> with the specified ID not found
 * @error {500} ServerError - Database error
 * 
 * @example
 * // Get resource by ID
 * GET /api/<resources>/507f1f77bcf86cd799439011
 * 
 * // Response
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "My Resource",
 *     "status": "active"
 *   }
 * }
 * 
 * // Error response (404)
 * {
 *   "success": false,
 *   "message": "Resource not found"
 * }
 */
const get<Resource> = async (req, res) => {
  // Implementation...
};
```

### Update Template

```javascript
/**
 * @desc    Update a <resource>
 * @route   PUT /api/<resources>/:id
 * @access  Public
 * 
 * Updates an existing <resource> with new data.
 * Partial updates are allowed (send only fields to update).
 * 
 * @param {String} id - MongoDB ObjectId of the <resource> (required)
 * 
 * @body {String} [name] - Updated resource name (optional)
 * @body {String} [description] - Updated description (optional)
 * @body {String} [status] - Updated status (optional)
 * 
 * @returns {Object} Success response
 * @returns {Boolean} success - true
 * @returns {Object} data - The updated <resource> object
 * 
 * @error {400} ValidationError - Invalid field values or invalid ObjectId
 * @error {404} NotFound - <Resource> not found
 * @error {500} ServerError - Database error
 * 
 * @example
 * // Update resource
 * PUT /api/<resources>/507f1f77bcf86cd799439011
 * Content-Type: application/json
 * 
 * {
 *   "status": "inactive"
 * }
 * 
 * // Response
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "name": "My Resource",
 *     "status": "inactive"
 *   }
 * }
 */
const update<Resource> = async (req, res) => {
  // Implementation...
};
```

### Delete Template

```javascript
/**
 * @desc    Delete a <resource>
 * @route   DELETE /api/<resources>/:id
 * @access  Public
 * 
 * Permanently removes a <resource> from the database.
 * This action cannot be undone.
 * 
 * @param {String} id - MongoDB ObjectId of the <resource> (required)
 * 
 * @returns {Object} Success response
 * @returns {Boolean} success - true
 * @returns {Object} data - Empty object {}
 * 
 * @error {400} InvalidID - Invalid MongoDB ObjectId format
 * @error {404} NotFound - <Resource> not found
 * @error {500} ServerError - Database error
 * 
 * @example
 * // Delete resource
 * DELETE /api/<resources>/507f1f77bcf86cd799439011
 * 
 * // Response
 * {
 *   "success": true,
 *   "data": {}
 * }
 */
const delete<Resource> = async (req, res) => {
  // Implementation...
};
```

## Step 2: Route Documentation

Document routes in your route files with clear comments:

```javascript
/**
 * @api
 * Resource: <Resources>
 * Base Path: /api/<resources>
 * 
 * Endpoints:
 * - GET    /api/<resources>              Get all <resources>
 * - POST   /api/<resources>              Create a new <resource>
 * - GET    /api/<resources>/:id          Get a <resource> by ID
 * - PUT    /api/<resources>/:id          Update a <resource>
 * - DELETE /api/<resources>/:id          Delete a <resource>
 */

const express = require('express');
const router = express.Router();
const {
  create<Resource>,
  getAll<Resources>,
  get<Resource>,
  update<Resource>,
  delete<Resource>
} = require('../controllers/<resource>Controller');

// Base routes
router.route('/')
  .get(getAll<Resources>)
  .post(create<Resource>);

// ID routes
router.route('/:id')
  .get(get<Resource>)
  .put(update<Resource>)
  .delete(delete<Resource>);

module.exports = router;
```

## Step 3: Generate API Documentation

Create a reference document for each API resource. Example:

```markdown
# <Resource> API Documentation

## Base URL
`/api/<resources>`

## Endpoints

### Get All <Resources>
**Request:**
- **Method:** GET
- **Path:** `/api/<resources>`
- **Query Parameters:**
  - `status` (string, optional) - Filter by status
  - `page` (number, optional) - Page number
  - `limit` (number, optional) - Items per page

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "total": 5,
  "page": 1,
  "data": [...]
}
```

### Create <Resource>
**Request:**
- **Method:** POST
- **Path:** `/api/<resources>`
- **Body:**
  ```json
  {
    "name": "string (required)",
    "description": "string (required)"
  }
  ```

**Success Response (201):**
```json
{
  "success": true,
  "data": { "_id": "...", "name": "...", ... }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```
```

## Common Documentation Patterns

### Query Parameters Documentation

```javascript
/**
 * @query {String} [status] - Filter by status: 'active' | 'inactive'
 * @query {String} [sortBy] - Sort field with direction, e.g., 'name' or '-createdAt'
 * @query {Number} [page] - Page number, default: 1, minimum: 1
 * @query {Number} [limit] - Items per page, default: 10, maximum: 100
 * @query {String} [search] - Search term for text fields
 */
```

### Request Body Documentation

```javascript
/**
 * @body {String} email - User email, must be valid email format (required)
 * @body {String} password - Password, minimum 6 characters (required)
 * @body {String} [phone] - Optional phone number
 * @body {Array} [tags] - Array of tag strings (optional)
 * @body {Object} [metadata] - Custom metadata object (optional)
 */
```

### Response Documentation

```javascript
/**
 * @returns {Object} Success response
 * @returns {Boolean} success - Always true for success
 * @returns {Object|Array} data - Response payload
 * @returns {String} [message] - Optional success message
 * @returns {Number} [count] - Number of items (for list endpoints)
 */
```

### Error Documentation

```javascript
/**
 * @error {400} ValidationError - Input validation failed
 * @error {401} Unauthorized - Authentication required
 * @error {403} Forbidden - Access denied
 * @error {404} NotFound - Resource not found
 * @error {409} Conflict - Resource already exists
 * @error {500} ServerError - Internal server error
 */
```

## Checklist

Before completing endpoint documentation:

- [ ] Each controller function has JSDoc comments
- [ ] `@desc` - Clear description of what the endpoint does
- [ ] `@route` - HTTP method and path specified
- [ ] `@access` - Access level documented (Public/Protected/Admin)
- [ ] All query parameters documented with `@query`
- [ ] All request body fields documented with `@body`
- [ ] Success response format documented with `@returns`
- [ ] All possible errors documented with `@error`
- [ ] At least one example provided with `@example`
- [ ] Routes registered in `server.js`
- [ ] All parameter types and defaults are specified
- [ ] Required vs optional fields are clear (use square brackets for optional)

## Documentation Best Practices

### 1. Be Specific About Types

```javascript
// Good
@body {String} email - User email address
@body {Number} count - Number of items, must be between 1 and 100
@param {String} id - MongoDB ObjectId of the resource

// Avoid
@body email - Email
@body count - The count
@param id - An ID
```

### 2. Include Constraints and Validation

```javascript
// Good
@body {String} username - Username, 3-20 characters, alphanumeric only
@body {String} status - Status value: 'pending' | 'confirmed' | 'cancelled'
@query {Number} limit - Items per page, default: 10, maximum: 100

// Avoid
@body {String} username - Username
@body {String} status - Status
@query {Number} limit - Limit
```

### 3. Use Consistent Error Codes

Map status codes consistently:
- **200** - GET success
- **201** - POST success (created)
- **400** - Bad Request (validation)
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **409** - Conflict (duplicate)
- **500** - Server Error

```javascript
// Good
@error {400} ValidationError - Missing required fields
@error {404} NotFound - Resource with specified ID not found
@error {409} Conflict - Resource with this email already exists

// Avoid
@error Bad Request
@error Something went wrong
```

### 4. Provide Real Examples

```javascript
// Good - shows actual data structure
@example
// Get resource
GET /api/bookings/507f1f77bcf86cd799439011

// Response
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionType": "family",
    "status": "confirmed",
    "date": "2025-03-15T10:00:00Z"
  }
}

// Avoid
@example
// Get a booking
GET /api/bookings/ID

// Response: booking object
```

### 5. Document Edge Cases

```javascript
/**
 * @note If no items match the filter, returns empty array with count: 0
 * @note Deleted resources cannot be recovered
 * @note Status changes may trigger email notifications
 */
```

## Existing Examples in Project

Review these files for documentation style:

- [bookingController.js](server/controllers/bookingController.js) - Controller documentation
- [bookings.js](server/routes/bookings.js) - Route documentation
- [Booking.js](server/models/Booking.js) - Model schema documentation

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Unclear what endpoint does | Add more detailed @desc, explain the business logic |
| Missing error scenarios | Think about validation, not found, duplicates, permissions |
| Inconsistent response format | Ensure all endpoints return `{ success: boolean, ... }` |
| Confusing parameter names | Use clear names, add constraints in documentation |
| Example data doesn't match schema | Update example to match actual response format |
| Documentation out of sync with code | Update docs when code changes, keep them together |

## Related Skills

- [create-server-api](../create-server-api/SKILL.md) - Creating new API endpoints
- [client.instructions.md](../../instructions/client.instructions.md) - Client-side API usage

