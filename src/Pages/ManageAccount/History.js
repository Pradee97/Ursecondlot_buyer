import React , {  useState, useEffect } from 'react';
import { useHistory} from "react-router-dom";
import ls from 'local-storage';
import API from "../../Services/BaseService";
import cars01 from '../../assets/img/cars01.png';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasolinePump.svg';
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';


 const History = () => {

  const history = useHistory();
  const userDetails=ls.get('userDetails');
  const [historyDetail,setHistoryDetail] = useState();
  const [feeDetails, setFeeDetails] = useState("");
  // const [historySearch,setHistorySearch] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [vinError,setVinError] = useState("");
  const [VINNumber, setVINNumber] = useState("");
  const [order,setOrder] = useState("");

  const redirecttoInspection=(pathid)=>{
    //   history.push("/Inspection/"+pathid);
    history.push({
      pathname: "/Inspection",
      state: {id:pathid},
      });
    }

    const redirecttoInvoice=(car_id,seller_dealer_id,price,pathid)=>{
      //   history.push("/Inspection/"+pathid);
      history.push({
        pathname: "/Invoice",
        state: {car_id,sellerDealerID:seller_dealer_id,vechileprice:price}

        });
        console.log ("hi",price);
      }
  

  const historyDetails = () =>{

    let request = {
        buyer_dealer_id :userDetails.buyer_dealer_id,
    }

    API.post("historyDetails/condition", request).then(response=>{

        console.log("history check the value", response.data.data)
        setHistoryDetail(response.data.data)
    });

}

useEffect (() =>{
  historyDetails()
}, []);

const searchCarDetail = () => {
  setVinError("")
 if(VINNumber.length>0 && VINNumber.length < 6){
   setVinError("VIN number must have last 6 digit")
   return;
 }
 else if(VINNumber.length > 6){
  setVinError("VIN number accept only last 6 digit")
  return;
}

      let request={
      buyer_dealer_id: userDetails.buyer_dealer_id,
      make: make,
      model: model,
      year: year,
      vin_no: VINNumber,

      }
        API.post("historySearch/condition", request).then(response=>{

          console.log("history Search", response.data.data)
          setHistoryDetail(response.data.data)
          // setHistorySearch(response.data.data)
        }); 
  
}

  const historyOrder =() =>{
      let request={
        buyer_dealer_id: userDetails.buyer_dealer_id,
          order:order,

      }
        API.post("historyOrder/condition", request).then(response=>{

        console.log("history Order", response.data.data)
        setHistoryDetail(response.data.data)
        // setHistorySearch(response.data.data)
        });
  }


useEffect (() =>{
  historyOrder()
}, [order]);


async function fetchBuyerFees() {
  let request = {
      type: "Buyer"
  };
  const state = API.post('fees/condition', request);
  state.then(res => {
      console.log("res", res)
      setFeeDetails(res.data.data);
    
  })
      .catch(err => { console.log(err); });
}
useEffect(() => {
  fetchBuyerFees();
}, []);

const getFeeDetails = (maxPrice) =>{
 
  return feeDetails.length > 0 ? feeDetails
      .filter((data)=> 
     
      {
          const range = data.fee_price.replaceAll('$',"").split("-")
         
          if(range[1]!=="up"){
             
              return Number(range[0]) <= Number(maxPrice) && Number(maxPrice)  <= Number(range[1]) 
          }
          else{
              return Number(range[0]) <= Number(maxPrice) 
          }

          } 
          )[0]?.fee || 0
      : 0
}

    return (

      <div>
      <main id="main" class="inner-page">
   
      <div id="historyPage" class="historyPage">
      <div class="container" >
        <div class="lotfeeblock col-lg-12">
          <div class="section-title">
            <h2>history</h2>
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
                           <label class="control-label" for="date">VIN No</label> 
                           <input class="form-control border-end-0 " type="text"  id="date" placeholder="Enter Last 6 Digit"
                           onChange={(e) => setVINNumber(e.target.value)}/>
                        
                        </div>

                        <div class=" form-group searchbtn">
                           {/*<img src={searchicon} onClick={searchCarDetail}/>*/}
                          <button  onClick={searchCarDetail}><i class="bx bx-search"></i></button> 
                        </div>

                        </div>

                       <div class="errorMsgBox col-lg-12">
                       <p className="form-input-error" >{vinError}</p>

               </div>

                  {/* <div class="hissearch">
                    <input type="text" class="form-control" placeholder="Search"/>
                    <i class="icofont-search"></i>
                  </div> */}
                  
                  
                  <div class="hisHead">
                    <p>250 Vehicles Purchased</p>
                    
                    <div class="sortBy">
                        <div class="col-sm-12 form-group mr-0 pr-0">  
                          <div class="tbox">			
                          <select id="" class="form-control box"  onChange={(e) => setOrder(e.target.value)}>
                            <option value="USA">Sort By</option>
                            <option value="USA">Sold Date</option>
                            <option value="USA">ACH Date</option>
                            <option value="USA">Title Status</option>
                            <option value="USA">Gate Pass Code</option>
                            {/* <option value="USA">By Year</option>
                            <option value="USA">Make</option>
                            <option value="USA">Model</option> */}
                          </select>				
                          </div> 
                        </div>
                    </div>
                  </div>
                  
                  
            {historyDetail?.length>0? historyDetail
            .map((historyDetail) =>   
              <div class="lotfee-inner col-lg-12">
                <div class="row">							
                  <div class="col-lg-4">
                    
                    <div class="car-item">
                    <div class="pickupdetailcontent">
                      <p class="billsalesno">Bill Of sale# 45876</p>
                    </div>
                      <div className="historyImg">
                        <img src={historyDetail.image} class="img-fluid" alt="..."/>
                        </div>
                        <div class="cars-tag">
                        <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">		
                        <h3><a href="#">{historyDetail.make} ({historyDetail.model} model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                          <p class="details"><img src={speedometer}  alt=""/><span>{historyDetail.miles} m</span></p>
                          {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                          <p class="details"><img src={gasolinePump} alt=""/><span>{historyDetail.fuel_type}</span></p>
                        </div>
                        
                        
                        
                        <div class="cars-prices invoice_link">
                          <a class="cta-btns" href="JavaScript:void(0)" onClick={()=>redirecttoInspection(historyDetail.car_id)}>Inspection</a>
                          <a class="cta-btns invoice" href="JavaScript:void(0)" onClick={()=>redirecttoInvoice(historyDetail.car_id,historyDetail.seller_dealer_id,historyDetail.price)}>Invoice</a>
                        </div>
                        <div class="cars-prices gatepass">
                          <a class="cta-btns-primary" href="#">Gate Pass Code B1256</a>
                        </div>9
                        </div>
                      </div>
                    
                    
                  </div>
                  <div class="col-lg-4 sliderBlock">
                    <p>Purchased from <span>Used Car Dealer</span></p>
                    <h3>Vehicle Title</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li className={historyDetail.title_status ==1 ? "active" : ""}>03/21/2021</li>
                      <li className={historyDetail.title_status ==2 ? "active" : ""}></li>
                      <li className={historyDetail.title_status ==3 ? "active" : ""}>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Transportation</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li className={historyDetail.transportation_status ==1 ? "active" : ""}>03/21/2021</li>
                      <li className={historyDetail.transportation_status ==2 ? "active" : ""}></li>
                      <li className={historyDetail.transportation_status ==3 ? "active" : ""}>ETA-03/29/2021</li>
                      </ul>
                      
                      
                    </form>
                    
                      <h3>Title status - <span> {historyDetail.vehicle_type}</span></h3>
                    
                    <div class="cars-prices ">
                      <a class="cta-btns" href="#">Price - $ {historyDetail.price}</a>
                    </div>
                    
                    
                  </div>		
  
  
                  
                  <div class="col-lg-4 priceBlock">
                    <p class="date">Purchased on 03/28/2021</p>
                    
                    <div class="vehicleimgright col-lg-12">
                      <p class="editbtn"><a class="" href="#">Edit</a></p>
                      <h3>Vehicle Price + Lot Fee <span>$ {historyDetail.price}</span></h3>
                      <h4>Inspection <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <h4>Transportation <span>$100</span></h4>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      
                      <div class="vehiclerighttotal">
                        <h3>Total amount <span>$ {(Number(historyDetail.price) || 0) +  100 + 100}</span></h3>
                      </div>
                    </div>
  
                  </div>
                </div>
              </div>)
                    :""}
              
              
              {/* <div class="lotfee-inner col-lg-12">
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
              </div> */}
              
              
              {/* <div class="lotfee-inner col-lg-12">
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
              </div> */}
              
              
            
              
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