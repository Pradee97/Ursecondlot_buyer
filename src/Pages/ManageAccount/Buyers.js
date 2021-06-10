import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import { Button } from 'antd';

const Buyers = () => {
    const history = useHistory();
    let userDetails = ls.get('userDetails');
    const [userList,setUserList] = useState("");
    const [data,setData]=useState("");
    async function getuserDetails() {
        let request = {
            dealer_id: userDetails.dealer_id
        };
        const state = API.post('user_list/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setUserList(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    function searchUser(){
        console.log("=====data=======>",data)
        let request={
            data: data,
            dealer_id:userDetails.dealer_id
        }
        if(data!==""){
        API.post("userSearch/condition",request)
        .then((response)=>{
            console.log("=====response=======>",response)
            console.log("rep search req",request);
            console.log("inside rep search", response.data.data);
            setUserList(response.data.data);
        },
        (error) => {
            console.log(error);
          }
        );
        } else {
            setUserList([]);
        }
    }
    function onHandleEdit(e) {
        history.push("/buyeredit/"+e);
      }
    useEffect(() => {
        getuserDetails();
    }, []);
    return (
        <div>
            <main id="main" class="inner-page">
   
            <div id="adduserpage" className="adduserpage">
       <div className="container" >
           <div className="adduserpageblock col-lg-12">
               <div className="section-title">
                 <h2>Buyers</h2>
               </div>
               <div className="row content">
                   <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                       <div className="mgaccountuser">
                           <div className="mgaccountuserleft">
                               <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} className="img-fluid" alt="..."/>
                           </div>
                           <div className="mgaccountuserright">
                               <h3>Fernand</h3>
                               <div className="d-flex align-items-center">
                                   <p className="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} className="img-fluid" alt="..."/><span>California, Cl</span></p>
                               </div>
                                   
                           </div>
                       </div>
                       <ManageAccountLinks />
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 adduserpagerightblock">
                       <div className="adduserpage-inner"> 
                            <div className="col-lg-12"> 

                            <div class="filtersblock col-lg-9" >
                                <div class="input-group searchbox">
                                <input type="text"  class="form-control border" placeholder="Search" onChange={(e) => setData(e.target.value)}></input>
                                <span class="input-group-append" >
                                <button class="btn ms-n5" type="button"  id="btntest" name="btntest" disable onClick={searchUser} ><i class='bx bx-search'></i></button>
                                </span>
                                
                                </div>
                            </div>                                

                                <div class="col-lg-12 userlisttableblock">
                                    <div class="add-user">
                                        <a class="add-user-btns" href="/adduser"><i class="icofont-plus"></i> Add User</a>
                                    </div>					
                                    <div class="userlisttable">
                                        <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Phone</th>
                                                {/* <th>Email</th> */}
                                                <th>Privileges</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {userList.length>0?userList.map((item,index) =>
                                        <tr>
                                            <td>{item.user_id}</td>															
                                            <td><span class="cartitlename">{item.first_name} {item.last_name} </span></td>
                                            <td class="userImage">{item.image===""?
                                            <img alt="" src="adduser.jpg" src={process.env.PUBLIC_URL + "/images/adduser.jpg"}/>:
                                            <img alt="" src={item.image} />
                                            }</td>
                                            <td>{item.phone_no}</td>
                                            {/* <td>{item.email}</td> */}
                                            <td>{item.buy_now===1?"Buy Now,":""}{item.cancel_bid===1?"Cancel the bid after 4 hours,":""}{item.bid===1?"Bid,":""}
                                            {item.proxy_bid===1?"Proxy Bid,":""}{item.counter_bid===1?"Counter Bid,":""}{item.lot_fee===1?"Lot Fee.":""}</td>
                                            <td>{item.status===1?"Active":"InActive"}</td>
                                            <td><Button class="ant-btn" onClick={() => onHandleEdit(item.user_id)}><i class="icofont-ui-edit"></i> Edit</Button></td>
                                        </tr>
                                        ):
                                        <tr><td colspan="6" ng-show="0">
                                        <b>There's No Data</b>
                                            </td>
                                        </tr>}                                       
                                        </table>            
                                    </div>
					            </div>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   
  

   <section id="playstoreBlock" className="playstoreBlock">
     <div className="container">


       <div className="row content">
         <div className="col-lg-12">
         <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
           <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
          
         </div>
        
       </div>

     </div>
   </section>
 </main>
    </div>


);
};

export default Buyers;