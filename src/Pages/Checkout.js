import React , {  useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from "../Services/BaseService";
import vehicles from '../assets/img/vehicles.jpg';
import CommonPopup from '../Component/CommonPopup/CommonPopup';
import checkImg from '../../src/assets/img/check.svg';
import errorImg from '../../src/assets/img/erroricon.png';

const CheckOut = (props) => {

	const history = useHistory();
	const [paymentCar,setPaymentCar] = useState(props.paymentCarList);
	console.log("check the bill of sale request",props.paymentCarList)
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
	const [paymentMode,setPaymentMode] = useState(props.paymentMode);
	const [floorContact,setFloorContact] = useState(props.floorContact);
	const [floorAccount,setFloorAccount] = useState(props.floorAccount);
    const [creditLimit,setCreditLimit] = useState(props.creditLimit);
	const [buyerCreditLimit,setBuyerCreditLimit] = useState(props.buyerCreditLimit);

	console.log("check the floor contact in the checkout page",props.floorContact)

	console.log("check the props value",paymentCar.late_fee)

	const togglePopup = () => {
        setIsOpen(!isOpen);
    }

	const billofsales =() => {
		
		// console.log("check the request in checkout page",request)
		// return
		API.post('billofsales/add', props.paymentCarList).then(res=>{

		console.log("hi checke the redirect",res.data.data)

		if (res.data.success) {
			setToggleCheckoutPopupOpen(false);
			setAlertImg(checkImg);
			setAlertMessage("Good Luck with your product. We will contact your financial institutions to get approve between the working hours 9 to 5 central time.We will notify you by email and text about gate pass")
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

	  

	  const overAllTotal = () => {
		  console.log("paymentCar----",paymentCar)
        return paymentCar?.length>0 && paymentCar
        .reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number( curr.transportation_charge || 0) + Number(getFeeDetails(curr.price)) + Number(curr.late_fee)),0)
		
	}

    return (

       
 

   <div id="checkoutpage" class="checkoutpage checkoutReview">
	     {toggleCheckoutPopupOpen?
	
	 ( <div class="checkoutblock col-lg-12">

        <div class="section-title mt-0 pt-3 mb-0 revCheHeadBlock">
			<h2>Checkout</h2>
			<div className="revCheHead floorDetailsBlock">
				<div class="row">
					<div className="col-lg-9 floorDetails">
						
						<p className="text-left paymentMode"> <span class="label">Payment Mode - </span> {paymentMode}  </p>

						{floorContact && floorAccount!=null || floorContact && floorAccount!=""?
						<p className="ml-3"> <span class="label"> Bank Name - </span> {floorContact},  <span class="label">Account Number -</span> {floorAccount}, <span class="label">Credit Limit - </span>{creditLimit} </p>:""}
						
					</div>
					<div className="col-lg-3 cartTotal">
						<p className="text-right">Total <span> $ {overAllTotal()}</span></p>
					</div>
				</div>
			</div>
        </div>

        <div class="row content contentBlock">
			<div class="col-lg-12 col-md-12 marAuto achBlock">

			
				{paymentCar.length>0?paymentCar.map((paymentCar) =>

				<div>
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							<img src={paymentCar.image} className="carImg" />
						</div>
						<div class="vehicleimgright col-lg-8 pr-0">
							<h3>{paymentCar.year} {paymentCar.make}  {paymentCar.model}  <span>$ {Number(paymentCar.price)+Number(paymentCar.lot_fee)}</span></h3>
							<h4>Buy Fee <span>$ {Number(getFeeDetails(paymentCar.price))}</span></h4>
							<h4>Other Charges <span>$ 0</span></h4>
                            <h4>Miscellaneous Charges <span>$ 0</span></h4>
							{paymentCar.late_fee =="" || paymentCar.late_fee ==null ||  paymentCar.late_fee ==0 ? "":
                                    <h4>Late Fee <span>$ {Number(paymentCar.late_fee)}</span></h4>}
							{/* <h4>Transportation <span>${paymentCar.transportation_charge}</span></h4> */}
							<h4>Transportation <span>$ { paymentCar.transportation_charge || 0}</span></h4>


							<div class="vehiclerighttotal">
								{/* <h3>Total amount <span>$ {Number(paymentCar.price)+ Number(getFeeDetails(paymentCar.price)) + Number(300 || 0)}</span></h3> */}
								<h3>Total amount <span>$ {Number(paymentCar.price)+ Number(paymentCar.lot_fee)+Number(getFeeDetails(paymentCar.price)) + Number(paymentCar.transportation_charge|| 0)+0+0+Number(paymentCar.late_fee)}</span></h3>
							</div>
						</div>
					</div>
				</div>				
				
				</div>):""}
				<div class="text-center ckreview"><a  class="cta-btn cancel-btn" href="/cart">Cancel</a> <button type="submit" class="cta-btn"  onClick = {()=> billofsales()}>Make Payment</button> </div>
				
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
  <h2 className="title"> Congratulations </h2>
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
export default CheckOut;