import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Gallery data - using local images from src/assets/gallery/
  const galleryItems = [
    // גיל שנה (Year Old/Toddler)
    {
      id: 1,
      category: 'year',
      title: 'גיל שנה',
      image: '/src/assets/gallery/גיל שנה/IMG_1383 copy.jpg',
      gradient: 'from-amber-500 to-orange-500'
    },
    // חאלקה (Family)
    {
      id: 2,
      category: 'family',
      title: 'חאלקה',
      image: '/src/assets/gallery/חאלקה/IMG_1331 copy.jpg',
      gradient: 'from-rose-500 to-pink-500'
    },
    // חוץ (Outdoor)
    {
      id: 3,
      category: 'outdoor',
      title: 'חוץ',
      image: '/src/assets/gallery/חוץ/IMG_7682 copy.jpg',
      gradient: 'from-yellow-400 to-orange-400'
    },
    // מוצרים (Products)
    {
      id: 4,
      category: 'products',
      title: 'מוצרים',
      image: '/src/assets/gallery/מוצרים/IMG_3236 copy.jpg',
      gradient: 'from-cyan-500 to-blue-500'
    },
    // סטודיו (Studio)
    {
      id: 5,
      category: 'studio',
      title: 'סטודיו',
      image: '/src/assets/gallery/סטודיו/סטודיו (1).jpg',
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'year', label: 'גיל שנה' },
    { id: 'family', label: 'חאלקה' },
    { id: 'outdoor', label: 'חוץ' },
    { id: 'products', label: 'מוצרים' },
    { id: 'studio', label: 'סטודיו' },
  ];

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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Image Container with Blur */}
              <div className="relative h-80 overflow-hidden rounded-2xl bg-mediumGray/20">
                {/* Blurred Background Image */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-30 mix-blend-multiply`}></div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-primary mb-3"
                  >
                    {item.title}
                  </motion.h3>

                  {/* Hover Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-accent transition-colors duration-300 !text-black"
                  >
                    View
                  </motion.button>
                </div>

                {/* Gold accent border on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-textLight text-lg">
              No images in this category yet
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
