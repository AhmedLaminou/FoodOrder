
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getCartItems,
    getOrder,
    processPayment,
    updateOrderStatus,
    createDeliveryForOrder
} from '../services/orderService';
/*--------------------------- CSS Files ---------------------------------*/
import '../static/checkout.css'; 
/*--------------------------- Components -------------------------------*/
import Footer from '../Components/Footer';
import MapSelector from '../Components/MapSelector';
import { reverseGeocode } from '../services/geocodeService';
/*--------------------------- Images -------------------------------*/


const CheckOutPage = () => {
    const { orderId } = useParams();  
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [order, setOrder] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryCoords, setDeliveryCoords] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [loading, setLoading] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);
    const [mapAddress, setMapAddress] = useState('');

    // Handler when user selects a location on the map
    const handleLocationSelect = async (coords) => {
        setDeliveryCoords(coords);
        setAddressLoading(true);
        setMapAddress('');
        try {
            const address = await reverseGeocode(coords[0], coords[1]);
            setMapAddress(address);
            setDeliveryAddress(address);
        } catch {
            setMapAddress(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
            setDeliveryAddress(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
        } finally {
            setAddressLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await getCartItems(orderId);
                const orderDetails = await getOrder(orderId);

                setCartItems(Array.isArray(items) ? items : []);
                setOrder(orderDetails);
                setDeliveryAddress(orderDetails.delivery_address || '');
            } catch (error) {
                console.error("Erreur lors du chargement de la commande :", error);
                setCartItems([]);
            }
        };
        fetchData();
    }, [orderId]);

    const handlePayment = async () => {
        if (!deliveryAddress) {
            alert("Adresse de livraison requise !");
            return;
        }

        setLoading(true);
        try {
            await processPayment(orderId, order.total_price, paymentMethod);
            await updateOrderStatus(orderId, 'Confirmed');
            await createDeliveryForOrder(orderId, deliveryAddress, new Date().toISOString());
            navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
            alert("Échec du paiement !");
            console.error("Erreur lors du traitement du paiement :", error);
        } finally {
            setLoading(false);
        }
    };

    if (!order) return <p>Chargement...</p>;

    return (
        <>
        <div className="checkout-container">
                
            <h2>Page de Paiement</h2>

            <div className="order-summary">
                <h3>Résumé de la commande</h3>
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.orderItemId} className="cart-item">
                            <span>{item.menu_item.name} x {item.quantity}</span>
                            <span>{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                    ))
                ) : (
                    <p>Votre panier est vide.</p>
                )}
                <div className="total">
                    <strong>Total :</strong> {order.total_price} DT
                </div>
            </div>

            <div className="checkout-map-block">
                <label style={{fontWeight:600, marginBottom:'0.5rem', display:'block'}}>
                    Choisissez votre position de livraison sur la carte :
                </label>
                <MapSelector onLocationSelect={handleLocationSelect} height="320px" />
                <div className="selected-coords" style={{marginTop:'0.5rem', minHeight:'1.4em'}}>
                  {addressLoading && deliveryCoords ? (
                    <span style={{color:'#888'}}>Recherche de l'adresse...</span>
                  ) : mapAddress ? (
                    <span style={{color:'#2193b0', fontWeight:500}}>Adresse sélectionnée : {mapAddress}</span>
                  ) : (
                    <span style={{color:'#888'}}>Cliquez sur la carte pour choisir votre adresse de livraison</span>
                  )}
                </div>
            </div>

            <div className="checkout-form">
                <label>
                    Adresse de livraison :
                    <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Entrez votre adresse"
                    />
                </label>

                <label>
                    Mode de paiement :
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="Credit Card">Carte de Crédit</option>
                        <option value="Cash">Espèces</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Virement bancaire</option>
                    </select>
                </label>

                <button onClick={handlePayment} disabled={loading}>
                    {loading ? 'Paiement en cours...' : 'Payer maintenant'}
                </button>
            </div>
        </div>
        <Footer />
        </>

    );
};

export default CheckOutPage;
