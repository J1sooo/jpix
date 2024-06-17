import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const [results, setResults] = useState({ posts: [], comments: [], users: [] });
    const [isLoading, setIsLoading] = useState(false);
    const videoRefs = useRef([]);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('keyword');

    const getSearchResults = async (keyword) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/search/${keyword}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            getSearchResults(query);
        }
    }, [query]);

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
    }, [results]); // results가 변경될 때마다 실행

    return (
        <div className="app-container">
            <div className="main">
                <h2>검색 결과</h2>
                <div>
                    <h3>게시물</h3>
                    {results.posts.length > 0 ? (
                        results.posts.map((post, idx) => (
                            <div key={post.id} className="video-container-wrapper">
                                <div className="video-container" style={{ width: "18rem" }}>
                                    <video ref={(el) => (videoRefs.current[idx] = el)} playsInline preload="auto" loop>
                                        <source src={post.post_image_url} type="video/mp4" />
                                    </video>
                                </div>
                                <div>
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>
                                </div>
                                <div>
                                    <p>작성자: {post.user_name}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>게시물이 없습니다.</p>
                    )}
                </div>
                <div>
                    <h3>댓글</h3>
                    {results.comments.length > 0 ? (
                        results.comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.comment_content}</p>
                                <div>
                                    <img src={comment.user_image} alt={`${comment.user_name}의 프로필 이미지`} />
                                    <p>{comment.user_name}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}
                </div>
                <div>
                    <h3>작성자</h3>
                    {results.users.length > 0 ? (
                        results.users.map((user) => (
                            <div key={user.id}>
                                <p>닉네임: {user.user_name}</p>
                                <p>실명: {user.user_real_name}</p>
                                <img src={user.user_image} alt={`${user.user_real_name}의 프로필 이미지`} />
                            </div>
                        ))
                    ) : (
                        <p>작성자가 없습니다.</p>
                    )}
                </div>
                {isLoading && <div>로딩 중...</div>}
            </div>
        </div>
    );
};

export default Search;
