
import { Languages, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // Update document direction for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const getCurrentLanguage = () => {
    return i18n.language === 'ar' ? 'العربية' : 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 p-0 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25 border-2 border-emerald-200 dark:border-emerald-700"
        >
          <div className="absolute inset-0.5 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
            <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-all duration-300" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[120px] bg-white dark:bg-slate-800 border border-border shadow-lg z-50"
      >
        <DropdownMenuItem
          onClick={() => toggleLanguage('en')}
          className={`cursor-pointer flex items-center gap-2 ${
            i18n.language === 'en' ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
          }`}
        >
          <span className="text-base">🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLanguage('ar')}
          className={`cursor-pointer flex items-center gap-2 ${
            i18n.language === 'ar' ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
          }`}
        >
          <span className="text-base">🇸🇦</span>
          <span>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
