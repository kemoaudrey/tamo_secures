import React, { useEffect } from 'react';
// import './Home.css';
function StatsSection() {

  useEffect(() => {
    if (window.PureCounter) {
      new window.PureCounter();
    }
  }, []);


  return (
    <section id="stats" className="stats section dark-background">
      <img src="/assets/stats-bg.jpg" alt="Statistics Background" data-aos="fade-in" />

      <div className="container position-relative" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
            <span
        data-purecounter-start="0"
        data-purecounter-end="100"
        data-purecounter-duration="2"
        className="purecounter"
      ></span>
              <p>Users</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span
                data-purecounter-start="0"
                data-purecounter-end="15"
                data-purecounter-duration="4"
                className="purecounter"
              ></span>
              <p>Organizations</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span
                data-purecounter-start="0"
                data-purecounter-end="10"
                data-purecounter-duration="4"
                className="purecounter"
              ></span>
              <p>Law Enforcement Agencies</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StatsSection;
