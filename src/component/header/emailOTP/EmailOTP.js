import React, { useState } from "react";
import { Link } from "react-router-dom";
import './EmailOTP.css'

export default function EmailOTP() {
    const urlLogo = "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2Ffeed6075-55fd-4fb3-98d4-946d30029eda?alt=media&token=a3dd9363-73f3-4aec-ae32-264c761a0c0f";
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State to store OTP digits

    const handleChange = (index, value) => {
        if (isNaN(value)) return; // Check if input is a number
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Auto focus next input field
        if (value !== "" && index < 5) {
            document.getElementById(`digit${index + 1}`).focus();
        }
    };

    return (
        <div className="container-email">
            <div className="email">
                <div className="logoEmail">
                    <Link to={`/`}>
                        <img src={urlLogo} alt="Logo" />
                    </Link>
                </div>
                <div className="title">Enter OTP Code</div>
                <div className="emailotp">
                    <form action="#">
                        <div className="input-field">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    id={`digit${index}`}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    maxLength="1"
                                    autoFocus={index === 0 ? true : false} // Auto focus first input field
                                />
                            ))}
                        </div>
                        <button>Verify OTP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
