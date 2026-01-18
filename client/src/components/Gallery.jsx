import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Gallery data organized by category with multiple images
  const galleryData = {
    year: {
      title: 'גיל שנה',
      gradient: 'from-amber-500 to-orange-500',
      images: [
        '/src/assets/gallery/גיל שנה/IMG_1383 copy.jpg',
        '/src/assets/gallery/גיל שנה/גיל שנה (1).jpg',
        '/src/assets/gallery/גיל שנה/גיל שנה (12).jpg',
        '/src/assets/gallery/גיל שנה/גיל שנה (13).jpg',
      ]
    },
    family: {
      title: 'חאלקה',
      gradient: 'from-rose-500 to-pink-500',
      images: [
        '/src/assets/gallery/חאלקה/IMG_1331 copy.jpg',
        '/src/assets/gallery/חאלקה/IMG_1454 copy.jpg',
        '/src/assets/gallery/חאלקה/חאלקה (1).jpg',
        '/src/assets/gallery/חאלקה/חאלקה (11).jpg',
      ]
    },
    outdoor: {
      title: 'חוץ',
      gradient: 'from-yellow-400 to-orange-400',
      images: [
        '/src/assets/gallery/חוץ/IMG_7682 copy.jpg',
        '/src/assets/gallery/חוץ/חוץ (1).jpg',
        '/src/assets/gallery/חוץ/חוץ (10).jpg',
        '/src/assets/gallery/חוץ/חוץ (11).jpg',
      ]
    },
    products: {
      title: 'מוצרים',
      gradient: 'from-cyan-500 to-blue-500',
      images: [
        '/src/assets/gallery/מוצרים/IMG_3236 copy.jpg',
        '/src/assets/gallery/מוצרים/דובדבנים!!.jpg',
        '/src/assets/gallery/מוצרים/מזון.jpg',
        '/src/assets/gallery/מוצרים/שחמט.jpg',
      ]
    },
    studio: {
      title: 'סטודיו',
      gradient: 'from-purple-500 to-pink-500',
      images: [
        '/src/assets/gallery/סטודיו/סטודיו (1).jpg',
        '/src/assets/gallery/סטודיו/סטודיו (2).JPG',
        '/src/assets/gallery/סטודיו/סטודיו (3).jpg',
        '/src/assets/gallery/סטודיו/סטודיו (4).jpg',
      ]
    },
  };

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'year', label: 'גיל שנה' },
    { id: 'family', label: 'חאלקה' },
    { id: 'outdoor', label: 'חוץ' },
    { id: 'products', label: 'מוצרים' },
    { id: 'studio', label: 'סטודיו' },
  ];

  // Filter categories to show
  const visibleCategories = selectedCategory === 'all'
    ? Object.keys(galleryData)
    : [selectedCategory];

  return (
    <section id="gallery" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/3 rounded-full blur-3xl top-20 left-10"></div>
        <div className="absolute w-80 h-80 bg-secondary/3 rounded-full blur-3xl bottom-32 right-20"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
            הגלריה שלנו
          </h2>
          <p className="text-textLight text-lg">
            אוסף של רגעים יפים
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-background shadow-lg'
                  : 'bg-mediumGray text-primary hover:bg-lightGray'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Sections */}
        <div className="space-y-24">
          {visibleCategories.map((categoryKey) => {
            const category = galleryData[categoryKey];
            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Category Title */}
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                    {category.title}
                  </h3>
                  <div className="h-1 w-16 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Images Grid - 3-4 images per row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group relative overflow-hidden rounded-xl aspect-square"
                    >
                      {/* Image */}
                      <motion.img
                        src={image}
                        alt={`${category.title} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

                      {/* Golden border on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
