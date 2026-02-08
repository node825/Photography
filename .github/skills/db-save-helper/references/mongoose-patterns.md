# Mongoose Patterns and Best Practices

Common patterns and best practices for working with Mongoose in this project.

## Schema Definition Patterns

### Basic Field Types

```javascript
const schema = new mongoose.Schema({
  // String fields
  name: String,  // Simple
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Number fields
  age: Number,  // Simple
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
  
  // Boolean fields
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Date fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Array fields
  tags: [String],
  items: [{
    name: String,
    quantity: Number
  }],
  
  // ObjectId reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Mixed/Any type
  metadata: mongoose.Schema.Types.Mixed
});
```

### Enum Validation

```javascript
status: {
  type: String,
  enum: {
    values: ['pending', 'active', 'completed', 'cancelled'],
    message: '{VALUE} is not a valid status'
  },
  default: 'pending'
}
```

### Custom Validators

```javascript
phone: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /^05[0-9]-?[0-9]{7}$/.test(v);
    },
    message: props => `${props.value} is not a valid Israeli phone number!`
  }
}
```

### Virtual Properties

```javascript
// Define virtual
schema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Enable virtuals in JSON
schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });
```

## Index Patterns

### Single Field Index

```javascript
// Simple index
schema.index({ email: 1 });

// Unique index
schema.index({ username: 1 }, { unique: true });

// Text index for search
schema.index({ description: 'text' });
```

### Compound Index

```javascript
// Composite unique constraint
schema.index({ userId: 1, date: 1 }, { unique: true });

// Multi-field query optimization
schema.index({ status: 1, createdAt: -1 });
```

### Sparse Index

```javascript
// Only index documents that have the field
schema.index({ optionalField: 1 }, { sparse: true });
```

## Query Patterns

### Basic Queries

```javascript
// Find all
const all = await Model.find();

// Find with conditions
const active = await Model.find({ status: 'active' });

// Find one
const one = await Model.findOne({ email: 'user@example.com' });

// Find by ID
const byId = await Model.findById(id);

// Count
const count = await Model.countDocuments({ status: 'active' });

// Check existence
const exists = await Model.exists({ email: 'user@example.com' });
```

### Query Operators

```javascript
// Comparison
await Model.find({ age: { $gt: 18, $lte: 65 } });
await Model.find({ status: { $in: ['active', 'pending'] } });
await Model.find({ status: { $ne: 'cancelled' } });

// Logical
await Model.find({
  $or: [
    { status: 'active' },
    { priority: 'high' }
  ]
});

await Model.find({
  $and: [
    { status: 'active' },
    { createdAt: { $gte: startDate } }
  ]
});

// Element
await Model.find({ optionalField: { $exists: true } });

// Array
await Model.find({ tags: 'javascript' });  // Array contains
await Model.find({ tags: { $all: ['javascript', 'nodejs'] } });  // Contains all
await Model.find({ tags: { $size: 3 } });  // Array length
```

### Sorting and Limiting

```javascript
// Sort ascending
await Model.find().sort({ createdAt: 1 });

// Sort descending
await Model.find().sort({ createdAt: -1 });

// Multiple sort fields
await Model.find().sort({ priority: -1, createdAt: -1 });

// Limit results
await Model.find().limit(10);

// Skip for pagination
await Model.find().skip(20).limit(10);

// Combined
await Model.find({ status: 'active' })
  .sort({ createdAt: -1 })
  .limit(20)
  .skip(0);
```

### Field Selection

```javascript
// Include specific fields
await Model.find().select('name email');
await Model.find().select({ name: 1, email: 1 });

// Exclude specific fields
await Model.find().select('-password -__v');
await Model.find().select({ password: 0, __v: 0 });
```

### Population (References)

```javascript
// Basic populate
await Model.findById(id).populate('userId');

// Populate specific fields
await Model.findById(id).populate('userId', 'name email');

// Multiple populates
await Model.findById(id)
  .populate('userId')
  .populate('categoryId');

// Nested populate
await Model.findById(id).populate({
  path: 'userId',
  select: 'name email',
  populate: {
    path: 'roleId',
    select: 'name'
  }
});
```

## Create/Update/Delete Patterns

### Creating Documents

```javascript
// Single document
const doc = await Model.create({
  name: 'John',
  email: 'john@example.com'
});

// Multiple documents
const docs = await Model.create([
  { name: 'John', email: 'john@example.com' },
  { name: 'Jane', email: 'jane@example.com' }
]);

// Using save()
const doc = new Model({ name: 'John' });
doc.email = 'john@example.com';
await doc.save();
```

### Updating Documents

```javascript
// Update one
await Model.updateOne(
  { _id: id },
  { $set: { status: 'active' } }
);

// Update many
await Model.updateMany(
  { status: 'pending' },
  { $set: { status: 'active' } }
);

// Find and update (returns updated document)
const updated = await Model.findByIdAndUpdate(
  id,
  { $set: { status: 'active' } },
  { new: true, runValidators: true }
);

// Find and update with conditions
const updated = await Model.findOneAndUpdate(
  { email: 'john@example.com' },
  { $set: { lastLogin: Date.now() } },
  { new: true }
);
```

### Update Operators

```javascript
// $set - Set field value
await Model.updateOne({ _id: id }, { $set: { name: 'New Name' } });

// $inc - Increment number
await Model.updateOne({ _id: id }, { $inc: { views: 1 } });

// $push - Add to array
await Model.updateOne({ _id: id }, { $push: { tags: 'new-tag' } });

// $pull - Remove from array
await Model.updateOne({ _id: id }, { $pull: { tags: 'old-tag' } });

// $addToSet - Add to array if not exists
await Model.updateOne({ _id: id }, { $addToSet: { tags: 'unique-tag' } });

// $unset - Remove field
await Model.updateOne({ _id: id }, { $unset: { tempField: 1 } });
```

### Deleting Documents

```javascript
// Delete one
await Model.deleteOne({ _id: id });

// Delete many
await Model.deleteMany({ status: 'cancelled' });

// Find and delete (returns deleted document)
const deleted = await Model.findByIdAndDelete(id);
const deleted = await Model.findOneAndDelete({ email: 'john@example.com' });
```

## Error Handling Patterns

### Common MongoDB Errors

```javascript
try {
  const doc = await Model.create(data);
  return doc;
} catch (error) {
  // Duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    throw new Error(`${field} already exists`);
  }
  
  // Validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message);
    throw new Error(messages.join(', '));
  }
  
  // Cast error (invalid ObjectId)
  if (error.name === 'CastError') {
    throw new Error(`Invalid ${error.path}: ${error.value}`);
  }
  
  // Generic error
  throw error;
}
```

## Transaction Patterns

```javascript
// Start a session
const session = await mongoose.startSession();

try {
  // Start transaction
  session.startTransaction();
  
  // Operations with session
  const user = await User.create([{ name: 'John' }], { session });
  await Booking.create([{
    userId: user[0]._id,
    date: new Date()
  }], { session });
  
  // Commit transaction
  await session.commitTransaction();
} catch (error) {
  // Rollback on error
  await session.abortTransaction();
  throw error;
} finally {
  // End session
  session.endSession();
}
```

## Middleware (Hooks) Patterns

### Pre-save Middleware

```javascript
// Hash password before saving
schema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const bcrypt = require('bcrypt');
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

### Post-save Middleware

```javascript
// Log after save
schema.post('save', function(doc, next) {
  console.log(`${doc._id} was saved`);
  next();
});
```

### Query Middleware

```javascript
// Always exclude soft-deleted documents
schema.pre(/^find/, function(next) {
  this.where({ deleted: { $ne: true } });
  next();
});
```

## Aggregation Patterns

```javascript
// Group and count
const stats = await Model.aggregate([
  { $match: { status: 'active' } },
  { $group: {
    _id: '$category',
    count: { $sum: 1 },
    avgPrice: { $avg: '$price' }
  }},
  { $sort: { count: -1 } }
]);

// Lookup (join)
const results = await Model.aggregate([
  { $lookup: {
    from: 'users',
    localField: 'userId',
    foreignField: '_id',
    as: 'user'
  }},
  { $unwind: '$user' },
  { $project: {
    name: 1,
    userName: '$user.name'
  }}
]);
```

## Performance Best Practices

1. **Always use indexes** for frequently queried fields
2. **Use lean()** for read-only queries: `Model.find().lean()`
3. **Use select()** to limit returned fields
4. **Use pagination** with skip() and limit()
5. **Avoid N+1 queries** with populate()
6. **Use projection** in aggregation pipelines
7. **Create compound indexes** for multi-field queries
8. **Monitor slow queries** with MongoDB profiler

## Security Best Practices

1. **Never store passwords in plain text** - use bcrypt
2. **Validate all inputs** with Mongoose validators
3. **Sanitize user inputs** to prevent injection
4. **Use parameterized queries** (Mongoose does this by default)
5. **Limit array sizes** to prevent memory issues
6. **Use select('-password')** to exclude sensitive fields
7. **Implement rate limiting** for public endpoints
8. **Add authentication** for protected routes
