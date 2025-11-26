
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, UserType, BookedSession, Notification, Grade, Teacher, Child } from '../types';
import { currencies } from '../constants';
import * as api from '../services/api';
import { supabase } from '../services/supabaseClient';
import { Session, RealtimeChannel } from '@supabase/supabase-js';


const mockTranslations = {
  en: {
    academy: 'Professor Online Academy',
    tagline: 'Your gateway to personalized learning.',
    studentLogin: 'Login as Student',
    parentLogin: 'Login as Parent',
    teacherLogin: 'Login as Teacher',
    adminLogin: 'Login as Admin',
    home: 'Home',
    bookSession: 'Book a Session',
    mySessions: 'My Sessions',
    progress: 'Progress',
    billing: 'Billing',
    logout: 'Logout',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    menu: 'Menu',
    children: 'Children',
    sessions: 'Sessions',
    schedule: 'Schedule',
    students: 'Students',
    availability: 'Availability',
    earnings: 'Earnings',
    adminDashboard: 'Admin Dashboard',
    activeTeachers: 'Active Teachers',
    finances: 'Finances',
    inDevelopment: 'In Development',
    comingSoon: 'This feature is coming soon!',
    grade: 'Grade',
    subject: 'Subject',
    searchForTeacher: 'Search for a teacher',
    enterTeacherName: 'Enter teacher name...',
    reviews: 'reviews',
    sar: 'SAR',
    hour: 'hour',
    bookNow: 'Book Now',
    sessionBookedSuccessfully: 'Session booked successfully!',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    enterSession: 'Enter Session',
    sessionRated: 'Session Rated',
    rateSession: 'Rate Session',
    noSessions: 'No Sessions Booked Yet',
    startLearning: 'Start your learning journey by booking your first session.',
    teacher: 'Teacher',
    currentBalance: 'Current Balance',
    addFunds: 'Add Funds',
    transactionHistory: 'Transaction History',
    mathematicsSession: 'Mathematics Session',
    chemistrySession: 'Chemistry Session',
    topUp: 'Top Up',
    physicsSession: 'Physics Session',
    progressReport: 'Progress Report',
    attendancePercentage: 'Attendance',
    averageGrades: 'Average Grades',
    overallLevel: 'Overall Level',
    excellent: 'Excellent',
    veryGood: 'Very Good',
    subjectPerformance: 'Subject Performance',
    mathematics: 'Mathematics',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    teacherDashboard: 'Teacher Dashboard',
    todaySessions: "Today's Sessions",
    monthlyEarnings: 'Monthly Earnings',
    upcomingSchedule: 'Upcoming Schedule',
    confirmed: 'Confirmed',
    pending: 'Pending',
    startSession: 'Start Session',
    registeredChildren: 'Registered Children',
    childrenPerformance: "Children's Performance",
    sessionLink: 'Session Link',
    totalStudents: 'Total Students',
    monthlyRevenue: 'Monthly Revenue',
    recentRegistrations: 'Recent Registrations',
    parent: 'Parent',
    ago: 'ago',
    minutes: 'minutes',
    popularSessions: 'Popular Sessions',
    yourRating: 'Your Rating',
    leaveComment: 'Leave a comment (optional)',
    submitRating: 'Submit Rating',
    setYourAvailability: 'Set Your Availability',
    time: 'Time',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    available: 'Available',
    saveChanges: 'Save Changes',
    teacherSchedule: 'Teacher Schedule',
    myStudents: 'My Students',
    totalSessions: 'Total Sessions',
    viewStudentProfile: 'View Profile',
    noStudentsFound: 'No students found yet.',
    earningsReport: 'Earnings Report',
    earningsThisMonth: 'Earnings This Month',
    paymentForSession: 'Payment for session',
    childName: 'Child Name',
    allSessions: 'All Sessions',
    filterByChild: 'Filter by child',
    allChildren: 'All Children',
    noBookedSessions: 'No sessions found for the selected child.',
    subjects: 'Subjects',
    rating: 'Rating',
    status: 'Status',
    active: 'Active',
    date: 'Date',
    totalRevenue: 'Total Revenue',
    platformFee: 'Platform Fee',
    teacherPayouts: 'Teacher Payouts',
    grade10: 'Grade 10',
    grade11: 'Grade 11',
    chooseTeacher: 'Find the perfect teacher for you.',
    completedSessions: 'Completed Sessions',
    attendanceRate: 'Attendance Rate',
    bookFirstSession: 'Book Your First Session',
    trackProgress: 'Track Your Progress',
    monitorPerformance: 'Monitor your performance and grades.',
    upcomingSessions: 'Upcoming Sessions',
    join: 'Join',
    teacherGender: 'Teacher Gender',
    allGenders: 'All',
    male: 'Male',
    female: 'Female',
    currency: 'Currency',
    viewProgress: 'View Progress',
    activeStudents: 'Active Students',
    student: 'Student',
  },
  ar: {
    academy: 'أكاديمية أستاذ أونلاين',
    tagline: 'بوابتك للتعلم المخصص.',
    studentLogin: 'تسجيل الدخول كطالب',
    parentLogin: 'تسجيل الدخول كولي أمر',
    teacherLogin: 'تسجيل الدخول كمدرس',
    adminLogin: 'تسجيل الدخول كمسؤول',
    home: 'الرئيسية',
    bookSession: 'احجز جلسة',
    mySessions: 'جلساتي',
    progress: 'التقدم',
    billing: 'الفواتير',
    logout: 'تسجيل الخروج',
    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة',
    menu: 'القائمة',
    children: 'الأبناء',
    sessions: 'الجلسات',
    schedule: 'الجدول الزمني',
    students: 'الطلاب',
    availability: 'التوافر',
    earnings: 'الأرباح',
    adminDashboard: 'لوحة تحكم المسؤول',
    activeTeachers: 'المدرسون النشطون',
    finances: 'المالية',
    inDevelopment: 'قيد التطوير',
    comingSoon: 'هذه الميزة ستتوفر قريباً!',
    grade: 'الصف الدراسي',
    subject: 'المادة',
    searchForTeacher: 'ابحث عن مدرس',
    enterTeacherName: 'أدخل اسم المدرس...',
    reviews: 'تقييمات',
    sar: 'ريال',
    hour: 'ساعة',
    bookNow: 'احجز الآن',
    sessionBookedSuccessfully: 'تم حجز الجلسة بنجاح!',
    scheduled: 'مجدولة',
    completed: 'مكتملة',
    cancelled: 'ملغاة',
    enterSession: 'ادخل الجلسة',
    sessionRated: 'تم تقييم الجلسة',
    rateSession: 'تقييم الجلسة',
    noSessions: 'لا توجد جلسات محجوزة بعد',
    startLearning: 'ابدأ رحلتك التعليمية بحجز جلستك الأولى.',
    teacher: 'المدرس',
    currentBalance: 'الرصيد الحالي',
    addFunds: 'إضافة رصيد',
    transactionHistory: 'سجل المعاملات',
    mathematicsSession: 'جلسة رياضيات',
    chemistrySession: 'جلسة كيمياء',
    topUp: 'شحن رصيد',
    physicsSession: 'جلسة فيزياء',
    progressReport: 'تقرير التقدم',
    attendancePercentage: 'نسبة الحضور',
    averageGrades: 'متوسط الدرجات',
    overallLevel: 'المستوى العام',
    excellent: 'ممتاز',
    veryGood: 'جيد جدًا',
    subjectPerformance: 'الأداء في المواد',
    mathematics: 'الرياضيات',
    physics: 'الفيزياء',
    chemistry: 'الكيمياء',
    biology: 'الأحياء',
    teacherDashboard: 'لوحة تحكم المدرس',
    todaySessions: 'جلسات اليوم',
    monthlyEarnings: 'الأرباح الشهرية',
    upcomingSchedule: 'الجدول القادم',
    confirmed: 'مؤكدة',
    pending: 'معلقة',
    startSession: 'ابدأ الجلسة',
    registeredChildren: 'الأبناء المسجلون',
    childrenPerformance: 'أداء الأبناء',
    sessionLink: 'رابط الجلسة',
    totalStudents: 'إجمالي الطلاب',
    monthlyRevenue: 'الإيرادات الشهرية',
    recentRegistrations: 'التسجيلات الأخيرة',
    parent: 'ولي الأمر',
    ago: 'منذ',
    minutes: 'دقائق',
    popularSessions: 'الجلسات الشائعة',
    yourRating: 'تقييمك',
    leaveComment: 'اترك تعليقًا (اختياري)',
    submitRating: 'إرسال التقييم',
    setYourAvailability: 'حدد أوقات توافرك',
    time: 'الوقت',
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    available: 'متاح',
    saveChanges: 'حفظ التغييرات',
    teacherSchedule: 'جدول المدرس',
    myStudents: 'طلابي',
    totalSessions: 'مجموع الجلسات',
    viewStudentProfile: 'عرض الملف الشخصي',
    noStudentsFound: 'لم يتم العثور على طلاب بعد.',
    earningsReport: 'تقرير الأرباح',
    earningsThisMonth: 'أرباح هذا الشهر',
    paymentForSession: 'دفعة مقابل جلسة',
    childName: 'اسم الطفل',
    allSessions: 'كل الجلسات',
    filterByChild: 'تصفية حسب الطفل',
    allChildren: 'كل الأطفال',
    noBookedSessions: 'لا توجد جلسات للطفل المحدد.',
    subjects: 'المواد',
    rating: 'التقييم',
    status: 'الحالة',
    active: 'نشط',
    date: 'التاريخ',
    totalRevenue: 'إجمالي الإيرادات',
    platformFee: 'رسوم المنصة',
    teacherPayouts: 'دفعات المدرسين',
    grade10: 'الصف العاشر',
    grade11: 'الصف الحادي عشر',
    chooseTeacher: 'ابحث عن المدرس المثالي لك.',
    completedSessions: 'الجلسات المكتملة',
    attendanceRate: 'معدل الحضور',
    bookFirstSession: 'احجز جلستك الأولى',
    trackProgress: 'تتبع تقدمك',
    monitorPerformance: 'راقب أداءك ودرجاتك.',
    upcomingSessions: 'الجلسات القادمة',
    join: 'انضم',
    teacherGender: 'جنس المدرس',
    allGenders: 'الكل',
    male: 'ذكر',
    female: 'أنثى',
    currency: 'Currency',
    viewProgress: 'عرض التقدم',
    activeStudents: 'الطلاب النشطون',
    student: 'طالب',
  },
};

// Represents the user profile data stored in your 'profiles' table
interface UserProfile {
  id: string; // Should match auth.users.id
  full_name: string;
  user_type: UserType;
  // Add any other profile fields here
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  userType: UserType;
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  isRTL: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  bookedSessions: BookedSession[];
  setBookedSessions: React.Dispatch<React.SetStateAction<BookedSession[]>>;
  grades: Grade[];
  teachers: Teacher[];
  childrenData: Child[];
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (priceInSar: number) => string;
  reloadData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currency, setCurrency] = useState<string>('saudi');
  
  // Auth and data states
  const [session, setSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true to check session

  // Data states, initialized as empty
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);
  const [childrenData, setChildrenData] = useState<Child[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const userType: UserType = currentUser?.user_type || '';
  const isAuthenticated = !!session;
  const isRTL = language === 'ar';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const reloadData = useCallback(async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (user) {
        console.log("Reloading data from Google Sheet...");
        setIsLoading(true);
        try {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            const data = await api.fetchData();
            
            setBookedSessions(data.bookedSessions);
            setGrades(data.grades);
            setTeachers(data.teachers);

            if (profile?.user_type === 'parent') {
                const myChildren = data.childrenData.filter(c => c.parent_id === user.id);
                setChildrenData(myChildren);
            } else if (profile?.user_type === 'admin') {
                setChildrenData(data.childrenData); // Admin sees all students
            } else {
                 setChildrenData([]);
            }
        } catch (error) {
            console.error("Failed to reload data:", error);
        } finally {
            setIsLoading(false);
        }
    }
  }, []);

  // Listen to Supabase auth changes
  useEffect(() => {
    let profileChannel: RealtimeChannel | null = null;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoading(true);
        // Clean up previous channel subscription
        if (profileChannel) {
            supabase.removeChannel(profileChannel);
            profileChannel = null;
        }

        try {
            setSession(session);
            if (session) {
                // Fetch user profile
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile (this is expected for new users):', error.message);
                    setCurrentUser(null);
                    setNotifications([]); setBookedSessions([]); setChildrenData([]); setGrades([]); setTeachers([]);
                } else {
                    setCurrentUser(profile);
                    // Fetch dashboard data from Google Sheet
                    const data = await api.fetchData();
                    setBookedSessions(data.bookedSessions);
                    
                    if (profile.user_type === 'parent') {
                        const myChildren = data.childrenData.filter(c => c.parent_id === session.user.id);
                        setChildrenData(myChildren);
                    } else if (profile.user_type === 'admin') {
                        setChildrenData(data.childrenData);
                    } else {
                        setChildrenData([]);
                    }

                    setGrades(data.grades);
                    setTeachers(data.teachers);

                    // Set up realtime listener for profile changes
                    profileChannel = supabase
                        .channel(`public:profiles:id=eq.${session.user.id}`)
                        .on<UserProfile>(
                            'postgres_changes',
                            { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
                            (payload) => {
                                console.log('Profile updated in real-time:', payload.new);
                                setCurrentUser(payload.new as UserProfile);
                            }
                        )
                        .subscribe();
                }
            } else {
                // User is logged out
                setCurrentUser(null);
                setNotifications([]); setBookedSessions([]); setChildrenData([]); setGrades([]); setTeachers([]);
            }
        } catch (e) {
            console.error("An unexpected error occurred during auth state change:", e);
            setCurrentUser(null); setSession(null);
        } finally {
            setIsLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
      if (profileChannel) {
          supabase.removeChannel(profileChannel);
      }
    };
  }, []);


  const login = async (email: string, password: string) => {
    await api.login(email, password);
    setCurrentView('home');
  };

  const logout = async () => {
    await api.logout();
    setCurrentUser(null);
    setNotifications([]); setBookedSessions([]); setChildrenData([]); setGrades([]); setTeachers([]);
  };

  const t = (key: string): string => {
    const translationsForLang = mockTranslations[language] as { [key:string]: string };
    return translationsForLang[key] || key;
  };

  const formatPrice = (priceInSar: number) => {
    const selectedCurrency = currencies[currency];
    if (!selectedCurrency) return `${(priceInSar || 0).toFixed(2)} SAR`;
    const convertedPrice = (priceInSar || 0) * selectedCurrency.rate;
    return `${convertedPrice.toFixed(2)} ${selectedCurrency.symbol}`;
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.classList.toggle('font-arabic', isRTL);
  }, [isRTL, language]);

  const value = {
    language, setLanguage, t,
    userType, currentUser, isAuthenticated, isLoading, login, logout,
    currentView, setCurrentView,
    isRTL, isMobile, isSidebarOpen, setIsSidebarOpen,
    notifications, setNotifications,
    bookedSessions, setBookedSessions,
    grades, teachers, childrenData,
    currency, setCurrency, formatPrice,
    reloadData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};