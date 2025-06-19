import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="contact section">

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>We are always here to answer your questions and provide support. Whether you are a user of our products or a potential partner, we are eager to hear from you.</p>
      </div>

      <div className="container section-title" data-aos="fade-up">
        <h4>Let's connect</h4>
        <p>We’d love to hear from you. Feel free to reach out to us with any questions or comments.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row gy-4">

          <div className="col-lg-6">

            <div className="row gy-4">
              <div className="col-md-6">
                <div className="info-item" data-aos="fade" data-aos-delay="200">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>Cameroon , Douala</p>
                  <p>Logpom, Logbessou</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-item" data-aos="fade" data-aos-delay="300">
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>+237 697458130</p>
                  <p>+237 693450585</p>
                  <p>+237 697609510</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-item" data-aos="fade" data-aos-delay="400">
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>tandahmarcelle2@gmail.com</p>
                  <p>kemoaudrey17@gmail.com</p>
                  <p>leslyarode1@gmail.com</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-item" data-aos="fade" data-aos-delay="500">
                  <i className="bi bi-clock"></i>
                  <h3>Open Hours</h3>
                  <p>Monday - Saturdays</p>
                  <p>9:00AM - 8:00PM</p>
                </div>
              </div>
            </div>

          </div>

          <div className="col-lg-6">
            <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">

                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                </div>

                <div className="col-md-6">
                  <input type="email" name="email" className="form-control" placeholder="Your Email" required />
                </div>

                <div className="col-12">
                  <input type="text" name="subject" className="form-control" placeholder="Subject" required />
                </div>

                <div className="col-12">
                  <textarea name="message" className="form-control" rows="6" placeholder="Message" required></textarea>
                </div>

                <div className="col-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>

                  <button type="submit">Send Message</button>
                </div>

              </div>
            </form>
          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;
