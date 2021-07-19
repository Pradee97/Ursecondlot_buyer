import axios from "axios";

export default axios.create({
 baseURL: "http://service-devbuyer.ur2ndlot.com/:4000/urs2ndlot/v1/",  
 //baseURL: "http://localhost:4000/urs2ndlot/v1/",
  // responseType: "json"
});

