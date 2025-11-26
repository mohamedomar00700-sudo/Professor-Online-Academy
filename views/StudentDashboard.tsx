
import React from 'react';
import { Clock, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const StudentDashboard: React.FC = () => {
    const { t, setCurrentView, bookedSessions } = useAppContext();
    
    return (
        <div className={`max-w-6xl mx-auto p-6`}>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">{t('home')}</h2>
                <p className="text-gray-600">{t('chooseTeacher')}</p>
            </div>
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl p-3 bg-white/20 rounded-full">📚</div>
                        <div>
                            <h3 className="font-semibold">{t('completedSessions')}</h3>
                            <p className="text-2xl font-bold">{bookedSessions.length}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl p-3 bg-white/20 rounded-full">⭐</div>
                        <div>
                            <h3 className="font-semibold">{t('averageGrades')}</h3>
                            <p className="text-2xl font-bold">85%</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl p-3 bg-white/20 rounded-full">📊</div>
                        <div>
                            <h3 className="font-semibold">{t('attendanceRate')}</h3>
                            <p className="text-2xl font-bold">94%</p>
                        </div>
                    </div>
                </div>
            </div>
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{t('bookFirstSession')}</h3>
                    <p className="mb-4 text-gray-600">{t('chooseTeacher')}</p>
                    <button 
                        onClick={() => setCurrentView('book-session')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        {t('bookNow')}
                    </button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{t('trackProgress')}</h3>
                    <p className="mb-4 text-gray-600">{t('monitorPerformance')}</p>
                    <button 
                        onClick={() => setCurrentView('progress')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                        {t('viewProgress')}
                    </button>
                </div>
            </div>
      
            {bookedSessions.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">{t('upcomingSessions')}</h3>
                    <div className="space-y-3">
                        {bookedSessions.slice(0, 3).map(session => (
                            <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Clock className="text-blue-500" size={20} />
                                    <div>
                                        <p className="font-medium">{session.subject}</p>
                                        <p className="text-sm text-gray-600">{session.day} - {session.time}</p>
                                        <p className="text-xs text-green-600 font-semibold">{session.price}</p>
                                    </div>
                                </div>
                                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1 transition-colors text-sm">
                                    <Video size={14} />
                                    {t('join')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};