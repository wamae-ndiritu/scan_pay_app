import React from "react";
import Header from "../components/header/Header";
import Corousel from "../components/Corousel";
import Services from "../components/Services";
import PopularCategories from "../components/PopularCategories";
import ShopSection from "../components/ShopSection";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Corousel />
      <Services />
      <PopularCategories />
      <ShopSection />
    </div>
  );
};

export default HomePage;
