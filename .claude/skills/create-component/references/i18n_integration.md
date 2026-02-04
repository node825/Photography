# i18n Integration Guide

## Overview

The Kids Photography Website uses i18next for bilingual (Hebrew/English) support. All user-facing text should be externalized to translation files rather than hardcoded.

## Translation File Structure

Translation files are located in:
- English: `client/src/i18n/locales/en/translation.json`
- Hebrew: `client/src/i18n/locales/he/translation.json`

## Adding New Translation Keys

When creating a component that needs bilingual text, follow these steps:

### 1. Define Keys in English Translation File

`client/src/i18n/locales/en/translation.json`:
```json
{
  "components": {
    "myComponent": {
      "title": "My Component Title",
      "description": "A description of my component",
      "buttons": {
        "submit": "Submit",
        "cancel": "Cancel"
      },
      "messages": {
        "success": "Operation completed successfully",
        "error": "An error occurred"
      }
    }
  }
}
```

### 2. Add Corresponding Hebrew Translations

`client/src/i18n/locales/he/translation.json`:
```json
{
  "components": {
    "myComponent": {
      "title": "כותרת הרכיב שלי",
      "description": "תיאור של הרכיב שלי",
      "buttons": {
        "submit": "שלח",
        "cancel": "ביטול"
      },
      "messages": {
        "success": "הפעולה הושלמה בהצלחה",
        "error": "אירעה שגיאה"
      }
    }
  }
}
```

### 3. Use in Component

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('components.myComponent.title')}</h2>
      <p>{t('components.myComponent.description')}</p>
      <button>{t('components.myComponent.buttons.submit')}</button>
    </div>
  );
}
```

## Best Practices

1. **Use Nested Keys** - Organize translations hierarchically by feature/component
2. **Consistent Naming** - Use descriptive, snake_case keys
3. **Keep Keys Sync'd** - Always add keys to both English and Hebrew files
4. **No Hardcoded Text** - Never hardcode user-facing strings in JSX
5. **Language Toggle** - Users switch languages via Navbar; all text automatically updates

## Accessing Language Information

In components, access language info via the `useTranslation()` hook:

```javascript
const { t, i18n } = useTranslation();

// Current language code
console.log(i18n.language); // 'he' or 'en'

// Check if RTL
const isRTL = i18n.language === 'he';
```

## RTL/LTR Handling

The app automatically sets `document.documentElement.dir` based on the selected language:
- Hebrew ('he') = RTL (right-to-left)
- English ('en') = LTR (left-to-right)

For component-specific direction handling:

```javascript
const { i18n } = useTranslation();
const isRTL = i18n.language === 'he';

<div dir={isRTL ? 'rtl' : 'ltr'}>
  {/* Component content */}
</div>
```

## Common Translation Patterns

### Buttons and Actions
```json
"buttons": {
  "submit": "Submit",
  "cancel": "Cancel",
  "delete": "Delete",
  "edit": "Edit",
  "save": "Save"
}
```

### Form Labels and Placeholders
```json
"form": {
  "labels": {
    "email": "Email",
    "name": "Full Name"
  },
  "placeholders": {
    "enterEmail": "Enter your email address",
    "enterName": "Enter your full name"
  }
}
```

### Messages and Alerts
```json
"messages": {
  "success": "Operation completed successfully",
  "error": "An error occurred",
  "loading": "Loading...",
  "noData": "No data available"
}
```

### Navigation and Headers
```json
"navigation": {
  "home": "Home",
  "gallery": "Gallery",
  "about": "About",
  "contact": "Contact"
}
```
