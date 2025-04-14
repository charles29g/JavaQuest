export default function LandingPage() {
  return (
    <div className="backgroundimg">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-transparent text-white px-4">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav d-flex flex-row gap-4">
              <a className="nav-link text-white" href="#">
                About Us
              </a>
              <a className="nav-link text-white" href="#">
                Resources
              </a>
              <a className="nav-link text-white" href="#">
                Updates
              </a>
            </div>
          </div>
        </nav>

        <div className="row align-items-center justify-content-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="titlefont text-white">JavaQuest</h1>
            <p className="text-white">
              JavaQuest is an engaging online platform designed to help
              individuals learn the basics of Java programming in a fun and
              interactive way. It offers a structured learning experience
              through a series of modules and quizzes that test and reinforce
              understanding. Whether you're a student, a self-learner, or an
              educator, JavaQuest makes it easier to grasp programming
              fundamentals by breaking down complex concepts into simple,
              manageable parts. Its goal is to make learning Java more
              accessible and enjoyable for everyone.
            </p>
            <div className="d-flex justify-content-center">
              <button className="btn gradient descfont fs-1 text-white p-0 glow-on-hover">
                <i className="fas fa-running me-3 p-0"></i>Start
              </button>
            </div>
          </div>
          <div className="col-6 col-m-6">
            <img
              src="/images/city.png"
              alt="City"
              className="img-fluid mincity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
