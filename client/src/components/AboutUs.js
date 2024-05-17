// AboutUs.js

import React from 'react';
import "./Aboutus.css";
import Navbar from "../components/Navbar"; // Import Navbar component

const AboutUs = () => {
  return (
    <div>
      <Navbar /> {/* Include Navbar here */}
      <div className="about-us-container">
        <div className="about-us-content">
          <h2>About Eventure</h2>
          <p>Welcome to Eventure, your one-stop destination for all your event booking needs!</p>
          <p>At Eventure, we specialize in providing top-notch venues for various occasions such as weddings, anniversaries, birthdays, conferences, open mics, community gatherings, club meetings, receptions, and more.</p>
          <p>Our mission is to make event planning effortless and enjoyable for our customers. With a wide range of venues and seamless booking experience, we ensure that your events are memorable and stress-free.</p>
          <p>Join us in creating unforgettable moments!</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
