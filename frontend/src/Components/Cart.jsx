// Cart.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { removeFromCart, clearCart, updateQuantity } from "../redux/cartSlice";
/*------------------- Components ------------------------------------*/
import Footer from "../Components/Footer";
/*------------------- Services ------------------------------------*/
import { createNewOrder, addItemToOrder } from "../services/orderService";
/*------------------- CSS Files ------------------------------------*/
import "../static/cart.css";
/*---------------------------- Images --------------------------------*/
import defaultCartImage from "../assets/Food/couscousPoulet.jpg"
import emptyCartImage from "../assets/Food/empty-cart.jpg"

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.items || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = async () => {
    try {
      const totalPrice = calculateTotal(cartItems); 
      const deliveryAddress = "123 Street"; 
      const response = await createNewOrder(totalPrice, deliveryAddress); 
      const orderId = response.orderId;
  
      for (const item of cartItems) {
        await addItemToOrder(orderId, item.id, item.quantity, item.price);
      }
  
      navigate(`/checkout/${orderId}`);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const formatPrice = (value) => Number.parseFloat(value ?? 0).toFixed(2);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart-header elegant-shadow">
          <h2 className="cart-title">🛒 Your Cart</h2>
          {cartItems.length > 0 && (
            <div className="cart-actions">
              <Button variant="outline-danger" className="clear-cart-btn" onClick={handleClearCart}>
                <FaTrash /> Clear Cart
              </Button>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={emptyCartImage} alt="Empty Cart" className="empty-cart-img" />
            <h3>Your cart is empty</h3>
            <Button variant="primary" className="browse-menu-btn" onClick={() => navigate("/menu")}>Browse Menu</Button>
          </div>
        ) : (
          <div className="cart-items-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card elegant-shadow">
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultCartImage;
                    }}
                  />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <Button 
                      variant="link" 
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta-row">
                    <span className="item-price">${formatPrice(item.price)}</span>
                    <span className="item-total">Total: <b>${formatPrice(item.quantity * item.price)}</b></span>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <Button 
                        variant="outline-secondary" 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <FaMinus />
                      </Button>
                      <span className="quantity">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="cart-footer elegant-shadow">
            <div className="cart-total-row">
              <span className="cart-total-label">Total Amount:</span>
              <span className="total-amount">${formatPrice(calculateTotal())}</span>
            </div>
            <Button 
              variant="success" 
              size="lg" 
              onClick={handleCheckout}
              className="checkout-btn"
            >
              <span role="img" aria-label="checkout">💳</span> Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
