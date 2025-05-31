
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Code } from 'lucide-react';
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
    if (href.includes('#')) {
      const element = document.querySelector(href.split('#')[1] ? `#${href.split('#')[1]}` : '');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm shadow-lg border-b border-border fixed w-full z-50 top-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-emerald-500 dark:to-sky-500 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300">
                <Code className="text-emerald-400 dark:text-white w-6 h-6" />
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
            
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Settings size={14} />
                      <span>Admin</span>
                    </Button>
                  </Link>
                )}
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
            ) : (
              <Link to="/auth">
                <Button size="sm" className="flex items-center space-x-1">
                  <User size={14} />
                  <span>Admin Login</span>
                </Button>
              </Link>
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
            
            <div className="px-3 py-2 space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
                        <Settings size={14} />
                        <span>Admin Dashboard</span>
                      </Button>
                    </Link>
                  )}
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
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full flex items-center justify-center space-x-1">
                    <User size={14} />
                    <span>Admin Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
