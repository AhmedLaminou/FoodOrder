// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; 
/*---------------------- CSS Files ---------------------------------*/
import "../static/order.css";
/*----------------------- Components -----------------------------*/
import Footer from "../Components/Footer";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); 

  const handleReturnToMenu = () => {
    navigate('/');
  };

  return (
    <>
      <div className="order-confirmation-container" id="orderConfirmation">
        <div className="order-confirmation-card">
          <h2 className="confirmation-header">Commande Confirmée</h2>
          <p className="confirmation-message">
            Merci pour votre commande n° <strong>{orderId}</strong> !<br />
            Nous la préparons et vous serez informé dès qu’elle sera prête à être livrée.
          </p>
          <Button variant="success" onClick={handleReturnToMenu} className="back-to-menu-btn">
            Retour au menu
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
