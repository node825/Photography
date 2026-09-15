## Context

See proposal.md - Why. The `Booking` schema's `notes` field (`server/models/Booking.js`) currently has no length constraint. The `POST /api/bookings` handler (`server/controllers/bookingController.js`) already performs an explicit pre-save check (the past-date rejection) that returns `{ success: false, message }` before calling `Booking.create`.

## Goals / Non-Goals

**Goals:**
- Guarantee a request with `notes` over 500 characters is rejected with a clear, predictable message before anything is persisted.

**Non-Goals:**
- Client-side character counters, input limits, trimming, or truncation (explicitly out of scope per proposal.md - Impact).
- Changing validation or storage of any other booking field.

## Decisions

- Add the length check as an explicit guard in the `POST /api/bookings` handler, following the same pattern already used for the past-date check: if `notes` is present and its length exceeds 500, return `res.status(400).json({ success: false, message: ... })` before calling `Booking.create`. Alternative considered: relying solely on a Mongoose schema `maxlength` validator — rejected because a schema validation failure would fall through to the generic `catch` block and surface Mongoose's verbose `"Booking validation failed: notes: ..."` message rather than a clear, purpose-written one, and because the acceptance hints ask for server-side validation with "a clear error message."
- Treat an empty string or missing `notes` as valid (0 characters), consistent with the existing schema default of `''`.

## Risks / Trade-offs

- [A future code path that calls `Booking.create` directly could bypass the handler-level check] → Scope here only requires `POST /api/bookings` to enforce the limit, matching how the existing past-date check is scoped.
