
 const addToCart = (item, quantity) => {
    return {
      type: "ADD_TO_CART",
      payload: {
        item,
        quantity,
      },
    };
  };
 
   const toggleFavorite = (item) => {
    return {
      type: "TOGGLE_FAVORITE",
      payload: item,
    };
  };

export {addToCart , toggleFavorite} ; 
  