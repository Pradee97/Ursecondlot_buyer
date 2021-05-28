import React from 'react';
import API from "../../Services/BaseService";
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

const EditDealerInformation = () => {
    const history = useHistory();
    const { id } = useParams();
    const [accountObjc, setAccountObj] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [primaryPhone, setPrimaryphone] = useState("");
    const [mobilePhone, setMobilephone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipcode] = useState("");
  

    async function fetchAccountDetails() {
        console.log(id)
        
        let request = {
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
        };
        const state = API.post('user_profile/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setFirstname(res.data.data[0].first_name);
            setLastname(res.data.data[0].last_name);
            setPrimaryphone(res.data.data[0].phone_no);
            setMobilephone(res.data.data[0].mobile_phone);
            setAddress(res.data.data[0].address);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZipcode(res.data.data[0].zipcode_id);
            setAccountObj(res.data.data[0])
        })
            .catch(err => { console.log(err); });
    }
  
    const updateDealerInfo = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            user_id:id,
            first_name: firstName,
            last_name: lastName,
            phone_no: primaryPhone,
            mobile_phone: mobilePhone,
            address: address,
            city_id: city,
            state_id: state,
            zipcode_id: zipCode,
            active:1
           
        };
        API
            .post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/user_profile/update', request)
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
      fetchAccountDetails();
    }, []);
    return (
        <div>
            <main id="main" class="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form class="registrationform" onSubmit={updateDealerInfo} >
                        <h2 class="title"> Edit Dealer Information</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  defaultValue={accountObjc.first_name} class="textbox" placeholder="First name" required onChange={(e) => setFirstname(e.target.value)} />
                                <label for="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.last_name} class="textbox" placeholder="Last name" required onChange={(e) => setLastname(e.target.value)} />
                                <label for="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                            </div>
                            </div>

                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="number" defaultValue={accountObjc.phone_no} class="textbox" placeholder="Primary phone" required onChange={(e) => setPrimaryphone(e.target.value)} />
                                <label for="primary_phone" className={primaryPhone != "" ? "input-has-value" : ""}>Primary Phone</label>
                            </div>
                            </div>

                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="number" defaultValue={accountObjc.mobile_phone} class="textbox" placeholder="Mobile phone" required onChange={(e) => setMobilephone(e.target.value)} />
                                <label for="mobile_phone" className={mobilePhone != "" ? "input-has-value" : ""}>Mobile Phone</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.address} class="textbox" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                                <label for="address" className={address != "" ? "input-has-value" : ""}>Address</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.city_name} class="textbox" placeholder="City" required onChange={(e) => setCity(e.target.value)} />
                                <label for="city" className={city != "" ? "input-has-value" : ""}>City</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.state_name} class="textbox" placeholder="State" required onChange={(e) => setState(e.target.value)} />
                                <label for="state" className={state != "" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="textbox" placeholder="Zip code" required onChange={(e) => setZipcode(e.target.value)} />
                                <label for="first_name" className={zipCode != "" ? "input-has-value" : ""}>Zipcode</label>
                            </div>
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
                                <img src={process.env.PUBLIC_URL +"/images/appstore.png" }/>
                                <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
          
        </div>


    );
};

export default EditDealerInformation;