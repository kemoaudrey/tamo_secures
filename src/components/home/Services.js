import React from 'react';
// import './Home.css';
function ServicesSection() {
  return (
    <section id="services" className="services section">

      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>
          We are committed to developing innovative solutions to address the issue of violence against women.
          Our mobile application and IoT wearable device work together to provide a comprehensive response to incidents.
          Discover how our solution can help you.
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">

          {[
            {
              icon: 'bi-briefcase',
              title: 'Reporting System',
              delay: 100,
              desc: 'Our mobile app allows women to report incidents of violence easily and securely. It provides a confidential platform for documenting incidents and accessing resources such as helpline numbers and support services.'
            },
            {
              icon: 'bi-card-checklist',
              title: 'Personal Safety Companion',
              delay: 200,
              desc: 'Our IoT wearable device discreetly monitors the well-being of women and provides real-time alerts in emergencies. With features like GPS tracking, it ensures quick and accurate location identification, enabling a prompt response to critical situations.'
            },
            {
              icon: 'bi-bar-chart',
              title: 'Awareness and Education',
              delay: 300,
              desc: 'We are committed to raising awareness about violence against women through our mobile app. We provide educational resources, share survivor stories, and promote campaigns to encourage dialogue and change societal attitudes.'
            },
            {
              icon: 'bi-binoculars',
              title: 'Legal Support',
              delay: 400,
              desc: 'We provide access to legal resources and guidance for women who have experienced violence. Our app offers information on legal rights, connects users with legal professionals, and provides assistance in navigating the legal system.'
            },
            {
              icon: 'bi-brightness-high',
              title: 'Community Engagement',
              delay: 500,
              desc: 'We actively engage with communities to raise awareness, promote dialogue, and foster a culture of respect and non-violence. Our app features community forums, events, and workshops where individuals can come together to learn, share experiences, and support each other.'
            },
            {
              icon: 'bi-calendar4-week',
              title: 'Partnerships and Collaboration',
              delay: 600,
              desc: 'We collaborate with other organizations, government agencies, and community groups to amplify our impact. By forging partnerships, we leverage collective expertise, resources, and networks to create a united front against violence and advocate for systemic change.'
            },
          ].map((service, idx) => (
            <div key={idx} className="col-lg-6" data-aos="fade-up" data-aos-delay={service.delay}>
              <div className="service-item d-flex">
                <div className="icon flex-shrink-0">
                  <i className={`bi ${service.icon}`}></i>
                </div>
                <div>
                  <h4 className="title">
                    <a href="services-details.html" className="stretched-link">
                      {service.title}
                    </a>
                  </h4>
                  <p className="description">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
