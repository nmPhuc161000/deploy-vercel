import React, { useState } from "react";
import "./ChangePassword.css";
import urlApi from '../../configAPI/UrlApi'
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }

    const dataPassword = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    try {
      const response = await axios.put(
        `${urlApi}/api/User/change-password`,
        dataPassword,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Password changed successfully.");
        alert("Password changed successfully.");
      } else {
        
        throw new Error("Failed to change password");
      }
    } catch (error) {
      var jsonString = error.request.response;
      var jsonObject = JSON.parse(jsonString);
      var errorMessage = jsonObject.message;
      console.log("error: ", errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="ChangePassword">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="currentPassword">Enter old password: </label>
          <input
            type="password"
            id="currentPassword"
            onChange={handleOldPassword}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Enter new password:</label>
          <input
            type="password"
            id="newPassword"
            onChange={handleNewPassword}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm new password:</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleConfirmNewPassword}
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
