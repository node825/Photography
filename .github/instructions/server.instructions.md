---
description: "Use when creating or editing Express/Mongoose backend code in server/ — API routes, controllers, Mongoose models, middleware, database config, or environment variables."
applyTo: "server/**"
---

# Server (Express 5 + Mongoose) Instructions

## Module & Layout

- CommonJS only: `require` / `module.exports`. Never `import`/`export` — the client uses ESM, the server does not.
- Keep the four-layer split; a request flows `routes/` → `controllers/` → `models/`, with cross-cutting concerns in `middleware/` and `config/`.
- New resources add all three files together: `models/<Entity>.js`, `controllers/<entity>Controller.js`, `routes/<entities>.js`, then mount in `server.js` with `app.use('/api/<entities>', require('./routes/<entities>'))`.
- All code, identifiers, comments, and log messages in English. No emoji in logs.

## Controllers

Each exported handler is an `async` arrow function preceded by a three-line comment header, wrapping its body in `try`/`catch`. Export a plain object at the bottom.

```js
// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { clientName, email } = req.body;
    const booking = await Booking.create({ clientName, email });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { createBooking };
```

- Destructure `req.body` explicitly — never pass the raw body into `Model.create()` or `findByIdAndUpdate()` (mass-assignment risk).
- Use `return res.status(...).json(...)` on every early-exit branch so a single handler can never send twice.

## Response Envelope (never deviate)

| Case | Status | Body |
|---|---|---|
| Created | 201 | `{ success: true, data }` |
| Single entity | 200 | `{ success: true, data }` |
| List | 200 | `{ success: true, count: items.length, data: items }` |
| Validation / bad input / duplicate key | 400 | `{ success: false, message }` |
| Missing entity | 404 | `{ success: false, message }` |
| Unexpected failure | 500 | `{ success: false, message: error.message }` |

Handle Mongo duplicate-key explicitly before the generic catch:

```js
if (error.code === 11000) {
  return res.status(400).json({
    success: false,
    message: 'A booking already exists for this email on this date'
  });
}
```

## Routes

```js
const express = require('express');
const router = express.Router();
const { getAllBookings, createBooking, getAvailableDates, getBooking } = require('../controllers/bookingController');

router.route('/').get(getAllBookings).post(createBooking);
router.route('/available-dates').get(getAvailableDates);
router.route('/:id').get(getBooking);

module.exports = router;
```

- Use `router.route(path).get(...).post(...)` chaining, not separate `router.get`/`router.post` calls for the same path.
- **Declare every literal path before `/:id`.** Express matches in order, so a route added after `/:id` will be swallowed and treated as an ID.
- Routes contain no logic — no validation, no database access, only handler references.

## Models

```js
sessionType: {
  type: String,
  required: [true, 'Please select session type'],
  enum: ['newborn', 'toddler', 'kids', 'family']
},
```

- Validation lives in the schema: `required: [true, 'Message']` with an English message, plus `trim`, `lowercase`, `match`, `enum`, `default` as appropriate.
- Track creation time with an explicit field, matching the existing model: `createdAt: { type: Date, default: Date.now }`. Do not switch to the `{ timestamps: true }` schema option.
- Declare indexes after the schema and before the export: `bookingSchema.index({ email: 1, preferredDate: 1 }, { unique: true });`
- Export with `module.exports = mongoose.model('Booking', bookingSchema);`
- `sessionType` enum values are duplicated in the client UI, both locale files, and [photographer-info.json](photographer-info.json) — update every surface when categories change.

## Startup & Config

- `server.js` order is fixed: `dotenv.config()` → `connectDB()` → `cors()` → `express.json()` → `express.urlencoded()` → routes → `/api/health` → `errorHandler`. The error handler stays last.
- The server must keep starting when `MONGODB_URI` is absent — `connectDB` warns and returns rather than calling `process.exit`. Do not add a hard exit.
- `/api/health` returns `{ status: 'OK', message: 'Server is running' }` and must not touch the database.
- Read config only through `process.env` with a fallback (`process.env.PORT || 5000`). Add every new variable to `server/.env.example` with a placeholder; never commit real credentials, connection strings, or keys.

## Logging

`console.log` for startup/success, `console.warn` for degraded-but-running conditions, `console.error` for failures. Never log request bodies, emails, or connection strings containing credentials.

## Security

The current setup is development-grade. These are known gaps — do not treat them as the pattern to copy, and flag them when touching nearby code:

- `app.use(cors())` allows every origin. New deployments should pass an explicit `origin` allowlist.
- No rate limiting, no `helmet`, no request-size limits on `express.json()`.
- `errorHandler` returns `err.message` unconditionally; error detail and stacks must not leak in production — gate on `process.env.NODE_ENV`.
- Unmatched paths fall through to Express's default HTML 404 instead of the JSON envelope.
- All routes are `@access Public` with no auth. Any endpoint that lists, mutates, or deletes records needs authorization before it ships.

Never weaken what exists: keep schema validation on every user-supplied field, keep `req.body` destructured, and never interpolate user input into a query object.

## Validation

There is no test runner — `npm test` is a placeholder that exits with an error. Verify manually:

```powershell
cd server
npm run dev
curl http://localhost:5000/api/health
```

## Documentation

Adding or changing an endpoint requires updating `doc/api/<routeName>.md` in the same change.
