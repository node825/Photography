## Why

The notes field on a booking request has no length limit, so a visitor can submit an unbounded block of text that is stored as-is and makes the bookings list unreadable. Booking notes should be limited to a reasonable length so every stored booking stays readable and the request payload stays bounded.

## What Changes

- Add server-side validation on booking creation that rejects any request whose `notes` field is longer than 500 characters, returning a clear error and persisting nothing.
- Booking creation with notes of 500 characters or fewer, or with an empty or missing `notes` field, continues to succeed exactly as before.

## Capabilities

### New Capabilities
- `bookings`: Booking creation behavior, including validation rules applied before a booking is persisted.

### Modified Capabilities
(none)

## Impact

- Affected code: `POST /api/bookings` request handling (booking creation validation logic).
- No new dependencies.
- No change to the existing API response shape for successful bookings.
- No client-side character counters, input limits, trimming, or truncation.
- No changes to existing stored bookings.
- No changes to any other field of the booking form.
