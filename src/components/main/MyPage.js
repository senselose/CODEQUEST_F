import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Box, Avatar, Typography, Button, Grid, createTheme } from "@mui/material";
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



const MyPage = () => {
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);// 사이드 바
  const [selectedContent, setSelectedContent] = useState(""); // 선택된 메뉴 내용
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
  
    const handleIconClick = (content) => {
      setSelectedContent(content);
      setOpen(true);
    };
  
    const handleClose = () => setOpen(false); // 사이드바 토글 함수

    

  const user = {
    name: "홍길동",
    email: "hong@example.com",
    avatar: "https://via.placeholder.com/150", // 프로필 이미지 URL
    bio: "안녕하세요! 저는 홍길동입니다.",
  };

  const handleEditProfile = () => {
    alert("프로필 수정 페이지로 이동합니다!");
  };

  const handleLogout = () => {
    alert("로그아웃되었습니다!");
    // 로그아웃 처리 로직 추가
  };

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
    <Box
      sx={{
        marginTop : "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      {/* 프로필 정보 */}
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{ width: 150, height: 150, mb: 2 }}
      />
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {user.name}
      </Typography>
      <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
        {user.email}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
        {user.bio}
      </Typography>

      {/* 버튼 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
          >
            프로필 수정
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
      );
};

export default MyPage;
