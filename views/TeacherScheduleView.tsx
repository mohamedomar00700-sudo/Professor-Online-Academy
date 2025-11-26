
import React from 'react';
import { Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const TeacherScheduleView: React.FC = () => {
    const { t, bookedSessions } = useAppContext();
    // Assuming the logged in teacher is Mohammed Salem (id: 3) for this demo
    const teacherId = 3; 
    const teacherSessions = bookedSessions.filter(s => s.teacherId === teacherId && s.status === 'scheduled');

    const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
    const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 9}:00 AM`); // 9 AM to 8 PM

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('teacherSchedule')}</h2>
            <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
                <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                    <div className="font-bold text-center p-2"></div>
                    {daysOfWeek.map(day => (
                        <div key={day} className="font-bold text-center p-2 bg-gray-100 rounded-md">{day}</div>
                    ))}

                    {timeSlots.map(time => (
                        <React.Fragment key={time}>
                            <div className="font-semibold text-center p-2 text-sm text-gray-600">{time}</div>
                            {daysOfWeek.map(day => {
                                const session = teacherSessions.find(s => s.day === day && s.time === time);
                                return (
                                    <div key={`${day}-${time}`} className="p-2 border rounded-md h-24 bg-gray-50">
                                        {session && (
                                            <div className="bg-blue-100 text-blue-800 rounded-md p-2 h-full flex flex-col justify-center text-center text-xs">
                                                <p className="font-bold">{session.subject}</p>
                                                <p>{session.studentName}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};