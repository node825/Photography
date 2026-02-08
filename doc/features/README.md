# Feature Documentation

This directory contains documentation for all major features and workflows in the system.

## Core Features

### Booking System

| Feature | File | Status | Description |
|---------|------|--------|-------------|
| Booking Workflow | [doc/features/booking-workflow.md](./booking-workflow.md) | Active | Complete booking process from selection to confirmation |

### Gallery

| Feature | File | Status | Description |
|---------|------|--------|-------------|
| Gallery Display | [doc/features/gallery-display.md](./gallery-display.md) | Active | Photo gallery with filtering by session type |

### Contact & Communication

| Feature | File | Status | Description |
|---------|------|--------|-------------|
| Contact Form | [doc/features/contact-form.md](./contact-form.md) | Active | Send direct emails via EmailJS |

## Feature Documentation Structure

A feature documents the **entire end-to-end workflow** and involves:

- **Frontend Components** - What users see and interact with
- **Backend APIs** - Server endpoints that process requests
- **Database Models** - Data structures that store information
- **Integrations** - Third-party services (EmailJS, Stripe, etc.)
- **User Workflow** - Step-by-step journey through the feature

## Example Feature Architecture

```
┌─────────────────────────────────────────────────┐
│           User Interface                        │
│     (React Components + Framer Motion)          │
└────────────────────┬────────────────────────────┘
                     │ Form Submit / Click
                     ▼
┌─────────────────────────────────────────────────┐
│         Validation & State Management           │
│        (Client-side form validation)            │
└────────────────────┬────────────────────────────┘
                     │ axios.post()
                     ▼
┌─────────────────────────────────────────────────┐
│           Backend API Endpoint                  │
│    (Express Route + Controller Logic)           │
└────────────────────┬────────────────────────────┘
                     │ Validate & Process
                     ▼
┌─────────────────────────────────────────────────┐
│          Database Operations                    │
│     (MongoDB Model CRUD operations)             │
└─────────────────────────────────────────────────┘
```

## Creating New Feature Documentation

When adding a new feature to the system:

1. Create a new `.md` file with feature name (e.g., `feature-name.md`)
2. Use the [Feature Template](../../.github/skills/documentation-writer/references/feature-template.md)
3. Document all sections:
   - **Overview** - What the feature is
   - **Business Purpose** - Why it exists
   - **User Story** - Acceptance criteria
   - **Workflow** - Step-by-step user journey
   - **Technical Architecture** - System diagram
   - **Components** - Frontend components involved
   - **Routes & Controllers** - Backend API endpoints
   - **Database Models** - Data structures
   - **Code Examples** - Complete working examples
   - **Integration Points** - How it connects to other features
   - **Testing** - Checklist for validation
4. Link related documentation:
   - [Component Name](../components/ComponentName.md) for each frontend component
   - [Endpoint Name](../api/endpoint-name.md) for each API
   - [Model Name](../models/ModelName.md) for each database model
5. Add entry to this README.md

## Feature Development Workflow

### Phase 1: Planning
- [ ] Define feature in business terms
- [ ] Write user story with acceptance criteria
- [ ] Sketch workflow diagram
- [ ] List required components/APIs/models

### Phase 2: Implementation
- [ ] Create React components (frontend)
- [ ] Create API endpoints (backend)
- [ ] Create database models (data layer)
- [ ] Implement validation and error handling
- [ ] Add internationalization (i18n)

### Phase 3: Documentation
- [ ] Document each component
- [ ] Document each API endpoint
- [ ] Document each database model
- [ ] Create feature overview document
- [ ] Link all related documentation

### Phase 4: Testing
- [ ] Unit tests for components
- [ ] Integration tests for API flow
- [ ] Manual testing checklist
- [ ] Cross-browser testing (mobile, desktop)
- [ ] Language testing (Hebrew RTL, English LTR)

## Critical Feature Elements

### Every Feature Must Have:

1. **User-facing Components**
   - Documented in [doc/components/](../components/)
   - Include i18n keys
   - Use Framer Motion animations
   - Styled with Tailwind

2. **API Endpoints**
   - Documented in [doc/api/](../api/)
   - Consistent error handling
   - Input validation
   - Request/response schemas

3. **Database Models**
   - Documented in [doc/models/](../models/)
   - Schema with validations
   - Indexes on query fields
   - Example documents

4. **Integration Points**
   - How components call APIs
   - How APIs interact with database
   - How features interact with each other

5. **Testing Checklist**
   - Functional testing steps
   - Browser/device compatibility
   - Bilingual testing (Hebrew/English)
   - Error scenario testing

## Feature Categories

### User Features
Features that users interact with directly:
- Booking a photography session
- Browsing the gallery
- Sending a contact message

### System Features
Internal features that support the application:
- Error handling & logging
- Database connection management
- Performance monitoring

### Integration Features
Features that connect external services:
- EmailJS for contact form
- Payment processing (if added)
- Analytics (if added)

## Data Flow Patterns

### Request-Response Pattern
```
Client → Validation → API Endpoint → Controller → Model → Database
←─────────────── Response ←──────────────────────────────←
```

### Event Pattern
```
User Action → Component State → API Call → Backend Processing → Database Update → Component Update
```

### Async Pattern
```
Form Submit → Loading State → API Call → Success/Error State → User Feedback
```

## Documentation Links

- [Feature Template](../../.github/skills/documentation-writer/references/feature-template.md) - Use this to document new features
- [Component Documentation](../components/README.md) - All frontend components
- [API Documentation](../api/README.md) - All backend endpoints
- [Model Documentation](../models/README.md) - All database models

## Version Control

When features change:
1. Update feature documentation first
2. Update component/API/model docs
3. Update this README if adding new feature
4. Commit with clear message: "docs: update [feature-name] documentation"

---

For more information, see the [documentation-writer skill](.github/skills/documentation-writer/SKILL.md).
