
import React from 'react';
import { User, CheckCircle, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ParentDashboard: React.FC = () => {
    const { t, formatPrice } = useAppContext();

    const childrenData = [
        { name: t('language') === 'ar' ? 'أحمد سالم' : 'Ahmed Salem', grade: t('grade11'), attendance: 95, averageGrades: 92, progressKey: 'excellent' },
        { name: t('language') === 'ar' ? 'فاطمة سالم' : 'Fatima Salem', grade: t('grade10'), attendance: 88, averageGrades: 85, progressKey: 'veryGood' }
    ];

    const upcomingSessions = [
        { student: t('language') === 'ar' ? 'أحمد سالم' : 'Ahmed Salem', subject: t('mathematics'), time: '15:00', teacher: t('language') === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed' },
        { student: t('language') === 'ar' ? 'فاطمة سالم' : 'Fatima Salem', subject: t('physics'), time: '17:00', teacher: t('language') === 'ar' ? 'فاطمة علي' : 'Fatima Ali' },
        { student: t('language') === 'ar' ? 'أحمد سالم' : 'Ahmed Salem', subject: t('chemistry'), time: '19:00', teacher: t('language') === 'ar' ? 'محمد سالم' : 'Mohammed Salem' }
    ];

    return (
        <div className={`max-w-6xl mx-auto p-6`}>
            <h2 className="text-3xl font-bold mb-8">{t('home')}</h2>
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 p-3 rounded-full"><User className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <h3 className="font-semibold text-gray-600">{t('registeredChildren')}</h3>
                        <p className="text-2xl font-bold text-blue-600">2</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                    <div>
                        <h3 className="font-semibold text-gray-600">{t('completedSessions')}</h3>
                        <p className="text-2xl font-bold text-green-600">28</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="w-6 h-6 text-yellow-600" /></div>
                    <div>
                        <h3 className="font-semibold text-gray-600">{t('currentBalance')}</h3>
                        <p className="text-2xl font-bold text-yellow-600">{formatPrice(1240)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">{t('childrenPerformance')}</h3>
                    <div className="space-y-4">
                        {childrenData.map((child, index) => (
                             <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h4 className="font-semibold text-lg">{child.name}</h4>
                                        <p className="text-sm text-gray-600">{child.grade}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">{t('attendancePercentage')}</p>
                                        <p className="font-bold text-lg sm:text-xl text-green-600">{child.attendance}%</p>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">{t('averageGrades')}</p>
                                        <p className="font-bold text-lg sm:text-xl text-blue-600">{child.averageGrades}%</p>
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">{t('overallLevel')}</p>
                                        <p className={`font-bold text-lg sm:text-xl ${child.progressKey === 'excellent' ? 'text-purple-600' : 'text-indigo-600'}`}>{t(child.progressKey as any)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">{t('upcomingSessions')}</h3>
                    <div className="space-y-3">
                        {upcomingSessions.map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="font-medium">{session.student} - {session.subject}</p>
                                    <p className="text-sm text-gray-600">{t('teacher')}: {session.teacher}</p>
                                </div>
                                <div className={`text-right`}>
                                    <p className="font-medium text-blue-600">{session.time}</p>
                                    <button className="text-sm text-blue-600 hover:underline">{t('sessionLink')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};