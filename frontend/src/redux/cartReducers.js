

const initialState = {
  cart: [], 
  favorites: [], 
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      { const itemInCart = state.cart.find(
        (item) => item.item.id === action.payload.item.id
      );
      if (itemInCart) {

        return {
          ...state,
          cart: state.cart.map((item) =>
            item.item.id === action.payload.item.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        
        return {
          ...state,
          cart: [
            ...state.cart,
            { item: action.payload.item, quantity: action.payload.quantity },
          ],
        };
      } }

    case "TOGGLE_FAVORITE":
      { const isFavorite = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (isFavorite) {
        
        return {
          ...state,
          favorites: state.favorites.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      } else {
        
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      } }

    default:
      return state;
  }
};

export default cartReducer;
