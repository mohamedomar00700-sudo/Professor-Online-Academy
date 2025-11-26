
import React from 'react';
import { Download, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { currencies } from '../constants';

export const BillingView: React.FC = () => {
    const { t, formatPrice, currency } = useAppContext();

    const transactions = [
        { id: 'txn_12345', date: '2024-07-20', description: t('mathematicsSession'), amount: -150, currency: 'SAR' },
        { id: 'txn_12346', date: '2024-07-18', description: t('chemistrySession'), amount: -160, currency: 'SAR' },
        { id: 'txn_12347', date: '2024-07-15', description: t('topUp'), amount: 500, currency: 'SAR' },
        { id: 'txn_12348', date: '2024-07-12', description: t('physicsSession'), amount: -145, currency: 'SAR' },
    ];
    
    const currentBalanceSAR = 45;

    return (
        <div className={`max-w-4xl mx-auto p-6`}>
            <h2 className="text-3xl font-bold mb-8">{t('billing')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-600 mb-2">{t('currentBalance')}</h3>
                    <p className="text-3xl font-bold text-blue-600">{formatPrice(currentBalanceSAR)}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center hover:shadow-lg transition-shadow">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors font-semibold">
                        <Plus size={20} />
                        {t('addFunds')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{t('transactionHistory')}</h3>
                <div className="space-y-3">
                    {transactions.map(tx => {
                        const selectedCurrency = currencies[currency];
                        const convertedAmount = tx.amount * selectedCurrency.rate;

                        return (
                            <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div>
                                    <p className="font-medium">{tx.description}</p>
                                    <p className="text-sm text-gray-500">{tx.date}</p>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <p className={`font-semibold text-lg ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.amount > 0 ? '+' : ''}{convertedAmount.toFixed(2)} {selectedCurrency.symbol}
                                    </p>
                                    <button className="text-gray-500 hover:text-blue-600">
                                        <Download size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};