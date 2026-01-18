# Contact Component - Master Planning Document

## Project Overview
Implementation of a bilingual Contact component with EmailJS integration for a kids photography website.

---

## Phase Division

### **Phase 1: Infrastructure & Translations Setup**
📄 **Planning File**: `client/Tasks/Contact-Phase1-Infrastructure.md`
- **Duration**: ~30 minutes
- **Risk Level**: Low
- **Dependencies**: None

**Scope:**
- Install EmailJS package
- Create and update translation files (EN/HE)
- Verify existing dependencies

---

### **Phase 2: Component Development & Integration**
📄 **Planning File**: `client/Tasks/Contact-Phase2-Component.md`
- **Duration**: ~1.5-2 hours
- **Risk Level**: Medium
- **Dependencies**: Phase 1 completion

**Scope:**
- Build Contact.jsx component
- Implement form logic and validation
- Integrate EmailJS
- Add to Home.jsx
- Update Navbar with contact link

---

## Implementation Order

```
1. Phase 1 (Infrastructure) ✅ COMPLETED
   ├── ✅ Install @emailjs/browser (v4.4.1)
   ├── ✅ Install lucide-react
   ├── ✅ Update client/src/i18n/locales/en/translation.json
   └── ✅ Update client/src/i18n/locales/he/translation.json

2. Phase 2 (Component) ✅ COMPLETED
   ├── ✅ Create Contact.jsx
   ├── ✅ Implement state management
   ├── ✅ Build UI (info + form)
   ├── ✅ Add validations
   ├── ✅ Integrate EmailJS
   ├── ✅ Add animations
   ├── ✅ Import in client/src/pages/Home.jsx
   └── ✅ Add nav link in Navbar.jsx (already existed)
```

---

## Critical Requirements

### Must Follow:
- ✅ **NO Hebrew in code** - Only in `he/translation.json`
- ✅ **ESM imports** - Client uses `import`, not `require`
- ✅ **Both languages** - Every UI string in both EN and HE
- ✅ **RTL Support** - Component works in Hebrew RTL mode
- ✅ **Framer Motion** - All animations per spec

### Testing Checklist:
- [ ] Responsive layout (mobile/tablet/desktop)
- [ ] RTL (Hebrew) and LTR (English) both functional
- [ ] Form validation working
- [ ] EmailJS integration (with placeholder credentials initially)
- [ ] Animations smooth
- [ ] All text from translation files
- [ ] Navigation link works
- [ ] Accessibility (labels, focus states)

---

## Files to Create/Modify

### New Files:
1. `client/src/components/Contact.jsx` - Main component

### Modified Files:
1. `client/src/i18n/locales/en/translation.json` - Add contact translations
2. `client/src/i18n/locales/he/translation.json` - Add contact translations
3. `client/src/pages/Home.jsx` - Import and add Contact component
4. `client/src/components/Navbar.jsx` - Add contact navigation link
5. `client/package.json` - Add @emailjs/browser dependency

---

## Phase Planning Files

### 📄 Phase 1: `client/Tasks/Contact-Phase1-Infrastructure.md`
Complete infrastructure setup including dependencies and translations.

### 📄 Phase 2: `client/Tasks/Contact-Phase2-Component.md`
Full component development, integration, and testing.

---

## Next Steps

1. ✅ Review this master plan
2. ✅ **Phase 1 COMPLETED** - Infrastructure setup done (Nov 17, 2025)
3. ✅ Phase 1 tasks completed successfully
4. ➡️ **CURRENT**: Proceed to **Phase 2** - Open `Contact-Phase2-Component.md`
5. Complete Phase 2 tasks
6. Final testing across both languages

---

## Notes
- EmailJS credentials will be placeholders initially (TODO comments)
- Can configure real EmailJS account after component is working
- Contact info (name, phone, email) is currently hardcoded as per spec
- Form sends to EmailJS, no backend storage
