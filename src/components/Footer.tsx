
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 text-center">
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
