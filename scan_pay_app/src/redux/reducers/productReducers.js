import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  CLIENT_LIST_PRODUCTS_REQUEST,
  CLIENT_LIST_PRODUCTS_SUCCESS,
  CLIENT_LIST_PRODUCTS_FAIL,
  CLIENT_GET_PRODUCT_DETAILS_REQUEST,
  CLIENT_GET_PRODUCT_DETAILS_SUCCESS,
  CLIENT_GET_PRODUCT_DETAILS_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/productConstants";

// CLIENT REDUCERS

export const clientProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case CLIENT_LIST_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case CLIENT_LIST_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case CLIENT_LIST_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// GET SINGLE PRODUCT DETAILS
export const clientProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENT_GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case CLIENT_GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case CLIENT_GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// ADMIN REDUCERS

// CREATE PRODUCT
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// ADMIN GET ALL PRODUCTS
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LIST_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case LIST_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case LIST_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// ADMIN GET SINGLE PRODUCT

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// EDIT PRODUCT
export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case EDIT_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// DELETE PRODUCT
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
