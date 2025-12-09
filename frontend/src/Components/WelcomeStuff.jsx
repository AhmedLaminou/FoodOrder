/*-------------------------- React Importations --------------------------*/
import { Link } from 'react-router-dom';
import { useContext } from 'react';

/*-------------------------- CSS File Import --------------------------*/
import '../static/home.css';

/*-------------------------- Context Import --------------------------*/
import { AuthContext } from '../context/AuthContext';

/*-------------------------- My Components --------------------------*/

const WelcomeStuff = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
        <div id="homePage">
                  
            <h2 className='welcome-text text-center'>Welcome to the FastLunch</h2>
            <div className="button-container">
                <Link className='btn btn-futuristic' to="/menu">View Menu Categories</Link>
            </div>

            {user && user.is_admin && (
                <div className="button-container">
                    <Link className='btn btn-futuristic' to="/admin">Admin</Link>
                </div>
            )}

            <div className="button-container">
                <Link className='btn btn-futuristic' to="/coupons">Coupons</Link>
            </div>

            <div className="auth-buttons">
                <Link className="btn-auth btn-login" to="/notifications">
                    Notifications
                </Link>
                <Link className="btn-auth btn-login" to="/promotions">
                     Promotions 
                </Link>
                <Link className="btn-auth btn-login" to="/about-us">
                    About Us
                </Link>
            </div>
        </div>
        </>
    );
};

export default WelcomeStuff;