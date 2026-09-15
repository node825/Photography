## 1. Notes length validation

- [ ] 1.1 In the `POST /api/bookings` handler, add a guard that rejects the request with `res.status(400).json({ success: false, message })` before calling `Booking.create` when `notes` is longer than 500 characters
- [ ] 1.2 Verify a booking request with a 500-character `notes` field succeeds and returns the existing `{ success: true, data }` shape
- [ ] 1.3 Verify a booking request with a 501-character `notes` field is rejected with the existing `{ success: false, message }` shape and that no booking is stored
- [ ] 1.4 Verify a booking request with an empty string or missing `notes` field still succeeds, returning the existing `{ success: true, data }` shape
