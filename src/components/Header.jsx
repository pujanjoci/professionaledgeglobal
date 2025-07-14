import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PEG from "../assets/PEG-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (currentScrollY > 100) {
          setIsVisible(false);
        }
      }, 2000);
    };

    timeoutId = setTimeout(() => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    }, 5000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-neutral-900 shadow-md fixed w-full top-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto px-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="p-2">
            <div className="rounded-full bg-neutral-50 shadow-lg p-2 flex items-center justify-center">
              <Link
                to="/"
                className="flex items-center hover:opacity-80 transition duration-300 hover:cursor-pointer"
              >
                <img
                  src={PEG}
                  alt="Professional Edge Global Logo"
                  className="h-12 w-12 object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-blue-600 transition duration-300">
              About
            </Link>
            <Link to="/services" className="text-white hover:text-blue-600 transition duration-300">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-600 transition duration-300">
              Contact
            </Link>
            <Link to="/career" className="text-white hover:text-blue-600 transition duration-300">
              Career
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link to="/" className="block py-2 text-white hover:text-blue-600 transition duration-300">
              Home
            </Link>
            <Link to="/about" className="block py-2 text-white hover:text-blue-600 transition duration-300">
              About
            </Link>
            <Link to="/services" className="block py-2 text-white hover:text-blue-600 transition duration-300">
              Services
            </Link>
            <Link to="/contact" className="block py-2 text-white hover:text-blue-600 transition duration-300">
              Contact
            </Link>
            <Link to="/career" className="block py-2 text-white hover:text-blue-600 transition duration-300">
              Career
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
