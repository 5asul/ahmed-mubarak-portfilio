
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mail, Download, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EnhancedCallToAction = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group"
        >
          <a href="#projects" className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            {t('hero.viewMyWork')}
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-sky-500/50 hover:border-sky-500 bg-white/5 backdrop-blur-sm hover:bg-white/10 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group"
        >
          <a href="#contact" className="flex items-center gap-2">
            <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            {t('hero.hireMe')}
          </a>
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex justify-center gap-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 group"
        >
          <a 
            href="/AHMED_MUBARAK_RESUME.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            {t('hero.downloadCV')}
          </a>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 group"
        >
          <a 
            href="https://github.com/your-github" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {t('hero.github')}
          </a>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 group"
        >
          <a 
            href="https://linkedin.com/in/your-profile" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {t('hero.linkedin')}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCallToAction;
