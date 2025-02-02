import React from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../Component/Loading/Loading';
import CarListAction from '../../Pages/CarList/CarListAction';
import arrowmark from '../../../src/assets/img/arrowmark.jpg';
import SaveSearchPopup from '../Popup/SaveSearchPopup';
import Popup from '../Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import SearchAction from '../../Pages/SearchAction';

const FilterSearchCars=()=>{
    const history = useHistory();
	const [apiName,setApiName]=useState([]);
    const [carDetail ,setCarDetail] = useState([]);
    const [recentCarFlag,setrecentCarFlag]=useState(false);
    const [loading,setLoading] = useState(true);
    const [data,setData]=useState("");
	const [makeSearch,setMakeSearch]=useState([]);
	const [transmissionSearch,setTransmissionSearch]=useState([]);
	const [drivetrainSearch,setDriveTrainSearch]=useState([]);
	const [modelSearch,setModelSearch]=useState([]);
	const dispatch = useDispatch();
	const [dealerShip,setDealerShip] = useState("");
	const [fromYear,setFromYear] = useState("");
	const [toYear,setToYear] = useState("");
	const [fromMileage,setFromMIleage]=useState("");
	const [toMileage,setToMileage]=useState("");
	const [stateSearch,setStateSearch]=useState([]);
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
	const [stateNameList, setStateNameList] = useState([]);
	const [make,setMake] = useState("");
	const [bodyStyle,setBodyStyle] = useState("");
	const [reset,setReset] = useState(true);
	const [viewMoreState,setViewMoreState]=useState(false);
	const [viewMoreMake,setViewMoreMake]=useState(false);
	const [viewMoreBodyStyle,setViewMoreBodyStyle]=useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [saveSearchName,setSaveSearchName]=useState("");
	const [saveSearchRequest,setSaveSearchRequest]=useState("");
	const [savedSearch,setSavedSearch]=useState("");
	const [saveSearchEnter,setSaveSearchEnter] = useState("");
	const [saveSearchRequestPopup,setSaveSearchRequestPopup] = useState("");


	async function ShowSaveSearch(){
		console.log("-------------------------inside show save search fn");
		
		let savesearchreq_popup={
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
		dispatch(SearchAction.searchrequest(savesearchreq_popup))
		console.log("After assigning setSavesearchpopuo, value:",savesearchreq_popup)
		togglePopup();
	}

	//const [checked, setChecked] = useState(false)

	const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const VehicleSearch=()=>{

        let request={
			buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
			
        }
        API.post('BuyerInventoryCarList/condition',request).then(res=>{

            console.log("response",res.data.data);
            setCarDetail(res.data.data); 
            setLoading(false);
            
        }).catch(err => { console.log(err); });
    }
    const redirectpage=(pathid,seller_dealer_id)=>{
        //e.preventDefault();
        console.log("seller_dealer_id+++++",seller_dealer_id)
        // dispatch(CarListAction.sellerid(seller_dealer_id))
        // history.push("/cardetail/"+pathid);
		history.push({
            pathname: '/cardetail',
            state: {id:pathid,sellerDealerId:seller_dealer_id},
          });
    }
	

	
	  const getSavedSearch = () =>{
	
		let request ={
	
		  buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
	
		}
	
		API.post("savedSearch/condition", request).then(res => {
			setSaveSearchRequest(res.data.data);
			console.log("Saved Search request from service");
		
		})
			.catch(err => { console.log(err); });
	
	  }

	  const getSavedSearchEnter = () =>{
	
		console.log("save search enter response ========", saveSearchEnter)
	    if(saveSearchEnter!="0"){
		API.post("BuyerInventoryCarSearch/condition", saveSearchEnter).then(res => {
			console.log("set save search enter _________", res.data.data)
			setCarDetail(res.data.data);
			//setSaveSearchEnter(res.data.data);
			console.log("Saved Search enter from service");
			console.log("save search enter response +++++++++++++", saveSearchEnter)
		
		})
			.catch(err => { console.log(err); });
		}
	
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
		getSavedSearch();
		
       
	},[recentCarFlag]);
	
	useEffect(()=>{
		getSavedSearchEnter();
	},[saveSearchEnter])

	useEffect(()=>{

	},[stateSearchToggle]);

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
      
//    const reset=()=>{
// 	setToMileage("");
// 	setFromMIleage("");
// 	setToYear("");
// 	setFromYear("");
	
//    }
      
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
		//searchCarDetail()
	  }

     function onTransmissionIssueClick(e){
		 console.log("Transmission issue selected value",e.target.value);
		 setTransmissionIssueSearch(e.target.value);
		// searchCarDetail();
	 }
	 function onSaleTypeClick(e){
		console.log("Sale Type selected value",e.target.value);
		setSalesTypeSearch(e.target.value);
		//searchCarDetail();
	}
	function onHistoryClick(e){
		console.log("History Search selected value",e.target.value);
		setHistorySearch(e.target.value);
		//searchCarDetail();
	}
	function onEngineNoiseClick(e){
		console.log("Engine Noise selected value",e.target.value);
		setEngineNoiseSearch(e.target.value);
		//searchCarDetail();
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

const clear = () => {
	console.log("clearrrrrrrrrr")
	setReset(false);
}

const getState = () => {
	
	const state = API.post('stateList/condition');
	state.then(res => {
		setStateNameList(res.data.data);
	
	})
		.catch(err => { console.log(err); });
}

const getMake = () => {
	let request = {
		country_id: 1
	};
	const state = API.post('car_make/condition', request);
	state.then(res => {
		setMake(res.data.data);
	
	})
		.catch(err => { console.log(err); });
}

const getBodyStyle = () => {
	let request = {
		country_id: 1
	};
	const state = API.post('car_bodystyle/condition', request);
	state.then(res => {
		setBodyStyle(res.data.data);
	
	})
		.catch(err => { console.log(err); });
}

useEffect(() => {

	getState();
	getMake();
	getBodyStyle();
   
},[reset]);

    return(
        <>
        
           
						

                            <div class="col-lg-3">
							<div class="saveSearch"><button class="cta-btn" type="button" onClick={ShowSaveSearch}>Save Search </button></div>
							
							<div class="leftonsidebox">
								<div class="filtersblock">
									<h3>Filters<span><a href="#" onClick={clear}>Reset</a></span></h3>	
	
									<div class="input-group">
										<select id="SavedSearchNames"  class="form-control custom-select browser-default" onChange={(e)=>{setSaveSearchEnter(JSON.parse(e.target.value));console.log("onchange-=======",e.target.value)}} >
											<option value="0"> Saved Search</option>
										{saveSearchRequest.length>0?saveSearchRequest.map((saveSearchRequest) =>
											<option key={saveSearchRequest.name}  value={saveSearchRequest.search_request} >{saveSearchRequest.name}</option>
										):""}
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
								{makeSearchToggle?
								<div class="inner">
									{viewMoreMake?

										(make.length>0?make.map((make) =>
											
												<div class="form-group input-group ">
													<input type="checkbox" id={make.car_name} value={make.car_name} onClick={concatMakeSearch}/>
													<label for={make.car_name} >{make.car_name}</label>
												</div>
												
											)
											:""):
											
								
										(make.length>0?make.slice(0,6).map((make) =>
										
										<div>
											<div class="form-group input-group ">
												<input type="checkbox" id={make.car_name} value={make.car_name} onClick={concatMakeSearch}/>
												<label for={make.car_name} >{make.car_name}</label>
											</div>
										
										</div>
										):""	)}
										{viewMoreMake?
										<div class="viewblock"><a href="JavaScript:void(0)" onClick={()=>setViewMoreMake(false)}>View Less</a></div>:
										<div class="viewblock"><a href="JavaScript:void(0)" onClick={()=>setViewMoreMake(true)}>View More</a></div>}
									</div>:""}
								
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

							<div class="bodystyleblock">
								<h4>Body Style<span><img onClick={toggleBodyStyleSearch} src={arrowmark}/></span></h4>

								{bodyStyleSearchToggle?
								<div class="inner">
									{viewMoreBodyStyle?

										(bodyStyle.length>0?bodyStyle.map((bodyStyle) =>
											
												<div class="form-group input-group ">
													<input type="checkbox" id={bodyStyle.style_name} value={bodyStyle.style_name} onClick={concatBodyTypeSearch}/>
													<label for={bodyStyle.style_name} >{bodyStyle.style_name}</label>
												</div>
												
											)
											:""):
											
								
										(bodyStyle.length>0?bodyStyle.slice(0,6).map((bodyStyle) =>
										<div>
											<div class="form-group input-group ">
												<input type="checkbox" id={bodyStyle.style_name} value={bodyStyle.style_name} onClick={concatBodyTypeSearch}/>
												<label for={bodyStyle.style_name} >{bodyStyle.style_name}</label>
											</div>
											
										</div>
										):""	)}
											{viewMoreBodyStyle?
											<div class="viewblock"><a href="JavaScript:void(0)" onClick={()=>setViewMoreBodyStyle(false)}>View Less</a></div>:
											<div class="viewblock"><a href="JavaScript:void(0)" onClick={()=>setViewMoreBodyStyle(true)}>View More</a></div>}
									</div>:""}
							</div>
						
						<div class="statesblock">

								<h4>States<span ><img   onClick={toggleStateSearch} src={arrowmark}/></span></h4>

								{stateSearchToggle?
								<div class="inner">
									{viewMoreState?

										(stateNameList.length>0?stateNameList.map((stateName) =>
											
												<div class="form-group input-group ">
													<input type="checkbox" id={stateName.state_name} value={stateName.state_name} onClick={concatStateSearch}/>
													<label for={stateName.state_name}>{stateName.state_name}</label>
												</div>
												
											)
											:""):
											
								
										(stateNameList.length>0?stateNameList.slice(0,6).map((stateName) =>
										<div>
											<div class="form-group input-group ">
												<input type="checkbox" id={stateName.state_name} value={stateName.state_name} onClick={concatStateSearch}/>
												<label for={stateName.state_name}>{stateName.state_name}</label>
											</div>
										</div>
										):""	)}

									{viewMoreState?
										<div class="viewblock"><a href="JavaScript:void(0)" onClick={()=>setViewMoreState(false)}>View Less</a></div>:
										<div class="viewblock"><a href="JavaScript:void(0)" onClick={()=>setViewMoreState(true)}>View More</a></div>
									}

									</div>:""}
							
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


							<div class="groupblock">
								<h4>Seller<span><img onClick={toggleGroupSearch} src={arrowmark}/></span></h4>
								{groupSearchToggle?(<div class="inner">
											{/* <div class="form-group input-group ">
												<input type="checkbox" id="deals" value="Deals Almost Close" onClick={onGroupClick}/>
												<label for="deals">Deals Almost Close</label>
											</div> */}
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

							<div class="lowerblock">
								<h4>Lower Engine Notice<span><img onClick={toggleLowerEngineNoiceSearch} src={arrowmark}/></span></h4>
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

							
						</div>
					</div>
                  
            


								{isOpen && <Popup
                                    isClose={false}
                                    content={<>
                                        <SaveSearchPopup toggle={togglePopup}
										 
										  />
                                    </>}
                                    handleClose={togglePopup}
                                />}				

        
        </>
    )
}
export default FilterSearchCars;
