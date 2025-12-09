// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReservationForm from '../Components/ReservationForm';
import ReservationList from '../Components/ReservationList';

/*------------------------- CSS Files ---------------------------------------*/
import '../static/reservation.css';

/*----------------- Components --------------------------*/
import Footer from "../Components/Footer";

const ReservationsPage = () => {
    return (
        <>
        <div className="container my-5" id="reservationsPage">
            <h1>Page des Réservations</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Créer une Nouvelle Réservation</h2>
                    <ReservationForm />
                </div>
                <div className="col-md-6">
                    <h2 className='text-center'>Vos réservations</h2>
                    <ReservationList />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default ReservationsPage;
