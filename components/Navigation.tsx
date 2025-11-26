
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Globe, LogOut, Menu, ChevronsUpDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { currencies } from '../constants';

export const Navigation: React.FC = () => {
  const { language, setLanguage, t, logout, notifications, isRTL, isMobile, setIsSidebarOpen, currency, setCurrency } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);


  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleLogout = () => {
    logout();
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`bg-white shadow-lg p-4 fixed top-0 w-full z-40 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-800"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          )}
          <div className="text-2xl">🎓</div>
          <h1 className="text-xl font-bold text-gray-800">{t('academy')}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              aria-label={t('currency')}
            >
              <span className="font-semibold">{currencies[currency].code}</span>
              <ChevronsUpDown size={16} />
            </button>
            {showCurrencyMenu && (
              <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-32 bg-white rounded-lg shadow-xl border z-50`}>
                {Object.entries(currencies).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrency(key);
                      setShowCurrencyMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {value.code} ({value.symbol})
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Globe size={20} />
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>
          
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell size={24} className="text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto`}>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">{t('notifications')}</h3>
                </div>
                {notifications.length > 0 ? (
                  <div className="space-y-2 p-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${notification.type === 'session' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                   <p className="text-center text-gray-500 py-4">{t('noNotifications')}</p>
                )}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">{t('logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};