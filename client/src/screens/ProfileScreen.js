import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";
import "antd/dist/antd.css"; // Import Ant Design CSS
import "./ProfileScreen.css"; // Import custom CSS for styling

import MyBookingScreen from "./MyBookingScreen";

const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="profile-container">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="profile-content">
            <div className="profile-info">
              <h2>My Profile</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Is Admin:</strong>{" "}
                {user.isAdmin ? (
                  <Tag color="green">YES</Tag>
                ) : (
                  <Tag color="red">NO</Tag>
                )}
              </p>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBookingScreen />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
