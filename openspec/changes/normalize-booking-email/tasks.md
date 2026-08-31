## 1. Normalization

- [ ] 1.1 In the `POST /api/bookings` handler, trim and lowercase `email` before it is passed to `Booking.create`, and verify a request with email " Dana@GMAIL.com " is stored with email "dana@gmail.com"
- [ ] 1.2 Verify a second booking submitted for the same date with the same email in a different casing (or with extra surrounding whitespace) is rejected as a duplicate, returning the existing `{ success: false, message }` error
- [ ] 1.3 Verify a normal booking request still returns the existing `{ success: true, data }` response shape, unchanged
