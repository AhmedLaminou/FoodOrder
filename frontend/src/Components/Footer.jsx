/*--------------------------------React Importations ----------------------------------*/

/* --------------------------- CSS Import Files ----------------------------------*/
import "../static/footer.css";
/*------------------------- Images -----------------------------------------------*/
import youtube from "../assets/Food/youtube.svg";
import whatsapp from "../assets/Food/whatsapp.svg";
import github from "../assets/Food/github.svg";
import hilton from "../assets/Food/Hilton.jpg";
import monoprix from "../assets/Food/monoprix.webp"
import visa from "../assets/Food/visa.webp"
import masterCard from "../assets/Food/masterCard.png"
import ecobankCard from "../assets/Food/ecobankCard.jpg"
import paypal from '../assets/Food/paypal.jpg'
import eDinar from "../assets/Food/eDinarTunise.png"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5" id="footer">
      <div className="container">
        <div className="text-center mb-4">
          <h3 className="text-uppercase" id="indexFooterIntro">The FastLunch</h3>
          <p className="text-muted">Handle your Books fluently</p>
        </div>

              <div className="row text-center">

        <div className="col-md-3">
          <h5 className="mb-3 referTo">Obtenir de aide</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Centre de assistance</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Discussion en direct</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Vérifier le statut de commande</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Remboursements</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Signaler un abus</a></li>
          </ul>
        </div>

        <div className="col-md-3">
          <h5 className="mb-3 referTo">Paiements et protections</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Paiements sûrs et faciles</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">FastLunch.com Business Edge Credit Card</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Politique de remboursement</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Livraison à temps</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Protections après-vente</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Suivi de production et services de inspection</a></li>
          </ul>
        </div>

        <div className="col-md-3">
          <h5 className="mb-3 referTo">Approvisionnez-vous sur FastLunch.com</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Demande de devis</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Adhésion FastLunch.com</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">FastLunch.com Logistics</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Programme de conformité fiscale</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">FastLunch.com Reads</a></li>
          </ul>
        </div>

        <div className="col-md-3">
          <h5 className="mb-3 referTo">Vendez sur The FastLunch.com</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Commencer à vendre</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Centre des vendeurs</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Devenir un fournisseur vérifié</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Partenariats</a></li>
            <li><a href="#" className="text-light text-decoration-underline linkToPage">Télécharger le application pour les fournisseurs</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4" id="cardsForCheckOut">
          <img src={visa} alt="Visa" className="payment-logo" />
          <img src={masterCard} alt="MasterCard" className="payment-logo" />
          <img src={paypal} alt="PayPal" className="payment-logo" />
          <img src={ecobankCard} alt="Ecobank" className="payment-logo" />
          <img src={eDinar} alt="eDinar" className="payment-logo" />
    </div>


        <div className="row text-center">
          <div className="col-md-4">
            <h5 className="mb-3 referTo">Navigation</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-underline linkToPage">Accueil</a></li>
              <li><a href="#" className="text-light text-decoration-underline linkToPage">Guides</a></li>
              <li><a href="#" className="text-light text-decoration-underline linkToPage">Members</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3 referTo">Do Contact Us</h5>
            <ul className="list-unstyled">
              <li><a href="/contact-us" className="text-light text-decoration-none linkToPage">Page de contact</a></li>
              <li><a href="mailto:support@onlinelibrary.com" className="text-light text-decoration-none linkToPage">support@FastLunch.com</a></li>
              <li className="linkToPage">PhoneNumber : +216 56 193 847</li>
            </ul>
          </div>

          <div className="col-md-4" id="FollowThrough">
            <h5 className="mb-3 referTo">Follow Us On</h5>
            <div>
              <a href="https://youtube.com" target="_blank" className="text-light me-3">
                <img className="footerImage card-footer" src={youtube} alt="YouTube" />
              </a>
              <a href="https://whatsapp.com" target="_blank" className="text-light me-3">
                <img className="footerImage card-footer" src={whatsapp} alt="WhatsApp" />
              </a>
              <a href="https://github.com" target="_blank" className="text-light me-3">
                <img className="footerImage card-footer" src={github} alt="GitHub" />
              </a>
            </div>
          </div>
        </div>

        <p id="OurPartners" style={{ fontSize: "30px", fontWeight: "bolder", color: "#00c9a7" }}>
          We are partners with:
        </p>
        
        <div className="row" id="partnersImagesFooters">
          {[
            { src: hilton, name: "UniversiteMonastir", location: "Republic of Tunisia" },
            { src: monoprix, name: "New York FlyAway", location: "United States of America" },
            { src: hilton, name: "Radisson Blue Invens", location: "Republic of Niger" } , 
            { src: hilton, name: "Radisson Blue Invens", location: "Republic of Niger" } , 
            { src: hilton, name: "Radisson Blue Invens", location: "Republic of Niger" }
          ].map((partner, index) => (
            <div key={index} className="col-md-4 partner-container">
              <img src={partner.src} alt={partner.name} className="img-fluid"/>
              <h3 className="MiddleTitle"><a href="/about-us">{partner.name}</a></h3>
              <p className="TheAuthors">In {partner.location}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
