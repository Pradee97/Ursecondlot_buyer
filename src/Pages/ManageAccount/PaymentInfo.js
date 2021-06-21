import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../assets/css/responsive.css';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import {  Button  } from 'antd';
import FileBase64 from 'react-file-base64';


const PaymentInfo = () => {
    const history = useHistory();
    const [paymentinfo, setPaymentInfo] = useState("");
    const [doc, setDoc] = useState("");
    const [image,setImage] = useState("");

    const getFiles = (file) => {
      console.log("======>",file)
      setDoc(file);
  }
    let userDetails = ls.get('userDetails');
    async function getPaymentInfo() {
        let request = {
            // buyer_id: userDetails.user_id,
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
            image:doc===""?doc:doc.length>0?doc:[doc]

        };
        const state = API.post('payment_info/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setPaymentInfo(res.data.data);
            setImage(res.data.data[0].image);

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
                                        <div className="col-sm-12 form-group">
                                                <div class="user-upload-btn-wrapper">
                                                    {image==="" && doc===""?<img alt="" src={process.env.PUBLIC_URL + "/images/adduser.jpg"} />:                                    
                                                    doc===""?<img alt=""  src={image} />:
                                                    <img alt=""  src={doc.base64} />}  
                                                    <span class="proCamera"></span>                                  
                                                    <FileBase64 onDone={getFiles} type="hidden" />
                                                    
                                                </div>
                                                </div>
                                            {/* <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} className="img-fluid" alt="..."/> */}
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
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock ">
                                    <div className="paymentdetailblock">
                                    <p>Thank you for providing us the information of your bank system. We going to use this for make charegs to your account when you purchase a car.To assure easy transaction for your business</p>
                                        <div className="add-floors">
                                           
                                                <div className="add-accounts">
                                                <Button className="add-account-btns" onClick={() => history.push("/payment")}><i class="icofont-plus"></i> Add Bank Account</Button>
                                            {/*<a className="add-account-btns" href="/payment"><i class="icofont-plus"></i> Add Bank Account</a> */}
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
                                                            <td><span>Signer on account</span></td>
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
                                                                    <label for="downupload"><img src={process.env.PUBLIC_URL +"/images/download.png"} />Documents</label></a>
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