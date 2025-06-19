import React from "react";
// import './Home.css';
const RecentPosts = () => {
  return (
    <section id="recent-posts" className="recent-posts section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Did you know?</h2>
        <p>
          Rallying for unity prioritizw care and ensure safetycso join us and
          propose your services to those in need of you
        </p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="row gy-4">
          <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <article>
              <div className="post-img">
                <img
                  src="assets/img/blog/SDGoals.png"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <p className="post-category">
                Combatting Violence: a path to sustainable development
              </p>

              <h2 className="title">
                <a href="/">
                  Collective efforts to combat violence not only promotr social
                  cohesion but also contribute to achieving various sustainable
                  development goals such as Gender Equality, Better health
                  Conditions, Justice and Peace within the society.
                </a>
              </h2>
            </article>
          </div>
          {/* End post list item */}

          <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <article>
              <div className="post-img">
                <img
                  src="assets/img/blog/educationalemp.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <p className="post-category">Educational Empowerment</p>

              <h2 className="title">
                <a href="/">
                  Providing education and vocational training to women and girls
                  is a crucial step in preventing violence. When individuals are
                  empowered with knowledge and skills they are better equiped to
                  assert their rights and build independent lives
                </a>
              </h2>

              {/* Uncomment if needed:
              <div className="d-flex align-items-center">
                <img
                  src="assets/img/blog/blog-author-2.jpg"
                  alt=""
                  className="img-fluid post-author-img flex-shrink-0"
                />
                <div className="post-meta">
                  <p className="post-author">Allisa Mayer</p>
                  <p className="post-date">
                    <time dateTime="2022-01-01">Jun 5, 2022</time>
                  </p>
                </div>
              </div>
              */}
            </article>
          </div>
          {/* End post list item */}

          <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <article>
              <div className="post-img">
                <img
                  src="assets/img/blog/culturalchange.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <p className="post-category">Cultural Change</p>

              <h2 className="title">
                <a href="/">
                  Promoting cultural change through media,art and public
                  campaigns can challenge and transform harmful norms like female
                  genital mutilations and stereotypes that contribute to violence
                  against women and children
                </a>
              </h2>

              {/* Uncomment if needed:
              <div className="d-flex align-items-center">
                <img
                  src="assets/img/blog/blog-author-3.jpg"
                  alt=""
                  className="img-fluid post-author-img flex-shrink-0"
                />
                <div className="post-meta">
                  <p className="post-author">Mark Dower</p>
                  <p className="post-date">
                    <time dateTime="2022-01-01">Jun 22, 2022</time>
                  </p>
                </div>
              </div>
              */}
            </article>
          </div>
          {/* End post list item */}
        </div>
        {/* End recent posts list */}

        <div className="row gy-4">
          <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <article>
              <div className="post-img">
                <img
                  src="assets/img/blog/EmpowerCC.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <p className="post-category">Economic Empowerment</p>

              <h2 className="title">
                <a href="/">
                  Empowering womem econimically reduces their vulnerability to
                  violence by providing them with financial independence and
                  resources to seek for help
                </a>
              </h2>
            </article>
          </div>
          {/* End post list item */}

          <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <article>
              <div className="post-img">
                <img
                  src="assets/img/blog/hcs.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <p className="post-category">Healthcare Support</p>

              <h2 className="title">
              <a href="/">
                  Access to comprehensive healthcare services, including mental
                  health support, is vital for survivors of violence. Ensuring
                  these services are available and accessible can significally
                  improve their recovery and quality of life
                </a>
              </h2>

              {/* Uncomment if needed:
              <div className="d-flex align-items-center">
                <img
                  src="assets/img/blog/blog-author-2.jpg"
                  alt=""
                  className="img-fluid post-author-img flex-shrink-0"
                />
                <div className="post-meta">
                  <p className="post-author">Allisa Mayer</p>
                  <p className="post-date">
                    <time dateTime="2022-01-01">Jun 5, 2022</time>
                  </p>
                </div>
              </div>
              */}
            </article>
          </div>
          {/* End post list item */}

          <div className="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <article>
              <div className="post-img">
                <img
                  src="assets/img/blog/lawyers.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>

              <p className="post-category">Legislative Advocacy</p>

              <h2 className="title">
                <a href="/">
                  Advocating for stronger laws and policies that protect women and
                  children from violence is essential. Legal reforms can provide
                  the neccessary framework to ensure perpetrators are held
                  accountable and victims recieve justice.
                </a>
              </h2>

              {/* Uncomment if needed:
              <div className="d-flex align-items-center">
                <img
                  src="assets/img/blog/blog-author-3.jpg"
                  alt=""
                  className="img-fluid post-author-img flex-shrink-0"
                />
                <div className="post-meta">
                  <p className="post-author">Mark Dower</p>
                  <p className="post-date">
                    <time dateTime="2022-01-01">Jun 22, 2022</time>
                  </p>
                </div>
              </div>
              */}
            </article>
          </div>
          {/* End post list item */}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
