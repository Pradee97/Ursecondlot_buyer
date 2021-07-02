import React, {useState, useEffect} from "react"
import API from "../../Services/BaseService";
const StateAndCity = props => {
    // console.log("pppppp===",props)
    const [defaultZipcodeValue, setDefaultZipcodeValue] = useState(props.defaultZipcodeValue);
    const [zipCodeId, setZipcodeId] = useState( "");
    const [isEdit, setIsEdit] = useState(props?.isEdit || false);
    const [country, setCountry] = useState("");
    const [defaultStateValue, setDefaultStateValue] = useState(props.defaultStateValue);
    const [stateName, setStateName] = useState("");
    const [stateNameList, setStateNameList] = useState([]);
    const [defaultCityValue, setDefaultCityValue] = useState(props.defaultCityValue);
    const [cityName, setCityName] = useState("");
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
            if(props.isEdit){
                res.data.data.filter(data=> {
                    if(data.state_name?.toLowerCase() === defaultStateValue ?.toLowerCase()){
                        setStateName(data.state_name)
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
            if(props.isEdit){
                res.data.data.filter(data=> {
                    if(data.city_name?.toLowerCase() === defaultCityValue ?.toLowerCase()){
                        setCityName(data.city_name)
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
                    data.zipcode==defaultZipcodeValue && setZipcodeId(data.zipcode)
                }
                    )
            }
        })
            .catch(err => { console.log(err); });
    }

    useEffect(() => {
        if(stateName && cityName && zipCodeId ){
        // console.log("=======>",stateNameList,stateName,cityNameList,cityName,zipcodeList,zipCodeId)
        props.setStateValue(stateNameList.filter(data=>data.state_name == stateName)[0].state_id);
        props.setCityValue(cityNameList.filter(data=>data.city_name==cityName)[0].city_id);
        props.setZipcodeValue(zipcodeList.filter(data=>data.zipcode==zipCodeId)[0].zipcode_id);   
        } 
    }, [stateName, cityName, zipCodeId]);

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

    useEffect(() => { setZipcodeId( zipCodeId) }, [zipCodeId])

    const handleState = (e) => {
        setStateName( stateNameList.filter(data=>data.state_id == e.target.value)[0].state_name)
        props.isEdit && props.setCityValue(null);
        props.isEdit && props.setZipcodeValue(null);   
        fetchCity(e.target.value)
        setCityName("")
        setZipcodeId("")
    }

    const handleCity = (e) => {
        setCityName(cityNameList.filter(data=>data.city_id==e.target.value)[0].city_name)
        props.isEdit && props.setZipcodeValue(null);
        fetchZipcode(e.target.value)
        setZipcodeId("")
    }

    const handleZipcode = (e) => {
        setZipcodeId(zipcodeList.filter(data=>data.zipcode==e.target.value)[0].zipcode); 
    }

return (
    <>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">                
                <div className="selcetclass"> 
                    <select className="form-control custom-select browser-default textbox"  defaultValue={stateName}  onChange={handleState}>
                        <option style={{"display":"none"}}></option>
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
                    <option style={{"display":"none"}}></option>
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
                    <option style={{"display":"none"}}></option>
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
                        <input type="text" className="form-control textbox" defaultValue={isEdit ? defaultZipcodeValue : zipCodeId} placeholder="" required maxLength="5" onChange={(e) => setZipcodeId(e.target.value)} />
                        {<label  htmlFor="zipcode_id" className={"input-has-value"}>Zipcode</label>}
                    </>                       
                </div>
            </div>
        </div> */}
    </>
)}

export default StateAndCity;