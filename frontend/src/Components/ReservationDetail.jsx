import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

/*------------------ Services -------------------------------------*/
import reservationService from "../services/reservationService"

/*---------------- CSS Files ---------------------------*/
import '../static/reservation.css';
/*---------------- Components ---------------------------*/
import Footer from "../Components/Footer";

const ReservationDetail = () => {
    const { reservationId } = useParams(); 
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await reservationService.getReservationDetails(reservationId);
                setReservation(response.reservation);
                console.log("La réponse est : " + response);
            } catch (error) {
                alert('Erreur lors du chargement des détails de la réservation.');
                console.log("Erreur : " + error);   
            }
        };
        fetchReservation();
    }, [reservationId]); 

    return (
        <>
        <div className="container my-5" id="reservationDetail">
            <h2>Détails de la Réservation</h2>
            {reservation ? (
                <div>
                    <p><strong>ID:</strong> {reservation.id}</p>
                    <p><strong>Date et Heure:</strong> {reservation.date_time}</p>
                    <p><strong>Invités:</strong> {reservation.num_of_guests}</p>
                    <p><strong>Demandes Spéciales:</strong> {reservation.special_requests}</p>
                    <p><strong>Statut:</strong> {reservation.status}</p>
                </div>
            ) : (
                <p className="loading">Chargement...</p>
            )}
        </div>
        <Footer />
        </>
    );
};

export default ReservationDetail;
