import React from "react";
import Header from "./Header";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Main = () => {
  return (
    <>
      <Header />
      <div className="container-fluid mt-3">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 col-md-4">
            <div class="card">
              <div class="card-body">
                <div className="dash-card-icon">
                  <AddShoppingCartIcon />
                </div>
                <h5 className="card-title">Products</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  30 Products
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="dash-card-icon">
                  <ShoppingBasketIcon />
                </div>
                <h5 className="card-title">Orders</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  10 Orders
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="dash-card-icon">
                  <AttachMoneyIcon />
                </div>
                <h5 className="card-title">Total Sales</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  KES 10 000
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Card subtitle
                </h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Card subtitle
                </h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" className="card-link">
                  Card link
                </a>
                <a href="#" className="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
