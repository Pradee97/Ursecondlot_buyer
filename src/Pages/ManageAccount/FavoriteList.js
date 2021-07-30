import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import cars01 from '../../assets/img/cars01.png';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasolinePump.svg';
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import lock from '../../assets/img/lock.svg';
import locked from '../../assets/img/locked.svg';
import Loading from '../../Component/Loading/Loading';



const Favoritelist = () => {

  const history = useHistory();
  let userDetails = ls.get('userDetails');
  const [carFavInventoryDetail,setFavCarInventoryDetail]=useState("");
  const [loading,setLoading] = useState(true);
  const [favCarFlag,setFavCarFlag]=useState(false);
  const [data,setData]=useState("");
  const getFavCarList=()=>{

    let request={
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
    }

    console.log("request",request);
    API.post('BuyerFavoriteCarList/condition',request).then(res=>{
        setFavCarInventoryDetail(res.data.data);      
        console.log("Car Fav Inventory Detail",res.data.data);
        setLoading(false);
    }).catch(err=>{console.log(err);});
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

      if(flag==='fav'){
          setFavCarFlag(!favCarFlag)

      }
      
  })
}

useEffect(() => {
  getFavCarList();
},[favCarFlag]);


const OnSearch = (e) => {
  setData(e.target.value)
  console.log("/////////=====",e.target.value)
}

const onKeydowninSearch = (event) => {
  if (event.key === 'Enter') {
      // setCurrentPage(1)
      searchFav();
    }
}

const searchFav = () => {
  console.log("/////////",data)
  let request={
    buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
    data: data
      
  }
  API.post("BuyerFavoriteCarSearch/condition",request)
  .then((res)=>{
     
     setFavCarInventoryDetail(res.data.data);    
   
  },
  (error) => {
      console.log(error);
    }
  )
  .catch(err => { console.log(err); });
}

  return (
      <div>
        {loading?<Loading/>:
        <main id="main" class="inner-page">
        {/* <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
            </div> */}
          <div id="suggested-cars" class="suggested-cars">
            <div class="container-fluid aos-init aos-animate" data-aos="fade-up">

              <div class="section-title">
                <h2>My Favorite Car List</h2>
              </div>
              

              <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
                <div className="input-group searchbox ">
                    <input type="text"  className="form-control border"  placeholder="model/make/year" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
                    <span className="input-group-append" >
                    <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchFav} ><i className='bx bx-search'></i></button>
                    </span>                                
                </div>
            </div>

              <div class="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
              
              {carFavInventoryDetail.length>0?carFavInventoryDetail
              .map((item,index) =>
                <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                  <div class="car-item">
                    <div class="cars-lock">
                    <img src={(item.isFavourite===0)? lock : locked}  onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'fav')} />
                    </div>
                        <img src={item.image} class="carImg" alt="..." />
                        {item.isbestSale?
                        <div class="cars-tag">
                          <h4>Best deal</h4>
                        </div>:""}
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
}
      </div>  
    )
}
export default Favoritelist;