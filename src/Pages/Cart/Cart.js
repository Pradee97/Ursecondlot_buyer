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
    const [total,setTotal] = useState(0);
    const mytotal = [0]
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
                    <h2>Number of Vehicles- 2<span>Total amount- <b>$ 1000</b></span></h2>
                       
                </div>
                {cartDetail?.length>0?cartDetail
                            .map((cartDetail) =>    
                    <div class="vehiclesheadspaydetails mt-4">
                        <div class="row">					
                            <div class="vehiclepaycheckbox col-lg-12">
                                <div class="form-group input-group">
                                    <input type="checkbox" id="vehiclepayseparat"/><label for="vehiclepayseparat">You Want To Pay Separately</label>
                                </div>
                            </div>					
                        
                            <div class="vehicleimgleft col-lg-4">
                                <img src={cartDetail.image}/>
                            </div>
                            <div class="vehicleimgright col-lg-8">
                                <h3>{cartDetail.make} ({cartDetail.model}) <span>$ {cartDetail.max_price}</span></h3>
                                <h4>Buy Fee <span>$ {getFeeDetails(cartDetail.max_price)}</span></h4>
                                <div class="form-group input-group ">
                                    <input type="checkbox" id="paytransportation" value={cartDetail.transportation == 'yes' ? 'no' : 'yes'}   checked={cartDetail.transportation== 'yes' ? true : false}/><label for="paytransportation">Transportation</label><span>$ {cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0}</span>
                                </div>
                                <div class="vehiclerighttotal">
                                    <h3>Total amount <span>$ {(Number(cartDetail.max_price) || 0) +  Number(cartDetail.transportation === 'yes' ? cartDetail.transportation_charge : 0) + Number(getFeeDetails(cartDetail.max_price))}</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>)
                    :""}
                    
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
                        <h3>Total Amount <span>$4,600</span></h3>
                        <h4>Select Payment Method</h4>
                        <div class="input-group">
                            <select id="vehicleselect"  class="form-control custom-select browser-default">
                                <option value="Select">select</option>
                                <option value="Select">ACH</option>
                                <option value="Select">Floor</option>
                                <option value="Select">Credit Card</option>
                            </select>
                        </div>
                        <div class="vehicletotalbtns"> 
                            <a class="vehicletotal-btns" href="JavaScript:void(0)" onClick={togglePopup}>Review & Checkout</a>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
    </div>
          </div>
          {isOpen && <Popup
            isClose={false}
            content={<>
                <Checkout toggle={togglePopup} />
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