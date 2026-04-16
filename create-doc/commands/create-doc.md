---
name: create-doc
description: Generate project documentation by analyzing the codebase
argument-hint: "[doc-type] - readme, api, architecture, claude-md, changelog, or all"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Agent
---

# Generate Project Documentation

The user wants to generate documentation for their project. Follow these steps:

## 1. Determine Documentation Type

Based on the user's argument, determine which documentation to generate:

- **readme** - Generate a comprehensive README.md
- **api** - Generate API documentation from route/endpoint files
- **architecture** - Generate architecture overview document
- **claude-md** - Generate or update a CLAUDE.md file with project conventions
- **changelog** - Generate a CHANGELOG from git history
- **all** - Generate all of the above

If no argument is provided, ask the user which type they want, or default to **readme**.

## 2. Analyze the Codebase

Use the doc-generator agent to perform deep codebase analysis:

- Scan project structure (directories, key files, config files)
- Identify tech stack from package.json, config files, imports
- Find existing documentation to avoid duplicating or contradicting it
- Identify API endpoints, components, models, and key patterns
- Read git log for recent changes (if changelog)

## 3. Generate Documentation

Based on analysis, generate the requested documentation:

### README
- Project title and description
- Tech stack badges
- Prerequisites and installation
- Development commands (start, build, test, lint)
- Project structure overview
- Configuration/environment variables
- Contributing guidelines (brief)

### API Documentation
- List all endpoints with HTTP method, path, description
- Request/response formats with examples
- Authentication requirements
- Error codes

### Architecture
- High-level system diagram (text-based)
- Component relationships
- Data flow
- Key design decisions
- Directory structure with explanations

### CLAUDE.md
- Project overview
- Development commands
- Architecture summary
- Code conventions and patterns
- Key file locations

### Changelog
- Group commits by type (feat, fix, refactor, etc.)
- Include date ranges
- Link to relevant PRs/issues if available

## 4. Output

- Write the generated documentation to the appropriate file
- If the file already exists, show the user a diff and ask before overwriting
- Use the project's existing style/tone if docs already exist
