import React from 'react';
import {useHistory} from "react-router-dom";

import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
// import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';
import "../assets/vendor/slick/css/slick.min.css";

import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Footer = () => {
    const history = useHistory();
    return (
        <div>
            <footer id="footer">
                <div className="container-fluid footer-bottom clearfix">
                    <div className="copyright">
                        &copy; Copyright 2021 Ur2nd Lot<sup>TM</sup>. All Rights Reserved
</div>
                    <div className="bottomLinks">
                        <a href="JavaScript:void(0)" onClick={()=>history.push('/privacypolicy')}>Privacy Policy </a>| <a href="#">Terms of Use</a>
                    </div>
                </div>
            </footer>

            <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>


        </div>


    )
}

export default Footer;