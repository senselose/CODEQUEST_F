import React from 'react';
import { Box, Typography, ThemeProvider, Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // React Router 사용

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

const HellPages1 = () => {
  const navigate = useNavigate(); // React Router의 네비게이트 훅 사용
  const handleIconClick = (index) => {
    // 클릭 시 페이지 이동 처리
    console.log(`Icon ${index + 1} clicked!`);
    navigate(`/iconPage${index + 1}`); // 특정 페이지로 이동
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
            height: "80px",
            marginTop: "8px",
            marginLeft: "50px",
            cursor: "pointer",
            zIndex: 1,
          }}
        />
      </div>

      {/* 본문 박스 */}
      <Box
        sx={{
          backgroundColor: "background.default",
          backgroundImage: `url('hellmap2.png')`,
          color: "text.primary",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          나태지옥
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid
              item
              xs={6}
              key={`item-${index}`}
              onClick={() => handleIconClick(index)} // 내부 함수 호출
              sx={{
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <img
                src={`emotionhell${index + 1}.png`} // 각 아이콘 이미지 경로
                alt={`emotionhell${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "auto",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")} // hover 효과
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Icon {index + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default HellPages1;
