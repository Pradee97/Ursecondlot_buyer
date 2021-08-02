import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import cars01 from '../../assets/img/cars01.png';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasolinePump.svg';
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import lock from '../../assets/img/lock.svg';
import locked from '../../assets/img/locked.svg';
import Loading from '../../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import CarListAction from '../CarList/CarListAction';
import arrowmark from '../../assets/img/arrowmark.jpg';


const Favoritelist = () => {

  const history = useHistory();
  let userDetails = ls.get('userDetails');
  const [carFavInventoryDetail,setFavCarInventoryDetail]=useState("");
  const [loading,setLoading] = useState(true);
  const [favCarFlag,setFavCarFlag]=useState(false);
  const [data,setData]=useState("");
  const dispatch = useDispatch();
  const getFavCarList=()=>{

    let request={
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
    }

    console.log("request",request);
    API.post('BuyerFavoriteCarList/condition',request).then(res=>{
        setFavCarInventoryDetail(res.data.data);      
        console.log("Car Fav Inventory Detail",res.data.data);
        setLoading(false);
    }).catch(err=>{console.log(err);});
}
const redirectpage=(pathid,seller_dealer_id)=>{
  //e.preventDefault();
  console.log("seller_dealer_id+++++",seller_dealer_id)
  dispatch(CarListAction.sellerid(seller_dealer_id))
  history.push("/cardetail/"+pathid);
}
const addRemoveFavourite=(carid,state,flag)=>{
  console.log("inside addremove");

  let request={
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
      car_id:carid,
      active: !state
  }
  console.log("request",request);
  API.post('buyer_favourite/add',request).then(res=>{
      // setaddFavourite(res.data.data);
      console.log("add Fav Inventory Detail",res.data.data);

      if(flag==='fav'){
          setFavCarFlag(!favCarFlag)

      }
      
  })
}

useEffect(() => {
  getFavCarList();
},[favCarFlag]);


const OnSearch = (e) => {
  setData(e.target.value)
  console.log("/////////=====",e.target.value)
}

const onKeydowninSearch = (event) => {
  if (event.key === 'Enter') {
      // setCurrentPage(1)
      searchFav();
    }
}


const searchFav = () => {
  console.log("/////////",data)
  let request={
    buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
    data: data
      
  }
  API.post("BuyerFavoriteCarSearch/condition",request)
  .then((res)=>{
     
     setFavCarInventoryDetail(res.data.data);    
   
  },
  (error) => {
      console.log(error);
    }
  )
  .catch(err => { console.log(err); });
}

  return (
      <div>
        {loading?<Loading/>:
        <main id="main" class="inner-page">
        {/* <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
            </div> */}
          <div id="suggested-cars" class="suggested-cars">
            <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

              <div class="section-title">
                <h2>My Favorite Car List</h2>
              </div>
              <div class="col-lg-3">
					<div class="saveSearch"><button class="cta-btn" type="button">Save Search </button></div>
						<div class="leftonsidebox">
							<div class="filtersblock">
								<h3>Filters<span><a href="#">Reset</a></span></h3>
								<div class="input-group">
									<select id="vehiclename1"  class="form-control custom-select browser-default">
										<option value="Saved Search">Saved Search</option>
									</select>
								</div>
								
							</div>
							<div class="distanceBlock">
								<h4>Distance</h4>
								<div class="input-group">
								<input class="form-control" type="text" value="" placeholder="50km" />
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
										<label for="florida">Florida</label>
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

              <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
                <div className="input-group searchbox ">
                    <input type="text"  className="form-control border"  placeholder="model/make/year" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
                    <span className="input-group-append" >
                    <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchFav} ><i className='bx bx-search'></i></button>
                    </span>                                
                </div>
            </div>

              <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
              
              {carFavInventoryDetail.length>0?carFavInventoryDetail
              .map((item,index) =>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <div class="car-item">
                    <div class="cars-lock">
                    <img src={(item.isFavourite===0)? lock : locked}  onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'fav')} />
                    </div>
                        <img src={item.image} class="carImg" onClick={()=>{redirectpage(item.car_id,item.seller_dealer_id)}} alt="..." />
                        {item.isbestSale?
                        <div class="cars-tag">
                          <h4>Best deal</h4>
                        </div>:""}
                        <div class="cars-content">
                        <h3><a href="#">{item.make} ({item.model} model)</a></h3>
                        <div className="d-flex align-items-center mb-3">
							<p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
							<p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>    
						</div>
						<div className="d-flex align-items-center mb-3">
							<p className="details"><span>{item.dealer_type} </span></p>&nbsp;&nbsp;&nbsp;&nbsp;
							<p className="details"><img src={item.image}/></p>
						</div>

                        <div class="cars-prices">
                          <a class="cta-btns" href="#">${item.max_bid}</a>
                          <a class="cta-btns-primary" href="#">Make Bid</a>
                        </div>
                    </div>
                  </div>
                </div>  ):""}                                           
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
}
      </div>  
    )
}
export default Favoritelist;