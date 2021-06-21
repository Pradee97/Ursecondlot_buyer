import React from 'react';
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
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
        console.log("=====docdoc====>",doc)
        let request = {
            buyer_id: userDetails.user_id,
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
                    setPopupMsg("Payment is not Created, Please try Again");
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
    const getFiles=(file)=>{
        setDoc(file);
      }
    const getStateName=(stateData)=>{
        setStateName(stateData)
    }


    const getCityName=(cityData)=>{
        setCityName(cityData)
    }

    const getZipCodeId=(zipData)=>{
        setZipcodeId(zipData)
    }    
    const getAccStateName=(stateData)=>{
        setAccountStateName(stateData)
    }

    const getAccCityName=(cityData)=>{
        setAccountCityName(cityData)
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
                                                          {...register("dealershipName", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "This input must not exceed 50 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setDealershipName(e.target.value)} />
                                                            <label for="name-d" className={dealershipName !="" ? "input-has-value" : ""}>Dealership name</label>
                                                            <p className="form-input-error">{errors.dealershipName?.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="accountHolderName" id="name-f" placeholder="" 
                                                           {...register("accountHolderName", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "This input must not exceed 50 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setAccountHolderName(e.target.value)} />
                                                            <label for="name-f" className={accountHolderName !="" ? "input-has-value" : ""}>Signer on account"</label>
                                                            <p className="form-input-error">{errors.accountHolderName?.message}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="bankName" id="name-l" placeholder="" 
                                                          {...register("bankName", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "This input must not exceed 50 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setBankName(e.target.value)} />
                                                            <label for="name-b" className={bankName !="" ? "input-has-value" : ""}>Bank name</label>
                                                            <p className="form-input-error">{errors.bankName?.message}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="accountNumber" id="anumber" placeholder="" 
                                                           {...register("accountNumber", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "This input must not exceed 50 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setAccountNumber(e.target.value)} />
                                                            <label for="anumber" className={accountNumber !="" ? "input-has-value" : ""}>Account number</label>
                                                            <p className="form-input-error">{errors.accountNumber?.message}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="ACHnumber" id="achnumber" placeholder="" 
                                                          {...register("ACHnumber", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "This input must not exceed 50 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setACHNumber(e.target.value)} />
                                                            <label for="achnumber" className={ACHnumber !="" ? "input-has-value" : ""}>ACH number</label>
                                                            <p className="form-input-error">{errors.ACHnumber?.message}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="routingNumber" id="rtnumber" placeholder="" 
                                                          {...register("routingNumber", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 50,
                                                                message: "This input must not exceed 50 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setRoutingNumber(e.target.value)} />
                                                            <label for="rtnumber" className={routingNumber !="" ? "input-has-value" : ""}>Routing number</label>
                                                            <p className="form-input-error">{errors.routingNumber?.message}</p>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="bankAddress" id="baddress" placeholder="" 
                                                           {...register("bankAddress", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 150,
                                                                message: "This input must not exceed 150 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setBankAddress(e.target.value)} />
                                                            <label for="baddress" className={bankAddress !="" ? "input-has-value" : ""}>Bank address</label>
                                                            <p className="form-input-error">{errors.bankAddress?.message}</p>
                                                        </div>
                                                    </div>
                                                    <StateAndCity 
                                                        setStateValue = { getStateName } 
                                                        setCityValue ={ getCityName }
                                                        setZipcodeValue ={ getZipCodeId }
                                                    />

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="accountHolderAddress" id="ahaddress" placeholder="" 
                                                          {...register("accountHolderAddress", {
                                                            required: "This input is required.",
                                                            maxLength: {
                                                                value: 150,
                                                                message: "This input must not exceed 150 characters"
                                                              }
                                                          })}
                                                            onChange={(e) => setAccountHolderAddress(e.target.value)} />
                                                            <label for="ahaddress" className={accountHolderAddress !="" ? "input-has-value" : ""}>Account Holder Address</label>
                                                            <p className="form-input-error">{errors.accountHolderAddress?.message}</p>
                                                        </div>
                                                    </div>

                                                    <StateAndCity 
                                                        setStateValue = { getAccStateName } 
                                                        setCityValue ={ getAccCityName }
                                                        setZipcodeValue ={ getAccZipCodeId }
                                                    />

                                                   

                                                    <div className="col-sm-6 form-group">
                                                        Signed bank Authorization letter for bank to release information.
                                                    </div>
                                                    {/* <div className="col-sm-6 form-group uploadbutton">
                                                    <input type="file" id="upload" className="uploadbox" hidden onChange={onFileChange} /> 
                                                            <FileBase64 multiple={ true } onDone={ getFiles } hidden type="hidden"/>
                                                            <label for="upload upl"><img src={process.env.PUBLIC_URL +"/images/upload.png"} />Upload Document</label>                                                            <p><b>{doc.name}</b></p>
                                                    </div>*/}
                                                    <div className="col-sm-6 form-group uploadbtn">
                                                    <div class="upload-btn-wrapper">
                                                        <button class="btn"><i class="icofont-upload-alt"></i> Upload Document</button>
                                                        <FileBase64 multiple={ true } onDone={ getFiles } hidden type="hidden"/>
                                                    </div>
                                                    <span class="uploadedFile">{doc.length>0?doc[0].name:doc.name}</span>
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