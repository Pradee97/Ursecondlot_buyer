import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
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
import googleApiKey from '../../Constant/config.js'

import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/icofont/icofont.min.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/venobox/venobox.css';
import '../../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../../assets/vendor/aos/aos.css';


import '../../assets/css/style.css';


const Payment = () => {
    const history = useHistory();

    return (
        <div>

            <main id="main" class="inner-page">


                <div id="paymentaccount" class="paymentaccount">
                    <div class="container" >
                        <div class="paymentaccountblock col-lg-12">
                            <div class="section-title">
                                <h2>Payment Summary</h2>
                            </div>
                            <div class="row content">
                                <div class="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                                    <div class="mgaccountuser">
                                        <div class="mgaccountuserleft">
                                            <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} class="img-fluid" alt="..." />
                                        </div>
                                        <div class="mgaccountuserright">
                                            <h3>Fernand</h3>
                                            <div class="d-flex align-items-center">
                                                <p class="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} class="img-fluid" alt="..." /><span>California, Cl</span></p>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="mgaccountuserlinks">
                                        <div class="userlinks">
                                            <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} class="img-fluid" alt="" /><a href="/manageaccount">Account</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} class="img-fluid" alt="" /><a href="/notification">Notification</a></li>
                                            <li class="active"><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} class="img-fluid" alt="" /><a href="/payment">Payment</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} class="img-fluid" alt="" /><a href="/lotfee">Lot Fee</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} class="img-fluid" alt="" /><a href="documents.html">Document</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} class="img-fluid" alt="" /><a href="adduser.html">Add User</a></li>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock">
                                    <div class="paymentdetailblock">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                                        <div class="add-floors">
                                            <div class="row">
                                                <div class="add-accounts">
                                                    <a class="add-account-btns" href="#"><img src={process.env.PUBLIC_URL +"/images/addbtn.jpg"} />Add Bank Account</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="paymentform col-lg-12">
                                            <form class="backaccountform">
                                                <h2 class="title"> Bank account information</h2>
                                                <div class="row">

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="dname" id="name-d" placeholder="" required />
                                                            <label for="name-d">Dealership name</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="fname" id="name-f" placeholder="" required />
                                                            <label for="name-f">Account holder name</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="lname" id="name-l" placeholder="" required />
                                                            <label for="name-b">Bank name</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="anumber" id="anumber" placeholder="" required />
                                                            <label for="anumber">Account number</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="achnumber" id="achnumber" placeholder="" required />
                                                            <label for="achnumber">ACH number</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="rtnumber" id="rtnumber" placeholder="" required />
                                                            <label for="rtnumber">Routing number</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="baddress" id="baddress" placeholder="" required />
                                                            <label for="baddress">Bank address</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="state" class="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="city" class="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="zipcode" class="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="form-control" name="ahaddress" id="ahaddress" placeholder="" required />
                                                            <label for="ahaddress">Account Holder Address</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="state" class="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="city" class="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="zipcode" class="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6 form-group">
                                                        <p>Signed bank Authorization letter for bank to release information. </p>
                                                    </div>



                                                    <div class="col-sm-6 form-group uploadbutton">
                                                        <div class="tbox">
                                                            <input type="file" id="upload" hidden />
                                                            <label for="upload"><img src={process.env.PUBLIC_URL +"/images/upload.png"} />Upload Document</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 loginBtn">
                                                        <button class="cta-btn">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="col-lg-12 col-md-12 col-sm-12 mt-2 pt-4 bankinfo ">
                                            <div class="bankinfos">
                                                <h4>Bank Account Information</h4>
                                                <div class="bankinfotable">
                                                    <a href="#">Edit</a>
                                                    <table>
                                                        <tr>
                                                            <td><span>Dealership Name</span></td>
                                                            <td>Fernando</td>
                                                            <td><span>ACH Number</span></td>
                                                            <td>#544531313</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Account holder name</span></td>
                                                            <td>Botero</td>
                                                            <td><span>Routing Number</span></td>
                                                            <td>#544531313</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Bank Name</span></td>
                                                            <td>Bank of Amarica</td>
                                                            <td><span>Bank Address</span></td>
                                                            <td>Horizon Ave, California, Cl</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Account Number</span></td>
                                                            <td>********7895</td>
                                                            <td><span>ACCount Holder Address</span></td>
                                                            <td>Horizon Ave, California, Cl</td>
                                                        </tr>
                                                    </table>

                                                    <div class="releaseinfo">
                                                        <div class="row">
                                                            <div class="col-sm-6 form-group">
                                                                <p>Signed bank Authorization letter for bank to release information. </p>
                                                            </div>

                                                            <div class="col-sm-6 form-group uploadbutton">
                                                                <div class="tbox">
                                                                    <input type="file" id="downupload" hidden />
                                                                    <label for="downupload"><img src={process.env.PUBLIC_URL +"/images/download.png"} />Document</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>









                    <section id="playstoreBlock" class="playstoreBlock">
                        <div class="container">


                            <div class="row content">
                                <div class="col-lg-12">
                                  <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
                                  <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />

                                </div>

                            </div>

                        </div>
                    </section>

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

export default Payment;