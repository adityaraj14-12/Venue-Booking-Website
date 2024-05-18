/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './navbar.css'
function HomeNavbar() {
  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  const navAction = () => {
    if (user) {
      return (
        <ul className="navbar-nav mr-5">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-user mr-2"></i>
              {user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/profile">
                Profile
              </a>

              <a className="dropdown-item" href="#" onClick={Logout}>
                Logout
              </a>
            </div>
          </div>
        </ul>
      );
    }

    return (
      <ul className="navbar-nav ">
        <li className="nav-item active">
          <a className="nav-link" href="/register">
            Register
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Sign-In
          </a>
        </li>
      </ul>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand ml-5" href="/home">
        Eventure
      </a>
      
      <div className="collapse navbar-collapse pr-5" id="navbarSupportedContent">
        <ul className="navbar-nav p-2 ml-auto">
          
          
          <li className="nav-item mr-2">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li className="nav-item mr-2">
            <a className="nav-link" href="/contact">
              Contact Us
            </a>
          </li>
          {/* Conditional rendering of Login and Signup links based on user presence */}
          {!user && (
            <>
              <li className="nav-item mr-2">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Signup
                </a>
              </li>
            </>
          )}
          {user && (
            <>
                <div className="ml-5" id="navbarSupportedContent">
                    {navAction()}
                </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default HomeNavbar;
