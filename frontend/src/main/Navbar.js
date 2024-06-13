import React from "react";

import { Link, useLocation } from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginState, UserState} from "../recoil/RecoilState";
import {axiosLogout} from "../User/axios";


const Navbar = ( {onLoginClick}) => {
  const location = useLocation();
  const user = useRecoilValue(UserState);
  const isLogin = useRecoilValue(IsLoginState);
  const logout = () => {
    const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmed) {
      axiosLogout();
      window.location.reload();
    }
  };

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
        {isLogin? <div>안녕하세요 "{user.name}"님
              <button className="btn btn-primary" onClick={logout}>로그아웃</button>
              <button className="btn btn-secondary">
                <Link to="/settings" className="settings-link">설정</Link>
              </button>
            </div> :
            <div className="nav-buttons">
              <button className="btn btn-primary" onClick={onLoginClick}>로그인</button>

          </div>}
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
        <br/>
        <div className={`menu-item ${location.pathname === "/write" ? "active" : ""}`}>
          <Link to="/write">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-plus-circle" viewBox="0 0 16 16"
                 style={{width: '24px', height: '24px', marginRight: '10px', color: 'black'}}>
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
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
