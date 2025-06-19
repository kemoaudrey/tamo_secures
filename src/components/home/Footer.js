import React from 'react';
// import './Home.css';
const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative light-background">

      <div className="container footer-top">
        <div className="row gy-4">

          <div className="col-lg-5 col-md-12 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">TAMO</span>
            </a>
            <p>Innovative technology for a safer world</p>
            <div className="social-links d-flex mt-4">
              <a href="/"><i className="bi bi-twitter-x"></i></a>
              <a href="/"><i className="bi bi-facebook"></i></a>
              <a href="/"><i className="bi bi-instagram"></i></a>
              <a href="/"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">About us</a></li>
              <li><a href="/">Services</a></li>
              {/* Uncomment if needed:
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li> 
              */}
            </ul>
          </div>

          {/* Uncomment if needed:
          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Product Management</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Graphic Design</a></li>
            </ul>
          </div>
          */}

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>Cameroon , Douala</p>
            <p>Logpom, Logbessou</p>
            <p className="mt-4"><strong>Phone:</strong> <span>+237 697458130</span></p>
            <p><strong>Email:</strong> <span>kemoaudrey17@gmail.com</span></p>
          </div>

        </div>
      </div>

      {/* Uncomment if needed:
      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="sitename">Append</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
      */}

    </footer>
  );
};

export default Footer;
