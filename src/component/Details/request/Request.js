import React, { useEffect, useState } from "react";
import "./Request.css";
import urlApi from "../../../configAPI/UrlApi";
import axios from "axios";
import Sent from "./sent/Sent";

export default function Request({ userById }) {
  const [username, setUsername] = useState([]);
  const [currentTab, setCurrentTab] = useState("unread");
  const [mail, setMail] = useState("newRequest");
  const [email, setEmail] = useState(username.email || "");
  const [phoneNo, setPhoneNo] = useState(username.phoneNumber || "");
  const [text, setText] = useState("");
  const [updateData, setUpdateData] = useState([]);

  const token = localStorage.getItem("token");

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleNewRequest = (tab) => {
    setMail(tab);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePhoneNo = (value) => {
    setPhoneNo(value);
  };

  const handleText = (value) => {
    setText(value);
  };

  const dataSend = {
    email: email,
    phoneNumber: phoneNo,
    text: text,
  };

  const handleSend = async () => {
    try {
      if (!text) {
        alert("Hãy nhập nội dung cần gửi trước khi gửi!!!");
        return;
      }
      const response = await axios.post(
        `${urlApi}/api/RequestOrder/send-request?user_Id=${userById.user_Id}`,
        dataSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Send successful!");
        setText("");
        setUpdateData(response);
      } else {
        console.error(
          "Failed to send. Server responded with status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error", error.request);
      alert("Failed to send!");
    }
  };

  useEffect(() => {
    const data = {
      Token: token,
    };
    if (token) {
      axios
        .post(`${urlApi}/api/Auth/me`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const userInfo = response.data.userInfo;
          setUsername(userInfo);
          setEmail(userInfo.email || "");
          setPhoneNo(userInfo.phoneNumber || "");
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi gọi API:", error);
        });
    }
  }, []);

  return (
    <div className="request">
      <section className="request-content">
        <section className="content-title">
          <span>Request</span>
          <div style={{ width: "170px" }}>
            <button
              onClick={() => handleNewRequest("newRequest")}
              className={currentTab === "newRequest" ? "notMail" : ""}
            >
              New request
            </button>
          </div>
        </section>
        <section className="content-box">
          <div className="box-sideBar">
            <button
              onClick={() => handleTabClick("sent")}
              className={currentTab === "sent" ? "active" : ""}
            >
              Sent
            </button>
          </div>
          <div className="box-request">
            <ul>
              <Sent username={username} updateData={updateData} />
            </ul>
            <div>
              {mail === "newRequest" ? (
                <div className="boxRequest-mail">
                  <section style={{ width: "90%", height: "90%" }}>
                    <section>
                      <input
                        placeholder="To"
                        type="text"
                        value={userById.nick_Name}
                      />

                      <input
                        type="text"
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
                      />

                      <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => handlePhoneNo(e.target.value)}
                      />

                      <textarea
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => handleText(e.target.value)}
                      />
                    </section>
                    <section style={{ textAlign: "right", marginBottom: "20px" }}>
                      <button
                        onClick={() => handleNewRequest("notMail")}
                        className={currentTab === "newRequest" ? "notMail" : ""}
                        style={{
                          border: "none",
                          fontWeight: "bold",
                          color: "#b1b1b9",
                          width: "120px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          height: "51px",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "black";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#b1b1b9";
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => handleSend(e)}
                        style={{
                          marginLeft: "10px",
                          border: "none",
                          backgroundColor: "#05eb8f",
                          width: "120px",
                          height: "51px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        SEND
                      </button>
                    </section>
                  </section>
                </div>
              ) : (
                <div className="boxRequest-notMail"></div>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
