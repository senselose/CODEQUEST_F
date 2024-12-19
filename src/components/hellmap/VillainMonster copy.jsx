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
                // backgroundColor : "#FFFFFF",
                // height : "600px",
            }}
        >
            <Box
                sx={{
                    backgroundColor : "grey",
                    borderRadius: 2,
                    boxShadow: 24,
                    width: "80%", // 모달창의 크기 
                    maxWidth: "700px", 
                    height : "60vh", // 모달창 높이 고정
                    overflowY : "auto", // 내용이 높이를 초과하면 스크롤
                    color: "#333333",
                    padding: 4,
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {category} 지옥의 명예의 전당
                </Typography>

                <Box
                    sx={{
                        display:"grid",
                        gridTemplateColumns :  "repeat(3, 1fr)",
                        border : "1px, black",
                        gap : 2,
                        marginTop : 10,
                        // padding : 1,
                        
                    }}>
                    {villains.map((villain) => (
                    <Box
                        key= {villain.villainId}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            cursor: "pointer",
                            transition: "transform 0.3s",
                    
                            "&:hover": {
                                transform: "scale(1.1)",
                                border: "2px solid #00DFEE",
                                borderRadius: "12px",
                            },
                        }}
                        onClick={() => handleVillainClick(villain.boardId)} // 클릭 시 페이지 이동
                    >
                        <img
                        // src={`${villain.filePath}`}
                        // src={`http://localhost:3000/${villain.filePath}`}
                        // src={`http://localhost:8080/api/villains/images?path=${villain.filePath}`} alt={villain.villainName}
                        src={`http://localhost:8080/uploads/${villain.filePath}`}
                        alt={villain.villainName}
                        style={{
                            width: "100px",
                            height: "100px",
                            marginBottom: "8px",
                            borderRadius : "10px",
                        }}
                        />
                        <Typography variant="body2">{villain.villainName}</Typography>
                    </Box>
                ))}
                </Box>
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
