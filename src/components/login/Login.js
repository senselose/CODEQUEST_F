// import React, { useState , useEffect} from 'react';
// import axios from 'axios';
// import { Box, Container, Typography, TextField, Button, Divider, Grid } from '@mui/material';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';

// const BackgroundBox = styled(Box)({
//   backgroundColor: '#000',
//   color: '#fff',
//   display: 'flex',
//   // width: '100%',
//   maxWidth: '390px',
//   maxHeight: '100%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexDirection: 'column',
//   position: 'relative', // Ensure positioning context for the image
// });

// // 페이지 하단까지 채우는 흰색 박스 스타일
// const WhiteBox = styled(Box)({
//   backgroundColor: '#fff',
//   borderTopLeftRadius: '100px',
//   padding: '20px',
//   maxWidth: '100%', // 100% 너비로 설정
//   zIndex: 3,
//   position: 'relative', // 이미지 겹침 위치 조정용
//   top: '100px', // WhiteBox의 상단 위치 조정
// });

// const OverlappingImage = styled(Box)({
//   position: 'absolute',
//   top: '200px', // 이미지 겹침 위치 조정
//   left: '70%',
//   transform: 'translateX(-50%)', // 이미지 중앙 정렬
//   zIndex: 2, // WhiteBox보다 위에 위치
// });

// function Login() {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Kakao SDK 초기화
//     if (!window.Kakao.isInitialized()) {
//       window.Kakao.init('9ad17f158e56a3e1472d0143dc6418b2'); 
//     }
//   }, []);

//   const handleKakaoLogin = () => {
//     if (window.Kakao.Auth) {
//       window.Kakao.Auth.login({
//         scope : 'profile_nickname, profile_image',
//         success: (authObj) => {
//           console.log(authObj); // 로그인 성공 시 반환되는 인증 객체
//           window.KaKao.API.request({
//             url:'/v2/user/me',
//             success: res => {
//               const kakao_account = res.kakao_account;;
//               console.log(kakao_account);
//             }

//           })
//           navigate('/componet/board'); // 로그인 성공 시 이동할 페이지
//         },
//         fail: (err) => {
//           console.error(err);
//           alert('Kakao login failed');
//         },
//       });
//     } else {
//       alert('Kakao SDK가 초기화되지 않았습니다.');
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/login', {
//         id,
//         password,
//       });
//       alert(response.data);
//       if (response.data === "Login Successful") {
//         navigate("/componet/board");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed");
//     }

    
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://192.168.0.34:8080/api/users', { id, password });
//       console.log('User saved:', response.data);
//       alert('사용자가 저장되었습니다!');
//       setId('');
//       setPassword('');
//       navigate('/board'); // 저장 후 게시판 페이지로 이동
//     } catch (error) {
//       console.error('Error saving user:', error);
//       alert('사용자 저장에 실패했습니다.');
//     }
//   };

//   return (
//     <Box sx={{ backgroundColor: '#000', minHeight: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
//     <Container sx={{ fullWidth: '100%', paddingTop: '40px' }}> 
//       <BackgroundBox>
//         <Container alignItems="center" justifyContent="space-between" sx={{ width: '100%', px: 6, pt: 7 }}>
//         <Typography variant="h4" fontWeight="bold" color="#00DFEE" align="left">
//           Welcome! <br />
//           Hello.
//         </Typography>
//                   {/* Overlapping Image */}
//         <OverlappingImage component="img" src="/fireboyreal.png" alt="Logo" sx={{ height: 150 }} />

//         </Container>
//       </BackgroundBox>

//       <WhiteBox sx={{ marginTop: '70px' }}>
//         <Typography 
//           variant="h5" 
//           fontWeight="bold" 
//           align="center" 
//           sx={{ mb: 6, paddingTop: '40px'}}>
//           LOGIN
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="아이디"
//             type="text"
//             value={id}
//             fullWidth
//             onChange={(e) => setId(e.target.value)}
//             margin="normal"
//             required
      
//           />
//           <TextField
//             label="비밀번호"
//             type="password"
//             value={password}
//             // width="100%"
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 2,
//               backgroundColor: '#000',
//               color: '#fff',
//               '&:hover': { backgroundColor: '#333' },
//             }}
//           >
//             Sign In
//           </Button>
//         </form>
//         <Box display="flex" justifyContent="space-between" mt={1} sx={{ fontSize: '0.9em', color: '#666' }}>
//           <Button variant="text" color="inherit" size="small">
//             비밀번호 재설정
//           </Button>
//           <Button variant="text" color="inherit" size="small" onClick={() => navigate('/Register')}>
//             회원가입
//           </Button>
//         </Box>
//         <Divider sx={{ mt: 3, mb: 1 }}>SNS 계정으로 이용하기</Divider>
//         <Box display="flex" justifyContent="center" mt={1}>
//                   {/* 카카오 로그인 버튼 */}
//       <Button
//         variant="contained"
//         onClick={handleKakaoLogin}
//         sx={{
//           backgroundColor: '#FEE500',
//           color: '#000',
//           '&:hover': { backgroundColor: '#FFD700' },
//           fontWeight: 'bold',
//         }}
//         fullWidth
//       >
//         카카오로 로그인
//       </Button>
//           {/* <GoogleIcon sx={{ color: '#DB4437', fontSize: '2rem', mx: 1 }} />
//           <FacebookIcon sx={{ color: '#4267B2', fontSize: '2rem', mx: 1 }} />
//           <AppleIcon sx={{ color: '#000', fontSize: '2rem', mx: 1 }} /> */}
//         </Box>
//       </WhiteBox>
//     </Container>
//     </Box>
//     );
//     };

//     // }

//   export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const BackgroundBox = styled(Box)({
  backgroundColor: '#000',
  color: '#fff',
  display: 'flex',
  maxWidth: '390px',
  maxHeight: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  position: 'relative',
});

const WhiteBox = styled(Box)({
  backgroundColor: '#fff',
  borderTopLeftRadius: '100px',
  padding: '20px',
  maxWidth: '100%',
  zIndex: 3,
  position: 'relative',
  top: '100px',
});

const OverlappingImage = styled(Box)({
  position: 'absolute',
  top: '200px',
  left: '70%',
  transform: 'translateX(-50%)',
  zIndex: 2,
});

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('9ad17f158e56a3e1472d0143dc6418b2');
    }
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao.Auth) {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, profile_image',
        success: (authObj) => {
          console.log(authObj);
          window.KaKao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              const kakao_account = res.kakao_account;
              console.log(kakao_account);
            },
          });
          navigate('/component/board');
        },
        fail: (err) => {
          console.error(err);
          alert('Kakao login failed');
        },
      });
    } else {
      alert('Kakao SDK가 초기화되지 않았습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.0.34:8080/api/users', { id, password });
      navigate('/BoardList'); // 로그인 후 BoardList 페이지로 이동
    } catch (error) {
      console.error('Error saving user:', error);
      alert('사용자 저장에 실패했습니다.');
      navigate('/BoardList'); // 에러가 발생해도 BoardList 페이지로 이동
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        minHeight: '100vh',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container sx={{ fullWidth: '100%', paddingTop: '40px' }}>
        <BackgroundBox>
          <Container alignItems="center" justifyContent="space-between" sx={{ width: '100%', px: 6, pt: 7 }}>
            <Typography variant="h4" fontWeight="bold" color="#00DFEE" align="left">
              Welcome! <br />
              Hello.
            </Typography>
            <OverlappingImage component="img" src="/fireboyreal.png" alt="Logo" sx={{ height: 150 }} />
          </Container>
        </BackgroundBox>

        <WhiteBox sx={{ marginTop: '70px' }}>
          <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 6, paddingTop: '40px' }}>
            LOGIN
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="아이디"
              type="text"
              value={id}
              fullWidth
              onChange={(e) => setId(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': { backgroundColor: '#333' },
              }}
            >
              Sign In
            </Button>
          </form>
          <Box display="flex" justifyContent="space-between" mt={1} sx={{ fontSize: '0.9em', color: '#666' }}>
            <Button variant="text" color="inherit" size="small">
              비밀번호 재설정
            </Button>
            <Button variant="text" color="inherit" size="small" onClick={() => navigate('/Register')}>
              회원가입
            </Button>
          </Box>
          <Divider sx={{ mt: 3, mb: 1 }}>SNS 계정으로 이용하기</Divider>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button
              variant="contained"
              onClick={handleKakaoLogin}
              sx={{
                backgroundColor: '#FEE500',
                color: '#000',
                '&:hover': { backgroundColor: '#FFD700' },
                fontWeight: 'bold',
              }}
              fullWidth
            >
              카카오로 로그인
            </Button>
          </Box>
        </WhiteBox>
      </Container>
    </Box>
  );
}

export default Login;
