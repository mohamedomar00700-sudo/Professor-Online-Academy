
import React from 'react';
import { User, Hash } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const TeacherStudentsView: React.FC = () => {
    const { t, bookedSessions } = useAppContext();
    const teacherId = 3; // Mohammed Salem

    const teacherStudentSessions = bookedSessions.filter(s => s.teacherId === teacherId);
    
    const students = Array.from(new Set(teacherStudentSessions.map(s => s.studentId)))
        .map(studentId => {
            const studentSessions = teacherStudentSessions.filter(s => s.studentId === studentId);
            return {
                id: studentId,
                name: studentSessions[0].studentName,
                totalSessions: studentSessions.length,
                avatar: `https://i.pravatar.cc/150?u=${studentId}`
            };
        });

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('myStudents')}</h2>

            {students.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                        <div key={student.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                            <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-full mb-4 border-4 border-gray-200" />
                            <h3 className="font-bold text-lg text-gray-800">{student.name}</h3>
                            
                            <div className="flex items-center gap-2 text-gray-500 my-4">
                                <Hash size={16} />
                                <span>{t('totalSessions')}: {student.totalSessions}</span>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-2 mt-auto rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                                <User size={16} />
                                {t('viewStudentProfile')}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                    <div className="text-6xl mb-4">🤷</div>
                    <h3 className="text-xl font-semibold mb-2">{t('noStudentsFound')}</h3>
                </div>
            )}
        </div>
    );
};