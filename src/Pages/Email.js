import React from 'react';
import API from "../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
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
import { Modal, Button } from 'antd';



const Email = () => {
    const history = useHistory();
    const { id } = useParams();
    let value=id.split("=");
    const handleclick = () => {
        
            console.log("check",id)
            let request = {
                user_id: value[1]
              };

        API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/user_active/update",request)
           .then((response) => {
             console.log("res", response.data.success)
            if (response.data.success ) {
                history.push("/emailsuccess");
               //history.push("/login");
             } else {
               history.push("/error");
             }
           },
             (error) => {
    
             });
    
       }
  
    return (
      <div>
           <main id="main" class="inner-page">
                <div id="Successfullform" class="Successfullform">
                    <div class="container">
                        <div class="Successfullformblock col-lg-6">
                            <div class="row content">
                                <div class="modalcontent" style={{marginLeft:"28%"}}>
                                    <div class="Successfull-icon">
                                        <img alt="" src="check.svg" />
                                    </div>
                                    <div class="modalbody">
                                        <h2>Account Activation </h2>
                                <button class="cta-btn" onClick={handleclick}>Active</button>
                                    
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
      </div>
    );
  };
  
export default Email ;
  
