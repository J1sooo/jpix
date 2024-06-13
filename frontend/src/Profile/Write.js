import React, { useState } from "react";
import axios from "axios";
import "./Write.css";

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("board/writepro", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                params: {
                    title: title,
                    content: content,
                }
            });
            console.log(response.data);
            // 성공적으로 작성한 후의 처리 로직 추가 (예: 페이지 이동)
            alert("글 작성이 완료되었습니다.")
            window.location.href = "/";
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };



    return (
        <div className="layout">
            <form>
                <input
                    name="title"
                    type="text"
                    placeholder="동영상 제목을 입력하세요..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    name="content"
                    placeholder="동영상 내용을 입력하세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleSubmit}>작성</button>
            </form>
        </div>
    );
}


export default Write;
