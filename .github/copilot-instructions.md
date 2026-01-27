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

## Instruction Files
| File | Applies To | Description |
|------|-----------|-------------|
| `.github/instructions/client.instructions.md` | `client/**` | Client-specific patterns, design system, component patterns |
| `.github/instructions/reactjs.instructions.md` | `**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.css, **/*.scss` | ReactJS best practices, hooks, state management |
