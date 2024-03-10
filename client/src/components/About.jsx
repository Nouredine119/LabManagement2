import React from 'react';

const About = () => {
  return (
    <div className="container my-1 py-5">
      <div className="row">
        <div className="col-md-6">
          <img src="/assets/about1.jpg" alt="About" className="w-75 h-75 mt-5" />
        </div>
        <div className="col-md-6">
          <h3 className="fs-5 mb-0">About Us</h3>
          <h3 className="display-6 mb-2">Who <b>We</b> Are</h3>
          <hr className="w-50" />
          <p className="lead mb-4">
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
            Donec eu libero sit amet quam egestas semper.
            Aenean ultricies mi vitae est. Mauris placerat eleifend leo
          </p>
          <button className="btn btn-primary rounded-pill px-4 py-2">Get Started</button>
          <button className="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default About;
