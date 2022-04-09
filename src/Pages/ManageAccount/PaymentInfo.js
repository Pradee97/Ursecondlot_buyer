import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../assets/css/responsive.css';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import {  Button  } from 'antd';
import Loading from '../../Component/Loading/Loading';
import Popup from '../../Component/Popup/Popup';
import LateFee from '../../Pages/LateFee/LateFee';

const PaymentInfo = () => {

    const history = useHistory();
    const [paymentinfo, setPaymentInfo] = useState("");
    const [loading,setLoading] = useState(true);
    let userDetails = ls.get('userDetails');

    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  	}

    async function getPaymentInfo() {
        let request = {
            buyer_dealer_id: userDetails.buyer_dealer_id
        };
        const state = API.post('payment_info/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setPaymentInfo(res.data.data);
            setLoading(false);
        })
            .catch(err => { console.log(err); });
    }
    function onHandleEdit(e){
        history.push("/editpayment/"+e);
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
  
	useEffect(() => {
  
	  getlateFee();
      getPaymentInfo();

       // fetchState();
  
	}, []);

    return (
        <div>
{loading?<Loading/>:
            <main id="main" className="inner-page">


                <div id="paymentaccount" className="paymentaccount">
                    <div className="container" >
                        <div className="paymentaccountblock col-lg-12">
                            <div className="section-title">
                                <h2>Financials</h2>
                            </div>
                            <div className="row content">
                                <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                                  
                                    <ManageAccountLinks />
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 paymentrightblock ">
                                    <div className="paymentdetailblock">
                                    <p>Thank you for providing us the information of your bank system. We going to use this for make charegs to your account when you purchase a car.To assure easy transaction for your business</p>
                                        <div className="add-floors">
                                           
                                                <div className="add-accounts">
                                                <Button className="add-account-btns" onClick={() => history.push("/payment")}><i className="icofont-plus"></i> Add Bank Account</Button>
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
                                                                    <label htmlFor="downupload"><img src={process.env.PUBLIC_URL +"/images/download.png"} />Documents</label></a>
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

export default PaymentInfo;