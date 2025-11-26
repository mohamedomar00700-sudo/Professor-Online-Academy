
import React, { useState } from 'react';
import { Users, BookOpen, Calendar, DollarSign, User, PlusCircle, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AddStudentModal } from '../components/AddStudentModal';
import { AddTeacherModal } from '../components/AddTeacherModal';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AdminDashboard: React.FC = () => {
    const { t, reloadData, teachers, childrenData, bookedSessions, formatPrice } = useAppContext();
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const registrations = [
        { name: t('language') === 'ar' ? 'سارة محمد' : 'Sarah Mohammed', type: t('student'), time: `${t('ago')} 2 ${t('minutes')}` },
        { name: t('language') === 'ar' ? 'أحمد علي' : 'Ahmed Ali', type: t('teacher'), time: `${t('ago')} 5 ${t('minutes')}` },
        { name: t('language') === 'ar' ? 'فاطمة سالم' : 'Fatima Salem', type: t('parent'), time: `${t('ago')} 10 ${t('minutes')}` }
    ];

    const popular = [
        { subjectKey: 'mathematics', sessions: 45, color: 'blue' },
        { subjectKey: 'physics', sessions: 32, color: 'green' },
        { subjectKey: 'chemistry', sessions: 28, color: 'purple' },
        { subjectKey: 'biology', sessions: 24, color: 'yellow' }
    ];

    const handleSuccess = () => {
        reloadData();
        setIsAddStudentModalOpen(false);
        setIsAddTeacherModalOpen(false);
    }
    
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await reloadData();
        setIsRefreshing(false);
    }

    // Calculate dynamic stats
    const totalStudents = childrenData.length;
    const totalTeachers = teachers.length;
    
    const today = new Date().toISOString().split('T')[0];
    const todaySessionsCount = bookedSessions.filter(s => s.date === today).length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = bookedSessions
        .filter(s => {
            const sessionDate = new Date(s.date);
            return s.status === 'completed' && sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear;
        })
        .reduce((sum, s) => sum + s.price_sar, 0);


    return (
        <>
            <div className={`max-w-6xl mx-auto p-6`}>
                <h2 className="text-3xl font-bold mb-8">{t('adminDashboard')}</h2>
          
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 p-3 rounded-full"><Users className="w-6 h-6 text-blue-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-600">{t('totalStudents')}</h3>
                            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                        <div className="bg-green-100 p-3 rounded-full"><BookOpen className="w-6 h-6 text-green-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-600">{t('activeTeachers')}</h3>
                            <p className="text-2xl font-bold text-green-600">{totalTeachers}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                        <div className="bg-purple-100 p-3 rounded-full"><Calendar className="w-6 h-6 text-purple-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-600">{t('todaySessions')}</h3>
                            <p className="text-2xl font-bold text-purple-600">{todaySessionsCount}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                        <div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="w-6 h-6 text-yellow-600" /></div>
                        <div>
                            <h3 className="font-semibold text-gray-600">{t('monthlyRevenue')}</h3>
                            <p className="text-2xl font-bold text-yellow-600">{formatPrice(monthlyRevenue)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4">Admin Actions</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={() => setIsAddStudentModalOpen(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
                        >
                            <PlusCircle size={18} /> Add New Student
                        </button>
                        <button 
                             onClick={() => setIsAddTeacherModalOpen(true)}
                             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
                        >
                           <PlusCircle size={18} /> Add New Teacher
                        </button>
                         <button 
                             onClick={handleRefresh}
                             disabled={isRefreshing}
                             className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-semibold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto disabled:bg-gray-400"
                        >
                           {isRefreshing ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : <RefreshCw size={18} />}
                           {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">{t('recentRegistrations')}</h3>
                        <div className="space-y-3">
                            {registrations.map((user, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><User size={16} /></div>
                                        <div><p className="font-medium">{user.name}</p><p className="text-sm text-gray-600">{user.type}</p></div>
                                    </div>
                                    <span className="text-sm text-gray-500">{user.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">{t('popularSessions')}</h3>
                        <div className="space-y-3">
                            {popular.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="font-medium">{t(item.subjectKey as any)}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-20 h-2 bg-gray-200 rounded-full overflow-hidden`}><div className={`h-full bg-${item.color}-500`} style={{width: `${(item.sessions / 45) * 100}%`}}></div></div>
                                        <span className="text-sm text-gray-600 w-8 text-right">{item.sessions}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isAddStudentModalOpen && (
                <AddStudentModal 
                    onClose={() => setIsAddStudentModalOpen(false)}
                    onSuccess={handleSuccess}
                />
            )}
             {isAddTeacherModalOpen && (
                <AddTeacherModal 
                    onClose={() => setIsAddTeacherModalOpen(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
};