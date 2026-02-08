---
name: create-new-api-doc
description: Automatically documents new API endpoints by analyzing controller files, extracting route information, and generating comprehensive API documentation with request/response examples.
argument-hint: The path to the new/modified controller file or endpoint name (e.g., "server/controllers/galleryController.js" or "POST /api/galleries")
tools: ['search', 'read', 'edit', 'execute']
---

# API Documentation Agent

## Purpose
This agent helps document every new API interface in the photography booking system. It automates the process of:
1. **Discovering** new API endpoints from controller files
2. **Extracting** endpoint metadata (method, path, parameters, responses)
3. **Generating** comprehensive API documentation
4. **Maintaining** consistency with existing API documentation patterns

## When to Use
- **New API endpoint created** - Run this agent when adding new routes in `server/controllers/`
- **Existing endpoint modified** - Run when updating request/response schemas
- **Documentation needed** - Generate or update API docs in `doc/api/`
- **API review** - Before merging API-related PRs to `main` branch

## Triggered By
- New file in `server/controllers/*.js`
- Changes to `server/routes/*.js` 
- User request with controller name or endpoint path

## Agent Workflow

### Step 1: Analyze Controller File
- Read the controller file specified in the argument
- Extract all functions with `@route` comments
- Parse `@desc`, `@route`, `@access` JSDoc comments
- Identify request parameters from function signatures
- Extract MongoDB model schema if applicable

### Step 2: Extract Endpoint Details
For each endpoint, capture:
```
- Method: POST | GET | PUT | DELETE | PATCH
- Path: /api/{resource}/{action}
- Description: What the endpoint does
- Access Level: Public | Private | Admin
- Parameters: Query / Path / Body with types
- Request Body: JSON schema with required fields
- Response Success: 200/201 response with example data
- Response Errors: 400/404/500 with error messages
```

### Step 3: Validate Against Project Standards
✓ Uses Express.js route patterns
✓ Includes proper HTTP status codes
✓ Has error handling with meaningful messages
✓ Follows RESTful naming conventions
✓ Matches Booking model or other existing schemas

### Step 4: Generate Documentation
Create/update file: `doc/api/{resource}.md`

Documentation structure:
```markdown
# {Resource} API

## Overview
Brief description of the resource and endpoints

## Endpoints

### GET /api/{resource}
**Description**: [from @desc]
**Access**: [Public/Private]

**Query Parameters**:
- `param1` (type) - Description

**Response** (200):
\`\`\`json
{
  "success": true,
  "data": [...]
}
\`\`\`

**Error Responses**:
- `400`: [Error message]
- `404`: [Error message]

---

### POST /api/{resource}
...
```

### Step 5: Update API Index
Update `doc/api/README.md` with:
- New endpoint summary
- Link to detailed documentation
- Version/date of last update

## Documentation Conventions

### JSDoc Comments in Controllers
```javascript
// @desc    Create a new {resource}
// @route   POST /api/{resource}
// @access  Public
const create{Resource} = async (req, res) => { ... }
```

### Request/Response Format
All APIs follow this JSON envelope:
```json
{
  "success": true|false,
  "data": {...} | [...],
  "message": "Optional error message"
}
```

### Error Handling
Standard HTTP status codes and messages:
- `200`: Success (GET/PUT)
- `201`: Created (POST)
- `400`: Bad Request (validation or duplicate)
- `404`: Not Found
- `500`: Server Error

## Example Output

For a new `POST /api/bookings` endpoint, the agent generates:

**File**: `doc/api/bookings.md`
```markdown
# Bookings API

## Create Booking
**Method**: POST  
**Path**: `/api/bookings`  
**Access**: Public

### Request Body
```json
{
  "clientName": "string (required)",
  "phone": "string (required)",
  "email": "string (required)",
  "sessionType": "enum: newborn|toddler|kids|family",
  "preferredDate": "YYYY-MM-DD (required)",
  "notes": "string (optional)"
}
```

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "clientName": "John Doe",
    "email": "john@example.com",
    "sessionType": "kids",
    "preferredDate": "2026-06-15",
    "status": "pending",
    "createdAt": "2026-02-08T10:00:00Z"
  }
}
```

### Error Responses
- `400`: Bad Request - "A booking already exists for this email on this date"
- `400`: Bad Request - "Cannot book a date in the past"
```

## Files Generated/Updated
- `doc/api/{resource}.md` - Detailed endpoint documentation
- `doc/api/README.md` - API index with all endpoints
- `server/routes/{resource}.js` - Route definitions (referenced)
- `.github/copilot-instructions.md` - Updated API section (if needed)

## Related Files
- **Controllers**: `server/controllers/*.js` - Endpoint implementations
- **Routes**: `server/routes/*.js` - Route definitions
- **Models**: `server/models/*.js` - Data schemas
- **Main Instructions**: `.github/copilot-instructions.md` - API documentation patterns

## Dependencies
- Controller functions must have JSDoc comments with `@route`, `@desc`, `@access`
- MongoDB model schema should match request/response examples
- Consistent error handling in all controllers