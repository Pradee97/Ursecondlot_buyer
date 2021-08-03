import React from 'react';
import speedometer from '../assets/img/speedometer.svg';
import gasolinePump from '../assets/img/gasolinePump.svg';
import car from '../assets/img/car.svg';
import persent from '../assets/img/persent.svg';
import roadwithBrokenLine from '../assets/img/roadwithBrokenLine.svg';
import carbrid from '../assets/img/carbrid.jpg';
import Path from '../assets/img/Path.svg';
import carshonda from '../assets/img/carshonda.jpg';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';

const MyBids = () => {
    return (

        <main id="main" class="inner-page">
   
        
        <div id="mybids" class="mybids">
            <div class="container">
                <div class="mybidsblock col-lg-12">
    
                    <div class="section-title">
                      <h2>My Bids</h2>
                    </div>
    
                    <div class="row mybidsheader">
                            <div class="col-lg-3">
                                <h5>Vehicle</h5>
                            </div>
                            <div class="col-lg-3">
                                <h5>Seller</h5>
                            </div>
                            
                            <div class="col-lg-2">
                                <h5>Best Bid</h5>
                            </div>
                            
                            <div class="col-lg-2">
                                <h5>Buy Now</h5>
                            </div>
                            <div class="col-lg-2">
                                <h5>Control Your Bid</h5>
                            </div>
                    </div>
    
                    <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4></h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
                            </div>
                        </div>
                    </div>	
                    
                    
                    <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4>$3500</h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-accept" href="#">Accept Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
                            </div>
                        </div>
                    </div>	
                    
                    <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4></h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
                            </div>
                        </div>
                    </div>	
                    
                    
                    <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4>$3500</h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-accept" href="#">Accept Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4></h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
                            </div>
                        </div>
                    </div>	
                    
                    
                    <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4>$3500</h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-accept" href="#">Accept Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
                            </div>
                        </div>
                    </div>
                    
                        <div class="row mybidsdetailsblock">
                        <div class="col-lg-3 mybidsvehicledetails">
                            <div class="mybidsleftvehicle">
                                <img src={carbrid} class="img-fluid" alt="..."/>
                            </div>
                            <div class="mybidsrightvehicle">
                                <h3>Honda amaze (2014 model)</h3>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={speedometer}  alt=""/><span>31,1241 m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={gasolinePump} alt=""/><span>Diesel</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                                <p class="details"><img src={car} alt=""/><span>UN14DF134WVQ149788</span></p>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 mybidssellerdetails">
                            <div class="mybidsleftseller">
                                <h3>Used Car Dealer</h3>
                                <p class="details"><img src={Path} alt=""/><span>Fairview Ave, El Monte</span></p>
                                <div class="d-flex align-items-center">
                                    <p class="details"><img src={persent}  alt=""/><span>15%</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <p class="details"><img src={roadwithBrokenLine} alt=""/><span>2.5M</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                            <div class="mybidsrightseller">
                                <img src={carshonda} class="img-fluid" alt="..."/>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbiddetails">
                            <div class="mybidsbid">
                                <h4>$1500</h4>
                                <p>Car seller</p>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidsbuynowdetails">
                            <div class="mybidsuynow">
                                <h4>$3500</h4>
                            </div>
                        </div>
                        
                        <div class="col-lg-2 mybidscontroldetails">
                            <div class="mybidscontrol">
                                <li><a class="control-btns" href="#">Raise Bid</a></li>
                                <li><a class="control-btns-accept" href="#">Accept Bid</a></li>
                                <li><a class="control-btns-cancel" href="#">Cancel bid</a></li>
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
    
       
    
     
    
      </main>
        
    )
}
export default MyBids;