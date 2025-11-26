
import React, { useState } from 'react';
import { User, Video } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookedSession } from '../types';

export const ParentSessionsView: React.FC = () => {
    const { t, bookedSessions, childrenData } = useAppContext();
    const [selectedChildId, setSelectedChildId] = useState<string>('all');
    
    const childrenIds = childrenData.map(c => c.id);
    
    const parentSessions = bookedSessions.filter(session => childrenIds.includes(session.studentId));
    
    const filteredSessions = selectedChildId === 'all'
        ? parentSessions
        : parentSessions.filter(session => session.studentId === parseInt(selectedChildId));

    const renderSessionStatus = (session: BookedSession) => {
        switch (session.status) {
            case 'scheduled':
                return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{t('scheduled')}</span>;
            case 'completed':
                return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{t('completed')}</span>;
            case 'cancelled':
                return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{t('cancelled')}</span>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('allSessions')}</h2>

            <div className="mb-6">
                <label htmlFor="child-filter" className="block text-sm font-medium text-gray-700 mb-1">{t('filterByChild')}</label>
                <select
                    id="child-filter"
                    value={selectedChildId}
                    onChange={e => setSelectedChildId(e.target.value)}
                    className="w-full max-w-xs p-2 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="all">{t('allChildren')}</option>
                    {childrenData.map(child => (
                        <option key={child.id} value={child.id}>{child.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {filteredSessions.length > 0 ? (
                    filteredSessions.map(session => (
                        <div key={session.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <div className="text-3xl p-3 bg-gray-100 rounded-full">
                                        <User className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{session.subject}</h3>
                                        <p className="text-sm text-gray-600">{t('childName')}: {session.studentName}</p>
                                        <p className="text-sm text-gray-500">{t('teacher')}: {session.teacher}</p>
                                        <p className="text-xs text-gray-500">{session.day} - {session.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 self-end sm:self-center">
                                    {renderSessionStatus(session)}
                                    {session.status === 'scheduled' && (
                                         <a href={session.zoomLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-1 transition-colors text-sm">
                                            <Video size={14} />
                                            {t('enterSession')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <div className="text-6xl mb-4">🗓️</div>
                        <h3 className="text-xl font-semibold mb-2">{t('noBookedSessions')}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};