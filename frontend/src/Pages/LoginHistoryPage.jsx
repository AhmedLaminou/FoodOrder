import { useState, useEffect } from 'react';

/*------------------------- Service Files ---------------------------------*/
import * as userService from '../services/userService';

/*--------------------------- Components -----------------------------------*/
import Footer from '../Components/Footer';

/*--------------------- CSS Files ------------------------------*/
import "../static/login.css" ; 


const LoginHistoryPage = () => {
    const [loginHistory, setLoginHistory] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                
                const response = await userService.getAllUsers();
                
                setLoginHistory(response.data.loginHistory); 
            } catch (error) {
                console.error("Erreur lors de la récupération de l'historique des connexions :", error);
                setError('Failed to load login history');
            }
        };

        fetchLoginHistory();
    }, []);

    return (
        <>
        <div className="container mt-5" id="loginHistoryPage">
            <h2>Login History</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Login Time</th>
                        <th scope="col">IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    {loginHistory.length > 0 ? (
                        loginHistory.map((history) => (
                            <tr key={history.loginHistoryId}>
                                <td>{history.username}</td>
                                <td>{new Date(history.timestamp).toLocaleString()}</td>
                                <td>{history.ip_address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No login history available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Footer />
        </>
    );
};

export default LoginHistoryPage;
