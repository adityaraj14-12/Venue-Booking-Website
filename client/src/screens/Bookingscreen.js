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
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  const history = useHistory();
  const redirecttoHome = () => {
    history.push("/home");
  };

  const { roomid, fromdate, todate } = match.params;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    } else {
      fetchRoom();
    }
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"))).asDays() + 1;
    setTotalDays(totaldays);
    setTotalAmount(totaldays * room.rentperday);
  }, [room]);

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
              <p><strong>From Date:</strong> {fromdate}</p>
              <p><strong>To Date:</strong> {todate}</p>
              <p><strong>Max Count:</strong> {room.maxcount}</p>
            </div>
          </div>
          <div className="payment-details">
            <h2>Amount</h2>
            <div className="amtMain">
              <div className="subAmt1">
                <p><strong >Total Days:</strong> </p>
                <hr className="makeLine" />
                <p><strong>Rent per day:</strong> </p>
                <hr className="makeLine" />
                <p><strong>Total Amount:</strong> </p>
                <hr className="makeLine" />
              </div>
              <div className="subAmt2">
              <p>{totalDays}</p>
              <hr />
              <p>{room.rentperday}</p>
              <hr />
              <p>{totalAmount}</p>
              <hr />
              </div>
            </div>
            <StripeCheckout
              amount={totalAmount * 100}
              currency="USD"
              token={onToken}
              stripeKey="pk_test_51P7ZnvJVkX5vtZzarkv6mKkHI17DW1BVhycTaXLK5lXuKcIdfTCBOjvhFbiRjP7XHiXctd1wAueZ8vKkXkkw74dZ00IE6ptG4h"
              className="stripe-button"
            >
              <button className="payButton btn-primary">Pay Now</button>
            </StripeCheckout>
            <button className="home-button" onClick={redirecttoHome}>Home</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Bookingscreen;
