import React, { useState } from 'react';
import './RecoveryPassword.css'; // Import CSS file
import { Link, useNavigate } from 'react-router-dom';

const RecoveryPassword = () => {
    const urlLogo = "https://firebasestorage.googleapis.com/v0/b/artwork-platform.appspot.com/o/logo%2Ffeed6075-55fd-4fb3-98d4-946d30029eda?alt=media&token=a3dd9363-73f3-4aec-ae32-264c761a0c0f";
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi email khôi phục mật khẩu
        // Ở đây bạn có thể sử dụng một API hoặc một phương thức xử lý khôi phục mật khẩu khác
        // Ví dụ: fetch('/api/reset-password', { method: 'POST', body: { email }})
        setMessage(`An email with instructions to reset your password has been sent to ${email}.`);
        setEmail('');
        navigate('/emailOTP')
    };

    return (
        <div className="recovery-password-container">
            <div className='recovery'>
                <div className="logoRecovery">
                    <Link to={`/`}>
                        <img src={urlLogo} alt="Logo" />
                    </Link>
                </div>
                <div className="title">Recover Your Password</div>
                <p className='recovery-password-remind'>Enter your email and we’ll send a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <div className='group'>
                        <input type="text" placeholder="Email" value={email} onChange={handleChange} required /> {/* Thêm class cho input */}
                    </div>
                    <div className='change'>
                        <button type="submit">Send Email</button> {/* Thêm class cho button */}
                    </div>
                    <div className='loginInRegis'>
                        <h6>Bạn đã có tài khoản?</h6>
                        <Link to={`/login`}><button>Login</button></Link>
                    </div>
                    <div className='signUp'>
                        <h6>Bạn chưa có tài khoản?</h6>
                        <Link to={`/regis`}><button>Sign UP</button></Link>
                    </div>

                </form>
                <p className="message">{message}</p> {/* Thêm class cho phần thông báo */}
            </div>
        </div>
    );
};

export default RecoveryPassword;
