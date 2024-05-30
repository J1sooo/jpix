import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./customer/Login";
import Recommended from "./Recommended";
import Profile from "./Profile/Profile";
import Following from "./Following/Following";
import More from "./More/More";
import Settings from "./Settings";
import logo from "./assets/jpix-logo.png";

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
        <div className="logo-container">
          <img src={logo} className="logo" alt="JPX Logo" />
          <span className="brand-name">JPIX</span>
        </div>
        <div className="search-container">
          <form className="search-form" role="search">
            <input
              className="search-input"
              type="search"
              placeholder="검색"
              aria-label="Search"
            />
            <button className="search-button" type="submit">
              🔍
            </button>
          </form>
        </div>
        <div className="nav-buttons">
          <button className="btn btn-primary" onClick={handleLoginClick}>로그인</button>
          <button className="btn btn-secondary">
            <Link to="/settings" className="settings-link">설정</Link>
          </button>
        </div>
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

      <Routes>
        <Route path="/" element={<Recommended />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/following" element={<Following />} />
        <Route path="/more" element={<More />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;