import React, { useState } from "react";
import "./RecoveryPassword.css"; // Import CSS file
import { Link, useNavigate } from "react-router-dom";
import urlApi from "../../../configAPI/UrlApi";
import Swal from "sweetalert2";

const RecoveryPassword = () => {
  const urlLogo =
    "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2Ffeed6075-55fd-4fb3-98d4-946d30029eda?alt=media&token=a3dd9363-73f3-4aec-ae32-264c761a0c0f";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "otp") setOtp(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };
  const sendOTP = async () => {
    try {
      const response = await fetch(
        `${urlApi}/api/Auth/send-password-reset-code?email=${email}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const data = await response.text(); // Nhận dữ liệu dưới dạng văn bản
        console.log(data); // Log dữ liệu phản hồi từ server
        alert("Please check your mail to take OPT.");
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send OTP");
    }
  };
  
  const resetPassword = async () => {
    try {
      if (email && otp) {
        const response = await fetch(
          `${urlApi}/api/Auth/reset-password?email=${email}&otp=${otp}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: newPassword,
              confirmPassword: confirmNewPassword,
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Password reset successfully!",
            showConfirmButton: false,
            timer: 1500, // Tắt sau 1.5 giây
          }).then(() => {
            // Chuyển hướng về trang login
            navigate("/login");
          });
        } else {
          const errorData = await response.json(); // Trích xuất dữ liệu lỗi từ phản hồi
          alert(
            errorData.errors || "Failed to reset password. Please try again."
          ); // Hiển thị thông điệp lỗi
        }
      } else {
        alert("Please enter both email and OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to reset password",
        text: "Please try again.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleSendOTP = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    sendOTP();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match.");
      return;
    }
    resetPassword();
  };

  return (
    <div className="recovery-password-container">
      <div className="recovery">
        <div className="logoRecovery">
          <Link to={`/`}>
            <img src={urlLogo} alt="Logo" />
          </Link>
        </div>
        <div className="title">Recover Your Password</div>
        <p className="recovery-password-remind">
          Enter your email and we’ll send a link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="group-re">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="group-re">
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={otp}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={handleSendOTP}>
              Send OTP
            </button>
          </div>
          <div className="group-re">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="group-re">
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="change">
            <button type="submit">Reset Password</button>
          </div>
          <div className="loginInRegis-re">
            <h6>Bạn đã có tài khoản?</h6>
            <Link to={`/login`}>
              <button>Login</button>
            </Link>
          </div>
          <div className="signUp-re">
            <h6>Bạn chưa có tài khoản?</h6>
            <Link to={`/regis`}>
              <button>Sign UP</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPassword;
