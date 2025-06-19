import React from "react";
const CallToAction = () => {
  return (
    <section id="call-to-action" className="call-to-action section dark-background">
      <img src="assets/img/tamo4.jpeg" alt="Community working together for safety" />

      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h3>Call To Action</h3>
              <h5>Join Us in Creating a Safer Society</h5>
              <p>
                Together, we can make a difference. Join our project in our mission to end violence against women. Explore our services, learn more about our innovative solution, and contribute to building safer communities.
              </p>
              <p>
                Violence is a deeply rooted issue that can be prevented most effectively with collective power. Our partners include educational and research institutions, communities, governments, and all types of non-governmental organizations.
              </p>
              <button
                className="cta-btn"
                type="button"
                aria-label="Join our project to create a safer society"
              >
                Call To Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
