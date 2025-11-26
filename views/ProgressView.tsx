
import React from 'react';
import { BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ProgressView: React.FC = () => {
    const { t } = useAppContext();
    
    const subjectData = [
        { subjectKey: 'mathematics', score: 88, trend: 'up', sessions: 12 },
        { subjectKey: 'physics', score: 82, trend: 'up', sessions: 8 },
        { subjectKey: 'chemistry', score: 85, trend: 'stable', sessions: 6 },
        { subjectKey: 'biology', score: 90, trend: 'up', sessions: 4 }
    ];

    return (
        <div className={`max-w-4xl mx-auto p-6`}>
            <h2 className="text-3xl font-bold mb-8">{t('progressReport')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-2">📊</div>
                    <h3 className="font-semibold">{t('attendancePercentage')}</h3>
                    <p className="text-2xl font-bold text-green-600">94%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-2">⭐</div>
                    <h3 className="font-semibold">{t('averageGrades')}</h3>
                    <p className="text-2xl font-bold text-blue-600">85%</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="font-semibold">{t('overallLevel')}</h3>
                    <p className="text-2xl font-bold text-purple-600">{t('excellent')}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{t('subjectPerformance')}</h3>
                <div className="space-y-4">
                    {subjectData.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <BookOpen className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{t(subject.subjectKey as any)}</h4>
                                    <p className="text-sm text-gray-600">{subject.sessions} {t('sessions')}</p>
                                </div>
                            </div>
                            <div className={`text-right`}>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg">{subject.score}%</span>
                                    <span className={`text-sm ${subject.trend === 'up' ? 'text-green-500' : subject.trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                                        {subject.trend === 'up' ? '↗️' : subject.trend === 'down' ? '↘️' : '➡️'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};