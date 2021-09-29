import React, {  useState, useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import vehicles from '../../assets/img/vehicles.jpg'
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import Checkout from '../Checkout';
import Popup from '../../Component/Popup/Popup';
import Loading from"../../Component/Loading/Loading";

const Cart = () => {

    const userDetails=ls.get('userDetails');
    const [isOpen, setIsOpen] = useState(false);
    const [cartDetail,setCartDetail] = useState([]);

    const [highBid,setHighBid] = useState();
    const [feeDetails, setFeeDetails] = useState("");
    const [mySelectedCarId, setMySelectedCarId] = useState([]);
    const [mySelectedCarDetails, setMySelectedCarDetails] = useState([]);
    const [paymentMode, setPaymentMode] = useState("");
    const [paymentCarList,setPaymentCarList] = useState("");
    const [numberCars,setNumberCars] = useState("");
    const [paymentModeError,setPaymentModeError] = useState("");
    const [alertError,setAlertError] = useState("");
    const [loading,setLoading] = useState(true);
    const [selectAllCar, setSelectAllCar] = useState(true)

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
            if(response.data.data.length){
                setCartDetail(response.data.data.map(data=> {return {...data, isChecked:true}}))
                 setMySelectedCarId(response.data.data.map(data=>data.car_id))
            }
           
            setNumberCars(response.data.data.length)
            setLoading(false);
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
            setMySelectedCarId(newdata|| [])
        }
        else{
            // newdata.push(data)             
            newdata=[...newdata,data]
            setMySelectedCarId(newdata)
        }
        // console.log("newdata====",newdata)
        // console.log("mySelectedCarId====",mySelectedCarId)
        setCartDetail(cartDetail.map(value=>{
            if(value.car_id == data)
            {
                console.log("====value.isChecked====",value.isChecked)
                value.isChecked = ! value.isChecked
            }
            return value
        } 

        ))
    }

    const mySelectedCarTotal = () =>{
        console.log("mySelectedCarTotal=====")
        console.log("cartDetail.====",cartDetail)
        console.log("mySelectedCarId.====",mySelectedCarId)
        if(mySelectedCarId.length>0) {
            console.log("mySelectedCarId~~~~~",mySelectedCarId)
            if(cartDetail?.length>0 && cartDetail.filter(item => (mySelectedCarId.includes(item.car_id)) ).length>0){
                // console.log("mySelectedCarId.length====",cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length)
                return cartDetail.filter(item => (mySelectedCarId.includes(item.car_id))).reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))),0)
            }
            else {
                return 0
            }
        }
        else {
            return 0
        // return cartDetail?.length>0 && cartDetail
        // .reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))),0)
        }
    }

    const reviewAndCheckout = () => {
        //togglePopup()
        console.log("reviewAndCheckout=====")
        if(mySelectedCarId.length>0) {
            console.log("mySelectedCarId~~~~~",mySelectedCarId)
            if(cartDetail?.length>0 && cartDetail.filter(item => (mySelectedCarId.includes(item.car_id)) ).length>0){
                // console.log("mySelectedCarId.length====",cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length)
                setMySelectedCarDetails(cartDetail.filter(item => (mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id}}))
                billofsales(cartDetail.filter(item => (mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge,"year":data.year,"lot_fee":data.lot_fee,"buyFee":getFeeDetails()}}))
            }
            else {
                setMySelectedCarDetails([])
                billofsales([])
            }
        }
        else {
            setMySelectedCarDetails([])
            billofsales([])
            // setMySelectedCarDetails(cartDetail?.length>0 ? cartDetail.map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id}}):[])
            // billofsales(cartDetail?.length>0 ? cartDetail.map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge,"year":data.year,"lot_fee":data.lot_fee,"buyFee":getFeeDetails()}}):[])
        // return cartDetail?.length>0 && cartDetail
        // .reduce((acc, curr) => acc+((Number(curr.max_price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.max_price))),0)
        }
    }
    const selectPayment=(data)=> {
        console.log("selectPayment----",data)
        setPaymentMode(data)
    }

    const overAllTotal = () => {
        return cartDetail?.length>0 && cartDetail
        .reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))),0) + 0 + 0
    }

    const isSelectedAllCar = () => {
        if(selectAllCar) //while chnage funtion is triggering state is not updated so using reverse logic 
        {
            setMySelectedCarId([])
            setCartDetail(cartDetail.map(data=> {return {...data, isChecked: false}}))
        }else{
            setMySelectedCarId(cartDetail.map(data=>data.car_id))
            setCartDetail(cartDetail.map(data=> {return {...data, isChecked: true}}))
        }

        setSelectAllCar(!selectAllCar)
    }
    

    return (
        <div>
        {loading?<Loading/>:
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
                        <h2>Number of Vehicles- {numberCars}<span>Total amount- <b>$ {overAllTotal()}</b></span></h2>   
                    </div>
                    {/* <div class="vehiclesheadspaydetails mt-4"> */}
                        <div class="row">				
                            <div class="vehiclepaycheckbox col-lg-12 mt-4">
                                <div class="form-group input-group pb-0 mb-0 pull-right cbox">
                                    <input 
                                        type="checkbox" 
                                        id="selectAll" 
                                        checked= {selectAllCar}
                                        onChange={(e)=>{isSelectedAllCar()}}/><label for="selectAll">Select All / Unselect All to make payment for all cars</label>
                                </div>
                            </div>
                        </div>
                    {/* </div> */}
                    {cartDetail?.length>0 && cartDetail
                    .map((cartDetail,index) =>{
                        paySeparately={[index] : 'no'}
                        return( <div class="vehiclesheadspaydetails mt-4">
                            <div class="row">					
                                <div class="vehiclepaycheckbox col-lg-12">
                                <h3 className="pull-left productName">{cartDetail.year} {cartDetail.make} {cartDetail.model} ({cartDetail.vin_no}) </h3>
                                

                                    <div class="form-group input-group pb-0 mb-0 pull-right cbox">
                                        {/* <input className={"paySeparately"+index}  value={paySeparately[index]=='no'? "yes":"no"} type="checkbox" id={"vehiclepayseparat"+index} checked = {paySeparately[index] =='yes'?true:false} onChange={(e)=>{paySeparately[index]='yes'}}/><label for={"vehiclepayseparat"+index}>You Want To Pay Separately{paySeparately[index]}</label> */}
                                        <input 
                                        className={"paySeparately"+index}  
                                        value={index} 
                                        type="checkbox" 
                                        id={"vehiclepayseparat"+index} 
                                        checked= {cartDetail.isChecked}
                                        onChange={(e)=>{selectedCarIdList(cartDetail.car_id)}}/><label for={"vehiclepayseparat"+index}>Select to make payment for this car</label>

                                    </div>
                                </div>					
                            
                                <div class="vehicleimgleft col-lg-4">
                               
                                    <img src={cartDetail.image} className="carImg"/>
                                </div>

                                <div class="vehicleimgright col-lg-8">
                                <h3>{cartDetail.date?.substring(0,10)} {cartDetail.date?.substring(11,19)}</h3>
                                    <h3>Inventory Number - {cartDetail.inventory_no}</h3>
                                    <h4>Vechile Price + Lot Fee <span>$ {(Number(cartDetail.price)+(Number(cartDetail.lot_fee)))}</span></h4>
                                    <h4>Buy Fee <span>$ {getFeeDetails(cartDetail.price)}</span></h4>
                                    <h4>Other Charges <span>$ 0</span></h4>
                                    <h4>Miscellaneous Charges <span>$ 0</span></h4>
                                    <h4>Transportation Charges <span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span></h4>
                                    {/* <div class="form-group input-group ">
                                    <input type="checkbox" id="" value={cartDetail.transportation == 'yes' ? 'no' : 'yes'}   checked={cartDetail.transportation== 'yes' ? true : false}/><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span>
                                    <input  id="" /><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span>

                                        <input type="checkbox" id="" value={cartDetail.transportation == 'yes' ? 'no' : 'yes'}   checked={cartDetail.transportation== 'yes' ? true : false}/><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? 300 : 0}</span>
                                    </div> */}
                                    <div class="vehiclerighttotal">
                                    <h3>Total amount <span>$ {(Number(cartDetail.price) || 0) + (Number(cartDetail.lot_fee)) +  Number(cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0) + Number(getFeeDetails(cartDetail.price)) + 0 + 0}</span></h3>
                                        {/* <h3>Total amount <span>$ {(Number(cartDetail.price) || 0)+(Number(cartDetail.lot_fee)) +  Number(cartDetail.transportation === 'yes' ? 300 : 0) + Number(getFeeDetails(cartDetail.price)) + 0 + 0}</span></h3> */}
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })
                    }
                  
                </div>
                <div class="col-lg-4 col-md-8">
                    <div class="vehicletotal">
                        <h2>Checkout</h2>
                        <h3>Total Amount <span>$ {mySelectedCarTotal()}</span></h3>
                        <h4>Select Payment Method</h4>

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
                            <a class="vehicletotal-btns" href="JavaScript:void(0)" disabled={!paymentMode || !mySelectedCarId.length} onClick={()=> paymentMode && mySelectedCarId.length>0&& reviewAndCheckout()  }>Review & Checkout</a>
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
                <Checkout toggle={togglePopup} paymentCarList={paymentCarList} paymentMode={paymentMode}/>
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
}
      </div>
        
    )
}
export default Cart;