import React from 'react';
import API from "../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';


import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';


import '../assets/css/style.css';
import '../assets/css/responsive.css';



const Email = () => {
    const history = useHistory();
    const { id } = useParams();
    let value=window.location.href.split("id=");
    const [status, setValue] = useState("");
    async function handleclick() {
        
            console.log("check",value[1])
            let request = {
                user_id: value[1]
              };

        API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/user_active/update",request)
           .then((response) => {
             console.log("res", response.data.success)
            if (response.data.success ) {
              setValue(response.data.success);
              ls.set('status', 'no');
                //history.push("/emailsuccess");
               //history.push("/login");
             } else {
               history.push("/error");
             }
           },
             (error) => {
    
             });
    
       }
       useEffect(() => {
        handleclick();
    }, []);
  
    return (
      <div>
           <main id="main" class="inner-page">
                <div id="Successfullform" class="Successfullform">
                    <div class="container">
                        <div class="Successfullformblock col-lg-6">
                            <div class="row content">
                                <div class="modalcontent" style={{marginLeft:"21%"}}>
                                    <div class="Successfull-icon">
                                        <img alt="" src="check.svg" />
                                    </div>
                                    <div class="modalbody">                                       
                                        <p>Email successfull activated</p>
                                        <p>Username and Password sent to email</p>
                                
                                        <a href="/login" class="get-started-btn dealerLogin">Dealer Login</a>
                                    
                                    </div>
                                    {/* <div class="modalfooter ">
                                        <a class="cta-btns" href="/">OK</a>
                                    </div> */}

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
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
    );
  };
  
export default Email ;
  
