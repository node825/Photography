# Photography Project Documentation Index

## תיעוד מלא של שרותי הפרויקט / Complete Project Services Documentation

Welcome to the Photography Project documentation. This documentation provides comprehensive information about all services, APIs, and architecture of the project.

---

## 📋 Table of Contents

### 🏗️ Architecture
- **[Architecture Overview](./ARCHITECTURE.md)** - Complete system architecture, design patterns, and technology stack

### 🔌 API Documentation
- **[Bookings API](./api/bookings-api.md)** - Complete REST API documentation for booking management
  - Create booking
  - Get all bookings
  - Get single booking
  - Get available dates
  - Request/response examples
  - Error handling

### 🛠️ Backend Services

#### Controllers
- **[Booking Controller](./services/booking-controller.md)** - Business logic for booking operations
  - `createBooking()` - Create new booking with validation
  - `getAllBookings()` - Retrieve all bookings
  - `getBooking()` - Get single booking by ID
  - `getAvailableDates()` - Get booked dates list

#### Configuration
- **[Database Connection](./services/database-connection.md)** - MongoDB connection management
  - Connection configuration
  - Environment setup
  - Error handling
  - Development mode

#### Middleware
- **[Error Handler](./services/error-handler.md)** - Centralized error handling
  - Error processing
  - Response formatting
  - Logging strategy
  - Production considerations

### 📊 Data Models
- **[Booking Model](./models/booking-model.md)** - MongoDB schema and validation
  - Schema definition
  - Field validation rules
  - Indexes and constraints
  - Usage examples
  - Best practices

### 💻 Frontend Services
- **[Client API Service](./services/client-api-service.md)** - Frontend HTTP client
  - Axios configuration
  - API methods
  - Error handling
  - Integration with React
  - Testing strategies

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/node825/Photography.git
   cd Photography
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - API Health: http://localhost:5000/api/health

---

## 📚 Documentation by Feature

### Booking System
The booking system allows clients to schedule photography sessions.

**Related Documentation:**
1. [Bookings API](./api/bookings-api.md) - API endpoints
2. [Booking Controller](./services/booking-controller.md) - Business logic
3. [Booking Model](./models/booking-model.md) - Data structure
4. [Client API Service](./services/client-api-service.md) - Frontend integration

**Key Features:**
- Create bookings with validation
- Prevent duplicate bookings
- Check available dates
- Support multiple session types (newborn, toddler, kids, family)

### Data Management
Database connection and model definitions.

**Related Documentation:**
1. [Database Connection](./services/database-connection.md) - MongoDB setup
2. [Booking Model](./models/booking-model.md) - Schema and validation

### Error Handling
Consistent error handling across the application.

**Related Documentation:**
1. [Error Handler](./services/error-handler.md) - Middleware documentation
2. [Bookings API](./api/bookings-api.md) - API error responses
3. [Client API Service](./services/client-api-service.md) - Frontend error handling

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Components  │  │    Pages     │  │  API Service │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
└────────────────────────────────────────────────┼────────────┘
                                                 │ HTTP/HTTPS
┌────────────────────────────────────────────────▼────────────┐
│                      Backend (Node.js/Express)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Routes    │──▶│ Controllers  │──▶│    Models    │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
│                                               │              │
│  ┌──────────────┐                            │              │
│  │  Middleware  │                            │              │
│  │ (Error, CORS)│                            │              │
│  └──────────────┘                            │              │
└──────────────────────────────────────────────┼──────────────┘
                                                │
                                    ┌───────────▼──────────┐
                                    │   MongoDB Database   │
                                    │   (Atlas/Local)      │
                                    └──────────────────────┘
```

For detailed architecture information, see [Architecture Overview](./ARCHITECTURE.md).

---

## 📖 API Reference

### Base URL
```
Development: http://localhost:5000/api
Production: https://api.your-domain.com/api
```

### Endpoints

| Method | Endpoint | Description | Documentation |
|--------|----------|-------------|---------------|
| POST | `/bookings` | Create new booking | [API Docs](./api/bookings-api.md#1-create-new-booking) |
| GET | `/bookings` | Get all bookings | [API Docs](./api/bookings-api.md#2-get-all-bookings) |
| GET | `/bookings/:id` | Get single booking | [API Docs](./api/bookings-api.md#3-get-single-booking) |
| GET | `/bookings/available-dates` | Get booked dates | [API Docs](./api/bookings-api.md#4-get-available-dates) |
| GET | `/health` | Health check | - |

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/photography
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

See [Database Connection](./services/database-connection.md) for detailed MongoDB setup.

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

For testing strategies and examples, see:
- [Client API Service - Testing](./services/client-api-service.md#testing)

---

## 🔒 Security

### Current Security Features
- Input validation (email, date, required fields)
- Email normalization (lowercase)
- Duplicate booking prevention
- CORS configuration
- Error message sanitization

### Recommended Enhancements
- JWT authentication
- Rate limiting
- HTTPS enforcement
- PII encryption

See [Architecture Overview - Security](./ARCHITECTURE.md#security-considerations) for details.

---

## 📈 Performance

### Optimization Strategies
- Database indexes on frequently queried fields
- Lean queries for read-only operations
- Field selection to limit data transfer
- Code splitting (frontend)
- Connection pooling (automatic)

See [Architecture Overview - Performance](./ARCHITECTURE.md#performance-considerations) for details.

---

## 🗺️ Future Roadmap

### Phase 2 (Planned)
- [ ] User authentication (JWT)
- [ ] Admin dashboard
- [ ] Update/delete booking endpoints
- [ ] Email notifications
- [ ] Payment integration

### Phase 3 (Future)
- [ ] Multi-photographer support
- [ ] Calendar integration
- [ ] Photo delivery portal
- [ ] Customer reviews
- [ ] Advanced analytics

See [Architecture Overview - Roadmap](./ARCHITECTURE.md#future-roadmap) for complete roadmap.

---

## 🐛 Troubleshooting

### Common Issues

1. **Cannot connect to MongoDB**
   - Check MONGODB_URI in .env file
   - Verify IP whitelist in MongoDB Atlas
   - See [Database Connection - Troubleshooting](./services/database-connection.md#troubleshooting)

2. **CORS errors**
   - Verify backend is running on port 5000
   - Check VITE_API_URL in frontend .env
   - See [Architecture Overview - CORS](./ARCHITECTURE.md#security-considerations)

3. **Booking creation fails**
   - Check validation errors in response
   - Verify date is not in the past
   - Check for duplicate bookings
   - See [Bookings API - Error Responses](./api/bookings-api.md#error-responses)

---

## 📞 Support & Contributing

### Getting Help
- Review documentation in this directory
- Check the main [README.md](../README.md)
- Open an issue on GitHub

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update documentation
5. Submit a pull request

---

## 📝 Documentation Standards

All documentation in this project follows these standards:
- Clear structure with table of contents
- Code examples for all features
- Request/response examples for APIs
- Error handling documentation
- Best practices and recommendations
- Links to related documentation

---

## 🌐 Bilingual Support

The application supports both Hebrew (RTL) and English (LTR):
- Hebrew: עברית
- English: English

For internationalization details, see [Architecture Overview - Internationalization](./ARCHITECTURE.md#key-features).

---

## 📅 Last Updated
February 8, 2026

---

## 📄 License
ISC

---

**Created with ❤️ for capturing beautiful moments**
