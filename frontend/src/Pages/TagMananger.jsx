import { useState } from "react";
import PropTypes from "prop-types";

/*------------------------- Service Files ---------------------------------*/
import ReviewService from "../services/reviewService";

/*------------------ CSS Files ------------------------------------------*/

/*-------------------- Components --------------------------------*/
import Footer from "../Components/Footer";

const ReviewTagManager = ({ reviewId }) => {
  const [tag, setTag] = useState("");

  const handleAddTag = async () => {
    if (tag.trim()) {
      await ReviewService.addTagToReview(reviewId, tag);
      alert("Tag ajouté avec succès !");
      setTag("");
    }
  };

  const handleRemoveTag = async () => {
    if (tag.trim()) {
      await ReviewService.removeTagFromReview(reviewId, tag);
      alert("Tag supprimé avec succès !");
      setTag("");
    }
  };

  return (
    <>
    <div className="tag-manager" id="reviewTagManager">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Entrez un tag"
          className="tag-input"
        />
        <div className="action-buttons">
            <button onClick={handleAddTag} className="add-btn">
              Ajouter
            </button>
            <button onClick={handleRemoveTag} className="remove-btn">
              Supprimer
            </button>
        </div>
    </div>
    <Footer />
    </>
  );
};

ReviewTagManager.propTypes = {
  reviewId: PropTypes.string.isRequired,
};

export default ReviewTagManager;
