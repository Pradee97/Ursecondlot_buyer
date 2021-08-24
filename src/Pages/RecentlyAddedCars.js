import React from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import lock from '../../src/assets/img/lock.png';
import locked from '../../src/assets/img/locked.png';
import Loading from '../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import CarListAction from './CarList/CarListAction';
import FilterSearchAction from '../Component/FilterSearchCars/FilterSearchAction';
import FilterSearchCars from '../Component/FilterSearchCars/FilterSearchCars';
import Popup from '../Component/Popup/Popup';
import Makeurbid from './Makeurbid';
import CarDetailsAction from './CarDetails/CarDetailsAction';

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
const [stateNameList, setStateNameList] = useState([]);
const [make,setMake] = useState("");
const [bodyStyle,setBodyStyle] = useState("");
const [reset,setReset] = useState(true);
const [viewMoreState,setViewMoreState]=useState(false);
const [viewMoreMake,setViewMoreMake]=useState(false);
const [viewMoreBodyStyle,setViewMoreBodyStyle]=useState(false);

const [isOpen, setIsOpen] = useState(false);
const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);
const [apiName,setApiName]=useState("")

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
	
	const toggleMakeBid = (high_bid,min_bid,car_id,save_purchase) => {
		console.log("check the high bid value",high_bid)
		let makebiddispatch={
			high_bid: high_bid,
			min_bid: min_bid,
			car_id : car_id,
			save_purchase: save_purchase,
			redirectPage: "recentlyaddedcars"
		}
		//dispatch(CarDetailsAction.highBid(high_bid))
		dispatch(CarDetailsAction.minBid(makebiddispatch))
		
		setIsOpen(!isOpen);
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
		dispatch(FilterSearchAction.apiname(apiName))
    },[recentCarFlag,highBid]);
		
  

   

	

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
	  




    return(
        <div>
            {loading?<Loading/>:
             <main id="main" className="inner-page carList">
            
             <div id="recently-cars" className="recently-cars vehiclesearch">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                        
							<div className="section-title">
								<div class="back-btn">
									<a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
								</div>
                                <h2>Recently Added Cars</h2>
                            </div>
            
					<div class="row content">
            			<FilterSearchCars/>
                       
							<div className="col-lg-9">
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carDetail.length>0?carDetail.map((item) =>
                            
								<div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
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
												<a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a>
                                                <a className="cta-btns" href="#">Seller Price ${item.max_bid}</a>
                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?
												<a className="cta-btns" href="#">High Bid $ {item.min_bid}</a>:
												<a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
												}
                                                <a className="cta-btns-primary" onClick={()=>toggleMakeBid(item.high_bid,item.min_bid,item.car_id,item.save_purchase)} >Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):<div className="floor_notfiled_block"><p>No Data Found</p></div>}
                            </div>
                        </div>
						</div>
						</div>
                    </div>
					{isOpen && <Popup
						isClose={false}
						content={<>
							<Makeurbid toggle={toggleMakeBid} />
						</>}
						handleClose={toggleMakeBid}
					/>}
               </main>
}
        </div>
    )
}
export default RecentlyAddedCars;