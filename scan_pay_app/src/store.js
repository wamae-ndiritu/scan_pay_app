import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./redux/reducers/userReducers";
import {
  clientProductDetailsReducer,
  clientProductListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productEditReducer,
  productListReducer,
} from "./redux/reducers/productReducers";
import { cartReducer } from "./redux/reducers/cartReducers";

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  clientProductList: clientProductListReducer,
  clientProductDetails: clientProductDetailsReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productDelete: productDeleteReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// cartItems
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
