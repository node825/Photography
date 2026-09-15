## Context

See proposal.md - Why. The `Booking` model's `notes` field (`server/models/Booking.js`) currently only has a `default: ''`, with no length constraint, and `createBooking` in `server/controllers/bookingController.js` already performs one explicit pre-persistence check (rejecting a past `preferredDate`) before calling `Booking.create`.

## Goals / Non-Goals

**Goals:**
- Guarantee a booking with `notes` longer than 500 characters is rejected with a clear message before anything is persisted.

**Non-Goals:**
- Trimming or truncating over-length notes to fit the limit.
- Any client-side character counter or input limit.
- Validating or changing any other booking field.
- Backfilling or migrating previously stored bookings.

## Decisions

- Enforce the 500-character cap as an explicit check in the `createBooking` handler, following the same pattern already used there for the past-date rejection: check the condition, and if violated, `return res.status(400).json({ success: false, message: '...' })` before calling `Booking.create`. Alternative considered: add a Mongoose `maxlength` validator to the `notes` field on the schema instead — rejected as the sole mechanism because a schema validation failure surfaces through the generic `catch` block as `error.message`, which is a verbose Mongoose validation string rather than the same clear, purpose-written message style the past-date check already produces at this endpoint.
- Treat `notes` as unset when it is `undefined`, `null`, or an empty string — none of these count toward or trip the 500-character limit, matching the schema's existing `default: ''`.

## Risks / Trade-offs

- [Enforcing the cap only in the `createBooking` handler could be bypassed by another code path that calls `Booking.create` directly] → No other code path creates bookings today; scope here only requires `POST /api/bookings` to enforce the limit, matching how the existing past-date check is scoped.
