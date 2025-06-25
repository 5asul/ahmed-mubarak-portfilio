
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Code, Download, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/' && location.hash === '';
    }
    return location.hash === href.split('#')[1] ? `#${location.hash.split('#')[1]}` : '';
  };

  const scrollToSection = (href: string) => {
    if (href === '/') {
      if (location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      if (location.pathname !== '/') {
        window.location.href = href;
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/AHMED_MUBARAK_RESUME.pdf';
    link.download = 'Ahmed_Mubarak_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCV = () => {
    window.open('/AHMED_MUBARAK_RESUME.pdf', '_blank');
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm shadow-lg border-b border-border fixed w-full z-50 top-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Code className="text-white w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent hidden xs:block">
                Ahmed Mubarak
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent xs:hidden">
                AM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  isActive(item.href)
                    ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                    : 'text-foreground hover:text-sky-600 dark:hover:text-sky-400'
                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
              >
                {item.name}
              </button>
            ))}
            
            {/* CV Actions */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleViewCV}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:text-sky-600 dark:hover:text-sky-400"
              >
                <Eye size={14} />
                <span className="hidden xl:inline">View CV</span>
              </Button>
              <Button
                onClick={handleDownloadCV}
                size="sm"
                className="flex items-center space-x-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
              >
                <Download size={14} />
                <span className="hidden xl:inline">Download CV</span>
              </Button>
            </div>
            
            <ThemeToggle />
            
            {user && isAdmin && (
              <div className="flex items-center space-x-2">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Settings size={14} />
                    <span className="hidden xl:inline">Admin</span>
                  </Button>
                </Link>
                <Button
                  onClick={signOut}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span className="hidden xl:inline">Logout</span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg border-t border-border">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  isActive(item.href)
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30'
                    : 'text-foreground hover:text-sky-600 dark:hover:text-sky-400 hover:bg-accent'
                } block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 rounded-md`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile CV Actions */}
            <div className="px-3 py-2 space-y-3 border-t border-border mt-4 pt-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => {
                    handleViewCV();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center space-x-2 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  <Eye size={16} />
                  <span>View CV</span>
                </Button>
                <Button
                  onClick={() => {
                    handleDownloadCV();
                    setIsMenuOpen(false);
                  }}
                  size="sm"
                  className="flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                >
                  <Download size={16} />
                  <span>Download</span>
                </Button>
              </div>
            </div>
            
            {user && isAdmin && (
              <div className="px-3 py-2 space-y-2 border-t border-border">
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-2">
                    <Settings size={16} />
                    <span>Admin Dashboard</span>
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  variant="ghost"
                  size="sm"
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
