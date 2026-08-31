## Purpose

Defines the validation rules applied when a booking request is created, so that the booking calendar only ever contains real, actionable dates.

## ADDED Requirements

### Requirement: Reject booking requests for past dates
The system SHALL reject a booking creation request whose `preferredDate` is before the current date, and SHALL NOT persist the booking.

#### Scenario: Booking with a future date succeeds
- **WHEN** a visitor submits a booking request with a `preferredDate` today or in the future
- **THEN** the system creates the booking and returns the existing `{ success: true, data }` response

#### Scenario: Booking with a past date is rejected
- **WHEN** a visitor submits a booking request with a `preferredDate` before today
- **THEN** the system does not create the booking
- **AND** the system returns an error response following the `{ success: false, message }` convention with a clear message explaining the date is in the past
