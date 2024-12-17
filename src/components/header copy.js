import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "./menu/SidebarMenu";
import CreateIcon from "@mui/icons-material/Create"; // 아이콘 변경


const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // 현재 경로 가져오기


     //사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const MenuClick = (path) => {
    if (path.startsWith("http")) {
      // 외부 URL로 이동
      window.location.href = path;
    } else {
      // 내부 경로로 이동
      navigate(path);
    }
  };

    // CreateIcon 클릭 시 동작
    const CreateIconClick = () => {
      console.log("CreateIcon ready!");

      navigate("/create"); // "/create" 경로로 이동
      console.log("CreateIcon clicked!");
    };

  // 공통 스타일 정의
    const commonIconStyle = {
      position: "absolute",
      cursor: "pointer",
      display: "flex", // Flexbox 활성화
      alignItems: "center", // 수직 정렬
      justifyContent: "center", // 가로 정렬
      fontSize: "20px",
      color: "#83E3E9",
      zIndex: 1,
    };


  return (

    <div style={{ position: "relative", height: "8vh", width: "100vw" }}>

        {/* 메뉴바 컴포넌트 */}
        <SidebarMenu
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            MenuClick={MenuClick}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex", // Flexbox 활성화
              alignItems: "center", // 수직 정렬
              justifyContent: "center", // 가로 정렬
              cursor: "pointer",
              zIndex: 1,
            }}
        />

      <img
        src="/loading_background.gif"
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
        src="/logo.png"
        alt="Logo"
        style={{
          height: "80px",
          marginTop: "8px",
          marginLeft: "50px",
          cursor: "pointer",
          zIndex: 1,
        }}
      />
       {/* 현재 경로가 '/main'일 때만 CreateIcon 표시 */}
       {location.pathname === "/main" && (
        <div
          style={{
            position: "absolute",
            top: "25px",
            right: "20px", // 오른쪽 정렬
            display: "flex", // Flexbox 활성화
            alignItems: "center", // 수직 정렬
            justifyContent: "center", // 가로 정렬
            // height: "100px", // 컨테이너 높이
            cursor: "pointer",
            zIndex: 1,
            color : "#83E3E9",
          }}
          onClick={CreateIconClick}// 클릭시 페이지 이동
        >
          <CreateIcon fontSize="medium" />

        </div>
      )}
    </div>
  );
};

export default Header;
