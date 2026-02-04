# Project Conventions & Standards

## Code Standards (Required)

All code in this project must follow these standards:

- **Language**: All code, comments, variable names, function names, and documentation MUST be in English only
- **No Hebrew**: No Hebrew text allowed in any code files or comments
- **No Emojis**: No emojis in code, comments, or commit messages
- **File Naming**: Use PascalCase for components (e.g., `BookingForm.jsx`, `Gallery.jsx`)

## Component Structure

### File Organization

```
client/src/components/
├── ComponentName.jsx           # Main component file
├── AnotherComponent.jsx
└── ...
```

### Component Template

```javascript
import { useTranslation } from 'react-i18next';
import { SomeIcon } from 'lucide-react';

/**
 * ComponentName - Clear description of component purpose
 */
function ComponentName() {
  const { t } = useTranslation();

  // State and hooks here

  // Event handlers here

  return (
    // JSX here
  );
}

export default ComponentName;
```

## Styling Guidelines

### Tailwind CSS v4

All styling should use Tailwind CSS utility classes:

```javascript
// Good
<div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
  Button
</div>

// Avoid
<div style={{ backgroundColor: 'blue', color: 'white' }}>
  Button
</div>
```

### Responsive Design

Use Tailwind breakpoints for responsive layouts:

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Common Tailwind Patterns

**Container and Spacing:**
```javascript
<div className="container mx-auto px-4 py-8">
  {/* Content */}
</div>
```

**Buttons:**
```javascript
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
  Click me
</button>
```

**Cards:**
```javascript
<div className="bg-white rounded-lg shadow-md p-6">
  {/* Card content */}
</div>
```

**Text Styling:**
```javascript
<h1 className="text-4xl font-bold">Heading</h1>
<h2 className="text-2xl font-semibold">Subheading</h2>
<p className="text-gray-700 leading-relaxed">Body text</p>
```

## Hook Usage

### useTranslation

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  // t() translates keys
  // i18n.language gives current language ('he' or 'en')
  // i18n.changeLanguage(lang) changes language
}
```

### useState

```javascript
import { useState } from 'react';

const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });
```

### useEffect

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // Side effects here

  return () => {
    // Cleanup here (optional)
  };
}, [dependencies]); // Add dependencies as needed
```

## Icons (Lucide React)

### Common Icons Used

```javascript
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Search,
  Star,
  Camera,
  Image,
  User,
  LogOut,
} from 'lucide-react';

// Usage
<Menu className="w-6 h-6 text-gray-800" />
```

### Icon Sizing

```javascript
// Small
<Icon className="w-4 h-4" />

// Medium (common)
<Icon className="w-6 h-6" />

// Large
<Icon className="w-8 h-8" />
```

## Animations (Framer Motion)

### Basic Fade Animation

```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Staggered Container

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

## Common Component Types

### Presentational Component

Simple component that receives props and renders UI:

```javascript
function Button({ children, onClick, variant = 'primary' }) {
  const baseStyles = 'px-4 py-2 rounded-lg transition-colors';
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
```

### Container Component

Component that manages state and passes data to presentational components:

```javascript
function BookingForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form UI */}
    </form>
  );
}
```

### Feature Component

Larger component combining multiple smaller components:

```javascript
function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="container mx-auto">
      <GalleryHeader />
      <CategoryFilter onChange={setSelectedCategory} />
      <GalleryGrid category={selectedCategory} />
    </div>
  );
}
```

## State Management

For simple state, use `useState`:

```javascript
const [isOpen, setIsOpen] = useState(false);
setIsOpen(!isOpen);
```

For related state, use a single object:

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
});

setFormData(prev => ({
  ...prev,
  name: 'John',
}));
```

## Error Handling

```javascript
const [error, setError] = useState(null);

try {
  const response = await fetch('/api/bookings');
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
} catch (err) {
  setError(err.message);
}

{error && (
  <div className="text-red-600 bg-red-50 p-4 rounded">
    {error}
  </div>
)}
```

## API Integration

API calls should be made to `/api/*` endpoints (proxied to `http://localhost:5000`):

```javascript
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## Testing Components Locally

1. Start the development server: `npm run dev` (from client directory)
2. Component will automatically reload when files are saved
3. Check browser console for any errors
4. Verify translations appear correctly for both languages
5. Test RTL/LTR layout switching via language toggle
