# Database Connection Service Documentation

## Overview
The Database Connection Service manages the connection to MongoDB using Mongoose ODM. It provides a centralized connection management with error handling and development-mode flexibility.

**Location:** `server/config/db.js`

## Function

### connectDB
Establishes connection to MongoDB database.

**Signature:**
```javascript
const connectDB = async () => { ... }
```

**Returns:** 
- `Promise<void>` - Resolves when connection is successful or gracefully skips connection

## Connection Logic

### 1. Environment Variable Check
```javascript
if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI not set. Skipping MongoDB connection (development mode).');
  return;
}
```
- Checks if `MONGODB_URI` environment variable is set
- Allows server to run without database in development mode
- Logs warning and returns early if not configured

### 2. URI Format Validation
```javascript
if (!/^mongodb(\+srv)?:\/\//i.test(process.env.MONGODB_URI)) {
  console.warn('MONGODB_URI does not appear to be a valid MongoDB connection string. Skipping connection.');
  return;
}
```
- Validates connection string format
- Checks for `mongodb://` or `mongodb+srv://` protocol
- Prevents connection attempts with invalid URIs
- Useful for catching placeholder values in .env files

### 3. Connection Attempt
```javascript
const conn = await mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser / useUnifiedTopology not required in Mongoose v6+
});
console.log(`MongoDB Connected: ${conn.connection.host}`);
```
- Uses Mongoose's `connect()` method
- No legacy options needed (using Mongoose 8.x)
- Logs successful connection with host information

### 4. Error Handling
```javascript
catch (error) {
  console.error(`MongoDB connection error: ${error.message}`);
  throw error;
}
```
- Catches connection errors
- Logs error message to console
- Re-throws error to allow caller to handle
- Does not exit process (allows development without DB)

## Usage

### In server.js
```javascript
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB (if MONGODB_URI is provided)
connectDB().catch(err => {
  console.warn('Continuing without DB connection:', err.message || err);
});
```

The server continues to run even if database connection fails, making it flexible for development.

## Environment Configuration

### Required Environment Variable
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Supported Formats
- **MongoDB Atlas (Recommended):**
  ```
  mongodb+srv://username:password@cluster.mongodb.net/photography
  ```
- **Local MongoDB:**
  ```
  mongodb://localhost:27017/photography
  ```
- **MongoDB with Auth:**
  ```
  mongodb://username:password@host:port/photography
  ```

## Development Mode

### Running Without Database
The service is designed to allow development without MongoDB:

1. Don't set `MONGODB_URI` environment variable, or
2. Set it to an invalid value (like "your-mongodb-uri-here")

The server will:
- Log a warning message
- Skip database connection
- Continue running normally
- API endpoints will fail when accessing database

This is useful for:
- Frontend development without backend
- Testing non-database features
- Initial setup before database configuration

## Connection Features

### Automatic Reconnection
Mongoose automatically handles reconnection attempts if connection is lost.

### Connection Pooling
Mongoose manages connection pooling internally with sensible defaults:
- Default pool size: 5
- Can be configured if needed in options object

### Modern Configuration
Uses Mongoose 8.x which:
- Doesn't require `useNewUrlParser` option
- Doesn't require `useUnifiedTopology` option
- Has better defaults out of the box

## Error Scenarios

### Scenario 1: Missing Environment Variable
```
MONGODB_URI not set. Skipping MongoDB connection (development mode).
```
**Result:** Server continues, no DB connection

### Scenario 2: Invalid URI Format
```
MONGODB_URI does not appear to be a valid MongoDB connection string. Skipping connection.
```
**Result:** Server continues, no DB connection

### Scenario 3: Connection Failed
```
MongoDB connection error: [specific error message]
Continuing without DB connection: [error message]
```
**Result:** Server continues, no DB connection

### Scenario 4: Successful Connection
```
MongoDB Connected: cluster0-xyz.mongodb.net
```
**Result:** Server connected, database fully functional

## Dependencies
```json
{
  "mongoose": "^8.20.0"
}
```

## Best Practices

1. **Use MongoDB Atlas** for production (free tier available)
2. **Never commit** connection strings to version control
3. **Use .env file** for local development configuration
4. **Rotate credentials** regularly in production
5. **Monitor connections** using MongoDB Atlas dashboard

## Security Considerations

1. **Connection String Security:**
   - Keep credentials in environment variables
   - Use strong passwords
   - Restrict IP access in MongoDB Atlas

2. **Network Security:**
   - Use `mongodb+srv://` for encrypted connections
   - Configure firewall rules in MongoDB Atlas

3. **Authentication:**
   - Always use authenticated connections in production
   - Use role-based access control (RBAC)

## Troubleshooting

### Common Issues

1. **Connection Timeout:**
   - Check network connectivity
   - Verify IP whitelist in MongoDB Atlas
   - Ensure connection string is correct

2. **Authentication Failed:**
   - Verify username and password
   - Check database user permissions
   - Ensure database name in URI is correct

3. **DNS Resolution Failed:**
   - Check DNS settings
   - Try using `mongodb://` instead of `mongodb+srv://`
   - Verify cluster domain name

## Export
```javascript
module.exports = connectDB;
```

## Future Enhancements
- Add connection retry logic with exponential backoff
- Implement connection monitoring and health checks
- Add connection metrics logging
- Support multiple database connections
- Add database seeding functionality
