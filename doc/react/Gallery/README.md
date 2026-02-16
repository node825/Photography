# Gallery Component

## Overview

The `Gallery` component displays a filterable photography portfolio organized by session type. It showcases images from five categories: First Birthday (גיל שנה), Haircut Ceremony (חאלקה), Outdoor (חוץ), Products (מוצרים), and Studio (סטודיו).

**Location:** [client/src/components/Gallery.jsx](../../../client/src/components/Gallery.jsx)

## Purpose

- Display photography portfolio with categorized images
- Allow users to filter gallery by session type
- Create engaging visual experience with animations and hover effects
- Support bilingual interface (Hebrew/English)

## Component Props

This is a **self-contained component** with no props required.

```jsx
<Gallery />
```

## Key Features

### 1. **Category Filtering**
- Filter buttons for each category: "All" (הכל), "First Birthday" (גיל שנה), "Haircut" (חאלקה), "Outdoor" (חוץ), "Products" (מוצרים), "Studio" (סטודיו)
- Clicking a category shows only images from that session type
- "All" displays all categories sequentially
- Active button highlighted with gold background (`bg-primary`)

### 2. **Responsive Grid Layout**
- **Mobile:** 2 columns (`grid-cols-2`)
- **Tablet:** 3 columns (`md:grid-cols-3`)
- **Desktop:** 4 columns (`lg:grid-cols-4`)
- Consistent 6px gap between images

### 3. **Animations (Framer Motion)**
- **Section entrance:** Title and filters fade in and slide up
- **Image entrance:** Images scale up and fade in with staggered delay (0.1s between each)
- **Hover effect:** Images lift up (`y: -8`) and scale up (`scale-110`)
- **Golden border:** Appears on hover with smooth opacity transition

### 4. **Visual Polish**
- Aspect square image containers with rounded corners (`rounded-xl`)
- Dark overlay on hover (`bg-black/30`)
- Golden border accent on hover (`border-2 border-primary`)
- Background gradient orbs for depth
- Category divider lines (golden)

### 5. **Bilingual Support**
- Hebrew titles for categories and images
- Component uses i18n translation system (though currently hardcoded Hebrew text)
- RTL layout handled automatically by i18n

## Usage Example

```jsx
// In Home.jsx or parent component
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <>
      <Hero />
      <Gallery />
      <Booking />
      <Contact />
    </>
  );
}
```

## Gallery Data Structure

The component manages gallery images in `galleryData` object with the following structure:

```jsx
galleryData = {
  year: {
    title: 'גיל שנה',                    // Category title (Hebrew)
    gradient: 'from-amber-500 to-orange-500', // Gradient for styling
    images: [                            // Array of image paths
      '/src/assets/gallery/גיל שנה/IMG_1383 copy.jpg',
      // ...more images
    ]
  },
  // ...other categories (family, outdoor, products, studio)
}
```

### Current Categories

| Key | Hebrew Title | Images | Gradient |
|-----|-------------|--------|----------|
| `year` | גיל שנה | 4 images | Amber to Orange |
| `family` | חאלקה | 4 images | Rose to Pink |
| `outdoor` | חוץ | 4 images | Yellow to Orange |
| `products` | מוצרים | 4 images | Cyan to Blue |
| `studio` | סטודיו | 4 images | Purple to Pink |

## Styling & Colors

Uses Tailwind CSS with custom theme colors from [tailwind.config.js](../../../client/tailwind.config.js):

- **Primary** (`text-primary`, `bg-primary`): Gold (`#D4AF37`)
- **Secondary**: Accent gold (`#DAA520`)
- **Background** (`bg-background`): Dark (`#0F0F0F`)
- **Text**: Light gray (`text-textLight`)

## State Management

```jsx
const [selectedCategory, setSelectedCategory] = useState('all');
```

- Tracked category filter state
- Updates when filter buttons clicked
- Controls which categories are displayed

## Dependencies

- **Framer Motion:** Scroll animations, hover effects, entrance transitions
- **react-i18next:** Internationalization (ready for translation integration)
- **Tailwind CSS:** Styling and responsive layout

## Adding New Images

To add images to the gallery:

1. **Place image** in appropriate folder:
   - `client/src/assets/gallery/גיל שנה/` - First Birthday
   - `client/src/assets/gallery/חאלקה/` - Haircut Ceremony
   - `client/src/assets/gallery/חוץ/` - Outdoor
   - `client/src/assets/gallery/מוצרים/` - Products
   - `client/src/assets/gallery/סטודיו/` - Studio

2. **Update galleryData** object with image path:
   ```jsx
   year: {
     title: 'גיל שנה',
     gradient: 'from-amber-500 to-orange-500',
     images: [
       // ...existing images
       '/src/assets/gallery/גיל שנה/new-image.jpg' // Add here
     ]
   }
   ```

## Accessibility Notes

- Images have descriptive alt text (`${category.title} ${index + 1}`)
- Semantic HTML structure with `<section>` wrapper
- Proper heading hierarchy (h2 main title, h3 category titles)
- Focus states handled by button animations

## Technical Notes

- Gallery section has anchor ID `id="gallery"` for navigation
- Background decorative elements use `pointer-events-none` to not interfere with interactions
- Image loading uses relative paths (adjust if moved)
- Component uses viewport detection (`whileInView`) for scroll animations

## Related Components

- [Booking Component](../Booking/README.md) - Booking form section
- [Hero Component](../Hero/README.md) - Main banner
- [Contact Component](../Contact/README.md) - Contact section
