export const CarListConst = {
    SELLERID: 'SELLERID',
    ERROR: 'ERROR'
};
const initialState =  {}
console.log("initialState===",initialState)

const CarListReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case CarListConst.SELLERID:
            console.log("inside success reducer")
            console.log("Payload",action)
            return {
                carlist: 'carlist-sellerid',
                payload: action.payload

            };
        case CarListConst.ERROR:
            console.log("inside err reducer")
            console.log("Payload",action.payload)
            return {
                carlist: 'carlist-fail',
                payload: action.payload
            };
        default:
            console.log("Inside default of the reducer");
            console.log("Payload - state",state)
            return state
            
    }
    

}

export default CarListReducer; 