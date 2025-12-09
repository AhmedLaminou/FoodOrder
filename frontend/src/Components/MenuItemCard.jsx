import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaStar , FaRegHeart  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

/*------------------------- Redux -------------------------------*/
import { addItem, toggleFavorite } from "../redux/cartSlice";

/*------------------------- CSS Files -------------------------------*/
import "../static/menu.css";
/*------------------------- Images ----------------------------------*/
import defaultImage from "../assets/Food/pizzaTunis.webp";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const favorites = useSelector(state => state.cart.favorites);
  const [isFavorited, setIsFavorited] = useState(false);
  const [rating, setRating] = useState(item.rating || 0);
  useEffect(() => {
    
    setIsFavorited(favorites.includes(item.id));
  }, [favorites, item.id]);

  const handleOrderClick = () => {
    dispatch(addItem({ ...item, quantity: 1 }));
    
    alert("Item added to cart!");
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(item.id));
  };

  const renderRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onClick={() => setRating(i)}
          style={{ cursor: "pointer" }}
        />
      );
    }
    return stars;
  };
  
  return (
    <div className="menu-card" id="menu-item-card-container">
      <img
        src={`${item.image}?${new Date().getTime()}`}
        alt={item.name}
        className="card-img-top"
        onError={(e) => (e.target.src = defaultImage)}
      />
      <div className="card-body">
        <div className="card-header">
          <h5 className="card-title">{item.name}</h5>
          <button onClick={handleFavoriteClick} className="favorite-btn">
        {isFavorited ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
          </button>
        </div>
        <p className="price">${parseFloat(item.price).toFixed(2)}</p>
        <div className="rating">{renderRating()}</div>
        <div className="card-actions">
          <button onClick={handleOrderClick} className="btn order-btn">
            Add to Cart
          </button>
          <Link to={`/menu-item/${item.id}`} className="btn info-btn">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default MenuItemCard;