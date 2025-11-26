
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const AdminStudentsView: React.FC = () => {
    const { t, childrenData } = useAppContext(); // Using children data as mock students

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('students')}</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {childrenData.map(student => (
                        <div key={student.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full"/>
                                <div>
                                    <h3 className="font-semibold">{student.name}</h3>
                                    <p className="text-sm text-gray-500">{student.grade}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('attendancePercentage')}</span>
                                    <span className="font-medium text-green-600">{student.attendance}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t('averageGrades')}</span>
                                    <span className="font-medium text-blue-600">{student.averageGrades}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};