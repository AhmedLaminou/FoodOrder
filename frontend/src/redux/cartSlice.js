import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  favorites: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },

    toggleFavorite: (state, action) => {
      const itemId = action.payload;
      const favoriteIndex = state.favorites.indexOf(itemId);
      if (favoriteIndex !== -1) {
        state.favorites.splice(favoriteIndex, 1);
      } else {
        state.favorites.push(itemId);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    loadCart: (state) => {
      const savedCart = localStorage.getItem('cart');
      const savedFavorites = localStorage.getItem('favorites');
      if (savedCart) {
        state.items = JSON.parse(savedCart);
      }
      if (savedFavorites) {
        state.favorites = JSON.parse(savedFavorites);
      }
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  removeFromCart, 
  clearCart, 
  toggleFavorite,
  loadCart,
  updateQuantity 
} = cartSlice.actions;

export default cartSlice.reducer;
