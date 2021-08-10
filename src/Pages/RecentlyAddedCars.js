import React from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import lock from '../../src/assets/img/lock.svg';
import locked from '../../src/assets/img/locked.svg';
import Loading from '../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import CarListAction from './CarList/CarListAction';
import arrowmark from '../../src/assets/img/arrowmark.jpg';

const RecentlyAddedCars = () => {

const history = useHistory();
const [carDetail ,setCarDetail] = useState([]);
const [recentCarFlag,setrecentCarFlag]=useState(false);
const [loading,setLoading] = useState(true);
const [data,setData]=useState("");
const dispatch = useDispatch();
const [dealerShip,setDealerShip] = useState("");
const [fromYear,setFromYear] = useState("");
const [toYear,setToYear] = useState("");
const [fromMileage,setFromMIleage]=useState("");
const [toMileage,setToMileage]=useState("");
const [stateSearch,setStateSearch]=useState([]);
const [makeSearch,setMakeSearch]=useState([]);
const [transmissionSearch,setTransmissionSearch]=useState([]);
const [drivetrainSearch,setDriveTrainSearch]=useState([]);
const [bodyTypeSearch,setBodyTypeSearch] = useState([]);
const [engineNoiseSearch,setEngineNoiseSearch]=useState("");
const [transmissionIssueSearch,setTransmissionIssueSearch]=useState("");
const [historySearch,setHistorySearch]=useState("");
const [groupSearch,setGroupSearch]=useState([]);
const [salesTypeSearch,setSalesTypeSearch]=useState("");
const [stateSearchToggle,setStateSearchToggle] = useState(0);
const [groupSearchToggle,setGroupSearchToggle] = useState(0);
const [salesTypesSearchToggle,setSalesTypesSearchToggle] = useState(0);
const [lowerEngineNoiceSearchToggle,setLowerEngineNoiceSearchToggle] = useState(0);
const [transmissionIssueSearchToggle,setTransmissionIssueSearchToggle] = useState(0);
const [vehicleHistorySearchToggle,setVehicleHistorySearchToggle] = useState(0);
const [yearSearchToggle,setYearSearchToggle] = useState(0);
const [mileageSearchToggle,setMileageSearchToggle] = useState(0);
const [makeSearchToggle,setMakeSearchToggle] = useState(0);
const [sellerTypeSearchToggle,setSellerTypeSearchToggle] = useState(0);
const [dealershipSearchToggle,setDealershipSearchToggle] = useState(0);
const [bodyStyleSearchToggle,setBodyStyleSearchToggle] = useState(0);
const [transmissionSearchToggle,setTransmissionSearchToggle] = useState(0);
const [driveTrainSearchToggle,setDriveTrainSearchToggle] = useState(0);


    const getrecentCarList=()=>{

        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }

        API.post('BuyerNewCarList/condition',request).then(res=>{
            console.log("response",res.data.data);
           // const {results} = res.data.data;
            console.log("Response data",res.data.data);
            //if(results.length>0){
            setCarDetail(res.data.data);
            console.log("car Detail",res.data.data);
            setLoading(false);
            //}
        }).catch(err => { console.log(err); });
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

            if(flag==='recent'){
                setrecentCarFlag(!recentCarFlag)
            }
        })
    }

    useEffect(() => {
        getrecentCarList();
       
    },[recentCarFlag]);

    useEffect(()=>{
		if(fromYear.length>=4){
			searchCarDetail();
		}
		
	},[fromYear]);

	useEffect(()=>{
		if(toYear.length>=4){
			searchCarDetail();
		}
	},[toYear]);

	

	useEffect(()=>{
		console.log("State updated with value selected from check box", makeSearch);
		console.log("driveTrain selected",drivetrainSearch);
		console.log("Transmission selected",transmissionSearch);
		console.log("From Mileage",fromMileage);
		console.log("To Mileage",toMileage);
		searchCarDetail();
	},[fromMileage,toMileage,makeSearch,drivetrainSearch,transmissionSearch,stateSearch,bodyTypeSearch,groupSearch,dealerShip,salesTypeSearch,historySearch,transmissionIssueSearch,engineNoiseSearch]);


	function concatMakeSearch  (e){
		console.log("values passed",e);
		console.log("selected chec box valuue",e.target.value)
        if(e.target.checked)
			setMakeSearch(makeSearch=>[...makeSearch,"'"+e.target.value+"'"]);
		else if (!e.target.checked)
			{
				setMakeSearch(makeSearch.filter(item => item!== "'"+e.target.value+"'" ));
			
			}


		
	}

	
	function concatTransmissionSearch  (e){
		console.log("values passed",e);
		console.log("selected  transmission chec box valuue",e.target.value)
		if(e.target.checked){
		setTransmissionSearch(transmissionSearch=>[...transmissionSearch,"'"+e.target.value+"'"]);
		}
		else if (!e.target.checked)
		{
			setTransmissionSearch(transmissionSearch.filter(item => item!== "'"+e.target.value+"'" ));
		
		}
		
	}

	
	function concatDriveTrainSearch  (e){
		console.log("values passed",e);
		console.log("selected chec box valuue",e.target.value)
		if(e.target.checked){
		setDriveTrainSearch(drivetrainSearch=>[...drivetrainSearch,"'"+e.target.value+"'"]);
		}
		else if (!e.target.checked)
		{
			setDriveTrainSearch(drivetrainSearch.filter(item => item!== "'"+e.target.value+"'" ));

		}
		
	}

	function concatStateSearch  (e){
		console.log("state=======",stateSearch)
		console.log("values passed",e);
		console.log("selected chec box valuue",e.target.value)
		if(e.target.checked){
		setStateSearch(stateSearch=>[...stateSearch,"'"+e.target.value+"'"]);
		console.log("selected chec box valuue",e.target.value)
		
		}
		else if (!e.target.checked)
		{
			setStateSearch(stateSearch.filter(item => item!== "'"+e.target.value+"'" ));
			
		}
		
	}

	function concatBodyTypeSearch  (e){
		console.log("state=======",bodyTypeSearch)
		console.log("values passed",e);
		console.log("selected chec box valuue",e.target.value)
		if(e.target.checked){
		setBodyTypeSearch(bodyTypeSearch=>[...bodyTypeSearch,"'"+e.target.value+"'"]);
		console.log("selected chec box valuue",e.target.value)
		
		}
		else if (!e.target.checked)
		{
			setBodyTypeSearch(bodyTypeSearch.filter(item => item!== "'"+e.target.value+"'" ));
			
		}
		
	}

    const OnSearch = (e) => {
        setData(e.target.value)
        console.log("/////////=====",e.target.value)
      }
      
   
      
      const searchCarDetail = () => {
        
		let request={
			buyer_dealer_id:JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
			model:bodyTypeSearch.length>0?bodyTypeSearch:"",
			make:makeSearch.length>0?makeSearch:"",
			dealer_type:dealerShip,
			transmission:transmissionSearch.length>0?transmissionSearch:"",
			drivetrain:drivetrainSearch.length>0?drivetrainSearch:"",
			state:stateSearch.length>0?stateSearch:"",
			fromMileage:fromMileage,
			toMileage:toMileage,
			fromYear:fromYear,
			toYear:toYear,
			group:groupSearch.length>0?groupSearch:"",
			engine_noise:engineNoiseSearch,
			transmission_issue:transmissionIssueSearch,
			history:historySearch,
			sales_type:salesTypeSearch
			
			}
			console.log("state=======",stateSearch)
			console.log(" filter search request",request);

        API.post("BuyerNewCarSearch/condition",request)
        .then((res)=>{
		   
			
            setCarDetail(res.data.data);
         
        },
        (error) => {
            console.log(error);
          }
        )
        .catch(err => { console.log(err); });
	  }
	  
	  function onDealerShipClick(e){
		console.log("event value++++++",e.target.value)
		setDealerShip(e.target.value);
		searchCarDetail()
	  }

	  function onTransmissionIssueClick(e){
		console.log("Transmission issue selected value",e.target.value);
		setTransmissionIssueSearch(e.target.value);
		searchCarDetail();
	}
	function onSaleTypeClick(e){
	   console.log("Sale Type selected value",e.target.value);
	   setSalesTypeSearch(e.target.value);
	   searchCarDetail();
   }
   function onHistoryClick(e){
	   console.log("History Search selected value",e.target.value);
	   setHistorySearch(e.target.value);
	   searchCarDetail();
   }
   function onEngineNoiseClick(e){
	   console.log("Engine Noise selected value",e.target.value);
	   setEngineNoiseSearch(e.target.value);
	   searchCarDetail();
   }
   function onGroupClick(e){
	   console.log("Group selected value",e.target.value);
	   if(e.target.checked)
	   setGroupSearch(groupSearch=>[...groupSearch,"'"+e.target.value+"'"]);
	   else if (!e.target.checked)
	   {
		   setGroupSearch(groupSearch.filter(item => item!== "'"+e.target.value+"'" ));
	   
	   }
   }

   function toggleStateSearch(){
	console.log("Show/Hide",!stateSearchToggle);
	setStateSearchToggle(!stateSearchToggle)
}


	
function toggleGroupSearch(){
	console.log("Show/Hide",!groupSearchToggle);
	setGroupSearchToggle(!groupSearchToggle)
}



function toggleSalesTypesSearch(){
console.log("Show/Hide",!salesTypesSearchToggle);
setSalesTypesSearchToggle(!salesTypesSearchToggle)
}



function toggleLowerEngineNoiceSearch(){
console.log("Show/Hide",!lowerEngineNoiceSearchToggle);
setLowerEngineNoiceSearchToggle(!lowerEngineNoiceSearchToggle)
}



function toggleTransmissionIssueSearch(){
console.log("Show/Hide",!transmissionIssueSearchToggle);
setTransmissionIssueSearchToggle(!transmissionIssueSearchToggle)
}



function toggleVehicleHistorySearch(){
console.log("Show/Hide",!vehicleHistorySearchToggle);
setVehicleHistorySearchToggle(!vehicleHistorySearchToggle)
}



function toggleYearSearch(){
console.log("Show/Hide",!yearSearchToggle);
setYearSearchToggle(!yearSearchToggle)
}



function toggleMileageSearch(){
console.log("Show/Hide",!mileageSearchToggle);
setMileageSearchToggle(!mileageSearchToggle)
}




function toggleMakeSearch(){
console.log("Show/Hide",!makeSearchToggle);
setMakeSearchToggle(!makeSearchToggle)
}



function toggleSellerTypeSearch(){
console.log("Show/Hide",!sellerTypeSearchToggle);
setSellerTypeSearchToggle(!sellerTypeSearchToggle)
}



function toggleDealershipSearch(){
console.log("Show/Hide",!dealershipSearchToggle);
setDealershipSearchToggle(!dealershipSearchToggle)
}




function toggleBodyStyleSearch(){
console.log("Show/Hide",!bodyStyleSearchToggle);
setBodyStyleSearchToggle(!bodyStyleSearchToggle)
}



function toggleTransmissionSearch(){
	console.log("Show/Hide",!transmissionSearchToggle);
	setTransmissionSearchToggle(!transmissionSearchToggle)
}


	
function toggleDriveTrainSearch(){
console.log("Show/Hide",!driveTrainSearchToggle);
setDriveTrainSearchToggle(!driveTrainSearchToggle)
}

    return(
        <div>
            {loading?<Loading/>:
             <main id="main" className="inner-page carList">
            
             <div id="recently-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                        <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
            </div>
            
            <div class="col-lg-3">
					
						<div class="leftonsidebox">
							<div class="filtersblock">
								<h3>Filters<span><a href="#">Reset</a></span></h3>
								
								
							</div>
							
							
							{/* <div class="sortbyblock">
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
							</div> */}
						
						
						<div class="statesblock">
								<h4>States<span ><img   onClick={toggleStateSearch} src={arrowmark}/></span></h4>
								{stateSearchToggle?(<div class="inner">
									<div class="form-group input-group">
										<input type="checkbox" id="florida" value="florida" onClick={concatStateSearch}/>
										<label for="florida">Florida</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="california" value="california" onClick={concatStateSearch}/>
										<label for="california">California</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="delaware" value="delaware" onClick={concatStateSearch}/>
										<label for="delaware">Delaware</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="newmexico" value="newmexico" onClick={concatStateSearch}/>
										<label for="newmexico">New mexico</label>           
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="colorado" value="colorado" onClick={concatStateSearch}/>
										<label for="colorado">Colorado</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="washington" value="washington" onClick={concatStateSearch}/>
										<label for="washington">Washington</label>
									</div>
								</div>):""}
							</div>
							
							<div class="groupblock">
								<h4>Group<span><img onClick={toggleGroupSearch} src={arrowmark}/></span></h4>
								{groupSearchToggle?(<div class="inner">
											<div class="form-group input-group ">
												<input type="checkbox" id="deals" value="Deals Almost Close" onClick={onGroupClick}/>
												<label for="deals">Deals Almost Close</label>
											</div>
											<div class="form-group input-group ">
												<input type="checkbox" id="sellersflo" value="Sellers I Follow" onClick={onGroupClick}/>
												<label for="sellersflo">Sellers I Follow</label>
											</div>
											<div class="form-group input-group ">
												<input type="checkbox" id="sellerstit" value="Seller Has Title" onClick={onGroupClick}/>
												<label for="sellerstit">Seller Has Title</label>
											</div>
										</div>
								):""}
							</div>
							
							<div class="salestypesblock">
								<h4>Sales Types<span><img onClick={toggleSalesTypesSearch} src={arrowmark}/></span></h4>
								{salesTypesSearchToggle?(<div class="inner">
										<div class="radio input-group">
											<input id="radio-any1" name="salesTypesRadio" type="radio" value="Any" onClick={onSaleTypeClick}/>
											<label for="radio-any1" class="radio-label">Any</label>
										</div>

										<div class="radio input-group">
											<input id="radio-buy" name="salesTypesRadio" type="radio" value="Buy it now" onClick={onSaleTypeClick}/>
											<label  for="radio-buy" class="radio-label">Buy it now</label>
										</div>
											
										<div class="radio input-group">
											<input id="radio-sales" name="salesTypesRadio" type="radio" value="Sealed Bid Sales" onClick={onSaleTypeClick}/>
											<label  for="radio-sales" class="radio-label">Sealed Bid Sales</label>
										</div>
									</div>
								):""}
							</div>
							
							<div class="lowerblock">
								<h4>Lower Engine Noice<span><img onClick={toggleLowerEngineNoiceSearch} src={arrowmark}/></span></h4>
								{lowerEngineNoiceSearchToggle?(<div class="inner">
										<div class="radio input-group">
											<input id="radio-any2" name="lowerEngineNoiceRadio" type="radio" value="Any" onClick={onEngineNoiseClick}/>
											<label for="radio-any2" class="radio-label">Any</label>
										</div>

										<div class="radio input-group">
											<input id="radio-nonoise" name="lowerEngineNoiceRadio" type="radio" value="No Noise Detected" onClick={onEngineNoiseClick}/>
											<label  for="radio-nonoise" class="radio-label">No Noise Detected</label>
										</div>
											
										<div class="radio input-group">
											<input id="radio-noisedel" name="lowerEngineNoiceRadio" type="radio" value="Noise Detected" onClick={onEngineNoiseClick}/>
											<label  for="radio-noisedel" class="radio-label">Noise Detected</label>
										</div>
									</div>
								):""}
							</div>
							
							<div class="transmissionissblock">
								<h4>Transmission Issue<span><img onClick={toggleTransmissionIssueSearch} src={arrowmark}/></span></h4>
								{transmissionIssueSearchToggle?(<div class="inner">
										<div class="radio input-group">
											<input id="radio-any3" name="transmissionIssueRadio" type="radio" value="Any"  onClick={onTransmissionIssueClick}/>
											<label for="radio-any3" class="radio-label">Any</label>
										</div>

										<div class="radio input-group">
											<input id="radio-noissues" name="transmissionIssueRadio" type="radio" value="No Issue Detected" onClick={onTransmissionIssueClick}/>
											<label  for="radio-noissues" class="radio-label">No Issue Detected</label>
										</div>
											
										<div class="radio input-group">
											<input id="radio-noissues2" name="transmissionIssueRadio" type="radio" value="Noise Detected"  onClick={onTransmissionIssueClick}/>
											<label  for="radio-noissues2" class="radio-label">Noise Detected</label>
										</div>
									</div>
								):""}
							</div>
							
							<div class="vehiclehistoryblock">
								<h4>Vehicle History<span><img onClick={toggleVehicleHistorySearch} src={arrowmark}/></span></h4>
								{vehicleHistorySearchToggle?(<div class="inner">
									<div class="radio input-group">
										<input id="radio-any4" name="vehicleHistoryRadio" type="radio" value="Any" onClick={onHistoryClick}/>
										<label for="radio-any4" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-noreport" name="vehicleHistoryRadio" type="radio" value="None reported" onClick={onHistoryClick}/>
										<label  for="radio-noreport" class="radio-label">None reported</label>
									</div>
										
									<div class="radio input-group">
										<input id="radio-noeventreport" name="vehicleHistoryRadio" type="radio" value="Events reported" onClick={onHistoryClick}/>
										<label  for="radio-noeventreport" class="radio-label">Events reported</label>
									</div>
								</div>):""}
							</div>
							
							<div class="yearblock">
								<h4>Year<span><img onClick={toggleYearSearch} src={arrowmark}/></span></h4>
								{yearSearchToggle?(<div class="inner">
									<div class="row">
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text"  id="from-input" value={fromYear} maxLength="4" placeholder="From" onChange={(e)=>setFromYear(e.target.value)}/>
										</div>
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text" value={toYear} id="to-input" placeholder="To" maxLength="4" onChange={(e)=>setToYear(e.target.value)}/>
										</div>
									</div>
								</div>
							):""}
							</div>
							
							<div class="mileageblock">
								<h4>Mileage<span><img onClick={toggleMileageSearch} src={arrowmark}/></span></h4>
								{mileageSearchToggle?(<div class="inner">
									<div class="row">
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text"  id="from-mileage" placeholder="From" value={fromMileage} onChange={(e)=>setFromMIleage(e.target.value)} />
										</div>
										<div class="input-group col-lg-6">
											<input class="form-control border-end-0 border" type="text"  id="to-mileage" placeholder="To" value={toMileage} onChange={(e)=>setToMileage(e.target.value)} />
										</div>
									</div>
								</div>
							):""}
							</div>
							
							<div class="makeblock">
								<h4>Make<span><img onClick={toggleMakeSearch} src={arrowmark}/></span></h4>
								{makeSearchToggle?(<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="chevrolet" value="Chevrolet" onClick={concatMakeSearch}/>
										<label for="chevrolet">Chevrolet</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" value="ford" id="ford" onClick={concatMakeSearch}/>
										<label for="ford">Ford</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="toyota" value="toyota" onClick={concatMakeSearch}/>
										<label for="toyota">Toyota</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="dodge" value="dodge" onClick={concatMakeSearch}/>
										<label for="dodge">Dodge</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="nissan" value="nissan" onClick={concatMakeSearch}/>
										<label for="nissan">Nissan</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="honda" value="honda" onClick={concatMakeSearch}/>
										<label for="honda">Honda</label>
									</div>
									<div class="viewblock"><a href="#">View More</a></div>
								</div>):""}
							</div>
							
							
							{/* <div class="sellertypeblock">
								<h4>Seller Type<span><img onClick={toggleSellerTypeSearch} src={arrowmark}/></span></h4>
								{sellerTypeSearchToggle?(<div class="inner">
									<div class="radio input-group">
										<input id="radio-any5" name="sellerTypeRadio" type="radio" />
										<label for="radio-any5" class="radio-label">Any</label>
									</div>

									<div class="radio input-group">
										<input id="radio-franchise" name="sellerTypeRadio" type="radio"/>
										<label  for="radio-franchise" class="radio-label">Franchise</label>
									</div>
									<div class="radio input-group">
										<input id="radio-independent" name="sellerTypeRadio" type="radio"/>
										<label  for="radio-independent" class="radio-label">Independent</label>
									</div>
								</div>
							):""}

														</div> */}
													
														<div class="dealershipblock">
															<h4>Dealership<span><img onClick={toggleDealershipSearch} src={arrowmark}/></span></h4>
															{dealershipSearchToggle?(<div class="inner">
									<div class="radio input-group">
										<input id="radio-newdealer" name="sellerTypeRadio" type="radio" cheid="car" value="New Car Dealer" onClick={onDealerShipClick}/>
										<label for="radio-newdealer" class="radio-label">New Car Dealer</label>
									</div>

									<div class="radio input-group">
										<input id="radio-useddealer" name="sellerTypeRadio" type="radio" value="Used Car Dealer" onClick={onDealerShipClick}/>
										<label  for="radio-useddealer" class="radio-label">Used Car Dealer</label>
									</div>
								</div>):""}
							</div>
							<div class="bodystyleblock">
								<h4>Body Style<span><img onClick={toggleBodyStyleSearch} src={arrowmark}/></span></h4>
								{bodyStyleSearchToggle?(<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="car" value="car" onClick={concatBodyTypeSearch}/>
										<label for="car">Car</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="suv" value="SUV" onClick={concatBodyTypeSearch}/>
										<label for="suv">SUV</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="truck" value="truck" onClick={concatBodyTypeSearch}/>
										<label for="truck">Truck</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="van" value="van" onClick={concatBodyTypeSearch}/>
										<label for="van">Van</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="minivan" value="miniVan" onClick={concatBodyTypeSearch}/>
										<label for="minivan">Minivan</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="trailer" value="trailer" onClick={concatBodyTypeSearch}/>
										<label for="trailer">Trailer</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="rv" value="RV" onClick={concatBodyTypeSearch}/>
										<label for="rv">RV</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="semi" value="semi" onClick={concatBodyTypeSearch}/>
										<label for="semi">Semi</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="tractor" value="tractor" onClick={concatBodyTypeSearch}/>
										<label for="tractor">Tractor</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="semitractor" value="Semi Tractor" onClick={concatBodyTypeSearch}/>
										<label for="semitractor">Semi Tractor</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="other" value="other" onClick={concatBodyTypeSearch}/>
										<label for="other">Other</label>
									</div>
								</div>):""}
							</div>
							
							<div class="transmissionblock">
								<h4>Transmission<span><img onClick={toggleTransmissionSearch} src={arrowmark}/></span></h4>
								{transmissionSearchToggle?(<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="manual" value="manual" onClick={concatTransmissionSearch} />
										<label for="manual">Manual</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="automatic" value="automatic" onClick={concatTransmissionSearch}/>
										<label for="automatic">Automatic</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="otherissues" value="other" onClick={concatTransmissionSearch}/>
										<label for="otherissues">Other</label>
									</div>
								</div>
							):""}
							</div>
							
							<div class="drivetrainblock">
								<h4>Drivetrain<span><img onClick={toggleDriveTrainSearch} src={arrowmark}/></span></h4>
								{driveTrainSearchToggle?(<div class="inner">
									<div class="form-group input-group ">
										<input type="checkbox" id="twdrive" value="two wheel drive" onClick={concatDriveTrainSearch}/>
										<label for="twdrive">Two wheel Drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="fwdrive" value="front wheel drive" onClick={concatDriveTrainSearch}/>
										<label for="fwdrive">Front Wheel drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="rwdrive" value="rear wheel drive" onClick={concatDriveTrainSearch}/>
										<label for="rwdrive">Rear Wheel Drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="fowdrive" value="four wheel drive" onClick={concatDriveTrainSearch}/>
										<label for="fowdrive">Four Wheel Drive</label>
									</div>
									<div class="form-group input-group ">
										<input type="checkbox" id="awdrive" value="all wheel drive" onClick={concatDriveTrainSearch}/>
										<label for="awdrive">All Wheel Drive</label>
									</div>
								</div>
						):""}
							</div>
						</div>
					</div>
                        <div className="section-title">
                                <h2>Recently Added Cars</h2>
                            </div>
                            {/* <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
                                <div className="input-group searchbox ">
                                    <input type="text"  className="form-control border"  placeholder="model/make/year" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
                                    <span className="input-group-append" >
                                    <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchCarInventoryDetail} ><i className='bx bx-search'></i></button>
                                    </span>                                
                                </div>
                            </div> */}
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carDetail.length>0?carDetail.map((item) =>
                            
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                        <img src={(item.isFavourite===0)? lock : locked} onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'recent')} />
                                        </div>
                                        <img className="carImg" src={item.image}  onClick={()=>{redirectpage(item.car_id,item.seller_dealer_id)}}/>
                                        {item.isbestSale?
                                        <div className="cars-tag">
                                            <h4>{item.deal_name}</h4>
                                        </div>:""}
                                        <div className="cars-content">
                                            <h3><a href="#">{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>    
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><span>{item.dealer_type} </span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <p className="details"><img src={item.image}/></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">${item.max_bid}</a>
                                                <a className="cta-btns-primary" href="JavaScript:void(0)" >Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):<div className="floor_notfiled_block"><p>No Data Found</p></div>}
                            </div>
                        </div>
                    </div>
               </main>
}
        </div>
    )
}
export default RecentlyAddedCars;