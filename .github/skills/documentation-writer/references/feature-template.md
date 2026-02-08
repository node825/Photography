# Feature Documentation Template

Copy this template for documenting new features, workflows, or integrations that span multiple parts of the system.

---

## Feature Name

**Category**: User Feature | System Feature | Integration Feature  
**Status**: Active | Planned | Deprecated  
**Priority**: Critical | High | Medium | Low  
**Location**: `doc/features/feature-name.md`  
**Last Updated**: 2025-02-08

### Overview

[Detailed description of the feature, what problem it solves, and what value it provides to the user or system]

### Business Purpose

[Why was this feature built? What business goal does it serve?]
- [Goal 1]
- [Goal 2]

### User Story / Use Case

**As a** [user type]  
**I want to** [action]  
**So that** [benefit]

**Acceptance Criteria**:
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

### Feature Workflow

**Visual Workflow** (text description):

1. **Step 1**: [User action or system trigger]
   - What happens: [System response]
   - Technical: [What backend processes run]

2. **Step 2**: [Next user action]
   - What happens: [Response]
   - Technical: [Backend operations]

3. **Step 3**: [Completion]
   - What happens: [Final state]
   - Technical: [Final backend operations]

**Example Scenario**:
- User [does action]
- System [validates and processes]
- User [sees result]

### Technical Architecture

```
┌─────────────────┐
│   Frontend      │
│  React Comp     │
└────────┬────────┘
         │ API Call
         ▼
┌─────────────────┐
│   Backend       │
│ Express Route   │
└────────┬────────┘
         │ Database Ops
         ▼
┌─────────────────┐
│   Database      │
│   MongoDB       │
└─────────────────┘
```

### Components Involved

#### Frontend Components

| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| [ComponentName](../components/ComponentName.md) | `client/src/components/ComponentName.jsx` | [What it does] | prop1, prop2 |
| [ComponentName2](../components/ComponentName2.md) | `client/src/components/ComponentName2.jsx` | [What it does] | prop1, prop2 |

**Component Hierarchy**:
```
ParentComponent
├── ChildComponent1
│   └── NestedComponent
└── ChildComponent2
```

**Data Flow**:
- [Component] receives data via [API/props]
- [Component] sends data via [callback/API call]
- [Component] shows state: [loading, success, error]

#### Backend Routes & Controllers

| Endpoint | Method | Controller | Purpose |
|----------|--------|-----------|---------|
| `/api/resource` | POST | [controller.js](#) | [What it does] |
| `/api/resource` | GET | [controller.js](#) | [What it does] |
| `/api/resource/:id` | PUT | [controller.js](#) | [What it does] |

**File Structure**:
```
server/
├── routes/feature-routes.js
├── controllers/feature-controller.js
├── models/Model1.js
├── models/Model2.js
└── middleware/auth.js
```

#### Database Models

| Model | File | Purpose | Key Fields |
|-------|------|---------|-----------|
| [ModelName](../models/ModelName.md) | `server/models/ModelName.js` | [What it stores] | field1, field2 |
| [ModelName2](../models/ModelName2.md) | `server/models/ModelName2.js` | [What it stores] | field1, field2 |

**Data Relationships**:
- [Model1] has many [Model2]
- [Model2] belongs to [Model1]

### API Endpoints

#### Endpoint 1: Create Resource

**Reference**: [Full endpoint documentation](../api/create-endpoint.md)

```
POST /api/resource
```

**Request**:
```json
{
  "field1": "value",
  "field2": "value"
}
```

**Response**:
```json
{
  "data": {
    "_id": "...",
    "field1": "value",
    "field2": "value",
    "createdAt": "2025-02-08T10:30:00Z"
  },
  "success": true
}
```

#### Endpoint 2: Get Resource

**Reference**: [Full endpoint documentation](../api/get-endpoint.md)

```
GET /api/resource/:id
```

**Response**:
```json
{
  "data": { /* resource object */ },
  "success": true
}
```

### Implementation Details

#### Client-Side Implementation

**Form Validation**:
- [Field 1]: [Validation rule] - Error: "[message]"
- [Field 2]: [Validation rule] - Error: "[message]"

**State Management**:
```javascript
const [formData, setFormData] = useState({ field1: '', field2: '' });
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**API Integration**:
1. User submits form
2. Validate all fields
3. Show loading state
4. Call POST endpoint
5. Handle success/error
6. Show confirmation message

**Error Handling**:
- [Error type 1]: Show custom message to user
- [Error type 2]: Retry mechanism
- [Error type 3]: Fallback behavior

#### Server-Side Implementation

**Validation**:
```javascript
// Validate input
if (!req.body.field1) {
  return res.status(400).json({ error: 'field1 is required' });
}
```

**Business Logic**:
1. Validate request data
2. Query database (find related records if needed)
3. Perform calculations/transformations
4. Create/update document
5. Return result

**Error Handling**:
```javascript
try {
  // logic
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
```

**Database Operations**:
```javascript
const newRecord = new ModelName(req.body);
const saved = await newRecord.save();
```

### Integration Points

**How this feature connects to other features**:
1. [Feature 1] - [How they interact]
2. [Feature 2] - [How they interact]

**Dependencies**:
- Requires: [Other features/services that must exist]
- Used by: [Features that depend on this]

### Internationalization (i18n)

**Translation Keys** (for UI text):

**Hebrew** (file: `client/src/i18n/locales/he/translation.json`):
```json
{
  "feature": {
    "heading": "כותרת בעברית",
    "label": "תיבת טקסט בעברית",
    "button": "כפתור בעברית",
    "success": "הפעולה הצליחה",
    "error": "אירעה שגיאה"
  }
}
```

**English** (file: `client/src/i18n/locales/en/translation.json`):
```json
{
  "feature": {
    "heading": "English Heading",
    "label": "Text input label",
    "button": "Button Text",
    "success": "Operation successful",
    "error": "An error occurred"
  }
}
```

**Component Usage**:
```javascript
const { t } = useTranslation();
<h2>{t('feature.heading')}</h2>
```

### Styling & Animation

**Tailwind Classes**:
- Container: `py-20 bg-background`
- Heading: `text-3xl font-bold text-gold`
- Button: `px-6 py-2 bg-gold text-background rounded`

**Framer Motion Animations**:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Testing Strategy

**Unit Tests**:
- [Component renders correctly]
- [Validation works]
- [API call triggers on submit]
- [Error states display]

**Integration Tests**:
- [Form submit → API call → Response handling]
- [Database save → Component update]
- [Error scenario → User message]

**Manual Testing Checklist**:
- [ ] Feature works in Hebrew (RTL)
- [ ] Feature works in English (LTR)
- [ ] Form validation prevents submission of invalid data
- [ ] Loading state shows during API call
- [ ] Success message appears after completion
- [ ] Error message shows on API failure
- [ ] Data persists in database
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations are smooth
- [ ] No console errors

### Performance Considerations

**Frontend**:
- Component uses `whileInView` with `once: true` to prevent re-animation
- Form validates locally before API call
- Loading state prevents multiple submissions

**Backend**:
- Database indexes on frequently queried fields: [fieldName1, fieldName2]
- Query optimization: [specific optimization]
- Expected response time: < 500ms

**Database**:
- Indexed fields: [list]
- Query patterns: [typical access patterns]
- Expected document count: [estimate]

### Security Considerations

**Input Validation**:
- All user inputs validated on client and server
- Sanitize user-provided data to prevent injection attacks

**Authentication** (if applicable):
- Requires: [User logged in / Admin role / etc.]
- Implemented via: [middleware/decorator]

**Data Privacy**:
- [PII fields]: Encrypted in database
- [Sensitive operations]: Logged for audit trail
- [Who can access]: [User role restrictions]

### Known Issues & Limitations

| Issue | Impact | Status | Notes |
|-------|--------|--------|-------|
| [Issue description] | [High/Medium/Low] | Open | [Workaround or plan] |
| [Issue description] | [High/Medium/Low] | Open | [Workaround or plan] |

### Future Enhancements

1. [Enhancement 1] - [Reason why]
2. [Enhancement 2] - [Reason why]
3. [Enhancement 3] - [Reason why]

### Code Examples

#### Complete Feature Usage

```jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function FeatureComponent() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ field1: '', field2: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resource`,
        formData
      );
      setSuccess(true);
      setFormData({ field1: '', field2: '' });
    } catch (err) {
      setError(err.response?.data?.error || t('feature.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-gold mb-8">
        {t('feature.heading')}
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          placeholder={t('feature.label')}
          value={formData.field1}
          onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 text-white mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 bg-gold text-background"
        >
          {loading ? t('feature.loading') : t('feature.button')}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{t('feature.success')}</p>}
      </form>
    </motion.section>
  );
}
```

### Related Documentation

- [API Endpoint: Create](../api/create-endpoint.md)
- [API Endpoint: Get](../api/get-endpoint.md)
- [Component: FormComponent](../components/FormComponent.md)
- [Model: ResourceModel](../models/ResourceModel.md)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2025-02-08 | Initial implementation |

### Quick Reference

**Key Files**:
- Frontend: `client/src/components/FeatureComponent.jsx`
- Backend: `server/routes/feature.js`, `server/controllers/featureController.js`
- Database: `server/models/Model.js`
- Translations: `client/src/i18n/locales/{en,he}/translation.json`

**Quick Start for Developers**:
1. Check [ComponentName](../components/ComponentName.md) for UI
2. Review [Endpoint](../api/endpoint.md) for API
3. Study [Model](../models/ModelName.md) for data structure
4. Test via [Test scenario](#test-scenario)

---

**Last updated**: 2025-02-08
**Documented by**: [Your name]
**Maintained by**: [Team/person responsible]
