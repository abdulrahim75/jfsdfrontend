import React, { useState, useEffect } from 'react';
import { getStudents } from '../../../api'; // Adjust the import path as necessary
import './StudentList.css'; // Make sure this path is correct

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(12);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudents();
                console.log('Fetched students:', response.data);
                setStudents(response.data);
            } catch (error) {
                console.error('Failed to fetch students:', error);
            }
        };
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedStudents = filteredStudents.slice(0, displayCount);

    const loadMore = () => {
        setDisplayCount(prevCount => prevCount + 12);
    };

    return (
        <div className="student-list-container">
            <div className="student-list-header">
                <h3>Students</h3>
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="student-grid">
                {displayedStudents.map((student) => (
                    <div key={student.id} className="student-card">
                        <div className="student-name">{student.name}</div>
                        <div className="student-info">Roll Number: {student.rollNumber}</div>
                        <div className="student-info">
                            College: {student.college ? student.college.name : 'N/A'}
                        </div>
                        <div className="student-info">
                            Location: {student.college ? student.college.location : 'N/A'}
                        </div>
                    </div>
                ))}
            </div>
            {displayCount < filteredStudents.length && (
                <button className="load-more" onClick={loadMore}>
                    Load More
                </button>
            )}
        </div>
    );
};

export default StudentList;
