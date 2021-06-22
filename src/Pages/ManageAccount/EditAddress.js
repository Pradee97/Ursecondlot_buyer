import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks";
import { useForm } from "react-hook-form";

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
    // let { register, updateAddress, formState: { errors },reset  } = useForm();
    const [accountObjc, setAccountObj] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZIpCode] = useState("");
    const [location, setLocation] = useState("");
    const [instruction, setInstruction] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [firstNameError, setFirstNameError] = useState("")
 
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
        setZIpCode(zipData)
    }

    async function fetchAccountDetails() {
        // console.log(id)
        
        let request = {
            buyer_address_id:id,
        };
        const state = API.post('buyer_address/condition', request);
        state.then(res => {
            setFirstName(res.data.data[0].first_name);
            setLastName(res.data.data[0].last_name);
            setAddress(res.data.data[0].address);
            setPrimaryPhone(res.data.data[0].phone_no);
            setMobilePhone(res.data.data[0].mobile_no);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZIpCode(res.data.data[0].zipcode_id);
            setLocation(res.data.data[0].location);
            setInstruction(res.data.data[0].instructions);
            setZIpCode(res.data.data[0].zipcode);
            setAccountObj(res.data.data[0])
        })
            .catch(err => { console.log(err); });
    }
  
    const updateAddress = (event) => {
        // setOpenLoader(true);
        event.preventDefault();   
        setFirstNameError("")            
        let request = {
            buyer_address_id:id,
            buyer_id:JSON.parse(localStorage.getItem("userDetails")).user_id,
            first_name: FirstName,
            last_name: lastName,
            address: address,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,
            city_id: typeof city==='string'?accountObjc.city_id:city,
            state_id: typeof state==='string'?accountObjc.state_id:state,
            zipcode_id: zipCode===accountObjc.zipcode?accountObjc.zipcode_id:zipCode,
            location: location,
            instructions: instruction,
            // buyer_address_id:buyeraddress,
            active:1
           
        };
        console.log("====request==>",request)
        if(!FirstName){
            setFirstNameError("First name is required")
            return;
        }
        console.log("==========FirstName==========>",FirstName);
        console.log("==========lastName==========>",lastName);
        console.log("==========address==========>",address);
        console.log("==========primaryPhone==========>",primaryPhone);

        
        API
            .post("buyer_address/update", request)
            .then((response) => {
                    if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Edit Address");
                    setPopupMsg(" Edit Address is successfully Updated");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")

                } else {
                    togglePopup()
                    setPopupTitle("Edit Address");
                    setPopupMsg("Edit Address is not update, Please try Again");
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
      //fetchAccountDetails();
      let request = {
        buyer_address_id:id,
    };
    const state = API.post('buyer_address/condition', request);
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
        setLocation(res.data.data[0].location);
        setInstruction(res.data.data[0].instructions);
        setZIpCode(res.data.data[0].zipcode);
        setAccountObj(res.data.data[0])
        // reset(res.data.data);
    })
        .catch(err => { console.log(err); });
    }, []);
    return (
        <div>
            <main id="main" class="inner-page">
            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
                            <div className="section-title">
                                <h2>Edit Address</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                  <div className="mgaccountuser">
                    <div className="mgaccountuserleft">
                      <img src={process.env.PUBLIC_URL + "/images/userimg.jpg"} className="img-fluid" alt="..." />
                    </div>
                    <div className="mgaccountuserright">
                      <h3>Fernand</h3>
                      <div className="d-flex align-items-center">
                        <p className="details"><img src={process.env.PUBLIC_URL + "/images/Path.svg"} className="img-fluid" alt="..." /><span>California, Cl</span></p>
                      </div>
                    </div>
                  </div>
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 flooraddform">
                <div className="adduserpage-inner">
                <div className="col-lg-12">               
              
                    <form class="registrationform" onSubmit={updateAddress} >  
                    
                        <div class="row">
                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i class="icofont-arrow-left"></i> Back</button>
							<h2>Edit Address </h2>
						</div>

                        <div class="col-sm-12 form-group">
                        <div className="tbox">
                                <input type="text" defaultValue={accountObjc.first_name} class="textbox" placeholder="" onChange={(e) => setFirstName(e.target.value)} />
                                <label for="first_name" className={"input-has-value"}>First Name</label>
                            </div>
                            <p className="form-input-error" >{firstNameError}</p>
                            </div>
                            
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.last_name} class="textbox" placeholder="" onChange={(e) => setLastName(e.target.value)} />
                                <label for="last_name"  className={"input-has-value"}>Last name</label>
                            </div> </div>
                        
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.phone_no} class="textbox" placeholder="" onChange={(e) => setPrimaryPhone(e.target.value)} />
                                <label for="primary_phone"  className={"input-has-value"}>Primary Phone</label>
                            </div> </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.mobile_no} class="textbox" placeholder="" onChange={(e) => setMobilePhone(e.target.value)} />
                                <label for="mobile_phone"  className={"input-has-value"}>Mobile Phone</label>
                            </div> </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.address} class="textbox" placeholder="" onChange={(e) => setAddress(e.target.value)} />
                                <label for="address"  className={"input-has-value"}>Address</label>
                            </div> </div>
                            <StateAndCity 
                                setStateValue = { getStateName } 
                                setCityValue ={ getCityName }
                                setZipcodeValue ={ getZipCodeId }
                                isEdit = {true}
                                defaultStateValue = {state}
                                defaultCityValue = {city}
                                defaultZipcodeValue = {zipCode}
                            />
                             <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.location} class="textbox" placeholder="" onChange={(e) => setLocation(e.target.value)} />
                                <label for="location"  className={"input-has-value"}>Location</label>
                            </div> </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.instructions} class="textbox" placeholder="" onChange={(e) => setInstruction(e.target.value)} />
                                <label for="instructions"  className={"input-has-value"}>Instructions</label>
                            </div> </div>
                            {/* <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.city_name} class="form-control" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.state_name} class="form-control" placeholder="State" onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="form-control" placeholder="Zip code" onChange={(e) => setZIpCode(e.target.value)} />
                            </div> */}
                          
                    
                            <div class="col-lg-12 loginBtn">
                                <button type="submit" class="cta-btn">Update</button>
                            </div>
                        </div>
                    </form>

                    </div></div></div></div> </div></div></div>
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

export default EditAddress;