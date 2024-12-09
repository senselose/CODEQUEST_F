import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "./menu/SidebarMenu";



const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();


     //사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (path) => {
    if (path.startsWith("http")) {
      // 외부 URL로 이동
      window.location.href = path;
    } else {
      // 내부 경로로 이동
      navigate(path);
    }
  };
  return (

    
    <div style={{ position: "relative", height: "8vh", width: "100vw" }}>
              <div
        style={{
          position: "absolute",
          top: "15px",
          left: "12px",
          cursor: "pointer",
          fontSize: "40px",
          color: "#83E3E9",
          zIndex: 1,
        }}
        onClick={toggleSidebar}
      > 
        <MenuIcon fontSize="large" />
      </div>
        {/* 메뉴바 컴포넌트 */}
        <SidebarMenu
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            handleMenuClick={handleMenuClick}
        />

      <img
        src="loading_background.gif"
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "8vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <img
        src="logo.png"
        alt="Logo"
        style={{
          height: "80px",
          marginTop: "8px",
          marginLeft: "50px",
          cursor: "pointer",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Header;
