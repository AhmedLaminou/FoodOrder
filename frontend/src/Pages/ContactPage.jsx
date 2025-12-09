import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/*---------------------- CSS Files ------------------------------------*/
import '../static/contact.css'; 
/*--------------------- Images ----------------------------------------*/
import phoneIcon from '../assets/Food/phoneIcon.png';
import emailIcon from '../assets/Food/emailIcon.png';
import locationIcon from '../assets/Food/locationIcon.png';

import { sendContactMessage } from '../services/user-api'; 

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitMessage = () => {
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            const response = await sendContactMessage(formData);
    
            if (response.status === 'success') {
                setFormStatus('Votre message a bien été envoyé !');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus('Erreur : ' + (response.message || 'Veuillez réessayer.'));
            }
        } else {
            setFormStatus('Veuillez remplir tous les champs.');
        }
    };

    return (
        <div className="contact-container" id="contactPage">
            <header className="contact-header">
                <h1>Contactez-nous</h1>
                <p>Nous sommes à votre écoute !</p>
            </header>

            <section className="contact-info">
                <div className="contact-item">
                    <img src={phoneIcon} alt="Téléphone" className="contact-icon" />
                    <p>(+216) 56 19 384 7</p>
                </div>
                <div className="contact-item">
                    <img src={emailIcon} alt="Email" className="contact-icon" />
                    <p>contact@TheFastLunch.com</p>
                </div>
                <div className="contact-item">
                    <img src={locationIcon} alt="Adresse" className="contact-icon" />
                    <p>123 Koubia , Niamey, Niger</p>
                </div>
            </section>

            <section className="contact-form">
                <h2>Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" onClick={handleSubmitMessage}>Envoyer</button>
                </form>
                {formStatus && <p className="form-status">{formStatus}</p>}
            </section>
        </div>
    );
};

export default ContactUs;
