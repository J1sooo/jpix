import React from "react";

import { Link, useLocation } from "react-router-dom";

import { userEffect } from "react";

const Navbar = ( {onLoginClick}) => {
  const location = useLocation();

  return (
    <div className="App">
      <div className="white-nav">
        <div className="logo-container">
          <Link to="/"><span className="brand-name">JPIX</span></Link>
        </div>
        <div className="search-container">
          <form className="search-form" role="search">
            <input
              className="search-input"
              type="search"
              placeholder="검색어를 입력하세요..."
              aria-label="Search"
            />
            <button className="search-button" type="submit">
              검색  
            </button>
          </form>    
        </div>
        <div className="nav-buttons">
            <button  className="btn btn-primary" onClick={onLoginClick} >로그인</button>
            <button className="btn btn-secondary">
            <Link to="/settings" className="settings-link">설정</Link>
          </button>
          </div>
      </div>
      <div className="left-menu">
        <div className={`menu-item ${location.pathname === "/recommended" ? "active" : ""}`}>
          <Link to="/">
            <img src="/image/recommended.png" alt="추천" style={{width: '24px', height: '24px', marginRight: '10px'}}/>
            <p>추천</p>
          </Link>
        </div>
        <br/>
        <div className={`menu-item ${location.pathname === "/profile" ? "active" : ""}`}>
          <Link to="/profile">
            <img src="/image/profile.png" alt="프로필" style={{width: '24px', height: '24px', marginRight: '10px'}}/>
            <p>프로필</p>
          </Link>
        </div>

        <div className={`menu-item ${location.pathname === "/write" ? "active" : ""}`}>
          <Link to="write">
            <img src="/image/profile.png" alt="업로드" style={{width: '24px', height: '24px', marginRight: '10px'}}/>
            <p>업로드</p>
          </Link>
        </div>
        <br/>
        <div className={`menu-item ${location.pathname === "/following" ? "active" : ""}`}>
          <Link to="/following">
            <img src="/image/following.png" alt="팔로잉" style={{width: '24px', height: '24px', marginRight: '10px'}}/>
            <p>팔로잉</p>
          </Link>
        </div>
        <br/>
        <div className={`menu-item ${location.pathname === "/more" ? "active" : ""}`}>
          <Link to="/more">
            <img src="/image/more.png" alt="더보기" style={{width: '24px', height: '24px', marginRight: '10px'}}/>
            <p>더보기</p>
          </Link>
        </div>
        <br/>
      </div>
    </div>
  );
}

export default Navbar;
