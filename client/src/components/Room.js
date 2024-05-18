import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Room.css";

export default function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">
        <h1 className="roomName">{room.name}</h1>
        <b>
          <p>Max Count : {room.maxcount}</p>
          <p>Phone Number : {room.phonenumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary mb-2">Book Now</button>
            </Link>
          )}
          <Button variant="primary" onClick={() => setShow(true)}>
            View Detail
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} size="lg" className="custom-modal">
        <Modal.Header closeButton className="custom-header">
          <Modal.Title className="custom-title">{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-body">
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="custom-description">{room.description}</p>
        </Modal.Body>
        <Modal.Footer className="custom-footer">
        <Link to={{ pathname: `/room/${room._id}`, state: { room } }}>
            <Button variant="secondary" className="custom-button">More Details</Button>
          </Link>
          <Button variant="secondary" className="custom-button" onClick={() => setShow(false)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}
