import React from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
const InventoryCars = () => {
    const [carInventoryDetail,setCarInventoryDetail]=useState("");
    const history = useHistory();
    const getInventoryCarList=()=>{
        let request={
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id
        }
        API.post('BuyerInventoryCarList/condition',request).then(res=>{
            console.log("response",res.data.data);
           // const {results} = res.data.data;
            //console.log("Response data",res.data.data);
            //if(results.length>0){
                setCarInventoryDetail(res.data.data);
            console.log("car Inventory Detail",res.data.data);
            //}
        })
    }
    const redirectpage=(pathid)=>{
        //e.preventDefault();
        history.push("/cardetail/"+pathid);
    }
    useEffect(() => {
        getInventoryCarList();
       
    },[]);
    return(
        <div>
             <main id="main" className="inner-page carList">
             <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
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
                                            <img  src={process.env.PUBLIC_URL +"/images/lock.svg"} className="img-fluid" alt="..." />
                                        </div>
                                        <a href="/Cardetail">
                                        <img className="carImg" src={item.image} className="carImg" alt="..." /></a>
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

                           
                        </div>
                    </div>
               </main>
        </div>
    )
}
export default InventoryCars;