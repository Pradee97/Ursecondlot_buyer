import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { useForm } from "react-hook-form";

const EditPayment = () => {

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
    const [payment, setPayment] = useState("");
    const { id } = useParams();
    const { payment_info_id } = useParams();
    const [paymentObjc, setPaymentObj] = useState("");
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
    let userDetails = ls.get('userDetails');
    const [doc,setDoc]=useState("");

    async function fetchpaymentDetails() {
         let request = {
             payment_info_id:id
         };
        const state = API.post(`payment/condition`,request);
        state.then(res => {
            console.log("res", res.data.data)
            setDealershipName(res.data.data.dealership_name);
            setAccountHolderName(res.data.data.acc_name);
            setBankName(res.data.data.bank_name);
            setAccountNumber(res.data.data.acc_no);
            setACHNumber(res.data.data.ach_no);
            setRoutingNumber(res.data.data.routing_no);
            setBankAddress(res.data.data.bank_address);
            setAccountHolderAddress(res.data.data.acc_address);
            setPaymentObj(res.data.data);
           
        })
            .catch(err => { console.log(err); });
    }

    const onFileChange = (event) => {
        setDoc(event.target.files[0])      
      };

    const updatepaymentinfo = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            dealership_name: dealershipName,
            acc_name: accountHolderName,      
            bank_name: bankName,
            acc_no: accountNumber,
            ach_no: ACHnumber,
            routing_no: routingNumber,
            bank_address: bankAddress,
            // state_id: stateName,
            // city_id: cityName,
            // zipcode: zipCodeId,
            city_id: typeof cityName==='string'?paymentObjc.city_id:cityName,
            state_id: typeof stateName==='string'?paymentObjc.state_id:stateName,
            zipcode: zipCodeId===paymentObjc.zipcode?paymentObjc.zipcode_id:zipCodeId,
            acc_address: accountHolderAddress,
            acc_city_id: typeof accountCityName==='string'?paymentObjc.city_id:accountCityName,
            acc_state_id: typeof accountStateName==='string'?paymentObjc.state_id:accountStateName,
            acc_zipcode: accountZipcodeId===paymentObjc.zipcode?paymentObjc.zipcode_id:accountZipcodeId,
            // acc_state_id: accountStateName,
            // acc_city_id: accountCityName,
            // acc_zipcode: accountZipcodeId,
            active:1
        };
        API.put("payment_info/edit"+payment_info_id, request)
        .then((response) => {
            if (response.data.success) {
                const { data } = response;
                console.log("response", response)
                togglePopup()
                setPopupTitle("Edit Payment");
                setPopupMsg("Payment is Updated Successfully");
                setPopupType("success");
                setPopupActionType("redirect");
                setPopupActionValue("ok");
                setPopupActionPath("/paymentinfo")
            } else {
                togglePopup()
                setPopupTitle("Edit Payment");
                setPopupMsg("Payment is not Updated, Please try Again");
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
	useEffect(() => {
        fetchpaymentDetails()
        
        // fetchState();
    }, []);

    return (
        <div>

            <main id="main" className="inner-page">


                <div id="paymentaccount" className="paymentaccount">
                    <div className="container" >
                        <div className="paymentaccountblock col-lg-12">
                            <div className="section-title">
                                <h2>Payment Summary</h2>
                            </div>
                            <div className="row content">
                                <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                                   
                                    <ManageAccountLinks />
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock">
                                    <div className="paymentdetailblock">
                                    <p>Thank you for providing us the information of your bank system. We going to use this for make charegs to your account when you purchase a car.To assure easy transaction for your business</p>
                                

                                        <div className="paymentform col-lg-12">
                                            <form className="backaccountform editpaymentform" onSubmit={updatepaymentinfo} >
                                                <h2 className="title"> Bank account information Edit</h2>
                                                <div className="row">

                                                    <div className="col-sm-12 form-group topforms">
                                                        <div className="tbox">
                                                        <label>Dealership name</label>
                                                            <input type="text"  defaultValue={paymentObjc.dealership_name} className="form-control " placeholder="" required onChange={(e) => setDealershipName(e.target.value)} />
                                                        </div>
                                                     </div>
                                                    <div className="col-sm-12 form-group">
                                                        <div className="tbox">
                                                        <label>Account Holder Name</label>
                                                    <input type="text"  defaultValue={paymentObjc.acc_name} className="form-control" placeholder="" required onChange={(e) => setAccountHolderName(e.target.value)} />
                                                    </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                    <div className="tbox">
                                                        <label>Bank name</label>
                                                    <input type="text"  defaultValue={paymentObjc.bank_name} className="form-control" placeholder="" required onChange={(e) => setBankName(e.target.value)} />
                                                    </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                    <div className="tbox">
                                                        <label>Account number</label>
                                                    <input type="text"  defaultValue={paymentObjc.acc_no} className="form-control" placeholder="" required onChange={(e) => setAccountNumber(e.target.value)} />
                                                    </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                    <div className="tbox">
                                                        <label>ACH number</label>
                                                    <input type="text"  defaultValue={paymentObjc.ach_no} className="form-control" placeholder="" required onChange={(e) => setACHNumber(e.target.value)} />
                                                    </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                    <div className="tbox">
                                                        <label>Routing Number</label>
                                                    <input type="text"  defaultValue={paymentObjc.routing_no} className="form-control" placeholder="" required onChange={(e) => setRoutingNumber(e.target.value)} />
                                                    </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                    <div className="tbox">
                                                        <label>Bank Address</label>
                                                    <input type="text"  defaultValue={paymentObjc.bank_address} className="form-control" placeholder="" required onChange={(e) => setBankAddress(e.target.value)} />
                                                    </div>
                                                    </div>
                                                    <div className="col-sm-4 form-group">
                                                        <div className="tbox">
                                                            <select id="state" className="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select>
                                                            {/* <input type="text"  defaultValue={paymentObjc.state_id} className="form-control" placeholder="State" required onChange={(e) => setStateName(e.target.value)} /> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4 form-group">
                                                        <div className="tbox">
                                                            <select id="city" className="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select>
                                                            {/* <input type="text"  defaultValue={paymentObjc.city_id} className="form-control" placeholder="City" required onChange={(e) => setCityName(e.target.value)} /> */}
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-4 form-group">
                                                        <div className="tbox">
                                                            <select id="zipcode" className="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select>
                                                            {/* <input type="text"  defaultValue={paymentObjc.zipcode} className="form-control" placeholder="Zipcode" required onChange={(e) => setZipcodeId(e.target.value)} /> */}
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 form-group">
                                                    <div className="tbox">
                                                        <label>Account Holder Address</label>
                                                    <input type="text"  defaultValue={paymentObjc.acc_address} className="form-control" placeholder="" required onChange={(e) => setAccountHolderAddress(e.target.value)} />
                                                    </div>
                                                    </div>

                                                    <div className="col-sm-4 form-group">
                                                        <div className="tbox">
                                                            <select id="state" className="form-control custom-select browser-default">
                                                                <option value="US">State</option>
                                                            </select>
                                                            {/* <input type="text"  defaultValue={paymentObjc.acc_state_id} className="form-control" placeholder="State" required onChange={(e) => setAccountStateName(e.target.value)} /> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4 form-group">
                                                        <div className="tbox">
                                                            <select id="city" className="form-control custom-select browser-default">
                                                                <option value="USA">City</option>
                                                            </select>
                                                            {/* <input type="text"  defaultValue={paymentObjc.acc_city_id} className="form-control" placeholder="City" required onChange={(e) => setAccountCityName(e.target.value)} /> */}
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-4 form-group">
                                                        <div className="tbox">
                                                            <select id="zipcode" className="form-control custom-select browser-default">
                                                                <option value="USA">Zipcode</option>
                                                            </select>
                                                            <input type="text"  defaultValue={paymentObjc.acc_zipcode} className="form-control" placeholder="Zipcode" required onChange={(e) => setAccountZipcodeId(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6 form-group">
                                                        <p>Signed bank Authorization letter for bank to release information. </p>
                                                    </div>



                                                    <div className="col-sm-6 form-group uploadbutton">
                                                    <input type="file" id="upload" className="uploadbox" hidden onChange={onFileChange} />
                                                            <label for="upload"><img src={process.env.PUBLIC_URL +"/images/upload.png"} />Upload Document</label>
                                                    </div>
                                                    <div className="col-lg-12 loginBtn">
                                                        <button className="cta-btn">Update</button>
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
                                    <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
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

export default EditPayment;