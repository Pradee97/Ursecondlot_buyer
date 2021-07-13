import React from 'react';
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import checkmarkred from '../assets/img/checkmarkred.svg';
import checkmark from '../assets/img/checkmark.svg';
import iconarrowback from '../assets/img/ionic-ios-arrow-back.svg';
import car from '../assets/img/cars02.png';



const Inspection=()=>{

    return(
        <div>
            
            <main id="main" class="inner-page">
   
   
            <div id="inspectionsummery" class="inspectionsummery">
                <div class="container">
                
                <div class="back-btn">
                        <a class="back-btn-primary" href="#"><i class="bx bx-chevron-left"></i> Back</a>
                </div>
                <div class="inspectionsummeryblock col-lg-12">

                <div class="section-title">
                    <h2>Inspection Summary</h2>
                </div>
                <div class="inspectionsummeryhead ">
                    <h2>Honda Amaze (2014 Model)</h2>
                    <div class="row content">
                        <div class="col-lg-6 pt-4 pt-lg-0">
                            <p>Inspection Date & TIME:<span>06 jan 11.45pM </span></p>
                            <p>Inspection name:<span>Bruce willis</span></p>
                        </div>
                        <div class="col-lg-6 pt-4 pt-lg-0">
                            <p>Colour:<span>Metallic Blue</span></p>
                            <p>Vim:<span>UN14DF134WVQ149788</span></p>
                        </div>
                    </div>
                </div>
                    <div class="row content">
                    <div class="col-lg-12 pt-4 pt-lg-0 inspectiontableBlock">
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="2" scope="colgroup">Vehicle Operable<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr>
                        <td>Vehilcle is Disabled Need To Be Towed</td>
                        <td><span>Yes</span></td>
                        </tr>
                        </table>            
                    </div>
                    
                    <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Covered Power Train<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Covered Items</td>
                        <td>Covered</td>
                        <td>Not Covered</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>Engine Bottom End Noise</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Automatic Transmission Operation</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Transfer Case Operation</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Differential Operation</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    
                        <div class="commentsblock">
                        <h3>Covered Items Images/Videos</h3>
                        </div>
                        
                        <div class="coveredgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Mechanical<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>Engine Upper End</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Engine Bottom End</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Catalytic Converter Present</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Heater Runs Hot</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>A/c Runs Hot</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No Check Engine Light At Startup</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No Abs</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No SRS/Airbag Light</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Differential Operation</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        
                        </table>            
                    </div>
                    
                    <div class="commentsblock">
                        <h3>Mechanical Images</h3>
                        </div>
                        
                        <div class="mechanicalgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Tires & Wheels<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>5/32 Tread Depth</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Four Tires Condition</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Any Scratches On The Wheels</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    <div class="commentsblock">
                        <h3>Tires & Wheels Images</h3>
                        </div>
                        
                        <div class="tiresgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Exterior<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>No Visible Rust</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Colour Fade</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No Glass Damaged</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Exterior Scratches</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Side Mirror Damage</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    <div class="commentsblock">
                        <h3>Exterior Images</h3>
                        </div>
                        
                        <div class="exteriorgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Interior<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>No Visible Damage</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Frond Seat Conditions</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Back Seat Condition</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Major Visible Damage</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    <div class="commentsblock">
                        <h3>Interior Images</h3>
                        </div>
                        
                        <div class="interiorgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item"><img class="img-fluid" src={car}></img></div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Test Drive<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        <tr class="">
                        <td>Automatic Transmission</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Manual Transmission</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Exilator Level</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Breaking Senses</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Steering Controls</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Transfer Case</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Differential</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        
                        </table>            
                    </div>
                    <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy 
                    Text Ever Since The 1500S, Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500S,</p>
                    </div>
                    
                    
                    
                    
                    
                        
                    </div>
                </div>
            </div>
            
            
                </div>
                
            </div>

            
            
            <div class="inspectionbottom-back-btn">
                        <a class="back-btn-primary" href="#"><i class="bx bx-chevron-left"></i> Back</a>
            </div>

            
            <section id="playstoreBlock" class="playstoreBlock">
                <div class="container">


                <div class="row content">
                    <div class="col-lg-12">
                    <img src={appstore} ></img>
                    <img src={googleplay} ></img>
                    
                    </div>
                    
                </div>

                </div>
            </section>

            



            </main>


        </div>
    )
}
export default Inspection;