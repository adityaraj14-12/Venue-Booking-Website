import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

AOS.init({
  duration: 2000,
});

// Landing Screen Component
function LandingScreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 className="primaryText" data-aos="zoom-in">
          Eventure To Book Best Venue
        </h2>
        <h1 className="secondaryText" data-aos="zoom-out">
          "Events are the catalyst for connection, and the right space makes all the difference."
        </h1>
        {/* Use Link component to navigate to Homescreen */}
        <Link to="/home" className="btn btn-primary landingBtn">Get Started</Link>
      </div>
    </div>
  );
}

export default LandingScreen;
