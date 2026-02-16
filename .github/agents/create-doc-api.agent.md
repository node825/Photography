---
name: create-doc-api
description: Comprehensive workflow for creating complete API documentation. Generates JSDoc comments in controllers, route documentation, and creates standalone API documentation files organized by endpoint.
argument-hint: API endpoint name (e.g., "bookings", "users", "sessions") or the route file path to document.
tools: ['vscode', 'read', 'edit', 'search']
---

# Create Doc API - Agent Workflow

This agent provides a structured workflow for documenting REST API endpoints in the Express server. It ensures consistent, complete documentation across all API layers.

## When to Use This Agent

- Documenting a new API endpoint or resource
- Adding documentation to existing endpoints
- Creating complete documentation package for a feature
- Ensuring project documentation standards are met
- Improving code clarity and developer experience

## Workflow Overview

The workflow follows these key phases:

1. **Review & Analysis** - Understand the API structure and existing code
2. **Controller Documentation** - Add JSDoc comments to controller functions
3. **Route Documentation** - Document the route file and endpoints
4. **Create API Reference** - Generate standalone API documentation file
5. **Organize & Commit** - Structure files and create appropriate git commits

## Prerequisites

- The API endpoint/resource is already implemented in code
- Understanding of the endpoint's business logic and purpose
- Knowledge of request/response formats
- Familiarity with project conventions (see: `document-api` skill)

## Phase 1: Review & Analysis

### 1.1 Identify Endpoints
Locate the resource's controller and route files:
```
server/
├── controllers/
│   └── <resource>Controller.js
├── routes/
│   └── <resource>s.js
├── models/
│   └── <Resource>.js
└── server.js (check if route is registered)
```

### 1.2 Review Existing Code
- Read through controller functions to understand what each does
- Check route definitions and HTTP methods
- Review model schema for field types and constraints
- Understand error handling and validation logic
- Note any special access control or middleware

## Phase 2: Controller Documentation

### 2.1 Document Each Controller Function
Using the `document-api` skill templates, add JSDoc comments to each function:

**Checklist for each function:**
- [ ] `@desc` - One-line description of functionality
- [ ] `@route` - HTTP method and path (e.g., `GET /api/resources/:id`)
- [ ] `@access` - Access level (Public/Protected/Admin)
- [ ] `@query` - All query parameters with types and descriptions
- [ ] `@body` - All request body fields with types
- [ ] `@param` - URL parameters (like `:id`)
- [ ] `@returns` - Success response structure
- [ ] `@error` - All possible error scenarios
- [ ] `@example` - Real-world usage example

### 2.2 Standard Controller Functions
Document these functions in order:

1. **getAll** - List all resources with filtering/pagination
2. **create** - Create a new resource
3. **getById** - Retrieve single resource by ID
4. **update** - Update an existing resource
5. **delete** - Remove a resource

## Phase 3: Route Documentation

### 3.1 Route Header Documentation
Add file-level documentation:

```javascript
/**
 * @api
 * Resource: <Resources>
 * Base Path: /api/<resources>
 * Description: <Brief description of resource>
 * 
 * Endpoints Summary:
 * - GET    /api/<resources>              Get all <resources>
 * - POST   /api/<resources>              Create a new <resource>
 * - GET    /api/<resources>/:id          Get a <resource> by ID
 * - PUT    /api/<resources>/:id          Update a <resource>
 * - DELETE /api/<resources>/:id          Delete a <resource>
 */
```

### 3.2 Route Definitions
Ensure routes are clearly organized:
```javascript
router.route('/')
  .get(getAll<Resources>)
  .post(create<Resource>);

router.route('/:id')
  .get(get<Resource>)
  .put(update<Resource>)
  .delete(delete<Resource>);
```

## Phase 4: Create API Reference Document

### 4.1 Create Documentation File Structure

Create API reference documents in `doc/api/`:
```
doc/
├── api/
│   ├── README.md                    (Index of all APIs)
│   ├── bookings-api.md              (Booking API reference)
│   ├── users-api.md                 (User API reference)
│   └── ...
└── ...
```

### 4.2 API Reference Format

Each API reference file (e.g., `doc/api/bookings-api.md`) should contain:

```markdown
# Bookings API Documentation

## Overview
<Description of what this API does>

## Base URL
`/api/bookings`

## Authentication
<Describe authentication requirements if any>

## Endpoints

### 1. Get All Bookings
**Endpoint:** `GET /api/bookings`

**Description:** Retrieves a list of all bookings with optional filtering and pagination.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | string | No | Filter by status: 'pending' \| 'confirmed' \| 'cancelled' |
| sessionType | string | No | Filter by session type |
| page | number | No | Page number, default: 1 |
| limit | number | No | Items per page, default: 10 |

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "page": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "sessionType": "family",
      "status": "confirmed"
    }
  ]
}
```

**Error Responses:**
- `400` - Invalid query parameters
- `500` - Server error

---

### 2. Create Booking
<Similar detailed format for POST endpoint>

---

### 3. Get Booking by ID
<Similar detailed format for GET /:id endpoint>

---

### 4. Update Booking
<Similar detailed format for PUT endpoint>

---

### 5. Delete Booking
<Similar detailed format for DELETE endpoint>

---

## Response Format

All endpoints follow this response structure:

```json
{
  "success": boolean,
  "data": object|array|null,
  "message": "optional message string"
}
```

## Common Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Validation error or invalid parameters |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Internal server error |

## Examples

### Create a new booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "sessionType": "family",
    "date": "2025-03-15T10:00:00Z"
  }'
```

### Response
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionType": "family",
    "status": "pending",
    "createdAt": "2025-02-16T10:30:00Z"
  }
}
```
```

### 4.3 API Index File

Create or update `doc/api/README.md`:

```markdown
# API Documentation Index

Complete documentation for all REST API endpoints.

## Available APIs

| API | Base Path | Description |
|-----|-----------|-------------|
| [Bookings API](./bookings-api.md) | `/api/bookings` | Session booking management |
| [Users API](./users-api.md) | `/api/users` | User account management |
| [Sessions API](./sessions-api.md) | `/api/sessions` | Available session types |

## API Standards

All endpoints follow these standards:

- **Base URL:** `http://localhost:5000` (development)
- **Response Format:** `{ success: boolean, data?: any, message?: string }`
- **Content Type:** `application/json`
- **Status Codes:** 200, 201, 400, 404, 409, 500

## Getting Started

1. Start the development server: `./start-dev.ps1`
2. Server runs on `http://localhost:5000`
3. All API endpoints are prefixed with `/api/`

## Testing Endpoints

Use tools like:
- **cURL** - Command line
- **Postman** - GUI application
- **VS Code REST Client** - Built-in (install "REST Client" extension)

### Example cURL
```bash
curl -X GET http://localhost:5000/api/bookings
```

### Example VS Code REST Client
Create a `.http` file:
```http
@baseUrl = http://localhost:5000

GET {{baseUrl}}/api/bookings

###

POST {{baseUrl}}/api/bookings
Content-Type: application/json

{
  "sessionType": "family"
}
```
```

## Phase 5: Organize & Commit

### 5.1 File Organization Checklist

- [ ] Controller file has complete JSDoc comments
- [ ] Route file has header documentation
- [ ] API reference document created in `doc/api/`
- [ ] API index file updated with new endpoint
- [ ] No typos or inconsistencies in documentation
- [ ] All links in documentation are accurate

### 5.2 Commit Strategy

Create separate commits for different aspects of documentation:

**Commit 1: Controller Documentation**
```
git add server/controllers/<resource>Controller.js
git commit -m "docs: add JSDoc comments to <resource> controller

- Document getAll, create, getById, update, delete functions
- Include @desc, @route, @access, @query, @body, @returns, @error
- Add real-world examples for each endpoint"
```

**Commit 2: Route Documentation**
```
git add server/routes/<resource>s.js
git commit -m "docs: add JSDoc comments to <resource> routes

- Document resource endpoints and base path
- List all available methods and paths
- Link to controller function documentation"
```

**Commit 3: API Reference Documentation**
```
git add doc/api/<resource>-api.md doc/api/README.md
git commit -m "docs: add <resource> API reference documentation

- Create comprehensive API reference document
- Include endpoint descriptions, parameters, responses, examples
- Update API index with new resource"
```

### 5.3 Commit Message Template

```
docs: <short description>

<detailed description of what was documented>

- <specific documentation item 1>
- <specific documentation item 2>
- <specific documentation item 3>

Related: <issue number or reference>
```

## Quality Checklist

Before completing the documentation workflow:

- [ ] **Controller Documentation**
  - [ ] All functions have `@desc` describing what they do
  - [ ] All functions have `@route` with HTTP method and path
  - [ ] All query parameters documented with types and descriptions
  - [ ] All body fields documented with constraints
  - [ ] All error scenarios documented
  - [ ] At least one example per function
  - [ ] Consistent formatting and style

- [ ] **Route Documentation**
  - [ ] File header includes resource name and base path
  - [ ] All endpoints listed with HTTP methods
  - [ ] Routes properly connected to controllers
  - [ ] Middleware clearly documented if used

- [ ] **API Reference Document**
  - [ ] Overview section explains the resource
  - [ ] Each endpoint has dedicated section
  - [ ] Parameters table clear and complete
  - [ ] Response examples match actual API responses
  - [ ] Error codes documented
  - [ ] Real-world usage examples provided
  - [ ] Links to related resources

- [ ] **Git Commits**
  - [ ] Commits are logical and focused
  - [ ] Commit messages follow template
  - [ ] Each commit builds on previous (no forward references)
  - [ ] Documentation syntax is valid

## Related Resources

- **Skill:** [document-api](../../skills/document-api/SKILL.md) - Detailed templates and patterns
- **Skill:** [create-server-api](../../skills/create-server-api/SKILL.md) - Creating new endpoints
- **Examples:** [bookingController.js](server/controllers/bookingController.js), [bookings.js](server/routes/bookings.js)
- **Project Instructions:** [copilot-instructions.md](../copilot-instructions.md)