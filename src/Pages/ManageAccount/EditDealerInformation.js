import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';

import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';
import StateAndCity from '../../Component/StateAndCity/StateAndCity'

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

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")
  
    const getStateName=(stateData)=>{
        setState(stateData)
    }

    const getCityName=(cityData)=>{
        setCity(cityData)
    }

    const getZipCodeId=(zipData)=>{
        setZipcode(zipData)
    }

    async function fetchAccountDetails() {
        console.log(id)
        
        let request = {
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
        };
        const state = API.post('user_profile/condition', request);
        state.then(res => {
            console.log("res=======>", res.data.data)
            setFirstname(res.data.data[0].first_name);
            setLastname(res.data.data[0].last_name);
            setPrimaryphone(res.data.data[0].phone_no);
            setMobilephone(res.data.data[0].mobile_no);
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
            mobile_no: mobilePhone,
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
                    // history.push("/success");
                    togglePopup()
                    setPopupTitle("Edit Dealer Information");
                    setPopupMsg(" Edit Dealer Information is successfully Updated");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")

                } else {
                    togglePopup()
                    setPopupTitle("Edit Dealer Information");
                    setPopupMsg("Edit Dealer Information is not update, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                // setOpenLoader(false);
                // console.log(error);
                    togglePopup()
                    setPopupTitle("Error");
                    setPopupMsg( "Something went wrong, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
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
                    <button className="back-btn-paymentform" onClick={() => history.push("/manageaccount")}>Back</button>                
                        <h2 class="title"> Edit Dealer Information</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                                <input type="text"  defaultValue={accountObjc.first_name} class="form-control" placeholder="First name" required onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.last_name} class="form-control" placeholder="Last name" required onChange={(e) => setLastname(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.phone_no} class="form-control" placeholder="Primary phone" required onChange={(e) => setPrimaryphone(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.mobile_phone} class="form-control" placeholder="Mobile phone" required onChange={(e) => setMobilephone(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.address} class="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <StateAndCity 
                                setStateValue = { getStateName } 
                                setCityValue ={ getCityName }
                                setZipcodeValue ={ getZipCodeId }
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
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="form-control" placeholder="Zip code" required onChange={(e) => setZipcode(e.target.value)} />
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
                {isOpen && 
                <CommonPopup 
                    handleClose= {togglePopup}
                    popupTitle= {popupTitle}
                    popupMsg= {popupMsg}
                    popupType= {popupType}
                    popupActionType= {popupActionType}
                    popupActionValue= {popupActionValue}
                    popupActionPath={popupActionPath}
                />}
            </main>
          
        </div>


    );
};

export default EditDealerInformation;