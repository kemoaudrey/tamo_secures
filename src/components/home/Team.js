import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this is loaded globally
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
// import './Home.css';
// You can place images in /public/assets/img/team if you're not using import

const TeamSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const teamMembers = [
    {
      name: 'Kemo Audrey',
      role: 'Aspiring Software Engineer',
      image: 'assets/img/team/Audrey.png',
      delay: 100,
    },
    {
      name: 'Tandah Marcelle',
      role: 'Aspiring Software Engineer',
      image: 'assets/img/team/Marcelle.png',
      delay: 200,
    },
    {
      name: 'Fogue Leslyarode',
      role: 'CTO',
      image: 'assets/img/team/Lesly.png',
      delay: 300,
    },
  ];

  return (
    <section id="team" className="team section light-background">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>Passionate minds driving social impact</p>
      </div>

      <div className="container">
        <div className="row gy-5">
          {teamMembers.map((member, index) => (
            <div
              className="col-lg-4 col-md-6 member"
              data-aos="fade-up"
              data-aos-delay={member.delay}
              key={index}
            >
              <div className="member-img">
                <img
                  src={member.image}
                  className="img-fluid"
                  alt={member.name}
                />
                <div className="social">
                  <a href="/"><i className="bi bi-twitter-x"></i></a>
                  <a href="/"><i className="bi bi-facebook"></i></a>
                  <a href="/"><i className="bi bi-instagram"></i></a>
                  <a href="/"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div className="member-info text-center">
                <h4>{member.name}</h4>
                <span>{member.role}</span>
                {/* <p>Optional short bio or mission statement.</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
