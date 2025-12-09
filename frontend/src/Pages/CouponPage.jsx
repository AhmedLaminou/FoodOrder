import { useState, useEffect } from 'react';

/*---------------------- Service Files ---------------------------*/
import { getAllCoupons } from '../services/userService'; 

/*---------------------- CSS Files ---------------------------*/
import "../static/coupon.css"; 
/*--------------------- Components --------------------*/
import Footer from "../Components/Footer";

const CouponPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await getAllCoupons(); 
                setCoupons(data.coupons);
            } catch (err) {
                setError("Une erreur est survenue lors du chargement des coupons.");
                console.error(err);
            } finally {
                setLoading(false); 
            }
        };
        fetchCoupons();
    }, []);

    return (
        <>
            <div className="container mt-5" id="couponPage">
                <h2>Coupons Disponibles</h2>

                {loading ? (
                    <p>Chargement des coupons...</p> 
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <div className="list-group">
                        {Array.isArray(coupons) && coupons.map(coupon => (
                            <div 
                                className={`list-group-item ${coupon.is_used ? 'bg-secondary text-light' : ''}`} 
                                key={coupon.couponId}
                            >
                                <h5 className='text-center'>{coupon.title || coupon.code}</h5>
                                <p><strong>Description :</strong> {coupon.description || "Aucune description"}</p>
                                <p><strong>Réduction :</strong> {coupon.discount_percentage}%</p>
                                {coupon.discount_amount && (
                                    <p><strong>Montant :</strong> {coupon.discount_amount} €</p>
                                )}
                                <p><strong>Type :</strong> {coupon.type || "Non spécifié"}</p>
                                <p><strong>Date de création :</strong> {new Date(coupon.created_at).toLocaleDateString()}</p>
                                <p><strong>Expiration :</strong> {new Date(coupon.expiration_date).toLocaleDateString()}</p>
                                <p><strong>Statut :</strong> {coupon.is_used ? "Utilisé ✅" : "Disponible 🟢"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CouponPage;
