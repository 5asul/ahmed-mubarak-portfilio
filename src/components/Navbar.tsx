
import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react'; // Code as a placeholder logo

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <a href="#home" className={`text-2xl font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
          <Code className="inline-block mr-2" size={28} />
          Your Name
        </a>
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`hover:text-sky-500 transition-colors ${isScrolled ? 'text-slate-700' : 'text-slate-100'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-700 hover:text-sky-500 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
