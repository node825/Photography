# health-check

## ADDED Requirements

### Requirement: Health endpoint identifies the service

The `GET /api/health` endpoint SHALL include a static `service` field with the
value `photography-api` in its JSON response, in addition to the existing
`status` and `message` fields, without changing those existing fields.

#### Scenario: Health response includes the service identifier

- **WHEN** a client sends `GET /api/health`
- **THEN** the response status is `200`
- **AND** the JSON body includes `service` equal to `photography-api`
- **AND** the existing `status` and `message` fields are returned unchanged
