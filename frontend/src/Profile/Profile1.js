import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/RecoilState"; // Recoil에서 사용자 정보 상태 가져오기

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


    // 현재 로그인한 사용자의 아이디와 영상의 작성자 아이디가 같은 경우만 필터링
    const filteredData = data.filter(v => v.user.id === loggedInUser.id);

    return (
        <div className="profileVideoContainer">
            <div className="row row-cols-auto">
                {filteredData.map((v, idx) => (
                    <div key={v.id}>
                        <Link to={`/video/${v.id}`} className="">
                            <div className="video-container col">
                                <video ref={(el) => (videoRefs.current[idx] = el)}>
                                    <source src={v.filepath} type="video/mp4"/>
                                </video>
                            </div>
                        </Link>

                    </div>
                ))}
                {isLoading && <div>로딩 중...</div>}
                <div ref={endRef}></div>
            </div>
        </div>
    );
}

export default Recommended;
