import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';

const EditAddress = () => {
    const history = useHistory();
    const { id } = useParams();
    const [accountObjc, setAccountObj] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZIpCode] = useState("");
  
    const getStateName=(stateData)=>{
        setState(stateData)
    }

    const getCityName=(cityData)=>{
        setCity(cityData)
    }

    const getZipCodeId=(zipData)=>{
        setZIpCode(zipData)
    }

    async function fetchAccountDetails() {
        console.log(id)
        
        let request = {
            buyer_id:JSON.parse(localStorage.getItem("userDetails")).user_id,
        };
        const state = API.post('user_profile/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setFirstName(res.data.data[0].first_name);
            setLastName(res.data.data[0].last_name);
            setAddress(res.data.data[0].address);
            setPrimaryPhone(res.data.data[0].phone_no);
            setMobilePhone(res.data.data[0].mobile_no);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZIpCode(res.data.data[0].zipcode_id);
            setAccountObj(res.data.data[0])
        })
            .catch(err => { console.log(err); });
    }
  
    const updateAddress = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            buyer_address_id:id,
            buyer_id:JSON.parse(localStorage.getItem("userDetails")).user_id,
            first_name: FirstName,
            last_name: lastName,
            address: address,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,
            city_id: city,
            state_id: state,
            zipcode_id: zipCode,
            // location: location,
            // buyer_address_id:buyeraddress,
            active:1
           
        };
        API
            .post("buyer_address/update", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    history.push("/manageaccount");
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
                    <form class="registrationform" onSubmit={updateAddress} >
                    <button className="back-btn-paymentform" onClick={() => history.push("/manageaccount")}>Back</button> 
                        <h2 class="title"> DealerInformation Edit</h2>
                        <div class="row">

                        <div class="col-sm-12 form-group">
                                <input type="text"  defaultValue={accountObjc.first_name} class="form-control" placeholder="First name" required onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.last_name} class="form-control" placeholder="Last name" required onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={accountObjc.phone_no} class="form-control" placeholder="Primary phone" required onChange={(e) => setPrimaryPhone(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={accountObjc.mobile_no} class="form-control" placeholder="Mobile phone" required onChange={(e) => setMobilePhone(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.address} class="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <StateAndCity 
                                setStateValue = { getStateName } 
                                setCityValue ={ getCityName }
                                setZIpCodeValue ={ getZipCodeId }
                                isEdit = {true}
                                defaultStateValue = {state}
                                defaultCityValue = {city}
                                defaultZipcodeValue = {zipCode}
                            />
                            {/* <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.city_name} class="form-control" placeholder="City" required onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.state_name} class="form-control" placeholder="State" required onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="form-control" placeholder="Zip code" required onChange={(e) => setZIpCode(e.target.value)} />
                            </div> */}
                          
                    
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

export default EditAddress;