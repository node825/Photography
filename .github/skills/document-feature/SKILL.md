---
name: document-feature
description: 'Create clear, concise documentation for React components, API endpoints, hooks, utilities, and features. CRITICAL: Use this skill every time a component, API endpoint, or feature is added, modified, or updated. Use when asked to "document a component", "write API docs", "add feature documentation", or when implementing new functionality that requires documentation. Produces organized markdown files under doc/ with templates for components, APIs, and features.'
---

# Document Feature

Generate clear, structured documentation for project components and features. Documentation follows templates that ensure consistency and clarity without excessive length.

## When to Use This Skill

- Adding a new React component to the project
- Creating or updating an API endpoint
- Implementing a new feature (hook, utility, effect)
- Updating existing documentation when making changes

## Documentation Templates

### Component Template

Create file at: `doc/react/{ComponentName}/README.md`

```markdown
# {ComponentName}

## Purpose
Brief description of what the component does.

## Props
- `prop1` (type) - Description
- `prop2` (type) - Description

## Usage
\`\`\`jsx
<ComponentName prop1="value" prop2={value} />
\`\`\`

## Key Features
- Feature 1
- Feature 2

## Styling
Uses Tailwind classes: `text-primary`, `bg-background`, etc.
```

### API Documentation Template

Create file at: `doc/api/{routeName}.md`

```markdown
# {Route Name}

## Endpoint
\`{METHOD} {PATH}\`

## Description
What this endpoint does.

## Request
- Query/Body parameters
- Example:
\`\`\`bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "John Doe",
    "phone": "053-123-4567",
    "email": "john@example.com",
    "sessionType": "kids",
    "preferredDate": "2025-03-15",
    "notes": "Optional message"
  }'
\`\`\`

## Response
- Success: `{ "id": "...", "status": "pending", ... }`
- Error: Status code and error message

## Notes
- Database requirements
- Validation rules
- Edge cases
```

### Feature/Hook Template

Create file at: `doc/features/{featureName}.md`

```markdown
# {Feature Name}

## Overview
What this feature provides.

## Implementation
Key files and logic flow.

## Usage Example
Code snippet showing how to use.

## Configuration
Any env variables or settings needed.
```

## Quick Checklist

- [ ] File created in correct doc/ subfolder
- [ ] Includes title, purpose/description
- [ ] Shows usage example (API must include curl/request)
- [ ] Lists key configurations or props
- [ ] Links to source files if relevant
- [ ] Kept under ~100 lines per document

## Notes

- All documentation in English
- Use backticks for code/variables
- Keep it concise—avoid redundancy
- Update doc/ whenever you change or add a feature (critical rule!)
