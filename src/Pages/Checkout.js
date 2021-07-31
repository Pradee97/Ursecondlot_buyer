import React from 'react';
import { useHistory } from "react-router-dom";
import vehicles from '../assets/img/vehicles.jpg'

const History = () => {

    const history = useHistory();

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
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							<img src={vehicles} />
						</div>
						<div class="vehicleimgright col-lg-8">
							<h3>Honda Amaze (2014 model)+Lot Fee <span>$1900</span></h3>
							<h4>Lorem Ipsum Is Simply Dummy Text Of The And Typesetting Industry. <span>$100</span></h4>
							<h4>Transportation <span>$100</span></h4>
						</div>
					</div>
				</div>
				
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							<img src={vehicles} />
						</div>
						<div class="vehicleimgright col-lg-8">
							<h3>Honda Amaze (2014 model)+Lot Fee <span>$1900</span></h3>
							<h4>Lorem Ipsum Is Simply Dummy Text Of The And Typesetting Industry. <span>$100</span></h4>
							<h4>Transportation <span>$100</span></h4>
						</div>
					</div>
				</div>
				
				
				<div class="vehiclesheadspaydetails">
					<div class="row">
						<div class="vehicleimgleft col-lg-4">
							
						</div>
						<div class="vehicleimgright col-lg-8">
							<div class="vehiclerighttotal">
								<h3>Total amount <span>$2,300</span></h3>
							</div>
						</div>
					</div>
				</div>
				
				<div class="text-center ckreview"><a  class="cta-btn cancel-btn" href="/cart">Cancel</a> <button type="submit" class="cta-btn">Checkout</button> </div>
				
			</div>
        </div>
	
      </div>
    </div>
	
  </main>
        
    )
}
export default History;