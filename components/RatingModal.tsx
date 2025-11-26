
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BookedSession } from '../types';

interface RatingModalProps {
  session: BookedSession;
  onClose: () => void;
  onSubmit: (sessionId: number, rating: number, comment: string) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({ session, onClose, onSubmit }) => {
  const { t, isRTL } = useAppContext();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(session.id, rating, comment);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fade-in-up">
        <button onClick={onClose} className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}>
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">{t('rateSession')}</h3>
        <div className="mb-4">
          <p className="font-medium text-gray-700">{session.subject}</p>
          <p className="text-sm text-gray-500">{t('teacher')}: {session.teacher}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('yourRating')}</label>
          <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">{t('leaveComment')}</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('submitRating')}
        </button>
      </div>
    </div>
  );
};