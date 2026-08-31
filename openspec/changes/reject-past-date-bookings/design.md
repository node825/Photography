## Context

See proposal.md - Why. This is a single-endpoint validation change to `POST /api/bookings` with no new dependencies and no data model changes.

## Goals / Non-Goals

**Goals:**
- Ensure a past `preferredDate` is rejected before any database write occurs.

**Non-Goals:**
- Client-side calendar restrictions.
- Timezone configuration or handling beyond comparing against the server's current date.
- Changes to any other booking field validation.

## Decisions

- Compare `preferredDate` against the start of the current server-local day (normalize time-of-day to midnight before comparing), so a booking for "today" is accepted regardless of the current time. Alternative considered: comparing against the exact current timestamp, rejected because it would incorrectly reject same-day bookings made later in the day.
- Perform the check in the request handler before calling the persistence layer, returning early on failure so nothing is stored. Alternative considered: a model-level (schema) validator, rejected because "past" is relative to request time, not to the document, and keeping it in the handler keeps the check colocated with other request-level validation.

## Risks / Trade-offs

- [Server/client clock or timezone drift could classify a boundary date differently than the visitor expects] → Out of scope per proposal boundaries; acceptable given no timezone configuration exists today.
