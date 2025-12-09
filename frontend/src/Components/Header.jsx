import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaUserPlus, FaSignInAlt, FaSignOutAlt, FaApple } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import "../static/header.css";
/*-------------------------- Images --------------------------*/
import frontPage from "../assets/Food/sandwichPoulet.webp";
import logo from "../assets/Food/lightning-charge-fill.svg";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const { user, logout } = useContext(AuthContext);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <header id="header" className="container-fluid position-relative">
      <div
        className="position-absolute top-0 start-0 w-100 h-100 container-fluid"
        style={{
          backgroundImage: `url(${frontPage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="position-relative z-3 d-flex flex-column align-items-center justify-content-center text-center py-5">
        <nav className="w-100 d-flex justify-content-between align-items-center px-4 py-3 bg-black bg-opacity-75 fixed-top">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              id="elegant-icon"
              style={{ width: "50px", height: "50px", backgroundColor: "gold" }}
            />
            <h1 className="fs-4 fw-bold text-light text-center ms-2 mb-0">
              The FastLunch Purchase.com
            </h1>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link to="/cart" className="cart-icon-container text-decoration-none">
              <div className="position-relative">
                <FaShoppingCart className="text-light fs-4" />
                {cartItemCount > 0 && (
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="text-light">
                  <FaUser className="fs-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <FaSignOutAlt className="me-1" /> Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-outline-light btn-sm">
                  <FaUserPlus className="me-1" /> Se inscrire
                </Link>
                <Link to="/login" className="btn btn-light btn-sm">
                  <FaSignInAlt className="me-1" /> Se connecter
                </Link>
                <Link to="/ai-chat" className="btn btn-light btn-sm">
                  <FaApple className="me-1" /> IA
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="mt-5 pt-5">
          <h2 className="display-4 fw-bold mb-4">
            Le principal Restaurant En ligne B2C pour vos Besoins
          </h2>
          <div className="input-group" style={{ maxWidth: "1100px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="What are you searching for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
