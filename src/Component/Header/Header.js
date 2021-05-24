import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';

import LogoImg from '../../../src/assets/img/Logo_final.png';

// import '../../assets/css/style.css';
import './header.css';
import { Alert } from 'antd';

const Header = () => {
  const history = useHistory();
  const location = useLocation();

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
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/contactus')}>Contact Us</a>
        </li>
        <li className="nav__submenu-item ">
          <a href="JavaScript:void(0)" onClick={()=>history.push('/about')}>About Us</a>
        </li>
        <li className="nav__submenu-item ">
        <a href="JavaScript:void(0)" onClick={()=>{history.push('/');localStorage.clear()}}>logout</a>
        </li>

      </ul>
    )
  }

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
                <a href="JavaScript:void(0)" class="facebook"><i class="bx bxl-facebook"></i></a>
                <a href="JavaScript:void(0)" className="snapchat"><i className="bx bxl-snapchat"></i></a>
                <a href="JavaScript:void(0)" className="instagram"><i className="bx bxl-instagram"></i></a>
              </div>
            </div>

            <div className="col-lg-4 topRight">
              <div className="rightMenu">
                <a href="JavaScript:void(0)"><i className="icofont-globe"></i> English <i className="icofont-thin-down"></i></a>
                <i className="bx bxl-envelope"></i> CALL US: 123 456 789
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
              <li className={location.pathname ==="/carList"? "active" : ""} ><a href="/carList" onClick={()=>history.push('/')} >Home</a></li>
              <li className={location.pathname ==="/search"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/search')} >Search</a></li>
              <li className={location.pathname ==="/mybids"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/mybids')} >My Bids</a></li>
              <li className={location.pathname ==="/fees"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/fees')} >Fees</a></li>
              <li className={location.pathname ==="/floor"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/floor')} >Floor</a></li>
              <li className={location.pathname ==="/transport"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/transport')} >Transport</a></li>
              <li className={location.pathname ==="/chat"? "active nav__menu-item" : "nav__menu-item"} >
                <img alt="Menu" src={process.env.PUBLIC_URL +"/images/chat.svg"} onClick={()=>history.push('/chat')}/>
              </li>
              <li className={location.pathname ==="/cart"? "active nav__menu-item" : "nav__menu-item"} >
                <img alt="Menu" src={process.env.PUBLIC_URL +"/images/cart.svg"} onClick={()=>history.push('/cart')}/>
              </li>
              <li>
                <b className="user_name">Welcome {JSON.parse(localStorage.getItem("userDetails")).first_name}</b>
                
                <img alt="Menu" src={process.env.PUBLIC_URL +"/images/user.svg"} /> 
              </li>
              <li className="nav__menu-item" >
                <img alt="Menu" src={process.env.PUBLIC_URL +"/images/hamburger-menu.svg"} />
                <Submenu />
              </li>


            </ul>
             
            :
            <ul>
              <li className={location.pathname ==="/"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/')} >Home</a></li>
              <li className={location.pathname ==="/about"? "active" : ""} ><a href="JavaScript:void(0)"  onClick={()=>history.push('/about')} >About</a></li>
              <li className={location.pathname ==="/fees"? "active" : ""}  ><a href="JavaScript:void(0)" onClick={()=>history.push('/fees')} >Fees</a></li>
              <li className={location.pathname ==="/contactus"? "active" : ""} ><a href="JavaScript:void(0)" onClick={()=>history.push('/contactus')}>Contactus</a></li>
             
            </ul>
             }
         
          </nav>

          {(localStorage.getItem("islogedIn") ==="false" || localStorage.getItem("islogedIn") ===null) && <a href="login" className="get-started-btn dealerLogin">Dealer Login</a> }

        </div>
      </header>
     

      <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>
    </div>


  )
}

export default Header;