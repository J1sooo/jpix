import React, { useState } from "react";
import "./SignUp.css"; // 회원가입 스타일을 포함한 CSS 파일을 import 합니다.
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const SignUp = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      nickname: username,
    };
    try {
      const response = await axios.post("/user/join", data);
      if (response.status === 200) {
        alert("회원가입에 성공하였습니다.");
      }
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
    }
    console.log("회원가입 정보:", { username, password, email });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignUp(e);
    }
  };

  return (
      <>
        <div className="modal-overlay">
          <div className="signup-modal">
            <form className="login-form" onSubmit={handleSignUp}>
              <h2>회원가입</h2>

              <input
                  type="email"
                  placeholder="이메일 아이디"
                  value={email}
                  onChange={handleEmailChange}
              />
              <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handlePasswordChange}
              />
              <input
                  type="text"
                  placeholder="닉네임"
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyPress={handleKeyPress}
              />
              <button type="submit">회원가입</button>

              <Link to="/">
                <button onClick={onClose}>닫기</button>{" "}
              </Link>
            </form>
          </div>
        </div>
      </>
  );
};

export default SignUp;
