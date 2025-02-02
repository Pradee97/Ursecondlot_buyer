import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import Popup from '../../Component/Popup/Popup';
import '../../Component/Popup/popup.css';
const Home = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
   
    return (
        <div>
     <section id="hero" className="d-flex align-items-center">      
    <div className="container">
      <div className="row">
        <div className="col-lg-12 d-flex flex-column align-items-center justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
		<div className="bannertext-bg">
          <h1>Welcome to Auction 24/7</h1>
          <h2>Where you can buy Fresh New Car Dealer Trade-In <br />And Bank Repo Anytime</h2>
		  </div>

          <div className="d-lg-flex">
          {localStorage.getItem("islogedIn") === "true" ?"":
          <button className="btn-get-started scrollto" type="button" onClick={togglePopup}>Become a Dealer</button>}
   
          {isOpen && <Popup
            isClose={true}
            content={<>
    
    <div className="modals">
		  <div className="modals-dialog modals-dialog-centered popupmodel">
			<div className="modals-content">
			  <div className="modals-header">
         {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={togglePopup}>
				  <span aria-hidden="true">&times;</span>
				</button> */}
			  </div>
			  <div className="location-login">        
					 <img alt="" src={process.env.PUBLIC_URL +"/images/Logo_final.png"}  />
			</div>
			  <div className="modals-body">
				<p>Location of your Dealership</p>
			  </div>
			  <div className="modals-footer ">
				{/* <a className="cta-btns" href="registration">In United States</a> */}
        <button className="cta-btns" onClick={() => history.push("/registration")}>In United States</button>
				<button className="cta-btns-primary" onClick={() => {alert('Yet not added')}}>Out of United States</button>
			  </div>
			</div>
		  </div>
		</div>

      </>}
      handleClose={togglePopup}
    />}
            {/* <button onClick={() => setBecomedealer(true)}>Becomedealer</button>
            <Popup trigger={buttonBecomedealer}>hi</Popup> */}
            {/* <a href="#" className="btn-get-started scrollto" data-toggle="modal" data-target="#exampleModalCenter"> Become a Dealer</a> */}
          </div>
        </div>
        
      </div>
    </div>
    </section>
    <main id="main">
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


    )
}

export default Home;