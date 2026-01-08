import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'default' }) {
  const { language, changeLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    changeLanguage(newLang);
  };
  
  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors"
      >
        <Globe className="w-4 h-4 text-white/80" />
        <span className="text-sm font-medium text-white">
          {language === 'en' ? 'हिंदी' : 'EN'}
        </span>
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-secondary" />
      <div className="flex bg-[#1A1A1A] border border-accent rounded-lg overflow-hidden">
        <button
          onClick={() => changeLanguage('en')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            language === 'en' 
              ? 'bg-white text-black' 
              : 'text-secondary hover:text-white'
          }`}
        >
          {LANGUAGES.en.name}
        </button>
        <button
          onClick={() => changeLanguage('hi')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            language === 'hi' 
              ? 'bg-white text-black' 
              : 'text-secondary hover:text-white'
          }`}
        >
          {LANGUAGES.hi.nativeName}
        </button>
      </div>
    </div>
  );
}
