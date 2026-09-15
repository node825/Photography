## Purpose

Defines the length constraint applied to a booking request's notes field before validation and storage, so every stored booking stays readable and the request payload stays bounded.

## ADDED Requirements

### Requirement: Cap booking notes length
The system SHALL reject a booking creation request whose `notes` field exceeds 500 characters, returning a clear error and persisting nothing.

#### Scenario: Notes at or under the limit succeed
- **WHEN** a visitor submits a booking request with notes of 500 characters or fewer
- **THEN** the system creates the booking as before

#### Scenario: Notes over the limit are rejected
- **WHEN** a visitor submits a booking request with notes longer than 500 characters
- **THEN** the system rejects the request with a clear error message
- **AND** no booking is stored

#### Scenario: Empty or missing notes succeed
- **WHEN** a visitor submits a booking request with an empty or missing `notes` field
- **THEN** the system creates the booking as before

#### Scenario: Error response follows existing convention
- **WHEN** a booking request is rejected for exceeding the notes length limit
- **THEN** the response follows the existing `{ success, message }` convention
