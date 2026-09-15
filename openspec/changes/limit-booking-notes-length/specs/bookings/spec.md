## Purpose

Defines the length constraint applied to a booking request's notes field before validation and storage, so every stored booking stays readable and the request payload stays bounded.

## ADDED Requirements

### Requirement: Limit booking notes length
The system SHALL reject a booking creation request whose `notes` field is longer than 500 characters, returning a clear error and persisting nothing.

#### Scenario: Notes at or under the limit succeed
- **WHEN** a visitor submits a booking request with a `notes` field of 500 characters or fewer
- **THEN** the system creates the booking as before
- **AND** the response follows the existing `{ success: true, data }` shape

#### Scenario: Notes over the limit are rejected
- **WHEN** a visitor submits a booking request with a `notes` field longer than 500 characters
- **THEN** the system rejects the request
- **AND** the response follows the existing `{ success: false, message }` shape
- **AND** no booking is stored

#### Scenario: Empty or missing notes succeed
- **WHEN** a visitor submits a booking request with an empty or missing `notes` field
- **THEN** the system creates the booking as before
- **AND** the response follows the existing `{ success: true, data }` shape
