# Gallery Component

## Overview

The Gallery component is a photo showcase section that displays categorized photography work with filtering capabilities, smooth animations, and responsive grid layouts. It serves as the main portfolio display for the Kids Photography Website.

**Location:** `client/src/components/Gallery.jsx`

## Features

- **Category Filtering**: Interactive filter buttons to view all photos or filter by specific category
- **Responsive Grid Layout**: Adapts from 2 columns (mobile) to 4 columns (desktop)
- **Smooth Animations**: Powered by Framer Motion for entrance, hover, and transition effects
- **Image Hover Effects**: Scale-up on hover with overlay and golden border
- **Bilingual Support**: Text labels hardcoded in Hebrew (to be migrated to i18n)
- **View-based Animations**: Elements animate into view as user scrolls

## Component Structure

### State

```javascript
const [selectedCategory, setSelectedCategory] = useState('all');
```

Tracks the currently active filter category. Default is 'all' to show all photos.

### Gallery Data Structure

The component uses a hardcoded `galleryData` object with the following structure:

```javascript
const galleryData = {
  [categoryKey]: {
    title: string,      // Display name in Hebrew
    gradient: string,   // Tailwind gradient classes (currently unused)
    images: string[]    // Array of image paths
  }
}
```

**Available Categories:**
- `year` - גיל שנה (One Year Old)
- `family` - חאלקה (Chalaka ceremony)
- `outdoor` - חוץ (Outdoor)
- `products` - מוצרים (Products)
- `studio` - סטודיו (Studio)

Each category contains 4 sample images.

### Category Filter Configuration

```javascript
const categories = [
  { id: 'all', label: 'הכל' },
  { id: 'year', label: 'גיל שנה' },
  { id: 'family', label: 'חאלקה' },
  { id: 'outdoor', label: 'חוץ' },
  { id: 'products', label: 'מוצרים' },
  { id: 'studio', label: 'סטודיו' },
];
```

## Image Paths

Images are currently referenced with `/src/assets/gallery/[category]/[filename]` format. This path structure assumes:
- Images are stored in `client/src/assets/gallery/`
- Each category has its own subdirectory
- Hebrew directory names match the category names

**Example:** `/src/assets/gallery/גיל שנה/IMG_1383 copy.jpg`

## Animations

### Section Entrance
- Title and subtitle fade in from bottom with 0.6s duration
- Category buttons appear with slight delay (0.1s)

### Category Sections
- Each category section fades in and slides up when entering viewport
- Individual images have staggered entrance (0.1s delay multiplied by index)
- Images start at 90% scale and animate to 100%

### Hover Effects
- **Image Scale**: Images scale to 110% on hover (0.5s duration)
- **Lift Effect**: Cards lift up 8px on hover
- **Overlay**: Black overlay fades in (0% to 30% opacity)
- **Golden Border**: 2px primary color border appears on hover

## Layout

### Grid System
- **Mobile (default)**: 2 columns
- **Tablet (md breakpoint)**: 3 columns
- **Desktop (lg breakpoint)**: 4 columns
- **Gap**: 1.5rem (24px) between images
- **Aspect Ratio**: All images display as perfect squares

### Container
- Max width: 1152px (max-w-6xl)
- Centered with auto margins
- 24px horizontal padding
- 96px vertical padding (py-24)

### Spacing
- 64px margin between title and filters (mb-16)
- 64px margin between filters and gallery (mb-16)
- 96px spacing between category sections (space-y-24)
- 32px spacing within each category section (space-y-8)

## Styling

### Background
- Base: `bg-background` from Tailwind config
- Decorative blurred circles for depth:
  - Top-left: 384px primary-colored blur
  - Bottom-right: 320px secondary-colored blur

### Typography
- Main title: 3xl on mobile, 5xl on desktop, uses font-heading
- Section subtitles: 3xl on mobile, 4xl on desktop
- Category titles include underline accent (16px wide, 4px high, primary color)

### Filter Buttons
- Active: Primary background with shadow
- Inactive: Medium gray with hover effect to light gray
- Rounded full (pill shape)
- 24px horizontal padding, 8px vertical padding

## Integration Points

### i18n Status
Currently, gallery text is hardcoded in Hebrew. The component does import `useTranslation` from react-i18next but doesn't use it.

**Future Enhancement**: Migrate all Hebrew labels to translation keys:
- Gallery title: "הגלריה שלנו"
- Subtitle: "אוסף של רגעים יפים"
- Category labels in `categories` array

### Navigation
The section has `id="gallery"` for anchor navigation from the navbar's gallery link.

## Usage Example

```jsx
import Gallery from './components/Gallery';

function Home() {
  return (
    <div>
      {/* Other sections */}
      <Gallery />
      {/* Other sections */}
    </div>
  );
}
```

The Gallery component is entirely self-contained with no props or external dependencies beyond styling and animation libraries.

## Dependencies

- **framer-motion**: Animation library
  - `motion` components for animated elements
  - `whileInView` for scroll-triggered animations
  - `whileHover` for hover interactions
- **react**: `useState` hook for category filter state
- **react-i18next**: `useTranslation` hook (currently unused)

## Customization Guide

### Adding a New Category

1. Add the category to `galleryData`:
```javascript
newCategory: {
  title: 'קטגוריה חדשה',
  gradient: 'from-color-500 to-color-600',
  images: [
    '/src/assets/gallery/new-category/image1.jpg',
    // Add more images
  ]
}
```

2. Add the filter button to `categories`:
```javascript
{ id: 'newCategory', label: 'קטגוריה חדשה' }
```

3. Create the corresponding directory and add images:
```
client/src/assets/gallery/new-category/
```

### Changing Grid Layout

Modify the grid classes in the images container:
```javascript
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
```

### Adjusting Animation Timing

- **Entrance duration**: Modify `duration` in `transition` props
- **Stagger delay**: Change `delay: index * 0.1` multiplier
- **Hover speed**: Adjust `transition-transform duration-500` on images

## Known Issues / Future Improvements

1. **Hardcoded Hebrew text**: Should be migrated to i18n translation keys
2. **Static image paths**: Consider dynamic imports or CMS integration
3. **No image lazy loading**: Large galleries could benefit from lazy loading
4. **Missing alt text internationalization**: Alt text is constructed from Hebrew titles
5. **Gradient property unused**: Each category defines a gradient class that isn't applied anywhere
6. **No lightbox/modal**: Clicking images doesn't open a larger view (see GalleryClickModal docs)

## Performance Considerations

- Images load all at once (no lazy loading)
- Framer Motion animations use GPU-accelerated transforms
- `viewport={{ once: true }}` prevents re-animating on scroll up
- Images use `object-cover` which may crop content to fit square aspect ratio

## Accessibility Notes

- Images have descriptive alt text: `${category.title} ${index + 1}`
- Filter buttons are semantic `<button>` elements
- Keyboard navigation works on filter buttons
- Consider adding ARIA labels for better screen reader support
- Consider adding focus visible styles for keyboard navigation

## Related Components

- **GalleryClickModal**: Future component for full-size image viewing
- **ImageLightbox**: Future component for image gallery overlay
