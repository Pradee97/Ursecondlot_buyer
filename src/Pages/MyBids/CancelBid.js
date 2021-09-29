import React from 'react';
import { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import { useHistory, useLocation, useParams } from "react-router-dom";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import checkImg from '../../assets/img/check.svg';
import errorImg from '../../assets/img/erroricon.png';
import "../../Component/CommonPopup/commonPopup.css"

const CancelBid=(props)=>{

    const history = useHistory();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [carId,setCarId] = useState(props.setCancelBidValue.carId);
    console.log("check the car id in cancel bid", carId)
    const [carBuyItNow,setCarBuyItNow] = useState(props.setCancelBidValue.buyItNow);
    const [carMake,setCarMake] = useState(props.setCancelBidValue.make);
    const [carModel,setCarModel] = useState(props.setCancelBidValue.model);
    const [carImage,setCarImage] = useState(props.setCancelBidValue.image);
    const [carYear,setCarYear] = useState(props.setCancelBidValue.year);

    const userDetails=ls.get('userDetails');
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
  

    const [isCommonPopupOpen, setIsCommonPopupOpen] = useState(false);
	const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [userNameError,setUsernameError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [alertmessage,setAlertMessage] = useState("");
    const [alerttitle,setAlertTitle] = useState("");
    const [alertimg,setAlertImg] = useState("");


    const [toggleAcceptPopupOpen,setToggleAcceptPopupOpen]= useState(true);
    const [confirmationFlag, setConfirmationFlag] = useState(false);
  

    const cancelBid=()=>{



if(!confirmationFlag){

    setConfirmationFlag(true)
    return
  } 
        let request = {
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            car_id:carId
        };
        console.log("========>",request)
        API.post('cancelbid/update', request).then(response=>{

            console.log("check the response success in cancel confirm", response)
            if(response.data.success){
                const { data } = response; 
                console.log("response", response)
                setToggleAcceptPopupOpen(false);
                setAlertImg(checkImg);
                setAlertTitle("Cancel Bid")
                setAlertMessage("Your Bid has been Cancelled Successfully ")


            } 
            else {
                const { data } = response;
                setToggleAcceptPopupOpen(false);
                setAlertImg(errorImg);
                setAlertMessage()
            }
        })
}

  return (
 

    <div id="" className="saveSearchBlock acceptConfirmation buynowPopup">
      
            <div className="termspageblock">
                <div className="row content">
                  {toggleAcceptPopupOpen?
                      


      ( <div class="checkoutblock col-lg-12">

        <div class="section-title mt-0 pt-3 mb-0 revCheHeadBlock">
          <h2>Cancel Bid</h2>
		
        </div>

        

			<div>
                <div class="col-md-12 text-center">

                    <p className="text-center"> Are you sure want to Cancel Your Bid for this Car <b>  </b> </p>
                </div>
                <div class="popImage">
                        <img  src={carImage} alt="no image" /> <br></br>
                    <a href="#">{carMake}  ({carModel} - {carYear} model)</a>
                </div> 
                    
                <div class="col-md-12 btns">
                    <button className="cta-btns" onClick={()=>{setConfirmationFlag(false); props.toggle()}}>Cancel</button>    
                    <button  className="cta-btns" onClick={cancelBid} >Confirm</button>    
                </div>
                </div>

	        </div>
	  ):


                       (
                       <div className="modalcontent">
                        <div className="Commonfull-icon">
                       
                 		  <img alt="" className={alertimg === checkImg ?  "successImg " : "errorImg"} src={alertimg}></img>
                        
                        	</div>
                        <div className="modalbody">
                          <h2 className="title"> {alerttitle} </h2>
                          <div class="input-group col-md-12">
                             
                                  <p className="text-center">{alertmessage}</p>
                                
                              
                              <div class="col-md-12 btns">
                               <a className="cta-btns" href="/carlist">OK</a>      
                              </div> 
                          </div>
                        </div>
                       </div>)}
                       
                   </div>
              </div>
             
     
      </div>

      
    )
    }

    export default CancelBid;