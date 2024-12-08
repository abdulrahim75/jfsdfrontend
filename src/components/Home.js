import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTokenInfo } from '../utils/tokenUtils';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const tokenInfo = getTokenInfo();
        
        if (tokenInfo && tokenInfo.exp * 1000 > Date.now()) {
            const redirectPath = {
                admin: '/admin/dashboard/colleges',
                college: '/college/dashboard/students',
                student: '/student/dashboard/achievements'
            }[tokenInfo.role];

            if (redirectPath) {
                navigate(redirectPath);
            }
        }
    }, [navigate]);

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="header-content">
                    <div className="logo">Achievaa</div>
                    <nav>
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#achievements">Achievements</a></li>
                        </ul>
                    </nav>
                    <Link to="/login" className="login-btn">Login</Link>
                </div>
            </header>

            <main className="home-main">
                <section id="hero" className="hero-section">
                    <h1>Student Extracurricular Achievements</h1>
                    <p>Empowering students to showcase their talents beyond academics</p>
                    <Link to="/login" className="cta-button">Get Started</Link>
                </section>

                <section id="about" className="about-section">
                    <h2>About Us</h2>
                    <p>We provide a platform for students to highlight their extracurricular accomplishments and skills.</p>
                </section>

                <section id="features" className="features-section">
                    <h2>Features</h2>
                    <div className="feature-grid">
                        <div className="feature">
                            <i className="fas fa-trophy"></i>
                            <h3>Track Achievements</h3>
                        </div>
                        <div className="feature">
                            <i className="fas fa-chart-line"></i>
                            <h3>Visualize Progress</h3>
                        </div>
                        <div className="feature">
                            <i className="fas fa-users"></i>
                            <h3>Connect with Peers</h3>
                        </div>
                    </div>
                </section>

                <section id="achievements" className="achievements-section">
                    <h2>Featured Achievements</h2>
                    <div className="achievement-carousel">
                        <div className="achievement-card">
                            <h3>National Science Fair Winner</h3>
                            <p>Abdul Rahim</p>
                        </div>
                        <div className="achievement-card">
                            <h3>State Chess Champion</h3>
                            <p>Rupesh</p>
                        </div>
                        <div className="achievement-card">
                            <h3>International Debate Competition Finalist</h3>
                            <p>Ravi</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <p>&copy; 2024 Student Extracurricular Achievements. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
