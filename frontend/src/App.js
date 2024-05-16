import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./customer/Login";
import Recommended from "./Recommended";
import Profile from "./Profile/Profile";
import Following from "./Following/Following";
import More from "./More/More";
import Settings from "./Settings/Settings"; 

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="App">
      <div className="white-nav">
        JPIX
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">사용자 이름 및 동영상 검색</a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="검색어를 입력하시오."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                검색
              </button>
            </form>
          </div>
        </nav>
        <button onClick={handleLoginClick}>로그인</button>
        <button><Link to="/settings">설정</Link></button> 
      </div>
      <div className="hr"></div>
      <div className="left-menu">
        <div className="menu-item active">
          <Link to="/">추천</Link>
        </div>
        <br />
        <div className="menu-item">
          <Link to="/profile">프로필</Link>
        </div>
        <br />
        <div className="menu-item">
          <Link to="/following">팔로잉</Link>
        </div>
        <br />
        <div className="menu-item">
          <Link to="/more">더보기</Link>
        </div>
        <br />
      </div>
      {isLoginModalOpen && <Login onClose={handleCloseModal} />}
      <div className="page">
        <Routes>
          <Route path="/" element={<Recommended />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/following" element={<Following />} />
          <Route path="/more" element={<More />} />
          <Route path="/settings" element={<Settings />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;