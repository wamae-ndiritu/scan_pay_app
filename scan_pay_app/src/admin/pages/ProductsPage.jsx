import React from "react";
import Sidebar from "../dashComponents/Sidebar";
import Products from "../dashComponents/products";

const AdminProductsPage = () => {
  return (
    <div className="dash-wrapper">
      <div className="dash-sidebar">
        <Sidebar />
      </div>
      <div className="dash-main">
        <Products />
      </div>
    </div>
  );
};

export default AdminProductsPage;
