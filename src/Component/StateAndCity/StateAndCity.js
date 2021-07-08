import React, {useState, useEffect} from "react"
import API from "../../Services/BaseService";
const StateAndCity = props => {
    // console.log("pppppp===",props)
    const [defaultZipcodeValue, setDefaultZipcodeValue] = useState(props.defaultZipcodeValue);
    const [zipCodeId, setZipCodeId] = useState( null );
    const [isEdit] = useState(props?.isEdit || false);
    const [country, setCountry] = useState("");
    const [defaultStateValue, setDefaultStateValue] = useState(props.defaultStateValue);
    const [stateName, setStateName] = useState(null);
    const [stateNameList, setStateNameList] = useState([]);
    const [defaultCityValue, setDefaultCityValue] = useState(props.defaultCityValue);
    const [cityName, setCityName] = useState(null);
    const [cityNameList, setCityNameList] = useState([]);
    const [zipcodeList, setZipcodeList] = useState([]);
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
            setStateNameList(res.data.data);
            setCityName(null)
            setZipCodeId(null)
            if(props.isEdit){
                res.data.data.filter(data=> {
                    console.log("data.state_name====",data.state_name)
                    console.log("props.defaultStateValue===",defaultStateValue)
                    if(data.state_name?.toLowerCase() === defaultStateValue ?.toLowerCase()){
                        setStateName(data.state_name)
                        // setCityName(null)
                        // setZipCodeId(null)
                        fetchCity(data.state_id)
                    } 
                })
               
            }
        })
            .catch(err => { console.log(err); });
    }

    function fetchCity(e) {
        let request = {
            state_id: e
        };
        const state = API.post('city/condition', request);
        state.then(res => {
            setCityNameList(res.data.data);
            setZipCodeId(null)
            if(props.isEdit){
                res.data.data.filter(data=> {
                    if(data.city_name?.toLowerCase() === defaultCityValue ?.toLowerCase()){
                        setCityName(data.city_name)
                        // setZipCodeId(null)
                        fetchZipcode(data.city_id)
                    }
                })
            }
        })
            .catch(err => { console.log(err); });
    }
    function fetchZipcode(e) {
        let request = {
            city_id: e
        };
        const state = API.post('zipcode/condition', request);
        state.then(res => {
            setZipcodeList(res.data.data);
            if(props.isEdit){
                res.data.data.filter(data=>{
                    data.zipcode == defaultZipcodeValue && setZipCodeId(data.zipcode)
                }
                    )
            }
        })
            .catch(err => { console.log(err); });
    }

    useEffect(() => {
        if(!isEdit){
            stateNameList.length>0 && stateName ? props.setStateValue(stateNameList.filter(data=>data.state_name == stateName)[0]?.state_id || null) : props.setStateValue(null);
            cityNameList.length>0 && cityName ?  props.setCityValue(cityNameList.filter(data=>data.city_name==cityName)[0]?.city_id || null)  : props.setCityValue(null);
            zipcodeList.length>0 && zipCodeId ?  props.setZipcodeValue(zipcodeList.filter(data=>data.zipcode==zipCodeId)[0]?.zipcode_id || null) : props.setZipcodeValue(null);   
        } else if(stateName && cityName && zipCodeId){
            // props.setStateValue(stateNameList.filter(data=>data.state_name == stateName)[0]?.state_id || null);
            // props.setCityValue(cityNameList.filter(data=>data.city_name==cityName)[0]?.city_id || null);
            // props.setZipcodeValue(zipcodeList.filter(data=>data.zipcode==zipCodeId)[0]?.zipcode_id || null);   
        }
  
    }, [stateName, cityName, cityName]);

    // useEffect(() => { if(isEdit){props.setStateValue(stateNameList.filter(data=>data.state_name == stateName)[0]?.state_id || null);}},[stateName])
    // useEffect(() => {if(isEdit){props.setCityValue(cityNameList.filter(data=>data.city_name==cityName)[0]?.city_id || null);}},[cityName])
    // useEffect(() => {if(isEdit){props.setZipcodeValue(zipcodeList.filter(data=>data.zipcode==zipCodeId)[0]?.zipcode_id || null);   }},[cityName])

    useEffect (()=>{
        if(isEdit){
            setDefaultStateValue(props.defaultStateValue);
            setDefaultCityValue(props.defaultCityValue);
            setDefaultZipcodeValue(props.defaultZipcodeValue); 
        }
    })
    
    useEffect(() => fetchCountry(),[])
    
    useEffect(() => {
        fetchState(); 
    }, [defaultStateValue]);

    
const cityAndZipReset=()=>{
    setCityName(null)
    setZipCodeId(null)
}

    const handleState = (e) => {
        setStateName( stateNameList.filter(data=>data.state_id == e.target.value)[0].state_name)
        console.log("state===",stateNameList.filter(data=>data.state_name == e.target.value)[0]?.state_id || null)
        props.isEdit && props.setStateValue(stateNameList.filter(data=>data.state_id == e.target.value)[0]?.state_id || null);
        props.isEdit && props.setCityValue(null);
        props.isEdit && props.setZipcodeValue(null);   
        // cityNameList.length === 0 ? fetchCity(e.target.value): cityAndZipReset()
        setCityNameList([])
        setZipcodeList([])
        fetchCity(e.target.value)
        // setCityName(null)
        // setZipCodeId(null)
    }

    const handleCity = (e) => {
        setCityName(cityNameList.filter(data=>data.city_id==e.target.value)[0].city_name)
        console.log("city===",cityNameList.filter(data=>data.city_name==e.target.value)[0]?.city_id || null)
        props.isEdit &&  props.setCityValue(cityNameList.filter(data=>data.city_id==e.target.value)[0]?.city_id || null);
        props.isEdit && props.setZipcodeValue(null);
        // zipcodeList.length === 0 && fetchZipcode(e.target.value)
        setZipcodeList([])
        fetchZipcode(e.target.value)
        // setZipCodeId(null)
    }

    const handleZipcode = (e) => {
        setZipCodeId(zipcodeList.filter(data=>data.zipcode==e.target.value)[0].zipcode); 
        console.log("zip====",zipcodeList.filter(data=>data.zipcode==e.target.value)[0]?.zipcode_id || null)
        props.setZipcodeValue(zipcodeList.filter(data=>data.zipcode==e.target.value)[0]?.zipcode_id || null);
    }

return (
    <>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">                
                <div className="selcetclass"> 
                    <select className="form-control custom-select browser-default textbox"  defaultValue={stateName}  onChange={handleState}>
                        <option value={null} style={{"display":"none"}}></option>
                        {stateNameList.length>0 &&
                            <>
                                {stateNameList.map((state, index) => <option key={state.state_id} value={state.state_id} selected = { isEdit ?  state.state_name === defaultStateValue ? true : false : false} >{state.state_name}</option>)}
                            </>
                        }
                    </select>
                    <label  htmlFor="state_id" className={"input-has-value"}>State</label>
                    </div>
            </div>
        </div>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">              
                <div className="selcetclass"> 
                    <select id="City" className="form-control custom-select browser-default textbox"  defaultValue={cityName} onChange={handleCity}>
                    <option value={null} style={{"display":"none"}}></option>
                        {cityNameList.length>0 &&
                            <>
                                {cityNameList.map((city, index) => <option key={city.city_id} value={city.city_id} selected = { isEdit ?  city.city_name === defaultCityValue ? true : false : false} >{city.city_name}</option>)}
                            </>
                        }
                    </select>
                    <label  htmlFor="city_id" className={"input-has-value"}>City</label>
                </div>                   
            </div>
        </div>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">        
                <div className="selcetclass"> 
                    <select id="zipcode_id" className="form-control custom-select browser-default textbox"  defaultValue={zipCodeId} onChange={handleZipcode}>
                    <option value={null} style={{"display":"none"}}></option>
                        {zipcodeList.length>0 &&
                            <>
                                {zipcodeList.map((zipcode, index) => <option key={zipcode.zipcode_id} value={zipcode.zipcode} selected = { isEdit ?  zipcode.zipcode === defaultZipcodeValue ? true : false : false} >{zipcode.zipcode}</option>)}
                            </>
                        }
                    </select>
                    <label  htmlFor="zipcode_id" className={"input-has-value"}>Zipcode</label>
                </div>                   
            </div>
        </div>
        {/* <div className="col-sm-4 form-group">
            <div className="tbox">
                <div className="selcetclass">                 
                    <>
                        <input type="text" className="form-control textbox" defaultValue={isEdit ? defaultZipcodeValue : zipCodeId} placeholder="" required maxLength="5" onChange={(e) => setZipCodeId(e.target.value)} />
                        {<label  htmlFor="zipcode_id" className={"input-has-value"}>Zipcode</label>}
                    </>                       
                </div>
            </div>
        </div> */}
    </>
)}

export default StateAndCity;