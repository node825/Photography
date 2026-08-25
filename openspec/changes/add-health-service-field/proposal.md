# Add static health service field surfaced in the Booking section

## Why

Nothing currently proves end-to-end that the OpenSpec pipeline (intake issue →
spec → implementation) can touch both `client/` and `server/` in a single
change. A minimal smoke-test change that touches both sides closes this gap.
See issue #14.

## What Changes

- Add a static `service: "photography-api"` field to the existing
  `GET /api/health` JSON response, in addition to the existing `status` and
  `message` fields, without changing them.
- Read the health response through the existing booking API client so the
  Booking section can access it.
- Surface the `service` value as small technical text in the Booking section
  after the page loads.

Out of scope: any new endpoint, any new file (beyond this proposal), any change
to booking logic/validation/submission, any new translation key, any design
change beyond one line of text, any docs or workflow change, and any new
dependency.

## Impact

- Affected specs: `health-check` (new capability), `booking` (new capability)
- Affected code: `server/server.js`, `client/src/utils/api.js`,
  `client/src/components/Booking.jsx`
- No new dependencies. Booking behavior is unchanged; no observable regression.
