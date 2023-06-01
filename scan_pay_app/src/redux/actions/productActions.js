import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  CLIENT_LIST_PRODUCTS_REQUEST,
  CLIENT_LIST_PRODUCTS_SUCCESS,
  CLIENT_LIST_PRODUCTS_FAIL,
  CLIENT_GET_PRODUCT_DETAILS_REQUEST,
  CLIENT_GET_PRODUCT_DETAILS_SUCCESS,
  CLIENT_GET_PRODUCT_DETAILS_FAIL,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/productConstants";
import axios from "axios";
import { URL } from "../../url";
import { logout } from "../actions/userActions";

// CLIENT CALLS

// // GET ALL PRODUCTS

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_LIST_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${URL}/api/products/`);

    dispatch({ type: CLIENT_LIST_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLIENT_LIST_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET SINGLE PRODUCT

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${URL}/api/products/${id}`);

    dispatch({ type: CLIENT_GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLIENT_GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADMIN CALLS

// CREATE PRODUCT
export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${URL}/api/products/`, product, config);

    console.log(data);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

// LIST ALL PRODUCTS
export const adminListProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_PRODUCTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.get(`${URL}/api/products/`, config);
    console.log(data);
    dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: LIST_PRODUCTS_FAIL, payload: message });
  }
};

// GET PRODUCT DETAILS
export const adminGetProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${URL}/api/products/admin/products/${id}`,
      config
    );

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: GET_PRODUCT_DETAILS_FAIL, payload: message });
  }
};

// EDIT PRODUCT
export const editProduct =
  ({ id, title, price, quantity, image, description, category }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_PRODUCT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL}/api/products/${id}`,
        { title, price, quantity, image, description, category },
        config
      );
      dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({ type: EDIT_PRODUCT_FAIL, payload: message });
    }
  };

//  DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/products/${id}`, config);
    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: message });
  }
};
