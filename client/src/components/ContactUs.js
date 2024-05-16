import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', { email: userEmail, message });
      setFeedback('Message sent successfully!');
      setMessage('');
    } catch (error) {
      setFeedback('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <h1>Eventure</h1>
        <p>Venue Booking Website</p>
        <p>Helpline number: 18001141300</p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.893577855998!2d75.6977725753946!3d31.251369274338188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f007abb8e57%3A0x70b5a8308274c82f!2sLPU%20BH1!5e0!3m2!1sen!2sin!4v1715840579013!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-right">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
};

export default ContactUs;
