
import React from 'react';
import { Home, Calendar, Clock, BarChart3, DollarSign, Users, User, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Sidebar: React.FC = () => {
    const { userType, currentView, setCurrentView, t, isRTL, isMobile, isSidebarOpen, setIsSidebarOpen } = useAppContext();

    const menuItems = {
      student: [
        { id: 'home', label: t('home'), icon: Home, color: 'blue' },
        { id: 'book-session', label: t('bookSession'), icon: Calendar, color: 'green' },
        { id: 'my-sessions', label: t('mySessions'), icon: Clock, color: 'purple' },
        { id: 'progress', label: t('progress'), icon: BarChart3, color: 'yellow' },
        { id: 'billing', label: t('billing'), icon: DollarSign, color: 'red' }
      ],
      parent: [
        { id: 'home', label: t('home'), icon: Home, color: 'blue' },
        { id: 'children', label: t('children'), icon: Users, color: 'green' },
        { id: 'sessions', label: t('sessions'), icon: Calendar, color: 'purple' },
        { id: 'progress', label: t('progress'), icon: BarChart3, color: 'yellow' },
        { id: 'billing', label: t('billing'), icon: DollarSign, color: 'red' }
      ],
      teacher: [
        { id: 'home', label: t('home'), icon: Home, color: 'blue' },
        { id: 'schedule', label: t('schedule'), icon: Calendar, color: 'green' },
        { id: 'students', label: t('students'), icon: Users, color: 'purple' },
        { id: 'availability', label: t('availability'), icon: Clock, color: 'yellow' },
        { id: 'earnings', label: t('earnings'), icon: DollarSign, color: 'red' }
      ],
      admin: [
        { id: 'home', label: t('adminDashboard'), icon: Home, color: 'blue' },
        { id: 'teachers', label: t('activeTeachers'), icon: Users, color: 'green' },
        { id: 'students', label: t('students'), icon: User, color: 'purple' },
        { id: 'sessions', label: t('sessions'), icon: Calendar, color: 'yellow' },
        { id: 'finances', label: t('finances'), icon: DollarSign, color: 'red' }
      ]
    };
    
    if (!userType || !menuItems[userType]) return null;
    
    const transformClasses = isMobile 
        ? (isSidebarOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full'))
        : 'translate-x-0';

    const sidebarClasses = `
        bg-gray-50 w-72 lg:w-64 p-4 fixed h-full z-50 transition-transform duration-300 ease-in-out
        ${isRTL ? 'font-arabic' : ''}
        ${isRTL ? 'right-0' : 'left-0'}
        lg:top-16 lg:h-[calc(100vh-64px)] lg:z-30
        ${isRTL ? 'lg:border-l' : 'lg:border-r'}
        ${transformClasses}
    `;
    
    const handleItemClick = (view: string) => {
        setCurrentView(view);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className={sidebarClasses}>
             <div className="flex justify-between items-center lg:hidden mb-4">
                <h2 className="text-lg font-bold text-gray-800">{t('menu')}</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-600 hover:text-gray-800">
                    <X size={24} />
                </button>
            </div>
            <div className="space-y-2">
                {menuItems[userType].map(item => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    const colors = {
                        blue: { bg: 'bg-blue-600', hoverBg: 'hover:bg-blue-50', hoverText: 'hover:text-blue-700' },
                        green: { bg: 'bg-green-600', hoverBg: 'hover:bg-green-50', hoverText: 'hover:text-green-700' },
                        purple: { bg: 'bg-purple-600', hoverBg: 'hover:bg-purple-50', hoverText: 'hover:text-purple-700' },
                        yellow: { bg: 'bg-yellow-500', hoverBg: 'hover:bg-yellow-50', hoverText: 'hover:text-yellow-700' },
                        red: { bg: 'bg-red-600', hoverBg: 'hover:bg-red-50', hoverText: 'hover:text-red-700' },
                    };
                    const colorClasses = colors[item.color as keyof typeof colors];

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                isActive 
                                ? `${colorClasses.bg} text-white shadow-lg` 
                                : `${colorClasses.hoverBg} ${colorClasses.hoverText} text-gray-700 hover:shadow-md`
                            } ${isRTL ? 'justify-start' : ''}`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};