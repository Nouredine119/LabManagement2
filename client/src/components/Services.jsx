import React from "react";

const Services = () => {
  return (
    <div>
      <section id="service">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Our Services</h3>
              <h1 className="display-6 text-center mb-4">
                Our <b>LabManagement</b> Services
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-server fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Access to advanced computing resources</h5>
                  <p className="card-text lead">
                    Providing researchers and students with access to powerful computers, specialized software, and network infrastructure to conduct their research.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-life-ring fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Technical support</h5>
                  <p className="card-text lead">
                    Offering technical assistance to help users resolve hardware, software, and network-related issues.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-graduation-cap fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Training and workshops</h5>
                  <p className="card-text lead">
                    Organizing training sessions and workshops to develop researchers' and students' skills in specific areas of computer science.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-lock fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Cybersecurity</h5>
                  <p className="card-text lead">
                    Ensuring data and system security by implementing protective measures, security audits, and privacy policies to prevent data breaches and cyber attacks.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-users fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Collaboration and knowledge sharing</h5>
                  <p className="card-text lead">
                    Encouraging collaboration among researchers by facilitating the sharing of knowledge, ideas, and resources within the academic community.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-database fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Access to databases and research tools</h5>
                  <p className="card-text lead">
                    Making specialized databases, research tools, and digital libraries available to facilitate research and data analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;