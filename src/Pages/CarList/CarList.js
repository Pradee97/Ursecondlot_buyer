import React from 'react';
import ls from 'local-storage';
import Popup from '../../Component/Popup/Popup';
import Makeurbid from '../Makeurbid';
import '../../assets/css/responsive.css';
import API from "../../Services/BaseService";
import lock from '../../assets/img/lock.png';
import locked from '../../assets/img/locked.png';
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from"../../Component/Loading/Loading";
import { useDispatch, useSelector } from 'react-redux';
import CarListAction from './CarListAction';
// import Carousel from 'react-material-ui-carousel'
// import Carousel from "react-multi-carousel";
// import SimpleImageSlider from "react-simple-image-slider"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import BuyItNow from '../../Pages/BuyItNow/BuyItNow';
import Countdown from "react-countdown";
import LateFee from '../LateFee/LateFee';

const CarList = () => {
    const responsive={
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            paritialVisibilityGutter: 60
          }
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    let userDetails = ls.get('userDetails');
    const [carDetail,setCarDetail]=useState([]);
    const [carInventoryDetail,setCarInventoryDetail]=useState("");
    const [carFavInventoryDetail,setFavCarInventoryDetail]=useState("");
    const [recentCarFlag,setrecentCarFlag]=useState(false);
    const [inventoryCarFlag,setInventoryCarFlag]=useState(false);
    const [favCarFlag,setFavCarFlag]=useState(false);
    const [suggestedCarDetail,setSuggestedCarDetail]=useState("");
    const [savePurchase,setSavePurchase] = useState(false);
    // const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

    const [isOpen, setIsOpen] = useState(false);
    const [open,setOpen] = useState(false);
    const options = {
        items: 4,
    };

    const [highBid,setHighBid] = useState(null);
    const [carId, setCarId] = useState(null);
    const [makeBitData, setMakeBitData] = useState({});
    const [buyItNowData, setBuyItNowData] = useState({});

    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);

    const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
    }

    const Completionist = () => <span>{""}</span>;

    useEffect(() => {

        let intervalId;
        intervalId = setInterval(() => {
            getSuggestedCarList();
            getrecentCarList();
            getInventoryCarList();
            getFavCarList();
        }, 30000)
        return () => clearInterval(intervalId);
          
        },[]);


    useEffect(() => {
        
        getSuggestedCarList();
        // getrecentCarList();
        // getInventoryCarList();
        // getFavCarList();
        getlateFee()

    },[]);

    
    useEffect(() => {
        getrecentCarList();
        getFavCarList();
        getInventoryCarList();
        getSuggestedCarList();
        
    },[recentCarFlag, inventoryCarFlag, favCarFlag, highBid ]);

    const renderer = ({minutes, seconds, completed }) => {
    if (completed) {
        
        return <Completionist />;
    } else {
    
        return (
        <span>
            {minutes}:{seconds}
        </span>
        );
    }
    };
	
	const getMakeBitValue = (data) => {
		const highBid = data
		setHighBid(highBid)
	}

    const getBuyItNowValue = (data) => {
		const highBid = data
		setHighBid(highBid)
	}

	const toggleMakeBid = () => {
		setIsOpen(!isOpen);
    }
    
    const toggleBuyItNow = () => {
        setOpen(!open);
    }

	const setMakeBitValue = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,comments,transportation,display,proxy_bid,transportation_charge,save_policy,credit_limit,lot_fee) => {
		console.log("check the toggle make bid value")
		setMakeBitData({
			carHighBid: high_bid,
			carMinBid: min_price,
			carId : car_id,
			carSavePurchase: save_purchase,
			redirectPage: "carlist",
			time:time,
			counter_buyerid:counterbuyerid,
			carMaxBid :max_price,
			buyItNow: buy_it_now,
			comments:comments,
			transportation:transportation,
			display:display,
            carProxyBid:proxy_bid,
            transportationCharge:transportation_charge,
            savePolicy:save_policy,
            creditLimit:credit_limit,
            lotFee:lot_fee
		})
		toggleMakeBid();
    }
    
    const setBuyItNowValue = (buy_it_now,car_id,image,model,make,year,price,transportation,transportation_charge,lot_fee,credit_limit) => {

		setBuyItNowData({
			buyItNow: buy_it_now,
			carId : car_id,
            image : image,
			model : model,
			make : make, 
			year : year,
            price:price,
            transportation:transportation,
            transportationCharge:transportation_charge,
            lotFee:lot_fee,
            creditLimit : credit_limit
		})
		toggleBuyItNow()
	}

    // const togglePopup = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now,comments,transportation,display,proxy_bid) => {
    //     let makebiddispatch={
    //         high_bid: high_bid,
    //         min_price: min_price,
    //         car_id : car_id,
    //         save_purchase: save_purchase,
    //         time:time,
    //         counter_buyerid:counterbuyerid,
    //         max_price:max_price,
    //         buy_it_now: buy_it_now,
    //         comments:comments,
    //         transportation:transportation,
    //         display:display,
    //         proxy_bid:proxy_bid,
    //         redirectPage:"carlist"
    //     }
        
    //     //dispatch(CarDetailsAction.highBid(high_bid))
    //     dispatch(CarDetailsAction.minBid(makebiddispatch))
    //     setIsOpen(!isOpen);
    // }

    const getSuggestedCarList=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('SuggestedCarList/condition',request).then(res=>{
           
           // const {results} = res.data.data;
            
            //if(results.length>0){
            setSuggestedCarDetail(res.data.data);
            // setHighBid(res.data.data.high_bid);
	        setCarId(res.data.data.car_id);
            setLoading(false);
            //}
            //setrecentCarFlag(!recentCarFlag)
        }) .catch(err => { console.log(err); });
    }
    
    const getrecentCarList=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
       
        API.post('BuyerNewCarList/condition',request).then(res=>{
            
           // const {results} = res.data.data;
            
            //if(results.length>0){
            setCarDetail(res.data.data);
            // setHighBid(res.data.data.high_bid);
	        setCarId(res.data.data.car_id);
            setLoading(false);
            //}
            //setrecentCarFlag(!recentCarFlag)
        }) .catch(err => { console.log(err); });
    }
    const getInventoryCarList=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        API.post('BuyerInventoryCarList/condition',request).then(res=>{
            
           // const {results} = res.data.data;
           
            //if(results.length>0){
                setCarInventoryDetail(res.data.data);
                // setHighBid(res.data.data.high_bid);
                setCarId(res.data.data.car_id);
            setLoading(false);
            //}
            //setInventoryCarFlag(!inventoryCarFlag)
        }).catch(err=>{console.log(err);});
    }
    const redirectpage=(pathid,seller_dealer_id)=>{
        //e.preventDefault();
        
        // dispatch(CarListAction.sellerid(seller_dealer_id))
        // history.push("/cardetail/"+pathid);
        history.push({
            pathname: '/cardetail',
            state: {id:pathid,sellerDealerId:seller_dealer_id},
          });
    }

    const getFavCarList=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('BuyerFavoriteCarList/condition',request).then(res=>{
            setFavCarInventoryDetail(res.data.data);
            // setHighBid(res.data.data.high_bid);
	        setCarId(res.data.data.car_id);
            setLoading(false);
            //setFavCarFlag(!favCarFlag)
        }).catch(err=>{console.log(err);});
    }
   
    const addRemoveFavourite=(carid,state,flag)=>{
       
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            car_id:carid,
            active: !state
        }
        
        API.post('buyer_favourite/add',request).then(res=>{
            // setaddFavourite(res.data.data);
            

            if(flag==='inv'){
                setInventoryCarFlag(!inventoryCarFlag)
            }
            else if(flag==='fav'){
                setFavCarFlag(!favCarFlag)

            }
            else if(flag==='recent'){
                setrecentCarFlag(!recentCarFlag)
            }
        })
    }

    const getlateFee=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('getlatefee/condition',request).then(res=>{
           if(res.data.data.length){
            
       console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
            const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
            setIsLateFee(lateFeeValueStatus==="yes")
            setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
           }
          

        }).catch(err=>{console.log(err);});
    }


    // const filterLateFee =()=>{

    //     return suggestedCarDetail?.length>0 
    //     ? suggestedCarDetail.filter((lateFee)=> 
    //         {
    
    //             if(suggestedCarDetail.late_fee>0){
    //                 return true
    //             }
    //         }
    //     )[0] || false
    //     : false
    // }

    return (
       
            <div>
                {loading?<Loading/>:
                <main id="main" className="inner-page carList carouselPage">
                     
                    <div id="suggested-cars" className="suggested-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Suggested cars</h2>
                            </div>
                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                                loop={suggestedCarDetail?.length>4 ? true : false } margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
                            {suggestedCarDetail?.length>0?suggestedCarDetail
                            .map((item) =>
                            
                                <div>
                                    <div className="car-item">
                                        <div className="cars-lock">

                                            {/* <img src={(item.isFavourite===0)? locked : lock} onClick={()=>(item.isFavourite===0)?addFavourite(item.car_id):removeFav(item.car_id)} /> */}
                                            <img src={(item.isFavourite===0)? lock : locked} onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'recent')} />
                                        </div>
                                        <img className="carImg" src={item.image}  onClick={()=>{ redirectpage(item.car_id,item.seller_dealer_id)}}/>
                                        {item.isbestSale?
                                        <div className="cars-tag">
                                            <h4>{item.deal_name}</h4>
                                        </div>:""}
                                        
                                        <div className="cars-content">
                                            <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.year} {item.make} {item.model}  </a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>   
                                                <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined || item.buy_it_now== 0?"":
                                                    // <a className="cta-btns"  onClick={()=>lateFeeDayCount === 0 ? setBuyItNowValue(item.buy_it_now,item.car_id,item.image,item.model,item.make,item.year,item.price,item.transportation,item.transportation_charge,item.lot_fee,item.credit_limit): lateFeeDayCount > 2 && toggleLateFee()}>Buy It Now $ {item.buy_it_now}</a>
                                                    <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns`} href="JavaScript:void(0)"  onClick={()=>lateFeeValue === 0 && setBuyItNowValue(item.buy_it_now,item.car_id,item.image,item.model,item.make,item.year,item.price,item.transportation,item.transportation_charge,item.lot_fee,item.credit_limit)}>Buy It Now $ {item.buy_it_now}</a>
                                                }
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center dealerType">
                                                <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> {item.location}</span>
                                                </p>
                                                <p className="details"><img src={item.logo}/></p>
                                            </div>                          
                                  
                                            <div className="cars-prices">

                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                                <a className="cta-btns">High Bid $ {item.high_bid}</a>
                                                }   
                                                {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                <a className="cta-btns" href="#">Counter Bid $ {item.buy_it_now}</a>
                                                } */}

                                                {(item.isbuyercounterbid=="me" && item.iscounterbid!==null && (item.time !==0 || item.time!==null)) || ((item.iscounterbid==null || item.iscounterbid=="no" ) && (item.isbuyercounterbid==null || item.isbuyercounterbid=="not")&&(item.time ==0 || item.time==null))?
                                                <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns-primary`}  href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge,item.save_policy,item.credit_limit,item.lot_fee)} >Make Bid</a>
                                                :<a class="cta-btns lockedcarBtn">Locked up for Higher Bid </a>}

                                                {(item.buyer_high_bid==item.high_bid || item.buyer_high_bid!==item.high_bid) &&       
                                                <div class= {(item.time!==null && item.time < 20)?"countownBlock":""} >
                                                    <Countdown date={Date.now() + (item.time!==null && item.time < 20 ? item.time*60*1000 :0)  } renderer={renderer} />                                               
                                                </div>}

                                                </div>
                                        </div>
                                    </div>
                                </div>): ""}
                               {/* </div> */}
                               </OwlCarousel>
                               {suggestedCarDetail.length >4 ? suggestedCarDetail.slice(0,1)
                                .map(() =>
                            <div className="text-center">
                                <a href="/suggestedcars" className="more-btn">View More <i className="bx bx-chevron-right"></i></a>
                            </div>):""}
                        </div>
                    </div>

                   
                    <div id="inventory-cars" className="inventory-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>inventory</h2>
                            </div>

                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                                loop={carInventoryDetail?.length>4 ? true : false } margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
                            {carInventoryDetail?.length>0?carInventoryDetail
                            .map((item,index) =>
                                <div>
                                    <div className="car-item">
                                        <div className="cars-lock">
                                        {/* <img src={(item.isFavourite===0)? lock : locked} onClick={()=>(item.isFavourite===0)?addFavourite(item.car_id):removeFav(item.car_id)} /> */}
                                       
                                    <img src={(item.isFavourite===0)? lock : locked}  onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'inv')} />
                                        </div>
                                        
                                        <img className="carImg" src={item.image} onClick={()=>{redirectpage(item.car_id,item.seller_dealer_id)}} className="carImg" alt="..." />
                                        {item.isbestSale?
                                        <div className="cars-tag">
                                            <h4>{item.deal_name}</h4>
                                        </div>:""}
                                        <div className="cars-content">
                                            <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.year} {item.make} {item.model}</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>    
                                                <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined || item.buy_it_now== 0?"":
                                                    <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setBuyItNowValue(item.buy_it_now,item.car_id,item.image,item.model,item.make,item.year,item.price,item.transportation,item.transportation_charge,item.lot_fee,item.credit_limit)}>Buy It Now $ {item.buy_it_now}</a>
                                                }
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center dealerType">
                                                
                                                <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> {item.location} </span>
                                                </p>
                                                <p className="details"><img src={item.logo}/></p>
                                            </div>
                                            
                                            <div className="cars-prices">
                                            {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}
                                                {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                <a className="cta-btns" href="#">Buy It Now $ {item.buy_it_now}</a>
                                                } */}
                                               
                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                                <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                                } 
                                                {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                <a className="cta-btns" href="#">Counter Bid $ {item.buy_it_now}</a>
                                                } */}

                                                {(item.isbuyercounterbid=="me" && item.iscounterbid!==null && (item.time !==0 || item.time!==null)) || ((item.iscounterbid==null || item.iscounterbid=="no" ) && (item.isbuyercounterbid==null || item.isbuyercounterbid=="not")&&(item.time ==0 || item.time==null))?
                                                <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns-primary`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge,item.save_policy,item.credit_limit,item.lot_fee)} >Make Bid</a>
                                                :<a class="cta-btns lockedcarBtn">Locked up for Higher Bid </a>}

                                                {(item.buyer_high_bid==item.high_bid || item.buyer_high_bid!==item.high_bid) &&       
                                                <div class= {(item.time!==null && item.time < 20)?"countownBlock":""} >
                                                    <Countdown date={Date.now() + (item.time!==null && item.time < 20 ? item.time*60*1000 :0)  } renderer={renderer} />                                               
                                                </div>}

                                                {/* <a className="cta-btns-primary" onClick={()=>setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge)} >Make Bid</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>): ""}
                                </OwlCarousel>
                             {carInventoryDetail.length >4 ? carInventoryDetail.slice(0,1)
                                .map(() =>
                            <div className="text-center">
                                <a href="/InventoryCars" className="more-btn">View More<i className="bx bx-chevron-right"></i></a>
                            </div>):""}
                        </div>
                    </div>

                    <div id="recently-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Recently Added Cars</h2>
                            </div>

                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                               loop= {carDetail?.length>4 ? true: false } margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
                            {carDetail.length>0?carDetail
                                        .map((item,index) =>
                                <div >
                                    <div className="car-item">
                                        <div className="cars-lock">
                                        <img src={(item.isFavourite===0)? lock : locked}  onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'recent')} />
                                        {/* onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'fav')}  */}
                                        {/* <img src={(carDetail.isFavourite===0)? lock : locked} onClick={()=>(carDetail.isFavourite===0)?addFavourite(item.car_id):removeFav(item.car_id)} /> */}

                                        </div>
                                        
                                        <img className="carImg" src={item.image} onClick={()=>{redirectpage(item.car_id,item.seller_dealer_id)}} alt="..." />
                                        {item.isbestSale?
                                        <div className="cars-tag">
                                            <h4>{item.deal_name}</h4>
                                        </div>:""}
                                        <div className="cars-content">
                                            <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.year} {item.make} {item.model}</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>  
                                                <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined || item.buy_it_now== 0?"":
                                                    <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setBuyItNowValue(item.buy_it_now,item.car_id,item.image,item.model,item.make,item.year,item.price,item.transportation,item.transportation_charge,item.lot_fee,item.credit_limit)}>Buy It Now $ {item.buy_it_now}</a>
                                                }
                                                </p>  
                                            </div>
                                            <div className="d-flex align-items-center dealerType">
                                            <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> {item.location} </span>
                                                </p>
                                                <p className="details"><img src={item.logo}/></p>
                                            </div>
                                            
                                            <div className="cars-prices">
                                            {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}
                                                {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                <a className="cta-btns" href="#">Buy It Now $ {item.buy_it_now}</a>
                                                } */}
                                               
                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                                <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                                } 
                                                {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                <a className="cta-btns" href="#">Counter Bid $ {item.buy_it_now}</a>
                                                } */}

                                                {(item.isbuyercounterbid=="me" && item.iscounterbid!==null && (item.time !==0 || item.time!==null)) || ((item.iscounterbid==null || item.iscounterbid=="no" ) && (item.isbuyercounterbid==null || item.isbuyercounterbid=="not")&&(item.time ==0 || item.time==null))?
                                                <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns-primary`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge,item.save_policy,item.credit_limit,item.lot_fee)} >Make Bid</a>
                                                :<a class="cta-btns lockedcarBtn">Locked up for Higher Bid </a>}

                                                {(item.buyer_high_bid==item.high_bid || item.buyer_high_bid!==item.high_bid) &&       
                                                <div class= {(item.time!==null && item.time < 20)?"countownBlock":""} >
                                                    <Countdown date={Date.now() + (item.time!==null && item.time < 20 ? item.time*60*1000 :0)  } renderer={renderer} />                                               
                                                </div>}                                              

                                                {/* <a className="cta-btns-primary" onClick={()=>setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge)}>Make Bid</a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>): "" }
                                </OwlCarousel>
                                {carDetail.length >4 ? carDetail.slice(0,1)
                                .map(() =>
                            <div className="text-center">
                                <a href="/recentlyAddedCars" className="more-btn">View More<i className="bx bx-chevron-right"></i></a>
                            </div>):""}
                        </div>
                    </div>
                    
                    <div id="favorite-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>favorite list </h2>
                            </div>
                           

                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                                loop={carFavInventoryDetail.length>4 ? true : false} margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
                            {carFavInventoryDetail.length>0?carFavInventoryDetail
                            .map((item,index) =>
                            <div>
                            <div className="car-item">
                                <div className="cars-lock">
                                <img src={(item.isFavourite===0)? lock : locked}  onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'recent')} />
                                {/* onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'fav')}  */}
                                {/* <img src={(carDetail.isFavourite===0)? lock : locked} onClick={()=>(carDetail.isFavourite===0)?addFavourite(item.car_id):removeFav(item.car_id)} /> */}

                                </div>
                                
                                <img className="carImg" src={item.image} onClick={()=>{redirectpage(item.car_id,item.seller_dealer_id)}} alt="..." />
                                {item.isbestSale?
                                <div className="cars-tag">
                                    <h4>{item.deal_name}</h4>
                                </div>:""}
                                <div className="cars-content">
                                    <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.year} {item.make} {item.model}</a></h3>
                                    <div className="d-flex align-items-center mb-3">
                                        <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                        <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>
                                        <p className="details buyitnow">
                                        {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined || item.buy_it_now== 0?"":
                                                    <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setBuyItNowValue(item.buy_it_now,item.car_id,item.image,item.model,item.make,item.year,item.price,item.transportation,item.transportation_charge,item.lot_fee,item.credit_limit)}>Buy It Now $ {item.buy_it_now}</a>
                                                }
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center dealerType">
                                        <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> {item.location} </span>
                                        </p>
                                        <p className="details"><img src={item.logo}/></p>
                                    </div>

                                    <div className="cars-prices">
                                        {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}
                                        {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                        <a className="cta-btns" href="#">Buy It Now $ {item.buy_it_now}</a>
                                        } */}
                                       
                                        {item.high_bid==="" || item.high_bid=== null || item.high_bid=== undefined?"":
                                        <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                        } 
                                        {/* {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                        <a className="cta-btns" href="#">Counter Bid $ {item.buy_it_now}</a>
                                        } */}

                                        {(item.isbuyercounterbid=="me" && item.iscounterbid!==null && (item.time !==0 || item.time!==null)) || ((item.iscounterbid==null || item.iscounterbid=="no" ) && (item.isbuyercounterbid==null || item.isbuyercounterbid=="not")&&(item.time ==0 || item.time==null))?
                                        <a className={`${lateFeeValue > 0 && 'buy-it-disable-btn'} cta-btns-primary`} href="JavaScript:void(0)" onClick={()=>lateFeeValue === 0 && setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge,item.save_policy,item.credit_limit,item.lot_fee)} >Make Bid</a>
                                        :<a class="cta-btns lockedcarBtn">Locked up for Higher Bid </a>}

                                        {(item.buyer_high_bid==item.high_bid || item.buyer_high_bid!==item.high_bid) &&       
                                        <div class= {(item.time!==null && item.time < 20)?"countownBlock":""} >
                                            <Countdown date={Date.now() + (item.time!==null && item.time < 20 ? item.time*60*1000 :0)  } renderer={renderer} />                                               
                                        </div>}   

                                        {/* <a className="cta-btns-primary" onClick={()=>setMakeBitValue(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now,item.comments,item.transportation,item.display,item.proxy_bid,item.transportation_charge)}>Make Bid</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>): ""}
                        </OwlCarousel>
                        {carFavInventoryDetail.length >4 ? carFavInventoryDetail.slice(0,1)
                                .map(() =>
                            <div className="text-center">
                                <a href="/favorite" className="more-btn">View More<i className="bx bx-chevron-right"></i></a>
                            </div>):""}
                        </div>
                    </div>

                    {isOpen && <Popup
                            isClose={false}
                            content={<>
                                <Makeurbid toggle={toggleMakeBid} setMakeBitValue={makeBitData} getMakeBitValue={getMakeBitValue} />
                            </>}
                            handleClose={toggleMakeBid}
                        />}

         
{open && <Popup
		isClose={false}
		content={<>
			<BuyItNow toggle={toggleBuyItNow} setBuyItNowValue={buyItNowData} getBuyItNowValue={getBuyItNowValue} />
		</>}
		handleClose={toggleBuyItNow}
	/>}

{isLateFee && <Popup
		isClose={false}
		content={<>
			<LateFee toggle={toggleLateFee} />
		</>}
		handleClose={toggleLateFee}
        />}       
    </main>
}
	

        </div >
    );
};

export default CarList;