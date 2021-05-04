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


const FloorEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const [floorObjc, setFloorObj] = useState("");
    const [contactName, setContactName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [creditLimit, setCreditLimit] = useState("");
    const [emailId, setEmailId] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOpened, setDateOpened] = useState("");
    const [accountOpened, setAccountOpened] = useState("");
    

    async function fetchFloorDetails() {
        
        const state = API.get('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/floor_plan/'+id);
        state.then(res => {
            console.log("res", res.data.data)
            setFloorObj(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
  
    const updateFloorPlan = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            contact_name: contactName,
            company_name: companyName,
            branch_name: branchName,
            account_no: accountNumber,
            credit_limit: creditLimit,
            email_id: emailId,
            address: address,
            phone_no: phoneNumber,
            date_opened: dateOpened,
            account_opened: accountOpened,
            active:1
           
        };
        API
            .put("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/floor_plan/"+id, request)
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
        fetchFloorDetails();
    }, []);
    return (
        <div>
            <main id="main" class="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form class="registrationform" onSubmit={updateFloorPlan} >
                        <h2 class="title"> Floor Plans Edit</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                                <input type="text"  defaultValue={floorObjc.contact_name} class="form-control" placeholder="Contact Name" required onChange={(e) => setContactName(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.company_name} class="form-control" placeholder="Company Name" required onChange={(e) => setCompanyName(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.branch_name} class="form-control" placeholder="Branch Name" required onChange={(e) => setBranchName(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={floorObjc.account_no} class="form-control" placeholder="Account Number" required onChange={(e) => setAccountNumber(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={floorObjc.credit_limit} class="form-control" placeholder="Credit Limit" required onChange={(e) => setCreditLimit(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="email" defaultValue={floorObjc.email_id} class="form-control" placeholder="Email Id" required onChange={(e) => setEmailId(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.address} class="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={floorObjc.phone_no} class="form-control" placeholder="Phone Number" required onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="Date" value={floorObjc.date_opened} class="form-control" placeholder="Date Opened" required onChange={(e) => setDateOpened(e.target.value)} />
                            </div>
                    
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.account_opened} class="form-control" placeholder="Account Opened" required onChange={(e) => setAccountOpened(e.target.value)} />
                            </div>
                           
                    
                            <div class="col-lg-12 loginBtn">
                                <button class="cta-btn">Update</button>
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


    )
}

export default FloorEdit;