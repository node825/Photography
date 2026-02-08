# Booking Component

## Purpose
The Booking component provides a form for clients to schedule photo sessions with the photographer. It collects client information, session type preference, and desired date, then submits the booking request to the backend API.

## Features
- **Client Information Form**: Collects name, phone, email
- **Session Type Selection**: Dropdown with predefined session types (newborn, toddler, kids, family)
- **Date Picker**: HTML5 native date input with future date validation
- **Optional Notes**: Textarea for additional client requests
- **Client-side Validation**: 
  - Required field validation
  - Email format validation
  - Phone number format validation
  - Future date enforcement (blocks past dates)
- **Success Modal**: Displays booking confirmation with customer details
- **Error Handling**: Shows field-level and form-level error messages
- **Bilingual Support**: Full i18n support for Hebrew (RTL) and English (LTR)
- **Animations**: Framer Motion scroll animations and interactive states

## Form Fields
- **clientName** (string, required) - Client's full name
- **phone** (string, required) - Phone number with validation
- **email** (string, required) - Email address with format validation
- **sessionType** (enum, required) - One of: `newborn`, `toddler`, `kids`, `family`
- **preferredDate** (date, required) - Future date only
- **notes** (string, optional) - Additional message or requirements

## State Management
```javascript
formData: {
  clientName: '',
  phone: '',
  email: '',
  sessionType: '',
  preferredDate: '',
  notes: ''
}
isSubmitting: boolean        // Disables submit button during API call
submitStatus: null|'success'|'error'  // Tracks submission state
showSuccessModal: boolean    // Controls success modal visibility
errors: {}                   // Field-level error messages
```

## API Integration
Submits to `POST /api/bookings` using `bookingAPI.createBooking(formData)`:
```javascript
await bookingAPI.createBooking({
  clientName: 'John Doe',
  phone: '053-123-4567',
  email: 'john@example.com',
  sessionType: 'kids',
  preferredDate: '2025-03-15',
  notes: 'Optional notes'
});
```

Returns: `{ _id, createdAt, status: "pending", ... }`

## Validation Rules
| Field | Rule | Error Message |
|-------|------|---------------|
| clientName | Required, non-empty | `booking.form.validation.required` |
| phone | Required, valid format | `booking.form.validation.required` or `invalidPhone` |
| email | Required, valid email format | `booking.form.validation.required` or `invalidEmail` |
| sessionType | Required, must select option | `booking.form.validation.required` |
| preferredDate | Required, must be future date | `booking.form.validation.required` or `futureDate` |

## UX Behavior
1. **On Change**: Clears error for that field when user starts typing
2. **On Submit**: 
   - Validates all fields
   - Shows field-level errors if validation fails
   - Submits to API if all valid
   - Disables button with "Sending..." text during submission
3. **On Success**:
   - Displays modal with booking summary
   - Auto-closes modal after 3 seconds
   - Clears form for new bookings
4. **On Error**:
   - Shows error message
   - Button reverts to normal state for retry

## Styling
- **Colors**: Uses semantic Tailwind classes:
  - `text-primary` - Gold text for labels
  - `bg-background` / `bg-mediumGray` - Dark backgrounds
  - `text-textLight` - Main text color
  - `border-primary` - Gold borders on focus
  - `text-red-400` - Error text color
- **Layout**: Responsive single-column on mobile, centered max-w-2xl
- **Animations**: Framer Motion with:
  - Container stagger effect (0.1s delay between items)
  - Scroll-triggered reveal (`whileInView`)
  - Button scale on hover/tap
  - Modal fade-in with spring animation

## Translation Keys
All UI text uses i18n keys in `booking.*` namespace:
- `booking.title` - Section title
- `booking.subtitle` - Section subtitle
- `booking.form.*` - Form labels and messages
- `booking.sessionTypes.*` - Session type options
- `booking.modal.*` - Modal text
- `contact.form.validation.*` - Shared validation messages

## Integration in Home.jsx
```jsx
import Booking from '../components/Booking';

// In Home component:
<Booking id="booking" />
```

Positioned between Gallery and Contact sections. Navbar automatically includes booking anchor link.

## Date Picker Behavior
- Uses HTML5 `<input type="date">` for native mobile support
- `min` attribute set to today's date
- Calendar icon displayed using Lucide React Calendar component
- Close button on modal uses Lucide React X component
