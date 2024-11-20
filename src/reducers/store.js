import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer'; // 경로를 정확히 설정하세요.

const store = configureStore({
  reducer: {
    auth: userReducer, // auth 상태는 userReducer로 관리
  },
});

export default store;
