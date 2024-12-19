import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";


const VillainMonster = ({ open, handleClose, category }) => {
    const [villains, setVillains] = useState([]);
    const navigate = useNavigate(); // 페이지 이동을 위한 React Router 훅


    const handleVillainClick = (boardId) => {
        // boardId를 사용해 새로운 페이지로 이동
        navigate(`/board/${boardId}`);
    };

    useEffect(() => {
        if (open && category) {
            axios.get(`/api/villains?category=${category}`)
                .then(response => {
                    console.log(response.data); // 이미지 경로 확인
                    setVillains(response.data);
                })
                .catch(error => {
                    console.error("빌런 목록을 가져오는 중 오류 발생:", error);
                });
        }
    }, [open, category]);

    return (
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
            // backgroundImage: "url('/prison.png')", // 벽돌 텍스처 이미지
            backgroundColor : "#6E6E6E",
            backgroundSize: "cover", // 이미지 채우기
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: 2,
            boxShadow: 24,
            width: "80%",
            maxWidth: "900px",
            height: "70vh",
            overflowY: "auto",
            color: "#fff",
            padding: 4,
            textAlign: "center",
            position: "relative",
        }}
    >
        {/* 텍스트 */}
        <Typography
            variant="h5"
            sx={{
                marginBottom: 2,
                fontWeight: "bold",
                textTransform: "uppercase",
            }}
        >
            {category} 지옥의 명예의 전당
        </Typography>

        {/* 아이템 그리드 */}
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // 반응형 그리드 칸조정
                gap: 3,
                padding: 2,
                // backgroundColor: "black", // 어두운 반투명 배경
            }}
        >
            {villains.map((villain) => (
                <Box
                    key={villain.villainId}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 2,
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // 호버 효과
                        },
                    }}
                    onClick={() => handleVillainClick(villain.boardId)}
                >
                    {/* 철창 효과 */}
                    <img
                        src={`http://localhost:8080/uploads/${villain.filePath}`}
                        alt={villain.villainName}
                        style={{
                            width: "80px",
                            height: "80px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            // border: "2px solid #fff",
                            zIndex: 2,
                            position: "relative",
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            marginTop: 1,
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#fff",
                            textAlign: "center",
                            zIndex: 2,
                            position: "relative",
                        }}
                    >
                        {villain.villainName}
                    </Typography>
                </Box>
            ))}
        </Box>

        {/* 닫기 버튼 */}
        <Button
            variant="contained"
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
