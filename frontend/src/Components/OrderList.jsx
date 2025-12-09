// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

/*------------------------- Service Files ---------------------------------*/
import { getAllOrders } from '../services/orderService';

/*------------------------- CSS Files ---------------------------------*/
import "../static/order.css"

/*-------------------------  Components ---------------------------------*/
import Footer from "../Components/Footer"


const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderList = await getAllOrders();
      setOrders(orderList);
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
   
    console.log(`Viewing Order #${orderId}`);
  };

  return (
    <>
    <div className="container" id="orderList">
      <h2>Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.status}</td>
              <td>{order.total_price}</td>
              <td>{order.payment_status}</td>
              <td>
                <Button variant="info" onClick={() => handleViewOrder(order.orderId)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <Footer />
    </>
  );
};

export default OrderList;
