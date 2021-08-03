import React from 'react';
import { useState } from 'react';
import vehicles from '../assets/img/vehicles.jpg'
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import Checkout from '../Pages/Checkout';
import Popup from '../Component/Popup/Popup';

const Cart = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
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
                        <h2>Number of Vehicles- 2<span>Total amount- <b>$4,600</b></span></h2>
                    </div>
                    
                    <div class="vehiclesheadspaydetails mt-4">
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
                                <h4>Buy Fee <span>$100</span></h4>
                                <div class="form-group input-group ">
                                    <input type="checkbox" id="paytransportation"/><label for="paytransportation">Transportation</label><span>$300</span>
                                </div>
                                <div class="vehiclerighttotal">
                                    <h3>Total amount <span>$2,300</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vehiclesheadspaydetails mt-4">
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
                                <h4>Buy Fee <span>$100</span></h4>
                                <div class="form-group input-group ">
                                    <input type="checkbox" id="paytransportation"/><label for="paytransportation">Transportation</label><span>$300</span>
                                </div>
                                <div class="vehiclerighttotal">
                                    <h3>Total amount <span>$2,300</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-8">
                    <div class="vehicletotal">
                        <h2>Total</h2>
                        <h3>Total Amount <span>$4,600</span></h3>
                        <h4>Select Payment Method</h4>
                        <div class="input-group">
                            <select id="vehicleselect"  class="form-control custom-select browser-default">
                                <option value="Select">select</option>
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