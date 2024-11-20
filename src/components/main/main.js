import React, {useState} from "react";

import BoardList from "../board/BoardList"; // boardList.js를 가져옵니다.
import logo from "../resource/logo.png"
import { Tabs, Tab, Box, Typography } from "@mui/material";


const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // 현재 선택된 탭 상태

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // 선택된 탭 업데이트
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 메뉴 아이콘 */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "12px",
          cursor: "pointer",
          fontSize: "40px",
          color: "#83e3e9",
          zIndex: 1,
        }}
        onClick={toggleSidebar}
      >
        ☰ {/* 메뉴 아이콘 (햄버거 메뉴) */} 
      </div>
      {/* 로고 */}
      
      <div style={{ position: "relative", height: "8vh", width: "100vw" }}>
  {/* 배경 이미지 */}
  <img
    src="loading_background.gif"
    alt="Background"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
    //   marginLeft:"px",
      width: "100vw",
      height: "8vh",
      objectFit: "cover",
      zIndex: -1,
    }}
  />
  
  {/* 로고 */}
  <img
    src="logo.png"
    alt="Logo"
    style={{
      height: "80px", // 로고 크기
      marginTop: "10px",
      marginLeft: "60px",
      cursor: "pointer",
      zIndex: 1, // 로고를 배경 위로
    }}
  />
</div>

        {/* 상단 탭 */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px", // 탭 최대 너비
          margin: "0 auto", // 화면 중앙 정렬
          marginTop: "0px",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth" // 탭이 전체 너비에 맞춰짐
          textColor="inherit" // 다크 모드에서 텍스트 색상 상속
          indicatorColor="primary" // 활성화된 탭 인디케이터 색상
          aria-label="메인 탭"
          sx={{
            "& .MuiTab-root": {
              color: "#ffffff", // 탭 텍스트 색상
            },
            "& .Mui-selected": {
              color: "#00dfee", // 선택된 탭 텍스트 색상
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#00dfee", // 탭 아래 활성 인디케이터 색상
            },
          }}
        >
          <Tab label="실시간 감정" />
          <Tab label="이번주 베스트" />
          <Tab label="월간 베스트" />
          <Tab label="곧 소멸될 감정" />
        </Tabs>
      </Box>
      {/* 사이드바 */}
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "250px",
            height: "100%",
            backgroundColor: "#333",
            color: "#fff",
            padding: "20px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
            zIndex: "1000",
          }}
        >
          <h2>메뉴</h2>
          <ul style={{ listStyle: "none", padding: "0" }}>
            <li style={{ margin: "10px 0" }}>홈</li>
            <li style={{ margin: "10px 0" }}>게시판</li>
            <li style={{ margin: "10px 0" }}>프로필</li>
          </ul>
          <button
            onClick={toggleSidebar}
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#555",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            닫기
          </button>
          
        </div>
      )}
        {/* 탭 내용 */}
      <div>
        {selectedTab === 0 && (
          <Typography variant="h5">홈 페이지 내용</Typography>
        )}
        {selectedTab === 1 && <BoardList showSearch={false} showWriteButton={false} />}
        {selectedTab === 2 && (
          <Typography variant="h5">공지사항 페이지 내용</Typography>
        )}
        {selectedTab === 3 && (
          <Typography variant="h5">프로필 페이지 내용</Typography>
        )}
      </div>
      {/* 메인 내용 */}
      {/* <div style={{ marginLeft: isSidebarOpen ? "260px" : "10px", padding: "20px" }}>
        
        <BoardList showSearch={false} showWriteButton={false} />
      </div> */}
    </div>
  );
};

export default Main;