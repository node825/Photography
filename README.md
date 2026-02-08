# Kids Photography Website

A modern, bilingual (Hebrew/English) kids photography website with gallery and booking system.

## Technology Stack



### Frontend
- React with Vite
- Tailwind CSS
- Framer Motion
- react-i18next (Hebrew RTL + English LTR)
- React Router
- React Big Calendar

### Backend
- Node.js with Express
- MongoDB with Mongoose
- RESTful API

## Project Structure

```
kids-photography/
├── client/          # React Frontend
├── server/          # Node.js Backend
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Configure environment variables (see `.env.example` in server folder)

5. Run the development servers:
   - Backend: `cd server && npm run dev`
   - Frontend: `cd client && npm run dev`

## Features

- 📸 Photo gallery with category filters
- 📅 Interactive booking system with calendar
- 🌐 Bilingual support (Hebrew RTL / English LTR)
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion

## Documentation

📚 **[Complete Services Documentation](./docs/README.md)** - תיעוד מלא של כל השרותים

Comprehensive documentation covering:
- **[API Documentation](./docs/api/bookings-api.md)** - REST API endpoints and examples
- **[Architecture Overview](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Services Documentation](./docs/services/)** - Backend services and business logic
- **[Data Models](./docs/models/booking-model.md)** - Database schemas and validation

## Development Status

🚧 Project in development

---

Created with ❤️ for capturing beautiful moments
