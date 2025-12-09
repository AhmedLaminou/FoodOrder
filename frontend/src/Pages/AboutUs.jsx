// eslint-disable-next-line no-unused-vars
import React from 'react';

/*------------------------- CSS Files ---------------------------------------*/
import '../static/about.css'; 

/*---------------------- Images ----------------------------------*/
import restaurantImage from '../assets/Food/restaurant.png';
import partnerImage1 from '../assets/Food/Hilton.jpg';
import partnerImage2 from '../assets/Food/Hilton.jpg';

const AboutUs = () => {
    return (
        <div className="about-container" id="aboutUs">
            <header className="about-header">
                <h1>À propos de nous</h1>
                <p>Découvrez notre histoire, notre passion et nos partenaires</p>
            </header>

            <section className="about-section">
                <h2>Notre Restaurant</h2>
                <div className="about-content">
                    <img src={restaurantImage} alt="Restaurant" className="about-image" />
                    <div className="about-text">
                        <p>
                            Bienvenue dans notre restaurant, un lieu où l art culinaire rencontre la convivialité et la excellence. Depuis notre ouverture, nous avons pour mission de créer une expérience gastronomique inoubliable en offrant des plats raffinés, préparés avec des ingrédients de la plus haute qualité.
                        </p>
                        <p>
                            Notre équipe passionnée et expérimentée est dédiée à offrir à chaque client un service impeccable, dans un cadre moderne et accueillant.
                        </p>
                    </div>
                </div>
            </section>

            <section className="partners-section">
                <h2>Nos Partenaires</h2>
                <div className="partners-content">
                    <div className="partner">
                        <img src={partnerImage1} alt="Partenaire 1" className="partner-image" />
                        <p>Nous collaborons avec des producteurs locaux pour vous offrir des produits frais et de qualité.</p>
                    </div>
                    <div className="partner">
                        <img src={partnerImage2} alt="Partenaire 2" className="partner-image" />
                        <p>Nos partenaires en matière de boissons garantissent une sélection de vins et de cocktails exclusifs pour accompagner parfaitement vos repas.</p>
                    </div>
                </div>
            </section>

            <section className="context-section">
                <h2>Notre Engagement</h2>
                <div className="context-text">
                    <p>
                        Nous croyons fermement que la nourriture est bien plus que un simple repas ; c est une expérience qui rassemble les gens. Notre objectif est de offrir un menu créatif tout en respectant l environnement et en soutenant la économie locale. Chaque plat que nous servons est conçu pour être une œuvre de art culinaire qui reflète notre engagement envers la qualité, la durabilité et la satisfaction de nos clients.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
