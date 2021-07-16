import React from 'react';
import ls from 'local-storage';
import Popup from '../../Component/Popup/Popup';
import Makeurbid from '../Makeurbid';
import '../../assets/css/responsive.css';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const CarList = () => {
    const history = useHistory();
    let userDetails = ls.get('userDetails');
    const [carDetail,setCarDetail]=useState("");
    const [carInventoryDetail,setCarInventoryDetail]=useState("");
    const [carFavInventoryDetail,setFavCarInventoryDetail]=useState("");

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    console.log("=======>",userDetails.user_id)
    const getrecentCarList=()=>{
        //console.log()
        API.post('BuyerNewCarList/condition').then(res=>{
            console.log("response",res.data.data);
           // const {results} = res.data.data;
            console.log("Response data",res.data.data);
            //if(results.length>0){
            setCarDetail(res.data.data);
            console.log("car Detail",res.data.data);
            //}
        })
    }
    const getInventoryCarList=()=>{
        API.post('BuyerInventoryCarList/condition').then(res=>{
            console.log("response",res.data.data);
           // const {results} = res.data.data;
            //console.log("Response data",res.data.data);
            //if(results.length>0){
                setCarInventoryDetail(res.data.data);
            console.log("car Inventory Detail",res.data.data);
            //}
        })
    }

    const getFavCarList=()=>{
        let request={
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id
        }
        console.log("request",request);
        API.post('BuyerFavoriteCarList/condition',request).then(res=>{
            setFavCarInventoryDetail(res.data.data);
            console.log("Car Fav Inventory Detail",res.data.data);
        })
    }
    useEffect(() => {
        getrecentCarList();
        getInventoryCarList();
        getFavCarList();


    },[]);

    return (
       
            <div>
                <main id="main" className="inner-page">
                    <div id="suggested-cars" className="suggested-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Suggested cars</h2>
                            </div>
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carDetail.length>0?carDetail
                            .map((item,index) =>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"}  />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}/>
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">${item.max_bid}</a>
                                                <a className="cta-btns-primary" >Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                               </div>
                            <div className="text-center">
                                <a href="#" className="more-btn">View More <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>



                    <div id="inventory-cars" className="inventory-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>inventory</h2>
                            </div>

                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carInventoryDetail.length>0?carInventoryDetail
                            .map((item,index) =>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"} className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>31,1241 m</span></p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">${item.max_bid}</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                                </div>

                            <div className="text-center">
                                <a href="#" className="more-btn">See More Make Search <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="recently-cars" className="recently-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>Recently Added Cars</h2>
                            </div>

                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carDetail.length>0?carDetail
                                        .map((item,index) =>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>
                                        <div className="cars-content">
                                            <h3><a href="#">{item.make} ({item.model} model)</a></h3>
                                            <div className="d-flex align-items-center mb-3">
                                                <p className="details"><img src={process.env.PUBLIC_URL +"/images/speedometer.svg"} alt="" /><span>{item.miles} m</span></p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p className="details"><img src={process.env.PUBLIC_URL +"/images/gasoline-pump.svg"} alt="" /><span>Diesel</span></p>
                                            </div>

                                            <div className="cars-prices">
                                                <a className="cta-btns" href="#">${item.max_bid}</a>
                                                <a className="cta-btns-primary" href="#">Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                                </div>
                            <div className="text-center">
                                <a href="#" className="more-btn">See More Make Search <i className="bx bx-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div id="favorite-cars" className="favorite-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>favorite list</h2>
                            </div>
                           

                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carFavInventoryDetail.length>0?carFavInventoryDetail
                            .map((item,index) =>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <img src={process.env.PUBLIC_URL +"/images/cars01.png"}className="img-fluid" alt="..." />

                                        <div className="cars-content">
                                            <h3><a href="#">View Details</a></h3>
                                        </div>
                                    </div>
                                </div>):""}
                                </div>
                        </div>


                        <div className="text-center">
                            <a href="#" className="more-btn">View Favorite List <i className="bx bx-chevron-right"></i></a>
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

	

        </div >
    );
};

export default CarList;