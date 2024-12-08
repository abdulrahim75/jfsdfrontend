import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentsByCollege, deleteStudent ,deleteStudentUser} from '../../../api';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa'; // Importing icons
import './StudentList.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudentsByCollege();
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentClick = (student) => {
        navigate('/college/dashboard/student-detail', {
            state: { student },
        });
    };

    const handleEditClick = (student) => {
        navigate('/college/dashboard/edit-student', {
            state: { student }, // Pass student data to edit page
        });
    };
    const handleDeleteUser = async (studentId) => {
        try {   
            await deleteStudentUser(studentId);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleDeleteClick = async (studentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (confirmDelete) {
            try {
                
                await deleteStudent(studentId);
                await handleDeleteUser(studentId);
                setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="student-list-container">
            <h3>Students</h3>
            <ul className="student-list">
                {students.map((student) => (
                    <li key={student.id} className="student-item">
                        <span className="student-roll" onClick={() => handleStudentClick(student)}>
                            {student.rollNumber}
                        </span>
                        <div className="icon-container"> 
                        <FaInfoCircle onClick={() => handleStudentClick(student)} className="details-icon" />
                        <FaEdit onClick={() => handleEditClick(student)} className="edit-icon" />
                        <FaTrash onClick={() => handleDeleteClick(student.id)} className="delete-icon" />
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
