import React from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
const SuggestedCars = () => {
    const [carDetail ,setCarDetail] = useState([]);
    const history = useHistory();
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
    const redirectpage=(pathid)=>{
        //e.preventDefault();
        history.push("/cardetail/"+pathid);
    }
    useEffect(() => {
        getrecentCarList();
       
    },[]);
    return(
        <div>
             <main id="main" className="inner-page carList">
                    <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
                    </div>
                    <div id="suggested-cars" className="suggested-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Suggested cars</h2>
                            </div>
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carDetail.length>0?carDetail.map((item) =>
                            
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                            <img src={process.env.PUBLIC_URL +"/images/lock.svg"}  />
                                        </div>
                                        <img className="carImg" src={item.image}  onClick={()=>{redirectpage(item.car_id)}}/>
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
                                                <a className="cta-btns-primary" href="JavaScript:void(0)" >Make Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>):""}
                            </div>
                        </div>
                    </div>
               </main>
        </div>
    )
}
export default SuggestedCars;