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


const Footer = () => {
    const history = useHistory();
    return (
        <div>
            <footer id="footer">
                <div class="container footer-bottom clearfix">
                    <div class="copyright">
                        &copy; Copyright 2021 Ur2nd Lot<sup>TM</sup>. All Rights Reserved
</div>
                    <div class="bottomLinks">
                        <a href="#">Privacy Policy </a>| <a href="#">Terms of Use</a>
                    </div>
                </div>
            </footer>

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

export default Footer;