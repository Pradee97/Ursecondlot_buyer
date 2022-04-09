import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import API from "../../../Services/BaseService";
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks";
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import { Button } from 'antd';
import Loading from '../../../Component/Loading/Loading';
import Popup from '../../../Component/Popup/Popup';
import LateFee from '../../../Pages/LateFee/LateFee';

const Buyers = () => {

    const history = useHistory();
    let userDetails = ls.get('userDetails');
    const [userList,setUserList] = useState("");
    const [data,setData]=useState("");
    const [isOpen, setIsOpen] = useState(false);    
    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("");
    const [oldUserList,setOldUserList]=useState ("");
    const [loading,setLoading] = useState(true);

    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  	}

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }
    async function getuserDetails() {
        let request = {
            buyer_dealer_id: userDetails.buyer_dealer_id
        };
        const state = API.post('user_list/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setOldUserList(res.data.data);
            setUserList(res.data.data);
            setLoading(false);
        })
            .catch(err => { console.log(err); });
    }
    function searchUser(){
        console.log("=====data=======>",data)        
        let request={
            data: data,
            buyer_dealer_id:userDetails.buyer_dealer_id
        }
        if(data!==""){
        API.post("userSearch/condition",request)
        .then((response)=>{
            if(response.data.data.length==0){
                setUserList(oldUserList);
                togglePopup()
                setPopupTitle("Data not found ");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("ok");
                
            }
            else if(response.data.data.length !==0){
            console.log("=====response=======>",response)
            console.log("rep search req",request);
            console.log("inside rep search", response.data.data);
            setUserList(response.data.data);
            }
           
        },
        (error) => {
            console.log(error);
          }
        );
        } else {
            setUserList(oldUserList);
           
        }
    }
    function onHandleEdit(e) {
        history.push("/buyerview/"+e);
      }

      const getlateFee=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('getlatefee/condition',request).then(res=>{
           if(res.data.data.length){
            
       console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
            const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
            setIsLateFee(lateFeeValueStatus==="yes")
            setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
           }
          
    
        }).catch(err=>{console.log(err);});
    }

    useEffect(() => {

        getlateFee();
        getuserDetails();

    }, []);
    function formatMobileNO(value){
        var x = value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
        console.log("value of x",x);
        value = '+1 '+ '('+ x[1] +') ' + x[2] + '-' + x[3];
        console.log("mobileno",value);
        return value;
     }
    return (
        <div>
             {loading?<Loading/>:
            <main id="main" className="inner-page">
   
            <div id="adduserpage" className="adduserpage">
       <div className="container" >
           <div className="adduserpageblock col-lg-12">
               <div className="section-title">
                 <h2>Buyers</h2>
               </div>
               <div className="row content">
                   <div className="col-lg-3 col-md-6 col-sm-12 accountleftblock">
                      
                       <ManageAccountLinks />
                   </div>
                   <div className="col-lg-9 col-md-12 col-sm-12 pt-4 pt-lg-0 adduserpagerightblock">
                       <div className="adduserpage-inner"> 
                            <div className="col-lg-12"> 

                            <div className="filtersblock col-lg-9" >
                                <div className="input-group searchbox">
                                <input type="text"  className="form-control border" placeholder="Search" onChange={(e) => setData(e.target.value)}></input>
                                <span className="input-group-append" >
                                <button className="btn ms-n5" type="button"  id="btntest" name="btntest" disable onClick={searchUser} ><i className='bx bx-search'></i></button>
                                </span>
                                
                                </div>
                            </div>                                

                                <div className="col-lg-12 userlisttableblock">
                                    <div className="add-user">
                                    <Button className="add-user-btns" onClick={() => history.push("/adduser")}><i className="icofont-plus"></i> Add User</Button>
                                        {/*<a className="add-user-btns" href="/adduser"><i className="icofont-plus"></i> Add User</a>*/}
                                    </div>
				
                                    <div className="userlisttable table-responsive">
                                    {userList.length>0?
                                        <table className="table table-striped w-auto">
                                        <thead>
                                            <tr>
                                                <th className="th_id">ID</th>
                                                <th className="th_name">Name</th>
                                                <th className="th_img">Image</th>
                                                <th className="th_phone">Phone #</th>
                                                <th className="th_privileges">Privileges</th>
                                                <th className="th_status">Status</th>
                                                <th className="th_action">Action</th>
                                            </tr>
                                        </thead>
                                        {userList.length>0?userList.map((item,index) =>
                                        <tr>
                                            <td>{item.buyer_id}</td>															
                                            <td><span className="cartitlename">{item.first_name} {item.last_name} </span></td>
                                            <td className="userImage">{item.image===""?
                                            <img alt=""  src={process.env.PUBLIC_URL + "/images/adduser.jpg"}/>:
                                            <img alt="" src={item.image} />
                                            }</td>
                                            <td className="phonenotab">{formatMobileNO(item.phone_no)}</td>
                                            {/* <td>{item.email}</td> */}
                                            <td>{item.buy_now===1?"Buy Now,":"No privileges"}{item.cancel_bid===1?"Cancel the bid after 4 hours,":""}{item.bid===1?"Bid,":""}
                                            {item.proxy_bid===1?"Proxy Bid,":""}{item.counter_bid===1?"Counter Bid,":""}{item.lot_fee===1?"Lot Fee.":""}</td>
                                            <td>{item.status===1?"Active":"InActive"}</td>
                                            <td><Button className="ant-btn" onClick={() => onHandleEdit(item.buyer_id)}><i className="icofont-ui-edit"></i> View</Button></td>
                                        </tr>
                                         ):
                                        <tr><td colspan="6" ng-show="0">
                                        <b>There's No Data</b>
                                            </td>
                                        </tr>
                                        }                                       
                                        </table> :""}            
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
   {isOpen && 
        <CommonPopup 
            handleClose= {togglePopup}
            popupTitle= {popupTitle}
            popupMsg= {popupMsg}
            popupType= {popupType}
            popupActionType= {popupActionType}
            popupActionValue= {popupActionValue}
            popupActionPath={popupActionPath}
        />}

{isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />} 

 </main>
}
    </div>


);
};

export default Buyers;