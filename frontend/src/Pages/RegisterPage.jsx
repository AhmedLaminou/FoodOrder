import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

/*-------------------------- CSS Files ------------------------------------*/
import "../static/register.css"
/*------------------------ Components ------------------------------------*/
import Footer from "../Components/Footer"
/*---------------------- Services Files ------------------------------*/
import {registerNewUser} from '../services/userService';


const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            const response = await registerNewUser(username, email, password);
            if (response.message === "User created successfully") {
                navigate('/login');
            } else {
                
                setError(response.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            
            const errorMessage = error.response?.data?.message || error.message || 'Failed to register. Please try again later.';
            setError(errorMessage);
            console.error("Registration error:", error);
        }
    };

    return (
        <>
        <div className="container mt-5" id="registerPage">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer /> 
        </>
    );
};

export default RegisterPage;
