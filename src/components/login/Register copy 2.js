import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
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
    confirmPassword: '', // 비밀번호 확인 필드 추가
    name: '', // 이름 필드 추가
    mail: '',
    phone : '',
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
    setFormData((prevData) => ({
      ...prevData,
      agreeToTerms: agree,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 로직
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    // 백엔드로 보낼 데이터에서 confirmPassword 제거
    const { id, password, name, mail, nickName } = formData;

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        id,
        password, // password만 전송
        name,
        mail,
        nickName,
      });

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
      <Container sx={{ fullWidth: '100vw' }}>
        <BackgroundBox>
          <Typography variant="h4" fontWeight="bold" color="#00DFEE" sx={{ padding: '35px' }}>
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
              required
              margin="normal"
            />
            <TextField
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="비밀번호 확인"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="이름"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="핸드폰번호"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="이메일"
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="닉네임"
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
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
                  required
                  checked={formData.agreeToTerms}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePopupOpen();
                  }}
                />
              }
              label="개인정보 활용에 동의합니다."
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

      <Dialog
        open={openPopup}
        onClose={() => handlePopupClose(false)}
        PaperProps={{
          style: {
            borderRadius: '15px',
            maxWidth: '500px',
            // marginTop:'30px'
            textAlign: 'center',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#00DFEE',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          개인정보 수집 및 이용 동의
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#f9f9f9',
            color: '#333',
            lineHeight: 1.8,
          }}
        >
      <DialogContentText
        sx={{
          marginY: 2, // 상하 여백 추가 (margin-top, margin-bottom)
          lineHeight: 1.8, // 텍스트 줄 간격 조정
        }}
      >
        <br />
        <strong>1. 수집하는 개인정보 항목</strong>: 이름, 이메일, 닉네임, 아이디<br />
        <strong>2. 이용 목적</strong>: 회원관리, 서비스 제공 및 개선<br />
        <strong>3. 보유 및 이용 기간</strong>: 회원 탈퇴 시까지. 단, 관련 법령에 따라 일정 기간 보존<br />
        <strong>4. 제3자 제공 여부</strong>: 없음<br />
        <strong>5. 동의 철회 방법</strong>: 회원정보 수정 페이지에서 철회 가능<br />
      </DialogContentText>

        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: '#f1f1f1',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <Button
            onClick={() => handlePopupClose(false)}
            variant="outlined"
            sx={{
              color: '#666',
              borderColor: '#666',
              '&:hover': { backgroundColor: '#000' },
              marginRight: '10px',
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => handlePopupClose(true)}
            variant="contained"
            sx={{
              backgroundColor: '#00DFEE',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#00BBDD' },
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Register;