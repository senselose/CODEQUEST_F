// import React, { useState, useEffect } from "react";
// import { Modal, Box, Typography, Grid, Button } from "@mui/material";
// import axios from "axios";

// const VillainMonster = ({ open, handleClose, content, boardId }) => {
//   const [inventoryItems, setInventoryItems] = useState([]);

//   useEffect(() => {
//     if (boardId) {
//       // 서버에서 보드 ID로 관련 데이터를 가져옵니다.
//       axios
//         .get(`/api/inventory?boardId=${boardId}`)
//         .then((response) => {
//           setInventoryItems(response.data); // 서버에서 가져온 데이터를 상태로 저장
//         })
//         .catch((error) => {
//           console.error("Failed to fetch inventory items:", error);
//         });
//     }
//   }, [boardId]);

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: "#2E2E2E",
//           color: "#FFFFFF",
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 24,
//           width: "300px",
//           height: "400px",
//           textAlign: "center",
//           border: "2px solid #00DFEE",
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           {content}
//         </Typography>
//         <Grid container spacing={2} sx={{ marginTop: 2 }}>
//           {inventoryItems.map((item) => (
//             <Grid
//               item
//               xs={4}
//               key={item.id}
//               sx={{
//                 border: "1px solid #555",
//                 borderRadius: 1,
//                 padding: 1,
//                 backgroundColor: "#1E1E1E",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 transition: "transform 0.2s",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                   border: "1px solid #00DFEE",
//                 },
//               }}
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 style={{
//                   width: "50px",
//                   height: "50px",
//                   marginBottom: "8px",
//                 }}
//               />
//               <Typography variant="body2">{item.name}</Typography>
//             </Grid>
//           ))}
//         </Grid>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleClose}
//           sx={{
//             marginTop: 3,
//             backgroundColor: "#00DFEE",
//             color: "#121212",
//             "&:hover": {
//               backgroundColor: "#00AACC",
//             },
//           }}
//         >
//           닫기
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default VillainMonster;


import React from 'react';
import { Modal, Box, Typography, Grid, Button } from '@mui/material';

const VillainMonster = ({ open, handleClose, content }) => {
  // 인벤토리 아이템 데이터 (예시)
  const inventoryItems = [
    { id: 1, name: "Sword", image: "monster1.gif" },
    { id: 2, name: "Shield", image: "monster2.gif" },
    { id: 3, name: "Potion", image: "monster3.gif" },
    { id: 4, name: "Helmet", image: "monster4.gif" },
  ];

  return (
    // 모달창
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#2E2E2E",
          color: "#FFFFFF",
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "300px",
          height : "400px",
          textAlign: "center",
          border: "2px solid #00DFEE",
        }}
      >
        <Typography variant="h6" gutterBottom>
          감옥!
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {inventoryItems.map((item) => (
            <Grid
              item
              xs={4} // 3열 그리드
              key={item.id}
              sx={{
                border: "1px solid #555",
                borderRadius: 1,
                padding: 1,
                backgroundColor: "#1E1E1E",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.1)",
                  border: "1px solid #00DFEE",
                },
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginBottom: "8px",
                }}
              />
              <Typography variant="body2">{item.name}</Typography>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body1"
          sx={{
            marginTop: 3,
            padding: 2,
            backgroundColor: "#121212",
            borderRadius: 1,
            border: "1px solid #555",
          }}
        >
          {content}
        </Typography>

          {/* 닫기 버튼 (하단) */}
          <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{
            marginTop: 3,
            backgroundColor: "#00DFEE",
            color: "#121212",
            "&:hover": {
              backgroundColor: "#00AACC",
            },
          }}
        >
          닫기
        </Button>
      </Box>
    </Modal>
  );
};

export default VillainMonster;
