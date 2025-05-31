
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 dark:text-slate-500 py-8 text-center border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Ahmed Mubarak. All rights reserved.</p>
        <p className="text-sm mt-1">
          Designed & Built by Ahmed Mubarak 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
