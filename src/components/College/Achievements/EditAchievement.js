

import React, {  useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add React Router for navigation
import { updateAchievement } from '../../../api'; // Adjust the path as needed
import './EditAchievement.css'; // Optional CSS for styling

const EditAchievement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { achievement } = location.state; // Get achievement data from location state

    const [editAchievementData, setEditAchievementData] = useState(achievement);

    const handleChangeEdit = (e) => {
        const { name, value, type, checked } = e.target;
        setEditAchievementData({
            ...editAchievementData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateAchievement(editAchievementData.id, editAchievementData);
            console.log('Achievement updated:', response.data);
            navigate(-1); // Navigate back to the previous page (list of achievements)
        } catch (error) {
            console.error('Error updating achievement:', error);
        }
    };

    return (
        <div className="edit-achievement-container">
            <button className="close-button" onClick={() => navigate(-1)}>
                &times; {/* Close icon */}
            </button>
            <h5>Edit Achievement</h5>
            <form onSubmit={handleEditSubmit}>
                <div>
                    <label>Activity Name:</label>
                    <input
                        type="text"
                        name="activityName"
                        value={editAchievementData.activityName}
                        onChange={handleChangeEdit}
                        required
                    />
                </div>
                <div>
                    <label>Activity Date:</label>
                    <input
                        type="date"
                        name="activityDate"
                        value={editAchievementData.activityDate}
                        onChange={handleChangeEdit}
                    />
                </div>
                <div>
                    <label>Activity Points:</label>
                    <input
                        type="number"
                        name="activitypoints"
                        value={editAchievementData.activitypoints}
                        onChange={handleChangeEdit}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="firstPosition"
                            checked={editAchievementData.firstPosition}
                            onChange={handleChangeEdit}
                        />
                        First Position
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="secondPosition"
                            checked={editAchievementData.secondPosition}
                            onChange={handleChangeEdit}
                        />
                        Second Position
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="thirdPosition"
                            checked={editAchievementData.thirdPosition}
                            onChange={handleChangeEdit}
                        />
                        Third Position
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="participation"
                            checked={editAchievementData.participation}
                            onChange={handleChangeEdit}
                        />
                        Participation
                    </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditAchievement;
