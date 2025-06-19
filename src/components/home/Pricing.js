import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure bootstrap-icons are installed
// import './Home.css';
const PricingSection = () => {
  return (
    <section id="pricing" className="pricing section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Pricing</h2>
        <p>
          Explore our tailored plans designed to meet the unique needs of your organization. Whether you're a small
          non-profit or a large governmental agency, our solutions are here to help you make a meaningful impact. Choose
          the plan that best fits your mission and join us in the fight to end gender-based violence.
        </p>
      </div>

      <div className="container" data-aos="zoom-in" data-aos-delay="100">
        <div className="row g-4">

          {/* Free Plan */}
          <div className="col-lg-4">
            <div className="pricing-item">
              <h3>Free Plan</h3>
              <div className="icon">
                <i className="bi bi-box"></i>
              </div>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li><i className="bi bi-check"></i> Access to incident reporting feature</li>
                <li><i className="bi bi-check"></i> Access to Educational Resources</li>
                <li><i className="bi bi-check"></i> Access to the application's helpline</li>
                <li><i className="bi bi-check"></i> Access to the intelligent TAMO chatbot</li>
                <li><i className="bi bi-check"></i> Access to care connectivity feature</li>
                <li><i className="bi bi-check"></i> Access to reminder management</li>
                <li><i className="bi bi-check"></i> Access to encouraging messages and notifications</li>
                <li className="na"><i className="bi bi-x"></i> Access to Administrative panel</li>
              </ul>
              <div className="text-center"><a href="/" className="buy-btn">Download</a></div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="col-lg-4">
            <div className="pricing-item featured">
              <h3>Organization Monthly Plan</h3>
              <div className="icon">
                <i className="bi bi-rocket"></i>
              </div>
              <h4><sup>$</sup>75<span> / month</span></h4>
              <ul>
                <li><i className="bi bi-check"></i> Access to incident reporting feature</li>
                <li><i className="bi bi-check"></i> Access to Educational Resources</li>
                <li><i className="bi bi-check"></i> Access to the application's helpline</li>
                <li><i className="bi bi-check"></i> Access to the intelligent TAMO chatbot</li>
                <li><i className="bi bi-check"></i> Access to care connectivity feature</li>
                <li><i className="bi bi-check"></i> Access to reminder management</li>
                <li><i className="bi bi-check"></i> Access to Administrative panel</li>
              </ul>
              <div className="text-center"><a href="/" className="buy-btn">Get in Touch</a></div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="col-lg-4">
            <div className="pricing-item">
              <h3>Organization Yearly Plan</h3>
              <div className="icon">
                <i className="bi bi-send"></i>
              </div>
              <h4><sup>$</sup>763<span> / year</span></h4>
              <ul>
                <li><i className="bi bi-check"></i> Access to incident reporting feature</li>
                <li><i className="bi bi-check"></i> Access to Educational Resources</li>
                <li><i className="bi bi-check"></i> Access to the application's helpline</li>
                <li><i className="bi bi-check"></i> Access to the intelligent TAMO chatbot</li>
                <li><i className="bi bi-check"></i> Access to care connectivity feature</li>
                <li><i className="bi bi-check"></i> Access to reminder management</li>
                <li><i className="bi bi-check"></i> Access to Administrative panel</li>
              </ul>
              <div className="text-center"><a href="/" className="buy-btn">Get in Touch</a></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
