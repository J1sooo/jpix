import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {useRecoilValue} from "recoil";
import {UserState} from "../recoil/RecoilState";
import "./Video.css"

function Video() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const loggedInUser = useRecoilValue(UserState); // Recoil을 사용하여 현재 로그인 사용자 정보 가져오기

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await axios.get(`/board/video/${id}`);
                setData(response.data);
                // Assume comments are part of data response
                setComments(response.data.comments || []);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        getVideo();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // Add comment submission logic here
        // For now, we'll just add the comment to the local state
        setComments([...comments, { author: 'CurrentUser', text: newComment }]);
        setNewComment('');
    };

    if (!data) {
        return <div>No video data found.</div>;
    }

    const boardDelete = async (id) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/board/delete/${id}`);
            setData((prevData) => prevData.filter((post) => post.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const boardModify = (id) => {
        navigate(`/modify/${id}`);
    };

    return (
        <div className="video-detail-containerv">
            <div className="video-playerv">
                <video controls>
                    <source src={data.filepath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="video-infov">
                <h3>{data.title}</h3>
                <p>{data.content}</p>
                <p className="author">작성자: {data.user.nickname}</p>
                {loggedInUser && data.user.id === loggedInUser.id && (
                    <>
                        <button onClick={() => boardDelete(data.id)} className="delete-button">
                            삭제
                        </button>
                        <button onClick={() => boardModify(data.id)} className="modify-button">
                            수정
                        </button>
                    </>
                )}
                <div className="comment-section">
                    <h4>
                        댓글 <span>({comments.length})</span>
                    </h4>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p className="comment-author">{comment.author}</p>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                    <div className="comment-input">
                    <textarea
                        rows="3"
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                        <button onClick={handleCommentSubmit}>댓글 작성</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;