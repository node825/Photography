# Validation Examples

Comprehensive examples of Mongoose validation patterns for common use cases.

## String Validation

### Required Fields

```javascript
name: {
  type: String,
  required: true  // Simple
}

name: {
  type: String,
  required: [true, 'Name is required']  // With custom message
}

name: {
  type: String,
  required: function() {
    return this.status === 'active';  // Conditional
  }
}
```

### Length Validation

```javascript
username: {
  type: String,
  minlength: [3, 'Username must be at least 3 characters'],
  maxlength: [20, 'Username cannot exceed 20 characters']
}

description: {
  type: String,
  maxlength: 500
}
```

### Pattern Matching (Regex)

```javascript
// Email validation
email: {
  type: String,
  required: true,
  lowercase: true,
  match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
}

// Phone number (Israeli format)
phone: {
  type: String,
  required: true,
  match: [/^05[0-9]-?[0-9]{7}$/, 'Please provide a valid phone number']
}

// URL validation
website: {
  type: String,
  match: [/^https?:\/\/.+/, 'Please provide a valid URL']
}

// Alphanumeric only
code: {
  type: String,
  match: [/^[a-zA-Z0-9]+$/, 'Code must be alphanumeric']
}
```

### Enum Values

```javascript
status: {
  type: String,
  enum: ['pending', 'active', 'cancelled']  // Simple
}

status: {
  type: String,
  enum: {
    values: ['pending', 'active', 'completed'],
    message: '{VALUE} is not supported'  // Custom message
  }
}

role: {
  type: String,
  enum: ['user', 'admin', 'moderator'],
  default: 'user'
}
```

### String Formatting

```javascript
email: {
  type: String,
  lowercase: true,  // Convert to lowercase
  trim: true        // Remove whitespace
}

code: {
  type: String,
  uppercase: true   // Convert to uppercase
}
```

## Number Validation

### Min/Max Values

```javascript
age: {
  type: Number,
  min: [0, 'Age cannot be negative'],
  max: [120, 'Age cannot exceed 120']
}

price: {
  type: Number,
  required: true,
  min: 0
}

rating: {
  type: Number,
  min: 1,
  max: 5
}

percentage: {
  type: Number,
  min: 0,
  max: 100
}
```

### Integer Validation

```javascript
quantity: {
  type: Number,
  required: true,
  validate: {
    validator: Number.isInteger,
    message: '{VALUE} is not an integer'
  }
}
```

### Custom Number Validation

```javascript
discount: {
  type: Number,
  validate: {
    validator: function(v) {
      return v >= 0 && v <= 100;
    },
    message: 'Discount must be between 0 and 100'
  }
}
```

## Date Validation

### Required Date

```javascript
birthDate: {
  type: Date,
  required: [true, 'Birth date is required']
}

createdAt: {
  type: Date,
  default: Date.now  // Auto-set
}
```

### Date Range Validation

```javascript
startDate: {
  type: Date,
  required: true,
  validate: {
    validator: function(v) {
      return v >= new Date();
    },
    message: 'Start date must be in the future'
  }
}

endDate: {
  type: Date,
  required: true,
  validate: {
    validator: function(v) {
      return v > this.startDate;
    },
    message: 'End date must be after start date'
  }
}
```

### Custom Date Validation (in Controller)

```javascript
// In controller, not schema
const selectedDate = new Date(preferredDate);
const today = new Date();
today.setHours(0, 0, 0, 0);

if (selectedDate < today) {
  return res.status(400).json({
    success: false,
    message: 'Date cannot be in the past'
  });
}

// Check if date is within working hours
const dayOfWeek = selectedDate.getDay();
if (dayOfWeek === 5 || dayOfWeek === 6) {  // Friday or Saturday
  return res.status(400).json({
    success: false,
    message: 'Bookings not available on weekends'
  });
}
```

## Boolean Validation

```javascript
isActive: {
  type: Boolean,
  default: true
}

emailVerified: {
  type: Boolean,
  default: false
}

terms: {
  type: Boolean,
  required: [true, 'You must accept the terms'],
  validate: {
    validator: function(v) {
      return v === true;
    },
    message: 'Terms must be accepted'
  }
}
```

## Array Validation

### Array of Primitives

```javascript
tags: {
  type: [String],
  validate: {
    validator: function(v) {
      return v.length <= 10;
    },
    message: 'Cannot have more than 10 tags'
  }
}

phoneNumbers: {
  type: [String],
  validate: {
    validator: function(arr) {
      return arr.every(phone => /^05[0-9]-?[0-9]{7}$/.test(phone));
    },
    message: 'All phone numbers must be valid'
  }
}
```

### Array of Subdocuments

```javascript
items: [{
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}]

// Validate array length
items: {
  type: [{
    name: String,
    quantity: Number
  }],
  validate: {
    validator: function(v) {
      return v.length > 0 && v.length <= 20;
    },
    message: 'Must have between 1 and 20 items'
  }
}
```

## ObjectId Reference Validation

```javascript
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: [true, 'User ID is required']
}

// Validate ObjectId exists
categoryId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: true,
  validate: {
    validator: async function(v) {
      const Category = mongoose.model('Category');
      const exists = await Category.exists({ _id: v });
      return exists;
    },
    message: 'Category does not exist'
  }
}
```

## Custom Validators

### Async Validation (Check Database)

```javascript
email: {
  type: String,
  required: true,
  lowercase: true,
  validate: {
    validator: async function(email) {
      // Only validate on new documents
      if (this.isNew) {
        const User = mongoose.model('User');
        const user = await User.findOne({ email });
        return !user;
      }
      return true;
    },
    message: 'Email already exists'
  }
}
```

### Multiple Conditions

```javascript
username: {
  type: String,
  required: true,
  validate: [
    {
      validator: function(v) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: 'Username can only contain letters, numbers, and underscores'
    },
    {
      validator: function(v) {
        return v.length >= 3 && v.length <= 20;
      },
      message: 'Username must be between 3 and 20 characters'
    }
  ]
}
```

### Cross-Field Validation

```javascript
// In schema
const schema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v === this.password;
      },
      message: 'Passwords do not match'
    }
  }
});

// Remove confirmPassword before saving
schema.pre('save', function(next) {
  this.confirmPassword = undefined;
  next();
});
```

## Conditional Validation

```javascript
// Required only if another field has specific value
deliveryAddress: {
  type: String,
  required: function() {
    return this.deliveryMethod === 'shipping';
  }
}

// Validate only if field is modified
password: {
  type: String,
  validate: {
    validator: function(v) {
      if (this.isModified('password')) {
        return v.length >= 8;
      }
      return true;
    },
    message: 'Password must be at least 8 characters'
  }
}
```

## File/Upload Validation

```javascript
// Image upload
avatar: {
  type: String,  // Store file path or URL
  validate: {
    validator: function(v) {
      return /\.(jpg|jpeg|png|gif)$/i.test(v);
    },
    message: 'Avatar must be an image file'
  }
}

// File size (in controller)
if (req.file && req.file.size > 5 * 1024 * 1024) {
  return res.status(400).json({
    success: false,
    message: 'File size cannot exceed 5MB'
  });
}
```

## Unique Constraints

### Single Field

```javascript
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true
}

// With index
schema.index({ email: 1 }, { unique: true });
```

### Composite Unique (Multiple Fields)

```javascript
// Prevent duplicate bookings for same email on same date
schema.index({ email: 1, preferredDate: 1 }, { unique: true });

// Prevent duplicate votes
schema.index({ userId: 1, postId: 1 }, { unique: true });

// Handling error in controller
if (error.code === 11000) {
  return res.status(400).json({
    success: false,
    message: 'A booking already exists for this email on this date'
  });
}
```

### Case-Insensitive Unique

```javascript
username: {
  type: String,
  required: true,
  lowercase: true,  // Convert to lowercase before saving
  unique: true
}
```

## Validation Error Handling

### In Controller

```javascript
try {
  const doc = await Model.create(data);
  res.status(201).json({ success: true, data: doc });
} catch (error) {
  // Validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }
  
  // Duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }
  
  // Generic error
  res.status(400).json({
    success: false,
    message: error.message
  });
}
```

### Custom Error Messages

```javascript
// Extract specific field errors
if (error.name === 'ValidationError') {
  const errors = {};
  Object.keys(error.errors).forEach(key => {
    errors[key] = error.errors[key].message;
  });
  
  return res.status(400).json({
    success: false,
    errors: errors
  });
}

// Response format:
{
  "success": false,
  "errors": {
    "email": "Please provide a valid email",
    "phone": "Please provide phone number"
  }
}
```

## Best Practices

1. **Always provide custom error messages** for better UX
2. **Validate on both client and server** - never trust client data
3. **Use schema validators for data integrity** - not business logic
4. **Use controller validation for complex logic** - date checks, external API calls
5. **Handle all error types** - validation, duplicate key, cast errors
6. **Keep validators pure** - avoid side effects
7. **Use async validators sparingly** - they slow down saves
8. **Test edge cases** - empty strings, null, undefined, extreme values
9. **Document validation rules** - in API documentation
10. **Return specific error messages** - help users fix issues

## Common Validation Scenarios

### User Registration

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18 years old'],
    max: [120, 'Invalid age']
  }
});
```

### Product Listing

```javascript
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be an integer'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['electronics', 'clothing', 'books', 'home']
  },
  tags: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: 'Cannot have more than 10 tags'
    }
  }
});
```

### Booking/Appointment

```javascript
const bookingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^05[0-9]-?[0-9]{7}$/, 'Please provide a valid phone number']
  },
  sessionType: {
    type: String,
    required: [true, 'Session type is required'],
    enum: ['newborn', 'toddler', 'kids', 'family']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
});

// Composite unique index
bookingSchema.index({ email: 1, preferredDate: 1 }, { unique: true });
```
