import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingSquares from '../components/FloatingSquares';

const Home = () => {
  return (
    <div className="relative">
      {/* Global floating squares background */}
      <FloatingSquares />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
