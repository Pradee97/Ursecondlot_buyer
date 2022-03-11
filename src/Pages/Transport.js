import React, { useState , useEffect} from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import Loading from"../Component/Loading/Loading";
import Popup from '../Component/Popup/Popup';
import LateFee from '../Pages/LateFee/LateFee';

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
	const [year, setYear] = useState("");
  	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [vinError,setVinError] = useState("");
	const [VINNumber, setVINNumber] = useState("");
	const [transportFlag,setTransportFlag]=useState("");
	const [loading,setLoading] = useState(true);
	  
  	const [order,setOrder] = useState("");
	const [loadValuePickup,setLoadValuePickup] = useState(10);
	const [loadValueTransit,setLoadValueTransit] = useState(10);
	const [loadValueDelivered,setLoadValueDelivered] = useState(10);

	const [isLateFee, setIsLateFee] = useState(false);
  	const [lateFeeValue, setLateFeeValue] = useState(0);

	const [pickUpCount,setPickUpCount] = useState("");
	const [inTransitCount,setInTransitCount] = useState("");
	const [deliveredCount,setDeliveredCount] = useState("");
	const [transitLength,setTransitLength] =  useState("");
	const [deliveredLength,setDeliveredLength] = useState("");

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
    }

	const pickupCall = ()=>{Pickup()}
	const Pickup = () =>{
		
        let request = {
			buyer_dealer_id :userDetails.buyer_dealer_id,
			status: "Pickup",
			key: loadValuePickup
		}
		//console.log("check the value in transport", value)
		setTransportFlag("Pickup");

        API.post("transportDetails/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data.length)
			setPickUp(response.data.data)
			setLoadValuePickup(response.data.data.length>0 ? response.data.data.length+10 : 10)
			setLoading(false);
           
        });
	}

	const transitCall = ()=>{Transit()}
	const Transit = () =>{
		
        let request = {
			buyer_dealer_id :userDetails.buyer_dealer_id,
			status: "In Transit",
			key: loadValueTransit
		}
		setTransportFlag("In Transit");

        API.post("transportDetails/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data.length)
			setPickUp(response.data.data)
			setTransitLength(response.data.data.length)
			setLoadValueTransit(response.data.data.length>0 ? response.data.data.length+10 : 10)
			setLoading(false);
           
        });
	}
	
	const deliverCall = ()=>{Delivered()}
	const Delivered = () =>{
		
        let request = {
			buyer_dealer_id :userDetails.buyer_dealer_id,
			status: "Delivered",
			key: loadValueDelivered
        }
		setTransportFlag("Delivered");

        API.post("transportDetails/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data)
			setPickUp(response.data.data)
			setDeliveredLength(response.data.data.length)
			setLoadValueDelivered(response.data.data.length>0 ? response.data.data.length+10 : 10)
			setLoading(false);
           
        });
	}
	
	const TransportSearch = () =>{
		
		setVinError("")
		if(VINNumber.length>0 && VINNumber.length < 6){
		  setVinError("VIN number must have last 6 digit")
		  return;
		}
		else if(VINNumber.length > 6){
		 setVinError("VIN number accept only last 6 digit")
		 return;
	   }

        let request = {
			buyer_dealer_id: userDetails.buyer_dealer_id,
			make: make,
			model: model,
			year: year,
			vin_no: VINNumber,
			status:transportFlag
        }

        API.post("transportSearch/condition", request).then(response=>{

			console.log("pickup check the value", response.data.data)
			setPickUp(response.data.data);
			setTransit(response.data.data);
			setDelivered(response.data.data);
           
        });
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

	const countDetails = () =>{

		let request = {
			buyer_dealer_id : JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
		}
	  
		API.post("countDetails/condition", request).then(response=>{

			console.log(" count details check the value", response.data.data.pickedup_count)
			
			setPickUpCount(response.data.data.pickedup_count)
			setInTransitCount(response.data.data.intransit_count)
			setDeliveredCount(response.data.data.delivered_count)
		  
			
		});
	  }

	useEffect (() =>{

		getlateFee();
        Pickup();
		countDetails();
		
    }, []);

return (
	<div>
 {loading?<Loading/>:
    <main id="main" class="inner-page">

    <div id="transport" class="transport">
		<div class="container">
			<div class="section-title">
			  <h2>Transport</h2>
			</div>
		
			<div class="row">
            
			<div class="searchlistform col-lg-12">
				  <div class="searchblock">
						 <div class="form-group">
							 <label class="control-label" for="location">Year</label> 
							 <input class="form-control border-end-0" type="text"  id="location" placeholder="Enter Car Year"
							 onChange={(e) => setYear(e.target.value)}/>
						 </div>
  
						 <div class="form-group">
							 <label class="control-label" for="dealername">Make</label> 
							 <input class="form-control border-end-0" type="text"  id="dealername" placeholder="Enter Car Make"
							 onChange={(e) => setMake(e.target.value)}/>
						 </div>
  
						 <div class="form-group">
							 <label class="control-label" for="dealername">Model</label> 
							 <input class="form-control border-end-0" type="text"  id="dealername" placeholder="Enter Car Model"
							 onChange={(e) => setModel(e.target.value)}/>
						 </div>
  
						 <div class="form-group ">
							 <label class="control-label" for="date">VIN #</label> 
							 <input class="form-control border-end-0 " type="text"  id="date" placeholder="Enter Last 6 Digit"
							 onChange={(e) => setVINNumber(e.target.value)}/>
						  
						  </div>
  
						  <div class=" form-group searchbtn">
							<button  onClick={TransportSearch}><i class="bx bx-search"></i></button> 
						  </div>
  
						 <div class="errorMsgBox col-lg-12">
						   <p className="form-input-error" >{vinError}</p>                      
						</div>
					  </div>
					 
					  </div>
  
					  </div>

			<div class="tabsoptionblock col-lg-12">
				<ul class="tabs">
					<li class={`${tab1}`} onClick={()=>{tab("tab1");Pickup()}} >Pickup</li>
					<li class={`${tab2}`} onClick={()=>{tab("tab2");Transit()}} >In Transit</li>
					<li class={`${tab3}`} onClick={()=>{tab("tab3");Delivered()}} >Delivered</li>
				</ul>
			</div>
			{/* <div class="searchblock col-lg-12">
				<div class="input-group searchbox">
					<input class="form-control border-end-0 border" type="text" value="search" id="search-input"/>
					<span class="input-group-append">
						<button class="searchBtn" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
			</div> */}
			<div class="tab_container">
			
				<div id="tab1" style={{display:`${tab1 === ""? "none": "block"}`}} class="tab_content">
				{pickUp?.length>0 && transportFlag==="Pickup"? pickUp
            	.map((pickUp) =>   
					<div class="tab_container-block">
						<div class="row content col-lg-12">							
							<div class="col-lg-12 col-md-12">
								<div class="pickupdetailcontent">
									<h3>{pickUp.year} {pickUp.make} {pickUp.model}({pickUp.vin_no})  </h3>
									<h4>Inventory # - {pickUp.inventory_no}</h4>
								</div>						
							</div>							
						</div>
						<div class="row content col-lg-12">
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p class="billsalesno">Bill Of sale # {pickUp.bill_of_sales_id}</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">{pickUp.pickup_address},{pickUp.seller_state_name},{pickUp.seller_zipcode}</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Pending</p>
								</div>						
							</div>							
						</div>
					</div>):"No data found"}
					
					{pickUp?.length>=10 && transportFlag==="Pickup"? pickUp.slice(0,1)
            	.map(() =>   
					<div class="text-center">
						<a href="JavaScript:void(0)" onClick={pickupCall} class={pickUp.length !== pickUpCount ?"load-more-btn":""}>{pickUp.length !== pickUpCount ?"Load More":""}</a>
					</div>):""}
				</div>
				
				<div id="tab2" style={{display:`${tab2 === ""? "none": "block"}`}} class="tab_content">
				{pickUp?.length>0 && transportFlag==="In Transit"? pickUp
            	.map((pickUp) => 
						<div class="tab_container-block">
							<div class="row content col-lg-12">
								<div class="col-lg-4 col-md-4">
									<div class="modeldetails">
										<span>order#G86512</span>
										<span>Bill Of Sale # {pickUp.bill_of_sales_id}</span>
									</div>						
								</div>
								<div class="col-lg-4 col-md-4">
									<div class="modeldetail">
										<h3>{pickUp.year} {pickUp.make} {pickUp.model} ({pickUp.vin_no})</h3>
										<h4>Inventory # - {pickUp.inventory_no}</h4>
									</div>						
								</div>
								
								<div class="col-lg-4 col-md-4">
									<div class="modeldetailprice">
										<h3>Transport Price<span>$ {pickUp.transportation_charge !==null? (pickUp.transportation_charge) :0}</span></h3>
									</div>						
								</div>
							</div>
							
							
							<div class="row content col-lg-12">
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Transport Name</p>
										<p class="subhead">{pickUp.transport_name}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent ">
										<p>Transport phone</p>
										<p class="subhead">{pickUp.transport_phone_no}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Est.delivary</p>
										<p class="subhead">{pickUp.estimate_transpor_date?.substring(0,10)}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Pickup Point</p>
										<p class="subhead">{pickUp.pickup_address},{pickUp.seller_state_name},{pickUp.seller_zipcode}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Drop Point</p>
										<p class="subhead">{pickUp.dropPonit_address},{pickUp.buyer_city_name},{pickUp.buyer_zipcode}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Status</p>
										<p class="subheadstatus">Carrier Assigned</p>
									</div>						
								</div>
							</div>
						</div>):"No data found"}				
					

						{pickUp?.length>=10 && transportFlag==="In Transit"? pickUp.slice(0,1)
            	.map((pickUp) => 
					<div class="text-center">
						<a href="JavaScript:void(0)" onClick={transitCall} class={transitLength !== inTransitCount ?"load-more-btn":""}>{transitLength !== inTransitCount ?"Load More":""}</a>
					</div>):""}
				</div>
							
				<div id="tab3" style={{display:`${tab3 === ""? "none": "block"}`}} class="tab_content">
				{pickUp?.length>0 && transportFlag==="Delivered"? pickUp
            	.map((pickUp) => 
						<div class="tab_container-block">
							<div class="row content col-lg-12">
								<div class="col-lg-5 col-md-5">
									<div class="modeldetails">
										<span>order#G86512</span>
										<span>Bill Of Sale # {pickUp.bill_of_sales_id}</span>
									</div>						
								</div>
								<div class="col-lg-4 col-md-4">
									<div class="modeldetail">
										<h3> {pickUp.year} {pickUp.make} {pickUp.model} ({pickUp.vin_no})</h3>
										<h4>Inventory # - {pickUp.inventory_no}</h4>
									</div>						
								</div>
								<div class="col-lg-3 col-md-3">
									<div class="modeldetailprice">
										<h3>Transport Price<span>$ {pickUp.transportation_charge !==null? (pickUp.transportation_charge) :0}</span></h3>
									</div>						
								</div>
							</div>
							
							
							<div class="row content col-lg-12">
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Transport Name</p>
										<p class="subhead">{pickUp.transport_name}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent ">
										<p>Transport phone</p>
										<p class="subhead">{pickUp.transport_phone_no}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Est.delivary</p>
										<p class="subhead">{pickUp.estimate_transpor_date?.substring(0,10)}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Pickup Point</p>
										<p class="subhead">{pickUp.pickup_address},{pickUp.seller_state_name},{pickUp.seller_zipcode}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Drop Point</p>
										<p class="subhead">{pickUp.dropPonit_address},{pickUp.buyer_city_name},{pickUp.buyer_zipcode}</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Status</p>
										<p class="subheadstatus">Delivered</p>
									</div>						
								</div>
							</div>
						</div>):"No data found"}

						{pickUp?.length>=10 && transportFlag==="Delivered"? pickUp.slice(0,1)
            	.map((pickUp) =>   
					<div class="text-center">
						<a href="JavaScript:void(0)" onClick={deliverCall} class={deliveredLength !== deliveredCount ?"load-more-btn":""}>{deliveredLength !== deliveredCount ?"Load More":""}</a>
					</div>):""}
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

   
	{isLateFee && <Popup
                isClose={false}
                content={<>
                    <LateFee toggle={toggleLateFee} />
                </>}
                handleClose={toggleLateFee}
            />}

 

  </main>
  }
  </div>

)
}
export default Transport;