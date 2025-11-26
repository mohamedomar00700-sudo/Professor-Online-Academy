
import React, { useState } from 'react';
import { User, Globe, Lock, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const LoginScreen: React.FC = () => {
  const { setLanguage, language, t, login, isRTL } = useAppContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await login(email, password);
      // On success, the App component will automatically render the dashboard
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      setIsLoggingIn(false);
    }
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Globe size={20} />
            {language === 'ar' ? 'English' : 'عربي'}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('academy')}</h1>
          <p className="text-gray-600">{t('tagline')}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
             <Mail className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'pr-10' : 'pl-10'}`}
            />
          </div>
          <div className="relative">
            <Lock className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full p-3 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${isRTL ? 'pr-10' : 'pl-10'}`}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 text-lg font-semibold disabled:bg-blue-400"
          >
            {isLoggingIn ? <LoadingSpinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};