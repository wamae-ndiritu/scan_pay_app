import React, { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { categoriesData } from "../data/CategoriesData";

const PopularCategories = () => {
  useEffect(() => {
    const cardOverlays = document.querySelectorAll(".card-overlay");
    cardOverlays.forEach((cardOverlay) => {
      cardOverlay.addEventListener("mouseover", function () {
        cardOverlay.classList.add("card-overlay-display");
      });
      cardOverlay.addEventListener("mouseout", function () {
        cardOverlay.classList.remove("card-overlay-display");
      });
    });
  }, []);
  return (
    <div className="container-fluid my-4">
      <div className="row  mb-3">
        <div className="header-bar">
          <h4 className="h4 text-center">Popular Categories</h4>
        </div>
      </div>
      <div className="row d-flex justify-content-center flex-wrap">
        {categoriesData.map((category) => {
          const { _id, title, image } = category;
          return (
            <div className="col-lg-3 col-md-3 my-3" key={_id}>
              <div className="card card-wrapper">
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-overlay">
                  <p>{title}</p>
                  <button>Buy Now</button>
                  <div className="category-icons">
                    <div className="category-icon">
                      <AddShoppingCartIcon />
                    </div>
                    <div className="category-icon">
                      <FavoriteBorderIcon />
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

export default PopularCategories;
