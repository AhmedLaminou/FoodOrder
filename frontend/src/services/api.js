const MENU_API_URL = 'http://localhost:8000/menu/api';


/*--------------------------------- Concernant l'application menu -----------------------------*/

export const fetchCategories = async () => {
    try {
      const response = await fetch(`${MENU_API_URL}/categories/`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return []; 
    }
  };
  

export const fetchMenuItemById = async (id) => {
  try {
    const response = await fetch(`${MENU_API_URL}/menu-item/${id}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching menu item with id ${id}:`, error);
  }
};

export const fetchMenuItemsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${MENU_API_URL}/categories/${categoryId}/menu-items/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching menu items for category ${categoryId}:`, error);
  }
};


export const createMenuItem = async (menuItemData) => {
  try {
    const response = await fetch(`${MENU_API_URL}/menu-item/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuItemData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating menu item:', error);
  }
};

export const createPromotion = async (promotionData) => {
  try {
    const response = await fetch(`${MENU_API_URL}/promotion/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promotionData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating promotion:', error);
  }
};

export const assignTagToMenuItem = async (menuItemId, tagId) => {
  try {
    const response = await fetch(`${MENU_API_URL}/assign-tag/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ menu_item_id: menuItemId, tag_id: tagId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error assigning tag to menu item:', error);
  }
};

export const fetchPromotions = async () => {
    try {
      const response = await fetch(`${MENU_API_URL}/promotions/`); 
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des promotions");
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Erreur API:", error);
      return [];
    }
  };

  export const getTagsForMenuItem = async (menuItemId) => {
    try {
      const response = await fetch(`${MENU_API_URL}/menu-items/${menuItemId}/tags/`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des tags");
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Erreur API:", error);
      return [];
    }
  };

  export const searchMenuItems = async (query) => {
    try {
      const response = await fetch(`${MENU_API_URL}/menu-items/search/?keyword=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Erreur lors de la recherche: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la recherche des produits :", error);
      return [];
    }
  };

/*---------------------- Concernant l'appli Order ---------------------------------------*/

const ORDER_API_URL = 'http://127.0.0.1:8000/orders/api';
const get = async (url) => {
    try {
      const response = await fetch(`${ORDER_API_URL}${url}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.status === 'error') {
        throw new Error(data.message || 'Unknown error');
      }
      return data;
    } catch (error) {
      console.error('Error:', error);
      return { status: 'error', message: error.message };
    }
  };
  

const post = async (url, data) => {
  try {
    const response = await fetch(`${ORDER_API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to post: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { status: 'error', message: error.message };
  }
};

const put = async (url, data) => {
  try {
    const response = await fetch(`${ORDER_API_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to put: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { status: 'error', message: error.message };
  }
};

const del = async (url) => {
  try {
    const response = await fetch(`${ORDER_API_URL}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { status: 'error', message: error.message };
  }
};


export { get, post , put , del };
