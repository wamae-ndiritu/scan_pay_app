import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div classNameName="container">
      <div className="sidebar sidebar-show">
        <div className="side-logo">
          <img src="/assets/Images/cart_logo.png" alt="logo" />
        </div>
        <ul className="sidebar-nav">
          <li className="nav-title">ScanPay Dashboard</li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/">
              <i className="nav-icon cil-speedometer"></i> Analytics
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/orders">
              <i className="nav-icon cil-speedometer"></i> All Orders
              <span className="badge bg-primary">NEW</span>
            </Link>
          </li>
          <li className="nav-item nav-group">
            <Link className="nav-link nav-group-toggle" to="/admin/products">
              <i className="nav-icon cil-puzzle"></i> All Products
            </Link>
            <ul className="nav-group-items">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="nav-icon cil-puzzle"></i> Categories
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="nav-icon cil-puzzle"></i> Settings
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/product/new">
              <i className="nav-icon cil-speedometer"></i> Add Product
            </Link>
          </li>
          <li className="nav-item mt-auto">
            <Link className="nav-link nav-link-success" to="/logout">
              <i className="nav-icon cil-cloud-download"></i> Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-link-danger" to="$">
              <i className="nav-icon cil-layers"></i> ScanPay 2023
              <strong> PRO</strong>
            </Link>
          </li>
        </ul>
        <button className="sidebar-toggler mt-5" type="button"></button>
      </div>
    </div>
  );
};

export default Sidebar;
