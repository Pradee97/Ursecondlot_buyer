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

const BuyNow=(props)=>{

    const history = useHistory();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [id,setId] = useState(props.setBuyItNowValue.carId);
    const [carBuyItNow,setCarBuyItNow] = useState(props.setBuyItNowValue.buyItNow);
    const [carMake,setCarMake] = useState(props.setBuyItNowValue.make);
    const [carModel,setCarModel] = useState(props.setBuyItNowValue.model);
    const [carImage,setCarImage] = useState(props.setBuyItNowValue.image);
    const [carYear,setCarYear] = useState(props.setBuyItNowValue.year);
    console.log("check the carMake in the buy it now page",carModel)
    // const { id } = useParams();
    const userDetails=ls.get('userDetails');
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
    console.log("check high bid in the buy it now page",props.highBid)
    console.log("check the car id in the buy it now page",props.carId)

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

    const [carTransportationCharge,setCarTransportationCharge] = useState(props.setBuyItNowValue.transportationCharge);
    const [feeDetails, setFeeDetails] = useState("");


    const [toggleAcceptPopupOpen,setToggleAcceptPopupOpen]= useState(true);
    const [confirmationFlag, setConfirmationFlag] = useState(false);
    const email = JSON.parse(localStorage.getItem("userDetails")).email;
    const toggleCommonPopup = () => {
      setIsCommonPopupOpen(!isCommonPopupOpen);
    }

const handleBuyItNow=()=>{

//   setUsernameError("")
//   setPasswordError("")

//   if(userName ){
//     setUsernameError("Email is required")
//     return;
//   }
//   else if(userName && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(userName)){
//     setUsernameError("Must match the email format")
// return;
//   }
//   if(!password){
//     setPasswordError("Password is required")
//     return;
//   }
//   else if(password && !new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/).test(password)){
//     setPasswordError("Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character")
//     return;
// }

if(!confirmationFlag){

    setConfirmationFlag(true)
    return
  } 
		let request ={
        
            buyer_dealer_id:JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            buyer_id:JSON.parse(localStorage.getItem("userDetails")).buyer_id, 
            // email:JSON.parse(localStorage.getItem("userDetails")).email,
            // password:password,
            car_id: id,
            price: carBuyItNow,
            status: "sold",
            active: 1,
            buying_proccess:"buyer",
            updatedBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
            createdBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
           
		}
    // return
	console.log("Save Search Request : ",request);
		API.post("carbuy/add", request).then(response=>{
	
		console.log("saveeeeee",response)
   
    if (response.data.success) {
      console.log("registration response=>", response)
      setToggleAcceptPopupOpen(false);
       setAlertImg(checkImg);
       setAlertTitle("Thank you")
       setAlertMessage("You have successfully done this deal thank you for your business with Urs second lot")
    
  } else {
      const { data } = response;
      setToggleAcceptPopupOpen(false);
      setAlertImg(errorImg);
      setAlertMessage(data.error.err)
      
  }
		
	
    })
}


async function fetchBuyerFees() {
  let request = {
    type: "Buyer"
  };
  const state = API.post('fees/condition', request);
  
  state.then(res => {
    console.log("check the fee in the checkout page", res)
    console.log("res", res)
    setFeeDetails(res.data.data);
    
  })
    .catch(err => { console.log(err); });
  }
  useEffect(() => {
  fetchBuyerFees();
  }, []);
  
  const getFeeDetails = (maxPrice) =>{
   console.log("----fee---",maxPrice)

  return feeDetails.length > 0 ? feeDetails
    .filter((data)=> 
     
    {
      const range = data.fee_price.replaceAll('$',"").split("-")
       
      if(range[1]!=="up"){
         
        return Number(range[0]) <= Number(maxPrice) && Number(maxPrice)  <= Number(range[1]) 
      }
      else{
        return Number(range[0]) <= Number(maxPrice) 
      }
  
      } 
      )[0]?.fee || 0
    : 0


  }

  

//   const overAllTotal = () => {
//     console.log("paymentCar----",paymentCar)
//       return paymentCar?.length>0 && paymentCar
//       .reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number( curr.transportation_charge || 0) + Number(getFeeDetails(curr.price))),0)
  
// }
  return (
 

    <div id="" className="saveSearchBlock acceptConfirmation buynowPopup">
      
            <div className="termspageblock">
                <div className="row content">
                  {toggleAcceptPopupOpen?
                      //   (<div className="modalcontent">
                      //    {!confirmationFlag ? 
                      //       <div className="modalbody">
                      //         <h2 className="title"> Buy Now </h2>
                      //         <div>
                      //         <div class="input-group col-md-12">
                                
                      //                 <p className="text-center">Are you sure wants to buy the car then please confirm the password</p>
                                   
                      //         </div>
                      //         <div class=" col-md-12">
                      //         <input className="textbox " type="text" placeholder="Email" defaultValue = {email} disabled />
                      //         <p className="form-input-error">{userNameError}</p>
                      //         </div>
								              
 
                      //         <div class=" col-md-12">
                      //         <input className="textbox " type="text" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                      //         <p className="form-input-error">{passwordError}</p>
                      //         </div>
								                	
                      //         <div class="col-md-12 btns">
                      //         <button className="cta-btns" onClick={props.toggle}>Cancel</button>    <button  className="cta-btns" onClick={handleBuyItNow}>Buy Now</button>    
                      //         </div>  
                      //       </div>
                      //       </div>:
                      //       <div>
                      //           <div class="col-md-12 text-center">
                      //           {/* <i class="icofont-car"></i> */}
                      //           <p className="text-center"> Are you sure want to buy this Unit <b>  </b> </p>
                      //           </div>
                      //           <div class="popImage">
                      //             <img  src={carImage} alt="no image" /> <br></br>
                      //             <a href="#">{carMake}  ({carModel} - {carYear} model)</a>
                      //           </div> 
                                
                      //           <div class="col-md-12 btns">
                      //             <button className="cta-btns" onClick={()=>{setConfirmationFlag(false); props.toggle()}}>Cancel</button>    
                      //             <button  className="cta-btns" onClick={handleBuyItNow} >Confirm</button>    
                      //           </div>
                      //         </div>
                      //         }
                      //  </div>):


      ( <div class="checkoutblock col-lg-12">

        <div class="section-title mt-0 pt-3 mb-0 revCheHeadBlock">
          <h2>Buy Now</h2>
		  <div className="revCheHead">
				<h3 className="pl-4"> Are You Want to Buy this Unit</h3>
			
				{/* <h2 className="text-right">Total <span> $ {overAllTotal()}</span></h2> */}

				</div>
        </div>

        <div class="row content contentBlock">
			<div class="col-lg-12 col-md-12 marAuto achBlock">

			
				
				<div>
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							<img src={carImage} className="carImg" />
						</div>
						<div class="vehicleimgright col-lg-8 pr-0">
							<h3>{carYear} {carMake}  {carModel} <span>$ {Number(carBuyItNow)}</span></h3>
							<h4>Buy Fee <span>$ {Number(getFeeDetails(carBuyItNow))}</span></h4>
							<h4>Other Charges <span>$ 0</span></h4>
                            <h4>Miscellaneous Charges <span>$ 0</span></h4>
							{/* <h4>Transportation <span>${Cartransportation_charge}</span></h4> */}
							<h4>Transportation Charges <span>$ { carTransportationCharge || 0}</span></h4>


							<div class="vehiclerighttotal">
								{/* <h3>Total amount <span>$ {Number(paymentCar.price)+ Number(getFeeDetails(paymentCar.price)) + Number(300 || 0)}</span></h3> */}
								<h3>Total amount <span>$ {Number(carBuyItNow)+Number(getFeeDetails(carBuyItNow)) + Number(carTransportationCharge|| 0)+0+0}</span></h3>
							</div>
						</div>
					</div>
				</div>				
				
				</div>
				<div class="text-center ckreview"><a  class="cta-btn cancel-btn" onClick={()=>{setConfirmationFlag(false); props.toggle()}}>Cancel</a> <button type="submit" class="cta-btn"   onClick={handleBuyItNow}>Confirm </button> </div>
				
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
              {/* {isCommonPopupOpen && <CommonPopup
				handleClose={isCommonPopupOpen}
				popupTitle={popupTitle}
				popupMsg={popupMsg}
				popupType={popupType}
				popupActionType={popupActionType}
				popupActionValue={popupActionValue}
				popupActionPath={popupActionPath}
			/>} */}
     
      </div>

      
    )
    }

    export default BuyNow;