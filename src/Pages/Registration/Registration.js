import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datetime';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Popup from '../../Component/Popup/Popup';

import '../../Component/Popup/popup.css';

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';

const Registration = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }


    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
      return current.isAfter(yesterday);
    };

    const inputProps = {
        placeholder: 'Select Date',
        required:true
    };

    const [dealerName, setDealerName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [country, setCountry] = useState("");
    const [stateName, setStateName] = useState("");
    const [stateNameList, setStateNameList] = useState([]);
    // const [stateId, setStateId] = useState("");
    const [cityName, setCityName] = useState("");
    const [cityNameList, setCityNameList] = useState([]);
    // const [cityId, setCityId] = useState("");
    const [zipCodeId, setZipcodeId] = useState("");
    const [numberOfYears, setNumberofYears] = useState("");
    const [option, setOption] = useState("");
   
    async function fetchCountry() {
        const country = API.get('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/country');
        country.then(res => {
            setCountry(res.data.data[0].country_id);
        })
            .catch(err => { console.log(err); });
    }
    async function fetchState() {
        let request = {
            country_id: 1
        };
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/state/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setStateNameList(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    function fetchCity(e) {
        let request = {
            state_id: e
        };
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/city/condition', request);
        state.then(res => {
            console.log("city", res.data.data)
            setCityNameList(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    useEffect(() => {
        fetchCountry();
        fetchState();
    }, []);

    const handleState = (e) => {   
        setStateName( stateNameList.filter(data=>data.state_id == e.target.value)[0].state_name)
        fetchCity(e.target.value)
        setZipcodeId("")
    }
    const handleCity = (e) => {
        setCityName(e.target.value)
        setZipcodeId("")
    }


    const registrationhandleSubmit = (event) => {
        // setOpenLoader(true);
        event.preventDefault();
        let request = {
            dealer_name: dealerName,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_no: phoneNumber,
            address: address,
            meeting_date: date,
            meeting_time: time,
            active: "0",
            country_id: "1",
            state_id: stateName,
            city_id: cityName,
            zipcode_id: zipCodeId,
            no_years: option,
            local_flag: 0,
        };
        API
            .post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/registration/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    history.push("success");
                } else {
                    history.push("emailerror");
                }
            }, (error) => {
                // setOpenLoader(false);
                console.log(error);
            });

    }

    const setZipcodeNormal = (data) => {
        if(data.length ===0 ){
            setZipcodeId("")
            setCityName('')
            setStateName('') 
        }
        if(data.length==5 ){
            setZipcodeId(data)
        }
    }
    const setZipcodeGoogle = (data) => {
        if(data.length ===0 ){
            setZipcodeId("")
            setCityName('')
            setStateName('') 
        }
        if(data.length !=5 ){
            setCityName('')
            setStateName('') 
        }
        if(data.length==5 ){
            setZipcodeId(data)
            const request={zipcode_id: data}
            API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/location/condition", request)
        .then(response => {
            console.log("google place data response =>",response)
            if (response.statusText== "OK"
            ){
                const {results} = response.data.data
                if(results.length>0){
                    console.log("google place data =>",response.data)
                    console.log("CITY  ",results[0].address_components[1].long_name)
                    console.log("STATE  ",results[0].address_components[1].long_name)
                    setCityName( results[0].address_components[1].long_name)
                    setStateName(results[0].address_components[3].long_name)                
                }else{
                    setCityName('')
                    setStateName('') 
                    console.log("please enter valid zipcode");
                }
               
            }else{
                console.log("something went wrong in address api..., try again")
            }
            
        })
        }
    }
    return (
        <div>
             
            <main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form className="registrationform" onSubmit={registrationhandleSubmit} >
                        <h2 className="title"> Dealer Registration</h2>
                        <div className="row">
                        <div className="col-sm-12 form-group"> 
                        <div className="tbox">
                            <input className="textbox " type="text" placeholder="" id="dealer_name" required maxLength="50" onChange={(e) => setDealerName(e.target.value)} />
				            <label  for="dealer_name" className={dealerName !="" ? "input-has-value" : ""}>Dealer name</label>
                            
			            </div>
                        </div>
                        <div className="col-sm-12 form-group"> 
                        <div className="tbox">
                            <input className="textbox " type="text" placeholder="" id="first_name" required maxLength="30" onChange={(e) => setFirstName(e.target.value)} />
				            <label  for="first_name" className={firstName !="" ? "input-has-value" : ""}>First Name</label>
			            </div>
                        </div>
                        <div className="col-sm-12 form-group"> 
                        <div className="tbox">
                            <input className="textbox " type="text" placeholder="" id="last_name" required maxLength="30" onChange={(e) => setLastName(e.target.value)} />
				            <label  for="last_name" className={lastName !="" ? "input-has-value" : ""}>Last Name</label>
			            </div>
                        </div>
                        <div className="col-sm-12 form-group">
                        <div className="tbox">
                            <input className="textbox " type="text" placeholder="" id="phone_no" required onChange={(e) => setPhoneNumber(e.target.value)} />
				            <label  for="phone_no" className={phoneNumber !="" ? "input-has-value" : ""}>Phone</label>
			            </div>
                        </div>
                        <div className="col-sm-12 form-group">
                        <div className="tbox">
                            <input className="textbox" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address"  placeholder="" id="email" required onChange={(e) => setEmail(e.target.value)} />
				            <label  for="email" className={email !="" ? "input-has-value" : ""}>Email</label>
                           
			            </div>
                        </div>
                        <div className="col-sm-12 form-group">
                        <div className="tbox">
                            <input className="textbox " type="text" placeholder="" id="address" maxLength="300" required onChange={(e) => setAddress(e.target.value)} />
				            <label  for="address" className={address !="" ? "input-has-value" : ""}>Address</label>
			            </div>
                        </div>


                            
                           
                            <div className="col-sm-4 form-group">
                            {zipCodeId == "" ?
                                 (<select className="form-control custom-select browser-default" required defaultValue={stateName} onChange={handleState}>
                                    <option>State</option>
                                    {stateNameList.length>0 &&
                                        <>
                                            {stateNameList.map((state, index) => <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)}
                                        </>
                                    }
                                </select> )
                                :
                                 (<input type="text" className="form-control" placeholder="state" value ={stateName} required />)}
                            </div>
                            <div className="col-sm-4 form-group">
                            {zipCodeId == "" ?
                                (<select id="City" className="form-control custom-select browser-default" required defaultValue={cityName} onChange={handleCity}>
                                    <option>City</option>
                                    {cityNameList.length>0 &&
                                        <>
                                            {cityNameList.map((city, index) => <option key={city.city_id} value={city.city_name}>{city.city_name}</option>)}
                                        </>
                                    }
                                </select>)
                                :
                                (<input type="text" className="form-control" placeholder="city" value ={cityName} required />)}
                            </div>
                            <div className="col-sm-4 form-group">
                            {stateName!=="" && cityName !=="" ?
                                (<input type="text" className="form-control" placeholder="Zipcode" required maxLength="5" onChange={(e) => setZipcodeNormal(e.target.value)} />)

                                :(<input type="text" className="form-control" placeholder="Zipcode" required maxLength="5" onChange={(e) => setZipcodeGoogle(e.target.value)} />)}
                            </div>
                            

                            <div className="col-sm-8 form-group">
                                <div className="tbox">
                                {/* {/ <lable for="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
                                <select id="drop" placeholder="" required className="form-control custom-select browser-default textbox" required onChange={(e) => setOption(e.target.value)}>
                                <option value="Default">How many years in car business</option>
                                <option value="1-3">1-3</option>
                                <option value="3-5">3-5</option>
                                <option value="5-10">5-10</option>
                                <option value="10-15">10-15</option>
                                <option value="15-20">15-20</option>
                                <option value="More then 20">More then 20</option>
                                </select>
                                </div>
                            </div>

                            
                            <div className="col-sm-12 form-group scheduleMeeting">
                                <h2 className="text-center">Schedule Meeting with our Agent</h2>
                                <p>Thank you for interesting in our platform, Make you money and success.</p>
                            </div>


                            <div className="col-sm-6 form-group">
                               
                                <Datetime inputProps={ inputProps } timeFormat={false} dateFormat="DD/MM/YYYY" isValidDate={disablePastDt}/>
                            </div>
                            <div className="col-sm-6 form-group">
                                <input type="time" className="form-control" placeholder="Select Time" required onChange={(e) => setTime(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group agreetab">
                                <input type="checkbox" className="form-check d-inline" id="chb" required />
                                <label for="chb" className="form-check-label"> I Agree for the <a href="JavaScript:void(0)" onClick={togglePopup}>Terms And Conditions</a>
                                </label>
                                {isOpen && <Popup
      content={<>
    
    <div id="termspage" class="termspage">
      <div class="container">
		  <div class="termspageblock col-lg-6">
			   <div class="row content">
					<div class="modalcontent">
				
						<div class="modalbody">
							<h2>Terms And Conditions </h2>
							<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
							industry's standard dummy text ever since the 1500s,
							</p>
							<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
							industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
							scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
							into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
							release of Letraset sheets containing Lorem Ipsum passages Lorem Ipsum has been the industry's standard 
							dummy text ever since the 1500s,
							</p>
							<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
							standard dummy text ever since the 1500s,
							</p>
						</div>
						<div class="modalfooter ">
							<a class="cta-btns" href="#">I AGREE</a>
						</div>
					</div>
				</div>
		  </div>
	   </div>
    </div>

      </>}
      handleClose={togglePopup}
    />}
                            </div>
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
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

export default Registration;