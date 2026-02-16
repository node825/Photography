## Plan: Document Home Component

**TL;DR** Add JSDoc header comment explaining Home's role as a page orchestrator, and inline comments clarifying the z-index layering strategy. This matches the project's minimal-documentation style while improving code clarity.

**Steps**

1. Add JSDoc header comment to [pages/Home.jsx](pages/Home.jsx) describing:
   - Component's purpose as page layout orchestrator
   - Z-index management approach
   - Key dependencies (Navbar, Hero, Gallery, Contact, Footer, effects)

2. Add inline comment above the z-10 wrapper explaining why the main content is separated from global effects

3. Add inline comment next to Navbar explaining its z-50 positioning for sticky behavior

**Verification**
- Read the updated file to confirm documentation is clear and matches project style
- Verify comments follow the minimal style used in Gallery.jsx, Contact.jsx, and Hero.jsx

**Decisions**
- **Chosen approach**: Minimal JSDoc header + inline comments (matches existing project documentation pattern rather than verbose JSDoc)
- **Scope**: Documentation only, no code changes to functionality
