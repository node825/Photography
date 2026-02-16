# Copilot Instructions

## Critical Rules
- **No Hebrew in code** – All code, comments, and variable names must be in English only
- **No emojis in code**
- **No green colors** – Never use green in any component styling
- **Never push code** without explicit user approval

## Architecture
- **`client/`** – React 19 + Vite (port 3000), ES modules
- **`server/`** – Express 5 + MongoDB (port 5000), CommonJS
- **`photographer-info.json`** – Use for all contact info

## Key Patterns
- **i18n**: Hebrew default (RTL). Add strings to both `client/src/i18n/locales/{en,he}/translation.json`
- **Styling**: Tailwind 4, gold/black theme (`primary: #D4AF37`, `background: #0F0F0F`)
- **Animations**: Framer Motion – `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- **API responses**: `{ success: boolean, data?: any, message?: string }`
- **Booking enums**: `sessionType: 'newborn'|'toddler'|'kids'|'family'`, `status: 'pending'|'confirmed'|'cancelled'`

## Dev
```powershell
./start-dev.ps1  # runs both servers
```

## API Documentation
- **Each API endpoint must be documented** – Include endpoint description, request parameters, response format, and error cases
- Document new endpoints in a dedicated comment block at the route level with method, path, and example usage

## Instruction Files
| File | Applies To | Description |
|------|-----------|-------------|
| `.github/instructions/client.instructions.md` | `client/**` | Client-specific patterns, design system, component patterns |
| `.github/instructions/reactjs.instructions.md` | `**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.css, **/*.scss` | ReactJS best practices, hooks, state management |

## Skills
Skills are detailed guides located in `.github/skills/` that provide step-by-step instructions for common tasks.
**Important**: When a task matches a skill's purpose, read the full skill file (`.github/skills/<skill-name>/SKILL.md`) before starting the task.

| Skill | Description |
|-------|-------------|
| `create-new-component` | Complete guide for creating new React components in the client application. Covers component structure, styling patterns, animations, i18n integration, and best practices specific to this photography portfolio project. |
| `create-server-api` | Complete guide for creating new REST API endpoints in the Express server. Covers model creation, controller logic, route setup, and server.js integration. Use when asked to "create an API", "add an endpoint", or "build a route". |
| `document-api` | Complete guide for documenting REST API endpoints. Covers JSDoc comments, request/response formats, error cases, and endpoint examples. Use when creating new endpoints, updating existing ones, or asked to "document an API" or "add API documentation". |
| `make-skill-template` | Meta-skill for creating new Agent Skills. Use when asked to "create a skill", "make a new skill", or "scaffold a skill". Generates SKILL.md files with proper frontmatter, directory structure, and optional bundled resources. |
