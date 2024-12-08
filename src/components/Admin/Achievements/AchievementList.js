import React, { useState, useEffect } from 'react';
import { getAllAchievements } from '../../../api';
import CertificateGenerator from '../../College/Achievements/CertificateGenerator'; // Adjust import as necessary
import './AchievementList.css';

const AchievementList = () => {
    const [achievements, setAchievements] = useState([]);
    const [expandedStudents, setExpandedStudents] = useState({});
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await getAllAchievements();
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };
        fetchAchievements();
    }, []);

    // Group achievements by student
    const groupedAchievements = achievements.reduce((acc, achievement) => {
        const studentId = achievement.student.id;
        if (!acc[studentId]) {
            acc[studentId] = {
                student: achievement.student,
                achievements: [],
            };
        }
        acc[studentId].achievements.push(achievement);
        return acc;
    }, {});

    // Get only the most recent achievement for each student
    const recentAchievements = Object.values(groupedAchievements).map(({ student, achievements }) => {
        const mostRecent = achievements.sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate))[0];
        return { student, achievement: mostRecent };
    });

    const handleStudentClick = (studentId) => {
        setExpandedStudents((prev) => ({
            ...prev,
            [studentId]: !prev[studentId], // Toggle expansion state
        }));
    };

    const handleDownload = (achievement) => {
        setSelectedAchievement(achievement);
    };

    const handleDownloadAll = (achievements) => {
        achievements.forEach((achievement) => {
            // This could be enhanced to create multiple PDFs in one action or add a function to download multiple files
            setSelectedAchievement(achievement);
            // Trigger download for the current achievement
            // Wait for a short moment to ensure the PDF is generated before moving to the next one
            setTimeout(() => {
                setSelectedAchievement(null); // Reset to avoid continuous downloads
            }, 500);
        });
    };

    return (
        <div className="achievement-list">
            <h3 className="achievement-title">Achievements</h3>
            <table className="achievement-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>College</th>
                        <th>Activity</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Download Certificate</th>
                    </tr>
                </thead>
                <tbody>
                    {recentAchievements.map(({ student, achievement }) => (
                        <React.Fragment key={student.id}>
                            <tr onClick={() => handleStudentClick(student.id)} style={{ cursor: 'pointer' }}>
                                <td>{student.name}</td>
                                <td>{student.college.name}</td>
                                <td>{achievement.activityName}</td>
                                <td>{achievement.activityDescription}</td>
                                <td>{achievement.activityDate}</td>
                                <td>
                                    <button onClick={(e) => { e.stopPropagation(); handleDownload(achievement); }}>
                                        Download
                                    </button>
                                </td>
                            </tr>
                            {expandedStudents[student.id] && achievement && (
                                <tr>
                                    <td colSpan="6" style={{ padding: '10px' }}>
                                        <table style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Activity</th>
                                                    <th>Description</th>
                                                    <th>Date</th>
                                                    <th>Download</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {groupedAchievements[student.id].achievements.map((ach) => (
                                                    <tr key={ach.id}>
                                                        <td>{ach.activityName}</td>
                                                        <td>{ach.activityDescription}</td>
                                                        <td>{ach.activityDate}</td>
                                                        <td>
                                                            <button onClick={(e) => { e.stopPropagation(); handleDownload(ach); }}>
                                                                Download
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDownloadAll(groupedAchievements[student.id].achievements);
                                            }}
                                            style={{ marginTop: '10px' }}
                                        >
                                            Download All Achievements
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {selectedAchievement && (
                <CertificateGenerator achievement={selectedAchievement} />
            )}
        </div>
    );
};

export default AchievementList;
