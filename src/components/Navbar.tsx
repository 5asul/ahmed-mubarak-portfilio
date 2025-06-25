
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
      // Navigate to home and scroll to top
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
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/AHMED_MUBARAK_RESUME.pdf';
    link.download = 'Ahmed_Mubarak_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCV = () => {
    // Open CV in a new tab
    window.open('/AHMED_MUBARAK_RESUME.pdf', '_blank');
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm shadow-lg border-b border-border fixed w-full z-50 top-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300">
                <Code className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Ahmed Mubarak
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
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
                <span>View CV</span>
              </Button>
              <Button
                onClick={handleDownloadCV}
                size="sm"
                className="flex items-center space-x-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
              >
                <Download size={14} />
                <span>Download CV</span>
              </Button>
            </div>
            
            <ThemeToggle />
            
            {user && isAdmin && (
              <div className="flex items-center space-x-4">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Settings size={14} />
                    <span>Admin</span>
                  </Button>
                </Link>
                <Button
                  onClick={signOut}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg border-t border-border">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  isActive(item.href)
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30'
                    : 'text-foreground hover:text-sky-600 dark:hover:text-sky-400 hover:bg-accent'
                } block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile CV Actions */}
            <div className="px-3 py-2 space-y-2">
              <Button
                onClick={() => {
                  handleViewCV();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center space-x-1 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:text-sky-600 dark:hover:text-sky-400"
              >
                <Eye size={14} />
                <span>View CV</span>
              </Button>
              <Button
                onClick={() => {
                  handleDownloadCV();
                  setIsMenuOpen(false);
                }}
                size="sm"
                className="w-full flex items-center justify-center space-x-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
              >
                <Download size={14} />
                <span>Download CV</span>
              </Button>
            </div>
            
            {user && isAdmin && (
              <div className="px-3 py-2 space-y-2">
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
                    <Settings size={14} />
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
                  className="w-full flex items-center justify-center space-x-1"
                >
                  <LogOut size={14} />
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
