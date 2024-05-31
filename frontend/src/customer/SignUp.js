import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios"; // 회원가입 스타일을 포함한 CSS 파일을 import 합니다.

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    const data = {
      email: email,
      password: password,
      nickname: username
    }
    e.preventDefault();
    try{
      const response = await axios.post('/user/join', data)
      if(response.status === 200) {
        alert('회원가입에 성공하였습니다.')
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다.')
    }
    // 회원가입 로직을 추가합니다.
    // 예를 들어, 서버로 아이디, 비밀번호, 이메일을 전송하여 회원가입을 시도할 수 있습니다.


    console.log("회원가입 정보:", {username, password, email});
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
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
        <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
