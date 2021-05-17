import React from 'react';
import API from "../../Services/BaseService";
import { useHistory , useParams} from "react-router-dom";

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


const EditPayment = () => {
    const history = useHistory();

    const { payment_info_id } = useParams();
    const [paymentObjc, setPaymentObj] = useState("");
    const [dealershipName, setDealershipName] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ACHnumber, setACHNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    // const [cityName, setCityName] = useState("");
    // const [stateName, setStateName] = useState("");
    // const [zipCodeId, setZipcodeId] = useState("");
    const [accountHolderAddress, setAccountHolderAddress] = useState("");
    // const [accountCityName, setAccountCityName] = useState("");
    // const [accountStateName, setAccountStateName] = useState("");
    // const [accountZipcodeId, setAccountZipcodeId] = useState("");
    

    async function fetchpaymentDetails() {
        // let request = {
        //     buyer_id: 1
        // };
        const state = API.get(`http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/payment_info/1`);
        state.then(res => {
            console.log("res", res.data.data)
            setPaymentObj(res.data.data);
        })
            .catch(err => { console.log(err); });
    }

    const updatepaymentinfo = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {

            dealership_name: dealershipName,
            acc_name: accountHolderName,      
            bank_name: bankName,
            acc_no: accountNumber,
            ach_no: ACHnumber,
            routing_no: routingNumber,
            bank_address: bankAddress,
            // state_id: stateName,
            // city_id: cityName,
            // zipcode: zipCodeId,
            acc_address: accountHolderAddress,
            // acc_state_id: accountStateName,
            // acc_city_id: accountCityName,
            // acc_zipcode: accountZipcodeId
            active:1
        };
        API
        .put("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/payment_info/edit"+payment_info_id, request)
        .then((response) => {
            if (response.data.success) {
                const { data } = response;
                console.log("response", response)
                history.push("/success");
            } else {
                history.push("emailerror");
            }
        }, (error) => {
            // setOpenLoader(false);
            // console.log(error);
        });

    }
	useEffect(() => {
        fetchpaymentDetails()
        
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
                                    

                                        <div class="paymentform col-lg-12">
                                            <form class="backaccountform" onSubmit={updatepaymentinfo} >
                                                <h2 class="title"> Bank account information Edit</h2>
                                                <div class="row">

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.dealership_name} class="form-control" placeholder="Dealership name" required onChange={(e) => setDealershipName(e.target.value)} />
                                                    </div>
                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.acc_name} class="form-control" placeholder="Account holder name" required onChange={(e) => setAccountHolderName(e.target.value)} />
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.bank_name} class="form-control" placeholder="Bank name" required onChange={(e) => setBankName(e.target.value)} />
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.acc_no} class="form-control" placeholder="Account number" required onChange={(e) => setAccountNumber(e.target.value)} />
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.ach_no} class="form-control" placeholder="ACH number" required onChange={(e) => setACHNumber(e.target.value)} />
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.routing_no} class="form-control" placeholder="Routing number" required onChange={(e) => setRoutingNumber(e.target.value)} />
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.bank_address} class="form-control" placeholder="Bank address" required onChange={(e) => setBankAddress(e.target.value)} />
                                                    </div>
                                                    {/* <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="state" class="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.state_id} class="form-control" placeholder="State" required onChange={(e) => setStateName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="city" class="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.city_id} class="form-control" placeholder="City" required onChange={(e) => setCityName(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="zipcode" class="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.zipcode} class="form-control" placeholder="Zipcode" required onChange={(e) => setZipcodeId(e.target.value)} />
                                                        </div>
                                                    </div> */}

                                                    <div class="col-sm-12 form-group">
                                                    <input type="text"  defaultValue={paymentObjc.acc_address} class="form-control" placeholder="Account Holder Address" required onChange={(e) => setAccountHolderAddress(e.target.value)} />
                                                    </div>

                                                    {/* <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="state" class="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.acc_state_id} class="form-control" placeholder="State" required onChange={(e) => setAccountStateName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="city" class="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.acc_city_id} class="form-control" placeholder="City" required onChange={(e) => setAccountCityName(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            <select id="zipcode" class="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.acc_zipcode} class="form-control" placeholder="Zipcode" required onChange={(e) => setAccountZipcodeId(e.target.value)} />
                                                        </div>
                                                    </div> */}

                                                    <div class="col-sm-6 form-group">
                                                        <p>Signed bank Authorization letter for bank to release information. </p>
                                                    </div>



                                                    <div class="col-sm-6 form-group uploadbutton">
                                                        <div class="tbox">
                                                            <input type="file" id="upload" hidden />
                                                            <label for="upload"><img src="upload.png" />Upload Document</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 loginBtn">
                                                        <button class="cta-btn">Update</button>
                                                    </div>
                                                </div>
                                            </form>
                                        
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

export default EditPayment;