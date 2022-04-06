import React, {  useState, useEffect } from 'react';
import ls, { set } from 'local-storage';
import API from "../../Services/BaseService";
import vehicles from '../../assets/img/vehicles.jpg'
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import Checkout from '../Checkout';
import Popup from '../../Component/Popup/Popup';
import Loading from"../../Component/Loading/Loading";
import LateFee from '../../Pages/LateFee/LateFee';
import { useHistory} from "react-router-dom";


const Cart = () => {
    const history = useHistory();
    const userDetails=ls.get('userDetails');
    const [isOpen, setIsOpen] = useState(false);
    const [cartDetail,setCartDetail] = useState([]);

    const [highBid,setHighBid] = useState();
    const [feeDetails, setFeeDetails] = useState("");
    const [mySelectedCarId, setMySelectedCarId] = useState([]);
    const [mySelectedCarDetails, setMySelectedCarDetails] = useState([]);
    const [paymentMode, setPaymentMode] = useState("");
    const [paymentCarList,setPaymentCarList] = useState("");
    const [sellerDealerId,setSellerDealerId] = useState("");
    const [numberCars,setNumberCars] = useState("");
    const [paymentModeError,setPaymentModeError] = useState("");
    const [alertError,setAlertError] = useState("");
    const [loading,setLoading] = useState(true);
    const [selectAllCar, setSelectAllCar] = useState(true);

    const [cartEdit,setCartEdit] = useState(false);

    const [isLateFee, setIsLateFee] = useState(false);
  	const [lateFeeValue, setLateFeeValue] = useState(0);
    const [floorSelector,setFloorSelector] = useState(false);
    const [floorMode,setFloorMode] = useState("");
    const [contactFloor,setContactFloor] = useState("");
    const [selectedTotalFloor,setSelectedTotalFloor]= useState("");
    const [floorContact,setFloorContact] = useState("");
    const [floorAccount,setFloorAccount] = useState("");
    const [creditLimit,setCreditLimit] = useState("");
    const [buyerCreditLimit,setBuyerCreditLimit] = useState("");

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
    }

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
            if(Array.isArray(response.data.data) && response.data.data.length){
                setCartDetail(response.data.data.map(data=> {return {...data, isChecked:true}}))
                 setMySelectedCarId(response.data.data.map(data=>data.car_id))
                 setBuyerCreditLimit(response.data.data[0].credit_limit)
                  console.log("check the credit limit in the cart page",response.data.data[0].credit_limit)
                 setNumberCars(response.data.data.length)
            }            
    
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
            setSelectedTotalFloor(mySelectedCarTotal());

          
        })
            .catch(err => { console.log(err); });
    }

    useEffect(() => {
        fetchBuyerFees();
        

    }, []);

const billofsales =(request) => {
    // const request = mySelectedCarDetails
    setPaymentCarList(request)
    // setSellerDealerId(request)

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
    console.log("----fee---",maxPrice)
 
   return feeDetails.length > 0 ? feeDetails
     .filter((data)=> 
      
     {
       const range = data.from_price
       const rangeOne = data.to_price
 
        
       if(rangeOne!=="up"){
          
         return Number(range) <= Number(maxPrice) && Number(maxPrice)  <= Number(rangeOne) 
       }
       else{
         return Number(range) <= Number(maxPrice) 
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
        let floorvalue='';
        if(mySelectedCarId.length>0) {
            console.log("mySelectedCarId~~~~~",mySelectedCarId)
            if(cartDetail?.length>0 && cartDetail.filter(item => (mySelectedCarId.includes(item.car_id)) ).length>0){
                // console.log("mySelectedCarId.length====",cartDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length)
              
              return cartDetail.filter(item => (mySelectedCarId.includes(item.car_id))).reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))+Number(curr.late_fee)),0)
               
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
                billofsales(cartDetail.filter(item => (mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge,"year":data.year,"lot_fee":data.lot_fee,"late_fee":data.late_fee,"buyFee":getFeeDetails(),"credit_limit":data.credit_limit,"total_price":mySelectedCarTotal(),"floor_plan_id":floorMode}}))
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
        if(data=="Floor"){
            setFloorSelector(true)
                FloorDetails()
             
        }
        else{
            setFloorSelector(false)
            setFloorMode("")
            setFloorContact("")
            setFloorAccount("")
            setCreditLimit("")
        }
        setPaymentMode(data)
    }

    

    const overAllTotal = () => {
        return cartDetail?.length>0 && cartDetail
        .reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))+ 0 + 0 + Number(curr.late_fee)),0) 
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
    
    const HistoryUpdate = (carId,transportationCharge,transportation,divContent,HeaderContent) =>{

        let request = {
            buyer_dealer_id :userDetails.buyer_dealer_id,
            car_id:carId,
            transportation:!transportation ? "no" : transportation,
            transportation_charge: transportationCharge,
            // transportation_charge: carTransportation == 'yes' ?  300 : 0,
        }
        // console.log("transportationCharge====",transportationCharge)
        console.log("request======",request)
        // return
        API.post("editTransportation/update", request).then(response=>{
          setCartEdit(false)
          document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox hideContent");
          document.getElementById(HeaderContent).setAttribute("class", "showContent");
        });
      
      }
      const cancelEdit = (divContent, HeaderContent) => {
        setCartEdit(false)
        document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox hideContent");
        document.getElementById(HeaderContent).setAttribute("class", "showContent");
      }
    
        const HistoryEdit = (divContent,HeaderContent) =>{
          console.log("check the car id coming or not in the edit on click",divContent)
          document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox showContent");
          document.getElementById(HeaderContent).setAttribute("class", "hideContent");
        }
    
    const carTransportationupdate = (value, carid) => {
        console.log("carid===", carid)
        console.log("value===", value)
        setCartDetail( cartDetail.map(data => {
          if(data.car_id === carid){
            data.transportation = value
            data.transportation_charge= value == 'yes' ? 300 : 0
         }
         return data
       }))
    }

   
   

    const getlateFee=()=>{
		let request={
			buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
		}
		
		API.post('getlatefee/condition',request).then(res=>{
		   if(res.data.data.length){
			
	   console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
			const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
			setIsLateFee(lateFeeValueStatus==="yes")
			setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
		   }
		  
	
		}).catch(err=>{console.log(err);});
	}

    const selectFloorPayment=(data)=>{

        console.log("check the floor payment selected",data)

        const floor=data.split(",")

        setFloorMode(floor[0])
        setFloorContact(floor[1])
        setFloorAccount(floor[2])
        setCreditLimit(floor[3])
        

    }

    const FloorDetails=()=>{

		let request={
			buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            amount: mySelectedCarTotal()
		}
		
		API.post('floorDetails/condition',request).then(response=>{
		  
			
	   console.log("check floor ",response.data.data)
       setContactFloor(response.data.data)
			
		  
	
		}).catch(err=>{console.log(err);});
	}


    useEffect (() =>{

		getlateFee();  
      
		
    }, []);

    const checkAndRevCall = () => {
        if(floorSelector){
            floorContact && floorAccount && creditLimit &&  floorMode &&  paymentMode && mySelectedCarId.length>0&& reviewAndCheckout() 
        }
        else {
            paymentMode && buyerCreditLimit && mySelectedCarId.length>0&& reviewAndCheckout() 
        }
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
                <div class="col-lg-12 col-md-12">
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
                                <h4 className='mb-2'>Inventory #  {cartDetail.inventory_no}
                                <div class="cartBillofSale" >
                                    <a class="cta-btns-primary" onClick={ () => {
                                    history.push({pathname: "/billofsale", state: {backURL: "/cart", BillofSale: cartDetail.bill_of_sale_id}});
                                }}>Bill Of sale #{cartDetail.bill_of_sale_id}</a>
                                </div>
                                </h4>
                                
                                 {/* <p class="editbtn m-0"><a class="" href="JavaScript:void(0)" onClick={()=>HistoryEdit(`transporationDiv${cartDetail.car_id}`,`transporationHeader${cartDetail.car_id}`)}>{cartDetail.bill_of_sales_id !== null && cartDetail.bill_of_sales_id !== "" ? "": "Edit Transportation" }</a></p> */}
                                 <p class="editbtn m-0"><a class="" href="JavaScript:void(0)" onClick={()=>HistoryEdit(`transporationDiv${cartDetail.car_id}`,`transporationHeader${cartDetail.car_id}`)}> Edit Transportation</a></p>


                                    <h4 className="dateFormat">Date Of Purchased : {cartDetail.sold_date} </h4>
                                    <h4>Vechile Price <span>$ {(Number(cartDetail.price)+(Number(cartDetail.lot_fee)))}</span></h4>
                                    <h4>Buy Fee <span>$ {getFeeDetails(cartDetail.price)}</span></h4>
                                    <h4>Other Charges <span>$ 0</span></h4>
                                    <h4>Miscellaneous Charges <span>$ 0</span></h4>
                                    {cartDetail.late_fee =="" || cartDetail.late_fee ==null ||  cartDetail.late_fee ==0 ? "":
                                    <h4>Late Fee <span>$ {Number(cartDetail.late_fee)}</span></h4>}
                                    {/* <h4>Transportation Charges <span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span></h4> */}
                                    {/* <div class="form-group input-group ">
                                    <input type="checkbox" id="" value={cartDetail.transportation == 'yes' ? 'no' : 'yes'}   checked={cartDetail.transportation== 'yes' ? true : false}/><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span>
                                    <input  id="" /><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span>

                                        <input type="checkbox" id="" value={cartDetail.transportation == 'yes' ? 'no' : 'yes'}   checked={cartDetail.transportation== 'yes' ? true : false}/><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? 300 : 0}</span>
                                    </div> */}

                            <div className="col-lg-12 form-group transCbox customCheckbox hideContent p-0" id={`transporationDiv${cartDetail.car_id}`} >
                            <input type="checkbox" className="form-check d-inline" 
                              id = {`transporation${cartDetail.car_id}`} 
                              // id = 'transporation' 
                              value = {cartDetail?.transportation == 'yes' ? 'no' : 'yes'} 
                              checked = { cartDetail.transportation==="yes" ? true : false } 
                              onChange = {(e)=>{carTransportationupdate(e.target.value, cartDetail.car_id)}} 
                            />
                            <label htmlFor={`transporation${cartDetail.car_id}`}  className="form-check-label" >Transportation</label>
                            {/* <input type="checkbox" className="form-check d-inline" id="transporation" value={historyDetail.transportation == 'yes' ? 'no' : 'yes'} checked={historyDetail.transportation==="yes" ?true:false} onChange={(e)=>{setCarTransportation(e.target.value)}}/> 
                            <label htmlFor='transporation' className="form-check-label" >Transportation  </label>    */}
                           
                            <div className="rprice">
                                <span>${cartDetail.transportation_charge || 0} </span>  
                                {/* <span>${300 || 0} </span>                             */}
                            </div>
                              <div className="totalActions">
                              <button onClick={()=>HistoryUpdate(cartDetail.car_id,cartDetail.transportation_charge, cartDetail.transportation, `transporationDiv${cartDetail.car_id}`, `transporationHeader${cartDetail.car_id}`)}>update</button>  
                              <button onClick={()=>cancelEdit(`transporationDiv${cartDetail.car_id}`,`transporationHeader${cartDetail.car_id}`)}>Cancel</button>    
                              </div>
                                                  
                      </div>
                      <h4 className='showContent' id={`transporationHeader${cartDetail.car_id}`}>Transportation <span>$ {cartDetail.transportation_charge || 0}</span></h4>



                                    <div class="vehiclerighttotal">
                                    <h3>Total amount <span>$ {(Number(cartDetail.price) || 0) + (Number(cartDetail.lot_fee)) +  Number(cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0) + Number(getFeeDetails(cartDetail.price)) + 0 + 0 + Number(cartDetail.late_fee)}</span></h3>
                                        {/* <h3>Total amount <span>$ {(Number(cartDetail.price) || 0)+(Number(cartDetail.lot_fee)) +  Number(cartDetail.transportation === 'yes' ? 300 : 0) + Number(getFeeDetails(cartDetail.price)) + 0 + 0}</span></h3> */}
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })
                    }
                  
                </div>
                {/* <div class="col-lg-4 col-md-8">
                    <div class="vehicletotal">
                        <h2>Checkout</h2>
                        <h3>Total Amount <span>$ {mySelectedCarTotal()}</span></h3>
                        <h4>Select Payment Method</h4>

                        <div className="form-group selectTbox">
            <div className="tbox">                
                <div className="selcetclass"> 
                    <select id="vehicleselect"  class="form-control custom-select browser-default" onChange={(e)=>selectPayment(e.target.value)}>
                        <option value={null} style={{"display":"none"}}>-- Select --</option>
                        <option value="ACH">ACH</option>
                        <option value="Floor">Floor</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>
                    <p>{paymentModeError}</p>
----------------  if u uncommand this functionality means plzz command this label tag ------------ <label  htmlFor="state_id" className={"input-has-value"}>Select Payment Method</label>
                    </div>
            </div>
        </div>
        {floorSelector && 
                 
                
                 <div>
                <h4>Floor Method</h4>

                <div className="form-group selectTbox">
                    <div className="tbox">   
                                
                        <div className="selcetclass"> 
                            <select id="floormethod"  class="form-control custom-select browser-default" onChange={(e)=>selectFloorPayment(e.target.value)}>
                            <option value="Select">--  Select  --</option>
                            {contactFloor.length>0?contactFloor.map((item)=>
                             
                                <option id ={item.contact_name} value={` ${item.floor_plan_id},  ${item.company_name},  ${item.account_no},  ${item.credit_limit}`} >{item.company_name} ({item.account_no})</option>
                            ):""} 
                            </select>        
                        </div>
                    </div>
                </div></div>}

                        <div class="vehicletotalbtns"> 
                            <a class="vehicletotal-btns" href="JavaScript:void(0)" disabled={!paymentMode || (floorSelector && !floorMode ) || !mySelectedCarId.length } onClick={checkAndRevCall}>Review & Checkout</a>
                        </div>
                        <p className="form-input-error">{alertError}</p>
                        
                    </div>
                </div> */}
            </div>
        </div>
          </div>
          {isOpen && <Popup
            isClose={false}
            content={<>
                <Checkout toggle={togglePopup} paymentCarList={paymentCarList} paymentMode={paymentMode} floorContact={floorContact} floorAccount={floorAccount} creditLimit= {creditLimit}/>
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

        {/* {isLateFee && <Popup
                isClose={false}
                content={<>
                    <LateFee toggle={toggleLateFee} />
                </>}
                handleClose={toggleLateFee}
            />} */}

      </main>
}
      </div>
        
    )
}
export default Cart;