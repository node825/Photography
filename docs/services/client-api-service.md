# Client API Service Documentation

## Overview
The Client API Service provides a centralized HTTP client for making API requests to the backend server. It uses Axios for HTTP communication and exports methods for all booking-related operations.

**Location:** `client/src/utils/api.js`

## Configuration

### Base URL Setup
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Environment Variable:** `VITE_API_URL`
- **Development Default:** `http://localhost:5000/api`
- **Production:** Set in `.env` file or deployment configuration
- **Format:** Full base URL without trailing slash

**Examples:**
```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production
VITE_API_URL=https://api.photography.com/api

# Staging
VITE_API_URL=https://staging-api.photography.com/api
```

---

### Axios Instance
```javascript
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Configuration:**
- **baseURL:** Set from environment variable
- **headers:** Default Content-Type for JSON requests
- **Benefits:**
  - Consistent configuration across all requests
  - Easy to add interceptors and middleware
  - Centralized error handling potential

---

## API Methods

### bookingAPI Object
All booking-related API methods are grouped under the `bookingAPI` object:

```javascript
export const bookingAPI = {
  createBooking,
  getAllBookings,
  getBooking,
  getAvailableDates,
};
```

---

## Methods

### createBooking
Creates a new booking by sending data to the server.

**Signature:**
```javascript
createBooking: async (bookingData) => { ... }
```

**Parameters:**
- `bookingData` (Object) - Booking information

**Booking Data Structure:**
```javascript
{
  clientName: string,      // Required
  phone: string,           // Required
  email: string,           // Required (valid email)
  sessionType: string,     // Required: 'newborn'|'toddler'|'kids'|'family'
  preferredDate: string,   // Required (ISO date format)
  notes: string            // Optional
}
```

**Example Usage:**
```javascript
import { bookingAPI } from './utils/api';

const newBooking = {
  clientName: 'John Doe',
  phone: '+972-50-123-4567',
  email: 'john.doe@example.com',
  sessionType: 'kids',
  preferredDate: '2026-03-15',
  notes: 'Prefer morning session'
};

try {
  const response = await bookingAPI.createBooking(newBooking);
  console.log('Booking created:', response.data);
  // Response: { _id: '...', clientName: '...', ... }
} catch (error) {
  console.error('Booking failed:', error.response?.data?.message);
}
```

**Request:**
- **Method:** POST
- **Endpoint:** `/bookings`
- **Full URL:** `{API_URL}/bookings`

**Response:**
```javascript
{
  success: true,
  data: {
    _id: '507f1f77bcf86cd799439011',
    clientName: 'John Doe',
    phone: '+972-50-123-4567',
    email: 'john.doe@example.com',
    sessionType: 'kids',
    preferredDate: '2026-03-15T00:00:00.000Z',
    notes: 'Prefer morning session',
    status: 'pending',
    createdAt: '2026-02-08T17:00:00.000Z'
  }
}
```

**Error Handling:**
```javascript
try {
  const response = await bookingAPI.createBooking(data);
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('Error:', error.response.data.message);
    // Status code: error.response.status
  } else if (error.request) {
    // Request made but no response received
    console.error('Network error');
  } else {
    // Error in request setup
    console.error('Error:', error.message);
  }
}
```

---

### getAllBookings
Retrieves all bookings from the server.

**Signature:**
```javascript
getAllBookings: async () => { ... }
```

**Parameters:** None

**Example Usage:**
```javascript
import { bookingAPI } from './utils/api';

try {
  const response = await bookingAPI.getAllBookings();
  console.log('Total bookings:', response.count);
  console.log('Bookings:', response.data);
} catch (error) {
  console.error('Failed to fetch bookings:', error);
}
```

**Request:**
- **Method:** GET
- **Endpoint:** `/bookings`
- **Full URL:** `{API_URL}/bookings`

**Response:**
```javascript
{
  success: true,
  count: 2,
  data: [
    {
      _id: '507f1f77bcf86cd799439011',
      clientName: 'John Doe',
      // ... other fields
    },
    {
      _id: '507f1f77bcf86cd799439012',
      clientName: 'Jane Smith',
      // ... other fields
    }
  ]
}
```

---

### getBooking
Retrieves a single booking by its ID.

**Signature:**
```javascript
getBooking: async (id) => { ... }
```

**Parameters:**
- `id` (String) - MongoDB ObjectId of the booking

**Example Usage:**
```javascript
import { bookingAPI } from './utils/api';

const bookingId = '507f1f77bcf86cd799439011';

try {
  const response = await bookingAPI.getBooking(bookingId);
  console.log('Booking:', response.data);
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Booking not found');
  } else {
    console.error('Error fetching booking:', error);
  }
}
```

**Request:**
- **Method:** GET
- **Endpoint:** `/bookings/:id`
- **Full URL:** `{API_URL}/bookings/{id}`

**Response:**
```javascript
{
  success: true,
  data: {
    _id: '507f1f77bcf86cd799439011',
    clientName: 'John Doe',
    phone: '+972-50-123-4567',
    email: 'john.doe@example.com',
    sessionType: 'kids',
    preferredDate: '2026-03-15T00:00:00.000Z',
    notes: 'Prefer morning session',
    status: 'pending',
    createdAt: '2026-02-08T17:00:00.000Z'
  }
}
```

**Error Response (404):**
```javascript
{
  success: false,
  message: 'Booking not found'
}
```

---

### getAvailableDates
Retrieves dates that already have bookings (unavailable dates).

**Signature:**
```javascript
getAvailableDates: async () => { ... }
```

**Parameters:** None

**Example Usage:**
```javascript
import { bookingAPI } from './utils/api';

try {
  const response = await bookingAPI.getAvailableDates();
  const bookedDates = response.data;
  
  // Use in calendar to disable dates
  const isDateBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedDates.includes(dateStr);
  };
} catch (error) {
  console.error('Failed to fetch available dates:', error);
}
```

**Request:**
- **Method:** GET
- **Endpoint:** `/bookings/available-dates`
- **Full URL:** `{API_URL}/bookings/available-dates`

**Response:**
```javascript
{
  success: true,
  data: [
    '2026-03-15',
    '2026-03-20',
    '2026-03-25'
  ]
}
```

**Use Cases:**
1. **Calendar Component:** Disable already-booked dates
2. **Validation:** Check if selected date is available
3. **UI Feedback:** Show available/unavailable indicators

---

## Integration with React Components

### Using in Components
```javascript
import { bookingAPI } from '../utils/api';
import { useState, useEffect } from 'react';

function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingAPI.createBooking(formData);
      console.log('Success:', response.data);
      // Show success message
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... form JSX
  );
}
```

### Fetching Data on Component Mount
```javascript
function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingAPI.getAllBookings();
        setBookings(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    // ... list JSX
  );
}
```

---

## Error Handling Patterns

### Standard Error Handler
```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    // No response received
    return 'Network error. Please check your connection.';
  } else {
    // Request setup error
    return 'An unexpected error occurred';
  }
};

// Usage
try {
  await bookingAPI.createBooking(data);
} catch (error) {
  const message = handleApiError(error);
  setError(message);
}
```

### Custom Error Class
```javascript
class ApiError extends Error {
  constructor(error) {
    super(error.response?.data?.message || 'API Error');
    this.statusCode = error.response?.status;
    this.data = error.response?.data;
  }
}

// Usage
try {
  await bookingAPI.createBooking(data);
} catch (error) {
  throw new ApiError(error);
}
```

---

## Advanced Features

### Adding Request Interceptors
```javascript
// Add authentication token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### Adding Response Interceptors
```javascript
// Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Request Timeout
```javascript
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## Testing

### Mock for Testing
```javascript
// In tests
import { bookingAPI } from '../utils/api';

jest.mock('../utils/api', () => ({
  bookingAPI: {
    createBooking: jest.fn(),
    getAllBookings: jest.fn(),
    getBooking: jest.fn(),
    getAvailableDates: jest.fn(),
  },
}));

// Test
it('should create booking', async () => {
  bookingAPI.createBooking.mockResolvedValue({
    success: true,
    data: { _id: '123', clientName: 'Test' }
  });
  
  const result = await bookingAPI.createBooking(mockData);
  expect(result.success).toBe(true);
});
```

---

## Best Practices

1. **Always Handle Errors:** Use try-catch for all API calls
2. **Show Loading States:** Provide feedback during requests
3. **Validate Before Sending:** Client-side validation before API calls
4. **Use Environment Variables:** Never hardcode API URLs
5. **Implement Retry Logic:** For network-related failures
6. **Cache When Appropriate:** Use React Query or SWR for data fetching
7. **Type Safety:** Consider using TypeScript for type definitions

---

## Exports
```javascript
export const bookingAPI = { ... };
export default api; // Axios instance for custom requests
```

## Dependencies
```json
{
  "axios": "^1.x.x"
}
```

## Related Documentation
- [Bookings API](../api/bookings-api.md)
- [Booking Controller Service](../services/booking-controller.md)
