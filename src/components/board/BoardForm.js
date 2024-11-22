import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Chip,
  Typography,
  Box,
  Autocomplete,
  Modal,
} from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardForm = () => {
  const [currentLocation, setCurrentLocation] = useState(""); // 현재 위치
  const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 위치
  const [tags, setTags] = useState([]); // 선택된 태그
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [nickname, setNickname] = useState("익명"); // 기본 닉네임
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const navigate = useNavigate();

  const sampleTags = ["학교", "직장", "친구", "연애", "엔터테이먼트"]; // 예제 태그 데이터
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY; // Kakao API 키

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

    // Spring Boot로 보낼 데이터 준비
    const postData = {
      nickname, // 닉네임
      title,
      content,
      location: selectedLocation || currentLocation,
      hashtags: tags.join(","),
      category: "기본", // 기본 카테고리 설정
      isHidden: false, // 숨김 여부 (기본값: false)
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/boards", // 백엔드 API 엔드포인트
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("게시글 작성 성공:", response.data);
      navigate("/Main");
      alert("게시글 작성 완료!");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성 중 문제가 발생했습니다.");
    }
  };

  return (
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
      <Typography variant="h4" gutterBottom>
        게시글 작성
      </Typography>

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
  );
};

export default BoardForm;

// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Chip,
//   Typography,
//   Box,
//   Autocomplete,
//   Modal,
// } from "@mui/material";
// import DaumPostcode from "react-daum-postcode";

// const BoardForm = () => {
//   const [currentLocation, setCurrentLocation] = useState(""); // 현재 위치
//   const [searchQuery, setSearchQuery] = useState(""); // 위치 검색어
//   const [searchResults, setSearchResults] = useState([]); // 위치 검색 결과
//   const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 위치
//   const [tags, setTags] = useState([]); // 선택된 태그
//   const [tagInput, setTagInput] = useState(""); // 태그 입력값
//   const [tagSuggestions, setTagSuggestions] = useState([]); // 태그 추천 목록
//   const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

//   const sampleTags = ["학교", "직장", "친구", "연애", "엔터테이먼트"]; // 예제 태그 데이터
//   const KAKAO_API_KEY = "ca9e486975dc421808a752e9fc438bd5"; // Kakao API 키

//   // Kakao Maps SDK 동적 로드
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`;
//     script.async = true;
//     script.onload = () => console.log("Kakao Maps SDK 로드 완료");
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
//     };
//   }, []);

//   // 현재 위치 가져오기
//   const fetchCurrentLocation = () => {
//     const geolocation = navigator.geolocation;
//     if (!geolocation) {
//       console.error("Geolocation을 지원하지 않는 브라우저입니다.");
//       return;
//     }

//     geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

//         if (!window.kakao || !window.kakao.maps) {
//           console.error("Kakao Maps SDK가 로드되지 않았습니다.");
//           return;
//         }

//         const locPosition = new window.kakao.maps.LatLng(latitude, longitude);

//         const geocoder = new window.kakao.maps.services.Geocoder();
//         geocoder.coord2Address(
//           locPosition.getLng(),
//           locPosition.getLat(),
//           (result, status) => {
//             if (status === window.kakao.maps.services.Status.OK) {
//               setCurrentLocation(result[0].address.address_name);
//               setSelectedLocation(result[0].address.address_name);
//             } else {
//               console.error("주소 변환 실패");
//             }
//           }
//         );
//       },
//       (error) => {
//         console.error("현위치를 가져오지 못했습니다:", error);
//         setCurrentLocation("현위치를 가져오지 못했습니다.");
//       }
//     );
//   };

//   useEffect(() => {
//     const checkKakaoLoaded = setInterval(() => {
//       if (window.kakao && window.kakao.maps) {
//         fetchCurrentLocation();
//         clearInterval(checkKakaoLoaded);
//       }
//     }, 100);

//     return () => clearInterval(checkKakaoLoaded);
//   }, []);

//   // 주소 검색 모달 열기
//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   // 주소 검색 모달 닫기
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   // 주소 검색 완료 처리
//   const handleCompleteAddress = (data) => {
//     const fullAddress = data.address; // 검색된 주소
//     setSelectedLocation(fullAddress);
//     setIsModalOpen(false); // 모달 닫기
//   };

//   // 태그 입력 핸들러
//   const handleTagInput = (event) => {
//     const value = event.target.value;
//     setTagInput(value);

//     if (value) {
//       const filteredTags = sampleTags.filter((tag) =>
//         tag.toLowerCase().includes(value.toLowerCase())
//       );
//       setTagSuggestions(filteredTags);
//     } else {
//       setTagSuggestions([]);
//     }
//   };

//   // 태그 추가
//   const handleAddTag = (tag) => {
//     if (!tags.includes(tag)) {
//       setTags([...tags, tag]);
//     }
//     setTagInput("");
//     setTagSuggestions([]);
//   };

//   // 태그 제거
//   const handleRemoveTag = (tag) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   // 게시글 작성 핸들러
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("게시글 작성 완료");
//     console.log("위치:", selectedLocation || currentLocation);
//     console.log("태그:", tags);
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         maxWidth: 600,
//         margin: "0 auto",
//         padding: 2,
//         boxShadow: 3,
//         borderRadius: 2,
//         backgroundColor: "#121212",
//         color: "#ffffff",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         게시글 작성
//       </Typography>

//       {/* 제목 */}
//       <TextField
//         label="제목"
//         name="title"
//         fullWidth
//         margin="normal"
//         required
//         InputLabelProps={{ style: { color: "#ffffff" } }}
//         sx={{
//           "& .MuiInputBase-root": { color: "#ffffff" },
//           "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
//         }}
//       />
// {/* 주소 검색 */}
// <Box sx={{ marginBottom: 2 }}>
//         <Typography variant="body1">주소</Typography>
//         <Button
//           onClick={handleOpenModal}
//           variant="outlined"
//           sx={{ color: "#ffffff", borderColor: "#ffffff" }}
//         >
//           주소 검색
//         </Button>
//         <Typography variant="body2" sx={{ marginTop: 1 }}>
//           {selectedLocation ? `선택된 주소: ${selectedLocation}` : "주소를 선택해주세요."}
//         </Typography>
//       </Box>

//       {/* 검색 모달 */}
//       <Modal open={isModalOpen} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <DaumPostcode onComplete={handleCompleteAddress} />
//         </Box>
//       </Modal>

//       {/* 태그 추가 */}
//       <Autocomplete
//         freeSolo
//         options={sampleTags}
//         value={tagInput}
//         onInputChange={(event, newInputValue) => {
//           setTagInput(newInputValue);
//         }}
//         onChange={(event, value) => {
//           if (value && !tags.includes(value)) {
//             setTags([...tags, value]);
//           }
//           setTagInput("");
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="태그"
//             placeholder="태그를 검색하거나 추가하세요"
//             margin="normal"
//             InputLabelProps={{ style: { color: "#ffffff" } }}
//             sx={{
//               "& .MuiInputBase-root": { color: "#ffffff" },
//               "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
//             }}
//           />
//         )}
//       />

//       {/* 선택된 태그 */}
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 2 }}>
//         {tags.map((tag) => (
//           <Chip
//             key={tag}
//             label={tag}
//             onDelete={() => handleRemoveTag(tag)}
//             sx={{ backgroundColor: "#333333", color: "#ffffff" }}
//           />
//         ))}
//       </Box>

//       {/* 내용 */}
//       <TextField
//         label="내용"
//         name="content"
//         fullWidth
//         multiline
//         rows={5}
//         margin="normal"
//         required
//         InputLabelProps={{ style: { color: "#ffffff" } }}
//         sx={{
//           "& .MuiInputBase-root": { color: "#ffffff" },
//           "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
//         }}
//       />

      
//       {/* 제출 버튼 */}
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         sx={{
//           marginTop: 3,
//           backgroundColor: "#1e88e5",
//         }}
//         fullWidth
//       >
//         게시글 작성
//       </Button>
//     </Box>
//   );
// };

// export default BoardForm;


