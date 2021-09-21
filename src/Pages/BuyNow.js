import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from "../Services/BaseService";
import { useHistory, useLocation, useParams } from "react-router-dom";
import CommonPopup from '../Component/CommonPopup/CommonPopup';

const BuyNow=(props)=>{

  
  const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const { id } = useParams();
  
  const [isCommonPopupOpen, setIsCommonPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupActionType, setPopupActionType] = useState("");
  const [popupActionValue, setPopupActionValue] = useState("");
  const [popupActionPath, setPopupActionPath] = useState("")
  const email = JSON.parse(localStorage.getItem("userDetails")).email;
  const toggleCommonPopup = () => {
    setIsCommonPopupOpen(!isCommonPopupOpen);
}
const handleAccepts=()=>{
    


		let request ={

            buyer_dealer_id:JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id, 
            car_id:id, 
            email:userName,
            password:password,
            high_bid:"1400",
            updatedBy:JSON.parse(loggedInBuyerId).buyer_id ,
            createdBy:JSON.parse(loggedInBuyerId).buyer_id 
            
		}
	
		API.post("carbuy/update", request).then(response=>{
	
		
        if (response.data.success) {
            const { data } = response;
            toggleCommonPopup()
            setPopupTitle("Buyed Successfully");
            setPopupMsg("Thank you so much for your business, We thank you to let us earn your business.");
            setPopupType("success");
            setPopupActionType("close");
            setPopupActionValue("ok");
            
        } else {
            const { data } = response;
            toggleCommonPopup()
            setPopupTitle("Error");
            setPopupMsg(data.error.err);
            setPopupType("error");
            setPopupActionType("close");
            setPopupActionValue("close");
        }
    })
}


  return (
 
<div>
    <div id="" className="saveSearchBlock">
      
            <div className="termspageblock">
                <div className="row content">
                        <div className="modalcontent">
                        
                            <div className="modalbody">
                              <h2 className="title"> Buy Now </h2>
                              <div class="input-group col-md-12">
                                  
                                  
                              </div>
                              <div class="input-group col-md-12">
                              <input className="textbox " type="text" placeholder="Email" value = {email} disabled />
                              </div>
                              <div class="input-group col-md-12">
                              <input className="textbox " type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                              </div>
                              <div class="input-group col-md-12 btns">
                              <button className="cta-btns" onClick={props.toggle}>Cancel</button>    <button  className="cta-btns" onClick={handleAccepts}>Accept</button>    
                              </div>     
                            </div>
                       </div>
                   </div>
              </div>
      </div>

      {isCommonPopupOpen && <CommonPopup
				handleClose={isCommonPopupOpen}
				popupTitle={popupTitle}
				popupMsg={popupMsg}
				popupType={popupType}
				popupActionType={popupActionType}
				popupActionValue={popupActionValue}
				popupActionPath={popupActionPath}
			/>}
      </div>
    )
    }

    export default BuyNow;