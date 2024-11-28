import React, { useState } from 'react';
import Personal from "./Personal";
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
  InputAdornment, // 추가
  IconButton, // 추가
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // 추가
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

//-----------------------------------------------------------------
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
    confirmPassword: '',
    name: '',
    mail: '',
    phone: '',
    nickName: '',
    agreeToTerms: false,
  });


  //--------------------------------------------------
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);

  // 아이디
  const [idMessage, setIdMessage] = useState(''); // 아이디 메시지 상태
  const [isIdValid, setIsIdValid] = useState(null); // 아이디 유효성 상태 (true/false/null)
   // 이메일
   const [mailMessage, setMailMessage] = useState(''); // 아이디 메시지 상태
   const [isMailValid, setIsMailValid] = useState(null); // 아이디 유효성 상태 (true/false/null)
    // 닉네임
  const [nickNameMessage, setNickNameMessage] = useState(''); // 아이디 메시지 상태
  const [isNickNameValid, setIsNickNameValid] = useState(null); // 아이디 유효성 상태 (true/false/null)

  // 비밀번호 유효성 상태
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  // 비밀번호 토글
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'password') {
      validatePassword(value); // 비밀번호 유효성 검사
    }

    // 아이디 변경 시 메시지 초기화
    if (name === 'id') {
      setIdMessage('');
      setIsIdValid(null);
    }

    
    // 이메일 변경 시 메시지 초기화
    if (name === 'mail') {
      setMailMessage('');
      setIsMailValid(null);
    }

    
    // 닉네임 변경 시 메시지 초기화
    if (name === 'nickName') {
      setNickNameMessage('');
      setIsNickNameValid(null);
    }
  };


        // 아이디 중복 확인 함수
        const checkIdDuplicate = async () => {
          console.log("Checking ID:", formData.id); // 디버깅 로그
        
          if (!formData.id) {
            setIdMessage("아이디를 입력하세요.");
            setIsIdValid(false);
            return;
          }
        
          try {
            const response = await axios.get("http://localhost:8080/api/auth/checkMail", {
              params: { mail: formData.id },
            });
            console.log("Axios 응답:", response.data); // 응답 디버깅
            if (response.data) {
              setIdMessage("사용할 수 있는 아이디 입니다.");
              setIsMailValid(true);
              // 서버에서 true = 이미 사용 중인 아이디

            } else {
              // 서버에서 false = 사용 가능한 아이디
              setIdMessage("사용할 수 없는 아이디 입니다.");
              setIsIdValid(false);
            }
          } catch (error) {
            console.error("아이디 중복 확인 오류:", error);
            setMailMessage("아이디 중복 확인 중 문제가 발생했습니다.");
            setIsMailValid(false);
          }
        };

        // 메일 중복 확인 함수
        const checkMailDuplicate = async () => {
          console.log("Checking Mail:", formData.mail); // 디버깅 로그
        
          if (!formData.mail) {
            setMailMessage("이메일을 입력하세요.");
            setIsMailValid(false);
            return;
          }
        
          try {
            const response = await axios.get("http://localhost:8080/api/auth/checkMail", {
              params: { mail: formData.mail },
            });
            console.log("Axios 응답:", response.data); // 응답 디버깅
            if (response.data) {
              setMailMessage("사용할 수 있는 이메일입니다.");
              setIsMailValid(true);
              // 서버에서 true = 이미 사용 중인 아이디
    
            } else {
              // 서버에서 false = 사용 가능한 아이디
              setMailMessage("이미 가입이 되어 있는 이메일 입니다.");
              setIsMailValid(false);
            }
          } catch (error) {
            console.error("이메일 중복 확인 오류:", error);
            setMailMessage("이메일 중복 확인 중 문제가 발생했습니다.");
            setIsMailValid(false);
          }
        };
          
        // 닉네임 중복 확인 함수
        const checkNickNameDuplicate = async () => {
          console.log("Checking nickName:", formData.nickName); // 디버깅 로그
        
          if (!formData.nickName) {
            setNickNameMessage("닉네임을 입력하세요.");
            setIsNickNameValid(false);
            return;
          }
        
          try {
            const response = await axios.get("http://localhost:8080/api/auth/checkNickname", {
              params: { nickName: formData.nickName },
            });
            console.log("Axios 응답:", response.data); // 응답 디버깅
            if (response.data) {
              setNickNameMessage("사용할 수 있는 닉네임입니다.");
              setIsNickNameValid(true);
              // 서버에서 true = 이미 사용 중인 아이디
    
            } else {
              // 서버에서 false = 사용 가능한 아이디
              setNickNameMessage("이미 사용 중인 닉네임 입니다..");
              setIsNickNameValid(false);
            }
          } catch (error) {
            console.error("닉네임 중복 확인 오류:", error);
            setNickNameMessage("닉네임 중복 확인 중 문제가 발생했습니다.");
            setIsNickNameValid(false);
          }
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
        nickName,
        phone,
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
              onBlur={checkIdDuplicate} // 입력 필드가 포커스를 잃을 때 중복 확인
              fullWidth
              required
              margin="normal"
              error={isIdValid === false} // 중복된 아이디일 경우 에러 표시
              helperText={idMessage} // 메시지 표시
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
                  : passwordError || (passwordValid ? '비밀번호가 일치합니다.' : '')
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
              type="text"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              onBlur={checkMailDuplicate} // 입력 필드가 포커스를 잃을 때 중복 확인
              fullWidth
              required
              margin="normal"
              error={isMailValid === false} // 중복된 아이디일 경우 에러 표시
              helperText={mailMessage} // 메시지 표시
            />
            <TextField
              label="닉네임"
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              onBlur={checkNickNameDuplicate} // 입력 필드가 포커스를 잃을 때 중복 확인
              fullWidth
              required
              margin="normal"
              error={isNickNameValid === false} // 중복된 아이디일 경우 에러 표시
              helperText={nickNameMessage} // 메시지 표시
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
              label={
                <Typography component="span" sx={{ color: '#333', display: 'inline' }}>
                  개인정보 제공에 동의하시겠습니까?
                  <Typography
                    component="span"
                    sx={{ color: 'red', display: 'inline', marginLeft: '4px' }}
                  >
                  </Typography>
                </Typography>
              }
              sx={{
                mt: 2,
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

          <Divider sx={{ mt: 3, mb: 1, color: '#333' }}>이미 계정이 있으신가요?</Divider>
          <Button
          variant="text"
          onClick={() => navigate('/')}
          sx={{ fontSize: '0.9em', color: '#333' }}
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
            textAlign: 'center',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#00DFEE',
            color: '#333',
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
          <DialogContentText>
            <br/>
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
