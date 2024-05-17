

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import Room from "./Room"; // Assuming Room is in the same directory
import "./RoomDetails.css"; // Import the CSS file for styling

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < rating ? "#ffc107" : "#e4e5e9"} />
  ));
  return <>{stars}</>;
};

export default function RoomDetails(props) {
  const { room } = props.location.state;
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [filterRating, setFilterRating] = useState(0);
  const [recommendedRooms, setRecommendedRooms] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${room._id}/user`);
        const data = await response.json();
        setReviews(data);
        setFilteredReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchRecommendedRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        const allRooms = response.data;
        const filteredRooms = allRooms.filter(r => r.type === room.type && r._id !== room._id);
        setRecommendedRooms(filteredRooms.slice(0, 3)); // Display only 3 recommended rooms
      } catch (error) {
        console.error("Error fetching recommended rooms:", error);
      }
    };

    fetchReviews();
    fetchRecommendedRooms();
  }, [room._id, room.type]);

  useEffect(() => {
    let filtered = reviews;
    if (filterRating > 0) {
      filtered = reviews.filter(review => review.rating === filterRating);
    }
    setFilteredReviews(filtered);
  }, [filterRating, reviews]);

  const handleSort = (order) => {
    const sorted = [...filteredReviews].sort((a, b) => {
      if (order === "asc") {
        return a.rating - b.rating;
      } else if (order === "desc") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
    setFilteredReviews(sorted);
    setSortOrder(order);
  };

  const handleFilter = (rating) => {
    setFilterRating(rating);
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="room-details-container">
      <Container>
        <Row>
          <Col>
            <h1>{room.name}</h1>
            <p>Max Count: {room.maxcount}</p>
            <p>Phone Number: {room.phonenumber}</p>
            <p>Type: {room.type}</p>
            <p>Description: {room.description}</p>
          </Col>
        </Row>
        <Row>
          {room.imageurls.map((url, index) => (
            <Col key={index} md={4} className="image-column">
              <img className="room-image" src={url} alt={`Room ${index + 1}`} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <h2>Parking Options</h2>
            <p>Free street parking, Valet</p>
            <h2>Parking Description</h2>
            <p>
              While street parking IS on our street and nearby blocks, it's hard
              to get a spot right by the door. There are several valet garages
              within easy walking distance to the space.
            </p>
            <h2>General Rules</h2>
            <ul>
              <li>
                Rental hours are billed from beginning of set up, to end of
                clean up - this means that the time you book is the time that
                you have. We often have multiple bookings in a row, so we cannot
                accommodate surprise early in times or extra load out times.
              </li>
              <li>Please do not bring in your own sound systems. We're not that kind of space.</li>
              <li>Alcohol can be served, but not sold.</li>
              <li>We do not have a kitchen, but catered events are welcome! Let us know if you'd like nearby recommendations.</li>
              <li>This is a non-smoking building.</li>
              <li>While we accept performances, we do not accept raves. Anything with moshing or music that shakes the building isn't a good fit for our space.</li>
              <li>Please leave the space how you found it.</li>
            </ul>
          </Col>
          <Col>
            <h2>Included in your Booking</h2>
            <h3>Amenities</h3>
            <ul className="amenities-list">
              <li>Tables</li>
              <li>Chairs</li>
              <li>Speakers</li>
              <li>Mics</li>
              <li>Projector</li>
              <li>WiFi</li>
            </ul>
            <h3>Features</h3>
            <ul className="features-list">
              <li>Restrooms</li>
              <li>Stage</li>
              <li>AV Technician</li>
              <li>Janitorial Services</li>
              <li>Security</li>
              <li>Public Transportation</li>
              <li>Kitchen</li>
              <li>Soundproof</li>
              <li>Wheelchair Accessible</li>
            </ul>
            <h3>Other</h3>
            <ul className="other-list">
              <li>Karaoke</li>
              <li>Keyboard</li>
              <li>Microphones</li>
              <li>Soft Seating</li>
              <li>Standard Restrooms</li>
              <li>Upright Piano</li>
            </ul>
            <p className="add-ons">Don't see an amenity you're looking for? Ask the host, Genny</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Operating Hours</h2>
            <table className="operating-hours-table">
              <tbody>
                <tr>
                  <td>Monday - Sunday</td>
                  <td>9:00 AM - 11:00 PM</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Enhanced Health and Safety Measures</h2>
            <p>Everything is thoroughly wiped down and disinfected. We have repurposed our fog machine, turning it into an air sanitizing machine so we can get into every nook and cranny.</p>
            <h3>Enhanced cleaning measures:</h3>
            <ul className="enhanced-cleaning-list">
              <li>The space is cleaned and disinfected in accordance with guidelines from local health authorities</li>
              <li>High touch surfaces and shared amenities have been disinfected</li>
              <li>Soft, porous materials have been properly cleaned or removed</li>
            </ul>
            <p>All hosts are required to do the following prior to each booking:</p>
            <ul className="host-requirements-list">
              <li>Sweep, mop, vacuum and clean the space.</li>
              <li>Supply a hand washing station with soap, warm water, and paper towels or hand sanitizer with at least 60% alcohol.</li>
              <li>Clean common areas allowing guest access including bathrooms, kitchens, and entrances.</li>
              <li>Collect and clean dishes, silverware, and other provided host amenities, if applicable.</li>
              <li>Remove garbage and add new lining to cans.</li>
            </ul>
            <p>The space has the following equipment provided for every guest:</p>
            <ul className="provided-equipment-list">
              <li>Disinfecting wipes or spray and paper towels</li>
              <li>Disposable gloves</li>
              <li>Disposable masks / face coverings</li>
              <li>Hand Sanitizer</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Cancellation Policy</h2>
            <p>Flexible. Guests may cancel their Booking until 7 days before the event start time and will receive a full refund (including all Fees) of their Booking Price.</p>
            <p>All Bookings are subject to Peerspace’s Grace Period policy which provides a full refund for Bookings cancelled within 24 hours from receipt of a Booking Confirmation but no later than 48 hours prior to the Event start time.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Reviews</h2>
            <p>Average Rating: {averageRating}</p>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort Reviews
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSort("default")}>Default</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("asc")}>Lowest to Highest</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("desc")}>Highest to Lowest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="filter-buttons">
              <Button variant="outline-primary" onClick={() => handleFilter(0)}>All</Button>
              <Button variant="outline-primary" onClick={() => handleFilter(5)}>5 Stars</Button>
              <Button variant="outline-primary" onClick={() => handleFilter(4)}>4 Stars</Button>
              <Button variant="outline-primary" onClick={() => handleFilter(3)}>3 Stars</Button>
              <Button variant="outline-primary" onClick={() => handleFilter(2)}>2 Stars</Button>
              <Button variant="outline-primary" onClick={() => handleFilter(1)}>1 Star</Button>
            </div>
            <div className="reviews">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <p className="review-rating">
                      {/* Render star ratings */}
                      <StarRating rating={review.rating} />
                    </p>
                    <p className="review-text">Review: {review.review}</p>
                    {/* Assuming user details are included in the review object */}
                    {/* <p>User: {review.user}</p> */}
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Recommended Rooms</h2>
            <div className="recommended-rooms">
              {recommendedRooms.length > 0 ? (
                recommendedRooms.map((recommendedRoom) => (
                  <Room key={recommendedRoom._id} room={recommendedRoom} />
                ))
              ) : (
                <p>No recommended rooms available.</p>
              )}
            </div>
          </Col>
        </Row>
      

      </Container>
    </div>
  );
}
