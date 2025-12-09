import  { useEffect, useState } from 'react';
/*----------------- Services ---------------------*/
import { getUserNotifications, getAdminUsersNotifications } from '../services/userService';
/*------------------- CSS Files -----------------------------------------*/
import "../static/notification.css"
/*------------------ Compoenents -------------------------*/
import Footer from "../Components/Footer"

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (isAdmin) {
                const adminNotifications = await getAdminUsersNotifications();
                setNotifications(adminNotifications.data);
                console.log("La réponse obtenue de la part Admin est : ", adminNotifications);
            } else {
                const userNotifications = await getUserNotifications();
                setNotifications(userNotifications.data);
                console.log("La réponse obtenue de la part User est : ", userNotifications);
            }
        };
        fetchNotifications();
    }, [isAdmin]);

    return (
        <>
        
             <div className="notification-page container" id="notificationPage">
            
            <h2>Notifications</h2>
            <div>
                {notifications.map((notification, index) => (
                    <div key={index}>
                        <h5>{notification.message}</h5>
                        <p>{notification.created_at}</p>
                    </div>
                ))}
            </div>
        </div>
        <Footer /> 
        </>
       
    );
};

export default NotificationPage;
