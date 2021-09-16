import React , {  useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from "../Services/BaseService";
import vehicles from '../assets/img/vehicles.jpg';
import CommonPopup from '../Component/CommonPopup/CommonPopup';
import checkImg from '../../src/assets/img/check.svg';
import errorImg from '../../src/assets/img/erroricon.png';

const History = (props) => {

	const history = useHistory();
	const [paymentCar,setPaymentCar] = useState(props.paymentCarList);
	const [feeDetails, setFeeDetails] = useState("");

	const [isOpen, setIsOpen] = useState(false);
	const [alertmessage,setAlertMessage] = useState("");
    const [alertimg,setAlertImg] = useState("");
	const [toggleCheckoutPopupOpen,setToggleCheckoutPopupOpen]= useState(true);
	const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")

	console.log("check the props value",paymentCar)

	const togglePopup = () => {
        setIsOpen(!isOpen);
    }

	const billofsales =() => {
		
		API.post('billofsales/add', props.paymentCarList).then(res=>{

		console.log("hi checke the redirect",res.data.data)

		if (res.data.success) {
			setToggleCheckoutPopupOpen(false);
			setAlertImg(checkImg);
			setAlertMessage("Thank you for your Business with Ur Second lot")
			// props.getMakeBitValue(carHighBid)
			
		} else {
			const { data } = res;
			setToggleCheckoutPopupOpen(false);
			setAlertImg(errorImg);
			setAlertMessage( data.error.err )

		}

		// props.toggle()
	});
		
	}

	const redirect = () => {

        history.push("/cart");  
        // props.toggle()
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

    return (

       
 

   <div id="checkoutpage" class="checkoutpage checkoutReview">
	     {toggleCheckoutPopupOpen?
	
	 ( <div class="checkoutblock col-lg-12">

        <div class="section-title mt-3 mb-0">
          <h2>Checkout</h2>
        </div>

        <div class="row content">
			<div class="col-lg-12 col-md-12 marAuto achBlock">
				<h2 className="pl-4">ACH Payment</h2>
				{paymentCar.length>0?paymentCar.map((paymentCar) =>
				<div>
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							<img src={paymentCar.image} className="carImg" />
						</div>
						<div class="vehicleimgright col-lg-8">
							<h3>{paymentCar.make}  ({paymentCar.model} - {paymentCar.year}  model)+Lot Fee <span>$ {paymentCar.price}</span></h3>
							<h4>Buy Fee <span>$ {Number(getFeeDetails(paymentCar.price))}</span></h4>
							<h4>Transportation <span>${paymentCar.transportation_charge}</span></h4>

							<div class="vehiclerighttotal">
								<h3>Total amount <span>$ {Number(paymentCar.price)+ Number(getFeeDetails(paymentCar.price)) + Number(paymentCar.transportation_charge)}</span></h3>
							</div>
						</div>
					</div>
				</div>				
				
				</div>):""}
				<div class="text-center ckreview"><a  class="cta-btn cancel-btn" href="/cart">Cancel</a> <button type="submit" class="cta-btn"  onClick = {()=> billofsales()}>Checkout</button> </div>
				
			</div>
        </div>
	
	  </div>
	  ):
	  (
		  <div className="popup-box">
			  <div id="" className="CommonModels-box">
			  <div className="Commonfullformblock col-lg-9">
			  <div className="CommonContainer">
			  <div className="CommonModalcontent">
	  {/* <img src={checkImg}></img>  */}
  <div className="Commonfull-icon">
  <img alt="" className={alertimg === checkImg ?  "successImg"  : "errorImg" } src={alertimg}></img>

	  </div>
  <div className="modalbody">
  <h2 className="title"> Thank You </h2>
  <div class="col-md-12">
	  
		  <p className="text-center">{alertmessage}</p>
		  
	  
	  <div class="col-md-12 btns">
		  <a className="cta-btns" href="/cart" >OK</a>      
	  </div> 
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>)}
				
    </div>

	// {/* {isOpen &&
	// 	<CommonPopup 
	// 		handleClose= {togglePopup}
	// 		popupTitle= {popupTitle}
	// 		popupMsg= {popupMsg}
	// 		popupType= {popupType}
	// 		popupActionType= {popupActionType}
	// 		popupActionValue= {popupActionValue}
	// 		popupActionPath={popupActionPath}
	// />} */}

        // 
    )
}
export default History;