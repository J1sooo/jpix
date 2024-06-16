import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Video() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await axios.get(`/board/video/`+id);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        getVideo();
    }, [id]);

    if (!data) {
        return <div>No video data found.</div>;
    }

    return (
        <div className="video-detail-container">
            <div className="video-player">
                <video controls>
                    <source src={data.filepath} type="video/mp4" />
                </video>
            </div>
            <div className="video-info">
                <h3>{data.title}</h3>
                <p>{data.content}</p>
                <p>작성자: {data.user.nickname}</p>
            </div>
        </div>
    );
}

export default Video;
