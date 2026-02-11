# Digital Album Ordering Feature - Implementation Plan

## Context

The photography website currently has a booking system for photography sessions, but lacks the ability for customers to order digital albums (PDF format) after their sessions are complete. Customers who have already booked and completed a photography session should be able to order professionally edited digital albums.

**Why this change is needed:**
- Customers want a convenient way to order digital albums online
- Current workflow requires manual coordination via email/phone
- Need to link album orders to existing confirmed bookings for proper tracking
- Album orders should be stored in the database (unlike the current Contact form which only uses EmailJS)

**User Requirements:**
- Album type: PDF files for download
- Must be linked to an existing confirmed booking (bookingId required)
- Three package options: Basic, Premium, Full
- Inquiry-only (no payment processing - similar to Contact form)
- Customer enters booking ID manually to identify their session
- Only allow orders for confirmed bookings
- Prevent duplicate orders (one album per booking)
- Separate dedicated page with navigation

## Implementation Approach

### Architecture Overview

Create a **separate digital album ordering system** following the same pattern as the existing booking system:

```
Frontend: DigitalAlbumForm.jsx → API Client → Backend: Routes → Controller → MongoDB Model
```

This maintains clear separation:
- **Contact.jsx** - General inquiries (EmailJS only)
- **BookingForm.jsx** - Photography session bookings (MongoDB + EmailJS)
- **NEW: DigitalAlbumForm.jsx** - Album orders (MongoDB + EmailJS)

### Backend Implementation

#### 1. Create DigitalAlbumOrder Model
**File:** `server/models/DigitalAlbumOrder.js`

**Schema:**
```javascript
{
  bookingId: ObjectId (ref: 'Booking', required, indexed),
  customerEmail: String (required, lowercase, email validation),
  customerName: String (required, trim),
  packageType: String (enum: ['basic', 'premium', 'full'], required),
  status: String (enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled'], default: 'pending'),
  notes: String (default: ''),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `bookingId: 1` (for faster lookups)
- `{ bookingId: 1, customerEmail: 1 }` (unique compound index to prevent duplicates)

**Validation:**
- Email format validation
- Enum validation for packageType and status
- All required fields enforced at schema level

#### 2. Create DigitalAlbumOrder Controller
**File:** `server/controllers/digitalAlbumOrderController.js`

**Methods:**

**createDigitalAlbumOrder:**
- Validates booking exists (`Booking.findById`)
- Verifies booking status === 'confirmed' (reject if pending/cancelled)
- Verifies customerEmail matches booking.email (security check)
- Checks for duplicate order (return 409 if exists)
- Creates order and returns 201 with order data

**getAllDigitalAlbumOrders:**
- Returns all orders with populated booking details
- Sort by createdAt descending

**getDigitalAlbumOrder:**
- Get single order by ID with booking population

**getOrdersByBooking:**
- Get all orders for a specific bookingId
- Used to check if album already ordered

**Error Handling:**
- 404: Booking not found
- 400: Booking not confirmed
- 403: Email doesn't match booking
- 409: Duplicate order (album already ordered)
- 500: Server errors

#### 3. Create Routes
**File:** `server/routes/digitalAlbumOrders.js`

```javascript
GET  /api/digital-album-orders              // Get all orders
POST /api/digital-album-orders              // Create order
GET  /api/digital-album-orders/:id          // Get single order
GET  /api/digital-album-orders/by-booking/:bookingId  // Get orders by booking
```

#### 4. Add Booking Verification Endpoint
**File:** `server/controllers/bookingController.js`

**New method: verifyBooking**
- Input: bookingId, email
- Finds booking where `_id === bookingId AND email === email`
- Returns booking details (clientName, sessionType, preferredDate, status)
- Used by frontend to show booking info before order submission

**File:** `server/routes/bookings.js`
```javascript
POST /api/bookings/verify
```

#### 5. Register Routes
**File:** `server/server.js`

Add after existing booking routes:
```javascript
app.use('/api/digital-album-orders', require('./routes/digitalAlbumOrders'));
```

### Frontend Implementation

#### 1. Create DigitalAlbumForm Component
**File:** `client/src/components/DigitalAlbumForm.jsx`

**Component Structure:**

**State:**
- formData: { bookingId, customerName, customerEmail, packageType, notes }
- bookingDetails: null (populated after verification)
- isVerifying: boolean
- isSubmitting: boolean
- submitStatus: 'success' | 'error' | null
- errors: object

**Two-Step Workflow:**

**Step 1: Booking Verification**
- User enters booking ID and email
- Click "Verify Booking" button
- API call: `POST /api/bookings/verify`
- If valid: Display booking details (session type, date, customer name)
- If invalid: Show error message

**Step 2: Album Order**
- Package selection (radio buttons or cards):
  - **Basic:** 20 professionally edited photos
  - **Premium:** 40 edited photos + video slideshow
  - **Full:** All session photos (60+) + slideshow + prints
- Customer name (auto-filled from booking, editable)
- Optional notes field
- Submit button (disabled until booking verified)

**Form Fields:**
1. Booking ID* (text input)
2. Email Address* (email input, for verification)
3. [Booking Details Section] (shows after verification)
4. Package Type* (radio/cards: basic/premium/full)
5. Customer Name* (text, auto-filled)
6. Additional Notes (textarea, optional)

**Validation:**
- Required fields: bookingId, email, packageType, customerName
- Email format validation
- Cannot submit until booking verified
- Clear error messages for each field

**Styling:**
- Consistent with existing BookingForm.jsx
- Framer Motion animations for form entry
- GoldenGlitter effect on button hover
- Responsive design (mobile/tablet/desktop)
- Full RTL/LTR support for Hebrew/English

#### 2. Create Separate Page with Router
**File:** `client/src/pages/DigitalAlbumOrder.jsx`

Wrapper page that includes:
- Page title and subtitle
- DigitalAlbumForm component
- Decorative elements (FloatingSquares, etc.)

**Setup React Router:**
- Install/configure react-router-dom (if not already)
- Update `client/src/App.jsx` with routes:
  ```javascript
  <Route path="/" element={<Home />} />
  <Route path="/digital-album" element={<DigitalAlbumOrder />} />
  ```

**Update Navbar:**
- Add navigation link to Digital Album page
- Both in desktop and mobile menus
- Translation keys for both languages

#### 3. Update API Client
**File:** `client/src/utils/api.js`

Add new export:
```javascript
export const digitalAlbumAPI = {
  verifyBooking: async (bookingId, email) => {
    const response = await api.post('/bookings/verify', { bookingId, email });
    return response.data;
  },
  createOrder: async (orderData) => {
    const response = await api.post('/digital-album-orders', orderData);
    return response.data;
  },
  getOrdersByBooking: async (bookingId) => {
    const response = await api.get(`/digital-album-orders/by-booking/${bookingId}`);
    return response.data;
  }
};
```

#### 4. Add Translations
**Files:**
- `client/src/i18n/locales/en/translation.json`
- `client/src/i18n/locales/he/translation.json`

**New keys:**
```json
{
  "digitalAlbum": {
    "title": "Order Digital Album",
    "subtitle": "Order a professionally edited digital album of your session photos",
    "form": {
      "bookingId": "Booking ID",
      "email": "Email Address",
      "customerName": "Customer Name",
      "packageType": "Album Package",
      "notes": "Special Requests",
      "verifyBooking": "Verify Booking",
      "submit": "Order Digital Album",
      "packages": {
        "basic": { "name": "Basic Album", "description": "20 professionally edited photos" },
        "premium": { "name": "Premium Album", "description": "40 edited photos + video slideshow" },
        "full": { "name": "Full Album", "description": "All session photos (60+) + slideshow + prints" }
      },
      "validation": {
        "required": "This field is required",
        "invalidEmail": "Please enter a valid email address",
        "bookingNotVerified": "Please verify your booking first"
      },
      "success": "Album order submitted successfully! We'll contact you with details.",
      "error": "Failed to submit order. Please try again or contact us.",
      "verificationSuccess": "Booking verified successfully!",
      "verificationError": "Booking not found or email doesn't match."
    },
    "bookingDetails": {
      "title": "Booking Details",
      "sessionType": "Session Type",
      "date": "Session Date",
      "customer": "Customer Name",
      "verified": "Booking Verified"
    }
  },
  "nav": {
    "digitalAlbum": "Digital Album"
  }
}
```

Hebrew translations with RTL support (mirror structure).

#### 5. EmailJS Integration
**Email Notification Setup:**

After successful MongoDB save, send email via EmailJS (dual approach):

1. Create new EmailJS template for album orders
2. Add template ID to `client/.env`:
   ```
   VITE_EMAILJS_ALBUM_TEMPLATE_ID=your_template_id
   ```

3. In DigitalAlbumForm.jsx after API success:
   ```javascript
   await emailjs.send(
     SERVICE_ID,
     ALBUM_TEMPLATE_ID,
     {
       booking_id: bookingId,
       customer_name: customerName,
       customer_email: customerEmail,
       package_type: packageType,
       notes: notes || 'No special requests',
       order_date: new Date().toLocaleDateString()
     },
     PUBLIC_KEY
   );
   ```

Email recipients: Both customer and photographer receive notifications.

### Validation & Error Handling

#### Backend Validation Sequence:
1. Booking exists check (404 if not found)
2. Booking status === 'confirmed' (400 if pending/cancelled)
3. Email matches booking email (403 if mismatch)
4. No duplicate order exists (409 if duplicate)
5. Schema validation (400 for invalid data)

#### Frontend Error Messages:
- **Booking not found:** "Booking ID not found. Please check your confirmation email."
- **Email mismatch:** "Email doesn't match booking. Please use the email you booked with."
- **Booking not confirmed:** "This booking is not confirmed yet. Please wait for confirmation."
- **Duplicate order:** "You've already ordered an album for this booking. Check your email for details."
- **Network error:** "Connection error. Please try again or contact us."

### Optional Enhancement: Refactor BookingForm

**Current issue:** BookingForm.jsx only uses EmailJS, doesn't save to MongoDB.

**Recommended fix:**
Update `client/src/components/BookingForm.jsx` to:
1. Save booking to MongoDB first via `bookingAPI.createBooking()`
2. Then send EmailJS notification with booking ID
3. Display booking ID to customer in success message
4. Customer can use this ID later for album orders

This ensures all bookings are in the database and customers get their booking ID immediately.

## Critical Files to Modify/Create

### New Files (7):
1. `server/models/DigitalAlbumOrder.js` - Database schema
2. `server/controllers/digitalAlbumOrderController.js` - Business logic
3. `server/routes/digitalAlbumOrders.js` - API routes
4. `client/src/components/DigitalAlbumForm.jsx` - Form component
5. `client/src/pages/DigitalAlbumOrder.jsx` - Page wrapper
6. `client/src/utils/router.jsx` or update `App.jsx` - Router setup

### Modified Files (6):
7. `server/server.js` - Register new routes
8. `server/controllers/bookingController.js` - Add verifyBooking method
9. `server/routes/bookings.js` - Add verify route
10. `client/src/utils/api.js` - Add digitalAlbumAPI
11. `client/src/components/Navbar.jsx` - Add Digital Album link
12. `client/src/i18n/locales/en/translation.json` - Add translations
13. `client/src/i18n/locales/he/translation.json` - Add Hebrew translations

### Optional Enhancement:
14. `client/src/components/BookingForm.jsx` - Save to MongoDB + show booking ID

## Implementation Sequence

1. **Backend Foundation** (30-45 min) ✅ COMPLETED
   - ✅ Create DigitalAlbumOrder model with validation
   - ✅ Create digitalAlbumOrderController with all methods
   - ✅ Create digitalAlbumOrders routes
   - ✅ Add verifyBooking to bookingController
   - ✅ Register routes in server.js

   **Results:**
   - Created `server/models/DigitalAlbumOrder.js` with schema validation
   - Created `server/controllers/digitalAlbumOrderController.js` with 4 methods:
     - createDigitalAlbumOrder (with full validation flow)
     - getAllDigitalAlbumOrders
     - getDigitalAlbumOrder
     - getOrdersByBooking
   - Created `server/routes/digitalAlbumOrders.js` with all routes
   - Added verifyBooking method to bookingController
   - Added verify route to bookings.js
   - Registered routes in server.js
   - Server tested successfully - running on port 5000
   - Health check endpoint working: GET /api/health returns OK

2. **Test Backend** (15 min)
   - Start server, verify health check
   - Test booking verification endpoint with Postman
   - Test order creation (valid, invalid booking, duplicate)
   - Verify error handling

3. **Frontend Component** (45-60 min)
   - Create DigitalAlbumForm.jsx with two-step workflow
   - Implement booking verification UI
   - Implement package selection (radio/cards)
   - Add form validation and error handling

4. **Router & Navigation** (20 min)
   - Setup React Router in App.jsx
   - Create DigitalAlbumOrder page
   - Update Navbar with new link
   - Test navigation

5. **API Integration** (15 min)
   - Add digitalAlbumAPI methods to api.js
   - Connect form to API endpoints
   - Test full flow

6. **Translations** (15 min)
   - Add all digitalAlbum keys to en/translation.json
   - Add Hebrew translations to he/translation.json
   - Test both languages + RTL/LTR

7. **EmailJS Setup** (15 min)
   - Create EmailJS template for album orders
   - Add template ID to .env
   - Integrate email sending after successful order
   - Test email delivery

8. **End-to-End Testing** (30 min)
   - Test complete workflow: verify → select → submit
   - Test all error scenarios
   - Test bilingual functionality
   - Test responsive design on mobile/tablet

9. **Optional: Refactor BookingForm** (30 min)
   - Update to save to MongoDB
   - Display booking ID after submission
   - Update translations

**Total Estimated Time:** 3-4 hours

## Verification & Testing

### End-to-End Test Flow:

1. **Create a test booking:**
   - Use BookingForm to create a new booking
   - Note the booking ID from email or database

2. **Confirm the booking:**
   - Update booking status to 'confirmed' in MongoDB (manually or via admin interface)
   - Verify status change

3. **Test Digital Album Form - Valid Flow:**
   - Navigate to /digital-album page
   - Enter valid booking ID and email
   - Click "Verify Booking"
   - Should show booking details (session type, date, customer name)
   - Select package type (Basic/Premium/Full)
   - Add optional notes
   - Click "Order Digital Album"
   - Should show success message
   - Verify order saved in MongoDB
   - Verify EmailJS notification sent

4. **Test Error Scenarios:**
   - **Invalid booking ID:** Enter non-existent ID → Should show "Booking not found"
   - **Wrong email:** Enter correct ID but wrong email → Should show "Email doesn't match"
   - **Pending booking:** Use pending booking ID → Should show "Booking not confirmed yet"
   - **Duplicate order:** Try ordering again with same booking → Should show "Already ordered"

5. **Test Bilingual Support:**
   - Switch language to Hebrew
   - Verify RTL layout works correctly
   - Verify all labels translated
   - Switch back to English

6. **Test Responsive Design:**
   - Test on mobile viewport (< 768px)
   - Test on tablet viewport (768-1024px)
   - Test on desktop viewport (> 1024px)
   - Verify form layout adapts properly

7. **Database Verification:**
   - Check MongoDB for created order document
   - Verify all fields saved correctly
   - Verify booking reference populated
   - Verify indexes created

8. **Email Verification:**
   - Check photographer email inbox
   - Check customer email inbox
   - Verify all order details in email
   - Verify booking ID included

### Success Criteria:
- ✅ Backend API endpoints respond correctly (200/201 for success, proper error codes)
- ✅ Frontend form validates all inputs
- ✅ Booking verification works (shows booking details)
- ✅ Order saves to MongoDB with correct data
- ✅ Email notifications sent to both parties
- ✅ Duplicate prevention works (409 error)
- ✅ Error messages clear and helpful
- ✅ Both Hebrew (RTL) and English (LTR) work correctly
- ✅ Responsive design works on all screen sizes
- ✅ Navigation from Navbar works

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Navbar → [Digital Album] Link                               │
│                    ↓                                          │
│  /digital-album Route                                        │
│                    ↓                                          │
│  DigitalAlbumOrder Page                                      │
│          ↓                                                    │
│  DigitalAlbumForm Component                                  │
│    - Step 1: Verify Booking (bookingId + email)             │
│    - Step 2: Select Package + Submit Order                  │
│                    ↓                                          │
│  digitalAlbumAPI (api.js)                                    │
│    - verifyBooking(bookingId, email)                         │
│    - createOrder(orderData)                                  │
│                    ↓                                          │
└────────────────────┼────────────────────────────────────────┘
                     │ HTTP Requests
                     ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express)                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Routes                                                       │
│    POST /api/bookings/verify          → verifyBooking()     │
│    POST /api/digital-album-orders     → createDigitalAlbumOrder() │
│    GET  /api/digital-album-orders/:id → getDigitalAlbumOrder()    │
│                    ↓                                          │
│  Controllers                                                  │
│    bookingController.verifyBooking()                         │
│      - Find booking by ID + email                            │
│      - Return booking details                                │
│                                                               │
│    digitalAlbumOrderController.createDigitalAlbumOrder()     │
│      - Validate booking exists                               │
│      - Verify status === 'confirmed'                         │
│      - Verify email matches                                  │
│      - Check for duplicates                                  │
│      - Create order                                          │
│                    ↓                                          │
│  Models (Mongoose)                                           │
│    Booking Model                                             │
│      - clientName, email, phone                              │
│      - sessionType, preferredDate                            │
│      - status (pending/confirmed/cancelled)                  │
│                                                               │
│    DigitalAlbumOrder Model (NEW)                             │
│      - bookingId (ref: Booking)                              │
│      - customerEmail, customerName                           │
│      - packageType (basic/premium/full)                      │
│      - status, notes                                         │
│                    ↓                                          │
└────────────────────┼────────────────────────────────────────┘
                     │
                     ↓
              MongoDB Database
                - bookings collection
                - digitalalBumorders collection
                - Referential integrity via bookingId
```

## Notes

- **No payment processing:** This is inquiry-only, customer will be contacted for payment
- **Booking ID format:** MongoDB ObjectId (e.g., "507f1f77bcf86cd799439011")
- **Security:** Email verification ensures customer owns the booking
- **Scalability:** Can easily add payment integration, status tracking, file upload in future
- **Consistency:** Follows exact same pattern as existing booking system
- **Separation:** Digital albums separate from general contact inquiries

## Future Enhancements (Out of Scope)

- Admin dashboard to manage orders
- Payment integration (Stripe/PayPal)
- Customer portal to track order status
- File upload for photo selection preferences
- Automated reminder emails
- Package customization options
