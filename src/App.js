import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Board from './components/board/Board';
import BoardForm from './components/board/BoardForm';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail'; // BoardDetail import 추가
import Register from './components/login/Register';
import Main from './components/main/main';

import { Provider } from "react-redux";
import store from "./reducers/store"; // store.js 경로에 맞게 수정

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/create" element={<BoardForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/BoardList" element={<BoardList />} /> {/* 오타 수정 */}
          <Route path="/board/:id" element={<BoardDetail />} /> {/* 게시글 상세 페이지 경로 추가 */}
          <Route path="/register" element={<Register />} />        
        </Routes>
      </Router>
    </Provider>
    
  );
}

export default App;
