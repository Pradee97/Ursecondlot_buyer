export const LoginConst = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};
const initialState = localStorage.getItem("userDetails") || '{}'
console.log("initialState===",initialState)

const LoginReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case LoginConst.SUCCESS:
            
            return {
                login: 'login-success',
                payload: action.payload

            };
        case LoginConst.ERROR:
           
            return {
                login: 'login-fail',
                payload: action.payload
            };
        default:
            
            return state
            
    }
    

}

export default LoginReducer; 