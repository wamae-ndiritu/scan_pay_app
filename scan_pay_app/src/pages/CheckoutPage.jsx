import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../components/header/Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartTotals = cartItems
    .reduce((itemA, itemB) => itemA + itemB.qty * itemB.price, 0)
    .toFixed(2);

  const handlePay = () => {
    navigate("/checkout/pay");
  };
  return (
    <div>
      <Header />
      <div className="contaner my-3">
        <div className="row mx-3 d-flex justify-content-center">
          <div className="col-lg-3 col-md-3 shadow-sm user-info-wrapper">
            <h4 className="h4">Customer Info</h4>
            <div className="customer-info">
              <div className="userinfo-cont">
                <div className="info-icon">
                  <AccountCircleIcon />
                </div>
                <div className="user-title">
                  <h5 className="h5">Customer</h5>
                  <h6 className="h6">{userInfo?.username}</h6>
                </div>
              </div>
              <div className="userinfo-cont">
                <div className="info-icon">
                  <EmailIcon />
                </div>
                <div className="user-title">
                  <h5 className="h5">Email</h5>
                  <h6 className="h6">{userInfo?.email}</h6>
                </div>
              </div>
              <div className="userinfo-cont">
                <div className="info-icon">
                  <LocalPhoneIcon />
                </div>
                <div className="user-title">
                  <h5 className="h5">Contact</h5>
                  <h6 className="h6">{userInfo?.phone}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 order-info-cont shadow-sm mx-3">
            <h4 className="h4">Order Summary</h4>
            {cartItems?.map((cartItem) => {
              const { product, title, price, image, qty } = cartItem;
              return (
                <div className="order-info shadow-sm p-3 mb-2" key={product}>
                  <div className="order-img">
                    <img src={image[0]} alt={title} />
                  </div>
                  <div className="order-title">
                    <h6 className="h6">{title}</h6>
                    <p>KES {price}</p>
                    <p>Qty {qty}</p>
                  </div>
                  <div className="order-totals">
                    <h6 className="h6">KES {price * qty}</h6>
                  </div>
                </div>
              );
            })}
            <div className="order-sum">
              <div className="order-sum-left">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Sub Totals</strong>
                      </td>
                      <td>KES {cartTotals}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="order-sum-right">
                <h4 className="h4">Lipa Na Mpesa</h4>
                <h6 className="h6">Enter your Mpesa Number</h6>
                <input
                  type="text"
                  className="pay-input"
                  placeholder="+254740924507"
                />
                <button className="pay-btn" onClick={handlePay}>
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
