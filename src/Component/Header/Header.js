import React, {  useState, useEffect } from 'react';
import ls from 'local-storage';
import API from "../../Services/BaseService";
import { useHistory, useLocation } from "react-router-dom";
import LogoImg from '../../../src/assets/img/Logo_final.png';
import cartImg from '../../../src/assets/img/cart.svg';
import chatImg from '../../../src/assets/img/chat.svg';
import hamburgermenuImg from '../../../src/assets/img/hamburger-menu.svg';
import adduser from '../../../src/assets/img/adduser.jpg';
import closebtn from '../../../src/assets/img/closebtn.png';
import './header.css';

const Header = () => {

  const userDetails=ls.get('userDetails');
  const history = useHistory();
  const location = useLocation();
  const [numberCars,setNumberCars] = useState("");
  const [myBids,setMyBids] = useState("");
  const [cart, setCart] = useState("");
  const [notificationCount,setNotificationCount] = useState("");
  


  

const countDetails = () =>{

  let request = {
      buyer_dealer_id :userDetails?.buyer_dealer_id,
  }

  API.post("countDetails/condition", request).then(response=>{

    // if(response.success ) {
      console.log("header count details check the value", response.data.data)
      
      setMyBids(response.data.data?.mybids_count || 0)
      setCart(response.data.data?.cart_count || 0)
      

    // }
    
      
  });
}
useEffect (() =>{


  countDetails();
  
  
  }, []);

  const getNotificationDetails= () =>{

    let request = {
        buyer_dealer_id : userDetails?.buyer_dealer_id,
    }
  
    
    API.post("notificationDetails/condition", request).then(response=>{
  try{
        console.log("notification data", response.data.data)
   
        // setNotification(response.data.data);
        setNotificationCount(response.data.data[0]?.count||0);
        // setNotificationTime(response.data.data.time);

        console.log("check count in notification+++",response.data.data.count)
  }
        catch(err){
          console.log(err)
        }
        
    });
}
useEffect (() =>{

  getNotificationDetails();
  // deleteNotification();
  }, []);
  
  
  useEffect(() => {
  let intervalId;
  intervalId = setInterval(() => {
  getNotificationDetails(); 
  }, 30000)
  return () => clearInterval(intervalId);
  },[]);
    
  
//   const cartDetails = () =>{

//     let request = {
//         buyer_dealer_id :userDetails?.buyer_dealer_id,
//     }

//     API.post("cartDetails/condition", request).then(response=>{

//         console.log("cart check the value", response.data.data)
//         // setCartDetail(response.data.data)
//         setNumberCars(response.data.data.length)
//         // setLoading(false);
//     });
// }

//   async function fetchMyBids() {
//     let request = {
//         buyer_dealer_id: userDetails?.buyer_dealer_id,
//     };
//     const state = API.post('mybids/condition', request);
//     state.then(res => {
//         setMyBids(res.data.data.length);
//         // setLoading(false);
//         // setLoading(false);
//     })
//         .catch(err => { console.log(err); });
// }

const Submenu = () => {

    return (
      <ul className="nav__submenu">
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/history')}>History</a>
        </li>
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/favorite')}>Favorite List</a>
        </li>
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/manageaccount')}>Manage Account</a>
        </li>
        <hr></hr>
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/contactus')}>Contact Us</a>
        </li>
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/about')}>About Us</a>
        </li>
        <hr></hr>
        <li className="nav__submenu-item ">
        <a href="JavaScript:void(0)" onClick={()=>{history.push('/');localStorage.clear()}}>Logout</a>
        </li>

      </ul>
    )
  }

  const Chat = () => {

  const [notification,setNotification] = useState("");

    const getNotification= () =>{

      let request = {
          buyer_dealer_id : userDetails?.buyer_dealer_id,
      }
    
      
      API.post("notificationDetails/condition", request).then(response=>{
    
          console.log("notification data", response.data.data)
     
          setNotification(response.data.data);
         setNotificationCount(response.data.data[0]?.count||0);
                  

          // setNotificationTime(response.data.data.time);

          console.log("check count in notification+++",response.data.data.count)

         
          
      });
  }

  const deleteNotification= (data) =>{

      let request = {
          notification_id : data.notification_id,
      }

      console.log("notification data", request)
      // return
      API.post("delete_notification/update", request).then(response=>{

          getNotification();
    
          console.log("notification id", response.data.data)
     
         
          
      });
  }

useEffect (() =>{

getNotification();
// deleteNotification();
}, []);


useEffect(() => {
let intervalId;
intervalId = setInterval(() => {
getNotification(); 
}, 30000)
return () => clearInterval(intervalId);
},[]);
        
    return (
      <div>
      
      <div  className="nav__submenu notiBlock">
        
        
          {notification.length>0?notification.map((getNotification)=>
             <div class="notoficationcontent">                        
             <div class="media">
                   <img alt="" src={getNotification.image}  />
                   <div class="media-body">
                        <h3>{getNotification.title}</h3>
                         <p>{getNotification.message}</p>
                         {getNotification.time < 60 ? <h5>{ getNotification.time} Minutes ago</h5> :
                         <h5>{ Math.floor(getNotification.time/60)} Hours ago</h5>}
                         {/* <h5>{Hours} Hours Ago</h5> */}
                   </div>
                   <span class="notofication-close-icon"onClick={()=>deleteNotification(getNotification)}>        
                   <i class='bx bxs-x-circle'></i>
                   </span>
             </div>
         </div>        
          ):<div>No Data Found</div>}
         
        </div>
        </div>
    )}

  const logoNavigation = () => {
    if (localStorage.getItem("islogedIn") ==="false" || localStorage.getItem("islogedIn") ===null) {
      history.push("/")
    }
    else {
      history.push("/carList")
    }
    
  }

  return (
    <div>
      <div id="topbar" className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 topLeft">
              <div className="socialIcons">
                <a href="JavaScript:void(0)" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="JavaScript:void(0)" className="snapchat"><i className="bx bxl-snapchat"></i></a>
                <a href="JavaScript:void(0)" className="instagram"><i className="bx bxl-instagram"></i></a>
              </div>
            </div>

            <div className="col-lg-4 topRight">
              <div className="rightMenu">
                <a href="JavaScript:void(0)"><i className="icofont-globe"></i> English <i className="icofont-thin-down"></i></a>
                <i className="bx bxl-envelope"></i> CALL US: +1(223)333-6666
			          <i className="bx bxl-phone"></i> <a href="JavaScript:void(0)">GET FREE DEMO <i className="icofont-long-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header id="header" className="">
        <div className="container-fluid d-flex align-items-center">

          <a href="#" className="logo mr-auto" ><img src={LogoImg} onClick={logoNavigation}></img></a>
          <nav className="nav-menu d-none d-lg-block nav">
          {localStorage.getItem("islogedIn") === "true" ?

              <ul className="nav__menu">
              <li className={location.pathname ==="/carList"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/carList')} >Home</a></li>
              <li className={location.pathname ==="/search"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/search')} >Search</a></li>
              <li className={location.pathname ==="/mybids"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/mybids')} >My Bids {myBids == null || myBids == undefined || myBids == "0" ? "":<span className="countbox">{myBids}</span>}</a></li>
              <li className={location.pathname ==="/fees"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/fees')} >Fees</a></li>
              <li className={location.pathname ==="/floor"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/floor')} >Floor</a></li>
              <li className={location.pathname ==="/transport"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/transport')} >Transport</a></li>
              <li className={location.pathname ==="/chat"? "active nav__menu-item" : "nav__menu-item"} >
                <img alt="Menu" src={chatImg} /><Chat/>
                {/* <span className="countbox">{notification.length}</span> */}
               {notificationCount == undefined || notificationCount == null || notificationCount == "0"? "" : <span className="countbox">{notificationCount}</span>}

              </li>
              <li className={location.pathname ==="/cart"? "active nav__menu-item" : "nav__menu-item"} >
                <img alt="Menu" src={cartImg} onClick={()=>history.push('/cart')}/>
               {cart == "0" || cart == undefined || cart == null ? "" : <span className="countbox">{cart}</span> }
              </li>
              <li className="topRightUser">
                <b className="user_name">Welcome 
                </b> 
                <b className="user_name">    
                 {JSON.parse(localStorage.getItem("userDetails")).first_name} 
                </b>          
                 <img alt="Menu" src={JSON.parse(localStorage.getItem("userDetails")).image || adduser} /> 
              </li>
              <li className="nav__menu-item" >
                <img alt="Menu" src={hamburgermenuImg} />
                <Submenu />
              </li>


            </ul>
             
            :
            <ul>
              <li className={location.pathname ==="/"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/')} >Home</a></li>
              <li className={location.pathname ==="/about"? "active" : ""} ><a href="JavaScript:void(0)"  onClick={()=>history.push('/about')} >About Us</a></li>
              <li className={location.pathname ==="/fees"? "active" : ""}  ><a href="JavaScript:void(0)" onClick={()=>history.push('/fees')} >Fees</a></li>
              <li className={location.pathname ==="/contactus"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/contactus')}>Contactus</a></li>
             
            </ul>
             }
         
          </nav>

          {(localStorage.getItem("islogedIn") ==="false" || localStorage.getItem("islogedIn") ===null) && <a href="JavaScript:void(0)" onClick={()=>history.push('/login')} className="get-started-btn dealerLogin">Dealer Login</a> }

        </div>
      </header>
      <a href="JavaScript:void(0)" className="back-to-top"><i className="ri-arrow-up-line"></i></a>
    </div>


  )
}

export default Header;