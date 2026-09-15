## Why

The `notes` field on a booking request has no length limit, so a visitor can submit an unbounded block of text that is stored as-is, making the bookings list unreadable and leaving the request payload unbounded.

## What Changes

- Add server-side validation on booking creation that rejects any request whose `notes` field is longer than 500 characters, returning a clear error and persisting nothing.
- Booking creation with notes of 500 characters or fewer, or with an empty/missing `notes` field, continues to succeed exactly as before.

## Capabilities

### New Capabilities
- `bookings`: Booking creation behavior, including validation rules applied before a booking is persisted.

### Modified Capabilities
(none)

## Impact

- Affected code: `POST /api/bookings` request handling (booking creation validation logic).
- No new dependencies.
- No change to the existing success response shape for `POST /api/bookings`.
- No client-side character counters or input limits.
- No trimming or truncating of the notes text.
- No changes to existing stored bookings.
- No changes to any other field of the booking form.
