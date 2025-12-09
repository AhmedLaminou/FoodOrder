// userService.js

import * as userApi from './user-api';

export async function getAllUsers() {
    try {
        const users = await userApi.fetchUsers();
        return users;
    } catch (error) {
        console.error('Failed to get users:', error);
        throw error;
    }
}

export async function registerNewUser(username, email, password) {
    try {
        const response = await userApi.registerUser(username, email, password);
        return response;
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}

export async function loginUser(username, password) {
    try {
        const response = await userApi.loginUser(username, password);
        return response;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function updateUserProfile(username, bio, profilePicture, address) {
    try {
        const response = await userApi.updateUserProfile(username, bio, profilePicture, address);
        return response;
    } catch (error) {
        console.error('Profile update failed:', error);
        throw error;
    }
}


export async function requestPasswordReset(username) {
    try {
        const response = await userApi.requestPasswordReset(username);
        return response;
    } catch (error) {
        console.error('Password reset failed:', error);
        throw error;
    }
}

export async function getUserAddresses() {
    try {
        const addresses = await userApi.fetchUserAddresses();
        return addresses;
    } catch (error) {
        console.error('Failed to get user addresses:', error);
        throw error;
    }
}



/*---------------------- Coupons ---------------------------------------------*/

export async function getAllCoupons() {
    try {
        const coupons = await userApi.fetchCoupons();
        return coupons;
    } catch (error) {
        console.error('Failed to get coupons:', error);
        throw error;
    }
}
export async function addNewCoupon(code, discountPercentage, expirationDate) {
    try {
        const response = await userApi.addCoupon(code, discountPercentage, expirationDate);
        return response;
    } catch (error) {
        console.error('Failed to add coupon:', error);
        throw error;
    }
}

export async function deleteUserCoupon(couponId) {
    try {
        const response = await userApi.deleteCoupon(couponId);
        return response;
    } catch (error) {
        console.error('Failed to delete coupon:', error);
        throw error;
    }
}

export async function updateUserCoupon(couponId, code, discountPercentage, expirationDate) {
    try {
        const response = await userApi.updateCoupon(couponId, code, discountPercentage, expirationDate);
        return response;
    } catch (error) {
        console.error('Failed to update coupon:', error);
        throw error;
    }
}

export async function markCouponUsed(couponId) {
    try {
        const response = await userApi.markCouponAsUsed(couponId);
        return response;
    } catch (error) {
        console.error('Failed to mark coupon as used:', error);
        throw error;
    }
}

export async function getCouponDetails(couponId) {
    try {
        const response = await userApi.getCouponDetails(couponId);
        return response;
    } catch (error) {
        console.error('Failed to fetch coupon details:', error);
        throw error;
    }
}


/*------------------ Notifications --------------------------------*/

export async function notifyUser(userId, message, notificationType = 'general') {
    try {
        const response = await userApi.sendNotificationToUser(userId, message, notificationType);
        return response;
    } catch (error) {
        console.error('Failed to send notification to user:', error);
        throw error;
    }
}

export async function notifyAllUsers(message, notificationType = 'general') {
    try {
        const response = await userApi.sendNotificationToAllUsers(message, notificationType);
        return response;
    } catch (error) {
        console.error('Failed to send notification to all users:', error);
        throw error;
    }
}

export async function getUserNotifications() {
    try {
        const notifications = await userApi.fetchUserNotifications();
        return notifications;
    } catch (error) {
        console.error('Failed to get user notifications:', error);
        throw error;
    }
}

export async function getAdminUsersNotifications() {
    try {
        const notifications = await userApi.fetchAdminUsersNotifications();
        return notifications;
    } catch (error) {
        console.error('Failed to get users notifications:', error);
        throw error;
    }
}

/*----------------- Profile -------------------------------*/
export async function getUserProfile() {
    return await userApi.fetchUserProfile();
}

export async function getAllProfiles() {
    return await userApi.fetchAllProfiles();
}

/*-------------- Promotions --------------------------------------*/