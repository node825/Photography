import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Booking from '../components/Booking';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingSquares from '../components/FloatingSquares';
import GlobalMouseEffect from '../components/GlobalMouseEffect';

const Home = () => {
  return (
    <div className="relative">
      {/* Global effects */}
      <GlobalMouseEffect />
      <FloatingSquares />

      {/* Sticky Navbar - Must be outside z-10 container */}
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <Gallery />
        <Booking />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
