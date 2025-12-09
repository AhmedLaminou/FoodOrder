import  { useEffect, useState } from "react";
import { getCategories } from "../services/menuService";
import "../static/category.css";
import PropTypes from 'prop-types';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  if (!categories || categories.length === 0) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <div className="category-list" id="categoryList">
      <h2 className="text-center">Catégories</h2>
      <ul className="list-group">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`list-group-item category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category.id); 
              onSelectCategory(category.id);
            }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

CategoryList.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryList;
