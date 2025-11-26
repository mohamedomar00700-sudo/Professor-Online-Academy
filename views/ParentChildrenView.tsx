
import React from 'react';
import { User, BarChart, Check, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ParentChildrenView: React.FC = () => {
    const { t, childrenData } = useAppContext();
    
    const getProgressColor = (progressKey: string) => {
        switch (progressKey) {
            case 'excellent': return 'text-purple-600';
            case 'veryGood': return 'text-blue-600';
            case 'good': return 'text-green-600';
            case 'needsImprovement': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('childrenPerformance')}</h2>

            <div className="space-y-6">
                {childrenData.map(child => (
                    <div key={child.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                            <img src={child.avatar} alt={child.name} className="w-24 h-24 rounded-full border-4 border-blue-200" />
                            <div>
                                <h3 className="font-bold text-2xl text-gray-800">{child.name}</h3>
                                <p className="text-gray-500">{child.grade}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="bg-green-50 rounded-lg p-4">
                                <Check className="mx-auto text-green-500 mb-2" size={24} />
                                <p className="text-sm font-medium text-gray-500">{t('attendancePercentage')}</p>
                                <p className="text-2xl font-bold text-green-600">{child.attendance}%</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <BarChart className="mx-auto text-blue-500 mb-2" size={24} />
                                <p className="text-sm font-medium text-gray-500">{t('averageGrades')}</p>
                                <p className="text-2xl font-bold text-blue-600">{child.averageGrades}%</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                                <TrendingUp className="mx-auto text-purple-500 mb-2" size={24} />
                                <p className="text-sm font-medium text-gray-500">{t('overallLevel')}</p>
                                <p className={`text-2xl font-bold ${getProgressColor(child.progressKey)}`}>{t(child.progressKey)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};