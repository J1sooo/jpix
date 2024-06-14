import React, { useState } from "react";
import "./Profile.css";

function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProfilePicClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-pic" onClick={handleProfilePicClick}>
                    <img src="/image/bb.jpg" alt="프로필 사진" className="no-invert"/>
                </div>
                <div className="profile-info">
                    <div className="profile-name">
                        <h2>조유리</h2>
                        <button className="edit-profile-btn" className="no-invert">프로필 편집</button>
                    </div>
                    <div className="profile-stats">
                        <span>게시물 수: 100</span>
                        <span>팔로워 수: 200</span>
                        <span>팔로잉 수: 150</span>
                    </div>
                    <div className="profile-bio">
                        <p>하이</p>
                    </div>
                </div>
            </div>
            <div className="profile-posts">
                <div className="profile-post">
                    <img src="/image/aa.jpg" alt="게시물 1" className="no-invert"/>
                </div>
                <div className="profile-post">
                    <img src="/image/recommended.png" alt="게시물 2" className="no-invert"/>
                </div>
                <div className="profile-post">
                    <img src="/image/recommended.png" alt="게시물 3" className="no-invert"/>
                </div>
                <div className="profile-post">
                    <img src="/image/aa.jpg" alt="게시물 4" className="no-invert"/>
                </div>
                <div className="profile-post">
                    <img src="/image/aa.jpg" alt="게시물 5" className="no-invert"/>
                </div>
                {/* Add more posts as needed */}
            </div>
            {isModalOpen && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" >
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <img src="/image/bb.jpg" alt="" className="modal-img" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;