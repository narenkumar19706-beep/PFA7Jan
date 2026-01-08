import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

// Custom icons matching the reference design exactly
const HomeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z"/>
  </svg>
);

const CommunityIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7 9c0-2.67 5.33-4 7-4s7 1.33 7 4v1H5v-1z"/>
    <path d="M5 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-1.94 0-4 .78-4 2v1h4v-1c0-.78.39-1.5 1-2.11-.33-.03-.66-.05-1-.05v.16z" opacity="0.7"/>
    <path d="M19 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-.34 0-.67.02-1 .05.61.61 1 1.33 1 2.11v1h4v-1c0-1.22-2.06-2-4-2v-.16z" opacity="0.7"/>
  </svg>
);

const SOSIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/>
  </svg>
);

const ProfileIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

export default function BottomNav({ activePath }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const currentPath = activePath || location.pathname;

  const navItems = [
    { id: 'home', icon: HomeIcon, labelKey: 'navHome', path: '/home' },
    { id: 'community', icon: CommunityIcon, labelKey: 'navCommunity', path: '/community' },
    { id: 'sos', icon: SOSIcon, labelKey: 'navSOS', path: '/sos' },
    { id: 'profile', icon: ProfileIcon, labelKey: 'navProfile', path: '/user-profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1F1F1F] border-t border-accent safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 sm:h-20">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || 
            (item.id === 'home' && currentPath === '/home') ||
            (item.id === 'sos' && currentPath === '/sos-active');
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${
                isActive ? 'bg-white/10 rounded-lg' : ''
              }`}
            >
              <Icon 
                className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  isActive ? 'text-foreground' : 'text-secondary'
                }`} 
              />
              <span 
                className={`text-[10px] sm:text-xs mt-1 tracking-[0.5px] ${
                  isActive ? 'text-foreground font-bold' : 'text-secondary font-normal'
                }`}
              >
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Export individual icons for screens that need custom nav behavior
export { HomeIcon, CommunityIcon, SOSIcon, ProfileIcon };
