import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateStudent } from '../../../api';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';


const degreeOptions = [
    { value: 'BSc', label: 'Bachelor of Science (BSc)' },
    { value: 'BA', label: 'Bachelor of Arts (BA)' },
    { value: 'BCom', label: 'Bachelor of Commerce (BCom)' },
    { value: 'BTech', label: 'Bachelor of Technology (BTech)' },
    { value: 'MSc', label: 'Master of Science (MSc)' },
    { value: 'MA', label: 'Master of Arts (MA)' },
    { value: 'MCom', label: 'Master of Commerce (MCom)' },
    { value: 'MTech', label: 'Master of Technology (MTech)' },
];

const branchOptionsMap = {
    BSc: [
        { value: 'CS', label: 'Computer Science' },
        { value: 'Bio', label: 'Biology' },
        { value: 'Chem', label: 'Chemistry' },
        { value: 'Phy', label: 'Physics' },
    ],
    BA: [
        { value: 'Eng', label: 'English' },
        { value: 'Hist', label: 'History' },
        { value: 'Psy', label: 'Psychology' },
    ],
    BCom: [
        { value: 'Acct', label: 'Accounting' },
        { value: 'Fin', label: 'Finance' },
        { value: 'Econ', label: 'Economics' },
    ],
    BTech: [
        { value: 'CS', label: 'Computer Science Engineering' },
        { value: 'ECE', label: 'Electronics and Communication Engineering' },
        { value: 'ME', label: 'Mechanical Engineering' },
        { value: 'CE', label: 'Civil Engineering' },
    ],
    MSc: [
        { value: 'CS', label: 'Computer Science' },
        { value: 'Bio', label: 'Biology' },
        { value: 'Chem', label: 'Chemistry' },
        { value: 'Phy', label: 'Physics' },
    ],
    MA: [
        { value: 'Eng', label: 'English' },
        { value: 'Hist', label: 'History' },
        { value: 'Psy', label: 'Psychology' },
    ],
    MCom: [
        { value: 'Acct', label: 'Accounting' },
        { value: 'Fin', label: 'Finance' },
        { value: 'Econ', label: 'Economics' },
    ],
    MTech: [
        { value: 'CS', label: 'Computer Science Engineering' },
        { value: 'ECE', label: 'Electronics and Communication Engineering' },
        { value: 'ME', label: 'Mechanical Engineering' },
        { value: 'CE', label: 'Civil Engineering' },
    ],
};

const EditStudent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state.student;

    const [name, setName] = useState(student.name);
    const [rollNumber, setRollNumber] = useState(student.rollNumber);
    const [dob, setDob] = useState(student.dob);
    const [email, setEmail] = useState(student.email);
    const [phoneNumber, setPhoneNumber] = useState(student.phoneNumber);
    const [degree, setDegree] = useState(student.degree ? { value: student.degree, label: student.degree } : null);
    const [degreeYear, setDegreeYear] = useState(student.degreeYear || '');
    const [branch, setBranch] = useState(student.branch ? { value: student.branch, label: student.branch } : null);
    const [message, setMessage] = useState(null);

    const handleDegreeChange = (selectedDegree) => {
        setDegree(selectedDegree);
        setBranch(null); // Reset branch when degree changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedStudent = {
                ...student,
                name,
                rollNumber,
                dob,
                email,
                phoneNumber,
                degree: degree.value,
                degreeYear,
                branch: branch.value,
            };
            await updateStudent(student.id, updatedStudent);
            setMessage({ type: 'success', text: 'Student updated successfully!' });
            setTimeout(() => navigate('/college/dashboard/students'), 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update student. Please try again.' });
        }
    };

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };

    // Filter branch options based on selected degree
    const filteredBranchOptions = degree ? branchOptionsMap[degree.value] : [];

    return (
        <form className="edit-student-form" onSubmit={handleSubmit}>
            <button className="close-icon" onClick={handleClose}>
                <FaTimes />
            </button>
            <h5>Edit Student</h5>

            <div className="form-group">
                <label htmlFor="name">Student Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="rollNumber">Roll Number</label>
                <input
                    type="text"
                    id="rollNumber"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <Select
                    id="degree"
                    options={degreeOptions}
                    value={degree}
                    onChange={handleDegreeChange}
                    isSearchable
                    placeholder="Select Degree"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="degreeYear">Degree Year</label>
                <input
                    type="text"
                    id="degreeYear"
                    value={degreeYear}
                    onChange={(e) => setDegreeYear(e.target.value)}
                    placeholder=" "
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <Select
                    id="branch"
                    options={filteredBranchOptions}
                    value={branch}
                    onChange={(selectedOption) => setBranch(selectedOption)}
                    isSearchable
                    placeholder="Select Branch"
                    required
                    isDisabled={!degree} // Disable if no degree is selected
                />
            </div>

            <button type="submit" className="submit-button">Update Student</button>

            {message && <div className={`${message.type}-message`}>{message.text}</div>}
        </form>
    );
};

export default EditStudent;
