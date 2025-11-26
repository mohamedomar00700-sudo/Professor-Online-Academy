
import React, { useState } from 'react';
import { Search, Star, DollarSign } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Teacher } from '../types';
import * as api from '../services/api';

export const BookSessionView: React.FC = () => {
    const { t, grades, teachers, childrenData, isRTL, language, formatPrice, reloadData } = useAppContext();
    
    const initialGradeId = grades.length > 0 ? grades[0].id : '';
    const initialSubjects = grades.find(g => g.id === initialGradeId)?.subjects || [];
    const initialSubjectEn = initialSubjects.length > 0 ? initialSubjects[0].en : '';

    const [selectedGrade, setSelectedGrade] = useState(initialGradeId);
    const [selectedSubject, setSelectedSubject] = useState(initialSubjectEn);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');

    const subjects = grades.find(g => g.id === selectedGrade)?.subjects || [];

    const filteredTeachers = teachers.filter(teacher => {
        const name = language === 'ar' ? teacher.name.ar : teacher.name.en;
        const subjectMatch = teacher.subjects.some(s => s.en === selectedSubject);
        const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());
        const genderMatch = selectedGender === 'all' || teacher.gender === selectedGender;
        return subjectMatch && nameMatch && genderMatch;
    });

    const handleBookNow = async (teacher: Teacher) => {
        const childToBookFor = childrenData[0];
        if (!childToBookFor) {
            alert("No child found to book a session for.");
            return;
        }

        const subjectAr = subjects.find(s => s.en === selectedSubject)?.ar || selectedSubject;

        // This object's keys MUST match the headers in your 'sessions' Google Sheet tab
        const newSessionData = {
            teacherId: teacher.id,
            studentId: childToBookFor.id,
            subject_en: selectedSubject,
            subject_ar: subjectAr,
            time: '03:00 PM', // Placeholder time
            day: 'Friday', // Placeholder day
            date: new Date().toISOString().split('T')[0], // Today's date
            zoomLink: `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`,
            status: 'scheduled',
            price: `${teacher.hourlyRate} SAR`,
            isRated: false,
        };

        try {
            await api.bookSession(newSessionData);
            alert(t('sessionBookedSuccessfully'));
            await reloadData();
        } catch (error: any) {
            console.error("Failed to book session:", error);
            alert(`Failed to book session: ${error.message}`);
        }
    };

    if (grades.length === 0) {
        return <div>Loading initial data...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('bookSession')}</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('grade')}</label>
                        <select 
                            value={selectedGrade}
                            onChange={(e) => {
                                setSelectedGrade(e.target.value);
                                const newGrade = grades.find(g => g.id === e.target.value);
                                if (newGrade && newGrade.subjects.length > 0) {
                                    setSelectedSubject(newGrade.subjects[0].en);
                                } else {
                                    setSelectedSubject('');
                                }
                            }}
                            className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {grades.map(grade => <option key={grade.id} value={grade.id}>{language === 'ar' ? grade.name.ar : grade.name.en}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('subject')}</label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            disabled={!subjects.length}
                        >
                             {subjects.length === 0 && <option>--</option>}
                            {subjects.map(subject => <option key={subject.en} value={subject.en}>{language === 'ar' ? subject.ar : subject.en}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('teacherGender')}</label>
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value as 'all' | 'male' | 'female')}
                            className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">{t('allGenders')}</option>
                            <option value="male">{t('male')}</option>
                            <option value="female">{t('female')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('searchForTeacher')}</label>
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder={t('enterTeacherName')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full p-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'pr-10' : 'pl-10'}`}
                            />
                            <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map(teacher => (
                    <div key={teacher.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={teacher.avatar} alt="teacher" className="w-16 h-16 rounded-full" />
                            <div>
                                <h3 className="font-bold text-lg">{language === 'ar' ? teacher.name.ar : teacher.name.en}</h3>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span>{teacher.rating} ({teacher.reviews} {t('reviews')})</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow space-y-2 text-sm text-gray-600 mb-4">
                            <p>{teacher.subjects.map(s => language === 'ar' ? s.ar : s.en).join(', ')}</p>
                            <div className="flex items-center gap-2">
                                <DollarSign size={16} className="text-green-500" />
                                <span>{formatPrice(teacher.hourlyRate)} / {t('hour')}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleBookNow(teacher)}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                            {t('bookNow')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};