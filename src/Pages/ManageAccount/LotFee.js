import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';
import Popup from '../../Component/Popup/Popup';

import '../../Component/Popup/popup.css';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';


const LotFee = () => {
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

    const [lotfee, setLotfee] = useState("");
    const [lotValue,setLotValue] = useState({lot_fee:0});
    const [popupcontent,setPopupcontent] = useState ("");
    let userDetails = ls.get('userDetails');
    console.log("======12345====>",ls.get('userDetails'))

    async function getLotfee() {
        let request = {
            buyer_id: userDetails.user_id,
        };
        console.log("=======>",)
        const state = API.post('lot_fee/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setLotValue(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
	useEffect(() => {
        getLotfee();
        // fetchState();
    }, []);

        
        const handlesubimt = () => {
            
                //console.log("check",buyer_id)
                let request = {
                    buyer_id: userDetails.user_id,
                    lot_fee:lotfee,
                    active:1

                    
                  };
    
            API.post("lot_fee/add",request)
               .then((response) => {
                 console.log("res", response.data.success)
                if (response.data.success ) {
                    togglePopup()
                    setPopupTitle("Create LotFee");
                    setPopupMsg("LotFee Successfully Created");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/lotfee")
                 } else {
                    togglePopup()
                    setPopupTitle("Create LotFee");
                    setPopupMsg("LotFee is not Created, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                 }
               },
                 (error) => {
                    togglePopup()
                    setPopupTitle("Error");
                    setPopupMsg(error," Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                 });
        
           }

    return (
        <div>

<main id="main" className="inner-page">
   
   
   <div id="lotfee" className="lotfee">
       <div className="container">
           <div className="lotfeeblock col-lg-12">
               <div className="section-title">
                 <h2>Lot Fee</h2>
               </div>
               <div className="row content">
                   <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                       <div className="mgaccountuser">
                           <div className="mgaccountuserleft">
                               <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} className="img-fluid" alt="..."/>
                           </div>
                           <div className="mgaccountuserright">
                               <h3>Fernand</h3>
                               <div className="d-flex align-items-center">
                                   <p className="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} className="img-fluid" alt="..."/><span>California, Cl</span></p>
                               </div>
                                   
                           </div>
                       </div>
                       
                       <div className="mgaccountuserlinks">
                           <div className="userlinks">
                               <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
                               <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt=""/><a href="/notification">Notification</a></li>
                               <li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt=""/><a href="/paymentinfo">Payment</a></li>
                               <li className="active"><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
                               <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt=""/><a href="/document">Document</a></li>
                               <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt=""/><a href="adduser.html">Add User</a></li>
                           </div>
                       </div>
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 lotfeerightblock">
                       <div className="lotfee-inner">
                       <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
                           <div className="form-group col-lg-6 col-md-6 lotfee-form">
                               <div className="input-icon">
                                 <input type="text" className="form-control" defaultValue={lotValue===undefined?0:lotValue.lot_fee}  onChange={(e) => setLotfee(e.target.value)}/> 
                                   <i>$</i>
                               </div>
                           </div>
                           <div className="col-lg-12 loginBtn">
                               <button className="cta-btn" onClick={handlesubimt}>Submit</button>
                               {/* conclick={handlesubimt} */}
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


    )
}

export default LotFee;