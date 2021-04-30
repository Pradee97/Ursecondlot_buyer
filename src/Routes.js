import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Success from "./Pages/Success";
import Error from "./Pages/Error";
import EmailError from "./Pages/EmailError";
import Email from "./Pages/Email";
import Fees from "./Pages/Fees";
import Emailsuccess from "./Pages/Emailsuccess";








import './App.css';


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
          <Route  path="/email/:id" component={Email}/>
          <Route  path="/fees" component={Fees}/>
          <Route  path="/emailsuccess" component={Emailsuccess}/>

          





        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
