import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaSignOutAlt, FaEdit, FaHistory, FaHeart, FaShoppingBag } from 'react-icons/fa';

/*--------------------- Service Files ---------------------------------*/
import { getUserProfile } from '../services/userService';
import { updateUserProfileDetails } from '../services/user-api';

/*--------------------- CSS Files ---------------------------------*/
import "../static/user.css"
/*------------------ Images -----------------------------*/
import defaultImage from "../assets/Food/NelsonMandela.avif"
/*------------------------- Components ----------------------------*/
import Footer from "../Components/Footer"

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        bio: '',
        profilePicture: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setProfile(response);
                setEditForm({
                    bio: response?.bio || '',
                    profilePicture: response?.profile_picture || ''
                });
                setError(null);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error.message || "Failed to load profile");
                if (error.message?.includes('token') || error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await updateUserProfileDetails(editForm.bio, editForm.profilePicture);
            setProfile(prev => ({
                ...prev,
                bio: editForm.bio,
                profile_picture: editForm.profilePicture
            }));
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile");
        }
    };

    if (loading) return (
        <div className="profile-loading">
            <div className="neon-spinner"></div>
            <p>Loading your profile...</p>
        </div>
    );

    if (error) return (
        <div className="profile-error">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => navigate('/login')}>Back to Login</button>
        </div>
    );

    return (
        <>
        <div className="profile-container">
            <div className="neon-border">
                
                <div className="profile-header">
                    <div className="profile-avatar">
                        <img 
                            src={profile?.profile_picture || defaultImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + profile?.username} 
                            alt="Profile" 
                        />
                        {!isEditing && (
                            <button className="edit-avatar neon-button" onClick={() => setIsEditing(true)}>
                                <FaEdit />
                            </button>
                        )}
                    </div>
                    <div className="profile-header-info">
                        <h1 className="neon-text">{profile?.username || 'User'}</h1>
                        <p className="neon-subtext">{profile?.email}</p>
                    </div>
                </div>

                
                {isEditing && (
                    <form onSubmit={handleEditSubmit} className="edit-form">
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={editForm.bio}
                                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Profile Picture URL</label>
                            <input
                                type="text"
                                value={editForm.profilePicture}
                                onChange={(e) => setEditForm(prev => ({ ...prev, profilePicture: e.target.value }))}
                                placeholder="Enter image URL..."
                            />
                        </div>
                        <div className="edit-actions">
                            <button type="submit" className="neon-button save-btn">Save Changes</button>
                            <button type="button" className="neon-button cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                )}

                {/* Profile Navigation */}
                <div className="profile-nav">
                    <button 
                        className={`neon-button ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaUser /> Profile
                    </button>
                    <button 
                        className={`neon-button ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <FaShoppingBag /> Orders
                    </button>
                    <button 
                        className={`neon-button ${activeTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        <FaHeart /> Favorites
                    </button>
                    <button 
                        className={`neon-button ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <FaHistory /> History
                    </button>
                </div>

                {/* Profile Content */}
                <div className="profile-content neon-glow">
                    {activeTab === 'profile' && !isEditing && (
                        <div className="profile-details">
                            <div className="info-card">
                                <FaUser className="info-icon" />
                                <div>
                                    <h3>Username</h3>
                                    <p>{profile?.username}</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <FaEnvelope className="info-icon" />
                                <div>
                                    <h3>Email</h3>
                                    <p>{profile?.email}</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <FaPhone className="info-icon" />
                                <div>
                                    <h3>Bio</h3>
                                    <p>{profile?.bio || 'No bio yet'}</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <FaCalendar className="info-icon" />
                                <div>
                                    <h3>Joined</h3>
                                    <p>{new Date(profile?.date_joined).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'orders' && (
                        <div className="orders-section">
                            <h2 className="neon-text">Recent Orders</h2>
                            
                        </div>
                    )}
                    {activeTab === 'favorites' && (
                        <div className="favorites-section">
                            <h2 className="neon-text">Your Favorites</h2>
                           
                        </div>
                    )}
                    {activeTab === 'history' && (
                        <div className="history-section">
                            <h2 className="neon-text">Activity History</h2>
                           
                        </div>
                    )}
                </div>

                {!isEditing && (
                    <div className="profile-actions">
                        <button className="neon-button edit-profile-btn" onClick={() => setIsEditing(true)}>
                            <FaEdit /> Edit Profile
                        </button>
                        <button className="neon-button logout-btn" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default ProfilePage;
