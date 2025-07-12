import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark" style={{padding:"40px"}}>
      <div className="container-fluid container d-flex align-items-center justify-content-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-decoration-none">
          <span className="navbar-brand fw-bold fs-3 text-white">AlumniPort</span>
        </Link>

        {/* Right side links */}
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="text-decoration-none text-white fw-bold fs-5 me-3"
          >
            Home
          </Link>

          <Link to="/add-user">
            <button type="button" className="btn btn-primary fs-5">
              Add User
            </button>
          </Link>

          {/* Username Display */}
          {username && (
            <span className="text-info ms-4 fs-5 text-capitalize">
              {username}
            </span>
          )}

          {/* Logout */}
          <Link to="/logout" className="text-decoration-none ms-3">
            <button className="btn btn-outline-light">Logout</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
