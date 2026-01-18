// Example Gallery items with real images
// Copy this and replace the galleryItems in Gallery.jsx

const galleryItems = [
  // Kids Category
  {
    id: 1,
    category: 'kids',
    title: 'Happy Kids',
    image: '/src/assets/gallery/kids-1.jpg',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 2,
    category: 'kids',
    title: 'Playful Moments',
    image: '/src/assets/gallery/kids-2.jpg',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 3,
    category: 'kids',
    title: 'Joyful Times',
    image: '/src/assets/gallery/kids-3.jpg',
    gradient: 'from-green-500 to-emerald-500'
  },

  // Family Category
  {
    id: 4,
    category: 'family',
    title: 'Family Moments',
    image: '/src/assets/gallery/family-1.jpg',
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    id: 5,
    category: 'family',
    title: 'Together Forever',
    image: '/src/assets/gallery/family-2.jpg',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 6,
    category: 'family',
    title: 'Family Love',
    image: '/src/assets/gallery/family-3.jpg',
    gradient: 'from-orange-500 to-red-500'
  },

  // Newborn Category
  {
    id: 7,
    category: 'newborn',
    title: 'Newborn Bliss',
    image: '/src/assets/gallery/newborn-1.jpg',
    gradient: 'from-yellow-400 to-orange-400'
  },
  {
    id: 8,
    category: 'newborn',
    title: 'Sweet Dreams',
    image: '/src/assets/gallery/newborn-2.jpg',
    gradient: 'from-pink-400 to-rose-400'
  },

  // Toddler Category
  {
    id: 9,
    category: 'toddler',
    title: 'Little Explorers',
    image: '/src/assets/gallery/toddler-1.jpg',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 10,
    category: 'toddler',
    title: 'Curious Minds',
    image: '/src/assets/gallery/toddler-2.jpg',
    gradient: 'from-blue-500 to-cyan-500'
  },
];

/*
  How to use:

  1. Save your images to: client/src/assets/gallery/
  2. Name them according to this pattern:
     - kids-1.jpg, kids-2.jpg, kids-3.jpg
     - family-1.jpg, family-2.jpg, family-3.jpg
     - newborn-1.jpg, newborn-2.jpg
     - toddler-1.jpg, toddler-2.jpg

  3. Open Gallery.jsx and replace the galleryItems array with this code
  4. Refresh your browser to see the images

  To add more images:
  - Add more objects to the array
  - Follow the same pattern
  - Change the 'title' and 'image' paths
  - Keep the 'gradient' color or change it

  Available gradients:
  - from-amber-500 to-orange-500
  - from-rose-500 to-pink-500
  - from-yellow-400 to-orange-400
  - from-cyan-500 to-blue-500
  - from-purple-500 to-pink-500
  - from-emerald-500 to-teal-500
  - from-orange-500 to-red-500
  - from-pink-400 to-rose-400
  - from-blue-500 to-cyan-500
*/
