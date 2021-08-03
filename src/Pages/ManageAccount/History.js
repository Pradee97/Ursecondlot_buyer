import React from 'react';
import cars01 from '../../assets/img/cars01.png';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasolinePump.svg';
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';

const History = () => {
    return (

      <div>
      <main id="main" class="inner-page">
   
      <div id="historyPage" class="historyPage">
      <div class="container" >
        <div class="lotfeeblock col-lg-12">
          <div class="section-title">
            <h2>history</h2>
          </div>
          <div class="row content">
            
            <div class="col-lg-12 col-md-12 col-sm-12 historyblock">
            
                  <div class="hissearch">
                    <input type="text" class="form-control" placeholder="Search"/>
                    <i class="icofont-search"></i>
                  </div>
                  
                  
                  <div class="hisHead">
                    <p>250 Vehicles Purchased</p>
                    
                    <div class="sortBy">
                        <div class="col-sm-12 form-group mr-0 pr-0">  
                          <div class="tbox">			
                          <select id="" class="form-control box">
                            <option value="USA">Sort By</option>
                            <option value="USA">Sold Date</option>
                            <option value="USA">ACH Date</option>
                            <option value="USA">Title Status</option>
                            <option value="USA">Gate Pass Code</option>
                            <option value="USA">By Year</option>
                            <option value="USA">Make</option>
                            <option value="USA">Model</option>
                          </select>				
                          </div> 
                        </div>
                    </div>
                  </div>
                  
                  
            
              <div class="lotfee-inner col-lg-12">
                <div class="row">							
                  <div class="col-lg-4">
                    
                    <div class="car-item">
                    <div class="pickupdetailcontent">
                      <p class="billsalesno">Bill Of sale# 45876</p>
                    </div>
                      <div className="historyImg">
                        <img src={cars01} class="img-fluid" alt="..."/>
                        </div>
                        <div class="cars-tag">
                        <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">		
                        <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                          <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>
                          {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                          <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
                        </div>
                        
                        
                        
                        <div class="cars-prices invoice_link">
                          <a class="cta-btns" href="#">Inspection</a>
                          <a class="cta-btns invoice" href="#">Invoice</a>
                        </div>
                        <div class="cars-prices gatepass">
                          <a class="cta-btns-primary" href="#">Gate Pass Code B1256</a>
                        </div>
                        </div>
                      </div>
                    
                    
                  </div>
                  <div class="col-lg-4 sliderBlock">
                    <p>Purchased from <span>Used Car Dealer</span></p>
                    <h3>Vehicle Title</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li class="active">03/21/2021</li>
                      <li></li>
                      <li>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Transportation</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li class="active">03/21/2021</li>
                      <li></li>
                      <li>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Title status - <span> Awaiting Title</span></h3>
                    
                    <div class="cars-prices ">
                      <a class="cta-btns" href="#">Price - $1900</a>
                    </div>
                    
                    
                  </div>		
  
  
                  
                  <div class="col-lg-4 priceBlock">
                    <p class="date">Purchased on 03/28/2021</p>
                    
                    <div class="vehicleimgright col-lg-12">
                      <p class="editbtn"><a class="" href="#">Edit</a></p>
                      <h3>Vehicle Price + Lot Fee <span>$1900</span></h3>
                      <h4>Inspection <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <h4>Transportation <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <div class="vehiclerighttotal">
                        <h3>Total amount <span>$2,300</span></h3>
                      </div>
                    </div>
  
                  </div>
                </div>
              </div>
              
              
              <div class="lotfee-inner col-lg-12">
                <div class="row">							
                  <div class="col-lg-4">
                    
                    <div class="car-item">
                    <div class="pickupdetailcontent">
                      <p class="billsalesno">Bill Of sale# 45876</p>
                    </div>
                    <div className="historyImg">
                        <img src={cars01} class="img-fluid" alt="..."/>
                        </div>
                        <div class="cars-tag">
                        <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">		
                        <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                          <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                          <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
                        </div>
                        
                        
                        
                        <div class="cars-prices invoice_link">
                          <a class="cta-btns" href="#">Inspection</a>
                          <a class="cta-btns invoice" href="#">Invoice</a>
                        </div>
                        <div class="cars-prices gatepass">
                          <a class="cta-btns-primary" href="#">Gate Pass Code B1256</a>
                        </div>
                        </div>
                      </div>
                    
                    
                  </div>
                  <div class="col-lg-4 sliderBlock">
                    <p>Purchased from <span>Used Car Dealer</span></p>
                    <h3>Vehicle Title</h3>
                    
                    <form id="msform">
                   
                      <ul id="progressbar">
                      <li class="active">03/21/2021</li>
                      <li></li>
                      <li>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Transportation</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li class="active">03/21/2021</li>
                      <li></li>
                      <li>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Title status - <span> Awaiting Title</span></h3>
                    
                    <div class="cars-prices">
                      <a class="cta-btns" href="#">Price - $1900</a>
                    </div>
                    
                    
                  </div>		
  
  
                  
                  <div class="col-lg-4 priceBlock">
                    <p class="date">Purchased on 03/28/2021</p>
                    
                    <div class="vehicleimgright col-lg-12">
                      <p class="editbtn"><a class="" href="#">Edit</a></p>
                      <h3>Vehicle Price + Lot Fee <span>$1900</span></h3>
                      <h4>Inspection <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <h4>Transportation <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <div class="vehiclerighttotal">
                        <h3>Total amount <span>$2,300</span></h3>
                      </div>
                    </div>
  
                  </div>
                </div>
              </div>
              
              
              <div class="lotfee-inner col-lg-12">
                <div class="row">							
                  <div class="col-lg-4">
                    
                    <div class="car-item">
                    <div class="pickupdetailcontent">
                      <p class="billsalesno">Bill Of sale# 45876</p>
                    </div>
                    <div className="historyImg">
                        <img src={cars01} class="img-fluid" alt="..."/>
                        </div>
                        <div class="cars-tag">
                        <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">		
                        <h3><a href="#">Honda amaze (2014 model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                          <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                          <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>
                        </div>
                        
                        
                        
                        <div class="cars-prices invoice_link">
                          <a class="cta-btns" href="#">Inspection</a>
                          <a class="cta-btns invoice" href="#">Invoice</a>
                        </div>
                        <div class="cars-prices gatepass">
                          <a class="cta-btns-primary" href="#">Gate Pass Code B1256</a>
                        </div>
                        </div>
                      </div>
                    
                    
                  </div>
                  <div class="col-lg-4 sliderBlock">
                    <p>Purchased from <span>Used Car Dealer</span></p>
                    <h3>Vehicle Title</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li class="active">03/21/2021</li>
                      <li></li>
                      <li>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Transportation</h3>
                    
                    <form id="msform">
                   
                      <ul id="progressbar">
                      <li class="active">03/21/2021</li>
                      <li></li>
                      <li>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Title status - <span> Awaiting Title</span></h3>
                    
                    <div class="cars-prices">
                      <a class="cta-btns" href="#">Price - $1900</a>
                    </div>
                    
                    
                  </div>		
  
  
                  
                  <div class="col-lg-4 priceBlock">
                    <p class="date">Purchased on 03/28/2021</p>
                    
                    <div class="vehicleimgright col-lg-12">
                      <p class="editbtn"><a class="" href="#">Edit</a></p>
                      <h3>Vehicle Price + Lot Fee <span>$1900</span></h3>
                      <h4>Inspection <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <h4>Transportation <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <div class="vehiclerighttotal">
                        <h3>Total amount <span>$2,300</span></h3>
                      </div>
                    </div>
  
                  </div>
                </div>
              </div>
              
              
            
              
            </div>
            
          </div>
          <div><a class="load-more-btn" href="#">Load More</a></div>
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
    </div>
    )
}
export default History;