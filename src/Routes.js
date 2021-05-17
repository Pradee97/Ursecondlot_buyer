import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';


const Home = lazy(() => import('./Pages/Home/Home'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Registration = lazy(() => import('./Pages/Registration/Registration'));
const Success = lazy(() => import('./Component/Success'));
const Error = lazy(() => import('./Component/Error'));
const EmailError = lazy(() => import('./Component/EmailError'));
const Email = lazy(() => import('./Component/Email'));
const Fees = lazy(() => import('./Pages/Fees/Fees'));
const Emailsuccess = lazy(() => import('./Component/Emailsuccess'));
const FloorPlans = lazy(() => import('./Pages/Floor/FloorPlans'));
const FloorAdd = lazy(() => import('./Pages/Floor/FloorAdd'));
const FloorEdit = lazy(() => import('./Pages/Floor/FloorEdit'));
const About = lazy(() => import('./Pages/About/About'));
const ChangePassword = lazy(() => import('./Pages/ChangePassword/ChangePassword'));
const CarList = lazy(() => import('./Pages/CarList/CarList'));
const Contactus = lazy(() => import('./Pages/Contactus/Contactus'));
<<<<<<< HEAD
const LotFee = lazy(() => import('./Pages/ManageAccount/LotFee'));
const ManageAccount = lazy(() => import('./Pages/ManageAccount/ManageAccount'));
const Notification = lazy(() => import('./Pages/ManageAccount/Notification'));
const Payment = lazy(() => import('./Pages/ManageAccount/Payment'));
const PaymentInfo = lazy(() => import('./Pages/ManageAccount/PaymentInfo'));
const EditPayment = lazy(() => import('./Pages/ManageAccount/EditPayment'));
=======
const Header = lazy(() =>  import('./Component/Header/Header'));
const Inprogress = lazy(() => import('./Component/Inprogress/Inprogress'));
const ManageAccount = lazy(() => import("./Pages/ManageAccount/ManageAccount"));
const LotFee = lazy(() => import ('./Pages/ManageAccount/LotFee'));
const Notification = lazy(() => import ('./Pages/ManageAccount/Notification'));
const Payment = lazy(() => import ('./Pages/ManageAccount/Payment'));
>>>>>>> c33a92504ef70c2a6e2c7048a307247c4aa289ab

function AppRouter() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
<<<<<<< HEAD
=======
          <Header /> 
>>>>>>> c33a92504ef70c2a6e2c7048a307247c4aa289ab
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/registration" component={Registration}/>
            <Route  path="/success" component={Success}/>
            <Route  path="/error" component={Error}/>
            <Route  path="/emailerror" component={EmailError}/>
            <Route  path="/email" component={Email}/>
            <Route  path="/fees" component={Fees}/>
            <Route  path="/emailsuccess" component={Emailsuccess}/>
            <Route  path="/floorplans" component={FloorPlans}/>
            <Route  path="/flooradd" component={FloorAdd}/>
            <Route  path="/flooredit/:id" component={FloorEdit}/>
            <Route  path="/contactus" component={Contactus}/>
            <Route  path="/about" component={About}/>
            <Route  path="/changepassword" component={ChangePassword}/>
            <Route  path="/carList" component={CarList}/>
<<<<<<< HEAD
=======
            <Route  path="/search" component={Inprogress}/>
            <Route  path="/floor" component={Inprogress}/>
            <Route  path="/mybids" component={Inprogress}/>
            <Route  path="/transport" component={Inprogress}/>
>>>>>>> c33a92504ef70c2a6e2c7048a307247c4aa289ab
            <Route  path="/manageaccount" component={ManageAccount}/>
            <Route  path="/lotfee" component={LotFee}/>
            <Route  path="/notification" component={Notification}/>
            <Route  path="/payment" component={Payment}/>
<<<<<<< HEAD
            <Route  path="/paymentinfo" component={PaymentInfo}/>
            <Route  path="/editpayment" component={EditPayment}/>

=======
>>>>>>> c33a92504ef70c2a6e2c7048a307247c4aa289ab
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default AppRouter;
