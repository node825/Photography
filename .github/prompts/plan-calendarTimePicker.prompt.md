# Plan: Calendar Time Picker for Photo Bookings

**TL;DR:** Build a calendar-based time selection system integrated into the Order form. Backend stores session times with session-type-specific durations and availability config. Frontend replaces current date input with calendar showing available/unavailable slots. **Decisions made:** Direct JSON config (photographer can edit via git or we add admin UI later), 15-min buffer between sessions (for travel/setup), 48-hour minimum booking notice (prevents last-minute disruptions).

## Steps

### Backend Changes

1. **Update Booking model** (`server/models/Booking.js`)
   - Add `preferredTime` (String, HH:MM format, required)
   - Add `duration` (Number, minutes, required)
   - Change unique index from `email + preferredDate` to `email + preferredDate + preferredTime`
   - Add validation: ensure `preferredDate` is ≥48 hours from now (minimum booking notice)

2. **Create availability configuration** (`server/config/availability.json`)
   - Daily schedule: start time (9:00), end time (18:00), interval (30 min)
   - Session durations: newborn=90 min, toddler=60 min, kids=60 min, family=120 min
   - Buffer between sessions: 15 minutes
   - Minimum notice: 48 hours (in milliseconds or hours field)
   - Blocked dates (holidays)
   - Example structure provided below

3. **Create availability calculation utility** (`server/utils/availabilityHelper.js`)
   - Function: `getAvailableSlots(date, sessionType, bookings, config)`
   - Logic:
     - Verify date is ≥48 hours from now
     - Generate slots based on config (9:00–18:00, every 30 min)
     - Filter out slots where session would overlap with existing bookings + 15-min buffer
     - Filter out blocked dates
     - Return array of `{ time: "09:00", available: true|false }`

4. **Create new API endpoint** `GET /api/availability` in `server/routes/bookings.js`
   - Query params: `date` (YYYY-MM-DD), `sessionType` (newborn|toddler|kids|family)
   - Uses `getAvailableSlots()` utility
   - Response: `{ date, sessionType, slots: [{ time: "09:00", available: true }, ...] }`
   - Error 400 if date is in past or <48 hours away

5. **Update booking controller** (`server/controllers/bookingController.js`)
   - Modify `createBooking` to accept `preferredTime` and `duration`
   - Validate: time is available (no overlap with existing bookings + buffer)
   - Validate: date is ≥48 hours ahead
   - Return error if slot no longer available (race condition)
   - Set `status: 'pending'` and default `duration` from config if not provided

### Frontend Changes

6. **Create CalendarTimePicker component** (`client/src/components/CalendarTimePicker.jsx`)
   - Props: `sessionType`, `onDateTimeSelect`, `selectedDateTime`, `disabledDates` (optional)
   - Layout: Month calendar (left) + Time slots panel (right)
   - Calendar: use `react-big-calendar` or custom; disable past dates + dates >48 hours booked
   - Time slots: fetch from `GET /api/availability?date=...&sessionType=...` when date clicked
   - Show loading spinner during fetch
   - Time slot UI: grid of buttons, disabled if unavailable, highlight selected
   - Return to parent: `{ date: "2026-02-15", time: "14:00" }`
   - i18n keys: `calendar.selectDate`, `calendar.selectTime`, `calendar.available`, `calendar.booked`, `calendar.loading`, `calendar.minNotice`, `calendar.notAvailable`

7. **Update Order component** (`client/src/components/Order.jsx`)
   - Add state: `preferredTime` (initially null)
   - Replace HTML `<input type="date" />` with `<CalendarTimePicker />`
   - Update form submission to include `preferredTime` and compute `duration` from config
   - Update API call: POST to `/api/bookings` with `{ ..., preferredDate, preferredTime, duration }`
   - Handle new error: "Time slot no longer available" (race condition)
   - Update i18n: add calendar translation keys

8. **Add i18n support**
   - Update `client/src/i18n/locales/he/translation.json` (Hebrew)
   - Update `client/src/i18n/locales/en/translation.json` (English)
   - Add namespace `calendar` with keys: `selectDate`, `selectTime`, `available`, `booked`, `loading`, `minNotice`, `notAvailable`, `helper`
   - Update `order` namespace: replace `form.preferredDate` label with `form.dateTime`

### Configuration Setup

9. **Create `server/config/availability.json`**
   ```json
   {
     "dailySchedule": {
       "startTime": "09:00",
       "endTime": "18:00",
       "intervalMinutes": 30
     },
     "sessionDurations": {
       "newborn": 90,
       "toddler": 60,
       "kids": 60,
       "family": 120
     },
     "bufferMinutes": 15,
     "minimumNoticeHours": 48,
     "blockedDates": []
   }
   ```

10. **Load availability config** in `server/server.js`
    - `const availabilityConfig = require('./config/availability.json');`
    - Pass to routes/controllers as needed

11. **Migrate existing bookings** (if any)
    - Update all existing bookings to have `preferredTime` (e.g., "10:00") and `duration` (from config)
    - Consider data migration script in `server/migrations/` if needed

## Verification

- **API tests:**
  - `GET /api/availability?date=2026-02-16&sessionType=family` returns correct slots (48+ hours away)
  - `GET /api/availability?date=2026-02-10&sessionType=family` returns error (too soon)
  - `POST /api/bookings` with valid time creates booking
  - `POST /api/bookings` with unavailable time returns error
  - Verify buffer: booking 09:00–10:30 (newborn) blocks 09:00–10:45 (buffer included)
  
- **Frontend tests:**
  - Calendar disables dates <48 hours away
  - Clicking date fetches slots; loading spinner appears
  - Time slots grid displays and reflects server availability
  - Selecting time updates form
  - Submit creates booking with time and duration
  - Error message for "slot no longer available"

- **Manual e2e:**
  - Book a family session Feb 15 @ 2:00 PM
  - Verify Feb 15 @ 2:00 PM and overlapping slots (2:00–4:00 PM + 15 min = 2:00–4:15) are blocked
  - Try booking same time → error
  - Verify minimum notice: try to book Feb 10 @ 9 AM (only 25 hours away) → error

## Decisions

- **Admin interface:** Not in v1. Direct JSON file editing via git/code editor. Can add UI form later (easy enhancement).
- **Buffer:** 15 minutes between bookings (configurable in `availability.json`). Accounts for photographer transitions/setup.
- **Minimum notice:** 48 hours ahead (configurable). Prevents last-minute disruptions; can be changed in config.
- **Session duration:** Type-based, read from config. Automatically calculated; not customer-selectable.
