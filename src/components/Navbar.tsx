
import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Download } from 'lucide-react'; // Added Download icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cvButtonClasses = `flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    isScrolled
      ? 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500'
      : 'bg-white text-sky-600 hover:bg-sky-100 focus:ring-sky-500'
  } md:ml-4`;

  const cvMobileButtonClasses = `flex items-center justify-center space-x-2 w-full max-w-xs mx-auto mt-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500`;


  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <a href="#home" className={`text-2xl font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
          <Code className="inline-block mr-2" size={28} />
          Ahmed Mubarak
        </a>
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-sky-500 transition-colors px-3 py-2 ${isScrolled ? 'text-slate-700' : 'text-slate-100'}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/ahmed_mubarak_cv.pdf" // Placeholder CV path
            download="Ahmed_Mubarak_CV.pdf"
            className={cvButtonClasses}
            aria-label="Download CV"
          >
            <Download size={18} />
            <span>Download CV</span>
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-slate-800' : 'text-white'} focus:outline-none`}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 pb-4">
          <div className="flex flex-col items-center space-y-2 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-700 hover:text-sky-500 transition-colors py-2 text-center w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/ahmed_mubarak_cv.pdf" // Placeholder CV path
              download="Ahmed_Mubarak_CV.pdf"
              className={cvMobileButtonClasses}
              onClick={() => setIsOpen(false)}
              aria-label="Download CV"
            >
              <Download size={18} />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
