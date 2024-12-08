import React, { useState, useEffect } from 'react';
import { getColleges, deleteCollege,deleteCollegeUser } from '../../../api'; // import deleteCollege API
import EditCollege from './EditCollege';
import './CollegeList.css';

const CollegeList = () => {
    const [colleges, setColleges] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCollegeId, setSelectedCollegeId] = useState(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await getColleges();
                setColleges(response.data);
                console.log('Fetched colleges:', response.data);
            } catch (error) {
                console.error('Failed to fetch colleges:', error);
            }
        };
        fetchColleges();
    }, []);

    const handleEditClick = (collegeId) => {
        setSelectedCollegeId(collegeId);
        setIsEditing(true);
    };

    const handleDeleteClick = async (collegeId) => {
        if (window.confirm('Are you sure you want to delete this college?')) {
            try {
                deleteCollegeUser(collegeId);
                await deleteCollege(collegeId);
                setColleges(colleges.filter((college) => college.id !== collegeId));
                console.log(`College with ID ${collegeId} deleted.`);
            } catch (error) {
                console.error(`Failed to delete college with ID ${collegeId}:`, error);
            }
        }
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setSelectedCollegeId(null);
    };

    return (
        <div className="college-list-container">
            <div className="college-list-header">
                <h3>Colleges</h3>
            </div>
            <div className="college-grid">
                {colleges.map((college) => (
                    <div key={college.id} className="college-card">
                        <div className="college-name">{college.name}</div>
                        <div className="college-location">{college.location}</div>
                        <button onClick={() => handleEditClick(college.id)}>Edit</button>
                        <button onClick={() => handleDeleteClick(college.id)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>
            {isEditing && (
                <EditCollege collegeId={selectedCollegeId} onClose={handleCloseEdit} />
            )}
        </div>
    );
};

export default CollegeList;
