import React, { useState, useEffect } from 'react';
import { getStudentAchievements } from '../../api';
import './StudentAchievements.css';
import CertificateGenerator from '../College/Achievements/CertificateGenerator';

const StudentAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const response = await getStudentAchievements();
            console.log(response.data);
            setAchievements(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setLoading(false);
        }
    };

    const handleGenerateCertificate = (achievement) => {
        setSelectedAchievement(achievement);
    };

    return (
        <div className="student-achievements">
            <h2>Your Achievements</h2>
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <ul className="achievement-list">
                    {achievements.map((achievement) => (
                        <li key={achievement.id} className="achievement-item">
                            <div className="achievement-content">
                                <p>Activity: {achievement.activityName}</p>
                                <p>Date: {new Date(achievement.activityDate).toLocaleDateString()}</p>
                                <p>Points: {achievement.activitypoints}</p>
                                <p>Position: {achievement.firstPosition ? 'First' : achievement.secondPosition ? 'Second' : achievement.thirdPosition ? 'Third' : 'Participation'}</p>
                            </div>
                            <button onClick={() => handleGenerateCertificate(achievement)}>Generate Certificate</button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedAchievement && <CertificateGenerator achievement={selectedAchievement} />} {/* Render the certificate generator */}
        </div>
    );
};

export default StudentAchievements;
