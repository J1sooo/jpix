import React, { useEffect, useState } from "react";
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

    return (
        <div className="app-container">
            <div className="main">
                {data.map((v, idx) => (
                    <div key={`${idx}-`} className="video-container-wrapper">
                        <div className="video-container">
                            <video controls autoPlay loop>
                                <source src={v.filepath} type="video/mp4" />
                            </video>
                        </div>
                        <div className="video-info z-1 position-absolute p-5 rounded-3">
                                <h3>{v.title}</h3>
                                <p>{v.content}</p>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommended;