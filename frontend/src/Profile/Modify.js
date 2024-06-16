import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Write.css";

function Modify() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [filepath, setFilepath] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`/board/video/${id}`);
                const data = response.data;
                setTitle(data.title);
                setContent(data.content);
                setFilepath(data.filepath); // filepath 설정
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("content", content);

        try {
            await axios.post(`/board/modify/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            alert("글 수정이 완료되었습니다.");
            navigate(`/video/${id}`);
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    return (
        <div className="layout">
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    placeholder="동영상 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    name="content"
                    placeholder="동영상 내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div>
                    {filepath && (
                        <p>현재 파일: {filepath}</p>
                    )}
                </div>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">수정</button>
            </form>
        </div>
    );
}

export default Modify;
