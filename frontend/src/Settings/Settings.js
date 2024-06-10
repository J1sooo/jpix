import React from "react";
import { Link } from "react-router-dom"
function Settings() {
  return (
      <div>
          <h1>회원 관리</h1>

          <Link to="/">
              <button>로그아웃</button>
          </Link>
          <br></br>
          <br></br>
          <button>회원 탈퇴</button>
      </div>
  );
}

export default Settings;