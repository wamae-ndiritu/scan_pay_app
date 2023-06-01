import React from "react";

const Services = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-3 col-md-3 col-6 service-card">
          <div className="service-card-wrapper">
            <div className="service-card-img">
              <img src="./assets/Images/queue.jfif" alt="qr-code" />
            </div>
            <h6 className="h6">Shorter & Faster queues</h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6 service-card">
          <div className="service-card-wrapper">
            <div className="service-card-img">
              <img src="./assets/Images/mobile-pay.jfif" alt="qr-code" />
            </div>
            <h6 className="h6">Intergrated mobile payments</h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6 service-card">
          <div className="service-card-wrapper">
            <div className="service-card-img">
              <img src="./assets/Images/products.jfif" alt="qr-code" />
            </div>
            <h6 className="h6">Product Access</h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6 service-card">
          <div className="service-card-wrapper">
            <div className="service-card-img">
              <img src="./assets/Images/qr-2.jfif" alt="qr-code" />
            </div>
            <h6 className="h6">Self Checkout Services</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
