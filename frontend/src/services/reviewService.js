import ReviewAPI from "./review-api";

const ReviewService = {
  fetchAllReviews: async () => {
    try {
      const response = await ReviewAPI.getAllReviews();
      return response.data.reviews;
    } catch (error) {
      console.error("Erreur lors de la récupération des avis:", error);
      return [];
    }
  },

  fetchUserReviews: async () => {
    try {
      const response = await ReviewAPI.getUserReviews();
      return response.data.reviews;
    } catch (error) {
      console.error("Erreur lors de la récupération des avis de l'utilisateur:", error);
      return [];
    }
  },

  submitReview: async (rating, comment) => {
    try {
      const response = await ReviewAPI.createReview(rating, comment);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'avis:", error);
      return null;
    }
  },

  modifyReview: async (reviewId, rating, comment) => {
    try {
      const response = await ReviewAPI.updateReview(reviewId, rating, comment);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avis:", error);
      return null;
    }
  },

  removeReview: async (reviewId) => {
    try {
      await ReviewAPI.deleteReview(reviewId);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      return false;
    }
  },

  uploadReviewImage: async (reviewId, image) => {
    try {
      const response = await ReviewAPI.addReviewImage(reviewId, image);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image à l'avis:", error);
      return null;
    }
  },

  deleteReviewImage: async (imageId) => {
    try {
      await ReviewAPI.removeReviewImage(imageId);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image:", error);
      return false;
    }
  },

  addTag: async (reviewId, tagName) => {
    try {
      const response = await ReviewAPI.addTagToReview(reviewId, tagName);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du tag:", error);
      return null;
    }
  },

  removeTag: async (reviewId, tagName) => {
    try {
      await ReviewAPI.removeTagFromReview(reviewId, tagName);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression du tag:", error);
      return false;
    }
  },
};

export default ReviewService;
