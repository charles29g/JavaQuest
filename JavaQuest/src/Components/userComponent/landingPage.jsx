export default function LandingPage() {
    return (
      <div className="container-fluid ">
        <nav className="navbar navbar-expand-lg bg-transparent text-white px-4">
          <div className="navbar-nav d-flex flex-row gap-4">
            <a className="nav-link text-white" href="#">About Us</a>
            <a className="nav-link text-white" href="#">Resources</a>
            <a className="nav-link text-white" href="#">Updates</a>
          </div>
        </nav>
  
        <div className="row vh-100">
          <div className="col d-flex align-items-center justify-content-center">
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <img src="/images/city.png" className="img" alt="City" />
          </div>
        </div>
      </div>
    );
  }
  