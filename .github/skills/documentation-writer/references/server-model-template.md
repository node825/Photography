# Server Model/Database Documentation Template

Copy this template for documenting new MongoDB models and database schemas.

---

## Model Name

**Type**: MongoDB Document Model  
**Location**: `server/models/ModelName.js`  
**Collection**: collection_name  
**Purpose**: [Brief description of what this model represents]

### Overview

[Detailed description of the model's purpose, what data it stores, and why it's important in the system]

### Schema Definition

**File**: `server/models/ModelName.js`

```javascript
const modelSchema = new Schema({
  fieldName: {
    type: String,
    required: true,
    description: "What this field represents"
  },
  // ... other fields
});
```

### Field Definitions

| Field Name | Type | Required | Unique | Default | Validation | Description |
|------------|------|----------|--------|---------|-----------|-------------|
| `_id` | ObjectId | Auto | Yes | Generated | — | MongoDB document ID |
| fieldName1 | String | Yes | No | — | Min/max length, pattern | What it represents |
| fieldName2 | Number | No | No | 0 | Min/max value, integer | What it represents |
| fieldName3 | Enum | Yes | No | — | ['value1', 'value2'] | What it represents |
| createdAt | Date | Auto | No | now() | — | Timestamp of creation |
| updatedAt | Date | Auto | No | now() | — | Timestamp of update |

### Field Details

#### fieldName1 (String)
- **Type**: String
- **Required**: Yes/No
- **Unique**: Yes/No
- **Min length**: [if applicable]
- **Max length**: [if applicable]
- **Pattern/Validation**: [regex or description]
- **Example**: "example value"
- **Description**: [What it represents and why]

#### fieldName2 (Number)
- **Type**: Number
- **Required**: Yes/No
- **Min value**: [if applicable]
- **Max value**: [if applicable]
- **Integer**: Yes/No
- **Example**: 42
- **Description**: [What it represents]

#### fieldName3 (Enum)
- **Type**: String (Enum)
- **Required**: Yes/No
- **Allowed values**: ['value1', 'value2', 'value3']
- **Default**: 'value1'
- **Example**: 'value2'
- **Description**: [What each value means]

### Indexes

**Unique Constraints**:
```javascript
modelSchema.index({ email: 1, preferredDate: 1 }, { unique: true });
```

| Index | Fields | Unique | Sparse | Purpose |
|-------|--------|--------|--------|---------|
| `_id` | `_id` | Yes | No | Default MongoDB ID index |
| email_date | `email`, `preferredDate` | Yes | No | Prevent duplicate bookings for same email+date |
| created | `createdAt` | No | No | Fast date range queries |

### Validation Rules

```javascript
modelSchema.pre('save', function(next) {
  // Validation logic
});
```

**Validations**:
1. **fieldName1**: [Validation rule] - Error message: "[message]"
2. **fieldName2**: [Validation rule] - Error message: "[message]"
3. **Custom**: [Custom validation logic]

### Example MongoDB Document

**Actual document in collection**:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fieldName1": "example value",
  "fieldName2": 42,
  "fieldName3": "value1",
  "createdAt": "2025-02-08T10:30:00.000Z",
  "updatedAt": "2025-02-08T10:30:00.000Z",
  "__v": 0
}
```

### Relationships

**Parent Models** (this document references):
- [ModelName](#) - via `fieldName` - [Relationship type: one-to-one, one-to-many]

**Child Models** (reference this document):
- [ModelName](#) - via `foreignKeyField` - [Relationship type]

**Relationship Example**:
```javascript
// Model A references Model B
{
  _id: "...",
  name: "...",
  relatedModelId: ObjectId("507f...")  // Reference to Model B
}
```

### CRUD Operations

#### Create

```javascript
const newDocument = new ModelName({
  fieldName1: "value",
  fieldName2: 42,
  fieldName3: "value1"
});

const saved = await newDocument.save();
console.log(saved._id);
```

**API Endpoint**: [POST /api/endpoint](../api/endpoint-name.md)

#### Read

```javascript
// Find one by ID
const document = await ModelName.findById(id);

// Find with filters
const documents = await ModelName.find({ fieldName1: "value" });

// Find one with filter
const doc = await ModelName.findOne({ email: "user@example.com" });
```

**API Endpoints**:
- [GET /api/endpoint](../api/get-endpoint.md)
- [GET /api/endpoint/:id](../api/get-by-id.md)

#### Update

```javascript
// Update one
const updated = await ModelName.findByIdAndUpdate(
  id,
  { fieldName1: "new value" },
  { new: true }  // Return updated document
);

// Update many
const result = await ModelName.updateMany(
  { fieldName3: "value1" },
  { fieldName2: 100 }
);
```

**API Endpoint**: [PUT /api/endpoint/:id](../api/update-endpoint.md)

#### Delete

```javascript
// Delete one
const deleted = await ModelName.findByIdAndDelete(id);

// Delete many
const result = await ModelName.deleteMany({ fieldName3: "value1" });
```

**API Endpoint**: [DELETE /api/endpoint/:id](../api/delete-endpoint.md)

### Usage in Controllers

**File**: `server/controllers/controllerName.js`

```javascript
const ModelName = require('../models/ModelName');

exports.createDocument = async (req, res) => {
  try {
    const newDoc = new ModelName(req.body);
    const saved = await newDoc.save();
    res.status(201).json({ data: saved, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};
```

### API Endpoints Using This Model

| Endpoint | Method | Operation | File |
|----------|--------|-----------|------|
| `/api/documents` | POST | Create | [controller.js](#) |
| `/api/documents` | GET | List | [controller.js](#) |
| `/api/documents/:id` | GET | Read one | [controller.js](#) |
| `/api/documents/:id` | PUT | Update | [controller.js](#) |
| `/api/documents/:id` | DELETE | Delete | [controller.js](#) |

### Related Components

**Frontend Components** using data from this model:
- [ComponentName](../components/ComponentName.md) - Displays/edits this data

**Server Controllers** using this model:
- [controllerName](../controllers/controller-name.md) - Uses this model for operations

### Constraints & Considerations

**Data Constraints**:
- [Constraint 1 and its impact]
- [Constraint 2 and its impact]
- [Unique index prevents: description]

**Performance**:
- Indexed fields: [which fields are indexed]
- Query patterns: [common query patterns]
- Expected data volume: [how many documents]

**Data Retention**:
- Are old documents archived? [Yes/No and policy]
- Is there a TTL (time-to-live)? [Yes/No and duration]

**Privacy & Security**:
- Sensitive fields: [which fields might be PII]
- Access control: [who can access this data]

### Testing Examples

```javascript
describe('ModelName', () => {
  it('should create a document', async () => {
    const doc = new ModelName({
      fieldName1: "test",
      fieldName2: 42
    });
    const saved = await doc.save();
    expect(saved._id).toBeDefined();
  });

  it('should validate required fields', async () => {
    const doc = new ModelName({});
    await expect(doc.save()).rejects.toThrow();
  });

  it('should enforce unique constraint', async () => {
    const doc1 = new ModelName({ email: "test@example.com", date: "2025-02-08" });
    await doc1.save();
    
    const doc2 = new ModelName({ email: "test@example.com", date: "2025-02-08" });
    await expect(doc2.save()).rejects.toThrow();
  });
});
```

### Migration Guide

**If model schema changes**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Backward compatibility**: [Yes/No - explain]

### Notes

- [Any special considerations]
- [Edge cases to be aware of]
- [Performance optimizations]
- [Known limitations]

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-02-08 | Initial schema |

---

**Last updated**: 2025-02-08
**Documented by**: [Your name]
**Model file**: [Link to actual model file]
