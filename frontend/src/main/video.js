import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Video() {
    const { id } = useParams();
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await axios.get(`/board/video/`+id);
                setVideoData(response.data);
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        getVideo();
    }, [id]);

    if (!videoData) {
        return <div>No video data found.</div>;
    }

    return (
        <div className="video-detail-container">
            <div className="video-player">
                <video controls>
                    <source src={videoData.filepath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="video-info">
                <h3>{videoData.title}</h3>
                <p>{videoData.content}</p>
                <p>작성자: {videoData.user.nickname}</p>
            </div>
        </div>
    );
}

export default Video;
