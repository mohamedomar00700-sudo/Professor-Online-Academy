
import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import * as api from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';

interface AddTeacherModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ onClose, onSuccess }) => {
  const { t, isRTL, grades } = useAppContext();
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    email: '',
    password: '',
    gender: 'male',
    subjects_en: [] as string[],
    hourlyRate: '',
    avatar: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const allSubjects = useMemo(() => {
    const subjectSet = new Map<string, { en: string; ar: string }>();
    grades.forEach(grade => {
        grade.subjects.forEach(subject => {
            if (!subjectSet.has(subject.en)) {
                subjectSet.set(subject.en, subject);
            }
        });
    });
    return Array.from(subjectSet.values());
  }, [grades]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subjectEn: string) => {
    setFormData(prev => {
        const newSubjects = prev.subjects_en.includes(subjectEn)
            ? prev.subjects_en.filter(s => s !== subjectEn)
            : [...prev.subjects_en, subjectEn];
        return { ...prev, subjects_en: newSubjects };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name_ar || !formData.name_en || !formData.email || !formData.password || formData.subjects_en.length === 0 || !formData.hourlyRate) {
        setError('Please fill all required fields.');
        return;
    }
    
    setIsLoading(true);
    try {
      const subjects_ar = formData.subjects_en.map(subEn => {
        return allSubjects.find(s => s.en === subEn)?.ar || subEn;
      });

      await api.addTeacher({ ...formData, subjects_ar });
      alert('Teacher added successfully! A confirmation email has been sent to the user.');
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to add teacher.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}>
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">Add New Teacher</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium">Full Name (Arabic)</label>
                <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Full Name (English)</label>
                <input type="text" name="name_en" value={formData.name_en} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">{t('teacherGender')}</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border rounded bg-white">
                <option value="male">{t('male')}</option>
                <option value="female">{t('female')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Hourly Rate (SAR)</label>
              <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">{t('subjects')}</label>
            <div className="p-2 border rounded max-h-32 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allSubjects.map(subject => (
                    <label key={subject.en} className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={formData.subjects_en.includes(subject.en)}
                            onChange={() => handleSubjectChange(subject.en)}
                        />
                        <span>{isRTL ? subject.ar : subject.en}</span>
                    </label>
                ))}
            </div>
          </div>
           <div>
            <label className="block text-sm font-medium">Avatar URL (Optional)</label>
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}
          
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={isLoading} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:bg-green-300">
                {isLoading && <LoadingSpinner />}
                {isLoading ? 'Saving...' : 'Save Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};