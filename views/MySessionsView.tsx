
import React, { useState } from 'react';
import { Video, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookedSession } from '../types';
import { RatingModal } from '../components/RatingModal';

export const MySessionsView: React.FC = () => {
  const { t, bookedSessions, setCurrentView, setBookedSessions } = useAppContext();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<BookedSession | null>(null);

  const handleOpenRatingModal = (session: BookedSession) => {
    setSelectedSession(session);
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
    setSelectedSession(null);
  };

  const handleRatingSubmit = (sessionId: number, rating: number, comment: string) => {
    // In a real app, this would be an API call to update the rating in the Google Sheet.
    // For now, we just update the local state.
    setBookedSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === sessionId ? { ...session, isRated: true } : session
      )
    );
    console.log(`Session ${sessionId} rated with ${rating} stars. Comment: ${comment}`);
    handleCloseRatingModal();
  };

  const renderSessionActions = (session: BookedSession) => {
    switch (session.status) {
      case 'scheduled':
        return (
          <>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{t('scheduled')}</span>
            <a href={session.zoomLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors">
              <Video size={16} />
              {t('enterSession')}
            </a>
          </>
        );
      case 'completed':
        return (
          <>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{t('completed')}</span>
            {session.isRated ? (
              <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">
                <Star size={16} className="text-yellow-500" fill="currentColor"/>
                <span className="font-medium">{t('sessionRated')}</span>
              </div>
            ) : (
              <button onClick={() => handleOpenRatingModal(session)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t('rateSession')}
              </button>
            )}
          </>
        );
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{t('cancelled')}</span>;
      default:
        return null;
    }
  };
  
  return (
    <>
      <div className={`max-w-4xl mx-auto p-6`}>
        <h2 className="text-3xl font-bold mb-8">{t('mySessions')}</h2>
        
        <div className="space-y-4">
          {bookedSessions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">{t('noSessions')}</h3>
              <p className="text-gray-600 mb-4">{t('startLearning')}</p>
              <button 
                onClick={() => setCurrentView('book-session')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('bookSession')}
              </button>
            </div>
          ) : (
            bookedSessions.map(session => (
              <div key={session.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="text-3xl p-3 bg-blue-50 rounded-full">👨‍🏫</div>
                    <div>
                      <h3 className="font-semibold text-lg">{session.subject}</h3>
                      <p className="text-gray-600">{t('teacher')}: {session.teacher}</p>
                      <p className="text-sm text-gray-500">{session.day} - {session.time}</p>
                      <p className="text-green-600 font-semibold mt-1">{session.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {renderSessionActions(session)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {isRatingModalOpen && selectedSession && (
        <RatingModal
          session={selectedSession}
          onClose={handleCloseRatingModal}
          onSubmit={handleRatingSubmit}
        />
      )}
    </>
  );
};