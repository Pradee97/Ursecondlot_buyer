import React from 'react';
import API from "../../Services/BaseService";
import ls from 'local-storage';
import { useHistory,useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-number-input/input';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Component/Loading/Loading';
import StateAndCity from '../../Component/StateAndCity/StateAndCity'
import Popup from '../../Component/Popup/Popup';
import LateFee from '../../Pages/LateFee/LateFee';
import FileBase64 from 'react-file-base64';
import adduser from '../../assets/img/adduser.jpg';

const EditDealerInformation = (props) => {

    let { register, updateDealerInfo, formState: { errors },reset  } = useForm();
    const history = useHistory();
    // const { id } = useParams();
    const {id} = props.location.state;
    const userDetails = ls.get('userDetails');
    const [accountObjc, setAccountObj] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [primaryPhone, setPrimaryphone] = useState("");
    const [mobilePhone, setMobilephone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipcode] = useState("");
    const [loading,setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [doc, setDoc] = useState("");
    const [type,setType]=useState("");
    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  	}

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [primaryPhoneError, setPrimaryPhoneError] = useState("")
    const [mobilePhoneError, setMobilePhoneError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [stateAndCityError, setStateAndCityError] = useState("");
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
    const buyer_id=JSON.parse(JSON.stringify(loggedInBuyerId)).buyer_id;
    const buyer_dealer_id=JSON.parse(JSON.stringify(loggedInBuyerId)).buyer_dealer_id;
    

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
            buyer_dealer_id: buyer_dealer_id,
        };
        const state = API.post('user_profile/condition', request);
        state.then(res => {
            console.log( "userDetails=>",userDetails)
            console.log("res=======>", res.data.data)
          
            setFirstname(res.data.data[0].first_name);
            setLastname(res.data.data[0].last_name);
            setPrimaryphone(res.data.data[0].phone_no);
            setMobilephone(res.data.data[0].mobile_no);
            setAddress(res.data.data[0].address);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZipcode(res.data.data[0].zipcode);
            setAccountObj(res.data.data[0]);
            
        })
            .catch(err => { console.log(err); });
          
      
    }
    function formatMobileNO(value){
        var x = value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
    
        console.log("value of x",x);
        value = '+'+ x[1]+'('+ x[2] +')' + x[3] + '-' + x[4];
        console.log("mobileno",value);
        return value;
     }
     updateDealerInfo = (event) => {
        // setOpenLoader(true);
        event.preventDefault();    
        
         setFirstNameError("")
        // setLastNameError("")
        // setPrimaryPhoneError("")
        // setMobilePhoneError("")
        setAddressError("")
        setStateAndCityError("")

        // if(!firstName){
        //     setFirstNameError("Dealer Name is required")
        //     return;
        // }
        // else if(firstName.length>50){
        //     setFirstNameError("Dealer Name must not exceed 50 characters")
        //     return;
        // }
        // if(!lastName){
        //     setLastNameError("Last Name is required")
        //     return;
        // }
        // else if(lastName.length>50){
        //     setLastNameError("Last Name must not exceed 50 characters")
        //     return;
        // }
        // if(!primaryPhone){
        //     setPrimaryPhoneError("Primary Phone is required")
        //     return;
        // }
        // else if(primaryPhone.length<12 ){
        //     setPrimaryPhoneError("Primary Phone must have 10 digits")
        //     return;
        // }
        // if(!mobilePhone){
        //     setMobilePhoneError("Mobile Phone is required")
        //     return;
        // }
        // else if(mobilePhone.length<12){
        //     setMobilePhoneError("Mobile Phone must have 10 digits")
        //     return;
        // }
        if(!address){
            setAddressError("Address is required")
            return;
        }
        else if(address.length>150){
            setAddressError("Address must not exceed 150 characters")
            return;
        }
        // if(!(typeof city==='string'?accountObjc.city_id:city) || !(typeof state==='string'?accountObjc.state_id:state) || !(zipCode===accountObjc.zipcode?accountObjc.zipcode_id:zipCode)){
        //     setStateAndCityError("State, City and Zipcode is required")
        //     return
        // }
        if(!(typeof state==='string'?accountObjc.state_id:state)){
            setStateAndCityError("state is required")
            return
        }
        if(!(typeof city==='string'?accountObjc.city_id:city)){
            setStateAndCityError("city is required")
             return
        }
        if(!(zipCode===accountObjc.zipcode?accountObjc.zipcode_id:zipCode)){
            setStateAndCityError("zipcode is required")
             return
        }
        // if(!state){
        //     setStateAndCityError("state is required")
        //     return
        // }
        // if(!city){
        //     setStateAndCityError("city is required")
        //      return
        // }
        // if(!zipCode){
        //     setStateAndCityError("zipcode is required")
        //      return
        // }

        let request = {
            buyer_dealer_id:id,
            // dealer_name: firstName,
            // last_name: lastName,
            // phone_no: formatMobileNO(primaryPhone),
            // mobile_no: formatMobileNO(mobilePhone),
            address: address,
            // city_id: city,
            // state_id: state,
            // zipcode_id: zipCode,
            city_id: typeof city==='string'?accountObjc.city_id:city,
            state_id: typeof state==='string'?accountObjc.state_id:state,
            zipcode_id: zipCode===accountObjc.zipcode?accountObjc.zipcode_id:zipCode,
            active:1,
            image:doc===""?doc:doc.length>0?doc:[doc],           
            updatedBy:buyer_id

        };
        console.log("request==----==",request)
        API
            .post('user_profile/update', request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    ls.set('userDetails', response.data.data[0]);
                    console.log("local str======", ls.set('userDetails', response.data.data[0]))
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
                    // setPopupMsg("Edit Dealer Information is not update, Please try Again");
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
        buyer_dealer_id: id,
    };
    const state = API.post('user_profile/condition', request);
    state.then(res => {
        console.log("res=======>", res.data.data)
        setFirstname(res.data.data[0].dealer_name);
        // setLastname(res.data.data[0].last_name);
        // setPrimaryphone(res.data.data[0].phone_no);
        // setMobilephone(res.data.data[0].mobile_no);
        setAddress(res.data.data[0].address);
        setCity(res.data.data[0].city_name);
        setState(res.data.data[0].state_name);
        setZipcode(res.data.data[0].zipcode);
        setAccountObj(res.data.data[0])
        reset(res.data.data[0]);
        setLoading(false);

    })
    
        .catch(err => { console.log(err); });
        
    }, [reset,buyer_id,buyer_dealer_id]);

    function handleOnChange(value) {
        setPrimaryphone(value);
     }

     function handleOnChanges(value) {
        setMobilephone(value);
     }

     const getlateFee=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('getlatefee/condition',request).then(res=>{
           if(res.data.data.length){
            
       console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
            const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
            setIsLateFee(lateFeeValueStatus==="yes")
            setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
           }
          
    
        }).catch(err=>{console.log(err);});
    }
    const getFiles=(file)=>{
        console.log("================>",file.type)
        setType("")
        if(file.type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")){
            setDoc(file);
        }else{
            setType("0");
        }
      }
    useEffect(() => {

        getlateFee();

    }, []);

    return (

        <div>
        {loading?<Loading/>:
            <main id="main" className="inner-page">
            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
            <div className="section-title">
                                <h2> Edit Dealer Information</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                 
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0  flooraddform">
                <div className="adduserpage-inner"> 
                <div className="col-lg-12">
                    <form className="registrationform" onSubmit={updateDealerInfo} >                   
                       
                        <div className="row">
                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i className="icofont-arrow-left"></i> Back</button>   
							<h2> Edit Dealer Information</h2>
						
                        <div className="col-sm-12 form-group">
                                <div className="user-upload-btn-wrapper">
                                {doc===""?<img alt=""  src={accountObjc.image || adduser} ></img>:
                                <img alt="" src={doc.base64} ></img>														
                                }
                                <span className="proCamera"></span>
                                {type==="0"?<div className="form-input-error">Upload only Image Format </div>:""}      
                                <FileBase64 onDone={ getFiles }  type="hidden"/>				
                                </div>
                                </div>
                                </div>
                        <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  className="textbox" placeholder={accountObjc.dealer_name} disabled />
                                <label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>Dealer Name</label>
                                {/* <p className="form-input-error" >{firstNameError}</p> */}

                            </div>
                            </div>
        
                            {/* <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  defaultValue={accountObjc.first_name} className="textbox" placeholder="First name"  onChange={(e) => setFirstname(e.target.value)} />
                                <label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                                <p className="form-input-error" >{firstNameError}</p>

                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.last_name} className="textbox" placeholder="Last name"  onChange={(e) => setLastname(e.target.value)} />
                                <label htmlFor="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                                <p className="form-input-error" >{lastNameError}</p>

                            </div>
                            </div> */}
                            {/* <div className="col-sm-4 form-group countrycode">
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
                            {/* <MuiPhoneNumber value={accountObjc.phone_no} defaultCountry={'us'} onlyCountries={['us']}  className="textbox" onChange={handleOnChange} ></MuiPhoneNumber> */}
                                 {/* <input type="text" defaultValue={accountObjc.phone_no} class="textbox" placeholder="Primary phone"  onChange={(e) => setPrimaryphone(e.target.value)} /> */}
                                {/* <label for="phone_no" className={primaryPhone != "" ? "input-has-value" : ""}>Primary Phone</label>
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
                            </div> */} 
                            <div class="col-sm-8 form-group ">
                            {/* <div className="tbox ">
                            <PhoneInput value={accountObjc.mobile_no} country="US" className="textbox" maxLength="14" minLength="14" onChange={handleOnChanges} ></PhoneInput>
                            {/* <MuiPhoneNumber value={accountObjc.mobile_no} defaultCountry={'us'} onlyCountries={['us']}  className="textbox" onChange={handleOnChanges} ></MuiPhoneNumber> */}
                               {/* <input type="text" defaultValue={accountObjc.mobile_no} class="textbox" placeholder="Mobile phone"  onChange={(e) => setMobilephone(e.target.value)} /> */}
                                {/* <label for="mobile_no" className={mobilePhone != "" ? "input-has-value" : ""}>Mobile Phone</label>
                            </div>
                            <p className="form-input-error" >{mobilePhoneError}</p> */} 
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.address} className="textbox" placeholder="Address"  onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="address" className={address != "" ? "input-has-value" : ""}>Address</label>
                                <p className="form-input-error" >{addressError}</p>

                            </div>
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
                            <p className="form-input-error"> {stateAndCityError} </p>
                            {/* <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.city_name} class="form-control" placeholder="City" required onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.state_name} class="textbox" placeholder="State" required onChange={(e) => setState(e.target.value)} />
                                <label htmlFor="state" className={state != "" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="form-control" placeholder="Zip code" required onChange={(e) => setZipcode(e.target.value)} />
                            </div> */}
                          
                    
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Update</button>
                            </div>
                        </div>
                    </form>

                    </div>  </div></div></div></div></div></div>


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


{isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />} 

            </main>
}
        </div>


    );
};

export default EditDealerInformation;