import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag, Modal, Rate, Input, Button } from "antd";

import Loader from "../components/Loader";
import Error from "../components/Error";
import "./MyBookingScreen.css"; // Import custom CSS for styling

const { TextArea } = Input;

function MyBookingScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null); // State to store the selected room ID for review
  const [rating, setRating] = useState(0); // State to store the rating
  const [reviewText, setReviewText] = useState(""); // State to store the review text
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function fetchMyAPI() {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post("/api/bookings/getbookingbyuserid", {
          userid: user._id,
        })
      ).data;
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    setError("");
    setLoading(true);
    try {
      const data = (
        await axios.post("/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        })
      ).data;
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Cancelled Successfully",
        "success"
      ).then((result) => {
        fetchMyAPI();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
  }

  // Function to handle review submission
  const handleReviewSubmission = async () => {
    try {
      // Send review data to the backend
      const response = await axios.post("/api/reviews/add", {
        roomId: selectedRoomId,
        rating: rating,
        review: reviewText
      });
      console.log("Review submission response:", response.data);
      // Reset the rating and review text
      setRating(0);
      setReviewText("");
      // Close the modal
      setModalVisible(false);
      // Provide feedback to the user
      Swal.fire("Success", "Review submitted successfully", "success");
      // Refetch bookings after submitting review
      fetchMyAPI();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <div className="my-booking-container">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className="booking-list">
          {bookings &&
            bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <h1>{booking.room}</h1>
                <p><b>BookingId:</b> {booking._id}</p>
                <p><b>CheckIn:</b> {booking.fromdate}</p>
                <p><b>CheckOut:</b> {booking.todate}</p>
                <p><b>Amount:</b> {booking.totalamount}</p>
                <p>
                  <b>Status:</b>{" "}
                  <Tag color={booking.status === "booked" ? "green" : "red"}>
                    {booking.status === "booked" ? "CONFIRMED" : "CANCELLED"}
                  </Tag>
                </p>
                <div className="action-buttons">
                  {booking.status === "booked" && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelBooking(booking._id, booking.roomid)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    className="review-btn"
                    onClick={() => {
                      setSelectedRoomId(booking.roomid);
                      setModalVisible(true);
                    }}
                  >
                    Add Review
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Review Submission Modal */}
      <Modal
        title="Add Review"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleReviewSubmission}>
            Submit
          </Button>,
        ]}
      >
        <div>
          <p>Please rate your experience:</p>
          <Rate value={rating} onChange={setRating} />
        </div>
        <div>
          <p>Write your review:</p>
          <TextArea rows={4} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}

export default MyBookingScreen;
