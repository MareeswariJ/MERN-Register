import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:8000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Login Successful!')
                setSuccess('Login successful!');
                navigate('/Home');
                // Store token or redirect to the dashboard if necessary
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred while connecting to the server.');
        }
    };

    return (
        <div className="login-container container">
            <h1 className="login-heading">Login</h1>
            {error && <p className="login-error" style={{ color: 'red' }}>{error}</p>}
            {success && <p className="login-success" style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                    <label className="login-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                </div>
                <div className="login-form-group">
                    <label className="login-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="login-input"
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
                <p className="login-footer">
                Don't have an account? <a href="/">Signup now</a>
            </p>
            </form>
        </div>
    );
}
