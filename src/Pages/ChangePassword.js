import React from 'react';
import API from "../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
import ls from 'local-storage';

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
import '../assets/css/responsive.css';




const ChangePassword = () => {
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')


    // const [confirmPassword, setConfirmPassword] = useState("");

    let userDetails = ls.get('userDetails');
    console.log("userDetails",userDetails)


    const changehandleSubmit = (event) => {
        event.preventDefault();
        if(newPassword != confirmPassword){
                setErrorMessage("Newpassword and Confirmpassword didn't match")
             }
        
        else{
        let request = {
          old_password: oldPassword,
          new_password: newPassword,
         user_id: userDetails.user_id,
         active:1

        };
        // if(newPassword === confirmPassword)
        API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/changepassword/update", request)

          .then((response) => {
            console.log("res", response)
            if (response.data.success == true) {
            
              history.push("/login");
            } else {
              history.push("error");
            }
          },
            (error) => {
    
            });
        }
      
      }
  

    return (
        <div>
            <main id="main" class="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form class="registrationform" onSubmit={changehandleSubmit} >
                        <h2 class="title">Change Password</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                                <input type="password" class="form-control" placeholder="Old Password" required onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="password" class="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="eg:(It should be Uppercase, Lowercase, Specialcharacter, Numbers and Minimum 8 character)" placeholder="New Password" required onChange={(e) => setNewPassword(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="password" class="form-control" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                 <p className="error-message">{errorMessage}</p>

                            </div>
                            {/* <div class="col-sm-12 form-group">
                                <input type="text" class="form-control" placeholder="User Id" required onChange={(e) => setUserId(e.target.value)} />
                            </div> */}
                            
                            <div class="col-lg-12 loginBtn">
                                <button class="cta-btn">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
                <section id="playstoreBlock" class="playstoreBlock">
                    <div class="container">
                        <div class="row content">
                            <div class="col-lg-12">
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

    );
  };
  
export default ChangePassword ;