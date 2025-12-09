import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

/*------------------------- Service Files ---------------------------------*/
import { searchItems, getCategories } from "../services/menuService";
/*--------------------------- Components -----------------------------------*/
import MenuItemCard from "../Components/MenuItemCard";
import Footer from "../Components/Footer";
/*--------------------- CSS Files ------------------------------*/
import "../static/search.css";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get("query");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (query) {
      searchItems(query).then((data) => {
        setResults(data);
        setFilteredResults(data);
      });
    }
    getCategories().then(setCategories);
  }, [query]);

  useEffect(() => {
    let filtered = [...results];
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category?.id === parseInt(selectedCategory));
    }
    filtered = filtered.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    setFilteredResults(filtered);
  }, [selectedCategory, priceRange, results]);

  return (
    <>
      <div className="container mt-5 pt-5">
        <motion.h2 
          className="mb-4 text-center" 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Résultats pour : <strong>{query}</strong>
        </motion.h2>

        <div className="row mb-4" data-aos="fade-up">
          <div className="col-md-6">
            <label className="form-label">Catégorie</label>
            <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">Toutes</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Prix entre {priceRange[0]}€ et {priceRange[1]}€</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              step="1"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
          </div>
        </div>

        <motion.div 
          className="d-flex flex-wrap justify-content-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{ minHeight: "300px" }}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div
                key={item.id}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <MenuItemCard item={item} />
              </div>
            ))
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
