/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

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
          <li className="nav-item mr-2 dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownActivities"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Activities
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownActivities"
            >
              <a className="dropdown-item" href="#">
                Birthday Party
              </a>
              <a className="dropdown-item" href="#">
                Wedding
              </a>
              <a className="dropdown-item" href="#">
                Standup
              </a>
              <a className="dropdown-item" href="#">
                Conference
              </a>
            </div>
          </li>
          <li className="nav-item mr-2 dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownLocation"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Location
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownLocation"
            >
              <a className="dropdown-item" href="#">
                Phagwara
              </a>
              <a className="dropdown-item" href="#">
                Jalandhar
              </a>
            </div>
          </li>
          <li className="nav-item mr-2 dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownCapacity"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Capacity
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownCapacity"
            >
              <a className="dropdown-item" href="#">
                Upto 20
              </a>
              <a className="dropdown-item" href="#">
                Upto 50
              </a>
              <a className="dropdown-item" href="#">
                Upto 100
              </a>
              <a className="dropdown-item" href="#">
                Upto 200
              </a>
            </div>
          </li>
          <li className="nav-item mr-2">
            <a className="nav-link" href="#">
              About
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
