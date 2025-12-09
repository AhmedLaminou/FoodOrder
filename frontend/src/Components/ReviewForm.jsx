import { useState } from "react";
import PropTypes from "prop-types";

/*------------------ Services ---------------------------------*/
import ReviewService from "../services/reviewService";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

/*---------------------- CSS Files ---------------------------------*/
import "../static/review.css" ; 
/*------------------ Components ---------------------------------*/
import Footer from "../Components/Footer";

const ReviewForm = ({ review, onSuccess }) => {
  const [rating, setRating] = useState(review ? review.rating : "");
  const [comment, setComment] = useState(review ? review.comment : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (review) {
      await ReviewService.updateReview(review.review_id, { rating, comment });
    } else {
      await ReviewService.createReview({ rating, comment });
    }
    
    onSuccess();
  };

  return (
    <>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="bg-light p-4 rounded shadow-lg">
          <h3 className="text-center mb-4">{review ? "Modifier l'avis" : "Ajouter un avis"}</h3>
          <Form onSubmit={handleSubmit} id="reviewForm">
            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
                placeholder="Entrez une note entre 1 et 5"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Commentaire</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Votre commentaire ici"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {review ? "Modifier" : "Ajouter"} le avis
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  );
};

ReviewForm.propTypes = {
  review: PropTypes.shape({
    review_id: PropTypes.number,
    rating: PropTypes.number,
    comment: PropTypes.string,
  }),
  onSuccess: PropTypes.func.isRequired,
};

export default ReviewForm;
