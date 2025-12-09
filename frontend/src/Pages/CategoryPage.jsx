import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
/*------------------------ Services ---------------------------------*/
import { getCategories } from '../services/menuService';
/*------------------------ CSS Files ---------------------------------*/
import "../static/category.css";
/*--------------------------- Components -----------------------------------*/
import Footer from "../Components/Footer";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
    <div id="categoryPage">
      <h1 className='category-title'>Menu Categories</h1>
      <ul className="category-list">
        {Array.isArray(categories) && categories.map(category => (
          <li className='category-item' key={category.id}>
            <Link to={`/menu/categories/${category.id}/menu-items`} className="category-link">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
  );
};

export default CategoryPage;
