# Photography Project Architecture Overview

## Project Structure

```
Photography/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions and API client
│   │   ├── i18n/           # Internationalization
│   │   └── main.jsx        # Application entry point
│   └── package.json
│
├── server/                 # Node.js Backend Application
│   ├── config/             # Configuration files
│   │   └── db.js          # Database connection
│   ├── controllers/        # Business logic
│   │   └── bookingController.js
│   ├── middleware/         # Express middleware
│   │   └── errorHandler.js
│   ├── models/            # Mongoose schemas
│   │   └── Booking.js
│   ├── routes/            # API routes
│   │   └── bookings.js
│   ├── server.js          # Application entry point
│   └── package.json
│
└── docs/                  # Documentation
    ├── api/               # API documentation
    ├── services/          # Service documentation
    └── models/            # Model documentation
```

---

## Technology Stack

### Frontend
- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Internationalization:** react-i18next (Hebrew RTL + English LTR)
- **Calendar:** React Big Calendar

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.x
- **Database:** MongoDB with Mongoose ODM
- **Architecture:** RESTful API
- **Validation:** Mongoose schema validation
- **Middleware:** CORS, Express JSON parser

---

## Architecture Patterns

### Backend Architecture

#### 1. MVC Pattern (Model-View-Controller)
```
Routes → Controllers → Models
  ↓
Response
```

- **Routes:** Define API endpoints and HTTP methods
- **Controllers:** Handle business logic and request processing
- **Models:** Define data structure and database interaction

#### 2. Middleware Pipeline
```
Request → CORS → JSON Parser → Routes → Controller → Error Handler → Response
```

#### 3. Layered Architecture
```
┌─────────────────────────┐
│   Routes Layer          │  ← API endpoints definition
├─────────────────────────┤
│   Controller Layer      │  ← Business logic
├─────────────────────────┤
│   Model Layer           │  ← Data access & validation
├─────────────────────────┤
│   Database Layer        │  ← MongoDB
└─────────────────────────┘
```

### Frontend Architecture

#### 1. Component-Based Architecture
```
App
├── Navbar (Global)
├── Pages
│   ├── Home
│   │   ├── Hero
│   │   ├── Gallery
│   │   └── Contact
│   └── Booking
└── Footer (Global)
```

#### 2. Service Layer Pattern
```
Component → API Service → Backend API
              ↓
          HTTP Client (Axios)
```

---

## Data Flow

### Booking Creation Flow

```
1. User fills form in React Component
        ↓
2. Form validation (client-side)
        ↓
3. Call bookingAPI.createBooking()
        ↓
4. Axios POST to /api/bookings
        ↓
5. Express routes to bookingController.createBooking
        ↓
6. Controller validates date is not in past
        ↓
7. Controller creates Booking via Mongoose
        ↓
8. Mongoose validates schema
        ↓
9. MongoDB saves document (checks unique constraint)
        ↓
10. Success response back through chain
        ↓
11. React component updates UI
```

### Error Flow

```
Error occurs at any layer
        ↓
Caught by try-catch or middleware
        ↓
Error Handler middleware (backend)
        ↓
Standardized error response
        ↓
Axios catch block (frontend)
        ↓
Component displays error to user
```

---

## API Communication

### Request/Response Format

#### Request Format
```http
POST /api/bookings HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "clientName": "John Doe",
  "phone": "+972-50-123-4567",
  "email": "john.doe@example.com",
  "sessionType": "kids",
  "preferredDate": "2026-03-15",
  "notes": "Prefer morning session"
}
```

#### Response Format (Success)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "clientName": "John Doe",
    ...
  }
}
```

#### Response Format (Error)
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Database Schema

### Booking Document
```javascript
{
  _id: ObjectId,              // Auto-generated
  clientName: String,         // Required, trimmed
  phone: String,              // Required
  email: String,              // Required, lowercase, validated
  sessionType: String,        // Enum: newborn|toddler|kids|family
  preferredDate: Date,        // Required
  notes: String,              // Optional
  status: String,             // Enum: pending|confirmed|cancelled
  createdAt: Date             // Auto-generated
}
```

### Indexes
- **Unique Compound Index:** `(email, preferredDate)` - Prevents duplicate bookings

---

## Key Features

### 1. Booking Management
- Create new bookings with validation
- View all bookings
- View single booking details
- Check available/booked dates

### 2. Data Validation
- **Client-side:** React form validation
- **Server-side:** Express controller validation
- **Database-level:** Mongoose schema validation
- **Constraints:** MongoDB unique indexes

### 3. Error Handling
- Centralized error handler middleware
- Consistent error response format
- Specific error messages for different scenarios
- HTTP status code compliance

### 4. Internationalization
- Hebrew (RTL) and English (LTR) support
- Dynamic text direction based on language
- react-i18next for translations

### 5. Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Flexible layouts

---

## Security Considerations

### Current Implementation

1. **Input Validation:**
   - Email format validation (regex)
   - Enum validation for sessionType and status
   - Date validation (no past dates)
   - Required field validation

2. **Data Sanitization:**
   - Email normalized to lowercase
   - Client name trimmed
   - Mongoose escapes special characters

3. **CORS Configuration:**
   - Enables cross-origin requests from frontend

4. **Error Handling:**
   - Prevents error stack exposure to client
   - Logs errors server-side only

### Recommended Enhancements

1. **Authentication & Authorization:**
   - JWT tokens for admin access
   - Protected routes for booking management
   - Role-based access control

2. **Rate Limiting:**
   - Prevent API abuse
   - Limit booking creation per IP

3. **Input Sanitization:**
   - Additional XSS prevention
   - SQL injection prevention (N/A for MongoDB)

4. **HTTPS:**
   - Encrypt data in transit
   - Secure cookies

5. **Data Privacy:**
   - PII encryption at rest
   - GDPR compliance measures
   - Data retention policies

---

## Environment Configuration

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/photography

# Future: Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d

# Future: Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-password
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Future: Analytics
VITE_GA_TRACKING_ID=UA-XXXXX-X
```

---

## Deployment Architecture

### Development
```
┌─────────────────┐         ┌─────────────────┐
│  React Dev      │         │  Node.js Dev    │
│  Server         │────────▶│  Server         │
│  (Vite)         │         │  (Nodemon)      │
│  Port: 5173     │         │  Port: 5000     │
└─────────────────┘         └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │  MongoDB Atlas  │
                            │  Cloud Database │
                            └─────────────────┘
```

### Production (Recommended)
```
┌─────────────────┐
│   Frontend      │
│   (Static)      │
│   Vercel/Netlify│
└────────┬────────┘
         │
         │ HTTPS
         │
┌────────▼────────┐
│   Backend API   │
│   (Docker)      │
│   Heroku/Railway│
└────────┬────────┘
         │
┌────────▼────────┐
│  MongoDB Atlas  │
│  Cloud Database │
└─────────────────┘
```

---

## API Endpoints Summary

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/bookings` | Create new booking | Public |
| GET | `/api/bookings` | Get all bookings | Public* |
| GET | `/api/bookings/:id` | Get single booking | Public |
| GET | `/api/bookings/available-dates` | Get booked dates | Public |
| GET | `/api/health` | Health check | Public |

*Will be protected with authentication in Phase 2

---

## Performance Considerations

### Backend Optimizations
1. **Database Indexing:** Compound index on email+date
2. **Lean Queries:** Use `.lean()` for read-only operations
3. **Field Selection:** Use `.select()` to limit returned fields
4. **Connection Pooling:** Mongoose handles automatically

### Frontend Optimizations
1. **Code Splitting:** Vite automatic code splitting
2. **Lazy Loading:** React.lazy for components
3. **Image Optimization:** Optimize images before upload
4. **Caching:** Consider React Query or SWR for data caching

---

## Scalability

### Current State
- Suitable for small to medium traffic
- No pagination (consider adding for >1000 bookings)
- Single-server deployment

### Future Enhancements
1. **Horizontal Scaling:**
   - Load balancer for multiple backend instances
   - Stateless design (already implemented)

2. **Database Scaling:**
   - MongoDB Atlas auto-scaling
   - Read replicas for high-traffic scenarios

3. **Caching Layer:**
   - Redis for frequently accessed data
   - CDN for static assets

4. **Microservices (if needed):**
   - Separate booking service
   - Separate authentication service
   - Separate notification service

---

## Testing Strategy

### Backend Testing
```
Unit Tests        → Test individual functions
Integration Tests → Test API endpoints
Database Tests    → Test model operations
```

### Frontend Testing
```
Unit Tests        → Test components in isolation
Integration Tests → Test component interactions
E2E Tests         → Test complete user flows
```

### Recommended Tools
- **Backend:** Jest, Supertest, MongoDB Memory Server
- **Frontend:** Jest, React Testing Library, Cypress

---

## Development Workflow

### 1. Feature Development
```
1. Create feature branch
2. Implement changes
3. Test locally
4. Commit with meaningful message
5. Push to GitHub
6. Create pull request
7. Code review
8. Merge to main
```

### 2. Running Locally
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

---

## Monitoring & Logging

### Current State
- Console logging only
- No structured logging
- No monitoring

### Recommended Additions
1. **Logging:**
   - Winston or Bunyan for structured logs
   - Log levels (debug, info, warn, error)
   - Log aggregation (Logstash, CloudWatch)

2. **Monitoring:**
   - Application performance monitoring (New Relic, Datadog)
   - Error tracking (Sentry, Rollbar)
   - Uptime monitoring (UptimeRobot, Pingdom)

3. **Analytics:**
   - Google Analytics for user behavior
   - Custom events for booking funnel

---

## Future Roadmap

### Phase 2
- [ ] User authentication (JWT)
- [ ] Admin dashboard
- [ ] Update/delete booking endpoints
- [ ] Email notifications
- [ ] Payment integration

### Phase 3
- [ ] Multi-photographer support
- [ ] Calendar integration (Google Calendar)
- [ ] Booking reminders
- [ ] Photo delivery portal
- [ ] Customer reviews system

### Phase 4
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Marketing automation
- [ ] CRM integration

---

## Related Documentation

- [Bookings API Documentation](./api/bookings-api.md)
- [Booking Controller Service](./services/booking-controller.md)
- [Database Connection Service](./services/database-connection.md)
- [Error Handler Middleware](./services/error-handler.md)
- [Booking Model](./models/booking-model.md)
- [Client API Service](./services/client-api-service.md)
