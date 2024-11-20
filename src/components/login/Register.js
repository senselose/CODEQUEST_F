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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  alignItems: 'center',
});

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    mail: '',
    phone: '',
    nickName: '',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  // 비밀번호 유효성 상태
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const minLength = /.{8,}/; // 8자 이상
    const hasNumber = /\d/; // 숫자 포함
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // 특수문자 포함

    if (!minLength.test(password)) {
      setPasswordValid(false);
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else if (!hasNumber.test(password)) {
      setPasswordValid(false);
      setPasswordError('비밀번호에 숫자가 하나 이상 포함되어야 합니다.');
    } else if (!hasSpecialChar.test(password)) {
      setPasswordValid(false);
      setPasswordError('비밀번호에 특수문자가 하나 이상 포함되어야 합니다.');
    } else {
      setPasswordValid(true);
      setPasswordError('');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 비밀번호 유효성 검사
    if (name === 'password') {
      validatePassword(value);
    }

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

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    const { id, password, name, mail, nickName, phone } = formData;

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        id,
        password,
        name,
        mail,
        phone,
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
    <Box
      sx={{
        backgroundColor: '#000',
        minHeight: '100vh',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container sx={{ fullWidth: '100vw' }}>
        <BackgroundBox>
          <Typography variant="h4" fontWeight="bold" color="#00DFEE" sx={{ padding: '35px' }}>
            create account
          </Typography>
        </BackgroundBox>

        <WhiteBox>
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%', marginTop: '30px', alignItems: 'center' }}
          >
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                passwordError || (passwordValid ? '사용할 수 있는 비밀번호입니다.' : '')
              }
              error={!!passwordError}
            />
            <TextField
              label="비밀번호 확인"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
              }
              error={
                formData.password &&
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
              }
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
                  onChange={handleChange}
                />
              }
              label="개인정보 제공에 동의하시겠습니까?"
              sx={{
                // mt: 1,
                color : '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!passwordValid || formData.password !== formData.confirmPassword}
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
        </WhiteBox>
      </Container>
    </Box>
  );
}

export default Register;
