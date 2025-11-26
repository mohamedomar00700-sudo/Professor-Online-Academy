
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Star, CheckCircle } from 'lucide-react';

export const AdminTeachersView: React.FC = () => {
    const { t, teachers, language } = useAppContext();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('activeTeachers')}</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">{t('teacher')}</th>
                                <th className="p-3">{t('subjects')}</th>
                                <th className="p-3">{t('rating')}</th>
                                <th className="p-3">{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teacher => (
                                <tr key={teacher.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <img src={teacher.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                                            <span className="font-medium">{language === 'ar' ? teacher.name.ar : teacher.name.en}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-600">{teacher.subjects.map(s => language === 'ar' ? s.ar : s.en).join(', ')}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            {teacher.rating}
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit">
                                            <CheckCircle size={14} /> {t('active')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};