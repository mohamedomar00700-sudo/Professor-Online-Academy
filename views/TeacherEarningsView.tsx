
import React from 'react';
import { DollarSign, CheckCircle, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const TeacherEarningsView: React.FC = () => {
    const { t, bookedSessions, formatPrice } = useAppContext();
    const teacherId = 3; // Mohammed Salem

    const completedSessions = bookedSessions.filter(
        s => s.teacherId === teacherId && s.status === 'completed'
    );

    const totalEarnings = completedSessions.reduce((acc, session) => {
        const price = parseFloat(session.price.split(' ')[0]);
        // Assuming price in booked session is always in SAR for base calculation
        // This might need adjustment if booked price currency varies
        return acc + price;
    }, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8">{t('earningsReport')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-600 mb-2">{t('earningsThisMonth')}</h3>
                    <p className="text-3xl font-bold text-green-600">{formatPrice(totalEarnings)}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-600 mb-2">{t('completedSessions')}</h3>
                    <p className="text-3xl font-bold text-blue-600">{completedSessions.length}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{t('transactionHistory')}</h3>
                <div className="space-y-3">
                    {completedSessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div>
                                <p className="font-medium">{t('paymentForSession')} - {session.subject}</p>
                                <p className="text-sm text-gray-500">{session.date} | {t('student')}: {session.studentName}</p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                                <p className="font-semibold text-lg text-green-600">
                                    +{session.price}
                                </p>
                                <button className="text-gray-500 hover:text-blue-600">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};