import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import { useParams } from "react-router";
import { getProductDetails } from "../redux/actions/productActions";

const ProductPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const clientProductDetails = useSelector(
    (state) => state.clientProductDetails
  );
  const { product } = clientProductDetails;

  const productId = params.id;

  const addItemToCart = () => {
    navigate(`/cart/${productId}`);
  };

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [productId, dispatch]);

  return (
    <>
      <Header />
      <div className="container my-3">
        <h6 className="h6 text-warning float-right">
          Products Product {productId}
        </h6>
        <div className="product-view-cont shadow-sm" key={product?.id}>
          <div className="product-view-left">
            <img
              src={product?.image[0]}
              className="product-img"
              alt={product?.title}
            />
          </div>
          <div className="product-view-right">
            <h5 className="h5">{product?.title}</h5>
            <h6 className="h6 text-danger">KES {product?.price}.00</h6>
            <p className="product-text">{product?.qty}</p>
            <p className="product-text">{product?.description}</p>
            <div className="product-btns">
              <button className="product-btn" onClick={addItemToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
