
export type Language = 'ar' | 'en';

export type UserType = 'student' | 'parent' | 'teacher' | 'admin' | '';

export interface Translations {
  [key: string]: {
    [key:string]: string;
  };
}

export interface Grade {
  id: string; // e.g., 'grade10'
  name: { ar: string; en: string };
  subjects: { ar: string; en: string }[];
}

export interface WeeklySchedule {
  [day: string]: string[];
}

export interface Teacher {
  id: number; // Switched to number
  name: { ar: string; en: string };
  gender: 'male' | 'female';
  subjects: { ar: string; en: string }[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  avatar: string;
  weeklySchedule: WeeklySchedule;
}

export interface BookedSession {
  id: number; // Switched to number
  teacher: string;
  teacherId: number; // Switched to number
  studentName: string;
  studentId: number; // Switched to number
  subject: string;
  subject_ar: string;
  subject_en: string;
  time: string;
  day: string;
  date: string;
  zoomLink: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: string;
  price_sar: number;
  isRated?: boolean;
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  type: 'session' | 'booking';
}

export interface Child {
  id: number; // Switched to number
  parent_id: string; // This remains string as it comes from Supabase auth
  name: string;
  grade: string;
  avatar: string;
  attendance: number;
  averageGrades: number;
  progressKey: string;
}

export interface Currency {
  symbol: string;
  code: string;
  rate: number;
}

export interface Currencies {
  [key: string]: Currency;
}