import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../assets/css/responsive.css';
import {
    Button
} from 'antd';


const PaymentInfo = () => {
    const history = useHistory();
    const [paymentinfo, setPaymentInfo] = useState("");
    let userDetails = ls.get('userDetails');
    async function getPaymentInfo() {
        let request = {
            buyer_id: userDetails.user_id
        };
        const state = API.post('payment_info/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setPaymentInfo(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    function onHandleEdit(e){
        history.push("/editpayment/"+e);
      }
	useEffect(() => {
        getPaymentInfo()
        
        // fetchState();
    }, []);

    return (
        <div>

            <main id="main" className="inner-page">


                <div id="paymentaccount" className="paymentaccount">
                    <div className="container" >
                        <div className="paymentaccountblock col-lg-12">
                            <div className="section-title">
                                <h2>Financials</h2>
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

                                    <div className="mgaccountuserlinks">
                                        <div className="userlinks">
                                            <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt="" /><a href="/manageaccount">Account</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt="" /><a href="/notification">Notification</a></li>
                                            <li className="active"><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt="" /><a href="/paymentinfo">Payment</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt="" /><a href="/lotfee">Lot Fee</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt="" /><a href="/document">Document</a></li>
                                            <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt="" /><a href="adduser.html">Add User</a></li>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock ">
                                    <div className="paymentdetailblock">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                                        <div className="add-floors">
                                            <div className="row">
                                                <div className="add-accounts">
                                                    <a className="add-account-btns" href="/payment"><img src={process.env.PUBLIC_URL +"/images/addbtn.jpg"} />Add Bank Account</a>
                                                </div>
                                            </div>
                                        </div>
                                        {paymentinfo.length>0?paymentinfo.map((item,index) =>
                                        <div className="col-lg-12 col-md-12 col-sm-12 mt-2 pt-4 bankinfo paymentinfoblocks">
                                            <div className="bankinfos">
                                                <h4>Bank Account Information</h4>
                                                <div className="bankinfotable">
                                                {/* <Button onClick={() => onHandleEdit(item.payment_info_id)}>Edit</Button> */}
                                                    <table>
                                                        <tr>
                                                            <td><span>Dealership Name</span></td>
                                                            <td>{item.dealership_name}</td>
                                                            <td><span>ACH Number</span></td>
                                                            <td>{item.ach_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Account holder name</span></td>
                                                            <td>{item.acc_name}</td>
                                                            <td><span>Routing Number</span></td>
                                                            <td>{item.routing_no}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Bank Name</span></td>
                                                            <td>{item.bank_name}</td>
                                                            <td><span>Bank Address</span></td>
                                                            <td>{item.bank_address}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><span>Account Number</span></td>
                                                            <td>{item.acc_no}</td>
                                                            <td><span>Account Holder Address</span></td>
                                                            <td>{item.acc_address}</td>
                                                        </tr>
                                                    </table>

                                                    <div className="releaseinfo">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <p>Signed bank Authorization letter for bank to release information. </p>
                                                            <div className="uploadbutton">                                                              
                                                            <a href={item.doc_name}>
                                                                    <label for="downupload"><img src={process.env.PUBLIC_URL +"/images/download.png"} />Document</label></a>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)  :""}
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

                </div>



            </main>

        </div>


    );
};

export default PaymentInfo;