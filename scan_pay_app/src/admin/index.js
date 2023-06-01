import React from "react";
import Sidebar from "./dashComponents/Sidebar";
import Main from "./dashComponents/Main";

const Dashboard = () => {
  return (
    <div className="dash-wrapper">
      <div className="dash-sidebar">
        <Sidebar />
      </div>
      <div className="dash-main">
        <Main />
      </div>
    </div>
  );
};

export default Dashboard;
