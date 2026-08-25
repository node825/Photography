# booking

## ADDED Requirements

### Requirement: Booking section surfaces the API service identifier

The Booking section SHALL retrieve the health information through the existing
booking API client and display the returned `service` value as small technical
text, without altering the booking form's fields, validation, submission, or
success modal, and without introducing new translation keys.

#### Scenario: Service identifier is visible after the page loads

- **WHEN** the Booking section finishes loading
- **THEN** small technical text containing the string `photography-api` is
  visible in the Booking section

#### Scenario: Booking form behavior is unchanged

- **WHEN** a user completes and submits the booking form
- **THEN** the fields, validation, submission, and success modal behave exactly
  as before the change, with no observable regression
