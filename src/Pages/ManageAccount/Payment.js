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
    const [payment, setPayment] = useState("");

    const [buyerId, setBuyerId] = useState("");
    const [dealershipName, setDealershipName] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ACHnumber, setACHNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");
    const [zipCodeId, setZipcodeId] = useState("");
    const [accountHolderAddress, setAccountHolderAddress] = useState("");
    const [accountCityName, setAccountCityName] = useState("");
    const [accountStateName, setAccountStateName] = useState("");
    const [accountZipcodeId, setAccountZipcodeId] = useState("");
    

    const setZipcode = (data, con) => {
        console.log("con=>",con)
        if(data.length !=5 ){
            if(con===1){
            setCityName('')
            setStateName('') 
            // setZipcodeId(data)
        }
        else{
            setAccountCityName('')
            setAccountStateName('')
            // setAccountZipcodeId(data)
        }
        }
        if(data.length==5 ){
            if(con===1){
            setZipcodeId(data)
            }
            else{
            setAccountZipcodeId(data)
            }

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${data}&components=country:US&key=${googleApiKey}`)
        .then(response => {
               
            if (response.ok){
                return response.json()
            }else{
                console.log("something went wrong in address api..., try again")
            }
            
        })
        .then(data => {
            console.log("google place data =>",data)
            if(data.results.length>0){
                console.log("CITY  ",data.results[0].address_components[1].long_name)
                console.log("STATE  ",data.results[0].address_components[2].long_name )
                if(con===1){
                setCityName( data.results[0].address_components[1].long_name)
                setStateName(data.results[0].address_components[3].long_name)
            }
            else{
                setAccountCityName(data.results[0].address_components[1].long_name)
                setAccountStateName(data.results[0].address_components[3].long_name)
            }              
            }
        
                else{
                setCityName('')
                setStateName('') 
                setAccountCityName('')
                setAccountStateName('')
                console.log("please enter valid zipcode") ;
            }
           
        })

        }
        
    }

    const paymenthandleSubmit= (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            buyer_id: 1,
            dealership_name: dealershipName,
            acc_name: accountHolderName,      
            bank_name: bankName,
            acc_no: accountNumber,
            ach_no: ACHnumber,
            routing_no: routingNumber,
            bank_address: bankAddress,
            state_id: stateName,
            city_id: cityName,
            zipcode: zipCodeId,
            acc_address: accountHolderAddress,
            acc_state_id: accountStateName,
            acc_city_id: accountCityName,
            acc_zipcode: accountZipcodeId,
                active:1
        }
        
        API
            .post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/payment_info/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    history.push("paymentinfo");
                } else {
                    // history.push("emailerror");
                }
            }, (error) => {
                // setOpenLoader(false);
                console.log(error);
            });
    }

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
                                            <form class="backaccountform" onSubmit={paymenthandleSubmit}>
                                                <h2 class="title"> Bank account information</h2>
                                                <div class="row">


                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" className="textbox" name="dname" id="name-d" placeholder="" required  onChange={(e) => setDealershipName(e.target.value)} />
                                                            <label for="name-d" className={dealershipName !="" ? "input-has-value" : ""}>Dealership name</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="fname" id="name-f" placeholder="" required  onChange={(e) => setAccountHolderName(e.target.value)} />
                                                            <label for="name-f" className={accountHolderName !="" ? "input-has-value" : ""}>Account holder name</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="lname" id="name-l" placeholder="" required  onChange={(e) => setBankName(e.target.value)} />
                                                            <label for="name-b" className={bankName !="" ? "input-has-value" : ""}>Bank name</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="anumber" id="anumber" placeholder="" required  onChange={(e) => setAccountNumber(e.target.value)} />
                                                            <label for="anumber" className={accountNumber !="" ? "input-has-value" : ""}>Account number</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="achnumber" id="achnumber" placeholder="" required  onChange={(e) => setACHNumber(e.target.value)} />
                                                            <label for="achnumber" className={ACHnumber !="" ? "input-has-value" : ""}>ACH number</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="rtnumber" id="rtnumber" placeholder="" required  onChange={(e) => setRoutingNumber(e.target.value)} />
                                                            <label for="rtnumber" className={routingNumber !="" ? "input-has-value" : ""}>Routing number</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="baddress" id="baddress" placeholder="" required  onChange={(e) => setBankAddress(e.target.value)} />
                                                            <label for="baddress" className={bankAddress !="" ? "input-has-value" : ""}>Bank address</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            {/* <select id="state" class="form-control custom-select browser-default">
                                                                <option value={stateName}>State</option>
                                                            </select> */}
                                                            <input type="text" class="form-control" placeholder="state" value ={stateName} required  />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            {/* <select id="city" class="form-control custom-select browser-default">
                                                                <option value= {cityName} >City</option>
                                                            </select> */}
                                                            <input type="text" class="form-control" placeholder="city" value ={cityName} required  /> 
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                        {/* <select id="zipcode" class="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select> */}
                                                            <input id="zipcode" class="form-control custom-select browser-default" placeholder="Zipcode" required onChange={(e) => setZipcode(e.target.value,1)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 form-group">
                                                        <div class="tbox">
                                                            <input type="text" class="textbox" name="ahaddress" id="ahaddress" placeholder="" required  onChange={(e) => setAccountHolderAddress(e.target.value)} />
                                                            <label for="ahaddress" className={accountHolderAddress !="" ? "input-has-value" : ""}>Account Holder Address</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            {/* <select id="state" class="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select> */}
                                                             <input type="text" class="form-control" placeholder="state" value ={accountStateName} required  />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            {/* <select id="city" class="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select> */}
                                                            <input type="text" class="form-control" placeholder="city" value ={accountCityName} required  /> 
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-4 form-group">
                                                        <div class="tbox">
                                                            {/* <select id="zipcode" class="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select> */}
                                                            <input id="zipcode" class="form-control custom-select browser-default" placeholder="Zipcode" required onChange={(e) => setZipcode(e.target.value,2)} />
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-6 form-group">
                                                        <p>Signed bank Authorization letter for bank to release information. </p>
                                                    </div>

                                                    <div class="col-lg-12 loginBtn">
                                                        <button class="cta-btn">Submit</button>
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

export default Payment;