# KAN-5: Create Order Component

## Task Details
- **Status**: In Progress
- **Priority**: Not specified
- **Assignee**: NeomiOst
- **Type**: Task
- **Project**: Photography (KAN)
- **Link**: [View in JIRA](https://neomiost.atlassian.net/browse/KAN-5)

## Description
This task involves creating an Order Component for the photography portfolio application. This component will handle order creation and booking management for photography sessions.

## Task Overview
The Order Component should provide users with an interface to:
- Request photography services
- Select session types (newborn, toddler, kids, family)
- Submit booking information
- Receive confirmation

## Acceptance Criteria
- [ ] Component renders without errors
- [ ] Supports session type selection (newborn, toddler, kids, family)
- [ ] Integrates with booking API endpoint
- [ ] Follows project design system (gold/black theme)
- [ ] Supports both Hebrew and English (RTL/LTR)
- [ ] Uses Framer Motion animations
- [ ] Validates form input before submission
- [ ] Displays success/error messages appropriately

## Implementation Ideas

### Approach 1: Form-Based Order Component with Multi-Step Flow
This approach breaks down the booking process into logical steps, providing better UX through progressive disclosure.

**Implementation Steps:**
1. Create a multi-step form component using React hooks (`useState`, `useContext`)
2. Define form steps: session type selection → date/time picker → contact info → review & confirm
3. Manage state with `useReducer` for complex form state management
4. Integrate Framer Motion for smooth transitions between steps
5. Connect to `/api/bookings` endpoint with POST request
6. Add form validation using a library like `react-hook-form` or custom validators
7. Display loading state during API call and success/error messages

**Pros:**
- Improved UX through guided workflow
- Easier to maintain complex form logic
- Better mobile experience with one-step-at-a-time approach
- Can include progress indicator for user confidence

**Cons:**
- Requires more component files/organization
- May feel slower for experienced users
- More state management complexity

**Key Technologies:**
- React hooks for component state
- Framer Motion for step transitions
- Tailwind CSS for styling with gold/black theme
- i18n for Hebrew/English support

---

### Approach 2: Single-Page Order Component with Real-Time Validation
This approach presents all form fields at once with real-time validation, suitable for simpler ordering flows.

**Implementation Steps:**
1. Create a single-page component with all booking fields visible
2. Use `useState` for form field management
3. Implement real-time validation as user types (debounced)
4. Add visual feedback for valid/invalid fields using Tailwind CSS
5. Implement animated button (disabled state handling)
6. Use Framer Motion for form entry animations
7. Submit to booking API with validation check

**Pros:**
- Simpler component structure
- Faster to implement
- Single-page simplicity
- All information visible at once

**Cons:**
- Can feel overwhelming with many fields
- Poor mobile UX for small screens
- Validation errors all at once may frustrate users

**Key Technologies:**
- React hooks for field state
- Tailwind CSS validation states
- Framer Motion for entrance animations
- Form validation utilities

---

### Approach 3: Modal-Based Order Component with Inline Booking
This approach uses a modal dialog pattern that triggers from the main page, keeping order flow contextual.

**Implementation Steps:**
1. Create a reusable Order modal component
2. Implement trigger button in relevant sections (Gallery, Hero, Contact)
3. Use React context or state lift to manage modal visibility
4. Create form inside modal with essential fields only
5. Add loading and success states for better feedback
6. Implement smooth modal animations with Framer Motion
7. Include close functionality and error handling

**Pros:**
- Non-intrusive to main page flow
- Can be triggered from multiple locations
- Compact and focused interaction
- Mobile-friendly with full-screen modal option

**Cons:**
- Limited space for complex forms
- May need to redirect to full page for complex bookings
- Modal overuse can feel cluttered

**Key Technologies:**
- React Portal for modal rendering
- Framer Motion for modal animations
- Context API for modal state
- Tailwind CSS for responsive modal styling

---

## Component Structure Recommendation

```
client/src/components/
├── Order.jsx                    (Main component - already exists)
├── OrderForm.jsx               (Form logic)
├── OrderSessionSelect.jsx      (Session type selector)
├── OrderDatePicker.jsx         (Date/time selection)
├── OrderContactForm.jsx        (Contact information)
└── OrderConfirmation.jsx       (Review & confirm step)
```

## API Integration
**Endpoint:** `POST /api/bookings`

**Request Body:**
```json
{
  "sessionType": "newborn|toddler|kids|family",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "bookingId": "string",
    "status": "pending"
  },
  "message": "Booking created successfully"
}
```

## Design System Integration
- **Colors**: Gold (#D4AF37) accents on black (#0F0F0F) background
- **Typography**: Professional font matching gallery aesthetic
- **Animations**: Entrance: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- **i18n**: Strings in both `client/src/i18n/locales/he/translation.json` and `client/src/i18n/locales/en/translation.json`

## Testing Checklist
- [ ] Form validation works for all fields
- [ ] API integration succeeds and fails gracefully
- [ ] Hebrew and English text display correctly (RTL/LTR)
- [ ] Animations perform smoothly
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Error messages are user-friendly
- [ ] Success confirmation is clear

## Related Components
- [Order.jsx](../../client/src/components/Order.jsx) - Existing order component
- [Contact.jsx](../../client/src/components/Contact.jsx) - Reference for form patterns
- [Booking API](../../server/routes/bookings.js) - Backend endpoint

## Next Steps
1. Review existing Order.jsx component for patterns
2. Check bookingController.js for API endpoint implementation
3. Design form fields and validation rules
4. Implement one of the suggested approaches
5. Add i18n strings for Hebrew/English
6. Test with mock booking data
7. Integrate with actual API endpoint
8. Get design review before deploying

## Notes
- Ensure no Hebrew appears in code comments or variable names
- Follow Tailwind 4 and Framer Motion animation standards
- Keep component reusable for potential future booking types
- Consider accessibility (ARIA labels, keyboard navigation)
