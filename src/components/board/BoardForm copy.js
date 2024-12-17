import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  TextField,
  Button,
  Chip,
  Typography,
  Box,
  Autocomplete,
  Modal,
  Card,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import Header from "../header";
import SidebarMenu from "../menu/SidebarMenu";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // 다크모드 활성화
    primary: {
      main: "#90caf9", // 기본 색상
    },
    secondary: {
      main: "#f48fb1", // 보조 색상
    },
    background: {
      default: "#121212", // 배경색
      paper: "#1d1d1d", // 카드나 페이퍼 색상
    },
    text: {
      primary: "#ffffff", // 기본 텍스트 색상
      secondary: "#aaaaaa", // 보조 텍스트 색상
    },
  },
});

const BoardForm = () => {
  const [currentLocation, setCurrentLocation] = useState(""); // 현재 위치
  const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 위치
  const [tags, setTags] = useState([]); // 선택된 태그
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [nickname, setNickname] = useState("익명"); // 기본 닉네임
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [images, setImages] = useState([]); // 업로드된 이미지 파일 리스트
  const [imagePreviews, setImagePreviews] = useState([]); // 업로드된 이미지 미리 보기 리스트
  const navigate = useNavigate();

  const sampleTags = ["학교", "직장", "친구", "연애", "엔터테이먼트"]; // 예제 태그 데이터
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY; // Kakao API 키
  
  const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기
  const [userData, setUserData] = useState({
    nickName: "",
    email: "",
    bio: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
    profilePicturePath: "https://via.placeholder.com/150",
  }); // 사용자 데이터 상태


  // Kakao Maps SDK 동적 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`;
    script.async = true;
    script.onload = () => console.log("Kakao Maps SDK 로드 완료");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, []);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // 선택된 파일 배열
    const newPreviews = [];
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newImages.push(file);

        // 미리 보기와 파일 리스트 업데이트
        if (newPreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 현재 위치 가져오기
  const fetchCurrentLocation = () => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      console.error("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }

    geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!window.kakao || !window.kakao.maps) {
          console.error("Kakao Maps SDK가 로드되지 않았습니다.");
          return;
        }

        const locPosition = new window.kakao.maps.LatLng(latitude, longitude);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          locPosition.getLng(),
          locPosition.getLat(),
          (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setCurrentLocation(result[0].address.address_name);
              setSelectedLocation(result[0].address.address_name);
            } else {
              console.error("주소 변환 실패");
            }
          }
        );
      },
      (error) => {
        console.error("현위치를 가져오지 못했습니다:", error);
        setCurrentLocation("현위치를 가져오지 못했습니다.");
      }
    );
  };

  useEffect(() => {
    const checkKakaoLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        fetchCurrentLocation();
        clearInterval(checkKakaoLoaded);
      }
    }, 100);

    return () => clearInterval(checkKakaoLoaded);
  }, []);

  // 주소 검색 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 주소 검색 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 주소 검색 완료 처리
  const handleCompleteAddress = (data) => {
    const fullAddress = data.address; // 검색된 주소
    setSelectedLocation(fullAddress);
    setIsModalOpen(false); // 모달 닫기
  };

  // 태그 추가
  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // 태그 제거
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // 게시글 작성 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("location", selectedLocation || currentLocation);
    formData.append("hashtags", tags.join(","));
    formData.append("category", "기본");
    formData.append("isHidden", false);

    // 파일 추가
    images.forEach((image) => {
        formData.append("images", image); // 키 이름은 "images"
    });

    // FormData 확인
    for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
            console.log(`${pair[0]}: ${pair[1].name}`); // 파일 이름 출력
        } else {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    }

    try {
        const response = await axios.post("http://localhost:8080/api/boards", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("게시글 작성 성공:", response.data);
        navigate("/main");
    } catch (error) {
        console.error("게시글 작성 실패:", error.response?.data || error.message);
    }
};

  return (
    <ThemeProvider theme={darkTheme}>
    {/* 메뉴바 컴포넌트 */}
    <Header backgroundSrc="/loading_background.gif" logoSrc="/logo.png" />

    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#121212",
        color: "#ffffff",
      }}
    >
      {/* <Typography variant="h4" gutterBottom>
        게시글 작성
      </Typography> */}

      <TextField
        label="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ style: { color: "#ffffff" } }}
        sx={{
          "& .MuiInputBase-root": { color: "#ffffff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
        }}
      />

      <TextField
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{ style: { color: "#ffffff" } }}
        sx={{
          "& .MuiInputBase-root": { color: "#ffffff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
        }}
      />

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">주소</Typography>
        <Button
          onClick={handleOpenModal}
          variant="outlined"
          sx={{ color: "#ffffff", borderColor: "#ffffff" }}
        >
          주소 검색
        </Button>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {selectedLocation || currentLocation || "주소를 선택해주세요."}
        </Typography>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <DaumPostcode onComplete={handleCompleteAddress} />
        </Box>
      </Modal>

      <Autocomplete
        multiple
        freeSolo
        options={sampleTags}
        value={tags}
        onChange={(event, newValue) => setTags(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="태그"
            placeholder="태그를 추가하세요"
            margin="normal"
            InputLabelProps={{ style: { color: "#ffffff" } }}
            sx={{
              "& .MuiInputBase-root": { color: "#ffffff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
            }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-listbox": {
            backgroundColor: "#333333", // 드롭다운 배경색
            color: "#ffffff", // 드롭다운 텍스트 색상
          },
          "& .MuiAutocomplete-option": {
            color: "#ffffff", // 기본 옵션 텍스트 색상
            "&[aria-selected='true']": {
              backgroundColor: "#1e88e5", // 선택된 옵션 배경색
              color: "#ffffff", // 선택된 옵션 텍스트 색상
              fontWeight: "bold", // 선택된 옵션 강조
            },
            "&:hover": {
              backgroundColor: "#555555", // 옵션 호버 시 배경색
            },
          },
          "& .MuiChip-root": {
            backgroundColor: "#1e88e5", // 선택된 태그 배경색
            color: "#ffffff", // 선택된 태그 텍스트 색상
          },
        }}
      />
      {/* 이미지 업로드 */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">이미지 업로드</Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadIcon />}
          sx={{ display: "block", margin: "0 auto", marginTop: 2 }}
        >
          이미지 선택
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageUpload}
          />
        </Button>
      </Box>

      {/* 업로드된 이미지 미리 보기 - 가로 스크롤 */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          padding: 1,
          gap: 2,
        }}
      >
        {imagePreviews.map((preview, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 140,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              alt={`Uploaded ${index}`}
              height="140"
              image={preview}
            />
            <CardActions>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteImage(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>

      <TextField
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={5}
        margin="normal"
        required
        InputLabelProps={{ style: { color: "#ffffff" } }}
        sx={{
          "& .MuiInputBase-root": { color: "#ffffff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          marginTop: 3,
          backgroundColor: "#1e88e5",
        }}
        fullWidth
      >
        게시글 작성
      </Button>
    </Box>
    </ThemeProvider>
  );
};

export default BoardForm;
