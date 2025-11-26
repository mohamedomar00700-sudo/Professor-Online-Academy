
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const AdminSessionsView: React.FC = () => {
    const { t, bookedSessions } = useAppContext();

    const getStatusChip = (status: 'scheduled' | 'completed' | 'cancelled') => {
        switch (status) {
            case 'scheduled':
                return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{t('scheduled')}</span>;
            case 'completed':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{t('completed')}</span>;
            case 'cancelled':
                return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">{t('cancelled')}</span>;
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('sessions')}</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">{t('student')}</th>
                                <th className="p-3">{t('teacher')}</th>
                                <th className="p-3">{t('subject')}</th>
                                <th className="p-3">{t('date')}</th>
                                <th className="p-3">{t('status')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookedSessions.map(session => (
                                <tr key={session.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{session.studentName}</td>
                                    <td className="p-3 text-gray-600">{session.teacher}</td>
                                    <td className="p-3 text-gray-600">{session.subject}</td>
                                    <td className="p-3 text-gray-600">{session.date}</td>
                                    <td className="p-3">{getStatusChip(session.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};