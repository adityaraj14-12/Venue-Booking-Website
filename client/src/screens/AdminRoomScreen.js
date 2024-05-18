import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "./AdminRoomScreen.css";

function AdminRoomScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    { title: "Room ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Max Count", dataIndex: "maxcount", key: "maxcount" },
    { title: "Phone Number", dataIndex: "phonenumber", key: "phonenumber" },
    { title: "Rent Per Day", dataIndex: "rentperday", key: "rentperday" },
    { title: "Type", dataIndex: "type", key: "type" },
  ];

  async function fetchMyData() {
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/rooms/getallrooms")).data;
      setRooms(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="col-md-12">
            <button className="btn btn-success" onClick={fetchMyData}>
              Refresh
            </button>
          </div>
          <div className="col-md-12">
            <Table columns={columns} dataSource={rooms} />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminRoomScreen;
