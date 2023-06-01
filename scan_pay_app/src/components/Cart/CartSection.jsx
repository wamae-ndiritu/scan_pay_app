import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
// import {reducer, initialState} from "../../store/Reducers"
// import { useGlobalContext } from "../../contextAPI/context";
import {
  // changeCartItemQty,
  addToCart,
  clearCart,
  removefromcart,
  decreaseCartQty,
} from "../../redux/actions/cartActions";

const CartSection = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleRemoveCartItem = (id) => {
    dispatch(removefromcart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCartQty = (id) => {
    dispatch(addToCart(id));
  };

  const handleDecreaseQty = (id, qty) => {
    if (qty <= 1) {
      dispatch(removefromcart(id));
    } else {
      dispatch(decreaseCartQty(id));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  });
  return (
    <div className="container">
      <div className="shadow-1 cart-header">
        <h3>Cart ({cartItems?.length})</h3>
        <p className="clear-cart" onClick={handleClearCart}>
          Clear Cart
        </p>
      </div>
      {cartItems?.map((cartItem) => {
        const { product, title, price, image, qty } = cartItem;
        return (
          <div className="shadow-1 cart-item-cont" key={product}>
            <div className="cart-item">
              <Link to={`/products/${product}`} className="cart-img">
                <img src={image} alt={title} />
              </Link>
              <div></div>
              <h3 className="mobile-cart-item-name">
                {screenWidth < 400 && title.length > 10
                  ? `${title.slice(0, 10)}...`
                  : title}
              </h3>
              <h4>KES {price}</h4>
            </div>
            <div className="cart-flex mt-3">
              <div
                className="cart-left"
                onClick={() => handleRemoveCartItem(product)}
              >
                <div className="delete-btn">
                  <DeleteIcon />
                </div>
                <p className="delete-text">Remove</p>
              </div>
              <div className="cart-right">
                <div
                  className="qty-btn"
                  onClick={() => handleDecreaseQty(product, qty)}
                >
                  <RemoveIcon />
                </div>
                <p className="qty">{qty}</p>
                <div className="qty-btn" onClick={() => handleCartQty(product)}>
                  <AddIcon />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartSection;
