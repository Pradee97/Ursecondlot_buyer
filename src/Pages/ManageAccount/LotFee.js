import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import API from "../../Services/BaseService";
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

    const [lotFee, setLotFee]= useState("")
    const [lotValue, setLotValue] = useState("");
    const [popupcontent,setPopupcontent] = useState ("");
    let userDetails = ls.get('userDetails');

    async function getLotfee() {
        let request = {
            buyer_id: userDetails.user_id,
        };
        const state = API.post('lot_fee/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setLotValue(res.data.data.lot_fee) ;
            setLotFee( res.data.data )
        })
            .catch(err => { console.log(err); });
    }
	useEffect(() => {
        getLotfee();
    },[]);
    // useEffect(() => {},[lotValue]);
    const updateLotValue = (data)=>{
        console.log("---------------",data)
        setLotValue(data)
    }
        
        const handlesubimt = () => {
                //console.log("check",buyer_id)
            let request = {
                buyer_id: userDetails.user_id,
                lot_fee: lotValue,
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
                    setPopupMsg( "Something went wrong, Please try Again");
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
                      
                       <ManageAccountLinks />
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 lotfeerightblock">
                       <div className="lotfee-inner">
                       <p>Your expense or your profit added to the vehicle every time you purchase </p>
                           <div className="form-group col-lg-6 col-md-6 lotfee-form">
                               <div className="input-icon">
                                 <input type="text" className="form-control" defaultValue={lotFee.lot_fee} onChange={(e) => updateLotValue(e.target.value)}/> 
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