import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, MapPin, Navigation, MessageSquare, Clock, CheckCircle, Users } from "lucide-react";
import { toast } from "sonner";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";
import { useLocationContext } from "@/context/LocationContext";
import { useLanguage } from "@/context/LanguageContext";

// Mock SOS alerts data
const getAlertsData = (district) => ({
  current: [
    {
      id: 1,
      name: "Ananya Rao",
      initials: "AR",
      district: district,
      distance: "2",
      isAttending: true,
    },
    {
      id: 2,
      name: "Karan Johar",
      initials: "KJ",
      district: "Indiranagar",
      distance: "4",
      isAttending: false,
    },
  ],
  past: [
    { id: 3, district: "Mysore Road", resolved: true, closed: true },
    { id: 4, district: "Indiranagar", resolved: true, closed: true },
    { id: 5, district: "J.P. Nagar", resolved: true, closed: true },
  ],
  myAlerts: {
    active: {
      id: 6,
      district: district,
      distance: "2",
      attendingCount: 3,
    },
    history: [
      { id: 7, district: "Mysore Road", resolved: true, closed: true },
      { id: 8, district: "Indiranagar", resolved: true, closed: true },
    ],
  },
});

export default function SOSHistoryScreen() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { location: userLocation, isLocating } = useLocationContext();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState('current');
  const [alerts, setAlerts] = useState(getAlertsData(userLocation.district || "Bangalore Urban"));

  const handleAttend = (alertId) => {
    setAlerts(prev => ({
      ...prev,
      current: prev.current.map(alert => 
        alert.id === alertId ? { ...alert, isAttending: !alert.isAttending } : alert
      )
    }));
    toast.success(t('success'));
  };

  const handleNavigate = (alert) => {
    toast.info(t('loading'));
  };

  const handleMessage = (alert) => {
    navigate("/chat", { 
      state: { 
        volunteer: { name: alert.name, initials: alert.initials, status: 'available' }
      }
    });
  };

  const handleChat = () => {
    navigate("/chat", { 
      state: { 
        volunteer: { name: "Group Chat", initials: "GC", status: 'available' }
      }
    });
  };

  const tabs = [
    { id: 'current', labelKey: 'current' },
    { id: 'past', labelKey: 'past' },
    { id: 'myAlerts', labelKey: 'myAlerts' },
  ];

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          <button className="relative p-2" onClick={() => navigate("/notifications")}>
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">{t('appName')}</h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">{t('appSubtitle')}</h2>
        </div>

        {/* SOS Alerts Header */}
        <div className="mt-6 flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">{t('sosAlerts')}</h3>
          <span className="w-2 h-2 rounded-full bg-[#E53935]" />
        </div>

        {/* Tab Bar */}
        <div className="mt-4 bg-[#262626] rounded-lg p-1 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold tracking-wide transition-all ${
                activeTab === tab.id
                  ? tab.id === 'past' ? 'bg-[#424242] text-white' : 'bg-white text-black'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              {t(tab.labelKey).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Alert Cards */}
        <div className="mt-4 space-y-3">
          {activeTab === 'current' && (
            <>
              {alerts.current.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-secondary">{t('noActiveAlerts')}</p>
                </div>
              ) : (
                alerts.current.map((alert) => (
                  <div key={alert.id} className="bg-[#202020] border border-[#333333] rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#333333] rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg sm:text-xl font-bold text-foreground">{alert.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold text-foreground">{alert.name}</h4>
                        <p className="text-sm text-secondary mt-0.5">{t('from')} {alert.district}</p>
                      </div>
                      <div className="bg-[#333333] rounded-lg px-3 py-1.5 flex items-center gap-1.5 flex-shrink-0">
                        <MapPin className="w-4 h-4 text-foreground" />
                        <span className="text-sm font-semibold text-foreground">{alert.distance}{t('kmAway')}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => handleAttend(alert.id)}
                        className={`flex-1 h-10 sm:h-11 rounded-lg font-bold text-sm tracking-wide transition-all ${
                          alert.isAttending ? 'bg-white text-black' : 'bg-[#202020] border border-[#333333] text-foreground hover:bg-[#2a2a2a]'
                        }`}
                      >
                        {alert.isAttending ? t('attending').toUpperCase() : t('attend').toUpperCase()}
                      </button>
                      <button onClick={() => handleNavigate(alert)} className="w-10 h-10 sm:w-11 sm:h-11 bg-[#202020] border border-[#333333] rounded-lg flex items-center justify-center hover:bg-[#2a2a2a]">
                        <Navigation className="w-5 h-5 text-foreground" />
                      </button>
                      <button onClick={() => handleMessage(alert)} className="w-10 h-10 sm:w-11 sm:h-11 bg-[#202020] border border-[#333333] rounded-lg flex items-center justify-center hover:bg-[#2a2a2a]">
                        <MessageSquare className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'past' && (
            <>
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-[#333333]" />
                <span className="text-xs text-secondary tracking-[1px] uppercase">{t('history')}</span>
                <div className="flex-1 h-px bg-[#333333]" />
              </div>
              
              {alerts.past.map((alert) => (
                <div key={alert.id} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-base text-secondary">{t('from')} {alert.district}</p>
                    <div className="bg-[#333333] border border-[#424242] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-secondary">{t('resolved')}</span>
                    </div>
                  </div>
                  <div className="bg-[#2A2A2A] px-4 py-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-semibold text-foreground tracking-wide uppercase">{t('closed')}</span>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'myAlerts' && (
            <>
              {alerts.myAlerts.active && (
                <div className="bg-[#1C1C1C] border border-[#333333] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg sm:text-xl font-bold text-foreground">{t('from')} {alerts.myAlerts.active.district}</h4>
                    <div className="bg-[#2A2A2A] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-semibold text-foreground">{alerts.myAlerts.active.distance}{t('kmAway')}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => toast.info(t('loading'))} className="flex-1 h-11 sm:h-12 bg-[#2A2A2A] rounded-lg flex items-center justify-center gap-2">
                      <Users className="w-5 h-5 text-foreground" />
                      <span className="text-base font-bold text-foreground">{alerts.myAlerts.active.attendingCount} {t('attending').toUpperCase()}</span>
                    </button>
                    <button onClick={handleChat} className="flex-1 h-11 sm:h-12 bg-white rounded-lg flex items-center justify-center gap-2">
                      <MessageSquare className="w-5 h-5 text-black" />
                      <span className="text-base font-bold text-black">{t('chat').toUpperCase()}</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 py-2 mt-2">
                <div className="flex-1 h-px bg-[#333333]" />
                <span className="text-xs text-secondary tracking-[1px] uppercase">{t('history')}</span>
                <div className="flex-1 h-px bg-[#333333]" />
              </div>

              {alerts.myAlerts.history.map((alert) => (
                <div key={alert.id} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-base text-secondary">{t('from')} {alert.district}</p>
                    <div className="bg-[#333333] border border-[#424242] rounded-lg px-3 py-1.5 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span className="text-sm text-secondary">{t('resolved')}</span>
                    </div>
                  </div>
                  <div className="bg-[#2A2A2A] px-4 py-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-semibold text-foreground tracking-wide uppercase">{t('closed')}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <BottomNav activePath="/sos" />
    </div>
  );
}
