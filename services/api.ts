import { supabase } from './supabaseClient';
import { Grade, Teacher, Child, BookedSession, WeeklySchedule } from '../types';

// IMPORTANT: Replace this with the Web App URL you copied from Google Apps Script deployment.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbze-lO5HB2fACmknrpUWNBZeP6DeVQx4KW8KfIMK0Qs9IM-jimgNUwKnAQbgZrnIF_Csw/exec';

/**
 * Logs in a user using Supabase Auth.
 * @param email The user's email.
 * @param password The user's password.
 */
export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    // The onAuthStateChange listener in AppContext will handle fetching data.
    return { session: data.session };
};

/**
 * Logs out the current user.
 */
export const logout = async () => {
    await supabase.auth.signOut();
};

// Helper function to transform raw sheet data into app types
const transformGrades = (data: any[]): Grade[] => {
    return data.map(g => ({
        id: g.id,
        name: { ar: g.name_ar, en: g.name_en },
        subjects: (g.subjects_en?.split(',') || []).map((en: string, i: number) => ({ 
            ar: (g.subjects_ar?.split(',') || [])[i] || en, 
            en 
        })),
    }));
};

const transformTeachers = (data: any[]): Teacher[] => {
    return data.map(t => {
        const weeklySchedule: WeeklySchedule = {};
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
        days.forEach(day => {
            const scheduleKey = `schedule_${day}`;
            weeklySchedule[day] = typeof t[scheduleKey] === 'string' && t[scheduleKey] ? t[scheduleKey].split(',') : [];
        });

        return {
            id: Number(t.id),
            name: { ar: t.name_ar, en: t.name_en },
            gender: t.gender,
            subjects: (t.subjects_en?.split(',') || []).map((en: string, i: number) => ({ 
                ar: (t.subjects_ar?.split(',') || [])[i] || en, 
                en 
            })),
            rating: Number(t.rating) || 0,
            reviews: Number(t.reviews) || 0,
            hourlyRate: Number(t.hourlyRate) || 0,
            avatar: t.avatar,
            weeklySchedule,
        };
    });
};

const transformChildren = (data: any[]): Child[] => {
    return data.map(c => ({
        id: Number(c.id),
        parent_id: c.parent_id,
        name: c.name,
        grade: c.grade,
        avatar: c.avatar,
        attendance: Number(c.attendance) || 100,
        averageGrades: Number(c.averageGrades) || 90,
        progressKey: c.progressKey || 'excellent',
    }));
};

const transformSessions = (data: any[], teachers: Teacher[], children: Child[]): BookedSession[] => {
    const teacherMap = new Map(teachers.map(t => [t.id, t]));
    const childMap = new Map(children.map(c => [c.id, c]));

    return data.map(s => {
        const teacher = teacherMap.get(Number(s.teacherId));
        const child = childMap.get(Number(s.studentId));
        const priceNumber = parseFloat(s.price) || 0;

        return {
            id: Number(s.id),
            teacherId: Number(s.teacherId),
            studentId: Number(s.studentId),
            teacher: teacher ? (teacher.name.en || 'Unknown Teacher') : 'Unknown Teacher',
            studentName: child ? (child.name || 'Unknown Student') : 'Unknown Student',
            subject: s.subject_en,
            subject_en: s.subject_en,
            subject_ar: s.subject_ar,
            time: s.time,
            day: s.day,
            date: s.date,
            zoomLink: s.zoomLink,
            status: s.status,
            price_sar: priceNumber,
            price: s.price || `${priceNumber} SAR`,
            isRated: String(s.isRated).toLowerCase() === 'true',
        };
    });
};

/**
 * Fetches all necessary data from the Google Sheet via Apps Script.
 * @returns A promise that resolves to all the necessary data for the dashboard.
 */
export const fetchData = async () => {
    console.log("Fetching data from Google Sheet...");
    if (GOOGLE_SCRIPT_URL.includes('YOUR_APPS_SCRIPT_URL_HERE')) {
        throw new Error("Please set your Google Apps Script URL in services/api.ts");
    }

    const response = await fetch(GOOGLE_SCRIPT_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from Google Sheet: ${response.statusText}`);
    }
    const rawData = await response.json();

    // Transform data into application's types
    const grades = transformGrades(rawData.grades || []);
    const teachers = transformTeachers(rawData.teachers || []);
    const children = transformChildren(rawData.children || []);
    const bookedSessions = transformSessions(rawData.sessions || [], teachers, children);
    
    const data = {
        notifications: [], // Mocked as before
        bookedSessions,
        childrenData: children,
        grades,
        teachers,
    };
    
    console.log("Data fetched successfully from Google Sheet:", data);
    return data;
};

/**
 * Sends data to the Google Sheet via Apps Script.
 * @param action The action to be performed by the script (e.g., 'bookSession').
 * @param data The payload for the action.
 */
const postData = async (action: string, data: object) => {
    if (GOOGLE_SCRIPT_URL.includes('YOUR_APPS_SCRIPT_URL_HERE')) {
        throw new Error("Please set your Google Apps Script URL in services/api.ts");
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify({ action, data }),
    });

    if (!response.ok) {
        throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);
    }

    console.log(`'${action}' request sent to Google Sheet. Assuming success based on OK response.`);
};


/**
 * Sends data to book a new session to the Google Sheet via Apps Script.
 * @param sessionData The data for the new session.
 */
export const bookSession = async (sessionData: object) => {
    await postData('bookSession', sessionData);
    console.log("Session booking request sent to Google Sheet.");
};

/**
 * Updates a teacher's weekly availability in the Google Sheet.
 * @param teacherId The ID of the teacher to update.
 * @param schedule The new weekly schedule object.
 */
export const updateTeacherAvailability = async (teacherId: number, schedule: WeeklySchedule) => {
    const sheetData = {
        teacherId,
        schedule_sunday: schedule.sunday?.join(',') || '',
        schedule_monday: schedule.monday?.join(',') || '',
        schedule_tuesday: schedule.tuesday?.join(',') || '',
        schedule_wednesday: schedule.wednesday?.join(',') || '',
        schedule_thursday: schedule.thursday?.join(',') || '',
    };
    await postData('updateAvailability', sheetData);
    console.log("Teacher availability update request sent to Google Sheet.");
};

/**
 * Creates a new student user and adds their data to Supabase and Google Sheets.
 */
export const addStudent = async (studentData: any) => {
    // 1. Sign up user in Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.signUp({
        email: studentData.email,
        password: studentData.password,
    });
    if (authError) throw authError;
    if (!user) throw new Error("User creation failed in Supabase Auth.");

    // 2. Insert into Supabase profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        full_name: studentData.fullName,
        user_type: 'student',
    });
    if (profileError) {
        // In a real production app, you might want to delete the created auth user here.
        throw profileError;
    }

    // 3. Prepare data for Google Sheet (keys must match sheet headers)
    const sheetData = {
        parent_id: studentData.parentId,
        name: studentData.fullName,
        grade: studentData.grade,
        avatar: studentData.avatar || `https://i.pravatar.cc/150?u=${user.id}`,
        // Default values for other columns
        attendance: 100, 
        averageGrades: 0,
        progressKey: 'new'
    };

    // 4. Post to Google Sheet
    await postData('addStudent', sheetData);
};

/**
 * Creates a new teacher user and adds their data to Supabase and Google Sheets.
 */
export const addTeacher = async (teacherData: any) => {
    // 1. Sign up user
    const { data: { user }, error: authError } = await supabase.auth.signUp({
        email: teacherData.email,
        password: teacherData.password,
    });
    if (authError) throw authError;
    if (!user) throw new Error("User creation failed in Supabase Auth.");

    // 2. Insert profile
    const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        full_name: teacherData.name_en, // Use English name as default full_name
        user_type: 'teacher',
    });
    if (profileError) throw profileError;

    // 3. Prepare sheet data (keys must match sheet headers)
    const sheetData = {
        name_ar: teacherData.name_ar,
        name_en: teacherData.name_en,
        gender: teacherData.gender,
        subjects_en: teacherData.subjects_en.join(','),
        subjects_ar: teacherData.subjects_ar.join(','),
        hourlyRate: teacherData.hourlyRate,
        avatar: teacherData.avatar || `https://i.pravatar.cc/150?u=${user.id}`,
         // Default values for other columns
        rating: 0,
        reviews: 0,
    };

    // 4. Post to Google Sheet
    await postData('addTeacher', sheetData);
};