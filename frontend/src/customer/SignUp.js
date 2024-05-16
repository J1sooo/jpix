// SignUp.js
import React, { useState } from "react";
import "./SignUp.css"; // 회원가입 스타일을 포함한 CSS 파일을 import 합니다.

const SignUp = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    // 회원가입 로직을 추가합니다.
    // 예를 들어, 서버로 아이디와 비밀번호를 전송하여 회원가입을 시도할 수 있습니다.
  };

  return (
    <div className="signup-modal">
      <div className="signup-form">
        <h2>회원가입</h2>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleSignUp}>회원가입</button>
        <button onClick={onClose}>닫기</button> {/* 모달 닫기 버튼 */}
      </div>
    </div>
  );
};

export default SignUp;
