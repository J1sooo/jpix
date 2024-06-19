import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserState } from "../recoil/RecoilState";

const Search = () => {
    const { keyword } = useParams(); // URL 파라미터에서 검색어(keyword)를 가져옴
    const [searchTerm, setSearchTerm] = useState(keyword || ""); // 검색어 상태 관리
    const [results, setResults] = useState([]); // 검색 결과 상태 관리
    const [isLoading, setLoading] = useState(false); // 로딩 상태 관리
    const loggedInUser = useRecoilValue(UserState); // Recoil을 사용하여 로그인한 사용자 상태 관리
    const [liked, setLiked] = useState(false); // 좋아요 상태 관리
    const videoRefs = useRef([]);

    // 검색어 입력 변경 시 호출되는 함수
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 데이터를 가져오는 함수
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/board/search/${keyword}`);
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [keyword]);

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
    }, [results]); // data가 변경될 때마다 실행

    // 좋아요 기능 처리 함수
    const Like = async (boardId) => {
        try {
            await axios.post(`/likes/${boardId}`);
            setLiked(true);
        } catch (error) {
            console.error('좋아요 요청 실패:', error);
        }
    };

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요..."
                />
                {/* 검색 버튼 추가 */}
                <button onClick={() => setLoading(true)}>검색</button>
            </div>
            <div className="results">
                {isLoading ? (
                    <p>검색 중...</p>
                ) : results.length > 0 ? (
                    <ul>
                        {results.map((v, idx) => (
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
                                        <video ref={(el) => (videoRefs.current[idx] = el)} playsInline preload="auto"
                                               loop>
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
                    </ul>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
