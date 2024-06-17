import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IsLoginState, UserState } from "../recoil/RecoilState";
import { axiosLogout } from "../User/axios";
import "./Navbar.css";

const Navbar = ({ onLoginClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const user = useRecoilValue(UserState);
  const isLogin = useRecoilValue(IsLoginState);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const logout = () => {
    const confirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmed) {
      axiosLogout();
      window.location.reload();
    }
  };

  const handleMenuClick = (path) => {
    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다.");
    } else {
      // 로그인 상태에서만 해당 메뉴로 이동
      window.location.href = path; // 새로고침이 필요한 경우
    }
  };

  return (
      <div className="">
        <div className="white-nav">
          <div className="logo-container">
            <Link to="/">
              <span className="brand-name">JPIX</span>
            </Link>
          </div>
          <div className="search-container">
            <form className="search-form" role="search">
              <input
                  className="search-input"
                  type="search"
                  placeholder="검색어를 입력하세요..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleInputChange}
              />
            </form>
            <button className="search-button" type="submit">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
              >
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                />
              </svg>
            </button>
          </div>
          {isLogin ? (
              <div>
                {user.name}
                <br />
                <button className="btn btn-primary" onClick={logout}>
                  로그아웃
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-secondary">
                  <Link to="/settings" className="settings-link">
                    설정
                  </Link>
                </button>
              </div>
          ) : (
              <div className="nav-buttons">
                <button className="btn btn-primary" onClick={onLoginClick}>
                  로그인
                </button>
              </div>
          )}
        </div>

        <div className="left-menu">
          {isLogin && (
              <>
                <div
                    className={`menu-item ${
                        location.pathname === "/recommended" ? "active" : ""
                    }`}
                >
                  <Link to="/"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                    <img
                        src="/image/recommended.png"
                        alt="추천"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "10px",
                        }}
                    />
                    <span>추천</span>

                  </Link>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/profile" ? "active" : ""
                    }`}
                >
                  <Link to="/profile"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                    <img
                        src="/image/profile.png"
                        alt="프로필"
                        style={{
                          width: "24px",
                          height: "24px",

                        }}
                    />
                    <span>프로필</span>
                  </Link>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/write" ? "active" : ""
                    }`}
                >
                  <Link to="/write"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                    <img
                        src="/image/upload.png"
                        alt="업로드"
                        style={{
                          width: "24px",
                          height: "24px",

                        }}
                    />
                    <span>업로드</span>
                  </Link>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/following" ? "active" : ""
                    }`}
                >
                  <Link to="/following"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                    <img
                        src="/image/following.png"
                        alt="팔로잉"
                        style={{
                          width: "24px",
                          height: "24px",

                        }}
                    />
                    <span>팔로잉</span>
                  </Link>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/more" ? "active" : ""
                    }`}
                >
                  <Link to="/more"
                        style={{
                          display: " flex",
                          alignItems: " center"
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center"
                        }}>
                    <img
                        src="/image/more.png"
                        alt="더보기"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "10px"
                        }}
                    />
                    <span>더보기</span>
                  </Link>
                </div>
                <br />
              </>
          )}
          {!isLogin && (
              <>
                <div
                    className={`menu-item ${
                        location.pathname === "/recommended" ? "active" : ""
                    }`}
                >
                  <Link to="/"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                  >
                    <img
                        src="/image/recommended.png"
                        alt="추천"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "10px",
                        }}
                    />
                    <span>추천</span>
                  </Link>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/more" ? "active" : ""
                    }`}
                >
                  <Link to="/more"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
                    <img
                        src="/image/more.png"
                        alt="더보기"
                        style={{
                          width: "24px",
                          height: "24px",
                          marginRight: "10px",
                        }}
                    />
                    <span>더보기</span>
                  </Link>
                </div>
                <br />
              </>
          )}
        </div>
        {searchTerm && <p>검색어: {searchTerm}</p>}
      </div>
  );
};

export default Navbar;
