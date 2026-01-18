const Footer = () => {
  return (
    <footer className="bg-mediumGray/40 text-textDark py-12 px-6 mt-20 border-t border-primary/10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-heading font-medium mb-4 text-primary">Kids Photography</h3>
            <p className="text-textLight font-light">Capturing precious moments of childhood</p>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-primary">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#home" className="text-textDark hover:text-primary transition-colors font-light">Home</a>
              <a href="#gallery" className="text-textDark hover:text-primary transition-colors font-light">Gallery</a>
              <a href="#booking" className="text-textDark hover:text-primary transition-colors font-light">Booking</a>
              <a href="#contact" className="text-textDark hover:text-primary transition-colors font-light">Contact</a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-primary">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:text-primaryDark transition-colors text-2xl">📷</a>
              <a href="#" className="text-primary hover:text-primaryDark transition-colors text-2xl">📘</a>
              <a href="#" className="text-primary hover:text-primaryDark transition-colors text-2xl">✉️</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/15 pt-6 text-center">
          <p className="text-textLight text-sm font-light">
            © 2025 Kids Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
