import React, { useState } from 'react';
import './Home.css'; 

const Home = () => {
  const [activeMenu, setActiveMenu] = useState('추천'); 


  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="jpix-home">
    <div className="left-menu">
      <div
        className={`menu-item ${activeMenu === '추천' && 'active'}`}
        onClick={() => handleMenuClick('추천')}
      >
        추천
      </div>
      <div
        className={`menu-item ${activeMenu === '프로필' && 'active'}`}
        onClick={() => handleMenuClick('프로필')}
      >
        프로필
      </div>
      <div
        className={`menu-item ${activeMenu === '팔로잉' && 'active'}`}
        onClick={() => handleMenuClick('팔로잉')}
      >
        팔로잉
      </div>
      <div
        className={`menu-item ${activeMenu === '더보기' && 'active'}`}
        onClick={() => handleMenuClick('더보기')}
      >
        더보기
      </div>
    </div>
  
    {/* 비디오 스크롤 영역 */}
    <div className="video-scroll">
      {/* 비디오 아이템들 */}
      {/* 비디오 아이템들이 들어갈 영역 */}
    </div>
  </div>
  );
};

export default Home; //Home.js