# Health Capability

## ADDED Requirements

### Requirement: Health Check Service Identifier
The `GET /api/health` endpoint SHALL include a static `service` field with the value `"photography-api"` in its JSON response, in addition to the existing fields, without changing them.

#### Scenario: Health response includes the service identifier
- **WHEN** a client sends `GET /api/health`
- **THEN** the response status is `200`
- **AND** the response body includes `service: "photography-api"`

#### Scenario: Existing health fields remain unchanged
- **WHEN** a client sends `GET /api/health`
- **THEN** the response body still includes the existing `status` field with value `"OK"`
- **AND** the response body still includes the existing `message` field with value `"Server is running"`
