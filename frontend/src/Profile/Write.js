import React, { useState } from "react";
import axios from "axios";
import "./Write.css";

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = async (e) => {
    

        try {
            const response = await axios.post("board/writepro", {
                params: {
                    title: title,
                    content: content,
                    file: file
                }
            });
            console.log(response.data);
            // 성공적으로 작성한 후의 처리 로직 추가 (예: 페이지 이동)
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    return (
        <div className="layout">
            <form onSubmit={handleSubmit} action="/board/writepro">
                <input 
                    name="title" 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    name="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button formMethod="post">작성</button>
            </form>
        </div>
    );
}

export default Write;