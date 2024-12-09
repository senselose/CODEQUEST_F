import React, { useState, useEffect } from "react";
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
import Header from "../header";

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
  const [selectedContent, setSelectedContent] = useState(""); // 선택된 메뉴 내용
  const [selectedCategory, setSelectedCategory] = useState("sloth"); // 기본 카테고리 설정



  // 메뉴 데이터
  const menuData = [
    { label: "나태지옥", icon: "emotionhell1.png", path : "/nateHell", content: "여기는 나태지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "15%", left: "70%" }},
    { label: "불의지옥", icon: "emotionhell4.png", path : "/nateHell", content: "여기는 불의지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "20%", left: "20%" } },
    { label: "폭력지옥", icon: "emotionhell5.png", path : "/memmeaHell", content: "여기는 폭력지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "38%", left: "80%" } },
    { label: "배신지옥", icon: "emotionhell3.png", path : "/nateHell", content: "여기는 배신지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "46%", left: "40%" } },
    { label: "천륜지옥", icon: "emotionhell2.png", path : "/nateHell", content: "여기는 천륜지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "66%", left: "80%" } },
    { label: "거짓지옥", icon: "emotionhell6.png", path : "/fakeHell", content: "여기는 거짓지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "68%", left: "20%" } },
    { label: "불지옥", icon: "emotionhell7.png", path : "/allHell", content: "여기는 불지옥에 가둬둔 빌런 놈들 입니다.", position: { top: "82%", left: "50%" } },
  ];



  const handleIconClick = (content, category) => {
    setSelectedContent(content);
    setSelectedCategory(category); // 선택된 카테고리를 설정
    setOpen(true);
  };
  const handleClose = () => setOpen(false); // 사이드바 토글 함수

  return (
    <ThemeProvider theme={darkTheme}>
        {/* 메뉴 아이콘 */}
     {/* 메뉴바 컴포넌트 */}
      <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />

      {/* 본문 박스 */}
        <Box
            sx={{
              position: "relative",
              backgroundImage: `url('hellmap12.gif')`,
              // backgroundImage: `url('hellBackground.gif')`,
              backgroundSize: "cover", //contain, cover
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
                  width: "100px",
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