import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

/*--------------------- CSS Files ------------------------------*/
import "../static/login.css" ; 
import "../static/footer.css"

/*-------------------- Components --------------------------*/
import Footer from "../Components/Footer"


/*-------------------- Services --------------------------*/
import { loginUser } from '../services/userService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  
    
        try {
            const response = await loginUser(username, password);
            if (response.message === "Login successful") {
                // Store tokens
                if (response.access) {
                    localStorage.setItem('accessToken', response.access);
                }
                if (response.refresh) {
                    localStorage.setItem('refreshToken', response.refresh);
                }
                
                // Store user data in context
                login({
                    username: response.username,
                    user_id: response.user_id,
                    is_admin: response.is_admin
                });
                
                navigate('/profile');
            } else {
                setError(response.error || "Login failed. Please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Failed to login. Please check your credentials.";
            setError(errorMessage);
            console.error("Login error:", error);
        }
    };

    return (
        <>
        
        <div className="container mt-5" id="loginPage">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
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
                                <button type="submit" className="btn btn-primary w-100">Login</button>
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

export default LoginPage;
