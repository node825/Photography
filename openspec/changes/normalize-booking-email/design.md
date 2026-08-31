## Context

See proposal.md - Why. The `Booking` model's `email` field already has `lowercase: true` but no `trim: true`, so surrounding whitespace can still produce a distinct value in the unique `{ email, preferredDate }` index even after casing is normalized by Mongoose on save.

## Goals / Non-Goals

**Goals:**
- Ensure the email used for validation and persistence is trimmed and lowercased before it reaches the uniqueness check.

**Non-Goals:**
- Re-validating email format (already handled by the existing schema `match` validator).
- Normalizing any other booking field.
- Backfilling or migrating previously stored bookings.

## Decisions

- Normalize `email` (trim + lowercase) in the `POST /api/bookings` request handler before calling `Booking.create`, in addition to relying on the schema's existing `lowercase: true`. This guarantees the normalized value is what gets checked against the unique index, regardless of any future changes to how the model is invoked. Alternative considered: add `trim: true` to the schema alone — rejected as the sole fix because the acceptance hint calls for normalization "on the server before validation," and normalizing in the handler keeps the behavior explicit and testable at the API boundary.

## Risks / Trade-offs

- [Normalizing only in the handler could be bypassed by another code path that calls `Booking.create` directly] → The schema's existing `lowercase: true` still lowercases on save as a second layer; scope here only requires `POST /api/bookings` to normalize correctly.
