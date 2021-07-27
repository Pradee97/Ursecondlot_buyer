import React from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import lock from '../../src/assets/img/lock.svg';
import locked from '../../src/assets/img/locked.svg';
import Loading from '../Component/Loading/Loading';


const InventoryCars = () => {

    const history = useHistory();
    const [carInventoryDetail,setCarInventoryDetail]=useState("");
    const [inventoryCarFlag,setInventoryCarFlag]=useState(false);
    const [loading,setLoading] = useState(true);
    const [data,setData]=useState("");

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
            setLoading(false);
            //}
        }).catch(err=>{console.log(err);});
    }

    const redirectpage=(pathid)=>{
        //e.preventDefault();
        history.push("/cardetail/"+pathid);
    }

    const addRemoveFavourite=(carid,state,flag)=>{
        console.log("inside addremove");
        let request={
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
            car_id:carid,
            active: !state
        }
        console.log("request",request);
        API.post('buyer_favourite/add',request).then(res=>{
            // setaddFavourite(res.data.data);
            console.log("add Fav Inventory Detail",res.data.data);

            if(flag==='inv'){
                setInventoryCarFlag(!inventoryCarFlag)
            }
           
        })
    }

    useEffect(() => {
        getInventoryCarList();
       
    },[inventoryCarFlag]);

    const OnSearch = (e) => {
        setData(e.target.value)
        console.log("/////////=====",e.target.value)
      }
      
      const onKeydowninSearch = (event) => {
        if (event.key === 'Enter') {
            // setCurrentPage(1)
            searchCarInventoryDetail();
          }
      }
      
      const searchCarInventoryDetail = () => {
        console.log("/////////",data)
        let request={
          buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
          data: data
            
        }
        API.post("BuyerInventoryCarSearch/condition",request)
        .then((res)=>{
           
            setCarInventoryDetail(res.data.data);
         
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
             <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
            </div>
             <div id="inventory-cars" className="inventory-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">

                            <div className="section-title">
                                <h2>inventory</h2>
                            </div>
                            <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
                                <div className="input-group searchbox ">
                                    <input type="text"  className="form-control border"  placeholder="model/make" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
                                    <span className="input-group-append" >
                                    <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchCarInventoryDetail} ><i className='bx bx-search'></i></button>
                                    </span>                                
                                </div>
                            </div>
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carInventoryDetail.length>0?carInventoryDetail
                            .map((item,index) =>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                    <div className="car-item">
                                        <div className="cars-lock">
                                        <img src={(item.isFavourite===0)? locked : lock} onClick={()=>addRemoveFavourite(item.car_id,item.isFavourite,'recent')} />
                                        </div>
                                        <a href="/Cardetail">
                                        <img className="carImg" src={item.image} className="carImg" alt="..." /></a>
                                        {item.isbestSale?
                                        <div className="cars-tag">
                                            <h4>Best deal</h4>
                                        </div>:""}
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
}
        </div>
    )
}
export default InventoryCars;