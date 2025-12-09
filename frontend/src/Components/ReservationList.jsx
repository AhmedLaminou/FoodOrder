import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  

/*------------------------- My Services -------------------------------*/
import reservationService from "../services/reservationService";

/*------------------------- CSS Files ---------------------------------------*/
import '../static/reservation.css';
/*------------------ Components ----------------------------------------*/
// eslint-disable-next-line no-unused-vars
import Footer from "../Components/Footer";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await reservationService.getAllReservations();
                

                if (Array.isArray(response.reservations)) {
                    setReservations(response.reservations);
                } else {
                    setError("Les données reçues sont invalides.");
                }
            } catch (err) {
                setError("Erreur lors du chargement des réservations.");
                console.error("Erreur :", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    return (
        <>
        <div className="container my-5" id="reservationList">
            <h2>Liste des Réservations</h2>

            {loading ? (
                <p>Chargement en cours...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : reservations.length === 0 ? (
                <p>Aucune réservation disponible.</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Date et Heure</th>
                                <th scope="col">Invités</th>
                                <th scope="col">Statut</th>
                                <th scope="col">Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>{reservation.id}</td>
                                    <td>{reservation.date_time}</td>
                                    <td>{reservation.num_of_guests}</td>
                                    <td>{reservation.status}</td>
                                    <td>
                                        <Link to={`/reservation/${reservation.id}`} className="btn btn-dark btn-link">
                                            VIEW
                                        </Link>
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
        </>
    );
};

export default ReservationList;
