
import React from 'react';
import { Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-secondary dark:bg-secondary/50 transition-colors duration-300">
      <div className="container mx-auto animate-fade-in-up">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">
          {t('contact.subtitle')}
        </p>
        <div className="max-w-lg mx-auto text-center">
          <a
            href="mailto:ahmedabbad2@gmail.com"
            className="inline-block bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md transition-colors duration-300 mb-10"
          >
            {t('contact.sayHello')}
          </a>
          <div className="space-y-4 mb-10 text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>{t('contact.phone')}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin size={20} />
              <span>{t('contact.location')}</span>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="mailto:ahmedabbad2@gmail.com" title={t('contact.email')} className="text-muted-foreground hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <Mail size={32} />
            </a>
            <a href="https://www.linkedin.com/in/ahmed-mubarak-8811b7281" title={t('contact.linkedin')} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <Linkedin size={32} />
            </a>
            <a href="https://github.com/5asul" target="_blank" rel="noopener noreferrer" title={t('contact.github')} className="text-muted-foreground hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              <Github size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
