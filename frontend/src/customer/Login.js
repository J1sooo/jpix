import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // 로그인 스타일을 포함한 CSS 파일을 import 합니다.


const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // 로그인 로직을 추가합니다.
    // 예를 들어, 서버로 아이디와 비밀번호를 전송하여 로그인을 시도할 수 있습니다.
    onClose(); // 로그인 버튼 클릭 시 모달 닫기
  };

  const handleSignUp = () => {
    navigate("/signup");
    onClose(); // 회원가입 버튼 클릭 시 모달 닫기
  };

  const handleClose = () => {
    onClose(); // 모달 닫기 콜백
    navigate("/"); // 기본 페이지로 리다이렉트
  };


    return (
        <>
          <div className="modal-overlay" onClick={onClose}></div>
          {/* 반투명 배경 */}
          <div className="login-modal">
            <div className="login-form">
              <h2> JPIX에 로그인</h2>
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
              <button onClick={handleLogin}>로그인</button>
              <Link to="/customer/signup">
                <button onClick={handleSignUp}>회원가입</button>
              </Link>

              <button onClick={onClose}>닫기</button>
              {/* 모달 닫기 버튼 */}
            </div>
          </div>
        </>

    );
};

export default Login;
