# Contact Component - Phase 1: Infrastructure & Translations Setup

## Phase Overview
**Duration**: ~30 minutes  
**Risk Level**: Low  
**Dependencies**: None  
**Status**: ✅ COMPLETED (Nov 17, 2025)

---

## Objectives
1. Install required npm package (@emailjs/browser)
2. Update English translation file with all contact keys
3. Update Hebrew translation file with all contact keys
4. Verify existing dependencies are compatible

---

## Task 1: Install EmailJS Package

### Action:
```powershell
cd client
npm install @emailjs/browser
```

### Verification:
- Check `client/package.json` includes `"@emailjs/browser": "^4.x.x"` in dependencies

### Notes:
- Using `@emailjs/browser` (not `emailjs-com`) as it's the modern package
- ESM compatible (important for Vite)

---

## Task 2: Update English Translations

### File: `client/src/i18n/locales/en/translation.json`

### Current State:
```json
{
  "contact": {
    "title": "Get in Touch",
    "info": "Contact Information",
    "form": {
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "send": "Send Message"
    }
  }
}
```

### Required State:
```json
{
  "contact": {
    "title": "Contact Us",
    "subtitle": "We'd love to hear from you",
    "photographerName": "Sarah Cohen",
    "info": {
      "phone": "Phone",
      "email": "Email"
    },
    "form": {
      "name": "Full Name",
      "phone": "Phone",
      "email": "Email",
      "type": "Inquiry Type",
      "message": "Message",
      "submit": "Send Message",
      "types": {
        "general": "General Question",
        "pricing": "Pricing Inquiry",
        "booking": "Book a Session",
        "other": "Other"
      },
      "placeholders": {
        "name": "Enter your full name",
        "phone": "Enter your phone number",
        "email": "Enter your email address",
        "message": "Tell us what you'd like to know...",
        "selectType": "Select inquiry type"
      },
      "validation": {
        "required": "This field is required",
        "invalidEmail": "Please enter a valid email address"
      },
      "success": "Message sent successfully! We'll get back to you soon.",
      "error": "Failed to send message. Please try again or contact us directly.",
      "sending": "Sending..."
    }
  }
}
```

### Changes Summary:
- Expanded `contact.title` and added `subtitle`
- Added `photographerName`
- Restructured `info` to object with `phone` and `email`
- Added `phone` field to form
- Added `type` dropdown with 4 options
- Added `placeholders` for all inputs
- Added `validation` messages
- Added `success`, `error`, and `sending` states
- Changed `send` to `submit`

---

## Task 3: Update Hebrew Translations

### File: `client/src/i18n/locales/he/translation.json`

### Current State:
```json
{
  "contact": {
    "title": "צור קשר",
    "info": "פרטי התקשרות",
    "form": {
      "name": "שם",
      "email": "אימייל",
      "message": "הודעה",
      "send": "שלח הודעה"
    }
  }
}
```

### Required State:
```json
{
  "contact": {
    "title": "צור קשר",
    "subtitle": "נשמח לשמוע ממך",
    "photographerName": "שרה כהן",
    "info": {
      "phone": "טלפון",
      "email": "אימייל"
    },
    "form": {
      "name": "שם מלא",
      "phone": "טלפון",
      "email": "אימייל",
      "type": "סוג הפנייה",
      "message": "הודעה",
      "submit": "שלח הודעה",
      "types": {
        "general": "שאלה כללית",
        "pricing": "פרטי מחירים",
        "booking": "הזמנת צילום",
        "other": "אחר"
      },
      "placeholders": {
        "name": "הכנס את שמך המלא",
        "phone": "הכנס מספר טלפון",
        "email": "הכנס כתובת אימייל",
        "message": "ספר לנו במה נוכל לעזור...",
        "selectType": "בחר סוג פנייה"
      },
      "validation": {
        "required": "שדה זה הינו חובה",
        "invalidEmail": "אנא הכנס כתובת אימייל תקינה"
      },
      "success": "ההודעה נשלחה בהצלחה! ניצור איתך קשר בקרוב.",
      "error": "השליחה נכשלה. אנא נסה שוב או צור קשר ישירות.",
      "sending": "שולח..."
    }
  }
}
```

### Changes Summary:
- Same structure as English
- All strings properly translated to Hebrew
- Maintains same key structure for consistency

---

## Task 4: Verify Existing Dependencies

### Check `client/package.json` for:
- ✅ `framer-motion` - Already installed (^12.23.24)
- ✅ `react-i18next` - Already installed (^16.3.3)
- ✅ `i18next` - Already installed (^25.6.2)
- ⚠️ `lucide-react` - **Need to verify/install**

### Action if lucide-react is missing:
```powershell
cd client
npm install lucide-react
```

---

## Verification Checklist

After completing all tasks:

- [x] `@emailjs/browser` appears in `client/package.json` dependencies (v4.4.1)
- [x] `lucide-react` appears in `client/package.json` dependencies
- [x] `client/src/i18n/locales/en/translation.json` has complete contact section
- [x] `client/src/i18n/locales/he/translation.json` has complete contact section
- [x] Both translation files have identical key structure
- [x] All Hebrew text is proper Hebrew (no English in HE file)
- [x] All English text is proper English (no Hebrew in EN file)
- [x] JSON files are valid (no trailing commas, proper quotes)
- [x] Client runs successfully (port 3001)
- [x] Server runs successfully (port 5000)

---

## Expected Outcome

After Phase 1:
- ✅ All npm packages installed successfully
- ✅ Translation infrastructure ready for component
- ✅ No code changes yet (only config/translations)
- ✅ Project verified working (no breaking changes)

---

## Next Phase

✅ **Phase 1 COMPLETED** - Ready to proceed!  
📄 **Phase 2**: `Contact-Phase2-Component.md`
