import React, {  useState, useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import vehicles from '../../assets/img/vehicles.jpg'
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import Checkout from '../Checkout';
import Popup from '../../Component/Popup/Popup';

const Cart = () => {

    const userDetails=ls.get('userDetails');
    const [isOpen, setIsOpen] = useState(false);
    const [cartDetail,setCartDetail] = useState();

    const [highBid,setHighBid] = useState();
    const [feeDetails, setFeeDetails] = useState("");
    const [mySelectedCarId, setMySelectedCarId] = useState([]);
    const [mySelectedCarDetails, setMySelectedCarDetails] = useState([]);
    const [paymentMode, setPaymentMode] = useState("");
    const [paymentCarList,setPaymentCarList] = useState("");
    const [numberCars,setNumberCars] = useState("");
    const [paymentModeError,setPaymentModeError] = useState("");
    const [alertError,setAlertError] = useState("");

    console.log(userDetails==="userDetails======",userDetails)
    let paySeparately={};
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const cartDetails = () =>{

        let request = {
            buyer_dealer_id :userDetails.buyer_dealer_id,
        }

        API.post("cartDetails/condition", request).then(response=>{

            console.log("cart check the value", response.data.data)
            setCartDetail(response.data.data)
            setNumberCars(response.data.data.length)
        });
    }

    useEffect (() =>{
        cartDetails()
    }, []);

    async function fetchBuyerFees() {
        let request = {
            type: "Buyer"
        };
        const state = API.post('fees/condition', request);
        state.then(res => {
            console.log("res", res)
            setFeeDetails(res.data.data);
          
        })
            .catch(err => { console.log(err); });
    }

    useEffect(() => {
        fetchBuyerFees();
    }, []);

const billofsales =(request) => {
    // const request = mySelectedCarDetails
    setPaymentCarList(request)
    console.log("set payment request check",  request)
    
    setAlertError("")

    if(paymentMode==null){
        setPaymentModeError("You need to select the Payment Mode")
    }
    if(request.length>0){
        togglePopup();
    }
    else{
       setAlertError("Without selecting any car you can't go for the Review")
    }
    // return;
    // const state = API.post('billofsales/add', request);
    // state.then(res => {
    //     console.log("res", res)
    //     setFeeDetails(res.data.data);
      
    // })
    //     .catch(err => { console.log(err); });
}
    
    const getFeeDetails = (maxPrice) =>{
       console.log("feeDetails===",feeDetails)
        return feeDetails && feeDetails.length > 0 ? feeDetails
            .filter((data)=> 
           
            {
                const range = data?.fee_price?.replaceAll('$',"").split("-")
               
                if(range && range[1]!=="up"){
                   
                    return Number(range[0]) <= Number(maxPrice) && Number(maxPrice)  <= Number(range[1]) 
                }
                else{
                    return range ? Number(range[0]) <= Number(maxPrice) : 0
                }

                } 
                )[0]?.fee || 0
            : 0
    }

    const selectedCarIdList = (data) => {
        let newdata=mySelectedCarId || []
        // newdata.includes(data) ? newdata = newdata.filter(item => item !== data) :newdata.push(data)
        // setMySelectedCarId(newdata)
        if(newdata.includes(data)){
            newdata = newdata.filter(item => item !== data)
            setMySelectedCarId(newdata)
        }
        else{
            // newdata.push(data) 
            newdata=[...newdata,data]
            setMySelectedCarId(newdata)
        }
        // console.log("newdata====",newdata)
        // console.log("mySelectedCarId====",mySelectedCarId)
    }

    const mySelectedCarTotal = () =>{
        console.log("mySelectedCarTotal=====")
        // console.log("console.log(cartDetail?.length>0)====",cartDetail?.length)
        if(mySelectedCarId.length>0) {
            console.log("mySelectedCarId~~~~~",mySelectedCarId)
            if(cartDetail?.length>0 && cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length>0){
                // console.log("mySelectedCarId.length====",cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length)
                return cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id))).reduce((acc, curr) => acc+((Number(curr.max_price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.max_price))),0)
            }
            else {
                return 0
            }
        }
        else {
        return cartDetail?.length>0 && cartDetail
        .reduce((acc, curr) => acc+((Number(curr.max_price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.max_price))),0)
        }
    }

    const reviewAndCheckout = () => {
        //togglePopup()
        console.log("reviewAndCheckout=====")
        if(mySelectedCarId.length>0) {
            console.log("mySelectedCarId~~~~~",mySelectedCarId)
            if(cartDetail?.length>0 && cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length>0){
                // console.log("mySelectedCarId.length====",cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length)
                setMySelectedCarDetails(cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id}}))
                billofsales(cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge}}))
            }
            else {
                setMySelectedCarDetails([])
                billofsales([])
            }
        }
        else {
            setMySelectedCarDetails(cartDetail?.length>0 ? cartDetail.map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id}}):[])
            billofsales(cartDetail?.length>0 ? cartDetail.map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge}}):[])
        // return cartDetail?.length>0 && cartDetail
        // .reduce((acc, curr) => acc+((Number(curr.max_price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.max_price))),0)
        }
    }
    const selectPayment=(data)=> {
        console.log("selectPayment----",data)
        setPaymentMode(data)
    }

    return (
        <main id="main" class="inner-page">
        <div id="checkoutpage" class="checkoutpage">
          <div class="container">
          <div class="checkoutblock col-lg-12">
    
            <div class="section-title">
              <h2>Checkout Summary</h2>
            </div>
    
            <div class="row content">
                <div class="col-lg-8 col-md-8">
                    <div class="vehiclesheads">
                    {/* <h2>Number of Vehicles- 2<span>Total amount- <b>$ {cartDetail.length>0 ? cartDetail.reduce((acc,{max_price,transportation,transportation_charge})=>acc + (Number(max_price) + Number(transportation === 'yes' ? transportation_charge : 0) + Number(getFeeDetails(max_price||0))) ,0) : 0}</b></span></h2> */}
                    <h2>Number of Vehicles- {numberCars}<span>Total amount- <b>$ {cartDetail?.length>0 && cartDetail
                    .reduce((acc, curr) => acc+((Number(curr.price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))),0)}</b></span></h2>   
                </div>
                {cartDetail?.length>0 && cartDetail
                    .map((cartDetail,index) =>{
                        paySeparately={[index] : 'no'}
                        return( <div class="vehiclesheadspaydetails mt-4">
                            <div class="row">					
                                <div class="vehiclepaycheckbox col-lg-12">
                                    <div class="form-group input-group">
                                        {/* <input className={"paySeparately"+index}  value={paySeparately[index]=='no'? "yes":"no"} type="checkbox" id={"vehiclepayseparat"+index} checked = {paySeparately[index] =='yes'?true:false} onChange={(e)=>{paySeparately[index]='yes'}}/><label for={"vehiclepayseparat"+index}>You Want To Pay Separately{paySeparately[index]}</label> */}
                                        <input className={"paySeparately"+index}  value={index} type="checkbox" id={"vehiclepayseparat"+index} onChange={(e)=>{selectedCarIdList(cartDetail.car_id)}}/><label for={"vehiclepayseparat"+index}>You Want To Pay Separately</label>

                                    </div>
                                </div>					
                            
                                <div class="vehicleimgleft col-lg-4">
                                    <img src={cartDetail.image} className="carImg"/>
                                </div>
                                <div class="vehicleimgright col-lg-8">
                                    <h3>{cartDetail.make} ({cartDetail.model}) <span>$ {cartDetail.price}</span></h3>
                                    <h4>Buy Fee <span>$ {getFeeDetails(cartDetail.price)}</span></h4>
                                    <div class="form-group input-group ">
                                        <input type="checkbox" id="" value={cartDetail.transportation == 'yes' ? 'no' : 'yes'}   checked={cartDetail.transportation== 'yes' ? true : false}/><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span>
                                    </div>
                                    <div class="vehiclerighttotal">
                                        <h3>Total amount <span>$ {(Number(cartDetail.price) || 0) +  Number(cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0) + Number(getFeeDetails(cartDetail.price))}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })
                }
                    
                    {/* <div class="vehiclesheadspaydetails mt-4">
                        <div class="row">					
                            <div class="vehiclepaycheckbox col-lg-12">
                                <div class="form-group input-group">
                                    <input type="checkbox" id="vehiclepayseparat"/><label for="vehiclepayseparat">You Want To Pay Separately</label>
                                </div>
                            </div>					
                        
                            <div class="vehicleimgleft col-lg-4">
                                <img src={vehicles}/>
                            </div>
                            <div class="vehicleimgright col-lg-8">
                                <h3>Honda Amaze (2014 model) <span>$1900</span></h3>
                                <h4>Buy Fee <span>$ {getFeeDetails()}</span></h4>
                                <div class="form-group input-group ">
                                    <input type="checkbox" id="paytransportation"/><label for="paytransportation">Transportation</label><span>$300</span>
                                </div>
                                <div class="vehiclerighttotal">
                                    <h3>Total amount <span>$2,300</span></h3>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div class="col-lg-4 col-md-8">
                    <div class="vehicletotal">
                        <h2>Total</h2>
                        <h3>Total Amount <span>${cartDetail?.length>0 && cartDetail
                    .reduce((acc, curr) => acc+((Number(curr.price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))),0)}</span></h3>
                        <h4>Select Payment Method</h4>
                        {/* <div class="input-group">
                            <select id="vehicleselect"  class="form-control custom-select browser-default">
                                <option value="Select">select</option>
                                <option value="Select">ACH</option>
                                <option value="Select">Floor</option>
                                <option value="Select">Credit Card</option>
                            </select>
                        </div>  */}
                        <div className="form-group selectTbox">
            <div className="tbox">                
                <div className="selcetclass"> 
                    <select id="vehicleselect"  class="form-control custom-select browser-default" onChange={(e)=>selectPayment(e.target.value)}>
                        <option value={null} style={{"display":"none"}}>Select</option>
                        <option value="ACH">ACH</option>
                        <option value="Floor">Floor</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>
                    <p>{paymentModeError}</p>
                    {/* <label  htmlFor="state_id" className={"input-has-value"}>Select Payment Method</label> */}
                    </div>
            </div>
        </div>
                   
                        <div class="vehicletotalbtns"> 
                            <a class="vehicletotal-btns" href="JavaScript:void(0)" disabled={!paymentMode} onClick={()=>reviewAndCheckout() && paymentMode }>Review & Checkout</a>
                        </div>
                        <p className="form-input-error">{alertError}</p>
                        
                    </div>
                </div>
            </div>
        </div>
          </div>
          {isOpen && <Popup
            isClose={false}
            content={<>
                <Checkout toggle={togglePopup} paymentCarList={paymentCarList}/>
            </>}
            handleClose={togglePopup}
        />}
        </div>


        <section id="playstoreBlock" class="playstoreBlock">
          <div class="container">
    
    
            <div class="row content">
              <div class="col-lg-12">
                <img src={appstore} />
                <img src={googleplay} />
               
              </div>
             
            </div>
    
          </div>
        </section>
    
       
    
     
    
      </main>
        
    )
}
export default Cart;