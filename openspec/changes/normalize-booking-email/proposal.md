## Why

The same visitor can create duplicate bookings by typing their email with different casing or extra whitespace (e.g. "Dana@Gmail.com " vs "dana@gmail.com"), which bypasses the unique email+date constraint. Emails should be normalized before saving.

## What Changes

- Trim whitespace and lowercase the booking `email` on the server before validation and storage, so equivalent addresses are always stored in the same canonical form.
- A second booking submitted for the same date with the same email in a different casing or with extra whitespace is rejected as a duplicate.

## Capabilities

### New Capabilities
- `bookings`: Booking creation behavior, including normalization rules applied before a booking is validated and persisted.

### Modified Capabilities
(none)

## Impact

- Affected code: `POST /api/bookings` request handling (booking creation, `email` normalization prior to `Booking.create`).
- No new dependencies.
- No change to the existing `{ success, data }` response shape for `POST /api/bookings`.
- No email format re-validation changes.
- No changes to existing stored bookings.
- No client-side changes.
