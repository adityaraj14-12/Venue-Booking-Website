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
          {/* Package descriptions */}
          <div className="package-descriptions">
            <h3>Diamond Package:</h3>
            <p>
               The Diamond Package is the premium offering designed for those seeking a luxurious and extravagant event experience. It includes top-tier amenities and services to make your event truly unforgettable. From exquisite decor to gourmet catering and personalized concierge services, the Diamond Package ensures every detail is meticulously planned and executed to perfection.
            </p>
            <h3>Golden Package:</h3>
            <p>
               The Golden Package offers a blend of elegance and affordability, making it an ideal choice for those looking for a sophisticated event within a reasonable budget. This package includes a range of essential services and amenities to create a memorable event experience without compromising on quality.
            </p>
            <h3>Silver Package:</h3>
            <p>
               The Silver Package is a budget-friendly option suitable for small to medium-sized events. Despite its affordability, this package offers essential services and amenities to ensure a successful and enjoyable event experience. It is ideal for individuals or organizations looking to host a quality event without breaking the bank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
