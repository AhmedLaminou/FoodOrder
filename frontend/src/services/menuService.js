import * as api from './api';

export const searchItems = async (query) => {
  const results = await api.searchMenuItems(query);
  return results;
};

export const getCategories = async () => {
  const categories = await api.fetchCategories();
  
  return categories;
};

export const getPromotions = async () => {
  const promotions = await api.fetchPromotions();
  
  return promotions;
};  

export const getMenuItemsByCategory = async (categoryId) => {
  const items = await api.fetchMenuItemsByCategory(categoryId);
  return items;
};

export const getMenuItemById = async (id) => {
  const item = await api.fetchMenuItemById(id);
  return item;
};

export const addMenuItem = async (menuItemData) => {
  const newMenuItem = await api.createMenuItem(menuItemData);
  return newMenuItem;
};

export const addPromotion = async (promotionData) => {
  const newPromotion = await api.createPromotion(promotionData);
  return newPromotion;
};

export const assignTagToItem = async (menuItemId, tagId) => {
  const response = await api.assignTagToMenuItem(menuItemId, tagId);
  return response;
};

export const createMenuItem = async (menuItemData) => {
  const newMenuItem = await api.createMenuItem(menuItemData);
  return newMenuItem;
};
