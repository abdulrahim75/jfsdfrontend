import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './CollegeDashboard.css';
import ProfileDropdown from '../Auth/ProfileDropdown';
import IdleTimer from '../Auth/IdleTimer';

const CollegeDashboard = () => {
    const location = useLocation();

    return (
        <div className="college-dashboard">
            <IdleTimer />
            <h2>College Dashboard</h2>
            <nav className="college-nav">
                <Link to="/college/dashboard/students" className={location.pathname === '/college/dashboard/students' ? 'active' : ''}>Students</Link>
                <Link to="/college/dashboard/add-student" className={location.pathname === '/college/dashboard/add-student' ? 'active' : ''}>Add Student</Link>
                <Link to="/college/dashboard/add-achievement" className={location.pathname === '/college/dashboard/add-achievement' ? 'active' : ''}>Add Achievement</Link>
            </nav>
                <div className="profile-dropdown-college">
                <ProfileDropdown dashboardType="college"/>
                </div>
            <div className="route-container">
                <Outlet /> {/* This will render the matched child route */}
                
            </div>
        </div>
    );
};

export default CollegeDashboard;
