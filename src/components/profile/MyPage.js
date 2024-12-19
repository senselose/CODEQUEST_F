import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ThemeProvider,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
  DialogActions,
} from "@mui/material";
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close'; // X 아이콘 가져오기
import CheckIcon from '@mui/icons-material/Check'; // 확인 아이콘 가져오기
import { borderBottom, display, padding } from "@mui/system";
import EditNoteIcon from '@mui/icons-material/EditNote'; // 게시글 확인 (내가 쓴 글)
import ChatIcon from '@mui/icons-material/Chat'; // 게시글 확인 (내가 쓴 댓글)
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // > 아이콘

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
//   const [userData, setUserData] = useState({
//     nickName: "",
//     email: "",
//     bio: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
//     profilePicturePath: "https://via.placeholder.com/150",
//   }); // 사용자 데이터 상태
//   const [loading, setLoading] = useState(true); // 로딩 상태 관리
//   const navigate = useNavigate();
//   const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기

//   // 백엔드에서 사용자 데이터 가져오기
//   useEffect(() => {
//     if (!userId) return;

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/auth/${userId}`);
//         if (!response.ok) {
//           throw new Error("사용자 정보를 가져올 수 없습니다.");
//         }
//         const data = await response.json();
//         setUserData({
//           nickName: data.nickName || "닉네임 없음",
//           email: data.mail || "이메일 없음",
//           bio: data.bio || "자기소개가 없습니다.",
//           profilePicturePath: data.profilePicturePath || "https://via.placeholder.com/150",
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   // 파일 업로드 핸들러
//   const handleAvatarClick = () => {
//     document.getElementById("avatar-upload").click();
//   };

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
  
//       fetch(`http://localhost:8080/api/auth/${userId}/uploadProfilePicture`, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("이미지 업로드 실패");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("업로드된 이미지 경로:", data.profilePicturePath);
//           setUserData((prevState) => ({
//             ...prevState,
//             profilePicturePath: `http://localhost:8080${data.profilePicturePath}`,
//           }));
//         })
//         .catch((error) => {
//           console.error("Error uploading profile picture:", error);
//         });
//     }
//   };
  

//   const handleEditProfile = () => {
//     alert("프로필 수정 페이지로 이동합니다!");
//   };

//   const handleLogout = () => {
//     alert("로그아웃되었습니다!");
//     // 로그아웃 처리 로직
//   };

//   if (!userId) {
//     return <div>로그인이 필요합니다.</div>;
//   }

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

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
//           src={userData.profilePicturePath}
//           alt={userData.nickName}
//           sx={{ width: 150, height: 150, mb: 2, cursor: "pointer" }}
//           onClick={handleAvatarClick}
//         />
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           {userData.nickName}
//         </Typography>
//         <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
//           {userData.email}
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
//           {userData.bio}
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

// 지은 1차 수정버전 (토큰x, 수정 페이지 작동)
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
//   const [userData, setUserData] = useState({
//     nickName: "",
//     email: "",
//     bio: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
//     profilePicturePath: "https://via.placeholder.com/150",
//   }); // 사용자 데이터 상태
//   const [loading, setLoading] = useState(true); // 로딩 상태 관리
//   const [passwordDialogOpen, setPasswordDialogOpen] = useState(false); // 비밀번호 확인 모달 상ㅌ
//   const [editDialogOpen, setEditDialogOpen] = useState(false); // 수정 모달 상태
//   const [editData, setEditData] = useState({}); // 수정 데이터
//   const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
//   const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태
//   const navigate = useNavigate();
//   const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기

//   // 백엔드에서 사용자 데이터 가져오기
//   useEffect(() => {
//     if (!userId) return;

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/auth/${userId}`);
//         if (!response.ok) {
//           throw new Error("사용자 정보를 가져올 수 없습니다.");
//         }
//         const data = await response.json();
//         console.log("가져온 데이터:", data);
//         setUserData({
//           nickName: data.nickName || "닉네임 없음",
//           email: data.mail || "이메일 없음",
//           info: data.info || "자기소개가 없습니다.",
//           profilePicturePath: data.profilePicturePath || "https://via.placeholder.com/150",
//           phone: data.phone || "",
//           marketing: data.marketing === 1,
//           password: "",
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   // 비밀번호 확인 모달 열기
//   const handleEditProfileClick = () => {
//     setPasswordDialogOpen(true);
//   };

//   // 비밀번호 확인
//   const handlePasswordCheck = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/auth/${userId}/check-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password: inputPassword }),
//       });

//       if(!response.ok) {
//         throw new Error("비밀번호를 다시 확인해주세요");
//       }

//       const result = await response.json();
//       if(result.success) {
//         setPasswordDialogOpen(false);
//         setEditData(userData);
//         setEditDialogOpen(true);
//       } else {
//         setPasswordError(true); // 비밀번호 오류 상태 설정
//       }
//     } catch (error) {
//         console.error("Error checking password:", error.message);
//         setPasswordError(true);
//     }
//   };

//   // 수정 모달 닫기
//   const handleEditClose = () => {
//     setEditDialogOpen(false);
//   };

//   // 입력값 변경 핸들러
//   const handleInputChange = (e) => {
//     const {name, value, type, checked } = e.target;
//     setEditData({
//       ...editData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // 비밀번호 확인 모달 닫기
//   const handlePasswordDialogClose = () => {
//     setPasswordDialogOpen(false);
//     setInputPassword("");
//     setPasswordError(false);
//   }

//   // 프로필 수정 저장
//   const handleSaveChanges = async () => {
//     try {
//       const payload = {
//         ...editData,
//         marketing: editData.marketing ? 1 : 0,
//       };
  
//       // 비밀번호가 입력되지 않았다면 payload에서 제외
//       if (!editData.password) {
//         delete payload.password;
//       }
  
//       const response = await fetch(`http://localhost:8080/api/auth/${userId}/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
  
//       if (!response.ok) {
//         throw new Error("사용자 정보를 업데이트할 수 없습니다.");
//       }
  
//       const updatedData = await response.json();
//       setUserData(updatedData);
//       setEditDialogOpen(false);
//     } catch (error) {
//       console.error("Error updating user data:", error.message);
//     }
//   };

//   // 파일 업로드 핸들러
//   const handleAvatarClick = () => {
//     document.getElementById("avatar-upload").click();
//   };

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
  
//       fetch(`http://localhost:8080/api/auth/${userId}/uploadProfilePicture`, {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("이미지 업로드 실패");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("업로드된 이미지 경로:", data.profilePicturePath);
//           setUserData((prevState) => ({
//             ...prevState,
//             profilePicturePath: `http://localhost:8080${data.profilePicturePath}`,
//           }));
//         })
//         .catch((error) => {
//           console.error("Error uploading profile picture:", error);
//         });
//     }
//   };

//   const handleLogout = () => {
//     alert("로그아웃되었습니다!");
//     // 로그아웃 처리 로직
//   };

//   if (!userId) {
//     return <div>로그인이 필요합니다.</div>;
//   }

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

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
//           src={userData.profilePicturePath}
//           alt={userData.nickName}
//           sx={{ width: 150, height: 150, mb: 2, cursor: "pointer" }}
//           onClick={handleAvatarClick}
//         />
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           {userData.nickName}
//         </Typography>
//         <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
//           {userData.email}
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
//           {userData.info}
//         </Typography>

//         {/* 버튼 */}
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item>
//             <Button variant="contained" color="primary" onClick={handleEditProfileClick}>
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

//       {/* 비밀번화 확인 모달 */}
//       <Dialog open={passwordDialogOpen} onClose={handlePasswordDialogClose}>
//         <DialogTitle>비밀번호 확인</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="현재 비밀번호"
//             type="password"
//             value={inputPassword}
//             onChange={(e) => setInputPassword(e.target.value)}
//             fullWidth
//             margin="normal"
//             error={passwordError}
//             helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handlePasswordDialogClose} color="secondary">
//             취소
//           </Button>
//           <Button onClick={handlePasswordCheck} color="primary">
//             확인
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* 수정 모달 */}
//       <Dialog open={editDialogOpen} onClose={handleEditClose}>
//         <DialogTitle>프로필 수정</DialogTitle>
//         <DialogContent>
//           {/* 수정 필드들 */}
//           <TextField
//             label="닉네임"
//             name="nickName"
//             value={editData.nickName || ""}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="자기소개"
//             name="info"
//             value={editData.info || ""}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="핸드폰 번호"
//             name="phone"
//             value={editData.phone || ""}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="비밀번호"
//             name="password"
//             type="password"
//             value={editData.password || ""}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 name="marketing"
//                 checked={editData.marketing || false}
//                 onChange={handleInputChange}
//               />
//             }
//             label="마케팅 수신 동의"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose} color="secondary">
//             취소
//           </Button>
//           <Button onClick={handleSaveChanges} color="primary">
//             저장
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// };

// export default MyPage;

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
    info: "안녕하세요! 사용자 정보를 불러오는 중입니다.",
    profilePicturePath: "https://via.placeholder.com/150",
  }); // 사용자 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false); // 비밀번호 확인 모달 상ㅌ
  const [editDialogOpen, setEditDialogOpen] = useState(false); // 수정 모달 상태
  const [editData, setEditData] = useState({}); // 수정 데이터
  const [isEditingInfo, setIsEditingInfo] = useState(false); // 수정 모드 여부 (자기소개)
  const [editedInfo, setEditedInfo] = useState(userData.info); // 수정된 자기소개 내용
  const [inputPassword, setInputPassword] = useState(""); // 입력된 비밀번호
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.userId || null); // Redux에서 userId 가져오기
  const dispatch = useDispatch(); // Redux의 dispatch 함수 가져오기 

  // 백엔드에서 사용자 데이터 가져오기
  // useEffect(() => {
  //   if (!userId) return;

  //   const fetchUserData = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
  //       if (!token) {
  //         throw new Error("토큰이 없습니다. 다시 로그인해주세요.");
  //       }
  
  //       const response = await fetch(`http://localhost:8080/api/auth/${userId}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더로 전달
  //         },
  //       });
  
  //       if (!response.ok) {
  //         throw new Error("사용자 정보를 가져올 수 없습니다.");
  //       }
  
  //       const data = await response.json();
  //       console.log("가져온 데이터:", data);
  //       setUserData({
  //         nickName: data.nickName || "닉네임 없음",
  //         email: data.mail || "이메일 없음",
  //         info: data.info || "자기소개가 없습니다.",
  //         profilePicturePath: data.profilePicturePath || "https://via.placeholder.com/150",
  //         phone: data.phone || "",
  //         marketing: data.marketing === 1,
  //         password: "",
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 가져오기
        if (!token) {
          console.error("토큰이 없습니다. 다시 로그인해주세요.");
          return;
        }
  
        const response = await fetch("http://localhost:8080/api/auth/check", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // JWT 전달
          },
        });
  
        if (!response.ok) {
          throw new Error("사용자 인증 실패");
        }
  
        const { userId } = await response.json(); // 서버에서 userId 추출
        dispatch({ type: "SET_USER_ID", payload: userId }); // Redux 상태 업데이트
  
        // 사용자 정보를 가져오기
        const userResponse = await fetch(`http://localhost:8080/api/auth/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // JWT 전달
          },
        });
  
        if (!userResponse.ok) {                           
          throw new Error("사용자 정보를 가져올 수 없습니다.");
        }
  
        const userData = await userResponse.json();
        setUserData({
          nickName: userData.nickName || "닉네임 없음",
          email: userData.mail || "이메일 없음",
          info: userData.info || "자기소개가 없습니다.",
          profilePicturePath: userData.profilePicturePath || "https://via.placeholder.com/150",
          phone: userData.phone || "",
          marketing: userData.marketing === 1,
          password: "",
        });
  
        setLoading(false); // 로딩 상태 해제
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  
    fetchUserData();
  }, [dispatch]);

  // 비밀번호 확인 모달 열기
  const handleEditProfileClick = () => {
    setPasswordDialogOpen(true);
  };

  // 비밀번호 확인
  const handlePasswordCheck = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/${userId}/check-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: inputPassword }),
      });

      if(!response.ok) {
        throw new Error("비밀번호를 다시 확인해주세요");
      }

      const result = await response.json();
      if(result.success) {
        setPasswordDialogOpen(false);
        setEditData(userData);
        setEditDialogOpen(true);
      } else {
        setPasswordError(true); // 비밀번호 오류 상태 설정
      }
    } catch (error) {
        console.error("Error checking password:", error.message);
        setPasswordError(true);
    }
  };

  // 수정 모드 활성화 (자기소개)
  const handleEditInfo = () => {
    setEditedInfo(userData.info); // 현재 값 임시 저장
    setIsEditingInfo(true);
  }

  // 자기소개 변경 핸들러
  const handleInfoChange = (e) => {
    setEditedInfo(e.target.value);
  }

  // 자기소개 수정 완료 (확인버튼)
  const handleSaveInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/${userId}/updateInfo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({info: editedInfo}),
      });

      if(!response.ok) {
        throw new Error("자기소개 수정 실패");
      }

      alert("자기소개 수정 성공");
      setUserData((prev) => ({...prev, info: editedInfo}));
      setIsEditingInfo(false);
      
    } catch (error) {
      alert("Error:", error.massage);
    }
  }

  // 자기소개 수정 취소 (취소버튼)
  const handleCancelInfo = () => {
    setEditedInfo(userData.info); // 변경 전 값으로 복원
    setIsEditingInfo(false);
  }

  // 자기소개 X 버튼 (삭제)
  const handleClearInfo = () => {
    setEditedInfo("");
  }
  
  // 수정 모달 닫기
  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const {name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 비밀번호 확인 모달 닫기
  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
    setInputPassword("");
    setPasswordError(false);
  }

  // 프로필 수정 저장
  const handleSaveChanges = async () => {
    try {
      const payload = {
        ...editData,
        marketing: editData.marketing ? 1 : 0,
      };
  
      // 비밀번호가 입력되지 않았다면 payload에서 제외
      if (!editData.password) {
        delete payload.password;
      }
  
      const response = await fetch(`http://localhost:8080/api/auth/${userId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("사용자 정보를 업데이트할 수 없습니다.");
      }
  
      const updatedData = await response.json();
      setUserData(updatedData);
      alert("프로필 수정 완료.")
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    dispatch({type: "LOGOUT"}); // Redux 상태 초기화
    alert("로그아웃되었습니다!");
    navigate("/") // 로그인 페이지로 이동
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
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
          }}
          onClick={handleAvatarClick} // 사진 클릭 이벤트 유지
        >
          <Avatar
            src={userData.profilePicturePath}
            alt={userData.nickName}
            sx={{ width: 150, height: 150, mb: 2 }}
          />
          {/* 카메라 아이콘 오버레이 */}
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "5px",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 1,
            }}
          >
            <CameraswitchIcon sx={{ fontSize: 25, color: "gray" }} />
          </Box>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {userData.nickName}
        </Typography>
        <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>
          {userData.email}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            mb: 3,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {isEditingInfo ? (
            // 수정 모드: 입력창 + X버튼 + 취소/확인 버튼
            <>
              <TextField
                variant="outlined"
                value={editedInfo}
                onChange={handleInfoChange}
                fullWidth
                size="small"
                sx={{ maxWidth: "300px" }}
                autoFocus
              />
              {/* X버튼: 내용 삭제 */}
              <CloseIcon
                sx={{
                  position: "absolute",
                  right: "calc(52% - 150px)", // 중앙 기준으로 위치 조정
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "gray",
                }}
                onClick={handleClearInfo}
              />
              {/* 취소 및 확인 버튼 */}
              <Box sx={{ position: "absolute", top: -30, width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Button size="small" color="secondary" onClick={handleCancelInfo}>
                  취소
                </Button>
                <Button size="small" color="primary" onClick={handleSaveInfo}>
                  확인
                </Button>
              </Box>
            </>
          ) : (
            // 일반 모드: 자기소개 표시 + 연필 아이콘
            <>
              <Typography
                variant="body2"
                sx={{ mr: 1, textAlign: "center", cursor: "pointer", maxWidth: "300px", fontSize: "16px" }}
                onClick={handleEditInfo}
              >
                {userData.info || "자기소개를 입력해주세요."}
              </Typography>
              {/* 연필 아이콘 */}
              <EditIcon
                sx={{
                  position: "absolute",
                  right: "calc(50% - 150px)", // 중앙 기준 위치 조정
                  cursor: "pointer",
                  color: "gray",
                }}
                onClick={handleEditInfo}
              />
            </>
          )}
        </Box>

        {/* 버튼 */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleEditProfileClick}>
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

      {/* 비밀번화 확인 모달 */}
      <Dialog open={passwordDialogOpen} onClose={handlePasswordDialogClose}>
        <DialogTitle>비밀번호 확인</DialogTitle>
        <DialogContent>
          <TextField
            label="현재 비밀번호"
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                handlePasswordCheck(); // Enter 키 누르면 확인 함수 실행
              }
            }}
            fullWidth
            margin="normal"
            error={passwordError}
            helperText={passwordError ? "비밀번호가 일치하지 않습니다." : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose} color="secondary">
            취소
          </Button>
          <Button onClick={handlePasswordCheck} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 수정 모달 */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>프로필 수정</DialogTitle>
        <DialogContent>
          {/* 수정 필드들 */}
          <TextField
            label="닉네임"
            name="nickName"
            value={editData.nickName || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="자기소개"
            name="info"
            value={editData.info || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="핸드폰 번호"
            name="phone"
            value={editData.phone || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="비밀번호"
            name="password"
            type="password"
            value={editData.password || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="marketing"
                checked={editData.marketing || false}
                onChange={handleInputChange}
              />
            }
            label="마케팅 수신 동의"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            취소
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>

      {/* 나의 활동 섹션 추가 */}
      <Box
        sx={{
          backgroundColor: "gray", // 배경 색상
          borderRadius: "10px",
          padding: "10px",
          width: "100%",
          maxWidth: " 380px",
          marginTop: "20px",
          marginLeft: "15px",
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight:"bold", mb: 1, color: "#FFFFFF" }}>
          나의 활동
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              // borderBottom: "1px solid #E0E0E0", // 구분선
              cursor: "pointer",
            }}
            onClick={() => navigate('/my-posts')}
          >
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <EditNoteIcon sx={{ color: "#FFFFFF", mr: 1 }} />
              <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                내가 쓴 글
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{ color: "#FFFFFF" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              cursor: "pointer",
            }}
            onClick={() => navigate('/my-comments')}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ChatIcon sx={{ color: "#FFFFFF", mr: 1 }} />
              <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                내가 쓴 댓글
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{color: "#FFFFFF"}} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MyPage;