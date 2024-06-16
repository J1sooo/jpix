import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./customer/Login";
import Recommended from "./main/Recommended";
import Profile from "./Profile/Profile";
import Following from "./Following/Following";
import More from "./More/More";
import Settings from "./Settings/Settings";
import Write from "./Profile/Write";
import Navbar from "./main/Navbar";
import SignUp from "./customer/SignUp"
import UseCheckMe from "./User/Checkme";
import Video from "./main/Video";
import Modify from "./Profile/Modify";


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };
  
  return (
    <div className="App">
      <UseCheckMe/>
      <Navbar onLoginClick={handleLoginClick} />
      
      {isLoginModalOpen && <Login onClose={handleCloseModal} />}
      <div className="page">
        <Routes>
          <Route path="/customer" element={<Login/>} />
          <Route path="/" element={<Recommended />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/modify/:id" element={<Modify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/following" element={<Following />} />
          <Route path="/more" element={<More />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/write" element={<Write />} />
          <Route path="/customer/signup" element={<SignUp />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;