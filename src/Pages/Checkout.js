import React , {  useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from "../Services/BaseService";
import vehicles from '../assets/img/vehicles.jpg';
import CommonPopup from '../Component/CommonPopup/CommonPopup';

const History = (props) => {

	const history = useHistory();
	const [paymentCar,setPaymentCar] = useState(props.paymentCarList);

	const [isOpen, setIsOpen] = useState(false);

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
			const { data } = res;
			togglePopup()
			setPopupTitle("");
			setPopupMsg("Thank you for your business with Ur Second Lot");
			setPopupType("success");
			setPopupActionType("redirect");
			setPopupActionValue("ok");
			setPopupActionPath("/cart")

		} else {
			togglePopup()
			setPopupTitle("");
			// setPopupMsg("Address is not Created, Please try Again");
			setPopupMsg( res.data.error.err );
			setPopupType("error");
			setPopupActionType("close");
			setPopupActionValue("close");
		}
		// props.toggle()
	});
		
	}

    return (

        <main id="main" class="inner-page">
   

    <div id="checkoutpage" class="checkoutpage checkoutReview">
     
	  <div class="checkoutblock col-lg-12">

        <div class="section-title">
          <h2>Checkout</h2>
        </div>

        <div class="row content">
			<div class="col-lg-12 col-md-12 marAuto achBlock">
				<h2>ACH Payment</h2>
				{paymentCar.length>0?paymentCar.map((paymentCar) =>
				<div>
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							<img src={paymentCar.image} />
						</div>
						<div class="vehicleimgright col-lg-8">
							<h3>{paymentCar.make} ({paymentCar.model} model)+Lot Fee <span>$ {paymentCar.price}</span></h3>
							<h4>Lorem Ipsum Is Simply Dummy Text Of The And Typesetting Industry. <span>$100</span></h4>
							<h4>Transportation <span>${paymentCar.transportation_charge}</span></h4>
						</div>
					</div>
				</div>				
				
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							
						</div>
						<div class="vehicleimgright col-lg-8">
							<div class="vehiclerighttotal">
								<h3>Total amount <span>$ {Number(paymentCar.price)+100+Number(paymentCar.transportation_charge)}</span></h3>
							</div>
						</div>
					</div>
				</div>
				</div>):""}
				<div class="text-center ckreview"><a  class="cta-btn cancel-btn" href="/cart">Cancel</a> <button type="submit" class="cta-btn"  onClick = {()=> billofsales()}>Checkout</button> </div>
				
			</div>
        </div>
	
      </div>
    </div>

	{/* {isOpen &&
		<CommonPopup 
			handleClose= {togglePopup}
			popupTitle= {popupTitle}
			popupMsg= {popupMsg}
			popupType= {popupType}
			popupActionType= {popupActionType}
			popupActionValue= {popupActionValue}
			popupActionPath={popupActionPath}
	/>} */}
	
  </main>
        
    )
}
export default History;