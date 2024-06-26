import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IsLoginState, UserState } from "../recoil/RecoilState";
import { axiosLogout } from "../User/axios";
import "./Navbar.css";

const Navbar = ({ onLoginClick }) => {
    const location = useLocation();
    const user = useRecoilValue(UserState);
    const isLogin = useRecoilValue(IsLoginState);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();


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

    const enter = (e) => {
        if (e.key === 'Enter') {
            navigate("/search/" + keyword, { replace: true });
        }
    }

    return (
        <div className="App">
            <div className="white-nav">
                <div className="logo-container">
                    <Link to="/">
                        <span className="brand-name">JPIX</span>
                    </Link>
                </div>
                <div className="search-container">
                    <div className="search-form" role="search">
                        <input type="text2" placeholder="검색"
                               onChange={(e) => setKeyword(e.target.value)}
                               onKeyDown={e => enter(e)}
                        />
                    </div>
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
                <div
                    className={`menu-item ${
                        location.pathname === "/recommended" ? "active" : ""
                    }`}
                >
                    <Link
                        to="/"
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
                        <p>추천</p>
                    </Link>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/profile" ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick("/profile")}
                >
                    <img
                        src="/image/profile.png"
                        alt="프로필"
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <p>프로필</p>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/write" ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick("/write")}
                >
                    <img
                        src="/image/upload.png"
                        alt="업로드"
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <p>업로드</p>
                </div>
                <br />
                <div
                    className={`menu-item ${
                        location.pathname === "/following" ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick("/following")}
                >
                    <img
                        src="/image/following.png"
                        alt="팔로잉"
                        style={{
                            width: "24px",
                            height: "24px",
                            marginRight: "10px",
                        }}
                    />
                    <p>팔로잉</p>
                </div>
                <br />
                <div
                    className={`menu-item ${location.pathname === "/more" ? "active" : ""}`}
                >
                    <Link
                        to="/more"
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/image/more.png"
                            alt="더보기"
                            style={{
                                width: "24px",
                                height: "24px",
                                marginRight: "10px",
                            }}
                        />
                        <p>더보기</p>
                    </Link>
                </div>
                <br />
            </div>
        </div>
    );
};

export default Navbar;
