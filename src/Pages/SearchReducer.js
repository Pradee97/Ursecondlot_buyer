export const SearchConst = {
    SEARCHREQUEST: 'SEARCHREQUEST',
    ERROR: 'ERROR'
};
const initialState =  {}
console.log("initialState===",initialState)

const SearchReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case SearchConst.SEARCHREQUEST:
            console.log("inside success reducer")
            console.log("Payload",action)
            return {
                search: 'search-searchrequest',
                payload: action.payload

            };
        case SearchConst.ERROR:
            console.log("inside err reducer")
            console.log("Payload",action.payload)
            return {
                search: 'search-fail',
                payload: action.payload
            };
        default:
            console.log("Inside default of the reducer");
            console.log("Payload - state",state)
            return state
            
    }
    

}

export default SearchReducer; 