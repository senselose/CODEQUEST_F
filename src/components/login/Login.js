import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const BackgroundBox = styled(Box)({
  backgroundColor: '#000',
  display: 'flex',
  maxWidth: '390px',
  maxHeight: '100%',
  flexDirection: 'column',
  position: 'relative',
});

const WhiteBox = styled(Box)({
  backgroundColor: '#fff',
  borderTopLeftRadius: '100px',
  padding: '20px',
  maxWidth: '100%',
  zIndex: 2,
  position: 'relative',
});

const OverlappingImage = styled(Box)({
  position: 'absolute',
  top: '-100px',
  right: '130px',
  transform: 'translate(50%, 0)',
  zIndex: 1,
  width: '200px',
  height: 'auto',
});

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('9ad17f158e56a3e1472d0143dc6418b2');
      console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());//초기화확인로그
    } else {
      console.log("Kakao SDK already initialized.");
    }
  }, []);


  const handleKakaoLogin = () => {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, profile_image',
        success: (authObj) => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              const profile = res.kakao_account.profile;
              console.log("닉네임:", profile.nickname);
              console.log("썸네일 이미지:", profile.thumbnail_image_url);
              console.log("고해상도 이미지:", profile.profile_image_url);
              alert("카카오 로그인 성공!");
              navigate('/components/board');
            },
            fail: (err) => {
              console.error("Kakao API Request Failed:", err);
            },
          });
        },
        fail: (err) => {
          console.error("Kakao Login Failed:", err);
        },
      });
    };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { id, password });
      if (response.data === "Login Successful") {
        alert("로그인 성공");
        navigate("/components/board");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <Container sx={{ fullWidth: '100%', paddingTop: '40px' }}>
        <BackgroundBox>
          <Container sx={{ width: '100%', px: 6, pt: 7 }}>
            <Typography variant="h4" fontWeight="bold" color="#00DFEE" align="left">
              Welcome! <br />
              Hello.
            </Typography>
          </Container>
        </BackgroundBox>

        <WhiteBox sx={{ marginTop: '70px' }}>
          <OverlappingImage component="img" src="/fireboyreal.png" alt="Logo" />
          <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 6, paddingTop: '40px' }}>
            LOGIN
          </Typography>
          <form onSubmit={handleLogin}>
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
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
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
              sx={{ backgroundColor: '#FEE500', color: '#000', '&:hover': { backgroundColor: '#FFD700' }, fontWeight: 'bold' }}
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
