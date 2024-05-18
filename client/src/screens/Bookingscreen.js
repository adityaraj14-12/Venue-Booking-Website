import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useHistory } from "react-router-dom";

import "./Bookingscreen.css";

function Bookingscreen({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [extraServices, setExtraServices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("none");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [roomRent, setRoomRent] = useState(0);

  const serviceCosts = {
    DJ: 2000,
    catering: 8000,
    decoration: 4500,
  };

  const packageCosts = {
    gold: 5000,
    silver: 3000,
    diamond: 7000,
  };

  const history = useHistory();
  const redirecttoHome = () => {
    history.push("/home");
  };

  const roomid = match.params.roomid;
  const fromdate = moment(match.params.fromdate, "DD-MM-YYYY");
  const todate = moment(match.params.todate, "DD-MM-YYYY");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    } else {
      fetchRoom();
    }
  }, []);

  useEffect(() => {
    if (room.rentperday) {
      const totaldays = moment.duration(moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"))).asDays() + 1;
      setTotalDays(totaldays);
      setRoomRent(totaldays * room.rentperday);
      calculateTotalAmount(totaldays * room.rentperday, extraServices, selectedPackage);
    }
  }, [room, fromdate, todate, extraServices, selectedPackage]);

  const calculateTotalAmount = (baseAmount, services, pkg) => {
    const servicesCost = services.reduce((total, service) => total + serviceCosts[service], 0);
    const pkgCost = pkg !== "none" ? packageCosts[pkg] : 0;
    setTotalAmount(baseAmount + servicesCost + pkgCost);
  };

  const handleExtraServiceChange = (service) => {
    let updatedServices = [...extraServices];
    if (updatedServices.includes(service)) {
      updatedServices = updatedServices.filter((item) => item !== service);
    } else {
      updatedServices.push(service);
    }
    setExtraServices(updatedServices);
  };

  const handlePackageChange = (pkg) => {
    setSelectedPackage(pkg);
  };

  const fetchRoom = async () => {
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post("/api/rooms/getroombyid", { roomid });
      setRoom(data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch room details. Please try again later.");
    }
    setLoading(false);
  };

  const onToken = async (token) => {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totaldays: totalDays,
      token,
      extraservices: extraServices,
      selectedPackage,
    };

    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success").then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      setError("Failed to book room. Please try again later.");
      Swal.fire("Oops", "Error: " + error.message, "error");
    }
    setLoading(false);
  };

  return (
    <main className="screen-container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error msg={error} />
      ) : (
        <div className="booking-container">
          <div className="room-details">
            <h1 className="roomName">{room.name}</h1>
            <hr className="roomLine" />
            <img src={room.imageurls[0]} alt={room.name} className="room-image" />
            <div className="booking-info">
              <h2>Booking Details</h2>
              <p><strong>Name:</strong> {JSON.parse(localStorage.getItem("currentUser")).name}</p>
              <p><strong>From Date:</strong> {match.params.fromdate}</p>
              <p><strong>To Date:</strong> {match.params.todate}</p>
              <p><strong>Max Count:</strong> {room.maxcount}</p>
            </div>
          </div>
          <div className="payment-details">
            <h2>Amount</h2>
            <div className="amount-details">
              <div className="amount-section">
                <p><strong>Total Days:</strong></p>
                <hr className="amount-line" />
                <p><strong>Rent per day:</strong></p>
                <hr className="amount-line" />
                <p><strong>Extra Services:</strong></p>
                <hr className="amount-line" />
                <p><strong>Package:</strong></p>
                <hr className="amount-line" />
                <p><strong>Total Amount:</strong></p>
                <hr className="amount-line" />
              </div>
              <div className="amount-section">
                <p>{totalDays}</p>
                <hr />
                <p>{room.rentperday}</p>
                <hr />
                <p>{extraServices.length > 0 ? extraServices.map(service => `${service} (Rs. ${serviceCosts[service]})`).join(', ') : "None"}</p>
                <hr />
                <p>{selectedPackage !== "none" ? `${selectedPackage} (Rs. ${packageCosts[selectedPackage]})` : "None"}</p>
                <hr />
                <p>{totalAmount}</p>
                <hr />
              </div>
            </div>
            <div className="extras">
              <h3>Extra Services</h3>
              <div>
                <label>
                  <input type="checkbox" value="DJ" onChange={() => handleExtraServiceChange("DJ")} />
                  DJ System (Rs.2000)
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" value="catering" onChange={() => handleExtraServiceChange("catering")} />
                  Catering  (Rs.8000)
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" value="decoration" onChange={() => handleExtraServiceChange("decoration")} />
                  Decoration (Rs.4500)
                </label>
              </div>
            </div>
            <div className="packages">
              <h3>Packages</h3>
              <div>
                <label>
                  <input type="radio" name="package" value="diamond" onChange={() => handlePackageChange("diamond")} />
                  Diamond Package (Rs.7000)
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="package" value="gold" onChange={() => handlePackageChange("gold")} />
                  Golden Package (Rs5000)
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="package" value="silver" onChange={() => handlePackageChange("silver")} />
                  Silver Package (Rs.3000)
                </label>
              </div>
              
            </div>
            <StripeCheckout
              amount={totalAmount * 100}
              currency="INR"
              token={onToken}
              stripeKey="pk_test_51P7ZnvJVkX5vtZzarkv6mKkHI17DW1BVhycTaXLK5lXuKcIdfTCBOjvhFbiRjP7XHiXctd1wAueZ8vKkXkkw74dZ00IE6ptG4h"
              className="stripe-button"
            >
              <button className="payButton">Pay Now</button>
            </StripeCheckout>
            <button className="home-button" onClick={redirecttoHome}>Home</button>
          </div>
        </div>
      )}
    </main>
  );  
}

export default Bookingscreen;
