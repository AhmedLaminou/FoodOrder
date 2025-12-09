// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

/*--------------------------------- Services -------------------------*/
import { getAllOrders } from '../services/orderService';

/*---------------------------------  Components -------------------------*/
import Footer from "../Components/Footer";
/*----------------- CSS Files --------------------------*/
import "../static/order.css"

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => { 
      try {
        const historyData = await getAllOrders();
        if (Array.isArray(historyData)) {
          setHistory(historyData);
        } else {
          setError("Les données reçues sont invalides.");
        }
      } catch (err) {
        setError("Impossible de récupérer l'historique des commandes.");
        console.log("Erreur" + err) ;  
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <>
    <div className="container" id="orderHistory">
      <h2>Order History</h2>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : history.length === 0 ? (
        <p>Aucun order trouvé.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Updated At</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.status}</td>
                <td>{item.updated_at}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    <Footer />
    </>
  );
};

export default OrderHistory;
