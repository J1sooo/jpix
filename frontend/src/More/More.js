import React, { useState } from "react";

const More = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <div className="more-page">
            <h2>더보기 페이지</h2>
            <button onClick={toggleDarkMode} className="dark-mode-toggle">
                다크 모드 {isDarkMode ? "끄기" : "켜기"}
            </button>
            <p>여기에 추가적인 설정이나 정보를 표시합니다.</p>
        </div>
    );
};

export default More;