
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const ComingSoon: React.FC = () => {
    const { t, isRTL } = useAppContext();
    return (
        <div className={`text-center py-12 px-6`}>
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold mb-2">{t('inDevelopment')}</h2>
            <p className="text-gray-600">{t('comingSoon')}</p>
        </div>
    );
};