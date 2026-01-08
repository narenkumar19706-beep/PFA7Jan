import { useNavigate } from "react-router-dom";
import { Bell, Bug, UserX, ChevronRight } from "lucide-react";
import PawIcon from "@/components/icons/PawIcon";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/context/LanguageContext";

export default function HelpSupportScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const supportOptions = [
    {
      id: 'report-bug',
      icon: Bug,
      labelKey: 'reportBug',
      descKey: 'reportBugDesc',
      path: '/report-bug'
    },
    {
      id: 'report-user',
      icon: UserX,
      labelKey: 'reportUser',
      descKey: 'reportUserDesc',
      path: '/report-user'
    }
  ];

  return (
    <div className="min-h-screen min-h-dvh bg-background flex flex-col safe-area-top safe-area-bottom">
      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-8 pt-12 sm:pt-14 pb-24 max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border border-accent flex items-center justify-center">
            <PawIcon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
          </div>
          
          {/* Notification Bell */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2"
          >
            <Bell className="w-6 h-6 text-foreground" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">
            {t('appName')}
          </h1>
          <h2 className="text-2xl sm:text-3xl text-secondary leading-none mt-1">
            {t('appSubtitle')}
          </h2>
        </div>

        {/* Section Label */}
        <div className="mt-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t('helpSupportTitle')}
          </h3>
          <p className="text-sm text-secondary mt-2">
            {t('helpSupportSubtitle')}
          </p>
        </div>

        {/* Support Option Tiles */}
        <div className="mt-8 space-y-4">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => navigate(option.path)}
                className="w-full flex items-center border border-accent p-4 hover:border-white/50 hover:bg-white/5 transition-all"
              >
                <div className="w-12 h-12 border border-accent flex items-center justify-center mr-4">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-lg font-bold text-foreground block">
                    {t(option.labelKey)}
                  </span>
                  <span className="text-sm text-secondary">
                    {t(option.descKey)}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 text-secondary" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activePath="/user-profile" />
    </div>
  );
}
