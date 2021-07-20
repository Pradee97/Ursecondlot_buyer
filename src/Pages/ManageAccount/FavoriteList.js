import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import lock from '../../assets/img/lock.svg';
import cars01 from '../../assets/img/cars01.png';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasolinePump.svg';
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';



const Favoritelist = () => {

  const history = useHistory();
  let userDetails = ls.get('userDetails');
  const [carFavInventoryDetail,setFavCarInventoryDetail]=useState("");

  console.log("=======>",userDetails.user_id)
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
  getFavCarList();
},[]);

  return (
      <div>
        <main id="main" class="inner-page">
        <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
            </div>
          <div id="suggested-cars" class="suggested-cars">
            <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

              <div class="section-title">
                <h2>My Favorite Car List</h2>
              </div>
              
              <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
              
              {carFavInventoryDetail.length>0?carFavInventoryDetail
              .map((item,index) =>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <div class="car-item">
                    <div class="cars-lock">
                      <img src={lock} class="img-fluid" alt="..." />
                    </div>
                        <img src={cars01} class="img-fluid" alt="..." />
                        <div class="cars-tag">
                          <h4>Best deal</h4>
                        </div>
                        <div class="cars-content">
                        <h3><a href="#">{item.make} ({item.model} model)</a></h3>
                        <div class="d-flex align-items-center mb-3">
                            <p class="details"><img src={speedometer} alt="" /><span>{item.miles} m</span></p>
                            {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                            <p class="details"><img src={gasolinePump} alt="" /><span>Diesel</span></p>
                          </div>

                        <div class="cars-prices">
                          <a class="cta-btns" href="#">${item.max_bid}</a>
                          <a class="cta-btns-primary" href="#">Make Bid</a>
                        </div>
                    </div>
                  </div>
                </div>  ):""}                                           
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
export default Favoritelist;