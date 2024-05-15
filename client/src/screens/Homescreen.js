import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import "./HomeScreen.css"

import Slider from 'react-slick'; // Assuming you are using react-slick for the slider
import 'antd/dist/antd.css'; // Import Ant Design CSS
import 'slick-carousel/slick/slick.css'; // Import slick carousel CSS
import 'slick-carousel/slick/slick-theme.css';
import { bg1, bg2, bg3, bg4, bg5 } from "../assests";

// Initialize AOS
AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setDuplicateRooms(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [fromDate, toDate, searchKey, type]);

  function filterByDate(dates) {
    try {
      const formattedFromDate = dates[0] ? moment(dates[0]).format("DD-MM-YYYY") : null;
      const formattedToDate = dates[1] ? moment(dates[1]).format("DD-MM-YYYY") : null;
      setFromDate(formattedFromDate);
      setToDate(formattedToDate);
    } catch (error) {
      console.log(error);
    }
  }

  function applyFilters() {
    let tempRooms = [...duplicateRooms];

    // Filter by date
    if (fromDate && toDate) {
      tempRooms = tempRooms.filter(room => {
        let isAvailable = true;
        for (const booking of room.currentbookings) {
          const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.todate, "DD-MM-YYYY");
          const selectedFromDate = moment(fromDate, "DD-MM-YYYY");
          const selectedToDate = moment(toDate, "DD-MM-YYYY");

          if (
            (selectedFromDate.isBetween(bookingFromDate, bookingToDate, undefined, '[]') || 
            selectedToDate.isBetween(bookingFromDate, bookingToDate, undefined, '[]')) || 
            (bookingFromDate.isBetween(selectedFromDate, selectedToDate, undefined, '[]') || 
            bookingToDate.isBetween(selectedFromDate, selectedToDate, undefined, '[]'))
          ) {
            isAvailable = false;
            break;
          }
        }
        return isAvailable;
      });
    }

    // Filter by search key
    if (searchKey) {
      tempRooms = tempRooms.filter(room =>
        room.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    // Filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room =>
        room.type.toLowerCase() === type.toLowerCase()
      );
    }

    setRooms(tempRooms);
  }

  function handleSearchKeyChange(e) {
    setSearchKey(e.target.value);
  }

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="mainSection">
      <section className="homeSection">
        <div className="slider">
          <Slider {...settings}>
            <div>
              <img className="imageSlider" src={bg1} alt="" />
            </div>
            <div>
              <img className="imageSlider" src={bg2} alt="" />
            </div>
            <div>
              <img className="imageSlider" src={bg3} alt="" />
            </div>
            <div>
              <img className="imageSlider" src={bg4} alt="" />
            </div>
            <div>
              <img className="imageSlider" src={bg5} alt="" />
            </div>
          </Slider>
        </div>
        <div className="filterContainer filter">
          <div className="row searchFilter">
            <div className="col-md-3">
              <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search rooms"
                value={searchKey}
                onChange={handleSearchKeyChange}
                onKeyUp={applyFilters}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="all">All</option>
                <option value="Wedding">Wedding</option>
                <option value="Parties">Parties</option>
                <option value="Open Mic">Open Mic</option>
             

                <option value="Conference">Conference</option>
                <option value="Club house">Club house</option>
                <option value="Reception">Reception</option>
                <option value="Community Hall">Community Hall</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="row justify-content-center mt-5 cardsOnly">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          <div className="card-container">
            {rooms.map((x) => (
              <div key={x.id} className="col-md-4 mt-3 cardhome">
                <Room room={x} fromDate={fromDate} toDate={toDate} />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Homescreen;