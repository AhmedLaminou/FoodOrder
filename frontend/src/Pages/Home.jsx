
import React from 'react';


/*--------------------- CSS Files ------------------------------*/
import '../static/home.css';
/*-------------------------------- Components ------------------------*/
import Header from  "../Components/Header" ; 
import Footer from  "../Components/Footer" ; 
import Advertisement from '../Components/Advertisement';
import HomeFiability from '../Components/HomeFiability';
import WelcomeStuff from '../Components/WelcomeStuff';
/*------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------*/
const Home = () => {
  return (
      <React.Fragment>
        <div>
          <Header/>
          <HomeFiability/>

        </div>

        <WelcomeStuff/>

          <Advertisement/>

            <Footer/>
    </React.Fragment>

   
  );
};

export default Home;
