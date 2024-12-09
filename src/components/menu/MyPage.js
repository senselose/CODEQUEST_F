import React, { useState, useEffect } from "react";
import { ThemeProvider, Box, Avatar, Typography, Button, Grid, createTheme } from "@mui/material";
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



const MyPage = () => {
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [selectedContent, setSelectedContent] = useState(""); // 선택된 메뉴 내용

  

  

    

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
        {/* 메뉴바 컴포넌트 */}
        <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />
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
