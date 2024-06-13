import { useEffect, useState } from "react";
import axios from "axios";
import "./Recommended.css";

function Recommended() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getpost = async () => {
            const response = await axios.get("/board1/list");
            setData(response.data);
        };
        getpost();
    }, []);

    const handleLike = async (id) => {
        try {
            await axios.put(`/board/${id}/like`); // 좋아요 API 경로 수정
            // 좋아요를 반영하기 위해 다시 데이터를 불러올 수도 있음
            const updatedPosts = await axios.get("/board/list");
            setData(updatedPosts.data);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    return (
        <div className="app-container">
            <div className="main">

                {data.map((v, idx) => (

                    <div key={`${idx}-`} className="video-container-wrapper"
                         style={{
                             border: '1px solid black',
                             borderRadius: '15px',
                             padding: '20px',
                             margin: '10px 0',
                             marginBottom: '40px',
                             paddingBottom: '50px',
                             paddingRight: '25px'
                         }}>
                        <div className="video-container" style={{width: '18rem'}}>
                            <video controls autoPlay loop>
                                <source src={v.filepath} type="video/mp4" />
                            </video>
                        </div>

                        <div className="d-flex justify-content-around">

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="card-button" style={{width: '30px', height: '30px'}} viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="card-button" style={{width: '30px', height: '30px'}}
                                 viewBox="0 0 16 16">
                                <path
                                    d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="card-button" style={{width: '30px', height: '30px'}} viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path
                                    d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>

                        </div>
                        <div className="video-info">
                            <h3 className="card-title">{v.title}</h3>
                        </div>
                        <div className="video-info">
                            <p className="card-text">{v.content}</p>
                        </div>
                    </div>


                ))}
            </div>
        </div>
    );
}

export default Recommended;