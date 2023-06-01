import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import Header from "../components/header/Header";
import CartSection from "../components/Cart/CartSection";
import CartSummary from "../components/Cart/CartSummary";
import { addToCart } from "../redux/actions/cartActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const cartTotals = cartItems
  //   .reduce((itemA, itemB) => itemA + itemB.qty * itemB.price, 0)
  //   .toFixed(2);

  // const totalPrice = Number(Math.round(cartTotals));

  const handleCheckout = () => {
    if (userInfo) {
      navigate("/checkout/pay");
    } else {
      navigate("/login?redirect=checkout");
    }
  };

  const handleContinueShopping = (e) => {
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div>
        <div className="container mt-3">
          {cartItems?.length >= 1 ? (
            <div className="row">
              <div className="col-md-8 col-lg-8">
                <CartSection />
              </div>
              <div className="col-md-4 col-lg-4 big-summary-sect">
                <div className="summary-section">
                  <div>
                    <CartSummary />
                  </div>
                  <div className="cart-btns">
                    <button
                      type="button"
                      className="cart-btn btn-red mb-3"
                      onClick={handleContinueShopping}
                    >
                      Continue Shopping
                    </button>
                    <button
                      type="button"
                      className="cart-btn btn-black mb-3"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-8 col-lg-8 shadow-sm">
              <p style={{ color: "red" }}>Your Cart is empty!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
