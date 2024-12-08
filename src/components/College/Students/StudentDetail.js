import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAchievementsByStudent, deleteAchievement } from '../../../api';
import './StudentDetail.css';
import { FaTimes } from 'react-icons/fa'; // Import a close icon
import CertificateGenerator from '../Achievements/CertificateGenerator'; // Import the new component

const StudentDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state.student; // Get the student data from the navigation state
    const [achievements, setAchievements] = useState([]);
    const [showAchievements, setShowAchievements] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null); // State for selected achievement

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await getAchievementsByStudent(student.rollNumber);
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };
        fetchAchievements();
    }, [student.rollNumber]);

    const handleDeleteClick = async (achievementId) => {
        try {
            await deleteAchievement(achievementId);
            setAchievements(achievements.filter((ach) => ach.id !== achievementId));
        } catch (error) {
            console.error('Error deleting achievement:', error);
        }
    };

    const handleEditClick = (achievement) => {
        navigate('/college/dashboard/edit-achievement', {
            state: { achievement },
        });
    };

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleGenerateCertificate = (achievement) => {
        setSelectedAchievement(achievement); // Set the selected achievement for certificate generation
    };

    return (
        <div className="student-detail-container">
            {/* Close icon button */}
            <button className="close-icon" onClick={handleClose}>
                <FaTimes />
            </button>

            <h4>Details of {student.name}</h4>
            <p>Roll Number: {student.rollNumber}</p>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phoneNumber}</p>

            <h5 className="achievements-toggle" onClick={() => setShowAchievements(!showAchievements)}>
                {showAchievements ? 'Hide Achievements' : 'Show Achievements'}
            </h5>

            {showAchievements && achievements.length > 0 && (
                <div className="achievements-table-container">
                    <table className="achievements-table">
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Date</th>
                                <th>Points</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {achievements.map((achievement) => (
                                <tr key={achievement.id} className="achievement-row">
                                    <td>{achievement.activityName}</td>
                                    <td>{new Date(achievement.activityDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td>{achievement.activitypoints}</td>
                                    <td>
                                        {achievement.firstPosition ? 'First Position' :
                                         achievement.secondPosition ? 'Second Position' :
                                         achievement.thirdPosition ? 'Third Position' : 'Participation'}
                                    </td>
                                    <td>
                                        <button onClick={() => handleEditClick(achievement)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(achievement.id)}>Delete</button>
                                        <button onClick={() => handleGenerateCertificate(achievement)}>Generate Certificate</button> {/* Button to generate certificate */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedAchievement && <CertificateGenerator achievement={selectedAchievement} />} {/* Render the certificate generator */}
        </div>
    );
};

export default StudentDetail;
