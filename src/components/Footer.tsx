
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-secondary/80 dark:bg-secondary text-muted-foreground py-8 text-center border-t border-border transition-colors duration-300">
      <div className="container mx-auto">
        <p>&copy; {currentYear} {t('footer.copyright')}</p>
        <p className="text-sm mt-1">
          {t('footer.designedBy')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
