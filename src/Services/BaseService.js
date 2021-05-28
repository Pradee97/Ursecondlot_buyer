import axios from "axios";

export default axios.create({
 baseURL: "http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/",  
   //baseURL: "http://localhost:4000/urs2ndlot/v1/",
  // responseType: "json"
});

