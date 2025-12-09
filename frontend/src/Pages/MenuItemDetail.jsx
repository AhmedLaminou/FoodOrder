import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/*------------------------ Redux ---------------------------------*/
// eslint-disable-next-line no-unused-vars
import { addToCart } from "../redux/cartActions"; 
import { addItem } from "../redux/cartSlice";
/*-------------------- Components ------------------------------*/
import Footer from "../Components/Footer";
/*--------------------- CSS Files -----------------------------------*/
import "../static/menu.css";
/*------------------- Images ---------------------------------------------*/
import defaultImage from "../assets/Food/pizzaTunis.webp";

const MenuItemDetails = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:8000/menu/api/menu-items/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setMenuItem(data);
      })
      .catch((error) => console.error("Erreur de chargement du plat", error));
  }, [id]);

  const handleOrderClick = () => {
    
    dispatch(addItem({ ...menuItem, quantity }));

    navigate("/cart");
  };

  return (
    <>
      <div className="container mt-5 menu-item-details-container" id="menuItemDetail">
        {menuItem ? (
          <div className="row align-items-center futuristic-card">
            <div className="col-md-6 text-center">
              <img
                src={menuItem.image ? `http://localhost:8000${menuItem.image}` : defaultImage}
                alt={menuItem.name}
                className="img-fluid rounded shadow-lg futuristic-img"
              />
            </div>
            <div className="col-md-6">
              <h2 className="display-4 fw-bold futuristic-title">{menuItem.name}</h2>
              <p className="lead text-muted futuristic-description">{menuItem.description}</p>
              <h4 className="text-primary futuristic-price">
                ${parseFloat(menuItem.price).toFixed(2)}
              </h4>
              <div className="mt-3">
                <h5 className="fw-bold futuristic-subtitle">Catégorie :</h5>
                <span className="badge bg-secondary fs-6 futuristic-badge">
                  {menuItem.category}
                </span>
              </div>
              <div className="mt-3">
                <h5 className="fw-bold futuristic-subtitle">Tags :</h5>
                {/* Tags si disponibles */}
                {menuItem.tags && menuItem.tags.length > 0 ? (
                  menuItem.tags.map((tag) => (
                    <span key={tag.id} className="badge bg-info me-2 fs-6 futuristic-badge">
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className="text-muted futuristic-muted">Aucun tag disponible</span>
                )}
              </div>
              <div className="mt-4">
                <h5 className="fw-bold futuristic-subtitle">Quantité :</h5>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control"
                  style={{ width: "80px" }}
                />
              </div>
              <button
                onClick={handleOrderClick}
                className="btn btn-success mt-4 px-4 py-2 futuristic-button"
              >
                Ajouter au Panier
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center futuristic-loading">Chargement...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MenuItemDetails;
