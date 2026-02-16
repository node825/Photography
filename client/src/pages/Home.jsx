import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingSquares from '../components/FloatingSquares';
import GlobalMouseEffect from '../components/GlobalMouseEffect';

/**
 * Home - Page layout orchestrator.
 * Manages z-index layering between global effects (z-auto), Navbar (z-50), and main content (z-10).
 * Dependencies: Navbar, Hero, Gallery, Contact, Footer, FloatingSquares, GlobalMouseEffect.
 */
const Home = () => {
  return (
    <div className="relative">
      {/* Global effects - rendered at default z-index so they sit behind content */}
      <GlobalMouseEffect />
      <FloatingSquares />

      {/* Navbar sits outside the z-10 wrapper to maintain its own z-50 sticky positioning */}
      <Navbar />

      {/* Main content elevated to z-10 to stack above global background effects */}
      <div className="relative z-10">
        <Hero />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
