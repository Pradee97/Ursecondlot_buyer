import React, { useState } from 'react';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';

const Transport = () => {

	const [tab1, setTab1] = useState("active")
	const [tab2, setTab2] = useState("")
	const [tab3, setTab3] = useState("")

	const tab = (selectedTab = "tab1") => {
		
		if (selectedTab==="tab1") {
			setTab1("active")
			setTab2("")
			setTab3("")
		}
		else if (selectedTab==="tab2") {
			setTab1("")
			setTab2("active")
			setTab3("")
		}else if (selectedTab==="tab3") {
			setTab1("")
			setTab2("")
			setTab3("active")
		}
    };

return (

    <main id="main" class="inner-page">

    <div id="transport" class="transport">
		<div class="container">
			<div class="section-title">
			  <h2>Transport</h2>
			</div>
		
			<div class="tabsoptionblock col-lg-12">
				<ul class="tabs">
					<li class={`${tab1}`} onClick={()=>tab("tab1")} >Pickup</li>
					<li class={`${tab2}`} onClick={()=>tab("tab2")} >In Transit</li>
					<li class={`${tab3}`} onClick={()=>tab("tab3")} >Delivered</li>
				</ul>
			</div>
			<div class="searchblock col-lg-12">
				<div class="input-group searchbox">
					<input class="form-control border-end-0 border" type="text" value="search" id="search-input"/>
					<span class="input-group-append">
						<button class="btn ms-n5" type="button"><i class="fa fa-search"></i></button>
					</span>
				</div>
			</div>
			<div class="tab_container">
	
				<div id="tab1" style={{display:`${tab1 === ""? "none": "block"}`}} class="tab_content">
					<div class="tab_container-block">
						<div class="row content col-lg-12">							
							<div class="col-lg-12 col-md-12">
								<div class="pickupdetailcontent">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
								</div>						
							</div>							
						</div>
						<div class="row content col-lg-12">
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p class="billsalesno">Bill Of sale# 45876</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Pending</p>
								</div>						
							</div>							
						</div>
					</div>
					
					<div class="tab_container-block">
						<div class="row content col-lg-12">							
							<div class="col-lg-12 col-md-12">
								<div class="pickupdetailcontent">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
								</div>						
							</div>							
						</div>
						<div class="row content col-lg-12">
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p class="billsalesno">Bill Of sale# 45876</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Pending</p>
								</div>						
							</div>							
						</div>
					</div>
					<div class="tab_container-block">
						<div class="row content col-lg-12">							
							<div class="col-lg-12 col-md-12">
								<div class="pickupdetailcontent">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
								</div>						
							</div>							
						</div>
						<div class="row content col-lg-12">
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p class="billsalesno">Bill Of sale# 45876</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4 bordercontent">
								<div class="pickupdetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Pending</p>
								</div>						
							</div>							
						</div>
					</div>
					<div class="text-center">
						<a href="#" class="load-more-btn">Load More</a>
					</div>
				</div>
				
				<div id="tab2" style={{display:`${tab2 === ""? "none": "block"}`}} class="tab_content">
						<div class="tab_container-block">
							<div class="row content col-lg-12">
								<div class="col-lg-5 col-md-5">
									<div class="modeldetails">
										<span>order#G86512</span>
										<span>Bill Of Sale#45876</span>
									</div>						
								</div>
								<div class="col-lg-4 col-md-4">
									<div class="modeldetail">
										<h3>Honda amaze(2014 model)</h3>
										<h4>UN14DF134WVQ149788</h4>
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
										<p class="subhead">Aoka transport</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent ">
										<p>Transport phone</p>
										<p class="subhead">(784)123-4651</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Est.delivary</p>
										<p class="subhead">03/29/2021</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Pickup Point</p>
										<p class="subhead">Fairway Ave, California, Cl 60425</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Drop Point</p>
										<p class="subhead">Horizon Ave, California, Cl 57862</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Status</p>
										<p class="subheadstatus">Carrier Assigned</p>
									</div>						
								</div>
							</div>
						</div>
					
					<div class="tab_container-block">
						<div class="row content col-lg-12">
							<div class="col-lg-5 col-md-5">
								<div class="modeldetails">
									<span>order#G86512</span>
									<span>Bill Of Sale#45876</span>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4">
								<div class="modeldetail">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
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
									<p class="subhead">Aoka transport</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent ">
									<p>Transport phone</p>
									<p class="subhead">(784)123-4651</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Est.delivary</p>
									<p class="subhead">03/29/2021</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Drop Point</p>
									<p class="subhead">Horizon Ave, California, Cl 57862</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Carrier Assigned</p>
								</div>						
							</div>
						</div>
					</div>
					
					<div class="tab_container-block">
						<div class="row content col-lg-12">
							<div class="col-lg-5 col-md-5">
								<div class="modeldetails">
									<span>order#G86512</span>
									<span>Bill Of Sale#45876</span>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4">
								<div class="modeldetail">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
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
									<p class="subhead">Aoka transport</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent ">
									<p>Transport phone</p>
									<p class="subhead">(784)123-4651</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Est.delivary</p>
									<p class="subhead">03/29/2021</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Drop Point</p>
									<p class="subhead">Horizon Ave, California, Cl 57862</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Carrier Assigned</p>
								</div>						
							</div>
						</div>
					</div>
					<div class="text-center">
						<a href="#" class="load-more-btn">Load More</a>
					</div>
				</div>
							
				<div id="tab3" style={{display:`${tab3 === ""? "none": "block"}`}} class="tab_content">
						<div class="tab_container-block">
							<div class="row content col-lg-12">
								<div class="col-lg-5 col-md-5">
									<div class="modeldetails">
										<span>order#G86512</span>
										<span>Bill Of Sale#45876</span>
									</div>						
								</div>
								<div class="col-lg-4 col-md-4">
									<div class="modeldetail">
										<h3>Honda amaze(2014 model)</h3>
										<h4>UN14DF134WVQ149788</h4>
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
										<p class="subhead">Aoka transport</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent ">
										<p>Transport phone</p>
										<p class="subhead">(784)123-4651</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Est.delivary</p>
										<p class="subhead">03/29/2021</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Pickup Point</p>
										<p class="subhead">Fairway Ave, California, Cl 60425</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Drop Point</p>
										<p class="subhead">Horizon Ave, California, Cl 57862</p>
									</div>						
								</div>
								<div class="col-lg-2 col-md-2 bordercontent">
									<div class="modeldetailcontent">
										<p>Status</p>
										<p class="subheadstatus">Delivered</p>
									</div>						
								</div>
							</div>
						</div>
					
					<div class="tab_container-block">
						<div class="row content col-lg-12">
							<div class="col-lg-5 col-md-5">
								<div class="modeldetails">
									<span>order#G86512</span>
									<span>Bill Of Sale#45876</span>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4">
								<div class="modeldetail">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
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
									<p class="subhead">Aoka transport</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent ">
									<p>Transport phone</p>
									<p class="subhead">(784)123-4651</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Est.delivary</p>
									<p class="subhead">03/29/2021</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Drop Point</p>
									<p class="subhead">Horizon Ave, California, Cl 57862</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Delivered</p>
								</div>						
							</div>
						</div>
					</div>
					
					<div class="tab_container-block">
						<div class="row content col-lg-12">
							<div class="col-lg-5 col-md-5">
								<div class="modeldetails">
									<span>order#G86512</span>
									<span>Bill Of Sale#45876</span>
								</div>						
							</div>
							<div class="col-lg-4 col-md-4">
								<div class="modeldetail">
									<h3>Honda amaze(2014 model)</h3>
									<h4>UN14DF134WVQ149788</h4>
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
									<p class="subhead">Aoka transport</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent ">
									<p>Transport phone</p>
									<p class="subhead">(784)123-4651</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Est.delivary</p>
									<p class="subhead">03/29/2021</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Pickup Point</p>
									<p class="subhead">Fairway Ave, California, Cl 60425</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Drop Point</p>
									<p class="subhead">Horizon Ave, California, Cl 57862</p>
								</div>						
							</div>
							<div class="col-lg-2 col-md-2 bordercontent">
								<div class="modeldetailcontent">
									<p>Status</p>
									<p class="subheadstatus">Delivered</p>
								</div>						
							</div>
						</div>
						
					</div>
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