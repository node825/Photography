## Why

A visitor can currently submit a booking request for a date in the past. Booking requests for past dates should be rejected server-side so the calendar only ever contains real, actionable bookings.

## What Changes

- Add server-side validation on booking creation that rejects any request whose `preferredDate` is before today, returning a clear error and persisting nothing.
- Booking creation with a valid (today or future) `preferredDate` continues to succeed exactly as before.

## Capabilities

### New Capabilities
- `bookings`: Booking creation behavior, including validation rules applied before a booking is persisted.

### Modified Capabilities
(none)

## Impact

- Affected code: `POST /api/bookings` request handling (booking creation validation logic).
- No new dependencies.
- No change to the existing success response shape for `POST /api/bookings`.
- No client-side calendar changes and no timezone configuration changes.
- No changes to existing stored bookings.
