import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
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

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
