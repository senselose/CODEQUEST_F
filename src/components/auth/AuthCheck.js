import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserId } from '../../actions/userActions';

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("토큰이 없습니다. 다시 로그인해주세요.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더로 전달
          },
        });

        if (response.data.userId) {
          dispatch({ type: "SET_USER_ID", payload: response.data.userId });
        }
      } catch (error) {
        console.error("인증 확인 실패:", error.response?.data || error.message);
      }
    };


    checkAuth();
  }, [dispatch]);

  return null; // 이 컴포넌트는 렌더링되지 않음
};

export default AuthCheck;