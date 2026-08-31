## Purpose

Defines the normalization rules applied to a booking request's email before validation and storage, so that equivalent addresses cannot bypass the duplicate booking constraint.

## ADDED Requirements

### Requirement: Normalize booking email before storage
The system SHALL trim leading and trailing whitespace and lowercase the `email` field of a booking creation request before validating and persisting the booking.

#### Scenario: Email is normalized on save
- **WHEN** a visitor submits a booking request with email " Dana@GMAIL.com "
- **THEN** the system stores the booking with email "dana@gmail.com"
- **AND** the response follows the existing `{ success: true, data }` shape

#### Scenario: Differently-cased duplicate is rejected
- **WHEN** a visitor submits a booking for a given date with email "dana@gmail.com"
- **AND** a second booking is submitted for the same date with email "Dana@Gmail.com" (or with extra surrounding whitespace)
- **THEN** the system rejects the second booking as a duplicate for that email and date
