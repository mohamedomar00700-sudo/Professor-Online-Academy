import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { WeeklySchedule } from '../types';
import * as api from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AvailabilityView: React.FC = () => {
    const { t, teachers, currentUser, reloadData } = useAppContext();

    const currentTeacher = useMemo(() => 
        teachers.find(teacher => teacher.name.en === currentUser?.full_name || teacher.name.ar === currentUser?.full_name),
        [teachers, currentUser]
    );

    const [schedule, setSchedule] = useState<WeeklySchedule>({});
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentTeacher) {
            // Deep copy to prevent direct mutation of context state
            setSchedule(JSON.parse(JSON.stringify(currentTeacher.weeklySchedule)));
        }
    }, [currentTeacher]);

    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
    
    const allPossibleTimeSlots = Array.from({ length: (18 - 9) * 2 }, (_, i) => {
        const hour = 9 + Math.floor(i / 2);
        const minute = (i % 2) * 30;
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
    });

    const toggleSlot = (day: string, time: string) => {
        setSchedule(prevSchedule => {
            const newSchedule = { ...prevSchedule };
            const daySchedule = newSchedule[day] || [];
            const newDaySchedule = daySchedule.includes(time)
                ? daySchedule.filter(t => t !== time)
                : [...daySchedule, time].sort((a, b) => {
                    // Custom sort for AM/PM times
                    const [timeA, periodA] = a.split(' ');
                    const [timeB, periodB] = b.split(' ');
                    if (periodA !== periodB) return periodA === 'AM' ? -1 : 1;
                    return timeA.localeCompare(timeB);
                });
            newSchedule[day] = newDaySchedule;
            return newSchedule;
        });
    };

    const handleSaveChanges = async () => {
        if (!currentTeacher) return;
        setIsSaving(true);
        setError('');
        try {
            await api.updateTeacherAvailability(currentTeacher.id, schedule);
            await reloadData();
            alert('Availability updated successfully!');
        } catch (err: any) {
            setError(err.message || 'Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!currentTeacher) {
        return <div className="text-center p-10">Loading teacher data... Make sure your profile name matches the teacher list.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-2">{t('setYourAvailability')}</h2>
            <p className="text-gray-600 mb-6">Click on a time slot to mark it as available for booking.</p>

            <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
                <table className="w-full text-center border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border w-32 font-semibold">{t('time')}</th>
                            {daysOfWeek.map(day => (
                                <th key={day} className="p-3 border font-semibold">{t(day)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allPossibleTimeSlots.map(time => (
                            <tr key={time} className="hover:bg-gray-50">
                                <td className="p-1 border font-mono text-sm text-gray-700">{time}</td>
                                {daysOfWeek.map(day => (
                                    <td key={`${day}-${time}`} className="p-1 border">
                                        <button
                                            onClick={() => toggleSlot(day, time)}
                                            className={`w-full h-10 rounded-md transition-all duration-200 text-xs font-semibold border ${
                                                schedule[day]?.includes(time)
                                                ? 'bg-green-500 hover:bg-green-600 text-white border-green-600 shadow-md'
                                                : 'bg-gray-100 hover:bg-green-100 border-gray-200 hover:border-green-300'
                                            }`}
                                            aria-label={`Set ${t(day)} at ${time} as ${schedule[day]?.includes(time) ? 'unavailable' : 'available'}`}
                                        >
                                            {schedule[day]?.includes(time) ? t('available') : ''}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-end items-center gap-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isSaving ? <LoadingSpinner /> : t('saveChanges')}
                </button>
            </div>
        </div>
    );
};