---
name: documentation-patterns
description: "Use when the user asks about documentation best practices, how to write good READMEs, API docs structure, architecture documentation patterns, or CLAUDE.md conventions. Triggers on questions about documenting code, writing technical docs, or documentation standards."
version: 1.0.0
---

# Documentation Patterns and Best Practices

Follow these patterns when generating or reviewing project documentation.

## README Structure

A good README follows this order:

1. **Title + badges** - Project name, CI status, version, license badges
2. **One-liner** - Single sentence explaining what the project does
3. **Screenshot/demo** - Visual if applicable (optional)
4. **Prerequisites** - Required tools and versions
5. **Quick start** - Minimal steps to get running (under 5 commands)
6. **Development** - Full development setup, scripts, environment variables
7. **Project structure** - Directory tree with brief explanations
8. **Configuration** - Environment variables table with descriptions and defaults
9. **Deployment** - How to deploy (if applicable)
10. **Contributing** - Brief guidelines or link to CONTRIBUTING.md

Keep it under 500 lines. Link to detailed docs instead of inlining everything.

## API Documentation Pattern

For each endpoint, document:

```
### METHOD /path/to/endpoint

Description of what it does.

**Request:**
- Headers: `Authorization: Bearer <token>`
- Body: `{ "field": "type" }`

**Response (200):**
```json
{ "id": "...", "status": "..." }
```

**Errors:**
- 400: Invalid input
- 404: Resource not found
```

Group endpoints by resource. Include authentication requirements at the top.

## Architecture Documentation

Structure as:

1. **Overview** - What the system does at a high level (2-3 sentences)
2. **System diagram** - Text-based diagram showing major components
3. **Components** - Each major component with purpose, tech, and key files
4. **Data flow** - How data moves through the system
5. **Key decisions** - Important architectural choices and why they were made
6. **Directory map** - Top-level directories with their purpose

Use text diagrams (ASCII or Mermaid) over images for maintainability.

## CLAUDE.md Conventions

CLAUDE.md files should include:

1. **Project overview** - What it is, tech stack
2. **Development commands** - How to start, build, test, lint
3. **Architecture** - Key structural decisions
4. **Code conventions** - Naming, patterns, module system
5. **Key file paths** - Where important code lives
6. **Common patterns** - How to add components, routes, tests

Write for an AI assistant — be explicit about constraints and conventions. Include "do this, not that" examples.

## General Principles

- **Accuracy over completeness** - Wrong docs are worse than missing docs
- **Commands must work** - Test every command you document
- **Keep it current** - Outdated docs mislead; remove stale content
- **Audience-aware** - Internal docs differ from public docs
- **Scannable** - Use headers, lists, tables, and code blocks
- **DRY** - Link to source of truth instead of duplicating
