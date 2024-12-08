import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './AdminDashboard.css';
import ProfileDropdown from '../Auth/ProfileDropdown';
import IdleTimer from '../Auth/IdleTimer';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        colleges: 0,
        students: 0,
        achievements: 0
    });
    const location = useLocation();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/fetchstats');
                setStats({
                    colleges: response.data.colleges || 0,
                    students: response.data.students || 0,
                    achievements: response.data.achievements || 0
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <IdleTimer />
            <header className="admin-header">
                <h2>Admin Dashboard</h2>
                <nav className="admin-nav">
                    <div className="nav-links">
                        <Link to="/admin/dashboard/colleges" className={location.pathname === '/admin/dashboard/colleges' ? 'active' : ''}>Colleges</Link>
                        <Link to="/admin/dashboard/students" className={location.pathname === '/admin/dashboard/students' ? 'active' : ''}>Students</Link>
                        <Link to="/admin/dashboard/achievements" className={location.pathname === '/admin/dashboard/achievements' ? 'active' : ''}>Achievements</Link>
                        <Link to="/admin/dashboard/add-college" className={location.pathname === '/admin/dashboard/add-college' ? 'active' : ''}>Add College</Link>
                    </div>
                    <ProfileDropdown dashboardType="admin" />
                </nav>
            </header>
            <div className="admin-content">
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Total Colleges</h3>
                        <p>{stats.colleges}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <p>{stats.students}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Achievements</h3>
                        <p>{stats.achievements}</p>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
