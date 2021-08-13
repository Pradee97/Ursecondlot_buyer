import axios from "axios";

export default axios.create({
  baseURL: "http://service-devbuyer.ur2ndlot.com:4000/urs2ndlot/v1/",  

  
   //baseURL: "http://service-stagbuyer.ur2ndlot.com/urs2ndlot/v1/",

  // baseURL: "http://service-stagbuyer.ur2ndlot.com/",
  // baseURL: "http://staging.ur2ndlot.com:4000/urs2ndlot/v1/",
 //baseURL: "http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/",  
//  baseURL: "http://localhost:4000/urs2ndlot/v1/",
  // responseType: "json"
});

