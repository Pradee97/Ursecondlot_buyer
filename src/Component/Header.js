import React from 'react';
import { useHistory, useLocation } from "react-router-dom";

// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

import LogoImg from '../../src/assets/img/Logo_final.png';

import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';


import '../assets/css/style.css';


const Header = () => {
  const history = useHistory();
  // const location = useLocation();
  console.log("history=====",history)
  // console.log("location=====",location)
  return (
    <div>

      <div id="topbar" class="">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8 topLeft">
              <div class="socialIcons">
                <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                <a href="#" class="snapchat"><i class="bx bxl-snapchat"></i></a>
                <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
              </div>
            </div>

            <div class="col-lg-4 topRight">
              <div class="rightMenu">
                <a href="#"><i class="icofont-globe"></i> English <i class="icofont-thin-down"></i></a>
                <i class="bx bxl-envelope"></i> CALL US: 123 456 789
			<i class="bx bxl-phone"></i> <a href="#">GET FREE DEMO <i class="icofont-long-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header id="header" class="">
        <div class="container-fluid d-flex align-items-center">

          <h1 class="logo mr-auto"><img src={LogoImg} ></img></h1>


          <nav class="nav-menu d-none d-lg-block">
          <ul>
              <li class="active"><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/fees">Fees</a></li>
              {/* <li><a href="/floorplans">Floor</a></li> */}
              <li><a href="/contactus">Contactus</a></li>
              </ul>
          </nav>

          <a href="login" class="get-started-btn dealerLogin">Dealer Login</a>

        </div>
      </header>
     

      <a href="#" class="back-to-top"><i class="ri-arrow-up-line"></i></a>

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

export default Header;