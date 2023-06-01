import React from "react";

const Corousel = () => {
  return (
    <div className="conatiner mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-11 col-md-11 corousel-wrapper">
          <div className="corousel-img">
            <img src="./assets/Images/qr-1.png" alt="qr-code" />
          </div>
          <div className="corousel-text">
            <h5 className="h5">Scan you product to buy!</h5>
            <h5 className="h5">
              No need to make long queues to be served, self bill and save time!
            </h5>
            <button className="btn btn-gray corousel-btn">Shop with Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corousel;
