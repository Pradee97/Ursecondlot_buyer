import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const loadClearStorage = () => {
  if(localStorage.getItem("islogedIn")== "true"){
    localStorage.getItem("loadTime") !==null ? localStorage.setItem("loadTime", [localStorage.getItem("loadTime"),...[Date.now()]]) : 
    localStorage.setItem("loadTime", [Date.now()])
    if ( localStorage.getItem("unloadTime") !== null){
      console.log("load----",localStorage.getItem("loadTime") )
      console.log("unload---",localStorage.getItem("unloadTime") )
      const ltime=localStorage.getItem("loadTime").split(",")
      const ultime=localStorage.getItem("unloadTime").split(",")
      console.log("load last val",ltime[ltime.length-1] )
      console.log("unload last val",ultime[ultime.length-1]  )
      console.log("diff", ltime[ltime.length-1] - ultime[ultime.length-1] )
      console.log("final time dif",ltime[ltime.length-1] - ultime[ultime.length-1]  > 900000 )

      console.log("lastActiveTime====",localStorage.getItem("lastActiveTime"))
      if(ltime[ltime.length-1] - ultime[ultime.length-1]  > 900000){
      
        if(Number(localStorage.getItem("remainingTime" == 0))){
          localStorage.clear()
          window.location.replace("/")
        }

      }
    }
    else if(localStorage.getItem("loadTime").split(",").length>=1 && localStorage.getItem("unloadTime") == null){
      console.log("multiple page login")
    }
    
    else{
      localStorage.clear()
      window.location.replace("/")
    }
  }
}

window.onbeforeunload = () => {
  if(localStorage.getItem("islogedIn")== "true"){
    localStorage.getItem("unloadTime") !==null ?  localStorage.setItem("unloadTime",[ localStorage.getItem("unloadTime"), ...[Date.now()]]) :
      localStorage.setItem("unloadTime", [Date.now()])
  }
};



ReactDOM.render(
  <React.StrictMode>
  <App/>
  {/* {window.addEventListener('onbeforeunload', unloadClearStorage)} */}
   {window.addEventListener('load', loadClearStorage)}

</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
