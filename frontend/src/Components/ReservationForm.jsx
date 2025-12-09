import  { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

/*------------------------- CSS Files ---------------------------------------*/
import '../static/reservation.css';

/*------------------ Services  -------------------------------*/

import reservationService from '../services/reservationService';


const ReservationForm = () => {
    const [dateTime, setDateTime] = useState('');
    const [numOfGuests, setNumOfGuests] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await reservationService.createReservation ; 
            
            alert('Réservation créée avec succès !');
        } catch  {
            alert('Erreur lors de la création de la réservation.');
        }
    };

    return (
        <div className="container my-5" id="reservationForm">
            <h2>Faire une Réservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="dateTime" className="form-label">Date et Heure</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numOfGuests" className="form-label">Nombre de Invités</label>
                    <input
                        type="number"
                        className="form-control"
                        id="numOfGuests"
                        value={numOfGuests}
                        onChange={(e) => setNumOfGuests(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="specialRequests" className="form-label">Demandes Spéciales</label>
                    <textarea
                        className="form-control"
                        id="specialRequests"
                        rows="3"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Réserver</button>
            </form>
        </div>
    );
};

export default ReservationForm;
