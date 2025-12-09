import api from "./reservation-api";

const reservationService = {
  createReservation: async (date_time, num_of_guests, special_requests) => {
    return api.post("/new/", {
      date_time,
      num_of_guests,
      special_requests,
    }, {
      credentials: 'include',
    });
  },

  getReservationDetails: async (reservation_id) => {
    return api.get(`/${reservation_id}/`, {
      credentials: 'include',
    });
  },

  cancelReservation: async (reservation_id) => {
    return api.post(`/${reservation_id}/cancel/`, {}, {
      credentials: 'include',
    });
  },

  getMenuList: async () => {
    return api.get("/menu/", {
      credentials: 'include',
    });
  },

  getAllReservations: async () => {
    return api.get("/all-reservations/", {
      credentials: 'include',
    });
  },

  getAllTables: async (date_time) => {
    return api.get(`/available-tables/?date_time=${encodeURIComponent(date_time)}`, {
        credentials: 'include',
    });
},
};

export default reservationService;
