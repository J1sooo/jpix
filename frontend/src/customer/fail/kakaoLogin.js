import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoLogin = () => {
    useEffect(() => {
        // 카카오 SDK 초기화
        if (window.Kakao) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init("52786c6e3c6921d9668c6d5f297e1a04");
            }
        }
    }, []);

    const kakaoLogin = () => {
        window.Kakao.Auth.login({
            scope: 'profile_nickname, profile_image',
            success: function (authObj) {
                console.log(authObj);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: res => {
                        const kakao_account = res.kakao_account;
                        console.log(kakao_account);

                        // 백엔드로 사용자 정보 전송
                        axios.post('/user/kakaoLogin', {
                            id: res.id,
                            nickname: kakao_account.profile.nickname,
                            profileImage: kakao_account.profile.profile_image_url
                        })
                            .then(response => {
                                console.log('서버 응답:', response);
                            })
                            .catch(error => {
                                console.error('로그인 정보 전송 오류:', error);
                            });
                    }
                });
            }
        });
    };

    return (
        <div>
            <h2>회원가입</h2>
            <img src="/image/following.png" style={{width: '240px', height: '240px', marginLeft: '30px'}}
                 onClick={kakaoLogin} alt="카카오 로그인"/>
        </div>
    );
};

export default KakaoLogin;
