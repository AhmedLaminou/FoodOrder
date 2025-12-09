import { useState } from "react";
import PropTypes from "prop-types";

/*------------------ Services ---------------------------------*/
import ReviewService from "../services/reviewService";
import { Form, Button, Alert } from "react-bootstrap";

/*--------------------- CSS Files ---------------------------------*/
import "../static/review.css" ; 
/*-------------------- Components ---------------------------------*/
import Footer from "../Components/Footer";

const ReviewImageUpload = ({ reviewId }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const result = await ReviewService.uploadReviewImage(reviewId, formData);

    if (result) {
      setSuccess("Image téléchargée avec succès.");
      setError(null);
    } else {
      setError("Erreur lors du téléchargement de l'image.");
    }
  };

  return (
    <>
    <div className="container mt-5" id="reviewImageUpload">
        <h3 className="text-center mb-4">Ajouter une image à le avis</h3>

        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        {success && <Alert variant="success" className="text-center">{success}</Alert>}

        <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-lg bg-light">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choisir une image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              className="form-control-file"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Télécharger
          </Button>
        </Form>
    </div>
    <Footer />
    </>
  );
};

ReviewImageUpload.propTypes = {
  reviewId: PropTypes.string.isRequired,
};

export default ReviewImageUpload;
