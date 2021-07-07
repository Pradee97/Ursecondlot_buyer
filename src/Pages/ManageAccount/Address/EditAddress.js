import React from 'react';
import API from "../../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity';
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-number-input/input';


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
    const [lastNameError, setLastNameError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [primaryPhoneError, setPrimaryPhoneError] = useState("")
    const [mobilePhoneError, setMobilePhoneError] = useState("")
    const [locationError, setLocationError] = useState("")
    const [instructionError, setInstructionError] = useState("")
    const [stateAndCityError, setStateAndCityError] = useState("")

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
    function formatMobileNO(value){
        console.log("Value",value);
        var x = value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
    
        console.log("value of x",x);
        value = '+'+ x[1]+'('+ x[2] +')' + x[3] + '-' + x[4];
        console.log("mobileno",value);
        return value;
     }
    const updateAddress = (event) => {
        // setOpenLoader(true);
        event.preventDefault();  

        setFirstNameError("")  
        setLastNameError("")
        setPrimaryPhoneError("")
        setMobilePhoneError("")
        setAddressError("")
        setLocationError("")
        setInstructionError("")
        setStateAndCityError("")
        
        let request = {
            buyer_address_id:id,
            buyer_id:JSON.parse(localStorage.getItem("userDetails")).user_id,
            first_name: FirstName,
            last_name: lastName,
            address: address,
            phone_no: formatMobileNO(primaryPhone),
            mobile_no: formatMobileNO(mobilePhone),
            city_id: typeof city==='string'?accountObjc.city_id:city,
            state_id: typeof state==='string'?accountObjc.state_id:state,
            zipcode_id: zipCode===accountObjc.zipcode?accountObjc.zipcode_id:zipCode,
            location: location,
            instructions: instruction,
            // buyer_address_id:buyeraddress,
            active:1
           
        };
        // console.log("====request==>",request)
        if(!FirstName){
            setFirstNameError("First Name is required")
            return;
        }
        else if(FirstName.length>50){
            setFirstNameError("First Name must not exceed 50 characters")
            return;
        }
        if(!lastName){
            setLastNameError("Last Name is required")
            return;
        }
        else if(lastName.length>50){
            setLastNameError("Last Name must not exceed 50 characters")
            return;
        }       
        if(!primaryPhone){
            setPrimaryPhoneError("Primary Phone is required")
            return;
        }
        else if(primaryPhone.length<12){
            setPrimaryPhoneError("Primary Phone must have 10 digits ")
            return;
        }     
        if(!mobilePhone){
            setMobilePhoneError("Mobile Phone is required")
            return;
        }
        else if(mobilePhone.length<12){
            setMobilePhoneError("Mobile Phone must have 10 digits")
            return;
        }
        if(!address){
            setAddressError("Address is required")
            return;
        }
        else if(address.length>150){
            setAddressError("Address must not exceed 150 characters")
            return;
        } 
        if(!location){
            setLocationError("Location is required")
            return;
        }
        else if(location.length>150){
            setLocationError("Location must not exceed 150 characters")
            return;
        }
        if(!instruction){
            setInstructionError("Instructions is required")
            return;
        }
        else if(instruction.length>150){
            setInstructionError("Instruction must not exceed 150 characters")
            return;
        }
        if(!(typeof city==='string'?accountObjc.city_id:city) || !(typeof state==='string'?accountObjc.state_id:state) || !(zipCode===accountObjc.zipcode?accountObjc.zipcode_id:zipCode)){
            setStateAndCityError("State, City and Zipcode is required")
            return
        }
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
                    // setPopupMsg("Edit Address is not update, Please try Again");
                    setPopupMsg( response.data.error.err );
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
    function handleOnChange(value) {
        setPrimaryPhone(value);
     }
     function handleOnChanges(value) {
        setMobilePhone(value);
     }
    return (
        <div>
            <main id="main" className="inner-page">
            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
                            <div className="section-title">
                                <h2>Edit Address</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                 
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 flooraddform">
                <div className="adduserpage-inner">
                <div className="col-lg-12">               
              
                    <form className="registrationform" onSubmit={updateAddress} >  
                    
                        <div className="row">
                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i className="icofont-arrow-left"></i> Back</button>
							<h2>Edit Address </h2>
						</div>

                        <div className="col-sm-12 form-group">
                        <div className="tbox">
                                <input type="text" defaultValue={accountObjc.first_name} className="textbox" placeholder="" onChange={(e) => setFirstName(e.target.value)} />
                                <label htmlFor="first_name" className={"input-has-value"}>First Name</label>
                                <p className="form-input-error" >{firstNameError}</p>

                            </div>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.last_name} className="textbox" placeholder="" onChange={(e) => setLastName(e.target.value)} />
                                <label htmlFor="last_name"  className={"input-has-value"}>Last name</label>
                                <p className="form-input-error" >{lastNameError}</p>

                            </div> </div>
                            <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder="" defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div>
                            <div class="col-sm-8 form-group ">
                            <div className="tbox ">
                            <PhoneInput value={accountObjc.phone_no} country="US" className="textbox" maxLength="14" minLength="14" onChange={handleOnChange} ></PhoneInput>
                            <label for="primary_phone"  className={"input-has-value"}>Primary Phone</label>
                            </div>
                            <p className="form-input-error" >{primaryPhoneError}</p>
                            </div>
                            <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder="" defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div>
                            <div class="col-sm-8 form-group ">
                            <div className="tbox ">
                            <PhoneInput value={accountObjc.mobile_no} country="US" className="textbox" maxLength="14" minLength="14" onChange={handleOnChanges} ></PhoneInput>
                            <label for="mobile_phone"  className={"input-has-value"}>Mobile Phone</label>
                            </div> 
                            <p className="form-input-error" >{mobilePhoneError}</p>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.address} className="textbox" placeholder="" onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="address"  className={"input-has-value"}>Address</label>
                                <p className="form-input-error" >{addressError}</p>

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
                            <p className="form-input-error"> {stateAndCityError} </p>
                             <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.location} className="textbox" placeholder="" onChange={(e) => setLocation(e.target.value)} />
                                <label htmlFor="location"  className={"input-has-value"}>Location</label>
                                <p className="form-input-error" >{locationError}</p>

                            </div> </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.instructions} className="textbox" placeholder="" onChange={(e) => setInstruction(e.target.value)} />
                                <label htmlFor="instructions"  className={"input-has-value"}>Instructions</label>
                                <p className="form-input-error" >{instructionError}</p>

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
                    
                            <div className="col-lg-12 loginBtn">
                                <button type="submit" className="cta-btn">Update</button>
                            </div>
                        </div>
                    </form>

                    </div></div></div></div> </div></div></div>
                <section id="playstoreBlock" className="playstoreBlock">
                    <div className="container">
                        <div className="row content">
                            <div className="col-lg-12">
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