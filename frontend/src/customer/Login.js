import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./Login.css";
import axios from "axios";
import { axiosLogin } from "../User/axios"; // 로그인 스타일을 포함한 CSS 파일을 import 합니다.
import { IsLoginState } from "../recoil/RecoilState"; // 로그인 상태를 관리하기 위한 recoil atom import

const Login = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [isOpenModal, setOpenModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useRecoilState(IsLoginState);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setLoading(true);
        if (!username || !password) {
            setLoginError("아이디와 비밀번호를 모두 입력해주세요.");
            setOpenModal(true);
        } else {
            try {
                const response = await axiosLogin(username, password);
                if (response.status === 200) {
                    setIsLogin(true);
                    alert('로그인에 성공하였습니다.')
                    navigate("/");
                    onClose();
                    window.location.reload();
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response.status === 401) {
                        setLoginError(error.response.data);
                        alert('아이디 혹은 비밀번호가 일치하지않습니다.')
                    } else {
                        setLoginError(error.message);
                    }
                    setOpenModal(true);
                }
            }
        }
        setLoading(false);
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
const a = document.createElement('a');
a.href = 'javascript:kakaoLogin();';


document.body.appendChild(a);

// Load the Kakao SDK script dynamically
const script = document.createElement('script');
script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
script.onload = function() {
    window.Kakao.init('52786c6e3c6921d9668c6d5f297e1a04');
};
document.head.appendChild(script);

// Define the kakaoLogin function
function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: 'profile_nickname, profile_image',
        success: function(authObj) {
            console.log(authObj);
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: function(res) {
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account);
                }
            });
        }
    });
}

export default Login;
