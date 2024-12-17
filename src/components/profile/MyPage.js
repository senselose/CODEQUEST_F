import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ThemeProvider,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  createTheme,
} from "@mui/material";
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
  const [userData, setUserData] = useState({
    nickName: "",
    email: "",
    bio: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
    profilePicturePath: "https://via.placeholder.com/150",
  }); // 사용자 데이터 상태


  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기

  // 백엔드에서 사용자 데이터 가져오기
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/auth/${userId}`);
        if (!response.ok) {
          throw new Error("사용자 정보를 가져올 수 없습니다.");
        }
        const data = await response.json();
        setUserData({
          nickName: data.nickName || "닉네임 없음",
          email: data.mail || "이메일 없음",
          bio: data.bio || "자기소개가 없습니다.",
          profilePicturePath: data.profilePicturePath || "https://via.placeholder.com/150",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // 파일 업로드 핸들러
  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      fetch(`http://localhost:8080/api/auth/${userId}/uploadProfilePicture`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("이미지 업로드 실패");
          }
          return response.json();
        })
        .then((data) => {
          console.log("업로드된 이미지 경로:", data.profilePicturePath);
          setUserData((prevState) => ({
            ...prevState,
            profilePicturePath: `http://localhost:8080${data.profilePicturePath}`,
          }));
        })
        .catch((error) => {
          console.error("Error uploading profile picture:", error);
        });
    }
  };
  

  const handleEditProfile = () => {
    alert("프로필 수정 페이지로 이동합니다!");
  };

  const handleLogout = () => {
    alert("로그아웃되었습니다!");
    // 로그아웃 처리 로직
  };

  if (!userId) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Header backgroundSrc="/loading_background.gif" logoSrc="/logo.png" />
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >
        {/* 파일 업로드 input */}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />

        {/* 프로필 아바타 */}
        <Avatar
          src={userData.profilePicturePath}
          alt={userData.nickName}
          sx={{ width: 150, height: 150, mb: 2, cursor: "pointer" }}
          onClick={handleAvatarClick}
        />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {userData.nickName}
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
          {userData.email}
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
          {userData.bio}
        </Typography>

        {/* 버튼 */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEditProfile}>
              프로필 수정
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default MyPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ThemeProvider,
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Grid,
//   createTheme,
// } from "@mui/material";

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

// const MyPage = () => {
//   const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
//   const navigate = useNavigate();

//   const user = {
//     name: "홍길동",
//     email: "hong@example.com",
//     bio: "안녕하세요! 저는 홍길동입니다.",
//   };

//   // 파일 업로드 핸들러
//   const handleAvatarClick = () => {
//     document.getElementById("avatar-upload").click();
//   };

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatar(reader.result); // 이미지 URL로 미리보기 업데이트
//         // TODO: 이미지 업로드 로직 (백엔드로 업로드)
//         console.log("업로드된 이미지:", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditProfile = () => {
//     alert("프로필 수정 페이지로 이동합니다!");
//   };

//   const handleLogout = () => {
//     alert("로그아웃되었습니다!");
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Box
//         sx={{
//           marginTop: "50px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 3,
//         }}
//       >
//         {/* 파일 업로드 input */}
//         <input
//           id="avatar-upload"
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={handleAvatarChange}
//         />

//         {/* 프로필 아바타 */}
//         <Avatar
//           src={avatar}
//           alt={user.name}
//           sx={{ width: 150, height: 150, mb: 2, cursor: "pointer" }}
//           onClick={handleAvatarClick}
//         />
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           {user.name}
//         </Typography>
//         <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
//           {user.email}
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
//           {user.bio}
//         </Typography>

//         {/* 버튼 */}
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item>
//             <Button variant="contained" color="primary" onClick={handleEditProfile}>
//               프로필 수정
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="outlined" color="error" onClick={handleLogout}>
//               로그아웃
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default MyPage;
