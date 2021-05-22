import React, {useState, useEffect} from "react"
import API from "../../Services/BaseService";

const StateAndCity = props => {
    // const { setStateValue, setCityValue, setZipcodeValue } = {props}

    const [country, setCountry] = useState("");
    const [stateName, setStateName] = useState("");
    const [stateNameList, setStateNameList] = useState([]);
    const [cityName, setCityName] = useState("");
    const [cityNameList, setCityNameList] = useState([]);
    const [zipCodeId, setZipcodeId] = useState("");

    async function fetchCountry() {
        const country = API.get('country');
        country.then(res => {
            setCountry(res.data.data[0].country_id);
        })
            .catch(err => { console.log(err); });
    }

    async function fetchState() {
        let request = {
            country_id: 1
        };
        const state = API.post('state/condition', request);
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
        const state = API.post('city/condition', request);
        state.then(res => {
            console.log("city", res.data.data)
            setCityNameList(res.data.data);
        })
            .catch(err => { console.log(err); });
    }

    useEffect(() => {
        props.setStateValue(stateName);
        props.setCityValue(cityName);
        props.setZipcodeValue(zipCodeId);
    }, [stateName, cityName, zipCodeId]);

    useEffect(() => {
        fetchCountry();
        fetchState();
    }, []);

    const getAlert = () => {
        alert('clicked');
      }
    

    const handleState = (e) => {   
        setStateName( stateNameList.filter(data=>data.state_id == e.target.value)[0].state_name)
        fetchCity(e.target.value)
        setZipcodeId("")
    }

    const handleCity = (e) => {
        setCityName(e.target.value)
        setZipcodeId("")
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
            API.post("location/condition", request)
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
    <>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">
                {zipCodeId == "" ?
                    (<div className="selcetclass"> 
                    <select className="form-control custom-select browser-default textbox " required defaultValue={stateName} onChange={handleState}>
                        <option disabled>State</option>
                        {stateNameList.length>0 &&
                            <>
                                {stateNameList.map((state, index) => <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)}
                            </>
                        }
                    </select>
                    <label  for="state_id" className={"input-has-value"}>State Name</label>
                    </div>
                     )
                    :
                    (<>
                        <input type="text" className="form-control textbox" placeholder="" value ={stateName} required />
                        <label  for="state_id" className={"input-has-value"}>State Name</label>
                    </>)
                }
               
            </div>
        </div>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">
                {zipCodeId == "" ?
                (<div className="selcetclass"> 
                    <select id="City" className="form-control custom-select browser-default textbox" required defaultValue={cityName} onChange={handleCity}>
                        <option disabled>City</option>
                        {cityNameList.length>0 &&
                            <>
                                {cityNameList.map((city, index) => <option key={city.city_id} value={city.city_name}>{city.city_name}</option>)}
                            </>
                        }
                    </select>
                    <label  for="city_id" className={"input-has-value"}>City Name</label>
                </div>
                )
                :
                (<>
                    <input type="text" className="form-control textbox" placeholder="" value ={cityName} required />
                    <label  for="city_id" className={"input-has-value"}>City Name</label>
                </>
                    )}
                
            </div>
        </div>
        <div className="col-sm-4 form-group">
            <div className="tbox">
                {stateName!=="" && cityName !=="" ?
                (<input type="text" className="form-control textbox" placeholder="" required maxLength="5" onChange={(e) => setZipcodeNormal(e.target.value)} />)

                :(<input type="text" className="form-control textbox" placeholder="" required maxLength="5" onChange={(e) => setZipcodeGoogle(e.target.value)} />)}
                <label  for="zipcode_id" className={"input-has-value"}>Zipcode</label>
            </div>
        </div>
    </>
)}

export default StateAndCity;