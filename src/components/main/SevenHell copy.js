import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  createTheme,
} from "@mui/material";
import VillainMonster from './VillainMonster';
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenu from "./SidebarMenu";


// 다크모드 테마 생성
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00DFEE",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
});


const SevenHell = () => {
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);// 사이드 바
  const [selectedContent, setSelectedContent] = useState(""); // 선택된 메뉴 내용
  const navigate = useNavigate();


  // 메뉴 데이터
  const menuData = [
    { label: "나태지옥", icon: "emotionhell1.png", path : "/nateHell", content: "여기는 나태지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "15%", left: "70%" }},
    { label: "불의지옥", icon: "emotionhell4.png", path : "/nateHell", content: "여기는 불의지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "26%", left: "20%" } },
    { label: "폭력지옥", icon: "emotionhell5.png", path : "/memmeaHell", content: "여기는 폭력지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "38%", left: "80%" } },
    { label: "배신지옥", icon: "emotionhell3.png", path : "/nateHell", content: "여기는 배신지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "53%", left: "40%" } },
    { label: "천륜지옥", icon: "emotionhell2.png", path : "/nateHell", content: "여기는 천륜지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "65%", left: "80%" } },
    { label: "거짓지옥", icon: "emotionhell6.png", path : "/fakeHell", content: "여기는 거짓지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "75%", left: "20%" } },
    { label: "불지옥", icon: "emotionhell7.png", path : "/allHell", content: "여기는 불지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "82%", left: "60%" } },
  ];

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

  const handleIconClick = (content) => {
    setSelectedContent(content);
    setOpen(true);
  };

  const handleClose = () => setOpen(false); // 사이드바 토글 함수

  return (
    <ThemeProvider theme={darkTheme}>
        {/* 메뉴 아이콘 */}
     {/* 메뉴바 컴포넌트 */}
     <SidebarMenu
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleMenuClick={handleMenuClick}
      />
      {/* 상단 gif 영역 */}
      <div style={{ position: "relative", height: "8vh", width: "100vw" }}>
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
              height: "70px",
              width : "100px",
              marginTop: "11px",
              marginLeft: "50px",
              cursor: "pointer",
              zIndex: 1,
            }}
          />
      </div>

      {/* 본문 박스 */}
      {/* <Box
          sx={{
            position: "relative", // 아이템들을 위치시킬 기준을 잡기 위해
            backgroundImage: `url('hellmap8.png')`,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 투명한 배경색
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            color: "text.primary",
            height: "92vh",
            width: "100vw",
          }}
        > */}
        <Box
            sx={{
              position: "relative",
              backgroundImage: `url('hellmap8.png')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // 투명한 배경색
              backgroundBlendMode: "overlay", // 배경 이미지와 색상 혼합
              height: "92vh",
              width: "100vw",
            }}
          >
             {menuData.map((menu, index) => (
            <Box
              key={menu.label}
              onClick={() => handleIconClick(menu.content)}
              sx={{
                position: "absolute", // 지도 위의 정확한 위치를 지정
                top: menu.position.top,
                left: menu.position.left,
                transform: "translate(-50%, -50%)", // 아이템 중심 정렬
                cursor: "pointer",
                textAlign: "center",
                "&:hover img": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <img
                src={menu.icon}
                alt={menu.label}
                style={{
                  width: "120px",
                  height: "auto",
                  transition: "transform 0.2s",
                }}
              />
              <Typography variant="body2" sx={{ 
                  // bgcolor: "#2a9461", 
                  mt: 1, 
                  px: 1, 
                  padding : "4px",
                  fontWeight : "bold",
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // 투명한 배경색
                  // backgroundColor : "black",
                  borderRadius : "20px",
                  textAlign: "center",
              }}>
                {menu.label}
              </Typography>
            </Box>
          ))}
        </Box>

      {/* 분리된 모달 컴포넌트 사용 */}
      <VillainMonster open={open} handleClose={handleClose} content={selectedContent} />

    </ThemeProvider>
  );
};

export default SevenHell;
