---
name: documentation-writer
description: 'Create unified documentation for the Kids Photography Website system. Use when asked to "write documentation", "create docs", "document an API", "document a component", or when adding new API endpoints, React components, server models, or features. Generates consistent, structured documentation with critical sections, examples, and integration details.'
---

# Documentation Writer

A skill for creating organized, consistent documentation for the Kids Photography Website. This skill ensures all documentation follows a unified format with critical sections, examples, and implementation details across client components, server APIs, models, and features.

## When to Use This Skill

- User asks to "write documentation", "create docs", or "document this"
- Adding a new API endpoint to the server
- Creating a new React component or section
- Implementing a new database model
- Adding a new feature or workflow to the system
- User needs to document existing code for better maintainability

## Prerequisites

- Understanding of what is being documented (API, component, model, feature)
- Type of documentation needed (API endpoint, React component, server model, feature)
- Key functionality and critical sections
- Related components or dependencies

## Documentation Structure Overview

All documentation follows a **unified format** with these critical sections:

| Section | Purpose | Required |
|---------|---------|----------|
| **Overview** | What it is and why it exists | Yes |
| **Type/Category** | API/Component/Model/Feature | Yes |
| **Critical Sections** | Key functionality and data | Yes |
| **Usage/Implementation** | How to use or integrate | Yes |
| **Examples** | Code samples and workflows | Yes |
| **Dependencies** | Related components/APIs | Yes |
| **Notes** | Edge cases, considerations | Optional |

## Documentation Types & Templates

### 1. API Endpoint Documentation

**Location**: `doc/api/<endpoint-name>.md`

**Critical Sections**:
- Endpoint definition (method + path)
- Request parameters/body
- Response schema with types
- Error codes and handling
- Integration with client
- Usage examples

**See**: [references/api-endpoint-template.md](references/api-endpoint-template.md)

### 2. React Component Documentation

**Location**: `doc/components/<component-name>.md`

**Critical Sections**:
- Component purpose and usage
- Props interface
- i18n keys used
- Styling and Tailwind classes
- Framer Motion animations (if applicable)
- Integration in Home.jsx
- Usage examples with JSX

**See**: [references/react-component-template.md](references/react-component-template.md)

### 3. Server Model/Database Documentation

**Location**: `doc/models/<model-name>.md`

**Critical Sections**:
- Schema definition with field types
- Validation rules
- Unique constraints and indexes
- Relationships to other models
- MongoDB document example
- CRUD operation guidelines

**See**: [references/server-model-template.md](references/server-model-template.md)

### 4. Feature Documentation

**Location**: `doc/features/<feature-name>.md`

**Critical Sections**:
- Feature description and business purpose
- Workflow/user journey
- Components involved (client-side)
- API endpoints used (server-side)
- Database models involved
- Integration points
- Design considerations

**See**: [references/feature-template.md](references/feature-template.md)

## Step-by-Step Documentation Workflow

### Step 1: Identify Documentation Type

Ask: "Is this an API endpoint, React component, database model, or feature?"

- **API Endpoint**: Use API Template
- **React Component**: Use Component Template
- **Database Model**: Use Server Model Template
- **Feature (multiple pieces)**: Use Feature Template

### Step 2: Gather Critical Information

- What does it do?
- What are the key inputs/outputs?
- What are the constraints or validations?
- How does it integrate with other parts?
- What are common use cases?

### Step 3: Create Documentation File

1. Create file in appropriate `doc/` subfolder
2. Use the corresponding template
3. Fill in all critical sections
4. Add code examples
5. Document dependencies and related items

### Step 4: Link Documentation

For API endpoints: Add link in `doc/api/README.md`
For components: Add link in `doc/components/README.md`
For models: Add link in `doc/models/README.md`
For features: Add link in `doc/features/README.md`

## Documentation Best Practices

### Critical Information
- Always include **field types** (string, number, boolean, enum)
- Always specify **required** vs optional fields
- Always provide **real usage examples**
- Always document **error cases**
- Always show **integration patterns**

### Code Examples
- Use actual code from the project
- Show complete, runnable examples
- Include import statements
- Comment important lines
- Show both client and server perspective when relevant

### Structure
- Use clear headings (H2 for sections)
- Use tables for field/parameter definitions
- Use code blocks with language specification
- Use bullet points for lists
- Keep examples under 30 lines

### Consistency
- Use same formatting across all docs
- Use consistent terminology
- Follow project naming conventions
- Maintain reference links between related docs

## Directory Organization

```
doc/
├── api/
│   ├── README.md (links to all APIs)
│   ├── bookings-create.md
│   └── bookings-list.md
├── components/
│   ├── README.md (links to all components)
│   ├── Gallery.md
│   └── Contact.md
├── models/
│   ├── README.md (links to all models)
│   └── Booking.md
└── features/
    ├── README.md (links to all features)
    └── booking-workflow.md
```

## Common Documentation Tasks

### Task: Document New API Endpoint

1. Choose API Template
2. Get method, path, request body, response schema
3. Document error codes (400, 404, 500, etc.)
4. Show how frontend will call it
5. Add code example with axios/fetch

### Task: Document New React Component

1. Choose Component Template
2. List all props and their types
3. Document all i18n keys used
4. Show Tailwind classes and Framer Motion setup
5. Show integration in Home.jsx
6. Provide JSX usage example

### Task: Document New Database Model

1. Choose Server Model Template
2. Define schema with field types
3. List validation rules
4. Document indexes and constraints
5. Show example document in MongoDB format
6. Explain relationships to other models

### Task: Document New Feature

1. Choose Feature Template
2. Describe user workflow
3. List all involved components (client)
4. List all involved APIs (server)
5. List all involved models (database)
6. Draw workflow diagram if complex
7. Show integration points

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Documentation scattered | Use templates and consistent folder structure |
| Missing critical info | Follow the critical sections checklist |
| Code examples outdated | Update when code changes, add version note |
| Links broken | Use relative paths from doc root |
| Inconsistent format | Use templates from `references/` folder |

## References

- [API Endpoint Template](references/api-endpoint-template.md)
- [React Component Template](references/react-component-template.md)
- [Server Model Template](references/server-model-template.md)
- [Feature Template](references/feature-template.md)
- Project conventions: [copilot-instructions.md](../../copilot-instructions.md)
