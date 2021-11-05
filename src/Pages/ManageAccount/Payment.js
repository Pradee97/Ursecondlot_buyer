import React from 'react';
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useEffect } from 'react';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import API from "../../Services/BaseService";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../Component/StateAndCity/StateAndCity'
import { useForm } from "react-hook-form";

const Payment = () => {
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
   
    const[type,setType]=useState("");
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
    const [doc,setDoc]=useState("");
    const [dealershipNameError, setDealershipNameError] = useState("");
    const [accountHolderNameError, setAccountHolderNameError] = useState("");
    const [bankNameError, setBankNameError] = useState("");
    const [accountNumberError, setAccountNumberError] = useState("");
    const [ACHnumberError, setACHNumberError] = useState("");
    const [routingNumberError, setRoutingNumberError] = useState("");
    const [bankAddressError, setBankAddressError] = useState("");
    const [accountHolderAddressError, setAccountHolderAddressError] = useState("");
    const [docError,setDocError]=useState("");
    const [state,setState]=useState("1");
    const [city,setCity]=useState("1");
    const [zipcodeId,setZipCodeId]=useState("1");
    const [zipCode,setZipCode]=useState("1");
    const [stateAndCityError, setStateAndCityError] = useState("");
    const [accStateAndCityError,setAccStateAndCityError]=useState("");

    let files= [];
    let userDetails = ls.get('userDetails');

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
            const request={zipcode_id: data}
           
        API.post("location/condition", request)
        .then(response => {
               
            if (response.statusText== "OK"){
                console.log("google place data =>",data)
                const {results} = response.data.data
                if(results.length>0){

                    console.log("CITY  ",results[0].address_components[1].long_name)
                    console.log("STATE  ",results[0].address_components[2].long_name )
                    if(con===1){
                    setCityName( results[0].address_components[1].long_name)
                    setStateName(results[0].address_components[3].long_name)
                }
                else{
                    setAccountCityName(results[0].address_components[1].long_name)
                    setAccountStateName(results[0].address_components[3].long_name)
                }              
                }
                else{
                    setCityName('')
                    setStateName('') 
                    setAccountCityName('')
                    setAccountStateName('')
                    console.log("please enter valid zipcode") ;
                }
            }else{
                console.log("something went wrong in address api..., try again")
            }
            
        })
        }
        
    }
    const onFileChange = (event) => {
        setDoc(event.target.files[0]);        
      };

    const paymenthandleSubmit= (data) => {
        // setOpenLoader(true);
        // event.preventDefault();    
       
        setDealershipNameError("")
        setAccountHolderNameError("") 
        setBankNameError("") 
        setAccountNumberError("")
        setACHNumberError("")
        setRoutingNumberError("")
        setBankAddressError("")
        setAccountHolderAddressError("")    
        setStateAndCityError("")
        setAccStateAndCityError("")
        setDocError("")

        console.log("=====docdoc====>",doc)
        let request = {
            buyer_dealer_id: userDetails.buyer_dealer_id,
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
            doc_name:doc===""?doc:doc.length>0?doc:[doc],
            active:1
        }
        
        if(!dealershipName){
            setDealershipNameError("Dealership Name is required")
            return;
        }
        else if(dealershipName.length>50){
            setDealershipNameError("Dealership Name must not exceed 50 characters")
            return;
        }
        if(!accountHolderName){
            setAccountHolderNameError("Signer on account is required")
            return;
        }
        else if(accountHolderName.length>50){
            setAccountHolderNameError("Signer on account must not exceed 50 characters")
            return;
        }       
        if(!bankName){
            setBankNameError("Bank Name is required")
            return;
        }
        else if(bankName.length>50 ){
            setBankNameError("Bank Name must not exceed 50 characters ")
            return;
        }
      
        if(!accountNumber){
            setAccountNumberError("Account Number is required")
            return;
        }
        else if(accountNumber.length>50 ){
            setAccountNumberError("Account Number must not exceed 50 characters ")
            return;
        }
        if(!ACHnumber){
            setACHNumberError("ACH Number is required")
            return;
        }
        else if(ACHnumber.length>50){
            setACHNumberError("ACH Number must not exceed 50 characters")
            return;
        }
        if(!routingNumber){
            setRoutingNumberError("Routing Number is required")
            return;
        }
        else if(routingNumber.length>50){
            setRoutingNumberError("Routing Number must not exceed 50 characters")
            return;
        }
        if(!bankAddress){
            setBankAddressError("Bank Address is required")
            return;
        }
        else if(bankAddress.length>150){
            setBankAddressError("Bank Address must not exceed 150 characters")
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
        if(!accountHolderAddress){
            setAccountHolderAddressError("AccountHolder Address is required")
            return;
        }
        else if(accountHolderAddress.length>150){
            setAccountHolderAddressError("AccountHolder Address must not exceed 150 characters")
            return;
        }
        if(!accountStateName){
            setAccStateAndCityError("state is required")
            return
        }
        if(!accountCityName){
            setAccStateAndCityError("city is required")
             return
        }
        if(!accountZipcodeId){
            setAccStateAndCityError("zipcode is required")
             return
        }
        // if(!doc){
        //     setDocError("Upload Document is required")
        //     return;
        // }
        // if(!doc)
        // {
        // setType("1");
        // return;
        // }
        // else
        // {
        //     setType("");
        // }
        // if( type!=="1" ){
        //     console.log("tyoe",type);

            
        if(!doc)
        {
        setType("1");
        return;
        }
        else if(!doc[0].type.includes('.txt') || !doc[0].type.includes('.doc') || !doc[0].type.includes('.pdf') || !doc[0].type.includes('.png') || !doc[0].type.includes('.jpeg') || !doc[0].type.includes('.jpg'))
        {
            setType("2");
        return;
        }
        else
        {
            setType("");
        }
        
        if( type!=="1" ){
            console.log("type",type);
           
        API
            .post("payment_info/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    togglePopup()
                    setPopupTitle("Create Payment");
                    setPopupMsg("Payment Successfully Created");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/paymentinfo")
                } else {
                    togglePopup()
                    setPopupTitle("Create Payment");
                    // setPopupMsg("Payment is not Created, Please try Again");
                    setPopupMsg( response.data.error.err );
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                // setOpenLoader(false);
                    togglePopup()
                    setPopupTitle("Error");
                    setPopupMsg( "Something went wrong, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
        });
    }
        
}
    const getFiles=(file)=>{
        //setDoc(file);
       
        console.log("file",file)
        console.log("================>",file[0].type)
        //if(file[0].type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")){
            setDoc(file);
        // }else{
            setType("");
        // }
        //setType("")
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
    const getAccStateName=(stateData)=>{
        setAccountStateName(stateData)
        setAccountCityName(null)
        setAccountZipcodeId(null)
    }

    const getAccCityName=(cityData)=>{
        setAccountCityName(cityData)
        setAccountZipcodeId(null)
    }

    const getAccZipCodeId=(zipData)=>{
        setAccountZipcodeId(zipData)
    }

    return (
        <div>

            <main id="main" className="inner-page">


                <div id="paymentaccount" className="paymentaccount">
                    <div className="container" >
                        <div className="paymentaccountblock col-lg-12">
                            <div className="section-title">
                                <h2>Create Financials</h2>
                            </div>
                            <div className="row content">
                                <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                                   
                                    <ManageAccountLinks />
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock">
                                    <div className="paymentdetailblock">
                                        <p>Thank you for providing us the information of your bank system. We going to use this for make charegs to your account when you purchase a car.To assure easy transaction for your business</p>


                                        <div className="paymentform card col-lg-12">
                                            <form className="backaccountform addpaymentform" onSubmit={handleSubmit(paymenthandleSubmit)}>
                                                <h2 className="title"> Bank account information</h2>
                                                <div className="row">


                                                    <div className="col-sm-12 form-group topforms">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="dealershipName" id="name-d" placeholder="" 
                                                            onChange={(e) => setDealershipName(e.target.value)} />
                                                            <label htmlFor="name-d" className={dealershipName !="" ? "input-has-value" : ""}>Dealership name</label>
                                                            <p className="form-input-error" >{dealershipNameError}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="accountHolderName" id="name-f" placeholder="" 
                                                            onChange={(e) => setAccountHolderName(e.target.value)} />
                                                            <label htmlFor="name-f" className={accountHolderName !="" ? "input-has-value" : ""}>Signer on account</label>
                                                            <p className="form-input-error" >{accountHolderNameError}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="bankName" id="name-l" placeholder="" 
                                                            onChange={(e) => setBankName(e.target.value)} />
                                                            <label htmlFor="name-b" className={bankName !="" ? "input-has-value" : ""}>Bank name</label>
                                                            <p className="form-input-error" >{bankNameError}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="accountNumber" id="anumber" placeholder="" 
                                                            onChange={(e) => setAccountNumber(e.target.value)} />
                                                            <label htmlFor="anumber" className={accountNumber !="" ? "input-has-value" : ""}>Account number</label>
                                                            <p className="form-input-error" >{accountNumberError}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="ACHnumber" id="achnumber" placeholder="" 
                                                            onChange={(e) => setACHNumber(e.target.value)} />
                                                            <label htmlFor="achnumber" className={ACHnumber !="" ? "input-has-value" : ""}>ACH number</label>
                                                            <p className="form-input-error" >{ACHnumberError}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="routingNumber" id="rtnumber" placeholder="" 
                                                            onChange={(e) => setRoutingNumber(e.target.value)} />
                                                            <label htmlFor="rtnumber" className={routingNumber !="" ? "input-has-value" : ""}>Routing number</label>
                                                            <p className="form-input-error" >{routingNumberError}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="bankAddress" id="baddress" placeholder="" 
                                                            onChange={(e) => setBankAddress(e.target.value)} />
                                                            <label htmlFor="baddress" className={bankAddress !="" ? "input-has-value" : ""}>Bank address</label>
                                                            <p className="form-input-error" >{bankAddressError}</p>
                                                        </div>
                                                    </div>
                                                    <StateAndCity 
                                                        setStateValue = { getStateName } 
                                                        setCityValue ={ getCityName }
                                                        setZipcodeValue ={ getZipCodeId }
                                                    />
                                                    <div className="col-sm-12 form-group">
                                                    <p className="form-input-error"> {stateAndCityError}</p>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="accountHolderAddress" id="ahaddress" placeholder="" 
                                                            onChange={(e) => setAccountHolderAddress(e.target.value)} />
                                                            <label htmlFor="ahaddress" className={accountHolderAddress !="" ? "input-has-value" : ""}>Account Holder Address</label>
                                                            <p className="form-input-error" >{accountHolderAddressError}</p>
                                                        </div>
                                                    </div>

                                                    <StateAndCity 
                                                        setStateValue = { getAccStateName } 
                                                        setCityValue ={ getAccCityName }
                                                        setZipcodeValue ={ getAccZipCodeId }
                                                    />
                                                    <div className="col-sm-12 form-group">
                                                    <p className="form-input-error"> {accStateAndCityError}</p>
                                                    </div>

                                                    <div className="col-sm-6 form-group">
                                                        Signed bank Authorization letter for bank to release information.
                                                    </div>
                                                    <div className="col-sm-6 form-group uploadbtn">
                                                    <div className="upload-btn-wrapper">
                                                        <button className="btn"><i className="icofont-upload-alt"></i> Upload Document</button>
                                                        <FileBase64 multiple={ true } onDone={ getFiles } hidden type="hidden"/>
                                                    </div>
                                                    <span className="uploadedFile">{doc.length>0?doc[0].name:doc.name}</span>
                                                    {/* <p className="form-input-error" >{docError}</p> */}
                                                    {/* {type==="0"?<p className="form-input-error">Upload only Image Format </p>:""}  */}
                                                    {type==="1"?<p className="form-input-error">File Upload Mandatory </p>:type==="2"?<p className="form-input-error">Only TXT,DOC,PDF,JPG,PNG,JPEG file formats can be uploaded</p>:""} 
                                                    </div>
                                                   
                                                    <div className="col-lg-12 loginBtn">
                                                        <button className="cta-btn">Submit</button>
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

export default Payment;