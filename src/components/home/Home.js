import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Header from './Header';
import Footer from './Footer';
import Features from './Features';
import About from './About';
import Stats from './Stats';
import Services from './Services';
import Pricing from './Pricing';
import Team from './Team';
import CallToAction from './CallToAction';
import RecentPosts from './RecentPosts';
import Contact from './Contact';

// import './Home.css';

function HomePage() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="antialiased">
      <Header />

      <main className="main">
        {/* Hero Section */}
        <section className="portfolio-details" style={{ position: 'relative' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <img src="/assets/hero-bg.png" alt="hero" data-aos="fade-in" />
              </div>
              <div
                className="col-lg-5"
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '75%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="hero portfolio-details">
                  <div className="form-container" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <h2>Welcome to Our Website</h2>
                    <p>Empowering Women to Report Violence</p>
                    {/* You can add a real form component here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <About />
        <Stats />
        <Services />
        <Features />
        <Pricing />
        <Team />
        <CallToAction />
        <RecentPosts />
        <Contact />
      </main>

      <Footer />

      {/* Scroll Top */}
      <a href="/" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}
      {/* <div id="preloader"></div> */}
    </div>
  );
}

export default HomePage;
