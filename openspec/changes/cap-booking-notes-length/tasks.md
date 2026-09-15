## 1. Validation

- [ ] 1.1 In the `POST /api/bookings` handler, reject a request whose `notes` field is longer than 500 characters before calling `Booking.create`, returning `{ success: false, message }` with a clear error and verify no booking is stored in this case
- [ ] 1.2 Verify a booking request with notes of exactly 500 characters succeeds and returns the existing `{ success: true, data }` response shape, unchanged
- [ ] 1.3 Verify a booking request with an empty or missing `notes` field succeeds and returns the existing `{ success: true, data }` response shape, unchanged
