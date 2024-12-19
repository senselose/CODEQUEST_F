// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userReducer';

// const store = configureStore({
//   reducer: {
//     auth: userReducer, // auth 상태는 userReducer로 관리
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// persist 설정
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // 상태 복원 가능하도록 persistReducer 적용
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
