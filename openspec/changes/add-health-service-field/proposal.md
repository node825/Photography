# Change: Static health field surfaced in the Booking section

## Why

Nothing currently proves end-to-end that the OpenSpec pipeline (intake form → spec → implementation) can touch both `client/` and `server/` in a single change. A minimal smoke-test change that exercises both sides closes this gap, giving us confidence that the intake → spec → implementation flow works across the full stack before larger changes rely on it.

## What Changes

- **Server:** Add one static field, `service: "photography-api"`, to the existing `GET /api/health` JSON response. The existing `status` and `message` fields remain unchanged, and no new endpoint or file is created.
- **Client (`bookingAPI`):** Add a `getHealth` method to the existing `bookingAPI` object in `client/src/utils/api.js` that calls the existing `GET /api/health` endpoint. No new file is created.
- **Client (Booking section):** On load, `client/src/components/Booking.jsx` fetches health via `bookingAPI` and renders a small technical text containing the string `"photography-api"` inside the Booking section. The booking form (fields, validation, submission, success modal) behaves exactly as before, with no observable regression.

### Boundaries — what must not change

Only these files may be touched by the implementation:

- `server/server.js`
- `client/src/utils/api.js`
- `client/src/components/Booking.jsx`

Nothing else — including `.github/`, `doc/`, `openspec/` (except this new change directory), locale files, or any other component. No new endpoint. No new file. No change to booking logic/validation/submission. No new translation key. No design change beyond one line of text. No docs or workflows. No new dependencies. Do not run `npm audit fix`.

## Impact

- Affected specs: `health`, `booking`
- Affected code: `server/server.js`, `client/src/utils/api.js`, `client/src/components/Booking.jsx`
