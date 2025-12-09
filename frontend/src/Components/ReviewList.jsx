import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";

/*-------------------------- Services -----------------------------------------*/
import ReviewService from "../services/reviewService";

/*--------------------- CSS Files ---------------------------------*/
import "../static/review.css" ; 
/*-------------------- Components ---------------------------------*/
import Footer from "../Components/Footer";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ReviewService.fetchAllReviews();
        console.log("Avis récupérés:", data);
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
        setError("Une erreur est survenue lors de la récupération des avis.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Liste des Avis</h2>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Spinner animation="border" variant="primary" /> Chargement...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Liste des Avis</h2>
        <Alert variant="danger" className="mt-4 text-center">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <>
    <div className="container mt-5">
        <h2 className="text-center mb-4">Liste des Avis</h2>
        <Row>
          {reviews.map((review) => (
            <Col key={review.reviewId} md={4} className="mb-4">
              <Card className="shadow-sm rounded-lg">
                <Card.Body>
                  <Card.Title className="font-weight-bold text-primary">
                    {review.user.username}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Note :</strong> {review.rating}
                  </Card.Subtitle>
                  <Card.Text>{review.comment || "Aucun commentaire"}</Card.Text>
                  <Button variant="outline-primary" className="w-100">
                    Voir plus
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
    </div>
    <Footer />
    </>
  );
};

export default ReviewList;
