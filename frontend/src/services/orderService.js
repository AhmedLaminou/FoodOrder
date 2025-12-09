import { get, post } from './api';

const getCartItems = async (orderId) => {
    return await get(`/orders/${orderId}/items/`);
};

const getAllOrders = async () => {
    return await get('/all-orders/');
};

const createNewOrder = async (totalPrice, deliveryAddress) => {
    const data = { total_price: totalPrice, delivery_address: deliveryAddress };
    return await post('/orders/create/', data);
};

const updateOrderStatus = async (orderId, status) => {
    const data = { status };
    return await post(`/orders/update-status/${orderId}/`, data);
};

const addItemToOrder = async (orderId, menuItemId, quantity, price) => {
    const data = { menu_item_id: menuItemId, quantity, price };
    return await post(`/orders/${orderId}/add-item/`, data);
};

const processPayment = async (orderId, amount, paymentMethod) => {
    const data = { amount, payment_method: paymentMethod };
    return await post(`/orders/${orderId}/payment/`, data);
};

const createDeliveryForOrder = async (orderId, deliveryAddress, deliveryDate) => {
    const data = { delivery_address: deliveryAddress, delivery_date: deliveryDate };
    return await post(`/orders/${orderId}/delivery/`, data);
};

const addOrderHistory = async (orderId, status, note) => {
    const data = { status, note };
    return await post(`/orders/${orderId}/history/`, data);
};

const getOrder = async (orderId) => {
    return await get(`/orders/${orderId}/`);
};

const getUserOrders = async () => {
    return await get('/orders/user-orders/');
};

const getOrdersByStatus = async (status) => {
    return await get(`/orders/status/?status=${status}`);
};

const getOrderItems = async (orderId) => {
    return await get(`/orders/${orderId}/items/`);
};

const getOrderPayments = async (orderId) => {
    return await get(`/orders/${orderId}/payments/`);
};

const getOrderDeliveries = async (orderId) => {
    return await get(`/orders/${orderId}/deliveries/`);
};

const getOrderHistory = async (orderId) => {
    return await get(`/orders/${orderId}/history/`);
};

const updateDeliveryAddress = async (orderId, newAddress) => {
    const data = { new_address: newAddress };
    return await post(`/orders/${orderId}/delivery-address/`, data);
};

export {
    createNewOrder,
    updateOrderStatus,
    addItemToOrder,
    processPayment,
    createDeliveryForOrder,
    addOrderHistory,
    getOrder,
    getUserOrders,
    getOrdersByStatus,
    getOrderItems,
    getOrderPayments,
    getOrderDeliveries,
    getOrderHistory,
    updateDeliveryAddress,
    getCartItems,
    getAllOrders
};
