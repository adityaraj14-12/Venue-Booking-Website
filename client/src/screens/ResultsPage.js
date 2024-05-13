// ResultsPage.jsx

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function ResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchFilteredRooms() {
      try {
        const fromDate = queryParams.get("fromDate");
        const toDate = queryParams.get("toDate");
        const searchKey = queryParams.get("searchKey");
        const type = queryParams.get("type");

        setError("");
        setLoading(true);
        
        // Fetch filtered rooms based on query parameters
        const response = await axios.get("/api/rooms/getfilteredrooms", {
          params: { fromDate, toDate, searchKey, type }
        });
        setRooms(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchFilteredRooms();
  }, [location.search]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error msg={error} />
        ) : rooms.length === 0 ? (
          <p>No rooms found</p>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-3" key={room.id}>
              <Room room={room} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ResultsPage;