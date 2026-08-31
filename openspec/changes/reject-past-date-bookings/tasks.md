## 1. Validation

- [ ] 1.1 In the `POST /api/bookings` handler, compare `preferredDate` against the start of the current day and return a `400` with `{ success: false, message }` before any persistence call when the date is in the past
- [ ] 1.2 Verify a booking request with today's date or a future date is created and returns the existing `{ success: true, data }` response, unchanged
- [ ] 1.3 Verify a booking request with a past date is rejected, returns a `{ success: false, message }` error, and that no document is written (confirm via `GET /api/bookings` or a database query)
