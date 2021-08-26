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
import CarDetailsAction from '../CarDetails/CarDetailsAction';

import { Paper, Button } from '@material-ui/core'



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
    const highBid= useSelector(state => state.CarDetailsReducer.payload.high_bid);

    const [isOpen, setIsOpen] = useState(false);
    const options = {
        items: 4,
    };
    const togglePopup = (high_bid,min_price,save_purchase,car_id,time,counterbuyerid,max_price,buy_it_now) => {
        let makebiddispatch={
            high_bid: high_bid,
            min_price: min_price,
            car_id : car_id,
            save_purchase: save_purchase,
            time:time,
            counter_buyerid:counterbuyerid,
            max_price:max_price,
            buy_it_now: buy_it_now,
            redirectPage:"carlist"
        }
        
        //dispatch(CarDetailsAction.highBid(high_bid))
        dispatch(CarDetailsAction.minBid(makebiddispatch))
        setIsOpen(!isOpen);
    }
    const getSuggestedCarList=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('SuggestedCarList/condition',request).then(res=>{
           
           // const {results} = res.data.data;
            
            //if(results.length>0){
            setSuggestedCarDetail(res.data.data);
            
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
           
            setLoading(false);
            //}
            //setInventoryCarFlag(!inventoryCarFlag)
        }).catch(err=>{console.log(err);});
    }
    const redirectpage=(pathid,seller_dealer_id)=>{
        //e.preventDefault();
        
        dispatch(CarListAction.sellerid(seller_dealer_id))
        history.push("/cardetail/"+pathid);
        // history.push({
        //     pathname: '/cardetail',
        //     state: {id:pathid},
        //   });
    }

    const getFavCarList=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('BuyerFavoriteCarList/condition',request).then(res=>{
            setFavCarInventoryDetail(res.data.data);
            
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

    useEffect(() => {
        getSuggestedCarList();
        getrecentCarList();
        getInventoryCarList();
        getFavCarList();

    },[highBid]);
    

    useEffect(() => {
        getSuggestedCarList();
        getrecentCarList();
        getInventoryCarList();
        getFavCarList();

    },[]);

    
    useEffect(() => {
        getrecentCarList();
        getFavCarList();
        getInventoryCarList();
        getSuggestedCarList();
        
    },[recentCarFlag]);

    
    useEffect(() => {
        getrecentCarList();
        getInventoryCarList();
        getFavCarList();
        getSuggestedCarList();

    },[inventoryCarFlag]);
    useEffect(() => {
        getrecentCarList();
        getInventoryCarList();
        getFavCarList();
        getSuggestedCarList();

    },[favCarFlag]);

    return (
       
            <div>
                {loading?<Loading/>:
                <main id="main" className="inner-page carList">
                     
                    <div id="suggested-cars" className="suggested-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Suggested cars</h2>
                            </div>
                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                                loop margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
                            {suggestedCarDetail?.length>0?suggestedCarDetail
                            .map((item) =>
                            
                                <div>
                                    <div className="car-item">
                                        <div className="cars-lock">

                                            {/* <img src={(item.isFavourite===0)? locked : lock} onClick={()=>(item.isFavourite===0)?addFavourite(item.car_id):removeFav(item.car_id)} /> */}
                                            <img src={(item.isFavourite===0)? lock : locked} onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'recent')} />
                                        </div>
                                        <img className="carImg" src={item.image}  onClick={()=>{redirectpage(item.car_id,item.seller_dealer_id)}}/>
                                        {item.isbestSale?
                                        <div className="cars-tag">
                                            <h4>{item.deal_name}</h4>
                                        </div>:""}
                                        
                                        <div className="cars-content">
                                            <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>   
                                                <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                    <span>Buy It Now $ {item.buy_it_now}</span>
                                                }
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3 dealerType">
                                                <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> 1663 Roy Alley Denver </span>
                                                </p>
                                                <p className="details"><img src={item.image}/></p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details">location-<span>{item.location} </span></p>
                                               
                                            </div>
                                  
                                            <div className="cars-prices">
                                                {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}

                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                                <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                                }   
                                                {/* {item.counter_bid=="" || item.counter_bid== null || item.counter_bid== undefined?"":
                                                <a className="cta-btns" href="#">Counter Bid $ {item.counter_bid}</a>
                                                } */}
                                                <a className="cta-btns-primary" href="JavaScript:void(0)" onClick={()=>togglePopup(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now)} >Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                               {/* </div> */}
                               </OwlCarousel>
                            <div className="text-center">
                                <a href="/suggestedcars" className="more-btn">View More <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                   
                    <div id="inventory-cars" className="inventory-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>inventory</h2>
                            </div>

                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                                loop margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
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
                                            <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>    
                                                <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                    <span>Buy It Now $ {item.buy_it_now}</span>
                                                }
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3 dealerType">
                                                
                                                <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> 1663 Roy Alley Denver </span>
                                                </p>
                                                <p className="details"><img src={item.image}/></p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details">location-<span>{item.location} </span></p>
                                               
                                            </div>
                                            <div className="cars-prices">
                                            {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}
                                               
                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                                <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                                } 
                                                {/* {item.counter_bid=="" || item.counter_bid== null || item.counter_bid== undefined?"":
                                                <a className="cta-btns" href="#">Counter Bid $ {item.counter_bid}</a>
                                                } */}
                                                <a className="cta-btns-primary" onClick={()=>togglePopup(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now)} >Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                                </OwlCarousel>

                            <div className="text-center">
                                <a href="/InventoryCars" className="more-btn">View More<i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="recently-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Recently Added Cars</h2>
                            </div>

                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                               loop margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
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
                                            <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>  
                                                <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                    <span>Buy It Now $ {item.buy_it_now}</span>
                                                }
                                                </p>  
                                            </div>
                                            <div className="d-flex align-items-center mb- dealerType">
                                            <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> 1663 Roy Alley Denver </span>
                                                </p>
                                                <p className="details"><img src={item.image}/></p>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details">location-<span>{item.location} </span></p>
                                               
                                            </div>
                                            <div className="cars-prices">
                                            {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}
                                               
                                                {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                                <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                                } 
                                                {/* {item.counter_bid=="" || item.counter_bid== null || item.counter_bid== undefined?"":
                                                <a className="cta-btns" href="#">Counter Bid $ {item.counter_bid}</a>
                                                } */}
                                                <a className="cta-btns-primary" onClick={()=>togglePopup(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now)}>Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                                </OwlCarousel>
                            <div className="text-center">
                                <a href="/recentlyAddedCars" className="more-btn">View More<i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    
                    <div id="favorite-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>favorite list </h2>
                            </div>
                           

                            {/* <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100"> */}
                            <OwlCarousel className='owl-theme row aos-init aos-animate' data-aos="zoom-in" data-aos-delay="100" 
                                loop margin={10} items={4} dots ={false} nav autoplay={false} navText ={['<i class="icofont-block-left"></i>','<i class="icofont-block-right"></i>']}>
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
                                    <h3><a href="JavaScript:void(0)" title = {`${item.make} (${item.model}) model`}>{item.make} ({item.model} model)</a></h3>
                                    <div className="d-flex align-items-center mb-3">
                                        <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
                                        <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>{item.fuel_type}</span></p>
                                        <p className="details buyitnow">
                                                {item.buy_it_now=="" || item.buy_it_now== null || item.buy_it_now== undefined?"":
                                                    <span>Buy It Now $ {item.buy_it_now}</span>
                                                }
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3 dealerType">
                                        <p className="details">
                                                <span className="dlrname">{item.dealer_type} </span>
                                                <span className="dlraddress"><i class="icofont-google-map"></i> 1663 Roy Alley Denver </span>
                                        </p>
                                        <p className="details"><img src={item.image}/></p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                                <p className="details">location-<span>{item.location} </span></p>
                                               
                                            </div>
                                    <div className="cars-prices">
                                        {/* <a className="cta-btns" href="#">Inventory Number {item.inventory_no}</a> */}
                                       
                                        {item.high_bid=="" || item.high_bid== null || item.high_bid== undefined?"":
                                        <a className="cta-btns" href="#">High Bid $ {item.high_bid}</a>
                                        } 
                                        {/* {item.counter_bid=="" || item.counter_bid== null || item.counter_bid== undefined?"":
                                        <a className="cta-btns" href="#">Counter Bid $ {item.counter_bid}</a>
                                        } */}
                                        <a className="cta-btns-primary" onClick={()=>togglePopup(item.high_bid, item.min_price, item.save_purchase, item.car_id, item.time, item.counter_buyer_dealer_id, item.max_price, item.buy_it_now)}>Make Bid</a>
                                    </div>
                                </div>
                            </div>
                        </div>):""}
                        </OwlCarousel>
                        </div>


                        <div className="text-center">
                            <a href="/favorite" className="more-btn">View More  <i className="bx bx-chevron-right"></i></a>
                        </div>
                    </div>
        


{isOpen && <Popup
		isClose={false}
		content={<>
			<Makeurbid toggle={togglePopup} />
		</>}
		handleClose={togglePopup}
	/>}

         
           
        
    </main>
}
	

        </div >
    );
};

export default CarList;