import React from 'react';

function About() {
  return (
    <section id="about" className="about section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-xl-center gy-5">

          <div className="col-xl-5 content">
            <h3>About Us</h3>
            <img src="/assets/tamo6.png" className="img-fluid" alt="TAMO" />

            <p>
              Welcome to TAMO – a groundbreaking solution to combat violence against women. We are dedicated to creating a safer world for all women through innovative technology and comprehensive solutions.
              Our goal is to provide women with the tools they need to report incidents, access support resources, and raise awareness.
            </p>
            <a href="/" className="read-more">
              <span>Join Us</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>

          <div className="col-xl-7">
            <div className="row gy-4 icon-boxes">

              <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div className="icon-box">
                  <i className="bi bi-buildings"></i>
                  <h3>Get Help Now</h3>
                  <p>Access resources and report incidents of abuse. Empowering women to report incidents of violence.</p>
                </div>
              </div>

              <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box">
                  <i className="bi bi-clipboard-pulse"></i>
                  <h3>24/7 Support</h3>
                  <p>Access our support team anytime, day or night, for immediate assistance.</p>
                </div>
              </div>

              <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                <div className="icon-box">
                  <i className="bi bi-command"></i>
                  <h3>Resource Library</h3>
                  <p>Explore our extensive library of resources including articles, infographics, and videos to educate and empower.</p>
                </div>
              </div>

              <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                <div className="icon-box">
                  <i className="bi bi-graph-up-arrow"></i>
                  <h3>Recognize the Signs</h3>
                  <p>Learn to identify red flags and warning signs of abusive behavior.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
