// import React, { useState } from "react";
// import { Box, Typography, ThemeProvider, createTheme } from "@mui/material";
// import VillainMonster from './VillainMonster';
// import BackButton from "../menu/BackButton";
// // 다크모드 테마 생성
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#00DFEE",
//     },
//     background: {
//       default: "#121212",
//       paper: "#1E1E1E",
//     },
//     text: {
//       primary: "#FFFFFF",
//       secondary: "#AAAAAA",
//     },
//   },
// });

// const SevenHell = () => {
//   const [open, setOpen] = useState(false); // 모달 열림 상태
//   const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리

//   const fetchBoardData = async (boardId) => {
//     try {
//         const response = await fetch(`http://localhost:8080/api/boards/${boardId}`);
//         if (!response.ok) throw new Error("Failed to fetch board data");
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

//   // 메뉴 데이터
//   const menuData = [
//     { label: "나태지옥", icon: "emotionhell1.png", category: "sloth", position: { top: "15%", left: "70%" }},
//     { label: "불의지옥", icon: "emotionhell4.png", category: "fiery", position: { top: "20%", left: "20%" } },
//     { label: "폭력지옥", icon: "emotionhell5.png", category: "violence", position: { top: "38%", left: "80%" } },
//     { label: "배신지옥", icon: "emotionhell3.png", category: "betrayal", position: { top: "46%", left: "40%" } },
//     { label: "천륜지옥", icon: "emotionhell2.png", category: "fam", position: { top: "66%", left: "80%" } },
//     { label: "거짓지옥", icon: "emotionhell6.png", category: "liar", position: { top: "68%", left: "20%" } },
//     { label: "사랑지옥", icon: "emotionhell7.png", category: "love", position: { top: "82%", left: "50%" } },
//   ];

//   const handleIconClick = (category) => {
//     setSelectedCategory(category);
//     setOpen(true);
// };

//   const handleClose = () => setOpen(false);

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Box
//         sx={{
//           position: "relative",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           backgroundColor: "rgba(0, 0, 0, 0)",
//           backgroundBlendMode: "overlay",
//           height: "100vh",
//           width: "100vw",
//         }}
//         >
//         <BackButton/>
//         {menuData.map((menu) => (
//           <Box
//           key={menu.label}
//             onClick={() => handleIconClick(menu.category)}
//             sx={{
//               position: "absolute",
//               top: menu.position.top,
//               left: menu.position.left,
//               transform: "translate(-50%, -50%)",
//               cursor: "pointer",
//               textAlign: "center",
//               "&:hover img": {
//                 transform: "scale(1.2)",
//               },
//             }}
//           >
//             <img
//               src={menu.icon}
//               alt={menu.label}
//               style={{
//                 width: "100px",
//                 height: "auto",
//                 transition: "transform 0.2s",
//               }}
//             />
//             <Typography
//               variant="body2"
//               sx={{
//                 mt: 1,
//                 px: 1,
//                 padding: "4px",
//                 fontWeight: "bold",
//                 color: "white",
//                 backgroundColor: "rgba(0, 0, 0, 0.6)",
//                 borderRadius: "20px",
//                 textAlign: "center",
//               }}
//             >
//               {menu.label}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* VillainMonster 컴포넌트에 선택된 카테고리 전달 */}
//       <VillainMonster open={open} handleClose={handleClose} category={selectedCategory} />
//     </ThemeProvider>
//   );
// };

// export default SevenHell;


import React, { useState } from "react";
import { Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import VillainMonster from "./VillainMonster";
import BackButton from "../menu/BackButton";
import Tooltip from '@mui/material/Tooltip';
import { Container, height, margin, padding } from "@mui/system";

// 다크모드 테마 생성
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00DFEE" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#FFFFFF", secondary: "#AAAAAA" },
  },
});

const SevenHell = () => {
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리

  // 메뉴 데이터
  const menuData = [
    { label: "나태지옥", icon: "emotionhell1.png", category: "sloth", position: { top: "15%", left: "70%" } },
    { label: "불의지옥", icon: "emotionhell4.png", category: "fiery", position: { top: "25%", left: "20%" } },
    { label: "폭력지옥", icon: "emotionhell5.png", category: "violence", position: { top: "38%", left: "80%" } },
    { label: "배신지옥", icon: "emotionhell3.png", category: "betrayal", position: { top: "46%", left: "40%" } },
    { label: "천륜지옥", icon: "emotionhell2.png", category: "fam", position: { top: "66%", left: "80%" } },
    { label: "거짓지옥", icon: "emotionhell6.png", category: "liar", position: { top: "68%", left: "20%" } },
    { label: "사랑지옥", icon: "emotionhell7.png", category: "love", position: { top: "82%", left: "50%" } },
  ];

  const handleIconClick = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory("");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          position: "relative", // 부모 요소에 position 설정
          backgroundImage: `url(hellmap3.png)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.1)", 
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          transition: "background-color 0.5s ease-in-out",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Container
          sx={{
            position: "relative", // 부모 요소 기준점을 설정
            padding : "5%"
          }}>
          <BackButton
            sx={{
              position: "absolute", // BackButton을 절대 위치로
              top: "50px",          // 위쪽에서 30px
              left: "50px",         // 왼쪽에서 30px  
              // zIndex: 1000,         // 다른 요소 위로 올리기
              // padding : "100px",
              height : "100px",
            }}
          />
        </Container>
        {menuData.map((menu) => (
          <Box
            key={menu.label}
            onClick={() => handleIconClick(menu.category)}
            sx={{
              position: "absolute",
              top: menu.position.top,
              left: menu.position.left,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            
        {/* 네임태그 - 말풍선 스타일 */}
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "-50px", // 아이콘 위로 말풍선 배치
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 1)",
            padding: "8px 12px",
            borderRadius: "20px",
            zIndex: 1,
            whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
            animation: "float 3s ease-in-out infinite",//애니메이션 추가
            "&::after": {
              content: '""', // 말풍선 꼬리
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "8px 8px 0 8px", // 위쪽 삼각형
              borderColor: "rgba(0, 0, 0, 0.8) transparent transparent transparent",
            },
            "@keyframes float": {
              "0%" : {transform : "translateX(-50%) translateY(0px)"},
              "50%" : {transform : "translateX(-50%) translateY(-5px)"},
              "100%" : {transform : "translateX(-50%) translateY(0px)"},
            },
          }}
        >
          {menu.label}
        </Typography>

        {/* 아이콘 */}
        <img
          src={menu.icon}
          alt={menu.label}
          style={{
            width: "100px",
            height: "auto",
            transition: "transform 0.2s",
          }}
        />
      </Box>
      ))}

      </Box>

      {/* VillainMonster 모달 */}
      <VillainMonster open={open} handleClose={handleClose} category={selectedCategory} />
    </ThemeProvider>
  );
};

export default SevenHell;


//     {menuData.map((menu) => (
//   <Box
//   key={menu.label}
//   onClick={() => handleIconClick(menu.category)}
//   sx={{
//     position: "absolute",
//     top: menu.position.top,
//     left: menu.position.left,
//     transform: "translate(-50%, -50%)",
//     cursor: "pointer",
//     textAlign: "center",
//     "&:hover img": {
//       transform: "scale(1.2)",
//     },
//   }}
// >
//   {/* 마커 */}
//   <Box
//     sx={{
//       position: "absolute",
//       top: 0,
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "20px",
//       height: "20px",
//       backgroundColor: "red",
//       borderRadius: "50%",
//       border: "2px solid white",
//       zIndex: 1,
//     }}
//   />

//   {/* 아이콘 */}
//   <img
//     src={menu.icon}
//     alt={menu.label}
//     style={{
//       width: "100px",
//       height: "auto",
//       transition: "transform 0.2s",
//     }}
//   />
//   <Typography
//     variant="body2"
//     sx={{
//       mt: 1,
//       px: 1,
//       padding: "4px",
//       fontWeight: "bold",
//       color: "white",
//       backgroundColor: "rgba(0, 0, 0, 0.6)",
//       borderRadius: "20px",
//     }}
//   >
//     {menu.label}
//   </Typography>
// </Box>
// ))}
