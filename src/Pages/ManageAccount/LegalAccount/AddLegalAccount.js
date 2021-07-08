import React from 'react';
import API from "../../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { getMonth, getYear } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity';
import { useForm } from "react-hook-form";
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks"

const AddLegalAccount = () => {

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    const [startDate, setStartDate] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
     
    const dateFormat = 'MM/DD/YYYY';
    const customFormat = value => `${value.format(dateFormat)}`;
    const [etax, setTax]=useState ("1");
    const [edealerExp, setDealerExp]=useState ("1");

    const history = useHistory();   
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")

    const userDetails=ls.get('userDetails');
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [EINnumber, setEINnumber] = useState("");
    const [dealershiplicense, setDealershiplicense] = useState(""); 
    const [taxid, setTaxid] = useState("");
    const [address, setAddress] = useState("");
    const [dealershipLicenseexp, setDealershiplicenseexp] = useState(null);
    const [taxidexp, setTaxidexp] = useState(null);
    const [legalBusinessname, setLegalBusinessname] = useState("");
    const [stateName, setStateName] = useState("");
	const [cityName, setCityName] = useState("");
    const [zipCodeId, setZipcodeId] = useState("");
    
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [EINnumberError, setEINnumberError] = useState("");
    const [dealershiplicenseError, setDealershiplicenseError] = useState(""); 
    const [taxidError, setTaxidError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [dealershipLicenseexpError, setDealershiplicenseexpError] = useState("");
    const [taxidexpError, setTaxidexpError] = useState("");
    const [legalBusinessnameError, setLegalBusinessnameError] = useState("");
    const [stateAndCityError, setStateAndCityError] = useState("");
    const [state,setState]=useState("1");
    const [city,setCity]=useState("1");
    const [zipcode,setZipcode]=useState("1");

    
    const onhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();        
    
        setFirstNameError("") 
        setLastNameError("")
        setLegalBusinessnameError("") 
        setEINnumberError("") 
        setDealershiplicenseError("") 
        setTaxidError("")
        setAddressError("")
        setDealershiplicenseexpError("")
        setTaxidexpError("")
        setStateAndCityError("")
      

        let request = {
            buyer_id: userDetails.user_id,
            first_name: firstname,
            last_name: lastname,                                           
            ein_no: EINnumber,
            dealer_license: dealershiplicense,
            tax_id: taxid,
            tax_id_exp: moment(taxidexp).format("YYYY-MM-DD"),
            dealer_license_exp: moment(dealershipLicenseexp).format("YYYY-MM-DD"),
            state_id: state,
            city_id: city,
            zipcode_id: zipcode,
            address: address,
            bussiness_name: legalBusinessname,
            active: 1          
        };
        console.log("===",request)
        // return

    
    if(!firstname){
        setFirstNameError("First Name is required")
        return;
    }
    else if(firstname.length>50){
        setFirstNameError("First Name must not exceed 50 characters")
        return;
    }       
    if(!lastname){
        setLastNameError("Last Name is required")
        return;
    }
    else if(lastname.length>50 ){
        setLastNameError("Last Name must not exceed 50 characters ")
        return;
    }
    if(!legalBusinessname){
        setLegalBusinessnameError("Legal Businessname is required")
        return;
    }
    else if(legalBusinessname.length>50 ){
        setLegalBusinessnameError("Legal Businessname must have 50 digits ")
        return;
    }
    if(!EINnumber){
        setEINnumberError("EIN Number is required")
        return;
    }
    else if(EINnumber.length>50 ){
        setEINnumberError("EIN Number must have 50 digits ")
        return;
    }
    if(!dealershiplicense){
        setDealershiplicenseError("Dealership License is required")
        return;
    }
    else if(dealershiplicense.length>50 ){
        setDealershiplicenseError("Dealership License must have 50 digits ")
        return;
    }
    if(!taxid){
        setTaxidError("Tax Id is required")
        return;
    }
    else if(taxid.length>50 ){
        setTaxidError("Tax Id must have 50 digits ")
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
    if(!stateName){
        setStateAndCityError("state is required")
        return
    }
    if(!cityName){
        setStateAndCityError("city is required")
         return
    }
    if(!zipCodeId){
        setStateAndCityError("zipcode is required")
         return
    }     
    if(!dealershipLicenseexp){
        setDealershiplicenseexpError("Dealership Licenseexp is required")
        return;
    }
    if(!taxidexp){
        setTaxidexpError("Tax Idexp is required")
        return;
    } 

    
        API.post("legal_manage/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Create Legal manage account");
                    setPopupMsg("Legal manage account is successfully created");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")

                } else {
                    togglePopup()
                    setPopupTitle("Create Legal manage account");
                    // setPopupMsg("Legal manage account is not Created, Please try Again");
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
            })
            .catch(err => { console.log(err); });


    }
    const getStateName = (stateData) => {
        setStateName(stateData)
        setCityName(null)
        setZipcodeId(null)
    }
    
    const getCityName = (cityData) => {
        setCityName(cityData)
        setZipcodeId(null)
    }
    
    const getZipCodeId = (zipData) => {
        setZipcodeId(zipData)
    }

    return (
        <div>
            <main id="main" className="inner-page">

            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
            <div className="section-title">
                                <h2>Add Legal Manage Account</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0  flooraddform">
                <div className="adduserpage-inner"> 
                <div className="col-lg-12">
                    <form className="registrationform" onSubmit={handleSubmit(onhandleSubmit)} >
                        <div className="row">

                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i className="icofont-arrow-left"></i> Back</button>   
							<h2>Add Legal Manage Account</h2>
						</div>
                        <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="firstName"
                                
                                onChange={(e) => setFirstname(e.target.value)} />
                                <label htmlFor="contactName" className={firstname !="" ? "input-has-value" : ""}>First name</label>
                                
                                <p className="form-input-error" >{firstNameError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" name="lastname"
                                
                                onChange={(e) => setLastname(e.target.value)} />
                                <label htmlFor="companyName" className={lastname !="" ? "input-has-value" : ""}>Last name</label>
                                
                                <p className="form-input-error" >{lastNameError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" name="legalBusinessname"
                                
                                onChange={(e) => setLegalBusinessname(e.target.value)} />
                                <label htmlFor="branchName" className={legalBusinessname !="" ? "input-has-value" : ""}>Legal business name</label>
                                
                                <p className="form-input-error" >{legalBusinessnameError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="accountNumber" className="textbox" placeholder="" name="EINnumber"
                                
                                onChange={(e) => setEINnumber(e.target.value)} />
                                <label htmlFor="accountNumber" className={EINnumber !="" ? "input-has-value" : ""}>EIN number</label>
                               
                                <p className="form-input-error" >{EINnumberError}</p>
                            </div>
                            </div>
                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" name="dealershiplicense"
                                
                                onChange={(e) => setDealershiplicense(e.target.value)} />
                                <label htmlFor="creditLimit" className={dealershiplicense !="" ? "input-has-value" : ""}>Dealership license</label>
                                
                                <p className="form-input-error" >{dealershiplicenseError}</p>
                            </div>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="emailId" className="textbox" placeholder="" name="taxid"
                                
                                onChange={(e) => setTaxid(e.target.value)} />
                                <label htmlFor="emailId" className={taxid !="" ? "input-has-value" : ""}>Tax id</label>
                                
                                <p className="form-input-error" >{taxidError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="address" className="textbox" placeholder="" name="address"
                                
                                onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="address" className={address !="" ? "input-has-value" : ""}>Address</label>
                                
                                <p className="form-input-error" >{addressError}</p>
                            </div>
                            </div>
                            <StateAndCity
                                setStateValue={getStateName}
                                setCityValue={getCityName}
                                setZipcodeValue={getZipCodeId}
                            />
                            <div className="col-sm-12 form-group">
                            <p className="form-input-error"> {stateAndCityError}</p>
                            </div>
                           
                            {/* <div className="col-sm-12 form-group">
                            <div className="tbox">                            
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setCity(e.target.value)} />
                                <label htmlFor="phoneNumber" className={city !="" ? "input-has-value" : ""}>City</label>
                            </div>
                            </div>   
                            <div className="col-sm-12 form-group">
                             <div className="tbox">                            
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setState(e.target.value)} />
                                <label htmlFor="phoneNumber" className={state !="" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>                                     
                            <div className="col-sm-12 form-group">
                             <div className="tbox">                            
                                <input type="number" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setZipcode(e.target.value)} />
                                <label htmlFor="phoneNumber" className={zipcode !="" ? "input-has-value" : ""}>Zip code</label>
                            </div> 
                            </div>  */}
                            <div className="col-sm-12 form-group datePickerBlock">
                             <div className="tbox">  
                             <DatePicker 
                                    class="form-control textbox" name="Date" id="Date"
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                        <div
                                            style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            }}
                                        >
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                        </button>
                                        <select
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                        </select>
                                                    
                                        <select
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                        }
                                        >
                                        {months.map((option) => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                        </select>
                                                    
                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                        </button>
                                        </div>
                                    )}
                                            autoComplete="off"
                                            selected={dealershipLicenseexp}
                                            onChange={(date) => setDealershiplicenseexp(date)}
                                            isClearable
                                            placeholderText="Dealership license exp"
                                            // onChangeRaw={handleDateChangeRaw}
                                                        
                                    />                          
                               
                            </div>
                            <p className="form-input-error" >{dealershipLicenseexpError}</p>
                            </div>  
                            <div className="col-sm-12 form-group datePickerBlock">
                             <div className="tbox">     
                             <DatePicker 
                                    class="form-control textbox" name="Date" id="Date"
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                        <div
                                            style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            }}
                                        >
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                        </button>
                                        <select
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                        </select>
                                                    
                                        <select
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                        }
                                        >
                                        {months.map((option) => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                        </select>
                                                    
                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                        </button>
                                        </div>
                                    )}
                                            autoComplete="off"
                                            selected={taxidexp}
                                            onChange={(date) => setTaxidexp(date)}
                                            isClearable
                                            placeholderText="Tax id exp"
                                            // onChangeRaw={handleDateChangeRaw}
                                                        
                                    />                       

                            </div>
                            <p className="form-input-error" >{taxidexpError}</p>

                            </div>  

                          
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Submit</button>
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
            </main>
</div>


)
}

export default AddLegalAccount;