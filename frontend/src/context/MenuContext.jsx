// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCategories } from '../services/menuService'; 
import { getTagsForMenuItem} from '../services/api';
import {getPromotions} from "../services/menuService"
import PropTypes from 'prop-types';

const MenuContext = createContext();

export const useMenuContext = () => {
  return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [tags, setTags] = useState({});

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    getPromotions().then((data) => setPromotions(data));
  }, []);

  const fetchTagsForMenuItem = (menuItemId) => {
    getTagsForMenuItem(menuItemId).then((data) => {
      setTags((prevTags) => ({ ...prevTags, [menuItemId]: data }));
    });
  };

  return (
    <MenuContext.Provider value={{ categories, promotions, tags, fetchTagsForMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
