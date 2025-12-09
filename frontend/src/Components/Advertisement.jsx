
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

/*---------------------- CSS Files -----------------------------------*/
import "../static/middle.css"

/*---------------------- Image Files ---------------------------------*/
import image1 from "../assets/Food/homeMade.webp"
import image2 from "../assets/Food/jarreBonbon.jpg"
import image3 from "../assets/Food/sandwichPoulet.webp"
import image4 from "../assets/Food/skewedFish.jpg"
import image5 from "../assets/Food/c1.jpg"
import image6 from "../assets/Food/gluttenFreeChicken.jpg"
import image7 from "../assets/Food/fruitsJuice.avif"
import image8 from "../assets/Food/grilledFish1.jpg"
import image9 from "../assets/Food/theReady.webp"
import image10 from "../assets/Food/cheeseCakeFraise.jpg"
import image11 from "../assets/Food/kFriedChicken.avif"

import cp from "../assets/Food/couscousPoulet.jpg"
import chocolat from "../assets/Food/other.jpg"
import ramenMaison from "../assets/Food/ramenMaison.jpg"
import originalSalade from "../assets/Food/originalSalade.jpeg"
import d1 from "../assets/Food/d1.jpg"
import italianSandwitch from "../assets/Food/italianSandwich.jpg"
import tonkostsuRamen from "../assets/Food/tonkotsuRamen.jpeg"
import sushi from "../assets/Food/sushi.webp"
import valmy from "../assets/Food/valmy.jpg"
import burgerTacosPizza from "../assets/Food/burgerTacosPizza.jpeg"
import pizzaSausageCheese from "../assets/Food/pizzaSausageCheese.jpg"
/*-----------------------------------------------------------------------------*/

const Advertisement = () =>{
    return (
        <div className="advertisement container-fluid" id="IAdvertisement">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    width={1600}
                    height={800}
                >
                    <SwiperSlide><img className="img-slide" src={image1} alt="Smartphone 1" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={cp} alt="Smartphone 2" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={valmy } alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={image1 } alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide"  src={ramenMaison} alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={image3} alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={burgerTacosPizza} alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={image3} alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide>< img className="img-slide" src={image1} alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={cp} alt="Smartphone 3" /></SwiperSlide>
                    <SwiperSlide><img className="img-slide" src={cp} alt="Smartphone 3" /></SwiperSlide>
                </Swiper>

                <div id="someProducts" className="container-fluid d-flex flex-column">

                            <div className="container-fluid py-4" id="c1Products">
                                <div className="row g-3 container-fluid">
                                
                                    <div className="col-md-3 container" style={{minWidth: "400px"}}>
                                        <div className="card p-3 shadow-sm">
                                            <h5 className="fw-bold">Score de popularité : <span className="text-dark">4.7</span></h5>
                                            <div className="row g-3 mt-4">
                                                <div className="col-6"><img src={chocolat} alt="T-shirt 1" className="img-fluid rounded" /></div>
                                                <div className="col-6"><img src={image2}  alt="T-shirt 2" className="img-fluid rounded" /></div>
                                                <div className="col-6"><img src={image3} alt="T-shirt 3" className="img-fluid rounded" /></div>
                                                <div className="col-6"><img src={image7} alt="T-shirt 4" className="img-fluid rounded" /></div>
                                            </div>
                                        </div>
                                    </div>

                                <div className="col-md-3 container" id="c2Products" style={{minWidth: "380px" , minHeight: "400px"}}>
                                    <div className="card p-3 shadow-sm">
                                        <h5 className="fw-bold">Score de popularité : <span className="text-dark">5.7</span></h5>
                                        <div className="row g-2 mt-2">
                                            <div className="col-6"><img src={image10} alt="T-shirt 1" className="img-fluid rounded" /></div>
                                            <div className="col-6"><img src={image4}  alt="T-shirt 2" className="img-fluid rounded" /></div>
                                            <div className="col-6"><img src={originalSalade} alt="T-shirt 3" className="img-fluid rounded" /></div>
                                            <div className="col-6"><img src={image5} alt="T-shirt 4" className="img-fluid rounded" /></div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-md-3 d-flex flex-column gap-3">
                                    <img src={image6} alt="Sneakers" className="img-fluid rounded shadow" />
                                    <img src={image5} alt="iPhone" className="img-fluid rounded shadow" />
                                </div>

                                
                                <div className="col-md-3 d-flex flex-column gap-3">
                                    <img src={image9}alt="Air Cooler" className="img-fluid rounded shadow" />
                                    <img src={image11}alt="Supplement" className="img-fluid rounded shadow" />
                                </div>
                                
                                
                                <div className="col-md-3 d-flex flex-row gap-6">

                                    <div className="card p-3 shadow-sm shadow">
                                        <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                        <span className="text-success">10% de rabais</span>
                                        <img src={image11} alt="Scooter" className="img-fluid rounded mt-2" />
                                        
                                    </div>


                                </div>

                                <div className="col-md-3 d-flex flex-row gap-6">

                                    <div className="card p-3 shadow-sm shadow">
                                        <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                        <span className="text-success">30% de rabais</span>
                                        <img src={italianSandwitch} style={{height:"220px"}} alt="Manette" className="img-fluid rounded mt-2" />
                                       
                                    </div>


                                </div>

                                <div className="col-md-3 d-flex flex-row gap-6">

                                        <div className="card p-3 shadow-sm shadow">
                                            <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                            <span className="text-success">20% de rabais</span>
                                            <img src={image8} style={{height:"220px"}}  alt="Play Station" className="img-fluid rounded mt-2" />
                                        
                                        </div>

                                </div>

                                <div className="col-md-3 d-flex flex-row gap-6">

                                    <div className="card p-3 shadow-sm shadow">
                                        <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                        <span className="text-success">40% de rabais</span>
                                        <img src={d1} style={{height:"220px"}}  alt="Wash Machine" className="img-fluid rounded mt-2" />
                                        
                                    </div>

                                </div>

                                    <div className="col-md-3 d-flex flex-row gap-6">

                                        <div className="card p-3 shadow-sm shadow">
                                            <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                            <span className="text-success">40% de rabais</span>
                                            <img src={tonkostsuRamen} style={{height:"220px"}}  alt="Tonkotsu Ramen" className="img-fluid rounded mt-2" />
                                            
                                        </div>

                                    </div>

                                    <div className="col-md-3 d-flex flex-row gap-6">

                                        <div className="card p-3 shadow-sm shadow">
                                            <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                            <span className="text-success">40% de rabais</span>
                                            <img src={image1} alt="Wash Machine" className="img-fluid rounded mt-2" />
                                            
                                        </div>

                                    </div>

                                        <div className="col-md-3 d-flex flex-row gap-6">

                                            <div className="card p-3 shadow-sm shadow">
                                                <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                                <span className="text-success">46% de rabais</span>
                                                <img style={{height:"220px"}}  src={pizzaSausageCheese} alt="Wash Machine" className="img-fluid rounded mt-2" />
                                                
                                            </div>

                                        </div>

                                        <div className="col-md-3 d-flex flex-row gap-6">

                                            <div className="card p-3 shadow-sm shadow">
                                                <h5 className="fw-bold">Offres sur les meilleures ventes</h5>
                                                <span className="text-success">20% de rabais</span>
                                                <img style={{height:"220px"}}  src={sushi} alt="Sushi" className="img-fluid rounded mt-2" />
                                               
                                            </div>

                                        </div>

                                    

                                </div>
                            </div>



                </div>
        </div>
    )
}

export default Advertisement;