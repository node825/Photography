# Booking Capability

## ADDED Requirements

### Requirement: Booking Section Health Indicator
The Booking section SHALL display a small technical text containing the string `"photography-api"`, sourced from the `GET /api/health` response via the existing `bookingAPI` client, after the page has loaded.

#### Scenario: Service identifier appears in the Booking section
- **WHEN** the page has loaded and the Booking section is rendered
- **THEN** the Booking section contains a small technical text that includes the string `"photography-api"`

#### Scenario: Booking form behavior is unchanged
- **WHEN** a user interacts with the booking form fields, validation, submission, and success modal
- **THEN** the form behaves exactly as before with no observable regression
- **AND** no new translation key or design change beyond one line of technical text is introduced
