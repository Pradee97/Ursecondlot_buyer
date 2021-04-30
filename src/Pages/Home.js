import React from 'react';
import API from "../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';


import '../assets/css/style.css';


const Home = () => {
    const history = useHistory();
    return (
        <div>
     <section id="hero" className="d-flex align-items-center">      
    <div className="container">
      <div className="row">
        <div className="col-lg-12 d-flex flex-column align-items-center justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
		<div className="bannertext-bg">
          <h1>Welcome to Auction 24/7</h1>
          <h2>Where you can buy Fresh New Car Dealer Trade-In <br />And Bank Repo Anytime</h2>
		  </div>
          <div className="d-lg-flex">
            <a href="registration" className="btn-get-started scrollto"> Become a Dealer</a>
          </div>
        </div>
        
      </div>
    </div>
    </section>
    <main id="main">
    <section id="playstoreBlock" className="playstoreBlock">
      <div className="container">
        <div className="row content">
          <div className="col-lg-12">
			<img src="appstore.png" />
			<img src="googleplay.png" />   
          </div> 
        </div>

      </div>
    </section>
  </main>
            <script src="assets/vendor/jquery/jquery.min.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
            <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="assets/vendor/venobox/venobox.min.js"></script>
            <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/js/main.js"></script>
        </div>


    )
}

export default Home;