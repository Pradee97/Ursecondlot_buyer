import React, { useState , useEffect} from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';

const Transport = () => {

	
	const [tab1, setTab1] = useState("active");
	const [tab2, setTab2] = useState("");
	const [tab3, setTab3] = useState("");

	const tab = (selectedTab = "tab1") => {
		
		if (selectedTab==="tab1") {
			
			setTab1("active") && Pickup()
			setTab2("")
			setTab3("")
		}
		else if (selectedTab==="tab2") {
			setTab1("")
			setTab2("active") && Transport()
			setTab3("")
		}
		else if (selectedTab==="tab3") {
			setTab1("")
			setTab2("")
			setTab3("active")
		}
	};

	const userDetails=ls.get('userDetails');

	const [pickUp,setPickUp] = useState("");
	const [transit,setTransit] = useState("");
	const [delivered,setDelivered] = useState("");
	
	const Pickup = () =>{
		
        let request = {
			buyer_dealer_id :userDetails.buyer_dealer_id,
			status: "Pickup"
        }

        API.post("transportDetails/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data)
			setPickUp(response.data.data)
           
        });
	}
	
	const Transit = () =>{
		
        let request = {
			buyer_dealer_id :userDetails.buyer_dealer_id,
			status: "In Transit"
        }

        API.post("transportDetails/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data)
			setTransit(response.data.data)
           
        });
	}
	
	const Delivered = () =>{
		
        let request = {
			buyer_dealer_id :userDetails.buyer_dealer_id,
			status: "Delivered"
        }

        API.post("transportDetails/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data)
			setDelivered(response.data.data)
           
        });
	}
	
	// const TransportSearch = () =>{
		
    //     let request = {
	// 		buyer_dealer_id: userDetails.buyer_dealer_id,
	// 		make: make,
	// 		model: model,
	// 		year: year,
	// 		vin_no: VINNumber,
    //     }

    //     API.post("transportSearch/condition", request).then(response=>{

	// 		console.log("pickup check the value", response.data.data)
	// 		setPickUp(response.data.data)
	// 		setTransit(response.data.data)
	// 		setDelivered(response.data.data)
           
    //     });
	// }

	useEffect (() =>{
        Pickup()
    }, []);

return (

    <main id="main" class="inner-page">

    <div id="transport" class="transport">
		<div class="container">
			<div class="section-title">
			  <h2>Transport</h2>
			</div>
		
			<div class="tabsoptionblock col-lg-12">
				<ul class="tabs">
					<li class={`${tab1}`} onClick={()=>{tab("tab1"); Pickup()}} >Pickup</li>
					<li class={`${tab2}`} onClick={()=>{tab("tab2"); Transit()}} >In Transit</li>
					<li class={`${tab3}`} onClick={()=>{tab("tab3");Delivered()}} >Delivered</li>
				</ul>
			</div>
			<div class="searchblock col-lg-12">
				<div class="input-group searchbox">
					<input class="form-control border-end-0 border" type="text" value="search" id="search-input"/>
					<span class="input-group-append">
						<button class="searchBtn" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
			</div>
			<div class="tab_container">
			
				<div id="tab1" style={{display:`${tab1 === ""? "none": "block"}`}} class="tab_content">
				{pickUp?.length>0? pickUp
            	.map((pickUp) =>   
					<div class="tab_container-block">
						<div class="row content col-lg-12">							
							<div class="col-lg-12 col-md-12">
								<div class="pickupdetailcontent">
									<h3>{pickUp.make}({pickUp.model} model)</h3>
									<h4>{pickUp.vin_no}</h4>
								</div>						
							</div>							
						</div>
						<div class="row content col-lg-12">
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p class="billsalesno">Bill Of sale # <br></br>{pickUp.bill_of_sales_id}</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">{pickUp.address}</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Status</p>
									<p class="subheadstatus">{pickUp.status}</p>
								</div>						
							</div>							
						</div>
					</div>):"No data found"}
					
					<div class="text-center">
						<a href="#" class="load-more-btn">Load More</a>
					</div>
				</div>
				
				<div id="tab2" style={{display:`${tab2 === ""? "none": "block"}`}} class="tab_content">
				{transit?.length>0? transit
            	.map((transit) => 
						<div class="tab_container-block">
							<div class="row content col-lg-12">
								<div class="col-lg-5 col-md-5">
									<div class="modeldetails">
										<span>order#G86512</span>
										<span>Bill Of Sale # {transit.bill_of_sales_id}</span>
									</div>						
								</div>
								<div class="col-lg-4 col-md-4">
									<div class="modeldetail">
										<h3>{transit.make}({transit.model} model)</h3>
										<h4>{transit.vin_no}</h4>
									</div>						
								</div>
								{transit.transportation_charge !==null?
								<div class="col-lg-3 col-md-3">
									<div class="modeldetailprice">
										<h3>Transport Price<span>$120</span></h3>
									</div>						
								</div>:""}
							</div>
							
							
							<div class="row content col-lg-12">
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Transport Name</p>
										<p class="subhead">{transit.transport_name}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent ">
										<p>Transport phone</p>
										<p class="subhead">{transit.transport_phone_no}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Est.delivary</p>
										<p class="subhead">{transit.estimate_transpor_date?.substring(0,10)}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Pickup Point</p>
										<p class="subhead">{transit.pickup_address}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Drop Point</p>
										<p class="subhead">{transit.dropPonit_address}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Status</p>
										<p class="subheadstatus">{transit.status}</p>
									</div>						
								</div>
							</div>
						</div>):"No data found"}				
					
					<div class="text-center">
						<a href="#" class="load-more-btn">Load More</a>
					</div>
				</div>
							
				<div id="tab3" style={{display:`${tab3 === ""? "none": "block"}`}} class="tab_content">
				{delivered?.length>0? delivered
            	.map((delivered) => 
						<div class="tab_container-block">
							<div class="row content col-lg-12">
								<div class="col-lg-5 col-md-5">
									<div class="modeldetails">
										<span>order#G86512</span>
										<span>Bill Of Sale # {delivered.bill_of_sales_id}</span>
									</div>						
								</div>
								<div class="col-lg-4 col-md-4">
									<div class="modeldetail">
										<h3>{delivered.make}({delivered.model} model)</h3>
										<h4>{delivered.vin_no}</h4>
									</div>						
								</div>
								<div class="col-lg-3 col-md-3">
									<div class="modeldetailprice">
										<h3>Transport Price<span>$120</span></h3>
									</div>						
								</div>
							</div>
							
							
							<div class="row content col-lg-12">
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Transport Name</p>
										<p class="subhead">{delivered.transport_name}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent ">
										<p>Transport phone</p>
										<p class="subhead">{delivered.transport_phone_no}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Est.delivary</p>
										<p class="subhead">{delivered.estimate_transpor_date?.substring(0,10)}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Pickup Point</p>
										<p class="subhead">{delivered.pickup_address}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Drop Point</p>
										<p class="subhead">{delivered.dropPonit_address}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Status</p>
										<p class="subheadstatus">{delivered.status}</p>
									</div>						
								</div>
							</div>
						</div>):"No data found"}

					<div class="text-center">
						<a href="#" class="load-more-btn">Load More</a>
					</div>
				</div>
			</div>
		</div>
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
export default Transport;