import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Board from './components/board/Board';
import BoardForm from './components/board/BoardForm';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail'; // BoardDetail import 추가
import Register from './components/login/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
        <Route path="/create" element={<BoardForm />} />
        <Route path="/BoardList" element={<BoardList />} /> {/* 오타 수정 */}
        <Route path="/board/:id" element={<BoardDetail />} /> {/* 게시글 상세 페이지 경로 추가 */}
        <Route path="/register" element={<Register />} />        
      </Routes>
    </Router>
  );
}

export default App;
