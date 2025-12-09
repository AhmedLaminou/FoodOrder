import axios from "axios";

const API_BASE_URL = "http://localhost:8000/reviews/api"

const ReviewAPI = {
    getAllReviews: () => axios.get(`${API_BASE_URL}/reviews/`),
    getUserReviews: () => axios.get(`${API_BASE_URL}/user/`),
    createReview: (rating, comment) => axios.post(`${API_BASE_URL}/create/`, { rating, comment }),
    updateReview: (reviewId, rating, comment) => axios.put(`${API_BASE_URL}/update/${reviewId}/`, { rating, comment }),
    deleteReview: (reviewId) => axios.delete(`${API_BASE_URL}/reviews/delete/${reviewId}/`),
    addReviewImage: (reviewId, image) => {
      const formData = new FormData();
      formData.append("image", image);
      return axios.post(`${API_BASE_URL}/${reviewId}/images/add/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    removeReviewImage: (imageId) => axios.delete(`${API_BASE_URL}/reviews/images/delete/${imageId}/`),
    addTagToReview: (reviewId, tagName) => axios.post(`${API_BASE_URL}/${reviewId}/tags/add/`, { tag_name: tagName }),
    removeTagFromReview: (reviewId, tagName) => axios.delete(`${API_BASE_URL}/${reviewId}/tags/remove/`, { data: { tag_name: tagName } }),
  };
  

export default ReviewAPI;
