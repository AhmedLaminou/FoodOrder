const API_BASE_URL = 'http://localhost:8000/users/api';

/*-------------------------------- User in General ---------------------------------------*/
export const sendContactMessage = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de l’envoi du message :', error);
      return { status: 'error', message: error.message };
    }
  }
async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users-list/`);
        console.log("Réponse de l'API:", response); 
        const data = await response.json();
        console.log('Users:', data);
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function registerUser(username, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log('User registered:', data);
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to login');
        }
        
        console.log('Login successful:', data);
        return data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

async function updateUserProfile(username, bio, profilePicture, address) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, bio, profile_picture: profilePicture, address }),
        });
        const data = await response.json();
        console.log('Profile updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

async function requestPasswordReset(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/request-password-reset/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();
        console.log('Password reset requested:', data);
        return data;
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
}

async function fetchUserAddresses() {
    try {
        const response = await fetch(`${API_BASE_URL}/user-addresses/`);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Error fetching user addresses:', error);
        throw error;
    }
}

/*----------------------- Coupons -----------------------------*/
 async function fetchCoupons() {
    try {
        const response = await fetch(`${API_BASE_URL}/user-coupons/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"  
        });
        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }
        const data = await response.json();
        console.log("Coupons retrieved:", data);
        return data; 
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error; 
    }
}

async function addCoupon(code, discountPercentage, expirationDate) {
    try {
        const response = await fetch(`${API_BASE_URL}/add-coupon/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, discount_percentage: discountPercentage, expiration_date: expirationDate }),
        });
        const data = await response.json();
        console.log('Coupon added:', data);
        return data;
    } catch (error) {
        console.error('Error adding coupon:', error);
        throw error;
    }
}

async function deleteCoupon(couponId) {
    try {
        const response = await fetch(`${API_BASE_URL}/delete-coupon/${couponId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('Coupon deleted:', data);
        return data;
    } catch (error) {
        console.error('Error deleting coupon:', error);
        throw error;
    }
}

async function updateCoupon(couponId, code, discountPercentage, expirationDate) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-coupon/${couponId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, discount_percentage: discountPercentage, expiration_date: expirationDate }),
        });
        const data = await response.json();
        console.log('Coupon updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating coupon:', error);
        throw error;
    }
}

async function markCouponAsUsed(couponId) {
    try {
        const response = await fetch(`${API_BASE_URL}/mark-coupon-used/${couponId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('Coupon marked as used:', data);
        return data;
    } catch (error) {
        console.error('Error marking coupon as used:', error);
        throw error;
    }
}

async function getCouponDetails(couponId) {
    try {
        const response = await fetch(`${API_BASE_URL}/coupon-details/${couponId}/`);
        const data = await response.json();
        console.log('Coupon details:', data);
        return data;
    } catch (error) {
        console.error('Error fetching coupon details:', error);
        throw error;
    }
}

/*----------------------- Notifications --------------------------*/

 async function sendNotificationToUser(userId, message, notificationType = 'general') {
    try {
        const response = await fetch(`/send-notification-to-user/${userId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, notification_type: notificationType }),
        });
        const data = await response.json();
        console.log('Notification sent to user:', data);
        return data;
    } catch (error) {
        console.error('Error sending notification to user:', error);
        throw error;
    }
}

 async function sendNotificationToAllUsers(message, notificationType = 'general') {
    try {
        const response = await fetch(`/send-notification-to-all-users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, notification_type: notificationType }),
        });
        const data = await response.json();
        console.log('Notification sent to all users:', data);
        return data;
    } catch (error) {
        console.error('Error sending notification to all users:', error);
        throw error;
    }
}

 async function fetchUserNotifications() {
    try {
        const response = await fetch('/user-notifications/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('User notifications:', data);
        return data.notifications;
    } catch (error) {
        console.error('Error getting user notifications:', error);
        throw error;
    }
}

 async function fetchAdminUsersNotifications() {
    try {
        const response = await fetch('/users-notifications/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('All users notifications:', data);
        return data.notifications;
    } catch (error) {
        console.error('Error getting users notifications:', error);
        throw error;
    }
}

/*------------------ Profile -----------------------------------*/
async function fetchUserProfile() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("No access token found. Please login again.");
    }

    console.log("Fetching profile with token:", token.substring(0, 10) + "...");

    try {
        const response = await fetch(`${API_BASE_URL}/user-profile/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'
        });

        console.log("Profile response status:", response.status);
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized. Please login again.');
            }
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch profile');
        }

        const data = await response.json();
        console.log("Profile response data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Network error. Please check your connection and ensure the backend server is running.');
        }
        throw error;
    }
}

async function updateUserProfileDetails(bio, profilePicture) {
    try {
        const response = await fetch(`${API_BASE_URL}/update-profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ bio, profile_picture: profilePicture })
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}

async function fetchAllProfiles() {
    try {
        const response = await fetch(`${API_BASE_URL}/all-profiles/`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching all profiles:', error);
        throw error;
    }
}



export {
    fetchUserAddresses , 
    fetchUsers,
    registerUser,
    loginUser,
    updateUserProfileDetails,
    requestPasswordReset,
    addCoupon,
    deleteCoupon,
    updateCoupon,
    markCouponAsUsed,
    getCouponDetails,
    fetchCoupons,
    sendNotificationToUser,
    sendNotificationToAllUsers,
    fetchUserNotifications,
    fetchAdminUsersNotifications ,
    fetchUserProfile,
    fetchAllProfiles,
    updateUserProfile,
    
}
