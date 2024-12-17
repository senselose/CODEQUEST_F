import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';



const BackButton = () => {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);// 뒤로가기
    }
    return (
        <IconButton
        onClick={handleBackClick}
        aria-label="뒤로가기"
        sx={{
            width: "40px",
            height: "40px",
            margin: "5px",
            padding: "10px",
            backgroundColor: "black", // 배경색
            color: "white", // 아이콘 색상
            borderRadius: "50%", // 동그란 모양
            "&:hover": {
            backgroundColor: "#333", // 호버 시 배경색 변경
            },
        }}
        >
        <ArrowBackIcon />
    </IconButton>
    );
};

export default BackButton;
