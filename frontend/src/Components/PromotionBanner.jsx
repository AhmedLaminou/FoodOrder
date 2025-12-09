// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getPromotions } from "../services/api";
import "../static/promotion.css";

const PromotionBanner = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    getPromotions().then((data) => setPromotions(data));
  }, []);

  return (
    <div className="promotion-banner">
      <h2>Promotions</h2>
      {promotions.length > 0 ? (
        <ul className="list-group">
          {promotions.map((promo) => (
            <li key={promo.id} className="list-group-item">
              {promo.name} - {promo.discount_percentage}% de réduction !
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune promotion en cours.</p>
      )}
    </div>
  );
};

export default PromotionBanner;
