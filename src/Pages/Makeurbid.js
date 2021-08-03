import React from 'react';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';

const MakeurBid=()=>{
    return(
        <div>
          
             
                <div id="makeyourbid" class="makeyourbid">
                    <div class="container">
                        <div class="makeyourbidblock col-lg-12">
                            <div class="section-title">
                                <h2>Make Your Bid</h2>
                            </div>
                    
                            <div class="border-block"></div>
                            <p class="border-bottomtext">Your bid can't be Lower than $12500</p>
                            <div class="row content">			
                            <div class="form-group col-lg-6 col-md-6">
                                <div class="input-icon">
                                    <input type="text" class="form-control" placeholder="Place your bid"></input>
                                    <i>$</i>
                                </div>
                            </div>
                            <div class="form-group col-lg-6 col-md-6">
                                <h2>Buyer Fee</h2>
                            </div>
                            
                            <div class="form-group col-lg-6 col-md-6">
                                <div class="input-icon">
                                    <input type="text" class="form-control" placeholder="Max Bid(Optional)"></input>
                                    <i>$</i>
                                </div>
                            </div>
                            
                           
                            <div className="col-lg-6 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb3" />
                                        <label htmlFor="chb3" className="form-check-label">Display Max Bid To Seller  </label>                               
                                    </div>

                           

                            
                            <div class="form-group col-lg-12 col-md-12">				
                                <input type="text" class="form-control" placeholder="Add a Commend (Optional)"></input>
                            </div>
                                <div class=" col-lg-12 col-md-12">
                                    <div class="optional-services row">
                                    <h4 class=" col-lg-12">Optional Services</h4>

                                    <div className="col-lg-6 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb2" />
                                        <label htmlFor="chb2" className="form-check-label">Transportation  </label>                               
                                    </div>

                                    <div className="col-lg-6 form-group">
                                        <span>$300 </span>                              
                                    </div>

                                    <div className="col-lg-12 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb1" />
                                        <label htmlFor="chb1" className="form-check-label"> Save this option for next purchase  </label>                               
                                    </div>

                                    
                                </div>
                                </div>
                    
                            <div class=" col-lg-12 policylink">
                                <a href="#">Policy document</a>
                            </div>
                            
                            <div class="col-lg-12 makeyourbid-btn">
                                <a class="makeyourbid-cancle-btns" href="/carlist">Cancel</a>
                                <a class="makeyourbid-send-btns" href="#">Send Bid</a>
                            </div>
                    </div>
                    
                </div>
                </div>
            </div>           
           
    </div>

    )
}
export default MakeurBid;