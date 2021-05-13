import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import Success from "./Component/Success";
import Error from "./Component/Error";
import EmailError from "./Component/EmailError";
import Email from "./Component/Email";
import Fees from "./Pages/Fees/Fees";
import Emailsuccess from "./Component/Emailsuccess";
import FloorPlans from "./Pages/Floor/FloorPlans";
import FloorAdd from "./Pages/Floor/FloorAdd";
import FloorEdit from "./Pages/Floor/FloorEdit";
import About from "./Pages/About/About";
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import CarList from './Pages/CarList/CarList';


import './App.css';
import Contactus from './Pages/Contactus/Contactus';


function AppRouter() {
  return (
    <div className="App">
      <Router>
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
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
