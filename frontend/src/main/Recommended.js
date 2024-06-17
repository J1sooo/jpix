import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Recommended.css";
import "./Navbar.css"
import {Link, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {UserState} from "../recoil/RecoilState";

function Recommended() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const videoRefs = useRef([]);
    const endRef = useRef(null);
    const navigate = useNavigate();
    const loggedInUser = useRecoilValue(UserState); // Recoil을 사용하여 현재 로그인 사용자 정보 가져오기
    const [liked, setLiked] = useState(false);

    const getPost = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/board/list?id=${data.length > 0 ? data[data.length - 1].id : -1}`);
            if (response.data.length > 0) {
                setData((prevData) => [...prevData, ...response.data]);
            } else {
                console.log("No more data available.");
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, []); // 초기 렌더링 시 한 번만 실행

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isLoading) {
                    getPost();
                }
            },
            { threshold: 0.1 } // 화면 하단의 10% 진입 시 로드
        );

        if (endRef.current) observer.observe(endRef.current);

        return () => {
            if (endRef.current) observer.unobserve(endRef.current);
        };
    }, [isLoading]); // isLoading이 변경될 때마다 실행

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.7 } // 비디오가 70% 이상 보일 때 재생
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, [data]); // data가 변경될 때마다 실행

    const Like = async (boardId) => {
        try {
            await axios.post('/likes/'+ boardId,
                );
            setLiked(true);
        } catch (error) {
            console.error('좋아요 요청 실패:', error);
        }
    };

    return (
        <div className="app-container">
            <div className="main">
                {data.map((v, idx) => (
                    <div
                        key={v.id}
                        className="video-container-wrapper"
                        style={{
                            border: "1px solid black",
                            borderRadius: "15px",
                            padding: "20px",
                            margin: "10px 0",
                            marginBottom: "40px",
                            paddingBottom: "50px",
                            paddingRight: "25px",
                        }}
                    >
                        <Link to={`/video/${v.id}`}>
                            <div className="video-container" style={{width: "18rem"}}>
                                <video ref={(el) => (videoRefs.current[idx] = el)} playsInline preload="auto" loop>
                                    <source src={v.filepath} type="video/mp4"/>
                                </video>
                            </div>
                        </Link>
                        <div className="d-flex justify-content-around">
                            {/* 좋아요, 공유 등의 버튼 */}
                        </div>
                        <div className="video-info">
                            <h3 className="card-title">{v.title}</h3>
                        </div>
                        <div className="video-info">
                            <p className="card-text">{v.content}</p>
                        </div>
                        <div className="video-info">
                            <p className="card-text">작성자: {v.user.nickname}</p>
                        </div>
                        <button
                            id="likeButton"
                            className={v.liked ? 'liked' : ''}
                            onClick={() => Like(v.id)}
                            disabled={v.liked}
                        >
                            {v.liked ? '❤️' : '♡'}
                        </button>

                    </div>
                ))}
                {isLoading && <div>로딩 중...</div>}
                <div ref={endRef}></div>
            </div>
        </div>
    );
}

export default Recommended;
