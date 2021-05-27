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

const Payment = () => {
    const history = useHistory();
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

    const paymenthandleSubmit= (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
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
            doc_name:doc,
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
                    setPopupMsg(error," Please try Again");
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
                                    <div className="mgaccountuser">
                                        <div className="mgaccountuserleft">
                                            <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} className="img-fluid" alt="..." />
                                        </div>
                                        <div className="mgaccountuserright">
                                            <h3>Fernand</h3>
                                            <div className="d-flex align-items-center">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} className="img-fluid" alt="..." /><span>California, Cl</span></p>
                                            </div>

                                        </div>
                                    </div>
                                    <ManageAccountLinks />
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock">
                                    <div className="paymentdetailblock">
                                        <p>Thank you for providing us the information of your bank system. We going to use this for make charegs to your account when you purchase a car.To assure easy transaction for your business</p>


                                        <div className="paymentform card col-lg-12">
                                            <form className="backaccountform addpaymentform" onSubmit={paymenthandleSubmit}>
                                                <h2 className="title"> Bank account information</h2>
                                                <div className="row">


                                                    <div className="col-sm-12 form-group topforms">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="dname" id="name-d" placeholder="" required  onChange={(e) => setDealershipName(e.target.value)} />
                                                            <label for="name-d" className={dealershipName !="" ? "input-has-value" : ""}>Dealership name</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="fname" id="name-f" placeholder="" required  onChange={(e) => setAccountHolderName(e.target.value)} />
                                                            <label for="name-f" className={accountHolderName !="" ? "input-has-value" : ""}>Signer on account"</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="lname" id="name-l" placeholder="" required  onChange={(e) => setBankName(e.target.value)} />
                                                            <label for="name-b" className={bankName !="" ? "input-has-value" : ""}>Bank name</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="anumber" id="anumber" placeholder="" required  onChange={(e) => setAccountNumber(e.target.value)} />
                                                            <label for="anumber" className={accountNumber !="" ? "input-has-value" : ""}>Account number</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="achnumber" id="achnumber" placeholder="" required  onChange={(e) => setACHNumber(e.target.value)} />
                                                            <label for="achnumber" className={ACHnumber !="" ? "input-has-value" : ""}>ACH number</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="rtnumber" id="rtnumber" placeholder="" required  onChange={(e) => setRoutingNumber(e.target.value)} />
                                                            <label for="rtnumber" className={routingNumber !="" ? "input-has-value" : ""}>Routing number</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="baddress" id="baddress" placeholder="" required  onChange={(e) => setBankAddress(e.target.value)} />
                                                            <label for="baddress" className={bankAddress !="" ? "input-has-value" : ""}>Bank address</label>
                                                        </div>
                                                    </div>
                                                    <StateAndCity 
                                                        setStateValue = { getStateName } 
                                                        setCityValue ={ getCityName }
                                                        setZipcodeValue ={ getZipCodeId }
                                                    />

                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                            <input type="text" className="textbox" name="ahaddress" id="ahaddress" placeholder="" required  onChange={(e) => setAccountHolderAddress(e.target.value)} />
                                                            <label for="ahaddress" className={accountHolderAddress !="" ? "input-has-value" : ""}>Account Holder Address</label>
                                                        </div>
                                                    </div>

                                                    <StateAndCity 
                                                        setStateValue = { getAccStateName } 
                                                        setCityValue ={ getAccCityName }
                                                        setZipcodeValue ={ getAccZipCodeId }
                                                    />

                                                   

                                                    <div className="col-sm-6 form-group">
                                                        <p>Signed bank Authorization letter for bank to release information. </p>
                                                    </div>
                                                    {/* <div className="col-sm-6 form-group uploadbutton">
                                                    <input type="file" id="upload" className="uploadbox" hidden onChange={onFileChange} /> 
                                                            <FileBase64 multiple={ true } onDone={ getFiles } hidden type="hidden"/>
                                                            <label for="upload upl"><img src={process.env.PUBLIC_URL +"/images/upload.png"} />Upload Document</label>                                                            <p><b>{doc.name}</b></p>
                                                    </div>*/}
                                                    <div className="col-sm-6 form-group uploadbtn">
                                                    <div class="upload-btn-wrapper">
                                                        <button class="btn"><img src={process.env.PUBLIC_URL +"/images/upload.png"} />Upload Document</button>
                                                        <FileBase64 multiple={ true } onDone={ getFiles } hidden type="hidden"/>
                                                    </div>
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