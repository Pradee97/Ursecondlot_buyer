import React from 'react';
import { useState } from 'react';
import Popup from '../Component/Popup/Popup';
import Makeurbid from '../Pages/Makeurbid';
import lock from '../assets/img/lock.svg';
import cars01 from '../assets/img/cars01.png';
import speedometer from '../assets/img/speedometer.svg';
import gasolinePump from '../assets/img/gasolinePump.svg';
import arrowmark from '../assets/img/arrowmark.jpg';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';


const Search = () => {


const [isOpen, setIsOpen] = useState(false);

const togglePopup = () => {
	setIsOpen(!isOpen);
}

    return (

        <main id="main" class="inner-page">
		   
		<div id="vehiclesearch"class="vehiclesearch">
			<div class="container">
				<div class="section-title">
					<h2>Vehicle Search</h2> 
				</div>
			    <div class="row content">
					<div class="col-lg-3">
						<div class="leftonsidebox">
							<div class="filtersblock">
								<h3>Filters<span><a href="#">Reset</a></span></h3>
								<div class="input-group searchbox">
									<input class="form-control" type="text" value="" placeholder="Search" id="search-input"/>
									<span class="input-group-append">
										<button class="btn ms-n5" type="button">
										<i class="fa fa-search"></i>
									</button>
									</span>
								</div>
							</div>
							<div class="vehicleblock">
								<h4>Vehicle</h4>
								<div class="input-group">
									<select id="vehiclename1"  class="form-control custom-select browser-default">
										<option value="USA">Honda amaze (2014 model)</option>
									</select>
								</div>
								<div class="input-group">
									<select id="vehiclename2"  class="form-control custom-select browser-default">
										<option value="USA">Make</option>
									</select>
								</div>
							</div>
							
							<div class="sortbyblock">
								<h4>Sort by</h4>
								<div class="row">
									<div class="form-group input-group col-lg-6">
										<input type="checkbox" id="latest" />
										<label for="latest">Latest</label>
									</div>
									<div class="form-group input-group col-lg-6">
										<input type="checkbox" id="newest"/>
										<label for="newest">Newest</label>
									</div>
									<div class="form-group input-group col-lg-6">
										<input type="checkbox" id="oldest" />
										<label for="oldest">Oldest</label>
									</div>
									
									<div class="form-group input-group col-lg-6">
										<input type="checkbox" id="classic" />
										<label for="classic">Classic</label>
									</div>
								</div>
							</div>
						
						
							<div class="statesblock">
								<h4>States<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="form-group input-group">
										<input type="checkbox" id="florida"/>
										<label for="lorida">Florida</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="california"/>
										<label for="california">California</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="delaware"/>
										<label for="delaware">Delaware</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="newmexico"/>
										<label for="newmexico">New mexico</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="colorado"/>
										<label for="colorado">Colorado</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="washington"/>
										<label for="washington">Washington</label>
									</div>
								</div>
							</div>
							
							<div class="groupblock">
								<h4>Group<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="deals"/>
										<label for="deals">Deals Almost Close</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="sellersflo"/>
										<label for="sellersflo">Sellers I Follow</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="sellerstit"/>
										<label for="sellerstit">Seller Has Title</label>
									</div>
								</div>
							</div>
							
							<div class="salestypesblock">
								<h4>Sales Types<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="radio input-group">
										<input id="radio-any1" name="radio" type="radio" checked/>
										<label for="radio-any1" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-buy" name="radio" type="radio"/>
										<label  for="radio-buy" class="radio-label">Buy it now</label>
									</div>
									  
									<div class="radio input-group">
										<input id="radio-sales" name="radio" type="radio"/>
										<label  for="radio-sales" class="radio-label">Sealed Bid Sales</label>
									</div>
								</div>
							</div>
							
							<div class="lowerblock">
								<h4>Lower Engine Noice<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="radio input-group">
										<input id="radio-any2" name="radio" type="radio" checked/>
										<label for="radio-any2" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-nonoise" name="radio" type="radio"/>
										<label  for="radio-nonoise" class="radio-label">No Noise Detected</label>
									</div>
									  
									<div class="radio input-group">
										<input id="radio-noisedel" name="radio" type="radio"/>
										<label  for="radio-noisedel" class="radio-label">Noise Detected</label>
									</div>
								</div>
							</div>
							
							<div class="transmissionissblock">
								<h4>Transmission Issue<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="radio input-group">
										<input id="radio-any3" name="radio" type="radio" checked/>
										<label for="radio-any3" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-noissues" name="radio" type="radio"/>
										<label  for="radio-noissues" class="radio-label">No Issue Detected</label>
									</div>
									  
									<div class="radio input-group">
										<input id="radio-noissues2" name="radio" type="radio"/>
										<label  for="radio-noissues2" class="radio-label">Noise Detected</label>
									</div>
								</div>
							</div>
							
							<div class="vehiclehistoryblock">
								<h4>Vehicle History<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="radio input-group">
										<input id="radio-any4" name="radio" type="radio" checked/>
										<label for="radio-any4" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-noreport" name="radio" type="radio"/>
										<label  for="radio-noreport" class="radio-label">None reported</label>
									</div>
									  
									<div class="radio input-group">
										<input id="radio-noeventreport" name="radio" type="radio"/>
										<label  for="radio-nonoeventreport" class="radio-label">Events reported</label>
									</div>
								</div>
							</div>
							
							<div class="yearblock">
								<h4>Year<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="row">
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text" value="" id="from-input" placeholder="From"/>
										</div>
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text" value="" id="to-input" placeholder="To"/>
										</div>
									</div>
								</div>
							</div>
							
							<div class="mileageblock">
								<h4>Mileage<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="row">
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text" value="" id="from-mileage" placeholder="From"/>
										</div>
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text" value="" id="to-mileage" placeholder="To"/>
										</div>
									</div>
								</div>
							</div>
							
							<div class="makeblock">
								<h4>Make<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="chevrolet"/>
										<label for="chevrolet">Chevrolet</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="ford"/>
										<label for="ford">Ford</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="toyota"/>
										<label for="toyota">Toyota</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="dodge"/>
										<label for="dodge">Dodge</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="nissan"/>
										<label for="nissan">Nissan</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="honda"/>
										<label for="honda">Honda</label>
									</div>
									<div class="viewblock"><a href="#">View More</a></div>
								</div>
							</div>
							
							
							<div class="sellertypeblock">
								<h4>Seller Type<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="radio input-group">
										<input id="radio-any5" name="radio" type="radio" checked/>
										<label for="radio-any5" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-franchise" name="radio" type="radio"/>
										<label  for="radio-franchise" class="radio-label">Franchise</label>
									</div>
									  
									<div class="radio input-group">
										<input id="radio-independent" name="radio" type="radio"/>
										<label  for="radio-independent" class="radio-label">Independent</label>
									</div>
								</div>

							</div>
							
							<div class="dealershipblock">
								<h4>Dealership<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="radio input-group">
										<input id="radio-newdealer" name="radio" type="radio" cheid="car"></input>
										<label for="radio-newdealer" class="radio-label">New Car Dealer</label>
									</div>

									<div class="radio input-group">
										<input id="radio-useddealer" name="radio" type="radio"/>
										<label  for="radio-useddealer" class="radio-label">Used Car Dealer</label>
									</div>
								</div>
							</div>
							
							<div class="bodystyleblock">
								<h4>Body Style<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="car"/>
										<label for="car">Car</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="suv"/>
										<label for="suv">SUV</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="truck"/>
										<label for="truck">Truck</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="van"/>
										<label for="van">Van</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="minivan"/>
										<label for="minivan">Minivan</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="trailer"/>
										<label for="trailer">Trailer</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="rv"/>
										<label for="rv">RV</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="semi"/>
										<label for="semi">Semi</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="tractor"/>
										<label for="tractor">Tractor</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="semitractor"/>
										<label for="semitractor">Semi Tractor</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="other"/>
										<label for="other">Other</label>
									</div>
								</div>
							</div>
							
							<div class="transmissionblock">
								<h4>Transmission<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="manual"/>
										<label for="manual">Manual</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="automatic"/>
										<label for="automatic">Automatic</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="otherissues"/>
										<label for="otherissues">Other</label>
									</div>
								</div>
							</div>
							
							<div class="drivetrainblock">
								<h4>Drivetrain<span><a href="#"><img src={arrowmark}/></a></span></h4>
								<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="twdrive"/>
										<label for="twdrive">Two wheel Drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="fwdrive"/>
										<label for="fwdrive">Front Wheel drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="rwdrive"/>
										<label for="rwdrive">Rear Wheel Drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="fowdrive"/>
										<label for="fowdrive">Four Wheel Drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="awdrive"/>
										<label for="awdrive">All Wheel Drive</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-9">
						<div class="rightsideimg">
							<div id="search-cars" class="search-cars">
								<div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="200">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="300">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="400">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="500">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="600">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="700">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="800">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="900">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="1000">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="row aos-init aos-animate mt-3 pt-4" data-aos="zoom-in" data-aos-delay="1100">
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="#">Make Bid</a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-lg-4 col-md-3 col-sm-4 col-xs-6">
										<div class="car-item">
											<div class="cars-lock">
												<img src={lock} class="img-fluid" alt="..."/>
											</div>
											<img src={cars01} class="img-fluid" alt="..."/>
											<div class="cars-tag">
												<h4>Best deal</h4>
											</div>
											<div class="cars-content">		
											  <h3><a href="#">Honda amaze (2014 model)</a></h3>
												<div class="d-flex align-items-center mb-3">
												  <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
												  <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
												</div>
												
												<div class="cars-prices">
													<a class="cta-btns"  href="#">$1900</a>
													<a class="cta-btns-primary"  href="JavaScript:void(0)" onClick={togglePopup}>Make Bid</a>
												</div>
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

	{isOpen && <Popup
		isClose={false}
		content={<>
			<Makeurbid toggle={togglePopup} />
		</>}
		handleClose={togglePopup}
	/>}

 

  </main>
        
    )
}
export default Search;