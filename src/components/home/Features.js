import React from "react";
import "aos/dist/aos.css";
import AOS from "aos";
// import './Home.css';
// Import your images or use `require` if not using bundler support
const Features = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="features" className="features section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Features</h2>
        <p>Innovative Solutions for Safer Communities</p>
      </div>

      <div className="container">
        {/* Feature 1 */}
        <div className="row gy-4 align-items-center features-item">
          <div
            className="col-lg-5 order-2 order-lg-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>User-Friendly Mobile App</h3>
            <p>
              Our mobile app is designed with a focus on ease of use, providing
              a seamless experience for reporting incidents and accessing
              support resources.
            </p>
            <a href="/" className="btn btn-get-started">
              Get Started
            </a>
          </div>
          <div
            className="col-lg-5 order-1 order-lg-2 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <div className="image-stack">
              <img src="/assets/Image1.png" alt="" className="stack-back" />
              <img src="/assets/TAMO flyer.png" alt="" className="stack-front" />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="row gy-4 align-items-stretch justify-content-between features-item">
          <div
            className="col-lg-6 d-flex align-items-center features-img-bg"
            data-aos="zoom-out"
          >
            <img src="/assets/Image5.jpg" className="img-fluid" alt="" />
          </div>
          <div
            className="col-lg-5 d-flex justify-content-center flex-column"
            data-aos="fade-up"
          >
            <h3>IoT Wearable Device</h3>
            <p>
              Our discreet and stylish wearable device acts as a personal safety
              companion, continuously monitoring well-being and sending
              real-time alerts to selected contacts in emergency situations.
            </p>
            <ul>
              <li>
                <i className="bi bi-check"></i>{" "}
                <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
              </li>
              <li>
                <i className="bi bi-check"></i>{" "}
                <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
              </li>
              <li>
                <i className="bi bi-check"></i>{" "}
                <span>Facilis ut et voluptatem aperiam. Autem soluta ad fugiat.</span>
              </li>
            </ul>
            <a href="/" className="btn btn-get-started align-self-start">
              Get Started
            </a>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="row gy-4 align-items-center features-item">
          <div
            className="col-lg-5 order-2 order-lg-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>GPS Tracking</h3>
            <p>
              With GPS technology integrated into our solution, precise location
              identification ensures that help can be dispatched quickly and
              accurately.
            </p>
            <a href="/" className="btn btn-get-started">
              Get Started
            </a>
          </div>
          <div
            className="col-lg-7 order-1 order-lg-2 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <div className="image-stack">
              <img src="/assets/Image3.jpg" alt="" className="stack-front" />
              <img src="/assets/sos.png" alt="" className="stack-back" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
