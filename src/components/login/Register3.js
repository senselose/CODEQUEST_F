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
    mail: '',
    name: '',
    nickName: '',
    agreeToTerms: false,
  });
  const [openPopup, setOpenPopup] = useState(false); // 팝업 상태 추가

  const navigate = useNavigate();

  const handlePopupOpen = () => {
    setOpenPopup(true); // 팝업 열기
  };

  const handlePopupClose = (agree) => {
    setOpenPopup(false); // 팝업 닫기
    setFormData((prevData) => ({
      ...prevData,
      agreeToTerms: agree, // 확인 시 true, 취소 시 false
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onClick={(e) => {
                    e.preventDefault(); // 기본 체크박스 동작 방지
                    handlePopupOpen();
                  }}
                />
              }
              label="개인정보 활용에 동의합니다."
              sx={{ mt: 2 }}
            />

            <Dialog
              open={openPopup}
              onClose={() => handlePopupClose(false)}
              PaperProps={{
                style: {
                  borderRadius: '15px',
                  padding: '10px',
                  maxWidth: '500px',
                  textAlign: 'center',
                },
              }}
            >
              <DialogTitle>개인정보 수집 및 이용 동의</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <strong>1. 수집하는 개인정보 항목</strong>: 이름, 이메일, 닉네임, 아이디<br />
                  <strong>2. 이용 목적</strong>: 회원관리, 서비스 제공 및 개선<br />
                  <strong>3. 보유 및 이용 기간</strong>: 회원 탈퇴 시까지. 단, 관련 법령에 따라 일정 기간 보존<br />
                  <strong>4. 제3자 제공 여부</strong>: 없음<br />
                  <strong>5. 동의 철회 방법</strong>: 회원정보 수정 페이지에서 철회 가능<br />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handlePopupClose(false)}>취소</Button>
                <Button onClick={() => handlePopupClose(true)}>확인</Button>
              </DialogActions>
            </Dialog>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
            >
              회원가입
            </Button>
          </form>
        </WhiteBox>
      </Container>
    </Box>
  );
}

export default Register;
