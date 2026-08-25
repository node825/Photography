# Tasks

## 1. Server health endpoint
- [ ] 1.1 In `server/server.js`, add a static `service: "photography-api"` field to the `GET /api/health` JSON response, keeping the existing `status` and `message` fields unchanged.

## 2. Client API access
- [ ] 2.1 In `client/src/utils/api.js`, add a `bookingAPI` method that requests `GET /api/health` and returns the response data, reusing the existing axios instance.

## 3. Booking section display
- [ ] 3.1 In `client/src/components/Booking.jsx`, fetch the health data when the section loads and render the returned `service` value as small technical text.
- [ ] 3.2 Confirm the booking form (fields, validation, submission, success modal) behaves exactly as before, with no new translation keys and no design change beyond the one line of text.

## 4. Validation
- [ ] 4.1 Run `openspec validate add-health-service-field --strict`.
- [ ] 4.2 Run `npm run build` in `client/`.
