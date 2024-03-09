import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotbook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">
                  Home1
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname==="/about"? "active": ""}`} 
                  aria-current="page"
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex">
            <Link to="/Login1" className="btn btn-primary mx-1"  role="button">Login</Link>
            <Link to="/SignUp" className="btn btn-primary mx-1"  role="button">SignUp</Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
