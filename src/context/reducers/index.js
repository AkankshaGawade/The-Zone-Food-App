import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import ordersReducer from "./ordersReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products:productReducer,
  cart:cartReducer,
  isCart:displayCartReducer,
  orders:ordersReducer,
});

export default myReducers;
