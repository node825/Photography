# API Endpoint Documentation Template

Copy this template for documenting new API endpoints.

---

## Endpoint Name

**Description**: [Brief description of what the endpoint does]

### Endpoint Definition

```
METHOD /api/path
```

- **Method**: GET | POST | PUT | DELETE
- **Base URL**: `http://localhost:5000`
- **Full URL**: `http://localhost:5000/api/...`

### Request

#### Headers

```
Content-Type: application/json
Authorization: [if required]
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| param1 | string | Yes | What it is for |
| param2 | number | No | What it is for |

#### Request Body Example

```json
{
  "field1": "value",
  "field2": 123
}
```

### Response

#### Success Response (200)

**Status Code**: `200 OK`

**Schema**:

```typescript
{
  message?: string;
  data: {
    id: string;
    field1: string;
    field2: number;
    createdAt: string; // ISO 8601 date
  };
  success: boolean;
}
```

**Example Response**:

```json
{
  "message": "Resource created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "field1": "example",
    "field2": 42,
    "createdAt": "2025-02-08T10:30:00Z"
  },
  "success": true
}
```

#### Error Responses

##### 400 Bad Request

```json
{
  "error": "Validation failed",
  "details": "field1 is required",
  "success": false
}
```

**When**: Missing required fields, invalid data types, validation failed

##### 404 Not Found

```json
{
  "error": "Resource not found",
  "success": false
}
```

**When**: Resource with ID doesn't exist

##### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "success": false
}
```

**When**: Unexpected server error, database connection failed

### Implementation Details

#### Backend (Server)

**File**: `server/routes/endpoint.js` or `server/controllers/controller.js`

**Steps**:
1. [Step 1: Validate input]
2. [Step 2: Query database]
3. [Step 3: Transform response]
4. [Step 4: Return result]

**Dependencies**:
- Model: [Model name if applicable]
- Middleware: [any authentication, error handling]

#### Frontend (Client)

**Location**: `client/src/utils/api.js` (or component that calls it)

**HTTP Client**: axios

**Integration Points**:
- Used in: [Component name]
- On event: [When it's called: click, form submit, etc.]

### Code Examples

#### Frontend Usage

```javascript
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Making the API call
const response = await axios.post(`${apiUrl}/endpoint`, {
  field1: "value",
  field2: 123
});

console.log(response.data.data);
```

#### In a React Component

```jsx
import { useState } from 'react';
import axios from 'axios';

export default function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/endpoint`,
        formData
      );
      console.log('Success:', response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={() => handleSubmit({...})} disabled={loading}>
      {loading ? 'Sending...' : 'Submit'}
    </button>
  );
}
```

### Database Model

**Model**: [Model name]

**Fields affected**:
- field1: [Type] - [Description]
- field2: [Type] - [Description]

**Example document**:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "field1": "value",
  "field2": 123,
  "createdAt": "2025-02-08T10:30:00Z"
}
```

### Dependencies

**Related APIs**:
- [GET /api/endpoint](#) - Get resource

**Related Components**:
- [ComponentName](../components/ComponentName.md) - Uses this endpoint

**Related Models**:
- [ModelName](../models/ModelName.md) - Data structure

### Error Handling

| Error Code | Cause | Client Action |
|------------|-------|----------------|
| 400 | Validation failed | Show validation error message to user |
| 404 | Not found | Show "Resource not found" message |
| 500 | Server error | Show "Server error, try again later" |

### Testing Checklist

- [ ] Test with valid data
- [ ] Test with missing required field
- [ ] Test with invalid data type
- [ ] Test when resource doesn't exist
- [ ] Test error handling in component
- [ ] Test loading state UI
- [ ] Verify response schema matches documentation
- [ ] Test in both Hebrew and English

### Notes

- [Any special considerations]
- [Edge cases to be aware of]
- [Performance considerations]
- [Security notes if applicable]

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-02-08 | Initial documentation |

---

**Last updated**: 2025-02-08
**Documented by**: [Your name]
