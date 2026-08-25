# Tasks

## 1. Server: add static service field to health endpoint
- [ ] 1.1 In `server/server.js`, update the `GET /api/health` handler to include `service: 'photography-api'` alongside the existing `status` and `message` fields.
- [ ] 1.2 Confirm `GET /api/health` returns `{ status: 'OK', message: 'Server is running', service: 'photography-api' }` with a `200` status.

## 2. Client API: add health method to bookingAPI
- [ ] 2.1 In `client/src/utils/api.js`, add a `getHealth` method to the exported `bookingAPI` object that performs `api.get('/health')` and returns `response.data`.

## 3. Client Booking: surface the service identifier
- [ ] 3.1 In `client/src/components/Booking.jsx`, call `bookingAPI.getHealth()` on load (e.g. in a `useEffect`).
- [ ] 3.2 Render a small technical text within the Booking section (`id="booking"`) that contains the string `"photography-api"`.
- [ ] 3.3 Leave the booking form fields, validation, submission, and success modal unchanged.

## 4. Verify boundaries and no regression
- [ ] 4.1 Confirm only `server/server.js`, `client/src/utils/api.js`, and `client/src/components/Booking.jsx` were modified.
- [ ] 4.2 Run `cd client && npm run lint` and `npm run build`; both pass.
- [ ] 4.3 Confirm no new endpoint, file, dependency, or translation key was added, and `npm audit fix` was not run.
