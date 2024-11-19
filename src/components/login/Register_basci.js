import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const BackgroundBox = styled(Box)({
  backgroundColor: '#000',
  paddingBottom: '10px',
  borderBottomLeftRadius: '50px',
  display: 'flex',
  maxWidth: '100vw',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 4,
});

const WhiteBox = styled(Box)({
  backgroundColor: '#fff',
  padding: '20px',
  zIndex: 3,
  position: 'relative',
  top: '-50px',
});

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    mail: '',
    name: '',
    nickName: '',
    agreeToTerms: false,
  });

  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePopupOpen = () => {
    setOpenPopup(true);
  };

  const handlePopupClose = (agree) => {
    setOpenPopup(false);
    if (agree) {
      setFormData((prevData) => ({
        ...prevData,
        agreeToTerms: true,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      if (response.status === 200) {
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
  };

  const handlePhoneVerification = () => {
    alert('핸드폰 본인 인증 절차를 진행합니다.');
  };
  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
    <Container sx={{ fullWidth: '100vw',  }}> 
      <BackgroundBox>
        <Typography variant="h4" fontWeight="bold" color="#00DFEE" sx={{ padding:'35px' }}>
           create account
        </Typography>
      </BackgroundBox>

        <WhiteBox>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '30px' }}>
            <TextField
              label="아이디"
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="이메일"
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="닉네임"
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              variant="contained"
              onClick={handlePhoneVerification}
              fullWidth
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: '#00DFEE',
                color: '#000',
                '&:hover': { backgroundColor: '#00BBDD' },
                fontWeight: 'bold',
              }}
            >
              핸드폰 인증
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
              }
              label={
                <span onClick={handlePopupOpen} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  개인정보 활용에 동의합니다.
                </span>
              }
              sx={{ mt: 2 }}
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
              회원가입
            </Button>
          </form>
          
          <Divider sx={{ mt: 3, mb: 1 }}>이미 계정이 있으신가요?</Divider>
          <Button
            variant="text"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ fontSize: '0.9em', color: '#666' }}
          >
            로그인 페이지로 이동
          </Button>
        </WhiteBox>
      </Container>
     </Box>     
  );
}

export default Register;
