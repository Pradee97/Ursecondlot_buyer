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


const PaymentInfo = () => {
    const history = useHistory();
    const [paymentinfo, setPaymentInfo] = useState("");
    async function getPaymentInfo() {
        let request = {
            buyer_id: 1
        };
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/payment_info/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setPaymentInfo(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
	useEffect(() => {
        getPaymentInfo()
        
        // fetchState();
    }, []);

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
                                            <img src="userimg.jpg" class="img-fluid" alt="..." />
                                        </div>
                                        <div class="mgaccountuserright">
                                            <h3>Fernand</h3>
                                            <div class="d-flex align-items-center">
                                                <p class="details"><img src="Path.svg" class="img-fluid" alt="..." /><span>California, Cl</span></p>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="mgaccountuserlinks">
                                        <div class="userlinks">
                                            <li><img src="Icon awesome-user.svg" class="img-fluid" alt="" /><a href="/manageaccount">Account</a></li>
                                            <li><img src="Icon awesome-bell.svg" class="img-fluid" alt="" /><a href="/notification">Notification</a></li>
                                            <li class="active"><img src="dollar-symbol.svg" class="img-fluid" alt="" /><a href="/payment">Payment</a></li>
                                            <li><img src="fees.svg" class="img-fluid" alt="" /><a href="/lotfee">Lot Fee</a></li>
                                            <li><img src="google-docs.svg" class="img-fluid" alt="" /><a href="documents.html">Document</a></li>
                                            <li><img src="profile.svg" class="img-fluid" alt="" /><a href="adduser.html">Add User</a></li>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock">
                                    <div class="paymentdetailblock">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                                        <div class="add-floors">
                                            <div class="row">
                                                <div class="add-accounts">
                                                    <a class="add-account-btns" href="/payment"><img src="addbtn.jpg" />Add Bank Account</a>
                                                </div>
                                            </div>
                                        </div>
                                        {paymentinfo.length>0?paymentinfo.map((item,index) =>
                                        <div class="col-lg-12 col-md-12 col-sm-12 mt-2 pt-4 bankinfo ">
                                            <div class="bankinfos">
                                                <h4>Bank Account Information</h4>
                                                <div class="bankinfotable">
                                                    <a href="editpayment">Edit</a>
                                                    <table>
                                                        <tr>
                                                            <td><span>Dealership Name</span></td>
                                                            <td>{item.dealership_name}</td>
                                                            <td><span>ACH Number</span></td>
                                                            <td>{item.ach_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Account holder name</span></td>
                                                            <td>{item.acc_name}</td>
                                                            <td><span>Routing Number</span></td>
                                                            <td>{item.routing_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Bank Name</span></td>
                                                            <td>{item.bank_name}</td>
                                                            <td><span>Bank Address</span></td>
                                                            <td>{item.bank_address}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Account Number</span></td>
                                                            <td>{item.acc_no}</td>
                                                            <td><span>Account Holder Address</span></td>
                                                            <td>{item.acc_address}</td>
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
                                                                    <label for="downupload"><img src="download.png" />Document</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)  :""}
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default PaymentInfo;