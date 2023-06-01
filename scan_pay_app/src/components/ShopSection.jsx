import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { listProducts } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ShopSection = () => {
  const dispatch = useDispatch();

  const clientProductList = useSelector((state) => state.clientProductList);
  const { products, success, error } = clientProductList;

  const filterProducts = (category) => {
    console.log(category, ": category filter in process...");
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-3 shadow-sm shop-left">
          <div className="shop-sidebar">
            <h5 className="text-center m-3 h5">Shop | Categories</h5>
            <ul>
              {categories.map((category) => {
                const { id, name } = category;
                return (
                  <li key={id} onClick={() => filterProducts(name)}>
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {products?.map((product) => {
          const { _id, title, price, qty, image, description } = product;

          return (
            <div className="col-lg-3 col-md-4 col-6 col-padding" key={_id}>
              <div className="shop-card shadow-sm">
                <img src={image} class="shop-card-img" alt={title} />
                <div className="shop-card-body">
                  <h6 className="shop-card-title">{title}</h6>
                  <h6 className="text-danger shop-card-price">
                    KES {price}.00
                  </h6>
                  <p className="shop-card-text">{qty}</p>
                  <p className="shop-card-text">
                    {description.slice(0, 250)}...
                  </p>
                  <div className="shop-btn-cont">
                    <Link to={`products/${_id}`} className="shop-btn">
                      <SearchIcon />
                    </Link>
                    <div
                      className="shop-btn"
                      onClick={() => handleAddToCart(_id)}
                    >
                      <AddShoppingCartIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopSection;
