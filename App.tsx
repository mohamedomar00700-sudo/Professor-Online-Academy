
import React from 'react';
import { useAppContext } from './context/AppContext';
import { LoginScreen } from './views/LoginScreen';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { StudentDashboard } from './views/StudentDashboard';
import { BookSessionView } from './views/BookSessionView';
import { MySessionsView } from './views/MySessionsView';
import { BillingView } from './views/BillingView';
import { ProgressView } from './views/ProgressView';
import { TeacherDashboard } from './views/TeacherDashboard';
import { ParentDashboard } from './views/ParentDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { AvailabilityView } from './views/AvailabilityView';
import { TeacherScheduleView } from './views/TeacherScheduleView';
import { TeacherStudentsView } from './views/TeacherStudentsView';
import { TeacherEarningsView } from './views/TeacherEarningsView';
import { ParentChildrenView } from './views/ParentChildrenView';
import { ParentSessionsView } from './views/ParentSessionsView';
import { AdminTeachersView } from './views/AdminTeachersView';
import { AdminStudentsView } from './views/AdminStudentsView';
import { AdminSessionsView } from './views/AdminSessionsView';
import { AdminFinancesView } from './views/AdminFinancesView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AddStudentModal } from './components/AddStudentModal';
import { AddTeacherModal } from './components/AddTeacherModal';

const App: React.FC = () => {
    const { userType, currentView, isRTL, isMobile, isSidebarOpen, setIsSidebarOpen, isAuthenticated, isLoading } = useAppContext();

    // Show a loading spinner while checking for an existing session
    if (isLoading) {
        return <LoadingSpinner overlay />;
    }
    
    if (!isAuthenticated) {
        return <LoginScreen />;
    }

    const renderView = () => {
        switch (userType) {
            case 'student':
                switch (currentView) {
                    case 'home': return <StudentDashboard />;
                    case 'book-session': return <BookSessionView />;
                    case 'my-sessions': return <MySessionsView />;
                    case 'billing': return <BillingView />;
                    case 'progress': return <ProgressView />;
                    default: return <StudentDashboard />;
                }
            case 'parent':
                switch (currentView) {
                    case 'home': return <ParentDashboard />;
                    case 'children': return <ParentChildrenView />;
                    case 'sessions': return <ParentSessionsView />;
                    case 'billing': return <BillingView />;
                    case 'progress': return <ProgressView />;
                    default: return <ParentDashboard />;
                }
            case 'teacher':
                switch (currentView) {
                    case 'home': return <TeacherDashboard />;
                    case 'schedule': return <TeacherScheduleView />;
                    case 'students': return <TeacherStudentsView />;
                    case 'availability': return <AvailabilityView />;
                    case 'earnings': return <TeacherEarningsView />;
                    default: return <TeacherDashboard />;
                }
            case 'admin':
                 switch (currentView) {
                    case 'home': return <AdminDashboard />;
                    case 'teachers': return <AdminTeachersView />;
                    case 'students': return <AdminStudentsView />;
                    case 'sessions': return <AdminSessionsView />;
                    case 'finances': return <AdminFinancesView />;
                    default: return <AdminDashboard />;
                }
            default:
                // This could be a fallback or a "profile not complete" screen
                return <StudentDashboard />; 
        }
    };
    
    return (
        <div className={`bg-gray-100 min-h-screen ${isRTL ? 'font-arabic' : ''}`}>
            <Navigation />
            <Sidebar />
            {isMobile && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            <main className={`pt-20 transition-all duration-300 ease-in-out ${!isMobile ? (isRTL ? 'lg:mr-64' : 'lg:ml-64') : ''}`}>
                <div className="p-0 sm:p-6">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default App;