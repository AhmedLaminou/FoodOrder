import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
/*----------------------- Services -------------------------------*/
import { getMenuItemsByCategory } from "../services/menuService";
/*-------------------------  Components ------------------------------*/
import MenuItemCard from "./MenuItemCard";
import Footer from "../Components/Footer"

/*------------------------- CSS Files -------------------------------*/
import "../static/menu.css";


const MenuItemList = ({ categoryId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      getMenuItemsByCategory(categoryId)
        .then((data) => setMenuItems(data))
        // eslint-disable-next-line no-unused-vars
        .catch((err) => setError("Erreur lors du chargement des plats"))
            
        .finally(() => setLoading(false));
    }
  }, [categoryId]);

  if (loading) return <p className="text-center">Chargement en cours...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!menuItems.length) return <p className="text-center">Aucun plat disponible pour cette catégorie.</p>;

  return (
    <>
    <div id="menu-item-list-container">
      <h2 className="text-center text-bg-light">Nos plats</h2>
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4">
            <MenuItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

MenuItemList.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default MenuItemList;
