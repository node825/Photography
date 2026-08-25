# Newsletter Signup

Full-stack newsletter subscription feature: a signup section with an email field and a
subscribe button on the home page, backed by a persisted list of subscribers.

> Note: This file combines the component and API documentation in a single feature doc.
> The repository conventions place component docs under `doc/react/<Component>/README.md`
> and API docs under `doc/api/<route>.md`; those paths can be created when tooling allows.

## Frontend — `Newsletter` component

Location: `client/src/components/Newsletter.jsx`

### Purpose
Lets visitors subscribe to the photographer's newsletter to receive updates on new
sessions, offers, and photography tips.

### Behavior
- Single `formData` state object (`{ email }`) plus a separate `errors` object.
- Client-side validation in `validateForm()`:
  - Required email (`newsletter.validation.required`)
  - Email format (`newsletter.validation.invalidEmail`)
- Async submit sets `isSubmitting`, uses `try` / `catch` / `finally`, disables the button
  while submitting, and shows success/error status text.
- On success the field is cleared and a success message is shown.

### State
```javascript
formData: { email: '' }
errors: {}                              // field-level error messages
isSubmitting: boolean                   // disables the button during the API call
submitStatus: null | 'success' | 'error'
```

### API Integration
Submits via `newsletterAPI.subscribe(email)` in `client/src/utils/api.js`:
```javascript
await newsletterAPI.subscribe('jane@example.com');
```

### Translation Keys (`newsletter.*`)
Added to both `client/src/i18n/locales/he/translation.json` and
`client/src/i18n/locales/en/translation.json`:
`title`, `subtitle`, `emailLabel`, `placeholder`, `submit`, `sending`,
`success`, `error`, `validation.required`, `validation.invalidEmail`.

### Integration in Home.jsx
Rendered between `Contact` and `Footer` with `id="newsletter"`.

## Backend — Subscribers API

Base path: `/api/subscribers`

### Subscribe
`POST /api/subscribers`

**Request body**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| email | string | Yes | Trimmed, lowercased, valid email, unique. |

```json
{ "email": "jane@example.com" }
```

**Responses**

| Case | Status | Body |
|------|--------|------|
| Created | 201 | `{ "success": true, "data": { "_id": "...", "email": "jane@example.com", "createdAt": "..." } }` |
| Invalid / missing email | 400 | `{ "success": false, "message": "Please provide a valid email" }` |
| Already subscribed | 400 | `{ "success": false, "message": "This email is already subscribed to the newsletter" }` |

### Data Model
`server/models/Subscriber.js`

| Field | Type | Constraints |
|-------|------|-------------|
| email | String | required, trim, lowercase, email format, unique index |
| createdAt | Date | defaults to `Date.now` |

A unique index on `{ email: 1 }` prevents duplicate subscriptions.

### Files
- `server/models/Subscriber.js`
- `server/controllers/subscriberController.js`
- `server/routes/subscribers.js` (mounted in `server/server.js` at `/api/subscribers`)

### Notes
- Requires a working MongoDB connection (`MONGODB_URI`); without it, subscription requests fail.
- The endpoint is public and unauthenticated, matching the existing booking endpoints.
