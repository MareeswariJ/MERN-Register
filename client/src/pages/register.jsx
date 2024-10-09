import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        dob: '',
        address: '',
        gender: '',
        hobbies: [''], // Initially one hobby input
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, dataset } = e.target;

        if (name === 'hobbies') {
            const index = dataset.index; // Get the index of the hobby being updated
            const updatedHobbies = [...formData.hobbies];
            updatedHobbies[index] = value; // Update the specific hobby
            setFormData({ ...formData, hobbies: updatedHobbies });
        } else {
            setFormData({
                ...formData,
                [name]: value, // Update other fields
            });
        }
    };

    const addHobby = () => {
        setFormData((prevState) => ({
            ...prevState,
            hobbies: [...prevState.hobbies, ''], // Add an empty hobby input
        }));
    };

    const removeHobby = (index) => {
        const updatedHobbies = formData.hobbies.filter((_, i) => i !== index); // Remove hobby at the given index
        setFormData({ ...formData, hobbies: updatedHobbies });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:8000/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Registration Successful')
                setSuccess('Registration successful!');
                navigate('/login');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred while connecting to the server.');
        }
    };

    return (
        <div className="register-container container">
            <h1 className="register-heading">Register</h1>
            {error && <p className="register-error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="register-success" style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-form-group">
                    <label className="register-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">DOB</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Gender</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="transgender"
                            onChange={handleChange}
                            className="register-input"
                            required
                        />
                        Transgender
                    </label>
                </div>
                <div className="register-form-group">
                    <label className="register-label">Hobbies</label>
                    {formData.hobbies.map((hobby, index) => (
                        <div key={index} className="hobby-input-group">
                            <input
                                type="text"
                                name="hobbies"
                                data-index={index} // Store index for hobby input
                                value={hobby}
                                placeholder={`Hobby ${index + 1}`}
                                onChange={handleChange}
                                className="register-input"
                                required
                            />
                            <button 
                                type="button" 
                                className="register-input" 
                                onClick={() => removeHobby(index)} // Remove hobby when clicked
                            >
                                Remove hobbies
                            </button>
                        </div>
                    ))}
                    <button type="button" className='register-input' onClick={addHobby}>
                        Add Hobby
                    </button>
                </div>
                <div className="register-form-group">
                    <label className="register-label">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="register-input"
                        required
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
                <p className="register-footer">
                    Already have an account? <a href="/login">Login now</a>
                </p>
            </form>
        </div>
    );
}
