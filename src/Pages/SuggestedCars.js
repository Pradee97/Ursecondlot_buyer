import React from 'react';
import ls from 'local-storage';
import API from "../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import lock from '../../src/assets/img/lock.svg';
import locked from '../../src/assets/img/locked.svg';
import Loading from '../Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import CarListAction from './CarList/CarListAction';
const SuggestedCars = () => {

    const history = useHistory();
    const [carDetail ,setCarDetail] = useState([]);
    const [recentCarFlag,setrecentCarFlag]=useState(false);
    const [loading,setLoading] = useState(true);
    const [data,setData]=useState("");
    const dispatch = useDispatch();

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
       
    },[recentCarFlag]);


    const OnSearch = (e) => {
        setData(e.target.value)
        console.log("/////////=====",e.target.value)
      }
      
      const onKeydowninSearch = (event) => {
        if (event.key === 'Enter') {
            // setCurrentPage(1)
            searchCarDetail();
          }
      }
      
      const searchCarDetail = () => {
        console.log("/////////",data)
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
          data: data
            
        }
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
                    <div class="back-btn">
                        <a class="back-btn-primary" href="/carlist"><i class="bx bx-chevron-left"></i> Back</a>
                    </div>
                    <div id="suggested-cars" className="suggested-cars">
                        <div className="container-fluid aos-init aos-animate" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Suggested cars</h2>
                            </div>

                            <div className="filtersblock  col-lg-6 SalesRepsSearch  row" >
                                <div className="input-group searchbox ">
                                    <input type="text"  className="form-control border"  placeholder="model/make/year" onKeyDown={onKeydowninSearch} onChange={OnSearch}></input>
                                    <span className="input-group-append" >
                                    <button className="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchCarDetail} ><i className='bx bx-search'></i></button>
                                    </span>                                
                                </div>
                            </div>
                            <div className="row aos-init aos-animate" data-aos="zoom-in" data-aos-delay="100">
                            {carDetail.length>0?carDetail.map((item) =>
                            
                                <div className="col-lg-2 col-md-3 col-sm-4 col-xs-6">
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
}
        </div>
    )
}
export default SuggestedCars;