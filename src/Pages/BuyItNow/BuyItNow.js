import React from 'react';
import { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import { useHistory, useLocation, useParams } from "react-router-dom";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import checkImg from '../../assets/img/check.svg';
import errorImg from '../../assets/img/erroricon.png';
import "../../Component/CommonPopup/commonPopup.css";
import Popup from '../../Component/Popup/Popup';
import Terms from '../../Component/TermsAndCondition/TermsAndCondition';

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
    const [carCreditLimit,setCreditLimit] = useState(props.setBuyItNowValue.creditLimit);
    console.log("check the CreditLimit in the buy it now page",carCreditLimit)
    // const { id } = useParams();
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

    const [carTransportation,setCarTransportation] = useState(props.setBuyItNowValue.transportation);
    const [carLotFee,setCarLotFee] = useState(props.setBuyItNowValue.lotFee);
    console.log("check the lot fee coming",carLotFee)
    const [carTransportationCharge,setCarTransportationCharge] = useState(props.setBuyItNowValue.transportationCharge);
    const [feeDetails, setFeeDetails] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [terms,setTerms]=useState("0");
    const [eterms,setETerms]=useState("0");

    const [toggleAcceptPopupOpen,setToggleAcceptPopupOpen]= useState(true);
    const [confirmationFlag, setConfirmationFlag] = useState(false);
    const email = JSON.parse(localStorage.getItem("userDetails")).email;
    
    const [totalAmount,setTotalAmount] = useState("");
    const [transportationEdit,setTransportationEdit] = useState(false);

    const [creditLimitError,setCreditLimitError] = useState("");

    const toggleCommonPopup = () => {
      setIsCommonPopupOpen(!isCommonPopupOpen);
    }

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }


    const getTotalAmount = () => {

      let request = {

          buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,

      };

      API.post('getTotalAmount/condition', request).then(response => {
          console.log("get total amount response", response.data.data)
          setTotalAmount(response.data.data)
          
      })
          .catch(err => { console.log(err); });
  }

  useEffect(() => {

      getTotalAmount();

  }, []);

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

// if((Number(totalAmount)+Number(carBuyItNow))<(Number(carCreditLimit))){

//   setCreditLimitError("Your credit limit balance is" + " " + ((Number(carCreditLimit))-Number(totalAmount)) + " " + ". Please pay your car in the cart to release your credit or contact us")
//   return;

// }

setCreditLimitError("")

if(!confirmationFlag){

    setConfirmationFlag(true)
    // return
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
            lot_fee:carLotFee,
            updatedBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
            createdBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
           
		}

	console.log("Save Search Request : ",request);
  // return

  if((Number(totalAmount)+Number(carBuyItNow))<(Number(carCreditLimit))){

  if( terms!=="0" ){

    
   
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
}, (error) => {
 
});
  }
  else{

    if(terms==="0"){
        setETerms("1");
    }
}
}
else{
  console.log("check the total amount in if condition",totalAmount)
  setCreditLimitError("Your credit limit balance is" + " " + ((Number(carCreditLimit))-Number(totalAmount)) + " " + ". Please pay your car in the cart to release your credit or contact us")
  return;
}
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

const TransportationUpdate = (carId,transportationCharge,transportation,divContent,HeaderContent) =>{

  let request = {
      buyer_dealer_id :userDetails.buyer_dealer_id,
      car_id:id,
      transportation:!transportation ? "no" : transportation,
      transportation_charge: transportationCharge,
      
  }
  
  console.log("request======",request)

  API.post("editTransportation/update", request).then(response=>{
    setTransportationEdit(false)
    document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox hideContent");
    document.getElementById(HeaderContent).setAttribute("class", "showContent");
  });

}

  const cancelTransportationEdit = (divContent, HeaderContent) => {
    setTransportationEdit(false)
    document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox hideContent");
    document.getElementById(HeaderContent).setAttribute("class", "showContent");
  }

    const TransportationEdit = (divContent,HeaderContent) =>{
      console.log("check the car id coming or not in the edit on click",divContent)
      document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox showContent");
      document.getElementById(HeaderContent).setAttribute("class", "hideContent");
    }

    const carTransportationupdate = (value, id) => {
      console.log("carid===", id)
      console.log("value===", value)
    
        if(id === id){
          console.log("check the history car transportation update",  )
          
          setCarTransportation(value)
          setCarTransportationCharge(value == 'yes' ? 300 : 0)
       }
      
 
    } 

  return (
 

    <div id="" className="saveSearchBlock acceptConfirmation buynowPopup">
      
            <div className="termspageblock pt-1">
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
          <h4>Are You Want to Buy this Unit</h4>
		  {/* <div className="revCheHead">
				<h3 className="pl-4"> Are You Want to Buy this Unit</h3>

				</div> */}
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
            <p class="editbtn m-0"><a class="" href="JavaScript:void(0)" onClick={()=>TransportationEdit (`transporationDiv${id}`,`transporationHeader${id}`)}> Edit Transportation</a></p>&nbsp;&nbsp;&nbsp;&nbsp;
							<h3>{carYear} {carMake}  {carModel} <span>$ {Number(carBuyItNow)}</span></h3>
							<h4>Buy Fee <span>$ {Number(getFeeDetails(carBuyItNow))}</span></h4>
							<h4>Other Charges <span>$ 0</span></h4>
                            <h4>Miscellaneous Charges <span>$ 0</span></h4>
							{/* <h4>Transportation <span>${Cartransportation_charge}</span></h4> */}
							{/* <h4>Transportation Charges <span>$ { carTransportationCharge || 0}</span></h4> */}

              

               


              <div className="col-lg-12 form-group transCbox customCheckbox hideContent p-0" id={`transporationDiv${id}`} >
                            <input type="checkbox" className="form-check d-inline" 
                              id = {`transporation${id}`} 
                             
                              value = {carTransportation == 'yes' ? 'no' : 'yes'} 
                              checked = { carTransportation==="yes" ? true : false } 
                              onChange = {(e)=>{carTransportationupdate(e.target.value, id)}} 
                            />
                            <label htmlFor={`transporation${id}`}  className="form-check-label" >Transportation</label>
                            
                           
                            <div className="rprice">
                                <span>$ {carTransportationCharge == null  ? 300: carTransportationCharge} </span>  
                                                       
                            </div>
                              <div className="totalActions">
                              <button onClick={()=>TransportationUpdate(id, carTransportationCharge, carTransportation, `transporationDiv${id}`, `transporationHeader${id}`)}>update</button>  
                              <button onClick={()=>cancelTransportationEdit(`transporationDiv${id}`,`transporationHeader${id}`)}>Cancel</button>    
                              </div>
                                                  
                      </div>
                     
                      <h4 className='showContent' id={`transporationHeader${id}`}>Transportation <span>$ {carTransportationCharge == null  ? 300: carTransportationCharge}</span></h4>



              {/* <div className="col-lg-6 form-group customCheckbox">
                                    
                  <input type="checkbox" className="form-check d-inline " id="chb2" value={carTransportation == 'yes' ? 'no' : 'yes'} checked={carTransportation==="yes" ?true:false} onChange={(e)=>{setCarTransportation(e.target.value);}}/> 
                  
                  <label htmlFor="chb2" className="form-check-label">Transportation  </label>                               
              </div> */}

              {/* <div className="col-lg-6 form-group">
                  <span>${carTransportationCharge || 0} </span>
                  <span>$ {300 || 0} </span>                              
              </div> */}

							<div class="vehiclerighttotal">
								{/* <h3>Total amount <span>$ {Number(paymentCar.price)+ Number(getFeeDetails(paymentCar.price)) + Number(300 || 0)}</span></h3> */}
								<h3>Total amount <span>$ {Number(carBuyItNow)+Number(getFeeDetails(carBuyItNow)) + Number(carTransportationCharge == null  ? 300: carTransportationCharge)+0+0}</span></h3>
							</div>
              
						</div>
					</div>
				</div>				
				
				</div>
        <div className="col-sm-12 form-group agreetab customCheckbox pl-0 mt-3">
            <input type="checkbox" className="form-check d-inline " id="chb" 
            checked = { terms == 0 ? false : true } value={terms == 0 ? 1 : 0 } onChange={(e) => setTerms(e.target.value)}/>
            <label htmlFor="chb" className="form-check-label"> I Agree for the 
            <a href="JavaScript:void(0)" onClick={togglePopup}>Terms And Conditions</a>
            </label>
            {eterms==="1" && terms==="0" ?
            <p className="form-input-error"> Agree the Terms And Conditions</p>:""}

            <p className="form-input-error"> {creditLimitError}</p>

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
              {isOpen && <Popup
                  isClose={false}
                  content={<>
                      <Terms toggle={togglePopup} />
                  </>}
                  handleClose={togglePopup}
              />}
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