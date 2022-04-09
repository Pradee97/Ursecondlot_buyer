import { combineReducers } from 'redux'
import CarListReducer from '../Pages/CarList/CarListReducer'
import LoginReducer from '../Pages/Login/LoginReducer'
import SearchReducer from '../Pages/SearchReducer'
import CarDetailsReducer from '../Pages/CarDetails/CarDetailsReducer';
import FilterSearchReduer from  '../Component/FilterSearchCars/FilterSeatchReducer'
// import todos from './todos'
// import counter from '../Pages/ReduxTest/counterReducer'

// export default combineReducers({
//   // todos,
//   counter
// })

export default combineReducers({
  CarListReducer,
  LoginReducer,
  SearchReducer,
  CarDetailsReducer,
  FilterSearchReduer
  })