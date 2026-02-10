# Calendar Time Picker Feature - תכנון מלא

**תאריך**: פברואר 2026  
**סטטוס**: תכנון  
**שם הפיצ'ר**: Calendar Time Picker Component

---

## 📋 סקירה כללית

הוספת קומפוננט שנה (Calendar) עם בחירת שעות לשיפור חוויית ההזמנה של צילומים. בدל בחירה ידנית של תאריך, לקוח יוכל:
- להציג קלנדר חודשי/שבועי
- לראות זמנים זמינים/תפוסים
- לבחור שעה ספציפית לצילום

---

## 🏗️ ארכיטקטורה

### Backend - שינויים דרושים

#### 1. **ממודל Booking**
```
הוסף שדות:
- preferredTime (Time): השעה (לא רק התאריך)
- duration (Number): אורך הצילום (בדקות)
- slotId (String, optional): זיהוי חריץ זמן ייחודי
```

#### 2. **כנל ג'סון בהרכב זמנים**
יצור `availability.json` בשרת:
```json
{
  "defaultHours": {
    "start": "09:00",
    "end": "18:00"
  },
  "slotDuration": 30,
  "daysOff": ["Saturday", "Sunday"],
  "exceptions": [
    {
      "date": "2026-02-14",
      "unavailable": true,
      "reason": "תחזוקה"
    }
  ]
}
```

#### 3. **את"פ חדש: /api/availability**
```
GET /api/availability?date=YYYY-MM-DD&sessionType=newborn
תשובה:
{
  "success": true,
  "data": {
    "date": "2026-02-15",
    "slots": [
      { "id": "slot-1", "time": "09:00", "available": true },
      { "id": "slot-2", "time": "09:30", "available": true },
      { "id": "slot-3", "time": "10:00", "available": false }
    ]
  }
}
```

#### 4. **עדכון Booking Controller**
- אימות כי השעה המבוקשת זמינה
- שמירת `preferredTime` ו-`duration`
- בדיקת כפילויות בזמן נבחר (לא רק בתאריך)

---

### Frontend - קומפוננטים חדשים

#### 1. **CalendarTimePicker.jsx** (קומפוננט חדש)
```
מקום: client/src/components/CalendarTimePicker.jsx
משימות:
- תצוגה של קלנדר (חודשי)
- בחירת יום
- הצגת זמנים זמינים/תפוסים
- בחירת שעה מדויקת
- עדכון parent component עם בחירה
```

**Props:**
```javascript
{
  selectedDate,              // תאריך נבחר
  selectedTime,              // שעה נבחרת
  sessionType,               // סוג הצילום (newborn/kids/etc)
  onDateChange,              // callback
  onTimeChange,              // callback
  onSlotsLoad                // callback עם הזמנים הזמינים
}
```

#### 2. **עדכון Order.jsx**
```
- החלף את <input type="date"> עם <CalendarTimePicker />
- עדכן את formData להכיל { preferredDate, preferredTime }
- אפקט לטעינת זמנים זמינים כשמשתנה sessionType
```

#### 3. **TimeSlotDisplay.jsx** (helper component)
```
תצוגה של חריצי הזמן הזמינים
- סטיילינג: זמינים בזהב, תפוסים בחום גבוה
- ריאקטיבי להורגן (hover states)
- Accessibility: keyboard navigation
```

---

## ⚙️ Flow טכני

### 1. **טעינת נתוני זמינות**

```javascript
// Order.jsx
useEffect(() => {
  if (!selectedDate || !sessionType) return;
  
  fetchAvailableSlots({
    date: selectedDate.toISOString().split('T')[0],
    sessionType
  })
    .then(data => setAvailableSlots(data))
    .catch(err => setError(err.message));
}, [selectedDate, sessionType]);
```

### 2. **בחירת זמן**

```javascript
const handleTimeSelect = (slotId, time) => {
  setFormData(prev => ({
    ...prev,
    preferredDate: selectedDate.toISOString(),
    preferredTime: time,
    slotId
  }));
};
```

### 3. **הגשת הטופס**

```javascript
// בשרת
const booking = await Booking.create({
  ...formData,
  preferredDate: new Date(formData.preferredDate),
  preferredTime: formData.preferredTime,
  duration: 60, // דברשן של 60 דקות
});
```

---

## 🎨 ממשק משתמש

### Home > Order Component > CalendarTimePicker

**תרחיש:**
1. לקוח בוחר סוג צילום (newborn, kids, etc)
2. מופיע קלנדר חודשי
3. לקוח בוחר יום בקלנדר
4. מתחתיו מופיעים זמנים זמינים ליום זה
5. לקוח בוחר שעה מסוימת
6. ממשיך בטופס ההזמנה

**סטיילינג:**
- ריקעון: `background: #0F0F0F`
- כפתורים זמינים: text-gold + border-gold
- כפתורים תפוסים: text-gray-500 + cursor-not-allowed
- בחיר: bg-primary text-black
- animation: subtle scale on hover (Framer Motion)
- RTL-friendly (Hebrew-compatible)

---

## 🗂️ מבנה קבצים חדשים

```
client/src/
├── components/
│   ├── CalendarTimePicker.jsx      (קומפוננט ראשי)
│   ├── TimeSlotDisplay.jsx         (עזר - תצוגת זמנים)
│   └── CalendarDay.jsx             (עזר - יום בודד בקלנדר)
├── utils/
│   └── calendarHelpers.js          (פונקציות - nav בקלנדר, ספרור, etc)
└── hooks/
    └── useAvailabilitySlots.js     (custom hook - fetching זמנים)

server/
├── config/
│   └── availability.json           (הגדרת שעות זמינות)
├── controllers/
│   ├── bookingController.js        (עדכון)
│   └── availabilityController.js   (חדש - API של זמנים)
└── routes/
    └── availability.js             (חדש - route /api/availability)
```

---

## 📝 Tasks

### Backend
- [ ] עדכן schema Booking (preferredTime, duration, slotId)
- [ ] צור availability.json
- [ ] ממשיך availabilityController.js עם לוגיקת בדיקת זמנים
- [ ] הוסף /api/availability route
- [ ] עדכן bookingController.js לאימות זמנים
- [ ] בדיקות: GET /api/availability עבור תאריכים שונים

### Frontend Components
- [ ] CalendarTimePicker.jsx (ראשי)
- [ ] TimeSlotDisplay.jsx (עזר)
- [ ] CalendarDay.jsx (עזר)
- [ ] עדכן Order.jsx להשתמש בCalendarTimePicker
- [ ] Styling עם Tailwind (gold/black theme)
- [ ] Framer Motion animations

### Utilities & Hooks
- [ ] calendarHelpers.js (getMonthDays, isToday, getPrevMonth, etc)
- [ ] useAvailabilitySlots custom hook
- [ ] טיפול ב-i18n (he/en)

### Testing & Validation
- [ ] בדקה zמימוש זמנים חופפים
- [ ] בדקה RTL layout
- [ ] בדקה responsive (mobile/tablet/desktop)
- [ ] בדקה timezone handling

---

## 🌍 i18n Integration

הוסף string לשתי השפות:

**he/translation.json:**
```json
{
  "calendar": {
    "title": "בחר תאריך ושעה",
    "selectDate": "בחר תאריך",
    "selectTime": "בחר שעה",
    "noSlots": "אין זמנים זמינים ביום זה",
    "booked": "תפוס",
    "prev": "חודש קודם",
    "next": "חודש הבא"
  }
}
```

**en/translation.json:**
```json
{
  "calendar": {
    "title": "Select Date & Time",
    "selectDate": "Pick a date",
    "selectTime": "Choose time slot",
    "noSlots": "No available slots for this date",
    "booked": "Booked",
    "prev": "Previous month",
    "next": "Next month"
  }
}
```

---

## 🎬 Animation Strategy

```javascript
// Calendar fade-in
const calendarVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  }
};

// Slots stagger
const slotsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Individual slot
const slotVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};
```

---

## 🔧 Details ממשי (במידה שיהיה צורך)

### Business Logic
- **Slot Duration**: 30/60 דקות (configurable)
- **Advance Booking**: לא להציג תאריכים שקרובים מדי (הנחה: 2 ימים מראש)
- **Break Between Sessions**: דקה או שתיים (optional)
- **Check for Overlaps**: compare booked slots בDB

### Performance
- Cache זמנים זמינים (5-10 דקות)
- Lazy load זמנים רק כשנבחר תאריך
- Debounce פרוקים של זמנים

---

## 📊 דוג'מאות

### דוג'מה 1: סוג שלא מתמלא
יום בקלנדר מראה בורקה (no background) → לקוח יודע שאין זמנים

### דוג'מה 2: סוג מתמלא
יום בקלנדר מחכור בורדר זהב → לקוח בוחר → מופיעות 5-8 זמנים

### דוג'מה 3: זמן תפוס
כפתור אדום/אפור עם `cursor-not-allowed` → לקוח בוחר אחר

---

## ✅ סדר מומלץ לביצוע

1. **Backend foundation**: schema + availability.json + controller
2. **API endpoint**: /api/availability עובד
3. **Frontend components**: CalendarTimePicker בנוי
4. **Integration**: Order.jsx משתמש בחדש
5. **Styling & Animation**: עיצוב סופי
6. **i18n**: Translations
7. **Testing**: בדיקות כוללות

---

## 📌 הערות

- הפיצ'ר משתלב לחלוטין עם ה-Order workflow הקיים
- אין שינויים לכנל "Contact Me" או דפים אחרים
- Keep it mobile-friendly (responsiveness חוזקת)
- Accessibility: ARIA labels, keyboard nav

