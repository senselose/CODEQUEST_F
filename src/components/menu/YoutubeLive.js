// import React from "react";
// import Header from "../header";
// import { Box

//  } from "@mui/system";
// const YoutubeLive = () => {

//   return (
//     <Box 
//       alignItems="center"
//     >
//     <div
//       style={{
//         position: "relative",
//         width: "100vw",
//         height: "100vh",
//         overflow: "hidden",
    
//       }}
//     >
//       {/* Header 컴포넌트 */}
//       <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />
//     <iframe   
//         width="386" 
//         height="686"
//         src="https://www.youtube.com/embed/PAHAvXjdrEs" 
//         title="느낌가는대로뽑는오랑우탄이 성공? 실패? #인형뽑기" 
//         frameborder="0" 
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//         referrerpolicy="strict-origin-when-cross-origin" 
//         allowfullscreen>
//       </iframe>
//     </div>
//     </Box>
//   );
// };


// export default YoutubeLive; 

//가운데 정렬 버전
// import React from "react";
// import Header from "../header";
// import { Box } from "@mui/system";
// import { Typography } from "@mui/material";

// const YoutubeLive = () => {
//   return (
//     <Box
//       sx={{
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#121212", // 전체 배경색
//         color: "#ffffff",
//       }}
//     >
//       {/* Header 컴포넌트 */}
//       <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />

//       {/* 컨텐츠 영역 */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 2,
//           gap: 2,
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: "bold",
//             color: "#90caf9",
//             marginBottom: 2,
//             textAlign: "center",
//           }}
//         >
//           유튜브 라이브
//         </Typography>
//         {/* YouTube iframe */}
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: "800px", // 최대 너비 제한
//             aspectRatio: "16 / 9", // 16:9 비율 유지
//             overflow: "hidden",
//             borderRadius: "16px", // 둥근 모서리
//             boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)", // 그림자 효과
//           }}
//         >
//           <iframe
//             src="https://www.youtube.com/embed/PAHAvXjdrEs"
//             title="느낌가는대로뽑는오랑우탄이 성공? 실패? #인형뽑기"
//             style={{
//               width: "100%",
//               height: "100%",
//               border: "none", // 테두리 제거
//             }}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default YoutubeLive;


import React, { useState } from "react";
import Header from "../header";
import { Box, Typography, List, ListItem, TextField, Button } from "@mui/material";

const YoutubeLive = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
      }}
    >
      {/* Header */}
      <Header backgroundSrc="loading_background.gif" logoSrc="logo.png" />

      {/* Video Section */}
      <Box
        sx={{
          flex: 2,
          display: "flex", // Flexbox로 전환
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center", // 좌우 중앙 정렬
          backgroundColor: "#000",
        }}
      >
        {/* 텍스트에 애니메이션 효과 추가 */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#33333",
            animation: "fadeIn 2s ease-in-out", // 애니메이션
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            marginBottom: 2,
          }}
        >
          지옥에서 온 판사들
        </Typography>
        <iframe
          src="https://www.youtube.com/embed/A3gq-9KLcAg"
          title="Playlist | K 크리스마스, 피아노"
          style={{
            width: "80%",
            maxWidth: "800px",
            aspectRatio: "16 / 9",
            border: "none",
            borderRadius: "12px",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Box>

      {/* Chat Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "#1E1E1E",
          borderTop: "1px solid #333",
        }}
      >
        {/* Chat List */}
        <List
          sx={{
            flex: 1,
            overflowY: "auto",
            marginBottom: 2,
            padding: 0,
          }}
        >
          {comments.map((comment, index) => (
            <ListItem
              key={index}
              sx={{ padding: "8px 0", borderBottom: "1px solid #333" }}
            >
              <Typography variant="body2" sx={{ color: "#ffffff" }}>
                {comment}
              </Typography>
            </ListItem>
          ))}
        </List>

        {/* Chat Input */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#333",
                color: "#ffffff",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            sx={{
              backgroundColor: "#1e88e5",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            등록
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default YoutubeLive;


{/* <iframe width="1006" height="566" src="https://www.youtube.com/embed/A3gq-9KLcAg" title="Playlist | K 크리스마스, 피아노" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
https://youtu.be/A3gq-9KLcAg */}