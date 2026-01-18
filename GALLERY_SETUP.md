# Gallery Setup Instructions

## How to Add Your Photos

### Step 1: Download Images from Google Drive
Download your photos from: https://drive.google.com/drive/folders/1QlrpDy4-vvzVBoZAgy0vZ_8Sif9yvUfh

### Step 2: Organize Images by Category
Copy your downloaded images into: `client/src/assets/gallery/`

Follow this naming convention:
- Kids photos: `kids-1.jpg`, `kids-2.jpg`, `kids-3.jpg`, etc.
- Family photos: `family-1.jpg`, `family-2.jpg`, etc.
- Newborn photos: `newborn-1.jpg`, `newborn-2.jpg`, etc.
- Toddler photos: `toddler-1.jpg`, `toddler-2.jpg`, etc.

### Step 3: Update Gallery Component
Edit `client/src/components/Gallery.jsx` and update the `galleryItems` array:

Example:
```javascript
const galleryItems = [
  {
    id: 1,
    category: 'kids',
    title: 'Happy Kids',
    image: '/src/assets/gallery/kids-1.jpg',  // Reference your image file
    gradient: 'from-amber-500 to-orange-500'
  },
  // Add more items following this pattern
];
```

### Step 4: Supported Image Formats
- JPG (.jpg)
- PNG (.png)
- WebP (.webp)

### Step 5: Image Specifications
- Recommended: Square or slightly landscape format (800x600px or similar)
- The component will blur and overlay them, so sharp detail isn't critical
- Suggested file size: 200KB - 1MB per image for optimal loading

### Step 6: Testing
1. Save your images to the correct folder
2. Update the Gallery component with the correct file paths
3. Refresh your browser to see the changes
4. Use the category filter buttons to test different categories

### File Structure
```
client/
├── src/
│   ├── assets/
│   │   └── gallery/          ← Add your images here
│   │       ├── kids-1.jpg
│   │       ├── kids-2.jpg
│   │       ├── family-1.jpg
│   │       └── ...
│   └── components/
│       └── Gallery.jsx       ← Update with your image paths
```
