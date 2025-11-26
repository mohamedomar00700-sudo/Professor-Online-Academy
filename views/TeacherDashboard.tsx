
import React from 'react';
import { Calendar, Users, DollarSign, Clock, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const TeacherDashboard: React.FC = () => {
    const { t, formatPrice } = useAppContext();

    const schedule = [
        { time: '09:00', student: t('language') === 'ar' ? 'أحمد سالم' : 'Ahmed Salem', subject: t('mathematics'), status: 'confirmed' },
        { time: '11:00', student: t('language') === 'ar' ? 'فاطمة أحمد' : 'Fatima Ahmed', subject: t('mathematics'), status: 'confirmed' },
        { time: '15:00', student: t('language') === 'ar' ? 'محمد علي' : 'Mohammed Ali', subject: t('mathematics'), status: 'pending' },
    ];

    return (
        <div className={`max-w-6xl mx-auto p-6`}>
            <h2 className="text-3xl font-bold mb-8">{t('teacherDashboard')}</h2>
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 p-3 rounded-full"><Calendar className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <h3 className="font-semibold text-gray-600">{t('todaySessions')}</h3>
                        <p className="text-2xl font-bold text-blue-600">5</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 p-3 rounded-full"><Users className="w-6 h-6 text-green-600" /></div>
                    <div>
                        <h3 className="font-semibold text-gray-600">{t('activeStudents')}</h3>
                        <p className="text-2xl font-bold text-green-600">23</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                    <div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="w-6 h-6 text-yellow-600" /></div>
                    <div>
                        <h3 className="font-semibold text-gray-600">{t('monthlyEarnings')}</h3>
                        <p className="text-2xl font-bold text-yellow-600">{formatPrice(2340)}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{t('upcomingSchedule')}</h3>
                <div className="space-y-3">
                    {schedule.map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded"><Clock className="w-4 h-4 text-blue-600" /></div>
                                <div>
                                    <p className="font-medium">{session.time} - {session.subject}</p>
                                    <p className="text-sm text-gray-600">{t('student')}: {session.student}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {session.status === 'confirmed' ? t('confirmed') : t('pending')}
                                </span>
                                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1 transition-colors text-sm">
                                    <Video size={14} />
                                    {t('startSession')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};