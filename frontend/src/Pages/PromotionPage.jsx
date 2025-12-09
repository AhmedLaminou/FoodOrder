import  { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
/*------------Images ---------------------------*/
const defaultPromotionPage = "C:/Users/Pc_Hp/Documents/PROJETS/Restaurant/frontend/src/assets/Food/cp.jpg"

/*--------------------------------------- CSS Files --------------------------------*/
import "../static/promotion.css"
/*----------------------- Services -------------------------------------*/
import {getPromotions} from "../services/menuService"
/*---------------------- Components -----------------------*/
import Footer from "../Components/Footer"

const PromotionPage = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            const response = await getPromotions();
            console.log(response);
            setPromotions(response);
            console.log(promotions);
        };
        fetchPromotions();
    }, []);

    if (!promotions) {
        return <div>Loading...</div>;
    }

    return (
        <>
             <div className="container" id="promotionPage">
                <h2 className="text-center mb-4">Promotions en cours</h2>
                <div className="row">
                        {promotions.map((promotion) => (
                        <div className="col-md-4 mb-4" key={promotion.id}>
                            <div className="card h-100">
                                <img
                                src={promotion.menu_item.image || defaultPromotionPage}  
                                className="card-img-top"
                                alt={promotion.menu_item.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{promotion.name}</h5>
                                    <p className="card-text">{promotion.description}</p>
                                    <p><strong>Prix : </strong>{promotion.menu_item.price} €</p>
                                    <p><strong>Évaluation : </strong>{promotion.menu_item.rating} ⭐</p>
                                    <p><strong>Réduction : </strong>{promotion.discount_percentage}%</p>
                                    <p><strong>Début : </strong>{new Date(promotion.start_date).toLocaleDateString()}</p>
                                    <p><strong>Fin : </strong>{new Date(promotion.end_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
        </div>
        <Footer />
        </>
       

    );
};

export default PromotionPage;
