
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import * as api from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

interface AddStudentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onSuccess }) => {
  const { t, isRTL, grades, language } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    parentId: '',
    grade: grades[0]?.name.en || '',
    avatar: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.fullName || !formData.email || !formData.password || !formData.parentId || !formData.grade) {
        setError('Please fill all required fields.');
        setIsLoading(false);
        return;
    }

    try {
      await api.addStudent(formData);
      alert('Student added successfully! A confirmation email has been sent to the user.');
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to add student.');
    } finally {
      setIsLoading(false);
    }
  };

  const noGradesAvailable = grades.length === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up">
        <button onClick={onClose} className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}>
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">Add New Student</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Parent User ID</label>
            <input type="text" name="parentId" value={formData.parentId} onChange={handleChange} required className="w-full p-2 border rounded" />
            <p className="text-xs text-gray-500 mt-1">Find the Parent's ID (UID) from the Supabase Authentication dashboard.</p>
          </div>
          <div>
            <label className="block text-sm font-medium">{t('grade')}</label>
            <select name="grade" value={formData.grade} onChange={handleChange} required disabled={noGradesAvailable} className="w-full p-2 border rounded bg-white disabled:bg-gray-100">
              {noGradesAvailable ? (
                <option>No grades available</option>
              ) : (
                grades.map(grade => (
                  <option key={grade.id} value={grade.name.en}>
                    {language === 'ar' ? grade.name.ar : grade.name.en}
                  </option>
                ))
              )}
            </select>
             {noGradesAvailable && <p className="text-xs text-red-500 mt-1">Please add grades to the Google Sheet first.</p>}
          </div>
           <div>
            <label className="block text-sm font-medium">Avatar URL (Optional)</label>
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
          
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isLoading || noGradesAvailable} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-blue-300">
                {isLoading && <LoadingSpinner />}
                {isLoading ? 'Saving...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};