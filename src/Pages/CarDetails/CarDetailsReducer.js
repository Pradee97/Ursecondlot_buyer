export const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    MINBID : 'MINBID',
    ERROR: 'ERROR'
};
const initialState =  {}


const CarDetailsReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case CarDetailsConst.HIGHBID:
            return {
                cardetails: 'cardetails-highbid',
                highbid: action.highBid
            };
        case CarDetailsConst.MINBID:
            return {
                cardetails: 'cardetails-minbid',
                minbid: action.payload

            };
        case CarDetailsConst.ERROR:
            return {
                cardetails: 'cardetails-fail',
                payload: action.payload
            };
        default:
            return state
            
    }
    

}

export default CarDetailsReducer; 