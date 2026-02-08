# Booking Model Documentation

## Overview
The Booking Model defines the data schema and validation rules for photography session bookings in the MongoDB database using Mongoose ODM.

**Location:** `server/models/Booking.js`

## Schema Definition

### Fields

#### clientName
- **Type:** String
- **Required:** Yes
- **Validation:** Custom error message: 'Please provide client name'
- **Processing:** Automatically trimmed (whitespace removed)
- **Description:** Full name of the client booking the session

```javascript
clientName: {
  type: String,
  required: [true, 'Please provide client name'],
  trim: true
}
```

---

#### phone
- **Type:** String
- **Required:** Yes
- **Validation:** Custom error message: 'Please provide phone number'
- **Description:** Contact phone number for the client

```javascript
phone: {
  type: String,
  required: [true, 'Please provide phone number']
}
```

**Note:** No format validation is enforced to support international formats.

---

#### email
- **Type:** String
- **Required:** Yes
- **Validation:** 
  - Custom error message: 'Please provide email'
  - Must match email pattern: `/^\S+@\S+\.\S+$/`
  - Pattern error message: 'Please provide a valid email'
- **Processing:** Automatically converted to lowercase
- **Description:** Client's email address for communication

```javascript
email: {
  type: String,
  required: [true, 'Please provide email'],
  lowercase: true,
  match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
}
```

---

#### sessionType
- **Type:** String
- **Required:** Yes
- **Validation:** 
  - Custom error message: 'Please select session type'
  - Must be one of the allowed enum values
- **Allowed Values:**
  - `'newborn'` - Newborn photography session
  - `'toddler'` - Toddler photography session
  - `'kids'` - Kids photography session
  - `'family'` - Family photography session
- **Description:** Type of photography session requested

```javascript
sessionType: {
  type: String,
  required: [true, 'Please select session type'],
  enum: ['newborn', 'toddler', 'kids', 'family']
}
```

---

#### preferredDate
- **Type:** Date
- **Required:** Yes
- **Validation:** Custom error message: 'Please select preferred date'
- **Description:** Client's preferred date for the photo session
- **Note:** Additional validation in controller ensures date is not in the past

```javascript
preferredDate: {
  type: Date,
  required: [true, 'Please select preferred date']
}
```

---

#### notes
- **Type:** String
- **Required:** No
- **Default:** Empty string ('')
- **Description:** Optional notes or special requests from the client

```javascript
notes: {
  type: String,
  default: ''
}
```

---

#### status
- **Type:** String
- **Required:** No
- **Default:** 'pending'
- **Allowed Values:**
  - `'pending'` - Default status for new bookings
  - `'confirmed'` - Booking confirmed by photographer
  - `'cancelled'` - Booking cancelled
- **Description:** Current status of the booking

```javascript
status: {
  type: String,
  enum: ['pending', 'confirmed', 'cancelled'],
  default: 'pending'
}
```

---

#### createdAt
- **Type:** Date
- **Required:** No
- **Default:** Current timestamp (`Date.now()`)
- **Description:** Timestamp when the booking was created

```javascript
createdAt: {
  type: Date,
  default: Date.now
}
```

---

## Indexes

### Compound Unique Index
```javascript
bookingSchema.index({ email: 1, preferredDate: 1 }, { unique: true });
```

**Purpose:** Prevent duplicate bookings
- **Fields:** Combination of `email` and `preferredDate`
- **Type:** Unique compound index
- **Effect:** Same email cannot book the same date twice
- **Error Code:** MongoDB error code 11000 when duplicate detected

**Benefits:**
1. Database-level duplicate prevention
2. Improved query performance for date/email lookups
3. Data integrity enforcement

---

## Complete Schema Example

```javascript
const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please provide client name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  sessionType: {
    type: String,
    required: [true, 'Please select session type'],
    enum: ['newborn', 'toddler', 'kids', 'family']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please select preferred date']
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
```

---

## Model Export

```javascript
module.exports = mongoose.model('Booking', bookingSchema);
```

**Collection Name:** `bookings` (automatically pluralized by Mongoose)

---

## Usage Examples

### Creating a Booking
```javascript
const Booking = require('./models/Booking');

const booking = await Booking.create({
  clientName: 'John Doe',
  phone: '+972-50-123-4567',
  email: 'john.doe@example.com',
  sessionType: 'kids',
  preferredDate: new Date('2026-03-15'),
  notes: 'Prefer morning session'
});
```

### Querying Bookings
```javascript
// Find all bookings
const bookings = await Booking.find();

// Find by email
const userBookings = await Booking.find({ email: 'john.doe@example.com' });

// Find pending bookings
const pendingBookings = await Booking.find({ status: 'pending' });

// Find bookings for a specific date
const dateBookings = await Booking.find({
  preferredDate: {
    $gte: new Date('2026-03-01'),
    $lt: new Date('2026-04-01')
  }
});
```

### Updating a Booking
```javascript
// Update status
const booking = await Booking.findByIdAndUpdate(
  bookingId,
  { status: 'confirmed' },
  { new: true, runValidators: true }
);

// Update multiple fields
await Booking.updateOne(
  { _id: bookingId },
  {
    status: 'confirmed',
    notes: 'Confirmed by phone'
  }
);
```

### Deleting a Booking
```javascript
// Soft delete (update status)
await Booking.findByIdAndUpdate(bookingId, { status: 'cancelled' });

// Hard delete
await Booking.findByIdAndDelete(bookingId);
```

---

## Validation

### Mongoose Validation
All validations are enforced at the Mongoose level:

1. **Required Fields:** Throws error if missing
2. **Email Format:** Validates against regex pattern
3. **Enum Values:** Validates sessionType and status against allowed values
4. **Type Coercion:** Automatically converts compatible types

### Validation Error Example
```javascript
// Missing required field
{
  errors: {
    clientName: {
      message: 'Please provide client name',
      kind: 'required',
      path: 'clientName'
    }
  }
}

// Invalid email format
{
  errors: {
    email: {
      message: 'Please provide a valid email',
      kind: 'regexp',
      path: 'email'
    }
  }
}

// Invalid enum value
{
  errors: {
    sessionType: {
      message: '`wedding` is not a valid enum value for path `sessionType`',
      kind: 'enum',
      path: 'sessionType'
    }
  }
}
```

---

## Data Transformations

### Automatic Transformations
1. **Email:** Converted to lowercase
2. **Client Name:** Trimmed of whitespace
3. **Dates:** Parsed and validated as Date objects

### JSON Serialization
When converted to JSON (e.g., in API responses), Mongoose automatically:
- Converts `_id` to string
- Includes all fields
- Formats dates as ISO 8601 strings

---

## Database Constraints

### Uniqueness
- Compound unique index on `(email, preferredDate)`
- Prevents same email from booking same date twice

### Performance Optimization
- Index on email and preferredDate improves query speed
- Sorting by createdAt benefits from implicit index

---

## Best Practices

### 1. Use Model Methods
```javascript
// Good ✓
const booking = await Booking.create(data);

// Avoid ✗
const booking = new Booking(data);
await booking.save();
```

### 2. Always Handle Validation Errors
```javascript
try {
  const booking = await Booking.create(data);
} catch (error) {
  if (error.name === 'ValidationError') {
    // Handle validation error
  }
  if (error.code === 11000) {
    // Handle duplicate key error
  }
}
```

### 3. Use Lean Queries for Read-Only Operations
```javascript
// Faster, returns plain JavaScript objects
const bookings = await Booking.find().lean();
```

### 4. Select Only Required Fields
```javascript
// More efficient
const bookings = await Booking.find()
  .select('clientName email preferredDate status');
```

---

## Security Considerations

1. **Email Validation:** Regex prevents simple injection attempts
2. **Lowercase Email:** Consistent email matching
3. **Trimming:** Prevents whitespace-based duplicates
4. **Enum Validation:** Prevents invalid status/sessionType values
5. **Type Safety:** Mongoose enforces data types

---

## Future Enhancements

1. **Additional Fields:**
   - `updatedAt` timestamp
   - `photographer` reference (when user auth added)
   - `duration` for session length
   - `price` for session cost
   - `location` for session venue
   - `paymentStatus` for payment tracking

2. **Enhanced Validation:**
   - Phone number format validation
   - International phone number support
   - Date range validation (business days only)
   - Time slot validation

3. **Indexes:**
   - Index on `status` for faster filtering
   - Index on `createdAt` for date-based queries
   - Text index on `notes` for search

4. **Methods & Statics:**
   - Virtual fields for formatted dates
   - Instance method for sending confirmation email
   - Static method for finding available dates
   - Pre-save hooks for data cleanup

5. **Relationships:**
   - Reference to User model (photographer)
   - Reference to Session model (completed sessions)
   - Reference to Payment model

---

## Related Documentation
- [Bookings API](../api/bookings-api.md)
- [Booking Controller Service](../services/booking-controller.md)
- [Database Connection Service](../services/database-connection.md)
