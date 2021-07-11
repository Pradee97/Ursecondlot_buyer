import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer'
import './App.css';
import SessionConfirmationPopup from "./Component/CommonPopup/SessionConfirmationPopup"

// import Loading from './Component/Loading/Loading';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Success from './Component/Success';
import Error from './Component/Error';
import EmailError from './Component/EmailError';
import Email from './Component/Email';
import Fees from './Pages/Fees/Fees';
import Emailsuccess from './Component/Emailsuccess';
import FloorPlans from './Pages/Floor/FloorPlans';
import FloorAdd from './Pages/Floor/FloorAdd';
import FloorEdit from './Pages/Floor/FloorEdit';
import About from './Pages/About/About';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import CarList from './Pages/CarList/CarList';
import Contactus from './Pages/Contactus/Contactus';
import Header from './Component/Header/Header';
import Inprogress from './Component/Inprogress/Inprogress';
import ManageAccount from './Pages/ManageAccount/ManageAccount';
import LotFee from './Pages/ManageAccount/LotFee';
import Notification from './Pages/ManageAccount/Notification';
import Payment from './Pages/ManageAccount/Payment';
import PaymentInfo from './Pages/ManageAccount/PaymentInfo';
import EditPayment from './Pages/ManageAccount/EditPayment';
import Footer from './Component/Footer';
import Document from './Pages/ManageAccount/Document';
import Buyers from './Pages/ManageAccount/Buyer/Buyers';
import AddUser from './Pages/ManageAccount/Buyer/AddUser';
import MyProfile  from './Pages/ManageAccount/MyProfile/MyProfile';
import EditMyProfile  from './Pages/ManageAccount/MyProfile/EditMyProfile';
import EditDealerInformation from './Pages/ManageAccount/EditDealerInformation';
import EditAddress  from './Pages/ManageAccount/Address/EditAddress';
import AddLegalAccount  from './Pages/ManageAccount/LegalAccount/AddLegalAccount';
import AddAddress  from './Pages/ManageAccount/Address/AddAddress';
import EditLegalAccount from './Pages/ManageAccount/LegalAccount/EditLegalAccount';
import EditBuyer from './Pages/ManageAccount/Buyer/EditBuyer';
import ForgotPasswordEmail from './Pages/ForgotPassword/ForgotPasswordEmail';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ForgotEmail from './Pages/ForgotPassword/ForgotEmail';
import Favoritelist from './Pages/ManageAccount/FavoriteList';
function AppRouter() {

  const timeout = 900000;
  // const timeout = 30000;
  const [isSession, setIsSession] = useState (false);// for session popup
  const [remaining, setRemaining] = useState(timeout)

  const handleOnIdle = () =>{
    if (localStorage.getItem("islogedIn") === "true") {
      setIsSession(true)
    }
  } 

  const { getRemainingTime } =useIdleTimer({ timeout,   onIdle: handleOnIdle, crossTab: true  })
  const PrivateRoute = ({children, ...rest})=>{
      return (<Route {...rest} render={({location})=>{
        return localStorage.getItem("islogedIn") === "true" ? children : <Redirect to={{pathname:"/login", state:{from:location}}} />
      }}>
      </Route>)
  }

  useEffect(() => {
    setRemaining(getRemainingTime())
    localStorage.setItem("remainingTime",getRemainingTime())
    const remainingTime = setInterval(() => {
      localStorage.setItem("remainingTime",getRemainingTime())
    }, 1000)
    return () => clearInterval(remainingTime)
  },[])

  return (
    <div className="App">
      <Router>
      {isSession && <SessionConfirmationPopup  isToggle={setIsSession}/>}
        {/* <Suspense fallback={<Loading />}> */}
          <Header /> 
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/registration" component={Registration}/>
            <Route  path="/contactus" component={Contactus}/>
            <Route  path="/about" component={About}/>
            <Route  path="/success" component={Success}/>
            <Route  path="/error" component={Error}/>
            <Route  path="/emailerror" component={EmailError}/>
            <Route  path="/email" component={Email}/>
            <Route  path="/fees" component={Fees}/>
            <Route  path="/emailsuccess" component={Emailsuccess}/>
            <Route  path="/changepassword" component={ChangePassword}/>
            <Route path="/forgotpasswordemail" component={ForgotPasswordEmail}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/forgotEmail" component={ForgotEmail}/>

            <PrivateRoute>
              <Route  path="/floor" component={FloorPlans}/>
              <Route  path="/flooradd" component={FloorAdd}/>
              <Route  path="/flooredit/:id" component={FloorEdit}/>
              <Route  path="/carList" component={CarList}/>
              <Route  path="/search" component={Inprogress}/>
              <Route  path="/mybids" component={Inprogress}/>
              <Route  path="/transport" component={Inprogress}/>
              <Route  path="/manageaccount" component={ManageAccount}/>
              <Route  path="/lotfee" component={LotFee}/>
              <Route  path="/notification" component={Notification}/>
              <Route  path="/payment" component={Payment}/>
              <Route  path="/paymentinfo" component={PaymentInfo}/>
              <Route  path="/editpayment/:id" component={EditPayment}/>
              <Route  path="/document" component={Document}/> 
              <Route  path="/favorite" component={Favoritelist}/>
              <Route  path="/history" component={Inprogress}/>
              <Route  path="/cart" component={Inprogress}/>
              <Route  path="/chat" component={Inprogress}/>
              <Route  path="/buyers" component={Buyers}/>
              <Route  path="/adduser" component={AddUser}/>
              <Route  path="/myprofile" component={MyProfile}/>  
              <Route  path="/editmyprofile/:id" component={EditMyProfile}/>
              <Route  path="/dealerinfoedit/:id" component={EditDealerInformation}/>
              <Route  path="/addressedit/:id" component={EditAddress}/>
              <Route  path="/legaledit/:id" component={EditLegalAccount}/>
              <Route  path="/legaladd" component={AddLegalAccount}/>
              <Route  path="/addressadd" component={AddAddress}/>
              <Route  path="/buyeredit/:id" component={EditBuyer}/>
            </PrivateRoute>       
          </Switch>
          <Footer />
        {/* </Suspense> */}
      </Router>
    </div>
  );
}

export default AppRouter;

// const Home = lazy(() => import('./Pages/Home/Home'));
// const Login = lazy(() => import('./Pages/Login/Login'));
// const Registration = lazy(() => import('./Pages/Registration/Registration'));
// const Success = lazy(() => import('./Component/Success'));
// const Error = lazy(() => import('./Component/Error'));
// const EmailError = lazy(() => import('./Component/EmailError'));
// const Email = lazy(() => import('./Component/Email'));
// const Fees = lazy(() => import('./Pages/Fees/Fees'));
// const Emailsuccess = lazy(() => import('./Component/Emailsuccess'));
// const FloorPlans = lazy(() => import('./Pages/Floor/FloorPlans'));
// const FloorAdd = lazy(() => import('./Pages/Floor/FloorAdd'));
// const FloorEdit = lazy(() => import('./Pages/Floor/FloorEdit'));
// const About = lazy(() => import('./Pages/About/About'));
// const ChangePassword = lazy(() => import('./Pages/ChangePassword/ChangePassword'));
// const CarList = lazy(() => import('./Pages/CarList/CarList'));
// const Contactus = lazy(() => import('./Pages/Contactus/Contactus'));
// const Header = lazy(() =>  import('./Component/Header/Header'));
// const Inprogress = lazy(() => import('./Component/Inprogress/Inprogress'));
// const ManageAccount = lazy(() => import("./Pages/ManageAccount/ManageAccount"));
// const LotFee = lazy(() => import ('./Pages/ManageAccount/LotFee'));
// const Notification = lazy(() => import ('./Pages/ManageAccount/Notification'));
// const Payment = lazy(() => import ('./Pages/ManageAccount/Payment'));
// const PaymentInfo = lazy(() => import('./Pages/ManageAccount/PaymentInfo'));
// const EditPayment = lazy(() => import('./Pages/ManageAccount/EditPayment'));
// // const Document = lazy(() => import('./Pages/ManageAccount/Document'));
// const Footer = lazy(() => import('./Component/Footer'));
