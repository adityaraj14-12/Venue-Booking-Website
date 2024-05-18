import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import AdminBookingScreen from "./AdminBookingScreen";
import AdminRoomScreen from "./AdminRoomScreen";
import AdminUserScreen from "./AdminUserScreen";
import AdminAddRoomScreen from "./AdminAddRoomScreen";
import "./AdminScreen.css";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function AdminScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user || user.isAdmin === false) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="ml-3 mt-3 mr-3 bs">
      <h1 className="text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Bookings" key="1">
          <AdminBookingScreen />
        </TabPane>
        <TabPane tab="Venue" key="2">
          <AdminRoomScreen />
        </TabPane>
        <TabPane tab="Add venue" key="3">
          <AdminAddRoomScreen />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
