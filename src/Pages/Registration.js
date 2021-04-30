import React from 'react';
import API from "../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../assets/css/styles.css';
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


import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';


import '../assets/css/style.css';


const Registration = () => {
    const history = useHistory();

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
    const [stateId, setStateId] = useState("");
    const [cityName, setCityName] = useState("");
    const [cityId, setCityId] = useState("");
    const [zipCodeId, setZipcodeId] = useState("");
    const [numberOfYears, setNumberofYears] = useState("");
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
            setStateName(res.data.data);
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
            setCityName(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    useEffect(() => {
        fetchCountry();
        fetchState();
    }, []);
    const handleState = (e) => {
        setStateId(e.target.value)
        fetchCity(e.target.value)
    }
    const handleCity = (e) => {
        setCityId(e.target.value)
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
            state_id: stateId,
            city_id: cityId,
            zipcode_id: zipCodeId,
            no_years: numberOfYears
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
    return (
        <div>
            <main id="main" class="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form class="registrationform" onSubmit={registrationhandleSubmit} >
                        <h2 class="title"> Dealer Registration</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                                <input type="text" class="form-control" placeholder="Dealer name" required onChange={(e) => setDealerName(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" class="form-control" placeholder="First name" required onChange={(e) => setFirstName(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="text" class="form-control" placeholder="Last name" required onChange={(e) => setLastName(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="number" class="form-control" placeholder="Phone" required onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="email" class="form-control" placeholder="Enter your email." required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="address" class="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div class="col-sm-4 form-group">
                                <select class="form-control custom-select browser-default" required defaultValue={stateId} onChange={handleState}>
                                    <option>State</option>
                                    {stateName &&
                                        <>
                                            {stateName.map((state, index) => <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)}
                                        </>
                                    }
                                </select>
                            </div>
                            <div class="col-sm-4 form-group">
                                <select id="City" class="form-control custom-select browser-default" required defaultValue={cityId} onChange={handleCity}>
                                    <option>City</option>
                                    {cityName &&
                                        <>
                                            {cityName.map((city, index) => <option key={city.city_id} value={city.city_id}>{city.city_name}</option>)}
                                        </>
                                    }
                                </select>
                            </div>
                            <div class="col-sm-4 form-group">
                                <input type="number" class="form-control" placeholder="Zipcode" required onChange={(e) => setZipcodeId(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="number" class="form-control" placeholder="How many years in car business" required onChange={(e) => setNumberofYears(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group scheduleMeeting">
                                <h2 class="text-center">Schedule Meeting with our Agent</h2>
                                <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry</p>
                            </div>
                            <div class="col-sm-6 form-group">
                                <input type="Date" class="form-control" placeholder="Select date" required onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div class="col-sm-6 form-group">
                                <input type="time" class="form-control" placeholder="Select Time" required onChange={(e) => setTime(e.target.value)} />
                            </div>
                            <div class="col-sm-12">
                                <input type="checkbox" class="form-check d-inline" id="chb" required />
                                <label for="chb" class="form-check-label"> I agree for the <a href="#">Terms And Conditions</a>.
                                </label>
                            </div>
                            <div class="col-lg-12 loginBtn">
                                <button class="cta-btn">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
                <section id="playstoreBlock" class="playstoreBlock">
                    <div class="container">
                        <div class="row content">
                            <div class="col-lg-12">
                                <img src="appstore.png" />
                                <img src="googleplay.png" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <script src="assets/vendor/jquery/jquery.min.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
            <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="assets/vendor/venobox/venobox.min.js"></script>
            <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/js/main.js"></script>
        </div>


    )
}

export default Registration;