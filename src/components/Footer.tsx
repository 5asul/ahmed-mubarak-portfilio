
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary/80 dark:bg-secondary text-muted-foreground py-8 text-center border-t border-border transition-colors duration-300">
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
