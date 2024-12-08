import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './StudentDashboard.css';
import ProfileDropdown from '../Auth/ProfileDropdown';
import IdleTimer from '../Auth/IdleTimer';

const StudentDashboard = () => {
    const location = useLocation();

    return (
        <div className="student-dashboard">
            <IdleTimer />
            <h2>Student Dashboard</h2>
            <nav className="student-nav">
                <Link to="/student/dashboard/achievements" className={location.pathname === '/student/dashboard/achievements' ? 'active' : ''}>Achievements</Link>
                <Link to="/student/dashboard/portfolio" className={location.pathname === '/student/dashboard/portfolio' ? 'active' : ''}>Portfolio</Link>
            </nav>
            <div className="profile-dropdown-student">
                <ProfileDropdown dashboardType="student" />
            </div>
            <div className="route-container">
                <Outlet /> {/* This will render the matched child route */}
            </div>
        </div>
    );
};

export default StudentDashboard;
