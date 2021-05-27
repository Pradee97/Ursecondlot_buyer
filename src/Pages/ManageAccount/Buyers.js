import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"

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
        let request={
            data: data,
            dealer_id:userDetails.dealer_id
        }
        API.post("userSearch/condition",request)
        .then((response)=>{
            console.log("rep search req",request);
            console.log("inside rep search", response.data.data);
            setUserList(response.data.data);
        },
        (error) => {
            console.log(error);
          }
        );
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
                                <button class="btn ms-n5" type="button" id="btntest" name="btntest" onClick={searchUser} ><i class='bx bx-search'></i></button>
                                </span>
                                
                                </div>
                            </div>                                

                                <div class="col-lg-12 userlisttableblock">
                                    <div class="add-user">
                                        <a class="add-user-btns" href="/adduser"><img src={process.env.PUBLIC_URL +"/images/addbtn.jpg"}  alt="adduser"/>Add User</a>
                                    </div>					
                                    <div class="userlisttable">
                                        <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Privileges</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        {userList.length>0?userList.map((item,index) =>
                                        <tr>
                                            <td>{item.user_id}</td>															
                                            <td><span class="cartitlename">{item.first_name} {item.last_name} </span></td>
                                            <td>{item.phone_no}</td>
                                            <td>{item.email}</td>
                                            <td>amorsolo, Cancel the bid after 4 hours, Bid, Proxy Bid, Counter Bid, Lot Fee</td>
                                            <td>{item.active==="1"?"Active":"InActive"}</td>
                                        </tr>
                                        ):""}
                                        
                                        
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