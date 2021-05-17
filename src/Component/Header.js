import React from 'react';
import { useHistory } from "react-router-dom";

// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

import LogoImg from '../../src/assets/img/Logo_final.png'

const Header = () => {
  const history = useHistory();
  return (
    <div>

      <div id="topbar" class="">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-8 topLeft">
              <div class="socialIcons">
              <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
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

    </div>


  )
}

export default Header;