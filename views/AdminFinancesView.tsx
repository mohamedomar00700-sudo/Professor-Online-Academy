import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const AdminFinancesView: React.FC = () => {
    const { t, bookedSessions, formatPrice } = useAppContext();

    const totalRevenue = bookedSessions
        .filter(s => s.status === 'completed')
        .reduce((sum, s) => sum + s.price_sar, 0);
    
    const platformFee = totalRevenue * 0.15;
    const teacherPayouts = totalRevenue * 0.85;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">{t('finances')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full"><DollarSign className="text-blue-600" /></div>
                        <div>
                            <p className="text-gray-500">{t('totalRevenue')}</p>
                            <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full"><TrendingUp className="text-green-600" /></div>
                        <div>
                            <p className="text-gray-500">{t('platformFee')}</p>
                            <p className="text-2xl font-bold">{formatPrice(platformFee)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full"><TrendingDown className="text-red-600" /></div>
                        <div>
                            <p className="text-gray-500">{t('teacherPayouts')}</p>
                            <p className="text-2xl font-bold">{formatPrice(teacherPayouts)}</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="bg-white rounded-xl shadow-lg p-6">
                 <h3 className="text-xl font-semibold mb-4">{t('transactionHistory')}</h3>
                 <p className="text-gray-500">{t('comingSoon')}</p>
            </div>
        </div>
    );
};